// ─────────────────────────────────────────────────────────────────────────
// Post-build smoke checks.
//
// Run AFTER `npm run build`:   npm run verify:build
//
// These are the regressions this repo has actually had, encoded as
// assertions so they cannot come back silently:
//   1. A giant config chunk leaking into the client bundle.
//   2. Sitemap URLs with no corresponding prerendered page.
//   3. Pages missing an <h1>, or shipping more than one.
//   4. Over-length <title> tags.
//   5. Key installation routes disappearing from the build.
// ─────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";

const APP = ".next/server/app";
const failures = [];
const warnings = [];

function fail(msg) {
  failures.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

if (!fs.existsSync(APP)) {
  console.error("✗ No build output found. Run `npm run build` first.");
  process.exit(1);
}

// ── Collect built HTML ───────────────────────────────────────────────────
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}
const htmlFiles = walk(APP);
const routeOf = (file) => {
  const r = file.slice(APP.length).replace(/\.html$/, "");
  return r === "/index" ? "" : r;
};

// ── 1. Client bundle budget ──────────────────────────────────────────────
// config/site.ts is ~1.1 MB. If it ever ends up in a client chunk again,
// a chunk far larger than any legitimate one will appear.
const CHUNK_BUDGET_BYTES = 400 * 1024;
const chunkDir = ".next/static/chunks";
if (fs.existsSync(chunkDir)) {
  const oversized = fs
    .readdirSync(chunkDir)
    .filter((f) => f.endsWith(".js"))
    .map((f) => ({ f, size: fs.statSync(path.join(chunkDir, f)).size }))
    .filter((c) => c.size > CHUNK_BUDGET_BYTES);

  for (const c of oversized) {
    fail(
      `Client chunk ${c.f} is ${(c.size / 1024).toFixed(0)} KB (budget ${CHUNK_BUDGET_BYTES / 1024} KB). ` +
        `Likely a server-only module (e.g. config/site.ts) leaked into a "use client" graph.`,
    );
  }
}

// ── 2. Sitemap URLs must resolve to real pages ───────────────────────────
const sitemapBody = path.join(APP, "sitemap.xml.body");
if (fs.existsSync(sitemapBody)) {
  const xml = fs.readFileSync(sitemapBody, "utf8");
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const built = new Set(htmlFiles.map(routeOf));

  const missing = locs
    .map((u) => u.replace("https://www.klrenovator.com", "").replace(/\/$/, ""))
    .filter((p) => !built.has(p));

  if (missing.length) {
    fail(`${missing.length} sitemap URL(s) have no prerendered page: ${missing.slice(0, 5).join(", ")}`);
  }
  console.log(`  sitemap: ${locs.length} URLs, all resolve ✓`);
} else {
  warn("sitemap.xml.body not found — skipped sitemap/page cross-check.");
}

// ── 3 & 4. Per-page heading and title checks ─────────────────────────────
let noH1 = [];
let multiH1 = [];
let longTitles = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeOf(file) || "/";

  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) noH1.push(route);
  else if (h1s.length > 1) multiH1.push(`${route} (${h1s.length})`);

  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  if (titleMatch) {
    const title = titleMatch[1].replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
    if (title.length > 60) longTitles.push(`${route} (${title.length})`);
  }
}

// /admin/bookings is a login gate — no h1 expected there.
noH1 = noH1.filter((r) => !r.startsWith("/admin"));

if (noH1.length) fail(`${noH1.length} page(s) missing an <h1>: ${noH1.slice(0, 8).join(", ")}`);
if (multiH1.length)
  fail(`${multiH1.length} page(s) with multiple <h1>: ${multiH1.slice(0, 8).join(", ")}`);
if (longTitles.length)
  warn(`${longTitles.length} page(s) with <title> over 60 chars: ${longTitles.slice(0, 8).join(", ")}`);

// ── 5. Key installation routes must exist ────────────────────────────────
const REQUIRED = [
  "/installation",
  "/ms/installation",
  "/zh/installation",
  "/aircond-installation-kl",
  "/installation-price-malaysia",
  "/btu-calculator",
  "/book",
  "/privacy-policy",
  // Interactive tools & calculators (2026-08)
  "/tools",
  "/aircond-installation-cost-calculator",
  "/aircond-gas-topup-cost-calculator",
  "/which-aircond-service-do-i-need",
  "/aircond-size-calculator",
  "/aircond-electricity-cost-calculator",
  "/aircond-savings-calculator",
  "/aircond-assistant",
];
const builtSet = new Set(htmlFiles.map(routeOf));
for (const route of REQUIRED) {
  if (!builtSet.has(route)) fail(`Required route did not build: ${route}`);
}

// ── Report ───────────────────────────────────────────────────────────────
console.log(`  pages built: ${htmlFiles.length}`);
console.log(`  h1 coverage: ${htmlFiles.length - noH1.length}/${htmlFiles.length}`);

for (const w of warnings) console.warn(`⚠ ${w}`);

if (failures.length) {
  console.error("\n✗ Build verification FAILED:");
  for (const f of failures) console.error(`  • ${f}`);
  process.exit(1);
}

console.log("\n✓ Build verification passed");
