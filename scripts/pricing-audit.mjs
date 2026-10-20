/**
 * Pricing audit — read-only inventory of every place a price is defined or shown.
 *
 * Produces JSON artifacts under docs/pricing-audit/ used to populate the
 * Google Sheets master pricing database.
 *
 * This script NEVER writes to site source files.
 *
 *   node scripts/pricing-audit.mjs      (or: npx tsx scripts/pricing-audit.mjs)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "docs", "pricing-audit");
fs.mkdirSync(outDir, { recursive: true });

try {
  await import("tsx/esm");
} catch {
  /* running under tsx already */
}

const load = (rel) => import(path.join(root, rel));

// ── 1. Canonical price tables ────────────────────────────────────────────────
const { pricing } = await load("config/site/pricing.ts");
const { servicesData } = await load("config/services-data.ts");
const { services } = await load("config/site/services.ts");
const { siteConfig } = await load("config/site.ts");

/** Map pricing.ts group → service category used in the master sheet. */
const GROUP_CATEGORY = {
  installation: "Installation",
  basicServicing: "Servicing",
  chemicalWash: "Chemical Wash",
  chemicalOverhaul: "Chemical Overhaul",
  gasTopup: "Gas Top-Up",
  repair: "Repair",
  dismantling: "Dismantling & Relocation",
  materials: "Additional Materials",
  contracts: "Maintenance Contract (AMC)",
};

/** Map pricing.ts group → service slug / canonical page. */
const GROUP_SLUG = {
  installation: "installation",
  basicServicing: "basic-servicing",
  chemicalWash: "chemical-wash",
  chemicalOverhaul: "chemical-overhaul",
  gasTopup: "gas-topup",
  repair: "repair",
  dismantling: "dismantling-relocation",
  materials: "installation",
  contracts: "maintenance-contract",
};

const canonical = [];
for (const [group, table] of Object.entries(pricing)) {
  table.rows.forEach((row, i) => {
    canonical.push({
      group,
      category: GROUP_CATEGORY[group] ?? group,
      service_slug: GROUP_SLUG[group] ?? group,
      label: row.label,
      price: row.price,
      row_index: i,
      source_file: "config/site/pricing.ts",
    });
  });
}

// Parse price strings into numeric + unit.
function parsePrice(text) {
  const clean = text.replace(/,/g, "");
  const nums = clean.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  const unit = /\/\s*PSI/i.test(text)
    ? "Per PSI"
    : /\/\s*ft/i.test(text)
      ? "Per foot"
      : /\/\s*leak/i.test(text)
        ? "Per leak"
        : /\/\s*year/i.test(text) || /per unit \/ year/i.test(text)
          ? "Per unit per year"
          : null;
  return {
    raw: text,
    numbers: nums,
    min: nums.length ? Math.min(...nums) : null,
    max: nums.length ? Math.max(...nums) : null,
    is_range: nums.length > 1 && nums[0] !== nums[1],
    unit,
  };
}

for (const row of canonical) Object.assign(row, parsePrice(row.price));

// ── 2. Duplicate / parallel price tables ─────────────────────────────────────
const serviceDetailTables = [];
for (const [slug, detail] of Object.entries(servicesData)) {
  detail.priceTable?.forEach((row, i) => {
    serviceDetailTables.push({
      slug,
      title: detail.title,
      label: row.label,
      price: row.price,
      row_index: i,
      startPrice: detail.startPrice,
      source_file: "config/services-data.ts",
    });
  });
}

// service card start prices (homepage / services grid / schema)
const serviceCards = services.map((s) => ({
  slug: s.slug,
  title: s.title,
  startPrice: s.startPrice,
  source_file: "config/site/services.ts",
}));

// volume discounts (not a price but a pricing rule)
const { volumeDiscounts } = await load("config/site/volume-discounts.ts");

// ── 3. Every RM reference in the repo ───────────────────────────────────────
const SCAN_DIRS = ["app", "components", "config", "lib", "public", "scripts", "context", "styles"];
const EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".txt", ".md", ".sql"]);
const SKIP = new Set(["node_modules", ".git", ".next", "docs", "pricing-audit"]);

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (EXT.has(path.extname(entry.name))) acc.push(full);
  }
  return acc;
}

const files = SCAN_DIRS.flatMap((d) => {
  const p = path.join(root, d);
  return fs.existsSync(p) ? walk(p) : [];
});

const RM_RE = /RM\s?\d[\d,]*(?:\.\d+)?(?:\s?[–-]\s?\d[\d,]*(?:\.\d+)?)?/g;

const references = [];
for (const file of files) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, idx) => {
    const matches = line.match(RM_RE);
    if (!matches) return;
    for (const m of matches) {
      references.push({ file: rel, line: idx + 1, text: m, snippet: line.trim().slice(0, 180) });
    }
  });
}

// Classify a reference by the file that holds it.
function classify(rel) {
  if (rel === "config/site/pricing.ts") return "Canonical price table";
  if (rel === "config/site-public.ts") return "Generated (site-public)";
  if (rel === "public/homepage-data.json") return "Generated (homepage JSON)";
  if (rel.startsWith("config/new-blog-batch") || rel.startsWith("config/installation-blog-batch"))
    return "Blog content";
  if (rel === "config/blog-posts.ts") return "Blog registry / metadata";
  if (rel === "config/master-faq-pool.ts") return "FAQ content";
  if (/faq/i.test(rel)) return "FAQ content";
  if (rel.startsWith("public/llms") || rel.startsWith("public/aeo") || rel === "public/site-summary.json" || rel.startsWith("public/.well-known"))
    return "AI / machine-readable file";
  if (rel.startsWith("lib/aircond-math") || rel.startsWith("components/calculators"))
    return "Calculator logic";
  if (rel.startsWith("lib/")) return "Library / helper";
  if (rel.startsWith("components/")) return "UI component";
  if (rel.startsWith("app/api/")) return "API route";
  if (rel.startsWith("app/")) return "Page content";
  if (rel.startsWith("config/site/areas") || rel.startsWith("config/site/kampungs")) return "Area page content";
  if (rel.startsWith("config/site/brands")) return "Brand page content";
  if (rel.startsWith("config/site/problems")) return "Problem page content";
  if (rel.startsWith("config/site/")) return "Site config";
  if (rel.startsWith("config/")) return "Content config";
  return "Other";
}

const byFile = new Map();
for (const ref of references) {
  const entry = byFile.get(ref.file) ?? {
    file: ref.file,
    content_type: classify(ref.file),
    count: 0,
    distinct: new Set(),
  };
  entry.count += 1;
  entry.distinct.add(ref.text.replace(/\s+/g, " ").trim());
  byFile.set(ref.file, entry);
}
const fileSummary = [...byFile.values()]
  .map((e) => ({ ...e, distinct: [...e.distinct].sort(), distinct_count: e.distinct.size }))
  .sort((a, b) => b.count - a.count);

// ── 4. Blogs ────────────────────────────────────────────────────────────────
const { allPosts } = await load("config/blog-posts.ts");
const blogs = allPosts.map((p) => {
  const countRm = (s) => (s ? (s.match(RM_RE) ?? []).length : 0);
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: p.date,
    relatedService: p.relatedService,
    has_ms: Boolean(p.contentMS && p.contentMS.length > 50),
    has_zh: Boolean(p.contentZH && p.contentZH.length > 50),
    rm_en: countRm(p.content) + countRm(p.excerpt),
    rm_ms: countRm(p.contentMS) + countRm(p.excerptMS),
    rm_zh: countRm(p.contentZH) + countRm(p.excerptZH),
    faq_en: p.faqs?.length ?? 0,
    faq_ms: p.faqsMS?.length ?? 0,
    faq_zh: p.faqsZH?.length ?? 0,
    faq_with_price_en: (p.faqs ?? []).filter((f) => RM_RE.test(f.a)).length,
    faq_with_price_ms: (p.faqsMS ?? []).filter((f) => RM_RE.test(f.a)).length,
    faq_with_price_zh: (p.faqsZH ?? []).filter((f) => RM_RE.test(f.a)).length,
  };
});

// ── 5. FAQ inventory ────────────────────────────────────────────────────────
const { masterFaqPool } = await load("config/master-faq-pool.ts");
const faqPool = { en: 0, ms: 0, zh: 0, withPrice: { en: 0, ms: 0, zh: 0 } };
for (const lang of ["en", "ms", "zh"]) {
  const items = masterFaqPool[lang] ?? [];
  faqPool[lang] = items.length;
  faqPool.withPrice[lang] = items.filter((f) => RM_RE.test(f.a) || RM_RE.test(f.q)).length;
}

const serviceFaqCounts = {};
for (const [slug, d] of Object.entries(servicesData)) {
  serviceFaqCounts[slug] = {
    en: d.faqs?.length ?? 0,
    ms: d.faqsBM?.length ?? 0,
    zh: d.faqsZH?.length ?? 0,
    with_price:
      (d.faqs ?? []).filter((f) => RM_RE.test(f.a)).length +
      (d.faqsBM ?? []).filter((f) => RM_RE.test(f.a)).length +
      (f => 0)() +
      (d.faqsZH ?? []).filter((f) => RM_RE.test(f.a)).length,
  };
}

// ── 6. Calculator dependencies ──────────────────────────────────────────────
const mathSrc = fs.readFileSync(path.join(root, "lib/aircond-math.ts"), "utf8");
const calculatorDeps = [
  ...mathSrc.matchAll(
    /sitePublic\.pricing\.([a-zA-Z]+)\.rows[\s\S]{0,240}?find\((?:[^)]{0,180})\)/g,
  ),
].map((m) => {
  const block = m[0];
  const labels = [...block.matchAll(/label\.(?:includes|startsWith)\("([^"]+)"\)/g)].map((x) => x[1]);
  const exact = [...block.matchAll(/label === "([^"]+)"/g)].map((x) => x[1]);
  const fallback = block.match(/\?\?\s*"(RM [^"]+)"/)?.[1] ?? null;
  return { group: m[1], label_match: [...labels, ...exact], hardcoded_fallback: fallback };
});
// Deduplicate identical dependencies
const dedupe = new Map();
for (const d of calculatorDeps) dedupe.set(JSON.stringify(d), d);
calculatorDeps.length = 0;
calculatorDeps.push(...dedupe.values());

// Hardcoded price literals inside calculator UI that duplicate the source table
const calcUiPrices = [];
for (const f of walk(path.join(root, "components", "calculators"))) {
  const rel = path.relative(root, f);
  fs.readFileSync(f, "utf8")
    .split("\n")
    .forEach((line, i) => {
      for (const m of line.match(RM_RE) ?? []) {
        calcUiPrices.push({ file: rel, line: i + 1, text: m, snippet: line.trim().slice(0, 160) });
      }
    });
}

// ── 7. Conflicts ────────────────────────────────────────────────────────────
// (a) services-data priceTable vs canonical table, matched on normalised label.
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/basic service/g, "ceiling cassette")
    .trim();

const canonicalByKey = new Map();
for (const row of canonical) canonicalByKey.set(`${row.group}|${norm(row.label)}`, row);

const conflicts = [];
const unmappedParallelRules = [];

for (const row of serviceDetailTables) {
  const group = Object.keys(pricing).find(
    (g) => g === row.slug || GROUP_SLUG[g] === row.slug,
  );
  if (!group) continue;
  const canon = canonicalByKey.get(`${group}|${norm(row.label)}`);
  if (!canon) {
    unmappedParallelRules.push({
      reason: "row exists in config/services-data.ts priceTable but not in config/site/pricing.ts",
      service_slug: row.slug,
      label: row.label,
      price: row.price,
    });
    continue;
  }
  if (canon.price.replace(/\s/g, "") !== row.price.replace(/\s/g, "")) {
    conflicts.push({
      kind: "PRICE_MISMATCH",
      group,
      label: row.label,
      canonical_value: canon.price,
      conflicting_value: row.price,
      canonical_file: "config/site/pricing.ts",
      conflicting_file: "config/services-data.ts",
    });
  }
}

// (b) startPrice vs the cheapest rule of its own service.
const groupMin = {};
for (const row of canonical) {
  if (row.min == null) continue;
  groupMin[row.group] = Math.min(groupMin[row.group] ?? Infinity, row.min);
}
for (const s of services) {
  const group = Object.keys(GROUP_SLUG).find((g) => GROUP_SLUG[g] === s.slug);
  if (!group || groupMin[group] == null) continue;
  if (Number(s.startPrice) !== groupMin[group]) {
    conflicts.push({
      kind: "START_PRICE_MISMATCH",
      service_slug: s.slug,
      canonical_value: `RM ${groupMin[group]}`,
      conflicting_value: `RM ${s.startPrice}`,
      canonical_file: "config/site/pricing.ts (min of group)",
      conflicting_file: "config/site/services.ts (startPrice)",
    });
  }
}
for (const [slug, d] of Object.entries(servicesData)) {
  const group = Object.keys(GROUP_SLUG).find((g) => GROUP_SLUG[g] === slug);
  if (!group || groupMin[group] == null) continue;
  const m = d.startPrice?.match(/\d+(?:\.\d+)?/);
  if (!m) continue;
  if (Number(m[0]) !== groupMin[group]) {
    conflicts.push({
      kind: "START_PRICE_MISMATCH",
      service_slug: slug,
      canonical_value: `RM ${groupMin[group]}`,
      conflicting_value: d.startPrice,
      canonical_file: "config/site/pricing.ts (min of group)",
      conflicting_file: "config/services-data.ts (startPrice)",
    });
  }
}

// (c) Near-miss scan: page/FAQ/blog prose that pairs a service keyword with a
//     number that is not part of that service's published amount set.
const SERVICE_KEYWORDS = {
  chemicalWash: [/chemical wash/i, /cuci kimia/i, /化学清洗/, /化学洗/],
  chemicalOverhaul: [/overhaul/i, /大修/],
  gasTopup: [/gas top-?up/i, /gas refill/i, /tambah gas/i, /加气/, /gas topup/i],
  basicServicing: [/basic servic/i, /servis asas/i, /基本保养/, /基本服务/],
  installation: [/installation/i, /pemasangan/i, /安装/],
  dismantling: [/dismantl/i, /relocation/i, /buka pasang/i],
  repair: [/repair/i, /pembaikan/i, /维修/],
  contracts: [/AMC\b/, /maintenance contract/i, /kontrak penyelenggaraan/i],
  materials: [/copper pipe/i, /paip tembaga/i, /铜管/],
};
const groupAmounts = {};
for (const row of canonical) {
  groupAmounts[row.group] ??= new Set();
  for (const n of row.numbers) groupAmounts[row.group].add(n);
}
const IGNORED_AMOUNTS = new Set([0.509, 0.9, 1.2, 1.7, 35, 30]); // electricity/savings assumptions, %-figures

const reviewCandidates = [];
for (const ref of references) {
  const type = classify(ref.file);
  if (!["Page content", "FAQ content", "AI / machine-readable file", "Calculator logic", "UI component"].includes(type))
    continue;
  const text = `${ref.snippet}`;
  const nums = (ref.text.match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
  for (const [group, patterns] of Object.entries(SERVICE_KEYWORDS)) {
    if (!patterns.some((p) => p.test(text))) continue;
    const amounts = groupAmounts[group];
    const bad = nums.filter(
      (n) => !amounts.has(n) && !IGNORED_AMOUNTS.has(n) && n >= 20,
    );
    // Only flag when the sentence names this service and no other priced service
    if (bad.length && bad.length === nums.length) {
      reviewCandidates.push({
        file: ref.file,
        line: ref.line,
        service_group: group,
        text: ref.text,
        snippet: ref.snippet,
        canonical_amounts: [...amounts].sort((a, b) => a - b),
      });
      break;
    }
  }
}


// ── Output ──────────────────────────────────────────────────────────────────
const summary = {
  generated_at: new Date().toISOString(),
  commit: process.env.GIT_COMMIT ?? null,
  totals: {
    canonical_price_rules: canonical.length,
    service_detail_price_rows: serviceDetailTables.length,
    service_card_start_prices: serviceCards.length,
    rm_references_total: references.length,
    files_with_price_references: fileSummary.length,
    blogs_total: blogs.length,
    blogs_with_prices: blogs.filter((b) => b.rm_en + b.rm_ms + b.rm_zh > 0).length,
    faq_pool: faqPool,
    calculator_price_dependencies: calculatorDeps.length,
    conflicts: conflicts.length,
    unmapped_parallel_rules: unmappedParallelRules.length,
    review_candidates: reviewCandidates.length,
    calculator_ui_hardcoded_prices: calcUiPrices.length,
  },
  content_type_breakdown: Object.entries(
    references.reduce((acc, r) => {
      const k = classify(r.file);
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count),
};

const write = (name, data) =>
  fs.writeFileSync(path.join(outDir, name), JSON.stringify(data, null, 2));

write("summary.json", summary);
write("canonical-prices.json", canonical);
write("service-detail-prices.json", serviceDetailTables);
write("service-card-start-prices.json", serviceCards);
write("price-references.json", references);
write("price-files.json", fileSummary);
write("blogs.json", blogs);
write("faq-inventory.json", { pool: faqPool, services: serviceFaqCounts });
write("calculator-dependencies.json", calculatorDeps);
write("conflicts.json", conflicts);
write("unmapped-parallel-rules.json", unmappedParallelRules);
write("calculator-ui-hardcoded-prices.json", calcUiPrices);
write("price-review-candidates.json", reviewCandidates);
write("volume-discounts.json", volumeDiscounts);

console.log(JSON.stringify(summary, null, 2));
console.log("\nArtifacts written to docs/pricing-audit/");
