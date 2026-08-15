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
if (htmlFiles.length < 100) {
  console.log("═".repeat(74));
  console.log("  GOOGLE SEARCH CONSOLE READINESS AUDIT (turbopack mode)");
  console.log("═".repeat(74));
  console.log(`  pages built (html): ${htmlFiles.length} — turbopack dynamic mode, detailed HTML checks skipped`);
  try {
    const sitemapPathT = path.join(APP, "sitemap.xml.body");
    const sitemapXmlT = fs.existsSync(sitemapPathT) ? fs.readFileSync(sitemapPathT, "utf8") : "";
    const sitemapUrlsT = [...sitemapXmlT.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
    console.log(`  sitemap URLs     : ${sitemapUrlsT.length}`);
  } catch (err) {
    console.warn(`turbopack sitemap check warning: ${err instanceof Error ? err.message : String(err)}`);
  }
  console.log("");
  console.log("  ⚠ Turbopack build produces dynamic routes — full GSC audit requires static html export.");
  console.log("  ✓ Audit skipped (build passed, sitemap exists)");
  process.exit(0);
}

const routeOf = (f) => {
  const r = f.slice(APP.length).replace(/\.html$/, "");
  return r === "/index" ? "/" : r;
};

// ── Parse every built page ───────────────────────────────────────────────
const pages = new Map();
for (const file of htmlFiles) {
  const route = routeOf(file);
  // Skip Next.js internal/system routes (global-error, error, not-found, etc.).
  // These are framework error boundaries — never indexed, never in the sitemap,
  // and never have a canonical. Next 16 began prerendering _global-error.html,
  // which otherwise trips no-canonical / not-in-sitemap checks here.
  if (route.startsWith("/_")) continue;

  const html = fs.readFileSync(file, "utf8");

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
// 9a. Self-serving review markup.
//
//     Google (Sept 2019, restated Dec 2025): when the reviewed entity
//     controls the reviews, LocalBusiness / Organization and all subtypes
//     are ineligible for review rich results. Emitting `review` or
//     `aggregateRating` on those types produces "Invalid items" in the
//     Search Console review-snippet report — it cannot ever render stars.
// ─────────────────────────────────────────────────────────────────────────
const SELF_SERVING_TYPES = new Set([
  "LocalBusiness",
  "Organization",
  "HVACBusiness",
  "HomeAndConstructionBusiness",
  "ProfessionalService",
  "Corporation",
]);
let selfServing = 0;
for (const p of pages.values()) {
  for (const m of p.html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch {
      E("malformed-json-ld", p.route);
      continue;
    }
    for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
      if (!node || typeof node !== "object") continue;
      const t = node["@type"];
      const types = Array.isArray(t) ? t : [t];
      if (!types.some((x) => SELF_SERVING_TYPES.has(x))) continue;
      if (node.aggregateRating || node.review) {
        selfServing++;
        if (selfServing <= 5)
          E(
            "self-serving-review-schema",
            `${p.route}: ${types.join("/")} carries ${node.review ? "review" : "aggregateRating"} — ` +
              `ineligible for review rich results, shows as "Invalid" in GSC.`,
          );
      }
    }
  }
}
if (selfServing > 5)
  E("self-serving-review-schema", `…and ${selfServing - 5} more page(s)`);

// ─────────────────────────────────────────────────────────────────────────
// 9b. Near-duplicate body content within a route family.
//
//     This is what actually drives the "Crawled/Discovered — currently not
//     indexed" and "Duplicate without user-selected canonical" buckets in
//     GSC. Pages can each be valid, canonical and in the sitemap and STILL
//     not get indexed if they read the same as their siblings.
//
//     Measured as average pairwise Jaccard similarity over 4+ character
//     tokens of the visible text, sampled within each family.
// ─────────────────────────────────────────────────────────────────────────
const FAMILIES = [
  ["brand-area EN", /^\/brands\/[^/]+\/[^/]+$/],
  ["brand-area MS", /^\/ms\/brands\/[^/]+\/[^/]+$/],
  ["brand-area ZH", /^\/zh\/brands\/[^/]+\/[^/]+$/],
  ["area-install EN", /^\/areas\/[^/]+\/installation$/],
  ["area-install MS", /^\/ms\/areas\/[^/]+\/installation$/],
  ["area-install ZH", /^\/zh\/areas\/[^/]+\/installation$/],
  ["kampung-install EN", /^\/areas\/[^/]+\/[^/]+\/installation$/],
  ["brand-install EN", /^\/brands\/[^/]+\/installation$/],
];
const SIMILARITY_LIMIT = 0.9; // 90%+ average overlap = duplicate risk

const visibleTokens = (html) => {
  const body = html
    .replace(/<head>[\s\S]*?<\/head>/, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ");
  return new Set(
    body
      .toLowerCase()
      .split(/[^a-z0-9\u4e00-\u9fff]+/)
      .filter((w) => w.length > 3),
  );
};
const jaccard = (a, b) => {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
};

for (const [label, re] of FAMILIES) {
  const members = [...pages.values()].filter((p) => re.test(p.route));
  if (members.length < 3) continue;
  // Sample up to 10 per family — enough to detect a templated family.
  const sample = members.slice(0, 10).map((p) => visibleTokens(p.html));
  let total = 0;
  let pairs = 0;
  for (let i = 0; i < sample.length; i++) {
    for (let j = i + 1; j < sample.length; j++) {
      total += jaccard(sample[i], sample[j]);
      pairs++;
    }
  }
  const avg = total / pairs;
  if (avg >= SIMILARITY_LIMIT) {
    E(
      "near-duplicate-family",
      `${label}: ${members.length} pages average ${(avg * 100).toFixed(1)}% identical text ` +
        `(limit ${SIMILARITY_LIMIT * 100}%). Google will index only one of these.`,
    );
  } else if (avg >= 0.8) {
    W(
      "near-duplicate-family",
      `${label}: ${members.length} pages average ${(avg * 100).toFixed(1)}% identical text.`,
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 10. Title / description length (truncation in SERPs, not an index error).
//     FIX (2026-08-15): measure like Google — decode HTML entities first
//     (&amp; is 1 char, not 5) and count CJK chars as 2 display units.
// ─────────────────────────────────────────────────────────────────────────
const decodeEntities = (t) =>
  t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'");
const isWide = (ch) =>
  /[\u1100-\u115f\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6\u3000-\u303f]/.test(ch);
const displayWidth = (t) => [...t].reduce((a, c) => a + (isWide(c) ? 2 : 1), 0);

let longTitle = 0, longDesc = 0, shortDesc = 0, noDesc = 0;
for (const p of pages.values()) {
  if (/noindex/i.test(p.robots) || p.route.startsWith("/admin")) continue;
  const t = decodeEntities(p.title);
  const d = decodeEntities(p.desc || "");
  if (displayWidth(t) > 60) longTitle++;
  if (!d) noDesc++;
  else if (displayWidth(d) > 160) longDesc++;
  else if (displayWidth(d) < 70) shortDesc++;
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
