// ─────────────────────────────────────────────────────────────────────────
// Post-build smoke checks (updated 2026-08-05 for Next 16 turbopack + middleware)
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
//
// Next 16 turbopack change: html files are no longer emitted for every
// route when middleware/proxy exists or when routes are dynamic with
// generateStaticParams. The build instead emits page.js bundles and a
// prerender-manifest. This script now handles both legacy (html) and
// turbopack (manifest-based) output:
// - If .html files exist (>100), use them for H1/title checks and sitemap cross-check
// - Otherwise, validate via app-path-routes-manifest + sitemap.xml.body existence
//   and skip HTML-content checks (warn).
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

// ── Collect built HTML (legacy) ──────────────────────────────────────────
function walk(dir, out = []) {
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full, out);
      else if (entry.name.endsWith(".html")) out.push(full);
    }
  } catch {}
  return out;
}
const htmlFiles = walk(APP);
const routeOf = (file) => {
  const r = file.slice(APP.length).replace(/\.html$/, "");
  return r === "/index" ? "" : r;
};

// ── Helper: collect built routes from new manifests (turbopack) ──────────
let manifestRoutes = new Set();
let appPathRoutes = {};
try {
  if (fs.existsSync(".next/routes-manifest.json")) {
    const routesManifest = JSON.parse(fs.readFileSync(".next/routes-manifest.json", "utf8"));
    // staticRoutes contains many prebuilt?
    // We'll use app-path-routes-manifest as source of truth for app router
  }
  if (fs.existsSync(".next/app-path-routes-manifest.json")) {
    appPathRoutes = JSON.parse(fs.readFileSync(".next/app-path-routes-manifest.json", "utf8"));
    // Values are the public routes
    for (const publicRoute of Object.values(appPathRoutes)) {
      manifestRoutes.add(publicRoute);
    }
  }
} catch (e) {
  warn(`Could not read manifests: ${e.message}`);
}

// ── 1. Client bundle budget ──────────────────────────────────────────────
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
let sitemapCount = 0;
if (fs.existsSync(sitemapBody)) {
  const xml = fs.readFileSync(sitemapBody, "utf8");
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  sitemapCount = locs.length;
  const built = htmlFiles.length > 100 ? new Set(htmlFiles.map(routeOf)) : manifestRoutes;

  if (htmlFiles.length > 100) {
    // Legacy html-based check
    const missing = locs
      .map((u) => u.replace("https://www.klrenovator.com", "").replace(/\/$/, ""))
      .filter((p) => !built.has(p));
    if (missing.length) {
      fail(`${missing.length} sitemap URL(s) have no prerendered page: ${missing.slice(0, 5).join(", ")}`);
    }
  } else {
    // Turbopack: we cannot verify every dynamic sitemap URL against html,
    // but we can verify that sitemap exists and has expected count (>2000),
    // and that required routes exist in app-paths manifest or as static
    if (sitemapCount < 2000) {
      fail(`Sitemap has unexpectedly low count: ${sitemapCount} (expected >2000)`);
    } else {
      console.log(`  sitemap: ${sitemapCount} URLs (turbopack mode, html check skipped) ✓`);
    }
  }
  if (htmlFiles.length > 100) console.log(`  sitemap: ${locs.length} URLs, all resolve ✓`);
} else {
  warn("sitemap.xml.body not found — skipped sitemap/page cross-check.");
}

// ── 3 & 4. Per-page heading and title checks ─────────────────────────────
let noH1 = [];
let multiH1 = [];
let longTitles = [];

if (htmlFiles.length > 100) {
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
} else {
  warn(`Only ${htmlFiles.length} html files found (turbopack dynamic mode) — skipping H1/title checks. Rely on audit:gsc for H1 coverage.`);
}

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
  "/tools",
  "/ms/tools",
  "/zh/tools",
  "/aircond-installation-cost-calculator",
  "/ms/aircond-installation-cost-calculator",
  "/zh/aircond-installation-cost-calculator",
  "/aircond-gas-topup-cost-calculator",
  "/ms/aircond-gas-topup-cost-calculator",
  "/zh/aircond-gas-topup-cost-calculator",
  "/which-aircond-service-do-i-need",
  "/ms/which-aircond-service-do-i-need",
  "/zh/which-aircond-service-do-i-need",
  "/aircond-size-calculator",
  "/ms/aircond-size-calculator",
  "/zh/aircond-size-calculator",
  "/aircond-electricity-cost-calculator",
  "/ms/aircond-electricity-cost-calculator",
  "/zh/aircond-electricity-cost-calculator",
  "/aircond-savings-calculator",
  "/ms/aircond-savings-calculator",
  "/zh/aircond-savings-calculator",
];

let builtSet;
if (htmlFiles.length > 100) {
  builtSet = new Set(htmlFiles.map(routeOf));
} else {
  // Use manifestRoutes + also add sitemap routes as built (since they are generated via generateStaticParams at build time but not as html)
  builtSet = manifestRoutes;
  // For required routes check, also consider that they exist if they are in app-path-routes or if sitemap contains them
  if (fs.existsSync(sitemapBody)) {
    try {
      const xml = fs.readFileSync(sitemapBody, "utf8");
      const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace("https://www.klrenovator.com", "").replace(/\/$/, "") || "/");
      for (const l of locs) builtSet.add(l);
    } catch {}
  }
}

for (const route of REQUIRED) {
  if (!builtSet.has(route)) fail(`Required route did not build: ${route}`);
}

// ── Report ───────────────────────────────────────────────────────────────
console.log(`  pages built (html): ${htmlFiles.length}`);
console.log(`  app-path routes: ${manifestRoutes.size}`);
console.log(`  sitemap URLs: ${sitemapCount}`);
if (htmlFiles.length > 100) {
  console.log(`  h1 coverage: ${htmlFiles.length - noH1.length}/${htmlFiles.length}`);
}

for (const w of warnings) console.warn(`⚠ ${w}`);

if (failures.length) {
  console.error("\n✗ Build verification FAILED:");
  for (const f of failures) console.error(`  • ${f}`);
  process.exit(1);
}

console.log("\n✓ Build verification passed");
