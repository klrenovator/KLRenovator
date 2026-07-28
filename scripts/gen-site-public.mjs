// ─────────────────────────────────────────────────────────────────────────
// Generates `config/site-public.ts` — the small, client-safe projection of
// the very large `config/site.ts`.
//
// Run:  npm run gen:site-public
//
// Re-run this whenever you change phone / whatsapp / email / links /
// pricing / services / stats / area names / brand names / problem names in
// config/site.ts, so the client-side copy stays in sync. Everything else in
// site.ts (long descriptions, FAQs, kampung content) is server-only and is
// deliberately NOT copied here.
// ─────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitePath = path.join(root, "config", "site.ts");
const outPath = path.join(root, "config", "site-public.ts");
const tmpPath = path.join(root, "config", ".site-eval.tmp.mjs");

// config/site.ts is plain data (zero imports), so we can strip the few bits
// of TS syntax it uses and evaluate it directly as an ES module.
let src = fs.readFileSync(sitePath, "utf8");
src = src.replace(/^export type SiteConfig.*$/m, "");
src = src.replace(/ as const/g, "");
src = src.replace(/^export const siteConfig =/m, "const siteConfig =");
src += "\nexport default siteConfig;\n";

fs.writeFileSync(tmpPath, src);

let c;
try {
  const mod = await import(pathToFileURL(tmpPath).href);
  c = mod.default;
} finally {
  fs.rmSync(tmpPath, { force: true });
}

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
  // Only the fields client components actually render — no `short`-form
  // prose beyond the service card blurb, no FAQ arrays.
  services: c.services.map((s) =>
    pick(s, ["slug", "title", "short", "startPrice", "icon", "targetProblem", "category"]),
  ),
  // "Lite" list variants: slug + display name only. Used for link grids and
  // dropdowns. The full objects (descriptions, FAQs, meta) stay server-side.
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
const srcKb = (fs.statSync(sitePath).size / 1024).toFixed(1);
console.log(`✓ config/site-public.ts written — ${kb} KB (from ${srcKb} KB site.ts)`);
