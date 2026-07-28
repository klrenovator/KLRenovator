// ─────────────────────────────────────────────────────────────────────────
// Google Search Console readiness audit — reads the REAL build output.
//
//   npm run build && node scripts/gsc-audit.mjs
//
// Every check maps to a status Google actually reports in the
// "Page indexing" report, so a failure here is a page that will not rank.
// ─────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";

const APP = ".next/server/app";
const BASE = "https://www.klrenovator.com";

if (!fs.existsSync(APP)) {
  console.error("✗ No build output. Run `npm run build` first.");
  process.exit(1);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const htmlFiles = walk(APP);
const routeOf = (f) => {
  const r = f.slice(APP.length).replace(/\.html$/, "");
  return r === "/index" ? "/" : r;
};

// ── Parse every built page ───────────────────────────────────────────────
const pages = new Map();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeOf(file);

  const canonical =
    (html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/) ||
      html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/) ||
      [])[1] || null;

  const alternates = [
    ...html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/g),
  ].map((m) => ({ lang: m[1], href: m[2] }));

  const robots = (html.match(/<meta name="robots" content="([^"]+)"/) || [])[1] || "";
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const ogLocale = (html.match(/<meta property="og:locale" content="([^"]+)"/) || [])[1] || "";
  const htmlLang = (html.match(/<html lang="([^"]+)"/) || [])[1] || "";

  // Internal links (href="/...") — excludes anchors, mailto, tel, external
  const links = [
    ...html.matchAll(/href="(\/[^"#?]*)"/g),
  ].map((m) => m[1].replace(/\/$/, "") || "/");

  pages.set(route, { route, canonical, alternates, robots, title, desc, ogLocale, htmlLang, links, html });
}

// ── Sitemap ──────────────────────────────────────────────────────────────
const sitemapPath = path.join(APP, "sitemap.xml.body");
const sitemapXml = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const sitemapRoutes = new Set(
  sitemapUrls.map((u) => u.replace(BASE, "").replace(/\/$/, "") || "/"),
);

const errors = [];
const warnings = [];
const E = (cat, msg) => errors.push([cat, msg]);
const W = (cat, msg) => warnings.push([cat, msg]);

// ─────────────────────────────────────────────────────────────────────────
// 1. GSC "Alternate page with proper canonical tag" / "Duplicate, Google
//    chose a different canonical" — a page whose canonical points elsewhere
//    is voluntarily deindexed.
// ─────────────────────────────────────────────────────────────────────────
const selfCanonBad = [];
for (const p of pages.values()) {
  if (p.route.startsWith("/admin") || p.route === "/_not-found") continue;
  if (!p.canonical) {
    E("no-canonical", p.route);
    continue;
  }
  const canonRoute = p.canonical.replace(BASE, "").replace(/\/$/, "") || "/";
  if (canonRoute !== p.route) selfCanonBad.push(`${p.route} → ${canonRoute}`);
}
for (const b of selfCanonBad) E("canonical-points-elsewhere", b);

// ─────────────────────────────────────────────────────────────────────────
// 2. Sitemap ↔ index directive conflict.
//    A noindex URL inside the sitemap = GSC "Submitted URL marked noindex".
// ─────────────────────────────────────────────────────────────────────────
for (const p of pages.values()) {
  const noindex = /noindex/i.test(p.robots);
  if (noindex && sitemapRoutes.has(p.route)) E("noindex-in-sitemap", p.route);
}

// ─────────────────────────────────────────────────────────────────────────
// 3. Indexable pages missing from the sitemap → "Discovered – currently not
//    indexed" / slow discovery.
// ─────────────────────────────────────────────────────────────────────────
for (const p of pages.values()) {
  if (p.route.startsWith("/admin") || p.route === "/_not-found") continue;
  if (/noindex/i.test(p.robots)) continue;
  if (!sitemapRoutes.has(p.route)) W("indexable-not-in-sitemap", p.route);
}

// ─────────────────────────────────────────────────────────────────────────
// 4. hreflang reciprocity. Google drops the whole cluster if A→B but B↛A.
// ─────────────────────────────────────────────────────────────────────────
const routeExists = (r) => pages.has(r === "/" ? "/" : r);
let hreflangNoReturn = 0;
for (const p of pages.values()) {
  if (!p.alternates.length) continue;
  for (const alt of p.alternates) {
    if (alt.lang === "x-default") continue;
    const target = alt.href.replace(BASE, "").replace(/\/$/, "") || "/";
    if (!routeExists(target)) {
      E("hreflang-target-404", `${p.route} → ${alt.lang}:${target}`);
      continue;
    }
    const tp = pages.get(target);
    const returns = tp.alternates.some(
      (a) => (a.href.replace(BASE, "").replace(/\/$/, "") || "/") === p.route,
    );
    if (!returns) {
      hreflangNoReturn++;
      if (hreflangNoReturn <= 40)
        E("hreflang-no-return-tag", `${p.route} → ${target} (no link back)`);
    }
  }
}
if (hreflangNoReturn > 40)
  E("hreflang-no-return-tag", `…and ${hreflangNoReturn - 40} more`);

// ─────────────────────────────────────────────────────────────────────────
// 5. Self-referencing hreflang. Every page in a cluster must list itself.
// ─────────────────────────────────────────────────────────────────────────
for (const p of pages.values()) {
  if (!p.alternates.length) continue;
  const listsSelf = p.alternates.some(
    (a) => (a.href.replace(BASE, "").replace(/\/$/, "") || "/") === p.route,
  );
  if (!listsSelf) W("hreflang-missing-self", p.route);
}

// ─────────────────────────────────────────────────────────────────────────
// 6. Duplicate <title> / meta description across indexable pages.
// ─────────────────────────────────────────────────────────────────────────
const byTitle = new Map();
const byDesc = new Map();
for (const p of pages.values()) {
  if (/noindex/i.test(p.robots) || p.route.startsWith("/admin")) continue;
  if (p.title) (byTitle.get(p.title) || byTitle.set(p.title, []).get(p.title)).push(p.route);
  if (p.desc) (byDesc.get(p.desc) || byDesc.set(p.desc, []).get(p.desc)).push(p.route);
}
const dupTitles = [...byTitle.entries()].filter(([, r]) => r.length > 1);
const dupDescs = [...byDesc.entries()].filter(([, r]) => r.length > 1);
for (const [t, r] of dupTitles.slice(0, 15))
  W("duplicate-title", `${r.length}× "${t.slice(0, 70)}" → ${r.slice(0, 3).join(", ")}`);
if (dupTitles.length > 15) W("duplicate-title", `…and ${dupTitles.length - 15} more`);
for (const [d, r] of dupDescs.slice(0, 15))
  W("duplicate-description", `${r.length}× "${d.slice(0, 60)}…" → ${r.slice(0, 3).join(", ")}`);
if (dupDescs.length > 15) W("duplicate-description", `…and ${dupDescs.length - 15} more`);

// ─────────────────────────────────────────────────────────────────────────
// 7. Internal links pointing at routes that do not exist → GSC "Not found
//    (404)" plus wasted crawl budget and lost PageRank.
// ─────────────────────────────────────────────────────────────────────────
const dynamicPrefixes = ["/api/", "/_next/"];
const broken = new Map();
for (const p of pages.values()) {
  for (const l of new Set(p.links)) {
    if (dynamicPrefixes.some((d) => l.startsWith(d))) continue;
    if (/\.(png|jpe?g|webp|avif|svg|ico|txt|xml|json|html|webmanifest)$/i.test(l)) continue;
    if (!pages.has(l)) {
      if (!broken.has(l)) broken.set(l, new Set());
      broken.get(l).add(p.route);
    }
  }
}
for (const [target, sources] of [...broken.entries()].sort((a, b) => b[1].size - a[1].size)) {
  E("internal-link-404", `${target}  (linked from ${sources.size} page(s), e.g. ${[...sources][0]})`);
}

// ─────────────────────────────────────────────────────────────────────────
// 8. og:locale / <html lang> vs. URL locale.
// ─────────────────────────────────────────────────────────────────────────
for (const p of pages.values()) {
  const expected = p.route.startsWith("/ms") ? "ms" : p.route.startsWith("/zh") ? "zh" : "en";
  if (p.ogLocale) {
    const got = p.ogLocale.slice(0, 2).toLowerCase();
    if (got !== expected) W("og-locale-mismatch", `${p.route}: og:locale=${p.ogLocale}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 9. Sitemap sanity — dead URLs, dupes, protocol/host consistency.
// ─────────────────────────────────────────────────────────────────────────
const seen = new Set();
for (const u of sitemapUrls) {
  if (seen.has(u)) E("sitemap-duplicate-url", u);
  seen.add(u);
  if (!u.startsWith(`${BASE}/`) && u !== BASE) E("sitemap-wrong-host", u);
}
for (const r of sitemapRoutes) if (!pages.has(r)) E("sitemap-url-not-built", r);
if (sitemapUrls.length > 50000) E("sitemap-too-large", `${sitemapUrls.length} URLs (max 50,000)`);

// ─────────────────────────────────────────────────────────────────────────
// 10. Title / description length (truncation in SERPs, not an index error).
// ─────────────────────────────────────────────────────────────────────────
let longTitle = 0, longDesc = 0, shortDesc = 0, noDesc = 0;
for (const p of pages.values()) {
  if (/noindex/i.test(p.robots) || p.route.startsWith("/admin")) continue;
  const t = p.title.replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
  if (t.length > 60) longTitle++;
  if (!p.desc) noDesc++;
  else if (p.desc.length > 160) longDesc++;
  else if (p.desc.length < 70) shortDesc++;
}

// ── Report ───────────────────────────────────────────────────────────────
const group = (list) => {
  const m = new Map();
  for (const [cat, msg] of list) (m.get(cat) || m.set(cat, []).get(cat)).push(msg);
  return m;
};

console.log("═".repeat(74));
console.log("  GOOGLE SEARCH CONSOLE READINESS AUDIT");
console.log("═".repeat(74));
console.log(`  pages built      : ${pages.size}`);
console.log(`  sitemap URLs     : ${sitemapUrls.length}`);
console.log(`  titles > 60 chars: ${longTitle}`);
console.log(`  descriptions     : ${noDesc} missing · ${longDesc} > 160 · ${shortDesc} < 70`);
console.log("");

const eg = group(errors);
const wg = group(warnings);

if (eg.size) {
  console.log("─".repeat(74));
  console.log("  ERRORS — these block or waste indexing");
  console.log("─".repeat(74));
  for (const [cat, msgs] of eg) {
    console.log(`\n  ✗ ${cat}  (${msgs.length})`);
    for (const m of msgs.slice(0, 25)) console.log(`      • ${m}`);
    if (msgs.length > 25) console.log(`      … and ${msgs.length - 25} more`);
  }
  console.log("");
}

if (wg.size) {
  console.log("─".repeat(74));
  console.log("  WARNINGS — quality / crawl-efficiency issues");
  console.log("─".repeat(74));
  for (const [cat, msgs] of wg) {
    console.log(`\n  ⚠ ${cat}  (${msgs.length})`);
    for (const m of msgs.slice(0, 20)) console.log(`      • ${m}`);
    if (msgs.length > 20) console.log(`      … and ${msgs.length - 20} more`);
  }
  console.log("");
}

console.log("═".repeat(74));
if (!errors.length) console.log("  ✓ No indexing-blocking errors found");
else console.log(`  ${errors.length} error(s), ${warnings.length} warning(s)`);
console.log("═".repeat(74));

process.exit(errors.length ? 1 : 0);
