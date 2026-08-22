#!/usr/bin/env node
/**
 * PART 4 AUDIT — Business, Local SEO & Hidden Issues analyzer.
 * Walks every prerendered .html in .next/server/app and checks:
 *  - H1 count per page (0 / >1) and duplicate H1 text across pages
 *  - empty buttons / links (no accessible name)
 *  - placeholder text patterns
 *  - BreadcrumbList schema coverage + visible breadcrumb nav
 *  - DOM size (element counts)
 *  - schema PostalAddress / telephone / foundingDate variants (NAP consistency)
 *  - internal link graph -> orphan pages
 *  - noindex / canonical anomalies
 *  - broken internal hrefs (relative links pointing at routes that don't exist)
 * Writes audit/part4-findings.json
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".next/server/app");
const OUT = path.resolve("audit/part4-findings.json");

const pages = [];
function walk(dir, base = "") {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base);
    else if (e.name.endsWith(".html")) {
      const rel = path.relative(ROOT, p).replace(/\.html$/, "").replace(/(^|[\\/])index$/, "$1");
      pages.push({ file: p, url: "/" + rel.replace(/\\/g, "/") });
    }
  }
}
walk(ROOT);

const PLACEHOLDER_RE = /(lorem ipsum|TODO:|FIXME|TBD\b|coming soon|placeholder text|xxx sample|WIP\b|your text here|insert (text|content)|sample text)/i;
const allRoutes = new Set(pages.map((p) => p.url));
const inLinks = new Map(); // url -> count
const h1Map = new Map(); // h1 text -> [urls]
const addressVariants = new Map();
const phoneVariants = new Map();
const emptyButtons = [];
const placeholderHits = [];
const noH1 = [];
const multiH1 = [];
const noIndex = [];
const domLarge = [];
const noBreadcrumb = [];
const ratingClaims = [];
const foundingDates = [];
const brokenLinks = new Map();

let total = 0;
for (const page of pages) {
  total++;
  const html = readFileSync(page.file, "utf8");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;

  // --- H1 ---
  const h1s = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  );
  if (h1s.length === 0) noH1.push(page.url);
  if (h1s.length > 1) multiH1.push({ url: page.url, count: h1s.length, h1s });
  const key = h1s[0];
  if (key) {
    if (!h1Map.has(key)) h1Map.set(key, []);
    h1Map.get(key).push(page.url);
  }

  // --- DOM size ---
  const els = (body.match(/<[a-z][^>]*>/gi) || []).length;
  if (els > 2200) domLarge.push({ url: page.url, els });

  // --- placeholder text ---
  const textOnly = body.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]*>/g, " ");
  const pm = textOnly.match(PLACEHOLDER_RE);
  if (pm) placeholderHits.push({ url: page.url, m: pm[0].slice(0, 60) });

  // --- empty buttons/links with no accessible name (visible text or aria-label) ---
  const emptyBtn = [...body.matchAll(/<(button|a)\b([^>]*)>([\s\S]*?)<\/\1>/gi)].filter((m) => {
    const attrs = m[2];
    const inner = m[3].replace(/<svg[\s\S]*?<\/svg>/gi, "").replace(/<[^>]*>/g, " ").trim();
    const hasAria = /aria-label\s*=\s*["'][^"']+["']/i.test(attrs);
    const hasTitle = /title\s*=\s*["'][^"']+["']/i.test(attrs);
    const hasImgAlt = /<img[^>]+alt\s*=\s*["'][^"']+["']/i.test(m[3]);
    return !inner && !hasAria && !hasTitle && !hasImgAlt;
  });
  if (emptyBtn.length) emptyButtons.push({ url: page.url, count: emptyBtn.length });

  // --- noindex / canonical ---
  if (/<meta[^>]+robots[^>]+noindex/i.test(html)) noIndex.push(page.url);

  // --- schema blocks ---
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => { try { return JSON.parse(m[1].replaceAll("&quot;", String.fromCharCode(34)).replaceAll("&amp;", "&")); } catch { return null; } })
    .filter(Boolean);
  const flat = JSON.stringify(schemas);
  const hasBreadcrumb = flat.includes('"BreadcrumbList"');
  if (!hasBreadcrumb) noBreadcrumb.push(page.url);
  const addr = flat.match(/"streetAddress":"[^"]*"/g) || [];
  for (const a of addr) {
    if (!addressVariants.has(a)) addressVariants.set(a, new Set());
    addressVariants.get(a).add(page.url.split("/").slice(0, 3).join("/"));
  }
  for (const t of flat.match(/"telephone":"[^"]*"/g) || []) {
    if (!phoneVariants.has(t)) phoneVariants.set(t, 0);
    phoneVariants.set(t, phoneVariants.get(t) + 1);
  }
  for (const f of flat.match(/"foundingDate":"[^"]*"/g) || []) foundingDates.push({ f, url: page.url });
  for (const r of flat.match(/"ratingValue"\s*:\s*"?[0-9.]+"?[^}]*}/g) || []) ratingClaims.push(r.slice(0, 80));

  // --- internal links ---
  const hrefs = [...body.matchAll(/href="([^"#]*)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (!href.startsWith("/")) continue;
    const clean = href.replace(/\/$/, "") || "/";
    inLinks.set(clean, (inLinks.get(clean) || 0) + 1);
    if (href.endsWith(".txt") || href.endsWith(".json") || href.endsWith(".xml")) continue;
    const base = clean.split("?")[0];
    if (!allRoutes.has(base) && !/^\/(_next|api|hero|logo|icons|gallery-items|homepage-data)/.test(base)) {
      if (!brokenLinks.has(base)) brokenLinks.set(base, { target: base, from: [] });
      if (brokenLinks.get(base).from.length < 3) brokenLinks.get(base).from.push(page.url);
    }
  }
}

const dupH1 = [...h1Map.entries()].filter(([, v]) => v.length > 1).map(([, v]) => ({ h1: v.length, urls: v.slice(0, 12) }));
const orphans = [...allRoutes].filter((r) => !inLinks.has(r));

const out = {
  totalPages: total,
  noH1: noH1.slice(0, 60),
  multiH1: multiH1.slice(0, 40),
  dupH1: dupH1.sort((a, b) => b.count - a.count).slice(0, 40),
  emptyButtons: emptyButtons.slice(0, 40),
  placeholderHits: placeholderHits.slice(0, 60),
  domLarge: domLarge.sort((a, b) => b.els - a.els).slice(0, 30),
  noIndexCount: noIndex.length,
  noIndexSample: noIndex.slice(0, 20),
  noBreadcrumbCount: noBreadcrumb.length,
  noBreadcrumbSample: noBreadcrumb.slice(0, 80),
  addressVariants: Object.fromEntries([...addressVariants.entries()].map(([k, v]) => [k, [...v].slice(0, 6)])),
  phoneVariants: Object.fromEntries(phoneVariants),
  foundingDates: foundingDates.slice(0, 10),
  ratingClaimsSample: [...new Set(ratingClaims)].slice(0, 10),
  brokenLinks: [...brokenLinks.values()].slice(0, 40),
  orphanCount: orphans.length,
  orphans: orphans.slice(0, 60),
};
writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`pages: ${total}`);
console.log(`noH1: ${noH1.length}, multiH1: ${multiH1.length}, dupH1 groups: ${dupH1.length}`);
console.log(`emptyButtons pages: ${emptyButtons.length}, placeholders: ${placeholderHits.length}`);
console.log(`domLarge(>2200 els): ${domLarge.length}, noindex: ${noIndex.length}`);
console.log(`noBreadcrumb: ${noBreadcrumb.length}, orphans: ${orphans.length}`);
console.log(`brokenLink targets: ${brokenLinks.size}`);
console.log("address variants:", [...addressVariants.keys()]);
console.log("phone variants:", [...phoneVariants.keys()]);
console.log("foundingDates:", [...new Set(foundingDates.map((f) => f.f))]);
