#!/usr/bin/env node
/**
 * Local link + sitemap integrity crawl.
 *
 * 1. Boots against `next start` on CRAWL_BASE (default http://localhost:3222).
 * 2. Fetches /sitemap.xml and verifies EVERY listed URL returns 200 locally.
 * 3. Crawls every sitemap page, collects all internal hrefs and verifies
 *    each one resolves (catches broken internal links on any language).
 * 4. Reports: sitemap URLs that 404/4xx, internal links that 404/4xx,
 *    and sitemap gaps (routable pages that exist but are missing from
 *    the sitemap).
 *
 * Usage:  node scripts/crawl-local.mjs [baseUrl]
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const BASE = (process.argv[2] || process.env.CRAWL_BASE || "http://localhost:3222").replace(/\/$/, "");

const ok = (s) => s >= 200 && s < 300;
let exitCode = 0;

// ── 1. sitemap URLs ──────────────────────────────────────────────────────
const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
console.log(`sitemap.xml: ${sitemapUrls.length} URLs`);

/** Map a canonical sitemap URL to the local server for checking. */
const localOf = (u) => BASE + new URL(u).pathname;

const statusCache = new Map();
async function check(url) {
  if (statusCache.has(url)) return statusCache.get(url);
  let status = 0;
  try {
    const res = await fetch(url, { redirect: "manual" });
    status = res.status;
    await res.body?.cancel();
  } catch {
    status = -1;
  }
  statusCache.set(url, status);
  return status;
}

// Fetch sitemap URLs in parallel batches
const sitemapBroken = [];
const BATCH = 24;
for (let i = 0; i < sitemapUrls.length; i += BATCH) {
  const slice = sitemapUrls.slice(i, i + BATCH);
  const results = await Promise.all(slice.map(async (u) => [u, await check(localOf(u))]));
  for (const [u, s] of results) if (!ok(s)) sitemapBroken.push([u, s]);
  process.stdout.write(`\r  sitemap checked ${Math.min(i + BATCH, sitemapUrls.length)}/${sitemapUrls.length}`);
}
console.log("");

// ── 2. crawl internal links from every sitemap page ─────────────────────
const INTERNAL = /^\/(?!_next|api|favicon|hero|logo|icons|site-summary|gallery-items|homepage-data|llms|aeo-faq|robots|sitemap|BingSiteAuth|googled|e7492c)/;
const seen = new Set();
const brokenLinks = new Map(); // href -> Set(source pages)

for (let i = 0; i < sitemapUrls.length; i += BATCH) {
  const slice = sitemapUrls.slice(i, i + BATCH);
  const pages = await Promise.all(
    slice.map(async (u) => {
      try {
        const res = await fetch(localOf(u));
        if (!ok(res.status)) return [];
        const html = await res.text();
        const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
        return hrefs.filter((h) => INTERNAL.test(h)).map((h) => h.split("#")[0]);
      } catch {
        return [];
      }
    }),
  );
  const toCheck = new Set();
  for (const hrefs of pages) for (const h of hrefs) if (!seen.has(h)) toCheck.add(h);
  const results = await Promise.all([...toCheck].map(async (h) => [h, await check(`${BASE}${h}`)]));
  for (const [h, s] of results) {
    seen.add(h);
    if (!ok(s)) brokenLinks.set(h, s);
  }
  process.stdout.write(`\r  links checked ${seen.size} unique (${Math.min(i + BATCH, sitemapUrls.length)}/${sitemapUrls.length} pages crawled)`);
}
console.log("\n");

// ── 3. sitemap gap check against build manifest ─────────────────────────
const manifestPath = path.resolve(".next/server/app-paths-manifest.json");
let gapNote = "";
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const routes = Object.keys(manifest)
    .filter((r) => r.endsWith("/page") || r === "/page")
    .map((r) => r.replace(/\/page$/, "") || "/")
    // Strip Next.js route-group segments like "/(en)" or "/(ms)".
    .map((r) => r.replace(/\/\([^)]+\)/g, "") || "/")
    .filter((r) => !r.startsWith("/admin") && !r.includes("api") && !r.startsWith("/_"))
    // Deliberately not in the sitemap: /review is a noindex post-service
    // "thank you / leave a review" conversion page.
    .filter((r) => !(r === "/review" || r === "/ms/review" || r === "/zh/review"));
  const sitemapPaths = new Set(sitemapUrls.map((u) => new URL(u).pathname));
  const dynamicish = (r) => r.includes("[");
  const staticMissing = routes.filter((r) => !dynamicish(r) && !sitemapPaths.has(r));
  gapNote = staticMissing.length
    ? `⚠ Routable pages missing from sitemap: ${staticMissing.join(", ")}`
    : "✓ All static routes are present in sitemap.xml";
  console.log(gapNote);
}

// ── report ───────────────────────────────────────────────────────────────
console.log("\n════════════════ RESULTS ════════════════");
if (sitemapBroken.length) {
  exitCode = 1;
  console.log(`✗ ${sitemapBroken.length} sitemap URLs did not return 200:`);
  for (const [u, s] of sitemapBroken) console.log(`   ${s}  ${u}`);
} else {
  console.log(`✓ All ${sitemapUrls.length} sitemap URLs return 200`);
}
if (brokenLinks.size) {
  exitCode = 1;
  console.log(`✗ ${brokenLinks.size} broken internal links found:`);
  for (const [h, s] of [...brokenLinks].sort()) console.log(`   ${s}  ${h}`);
} else {
  console.log(`✓ No broken internal links across ${seen.size} unique internal hrefs`);
}
process.exit(exitCode);
