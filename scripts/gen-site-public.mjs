// Generates config/site-public.ts — client-safe projection of config/site.ts
// Updated for P2-03 split: site.ts now imports from config/site/* typed collections.
// This script now uses tsx ESM loader to import TS directly.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "config", "site-public.ts");

// Dynamically import tsx ESM loader if available, then import siteConfig.
// tsx is a devDependency and this script runs via the local `tsx` binary
// (see package.json "gen:site-public"), so .ts imports resolve natively
// without npx re-downloading the package on every Vercel build.
try {
  await import("tsx/esm");
} catch {
  // Already running under the tsx binary — .ts resolution is native.
}

const { siteConfig: c } = await import(path.join(root, "config", "site.ts"));

const pick = (obj, keys) => Object.fromEntries(keys.map((k) => [k, obj[k]]));

const out = {
  name: c.name,
  legalName: c.legalName,
  ssm: c.ssm,
  ssmFull: c.ssmFull,
  tagline: c.tagline,
  phone: c.phone,
  phoneDisplay: c.phoneDisplay,
  whatsapp: c.whatsapp,
  whatsappLink: c.whatsappLink,
  email: c.email,
  hours: c.hours,
  reviewCount: c.reviewCount,
  reviewRating: c.reviewRating,
  areas: c.areas,
  brandsSupported: c.brandsSupported,
  stats: c.stats,
  volumeDiscounts: c.volumeDiscounts,
  links: c.links,
  pricing: c.pricing,
  services: c.services.map((s) =>
    pick(s, ["slug", "title", "short", "startPrice", "icon", "targetProblem", "category"]),
  ),
  areaPagesLite: c.areaPages.map((a) => pick(a, ["slug", "name", "state"])),
  brandPagesLite: c.brandPages.map((b) => pick(b, ["slug", "name"])),
  problemPagesLite: c.problemPages.map((p) => pick(p, ["slug", "name", "nameMS", "nameZH"])),
};

const banner = `// ─────────────────────────────────────────────────────────────────────────
// AUTO-GENERATED — do not edit by hand.
// Regenerate with:  npm run gen:site-public
//
// WHY THIS FILE EXISTS
// ────────────────────
// \`config/site.ts\` is ~1.1 MB of source (39 areaPages + 158 kampungPages +
// 20 brandPages + 20 problemPages, each carrying full EN/MS/ZH prose and
// FAQ arrays). It is perfect for SERVER components and schema builders.
//
// But 25+ CLIENT components ("use client") were importing it just to read
// two or three tiny fields — most commonly \`siteConfig.phone\`. Because a
// client import pulls the whole module into the browser bundle, every page
// was shipping a ~1 MB (220 KB gzipped) chunk to users. That single chunk
// was loaded by 83 of 130 route groups.
//
// This file is the small, client-safe projection of that data. Client
// components import \`sitePublic\` from here; server components keep using
// the full \`siteConfig\`. Nothing here should ever contain long-form prose,
// FAQ arrays, or per-kampung content.
// ─────────────────────────────────────────────────────────────────────────

// NOTE: deliberately NOT \`as const\`. The original \`siteConfig\` object is a
// plain (widened) object literal, so consumers expect \`string\` / \`string[]\`
// rather than literal-union and fixed-length tuple types. Using \`as const\`
// here made \`.filter()\` results unassignable to the arrays they feed and
// broke \`<select>\` state typing in the contact form.
export const sitePublic = ${JSON.stringify(out, null, 2)};

export type SitePublic = typeof sitePublic;
`;

fs.writeFileSync(outPath, banner);

const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
const srcPath = path.join(root, "config", "site.ts");
const srcKb = (fs.statSync(srcPath).size / 1024).toFixed(1);
console.log(`✓ config/site-public.ts written — ${kb} KB (from ${srcKb} KB site.ts)`);

// ── public/gallery-items.json ─────────────────────────────────────────────
// The gallery pages SSR only the first few items to keep the HTML document
// small; the full grid is fetched from this static JSON file on demand.
const galleryPath = path.join(root, "public", "gallery-items.json");
const { GALLERY_ITEMS } = await import(path.join(root, "config", "gallery-items.ts"));
fs.writeFileSync(galleryPath, JSON.stringify(GALLERY_ITEMS));
console.log(
  `✓ public/gallery-items.json written — ${(fs.statSync(galleryPath).size / 1024).toFixed(1)} KB (${GALLERY_ITEMS.length} items)`,
);

// ── public/homepage-data.json ─────────────────────────────────────────────
// The homepage keeps only the above-the-fold content in the server-rendered
// document. The heavier below-the-fold sections (service cards, reviews
// marquee, coverage grid, topical hubs, trust strip) render in client-side
// islands that fetch this file when they approach the viewport. This keeps
// the initial HTML document small for Core Web Vitals while the data stays
// crawlable at a stable URL.
const { googleReviews, googlePlace } = await import(path.join(root, "config", "reviews.ts"));
const { HOMEPAGE_SILO } = await import(path.join(root, "config", "topical-authority-map.ts"));
const homepageData = {
  services: c.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => pick(s, ["slug", "title", "short", "startPrice", "targetProblem", "category"])),
  reviews: { meta: googlePlace, items: googleReviews },
  areas: c.areaPages.map((a) => pick(a, ["slug", "name"])),
  kampungs: [
    { name: "Pandan Indah", parentSlug: "ampang", slug: "pandan-indah" },
    { name: "Bukit Jalil", parentSlug: "sri-petaling", slug: "bukit-jalil" },
    { name: "USJ", parentSlug: "subang-jaya", slug: "usj" },
    { name: "Meru", parentSlug: "klang", slug: "meru" },
    { name: "Port Klang", parentSlug: "klang", slug: "port-klang" },
    { name: "Kundang", parentSlug: "rawang", slug: "kundang" },
    { name: "Dengkil", parentSlug: "putrajaya", slug: "dengkil" },
  ],
  brands: c.brandsSupported,
  silo: {
    problems: HOMEPAGE_SILO.problems.featured,
    brands: HOMEPAGE_SILO.brands.featured,
    areas: HOMEPAGE_SILO.areas.featured,
    blog: HOMEPAGE_SILO.blog.featured,
    installation: HOMEPAGE_SILO.installation.featured,
  },
};
const homePath = path.join(root, "public", "homepage-data.json");
fs.writeFileSync(homePath, JSON.stringify(homepageData));
console.log(
  `✓ public/homepage-data.json written — ${(fs.statSync(homePath).size / 1024).toFixed(1)} KB`,
);
