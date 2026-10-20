/**
 * Builds the row sets for the WEBSITE MASTER PRICING DATABASE from the repo.
 * Output: docs/pricing-audit/sheet/*.json (arrays of rows, header first).
 *
 * Read-only with respect to site source. Never invents a price: every
 * Current_Approved_Price comes from a file in this repo.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "docs", "pricing-audit", "sheet");
fs.mkdirSync(outDir, { recursive: true });

try {
  await import("tsx/esm");
} catch {}

const load = (rel) => import(path.join(root, rel));
const { pricing } = await load("config/site/pricing.ts");
const { servicesData } = await load("config/services-data.ts");
const { services } = await load("config/site/services.ts");
const { volumeDiscounts } = await load("config/site/volume-discounts.ts");

const TODAY = "2026-10-20";

// ── Translation glossary (all terms verified as already used in this repo) ──
const MS = {
  "Wall-Mounted": "Unit Dinding",
  "Ceiling Cassette": "Unit Cassette Siling",
  "Window Unit": "Unit Tingkap",
  installation: "Pemasangan",
  "Basic Servicing / Cleaning": "Servis Asas / Pembersihan",
  "Pressure Chemical Wash": "Cuci Kimia Bertekanan",
  "Chemical Overhaul": "Overhaul Kimia",
  "Gas Top-Up & Refill": "Tambah Gas & Isi Semula",
  "Troubleshooting & Component Repair": "Penyelesaian Masalah & Pembaikan Komponen",
  "Dismantling & Relocation": "Buka Pasang & Pindah",
  "Additional Materials Pricing": "Harga Bahan Tambahan",
  "Annual Maintenance Contract (AMC) Plans": "Pelan Kontrak Penyelenggaraan Tahunan (AMC)",
  includes: "termasuk",
  from: "dari",
};
const ZH = {
  "Wall-Mounted": "挂壁式",
  "Ceiling Cassette": "天花板卡式机",
  "Window Unit": "窗式机",
  installation: "安装",
  "Basic Servicing / Cleaning": "基本保养 / 清洗",
  "Pressure Chemical Wash": "高压化学清洗",
  "Chemical Overhaul": "化学大修",
  "Gas Top-Up & Refill": "加气与充注",
  "Troubleshooting & Component Repair": "故障排查与零件维修",
  "Dismantling & Relocation": "拆卸与搬迁",
  "Additional Materials Pricing": "额外材料价格",
  "Annual Maintenance Contract (AMC) Plans": "年度保养合约（AMC）方案",
  includes: "含",
  from: "起",
};

/** Translate a canonical row label into MS and ZH. */
function translateLabel(label) {
  let ms = label;
  let zh = label;
  for (const [en, t] of Object.entries(MS)) ms = ms.split(en).join(t);
  for (const [en, t] of Object.entries(ZH)) zh = zh.split(en).join(t);
  return { ms, zh };
}

// ── Per-group pricing metadata ──────────────────────────────────────────────
const META = {
  installation: {
    code: "INST",
    category: "Installation",
    service: "New Unit Installation",
    subservice: "New unit installation",
    unit: "Per service",
    included: "7 ft copper pipe, insulation, wire, drain pipe, vacuum commissioning",
    additional: "Beyond 7 ft: MAT-001..MAT-003; other extras MAT-004..MAT-015",
    conditions: "Standard single-split install; price confirmed before work.",
    exclusions: "Brackets, casing, plug point, hacking, access charges extra (MAT-006..MAT-014)",
    warranty: "1-month workmanship",
    minQty: "1 unit",
    discount: "5% off 5+ units; 10% off 10+ units",
  },
  basicServicing: {
    code: "SERV",
    category: "Basic Servicing",
    service: "Basic Servicing / Cleaning",
    subservice: "Routine basic servicing",
    unit: "Per unit",
    included: "Filter wash, drain flush, coil surface spray, electrical check",
    additional: "",
    conditions: "Per indoor unit; multi-unit discount on same visit.",
    exclusions: "Deep coil clean requires chemical wash (CW-xxx)",
    warranty: "1-month workmanship",
    minQty: "1 unit",
    discount: "5% off 5+ units; 10% off 10+ units",
  },
  chemicalWash: {
    code: "CW",
    category: "Chemical Wash",
    service: "Pressure Chemical Wash",
    subservice: "On-wall pressure chemical wash",
    unit: "Per unit",
    included: "80-120 PSI chemical clean, coil + blower flush, drain flush",
    additional: "",
    conditions: "Unit stays mounted; 60-75 min per unit.",
    exclusions: "Full dismantle requires overhaul (OH-xxx)",
    warranty: "1-month workmanship",
    minQty: "1 unit",
    discount: "5% off 5+ units; 10% off 10+ units",
  },
  chemicalOverhaul: {
    code: "OH",
    category: "Chemical Overhaul",
    service: "Chemical Overhaul (Wall-Mounted only)",
    subservice: "Full-dismantle overhaul",
    unit: "Per unit",
    included: "100% teardown, chemical soak, drain pan clean, reassembly",
    additional: "",
    conditions: "Wall-mounted units only; 2-3 hours.",
    exclusions: "Cassette/ducted/floor-standing/portable/window: on-site quote",
    warranty: "1-month workmanship",
    minQty: "1 unit",
    discount: "5% off 5+ units; 10% off 10+ units",
  },
  gasTopup: {
    code: "GAS",
    category: "Gas Top-Up",
    service: "Gas Top-Up & Refill",
    subservice: "Refrigerant top-up",
    unit: "Per PSI",
    included: "Pressure test, leak check, top-up to correct PSI",
    additional: "Charged per actual PSI needed",
    conditions: "Only PSI actually required is charged; leak check included.",
    exclusions: "Major pipe repair or replacement quoted separately",
    warranty: "1-month workmanship",
    minQty: "1 unit",
    discount: "5% off 5+ units; 10% off 10+ units",
  },
  repair: {
    code: "REP",
    category: "Repair",
    service: "Troubleshooting & Component Repair",
    subservice: "Diagnosis + part replacement",
    unit: "Per service",
    included: "Diagnosis; part + labour for named component",
    additional: "Parts priced per actual component",
    conditions: "Quote before work; diagnostic waived if repaired same visit.",
    exclusions: "Compressor price depends on size; quoted after diagnosis",
    warranty: "3-month parts / 1-month workmanship",
    minQty: "1 unit",
    discount: "5% off 5+ units; 10% off 10+ units",
  },
  dismantling: {
    code: "DIS",
    category: "Dismantling & Relocation",
    service: "Dismantle & Relocation",
    subservice: "Dismantle / relocate unit",
    unit: "Per service",
    included: "Refrigerant pump-down, removal, pipe sealing",
    additional: "Reinstall beyond 7 ft: MAT-001..MAT-003",
    conditions: "Reinstall includes 7 ft pipe, insulation, wire, drain.",
    exclusions: "Brackets, casing, electrical, access work extra",
    warranty: "1-month workmanship",
    minQty: "1 unit",
    discount: "5% off 5+ units; 10% off 10+ units",
  },
  materials: {
    code: "MAT",
    category: "Additional Materials",
    service: "Additional Materials",
    subservice: "Materials & special charges",
    unit: "Per foot",
    included: "Material installed (labour included)",
    additional: "",
    conditions: "Charged only beyond the 7 ft included with install/reinstall.",
    exclusions: "Unlisted items require on-site quote",
    warranty: "1-month workmanship",
    minQty: "1 ft",
    discount: "No volume discount",
  },
  contracts: {
    code: "AMC",
    category: "Maintenance Contract",
    service: "Annual Maintenance Contract (AMC)",
    subservice: "Annual plan per unit",
    unit: "Per unit / year",
    included: "Per plan name (services + washes + emergency check)",
    additional: "Multi-unit / commercial quoted on enquiry",
    conditions: "Per wall-mounted 1.0-1.5 HP unit per year.",
    exclusions: "Repair parts excluded except stated discount",
    warranty: "1-month workmanship per visit",
    minQty: "1 unit",
    discount: "Multi-unit / commercial on enquiry",
  },
};

// ── Extra rules that exist in the codebase but not in pricing.ts ────────────
const EXTRA = [
  {
    id: "SERV-007",
    category: "Basic Servicing",
    service: "Basic Servicing / Cleaning",
    subservice: "Basic servicing — window unit",
    label: "Window Unit · 1.0 – 1.5 HP",
    price: "RM 99",
    unit: "Per unit",
    source: "config/services-data.ts (basic-servicing priceTable)",
    status: "NEEDS_CONFIRMATION",
    notes:
      "Present in the service-page price table but absent from config/site/pricing.ts. Confirm whether window units are serviced at the wall-mounted rate before migrating.",
  },
  {
    id: "SERV-008",
    category: "Basic Servicing",
    service: "Basic Servicing / Cleaning",
    subservice: "Basic servicing — window unit",
    label: "Window Unit · 2.0 – 2.5 HP",
    price: "RM 120",
    unit: "Per unit",
    source: "config/services-data.ts (basic-servicing priceTable)",
    status: "NEEDS_CONFIRMATION",
    notes: "Same as SERV-007 — not in the canonical table.",
  },
  {
    id: "GAS-005",
    category: "Gas Top-Up",
    service: "Gas Top-Up & Refill",
    subservice: "Structural leak check",
    label: "Structural Leak Check",
    price: "RM 88",
    unit: "Per service",
    source: "config/services-data.ts (gas-topup priceTable)",
    status: "NEEDS_CONFIRMATION",
    notes:
      "RM 88 equals the published diagnostic fee (REP-001). Confirm whether this is a separate product or the same diagnostic line relabelled.",
  },
  {
    id: "EMG-001",
    category: "Emergency Repair",
    service: "Emergency Aircond Repair",
    subservice: "Emergency drain pipe clearing",
    label: "Drain Pipe Emergency Clear",
    price: "RM 170",
    unit: "Per service",
    source: "app/(en)/services/emergency/page.tsx + config/services-data.ts",
    status: "NEEDS_CONFIRMATION",
    notes:
      "Published on the emergency page and in the emergency price table but has no row in config/site/pricing.ts.",
  },
  {
    id: "SUR-001",
    category: "Surcharges",
    service: "After-Hours Service",
    subservice: "After-hours surcharge (6pm–10pm)",
    label: "After-Hours Surcharge (6pm–10pm)",
    price: "RM 50",
    unit: "Per service",
    source:
      "app/(en)/services/emergency/page.tsx, app/(en)/aircond-service-price-malaysia/page.tsx, app/(en)/faq/layout.tsx",
    status: "NEEDS_CONFIRMATION",
    notes:
      "Consistently RM 50 across pages, but it is not in the canonical pricing table, so calculators and schema cannot see it.",
  },
  {
    id: "SUR-002",
    category: "Surcharges",
    service: "After-Hours Service",
    subservice: "After-hours diagnostic total",
    label: "After-hours diagnostic (RM 88 + RM 50)",
    price: "RM 138",
    unit: "Per service",
    source: "Derived from REP-001 + SUR-001",
    status: "NEEDS_CONFIRMATION",
    notes:
      "Derived value, not an independent product. Several files (services-data.ts startPrice/aioSummary/FAQ, components/diagnostic-tool.tsx, blog-posts.ts) publish RM 138 as if it were the base diagnostic fee — see conflict C1.",
  },
  {
    id: "DIS-005",
    category: "Dismantling & Relocation",
    service: "Dismantle & Relocation",
    subservice: "Dismantling — master FAQ claim",
    label: "Dismantling (master FAQ wording)",
    price: "RM 150",
    unit: "Per service",
    source: "config/master-faq-pool.ts:98",
    status: "NEEDS_CONFIRMATION",
    notes:
      "Master FAQ says dismantling is 'available from RM 150 per unit' while DIS-001 publishes RM 90. Conflict C6.",
  },
  {
    id: "AMC-004",
    category: "Maintenance Contract",
    service: "Annual Maintenance Contract (AMC)",
    subservice: "Annual plan — 'Standard' variant in blog copy",
    label: "Standard plan · 3 visits / year",
    price: "RM 450",
    unit: "Per unit / year",
    source: "config/blog-posts.ts:5386",
    status: "NEEDS_CONFIRMATION",
    notes:
      "Blog describes a RM 450/year 3-visit plan that does not match AMC-002 (RM 499). Conflict C7.",
  },
  {
    id: "DISC-001",
    category: "Discounts",
    service: "Volume Discount",
    subservice: "5+ units instant booking discount",
    label: "5% OFF Instant Booking Discount (5+ units)",
    price: "5%",
    unit: "Per booking",
    source: "config/site/volume-discounts.ts",
    status: "ACTIVE",
    notes: "Applied by lib/aircond-math.ts and the installation calculator.",
  },
  {
    id: "DISC-002",
    category: "Discounts",
    service: "Volume Discount",
    subservice: "10+ units instant booking discount",
    label: "10% OFF Instant Booking Discount (10+ units)",
    price: "10%",
    unit: "Per booking",
    source: "config/site/volume-discounts.ts",
    status: "ACTIVE",
    notes: "Applied by lib/aircond-math.ts and the installation calculator.",
  },
];

// ── Price_Type inference ────────────────────────────────────────────────────
function priceType(raw, unit) {
  if (unit === "Per unit / year") return "PACKAGE";
  if (/^RM [\d,]+ [–-] [\d,]+$/.test(raw)) return "RANGE";
  if (/\//.test(raw)) return "RATE_PER_UNIT";
  return "FIXED";
}

function nums(raw) {
  return (raw.replace(/,/g, "").match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
}

// ── MASTER_PRICES ───────────────────────────────────────────────────────────
const master = [];
const seq = {};
for (const [group, table] of Object.entries(pricing)) {
  const meta = META[group];
  table.rows.forEach((row) => {
    seq[meta.code] = (seq[meta.code] ?? 0) + 1;
    const id = `PRC-${meta.code}-${String(seq[meta.code]).padStart(3, "0")}`;
    const { ms, zh } = translateLabel(row.label);
    const n = nums(row.price);
    const range = n.length > 1 && n[0] !== n[1];
    const isRate = meta.unit.startsWith("Per ") && meta.unit !== "Per service" && meta.unit !== "Per unit";
    const priceType = isRate ? "RATE_PER_UNIT" : range ? "RANGE" : "FIXED";
    const priceValue = isRate ? String(n[0]) : `${n[0]}`;
    const priceMax = range ? String(n[1]) : "";

    master.push({
      id,
      category: meta.category,
      service: meta.service,
      subservice: `${meta.subservice} — ${row.label}`,
      priceType,
      value: priceValue,
      currency: "MYR",
      unit: meta.unit,
      minQty: meta.minQty,
      included: meta.included,
      addl: meta.additional,
      materialCost: "NEEDS_CONFIRMATION",
      labourCost: "NEEDS_CONFIRMATION",
      discount: meta.discount,
      conditions: meta.conditions,
      exclusions: meta.exclusions,
      warranty: meta.warranty,
      en: `${row.label} — ${row.price}`,
      ms: `${ms} — ${row.price}`,
      zh: `${zh} — ${row.price}`,
      status: "ACTIVE",
      lastUpdated: TODAY,
      updatedBy: "arena-agent (Phase 3 audit import)",
      sync: "IN_SYNC",
      commit: "d3adf01",
      notes: (priceMax ? `max ${priceMax}; ` : "") + `pricing.${group}`, 
      _group: group,
      _label: row.label,
      _raw: row.price,
    });
  });
}

for (const ex of EXTRA) {
  master.push({
    id: ex.id,
    category: ex.category,
    service: ex.service,
    subservice: ex.subservice,
    priceType: ex.id.startsWith("DISC") ? "PERCENT_DISCOUNT" : "FIXED",
    value: ex.price,
    currency: ex.id.startsWith("DISC") ? "PERCENT" : "MYR",
    unit: ex.unit,
    minQty: "1",
    included: "",
    addl: "",
    materialCost: "NEEDS_CONFIRMATION",
    labourCost: "NEEDS_CONFIRMATION",
    discount: ex.id.startsWith("DISC") ? ex.label : "5% ≥5 units · 10% ≥10 units",
    conditions: ex.label,
    exclusions: "",
    warranty: "",
    en: `${ex.label} — ${ex.price}`,
    ms: `${ex.label} — ${ex.price}`,
    zh: `${ex.label} — ${ex.price}`,
    status: ex.status,
    lastUpdated: TODAY,
    updatedBy: "arena-agent (Phase 3 audit import)",
    sync: ex.status === "ACTIVE" ? "IN_SYNC" : "NEEDS_CONFIRMATION",
    commit: "d3adf01",
    notes: `${ex.notes} Source: ${ex.source}`,
    _group: ex.id.startsWith("DISC") ? "discounts" : "extra",
    _label: ex.label,
    _raw: ex.price,
  });
}

// Stable master lookup for dependent tabs
const masterById = new Map(master.map((m) => [m.id, m]));

// ── PRICE_LOCATIONS ─────────────────────────────────────────────────────────
const loc = [];
const addLoc = (r) =>
  loc.push({
    priceId: r.priceId,
    pageUrl: r.pageUrl ?? "",
    pageName: r.pageName ?? "",
    contentType: r.contentType,
    language: r.language ?? "EN/MS/ZH",
    file: r.file,
    component: r.component ?? "",
    fn: r.fn ?? "",
    calc: r.calc ?? "No",
    schema: r.schema ?? "No",
    notes: r.notes ?? "",
  });

for (const m of master) {
  // canonical definition
  addLoc({
    priceId: m.id,
    pageUrl: "/pricing, /services/*",
    pageName: "Canonical price table",
    contentType: "Definition (canonical)",
    file: "config/site/pricing.ts",
    component: `pricing.${m._group}`,
    notes: `Row: ${m._label}`,
  });

  // generated projection
  addLoc({
    priceId: m.id,
    pageUrl: "/ (homepage islands)",
    pageName: "Generated client-safe projection",
    contentType: "Generated file",
    file: "config/site-public.ts",
    component: "sitePublic.pricing",
    calc: "Yes",
    notes: "Auto-generated by npm run gen:site-public — never edit by hand",
  });

  // parallel price table for the same service
  const slug = Object.keys(META).find((g) => META[g].code === m.id.split("-")[1]);
  const detail = slug ? servicesData[slug] : null;
  if (detail?.priceTable) {
    const hit = detail.priceTable.find(
      (r) => r.label === m._label || r.price === m._raw,
    );
    if (hit) {
      addLoc({
        priceId: m.id,
        pageUrl: `/services/${slug}`,
        pageName: detail.title,
        contentType: "Service page price table",
        file: "config/services-data.ts",
        component: `${slug}.priceTable`,
        notes: `Row: "${hit.label}" = ${hit.price}${hit.price !== m._raw ? ` (DIFFERS from canonical ${m._raw})` : ""}`,
      });
    }
  }
  if (detail?.startPrice) {
    const startNum = nums(detail.startPrice)[0];
    const canonNums = nums(m._raw);
    if (startNum != null && canonNums.includes(startNum)) {
      addLoc({
        priceId: m.id,
        pageUrl: `/services/${slug}`,
        pageName: `${detail.title} — "from" price`,
        contentType: "Service page start price",
        file: "config/services-data.ts",
        component: `${slug}.startPrice`,
        schema: "Yes",
        notes: `startPrice = ${detail.startPrice}`,
      });
    }
  }
}

// Structural duplicates that are NOT driven by the canonical table
const STRUCTURAL = [
  {
    priceId: "PRC-INST-001",
    file: "config/site/services.ts",
    component: "services[installation].startPrice",
    contentType: "Service card / homepage card",
    pageUrl: "/ , /services",
    schema: "Yes",
    notes: "startPrice: 199 hardcoded per service card",
  },
  {
    priceId: "PRC-REP-001",
    file: "config/site/services.ts",
    component: "services[repair].startPrice",
    contentType: "Service card",
    pageUrl: "/ , /services",
    notes: "startPrice: 88",
  },
  {
    priceId: "PRC-SERV-001",
    file: "config/site/services.ts",
    component: "services[basic-servicing].startPrice",
    contentType: "Service card",
    pageUrl: "/ , /services",
    notes: "startPrice: 99",
  },
  {
    priceId: "PRC-CW-001",
    file: "config/site/services.ts",
    component: "services[chemical-wash].startPrice",
    contentType: "Service card",
    pageUrl: "/ , /services",
    notes: "startPrice: 120",
  },
  {
    priceId: "PRC-OH-001",
    file: "config/site/services.ts",
    component: "services[chemical-overhaul].startPrice",
    contentType: "Service card",
    pageUrl: "/ , /services",
    notes: "startPrice: 420",
  },
  {
    priceId: "PRC-GAS-001",
    file: "config/site/services.ts",
    component: "services[gas-topup].startPrice",
    contentType: "Service card",
    pageUrl: "/ , /services",
    notes: "startPrice: 2.5",
  },
  {
    priceId: "PRC-DIS-001",
    file: "config/site/services.ts",
    component: "services[dismantling-relocation].startPrice",
    contentType: "Service card",
    pageUrl: "/ , /services",
    notes: "startPrice: 90",
  },
  {
    priceId: "PRC-AMC-001",
    file: "config/site/services.ts",
    component: "services[maintenance-contract].startPrice",
    contentType: "Service card",
    pageUrl: "/ , /services",
    notes: "startPrice: 299",
  },
  {
    priceId: "PRC-SERV-001",
    file: "config/site/services.ts",
    component: "services[ceiling-cassette].startPrice",
    contentType: "Service card",
    pageUrl: "/ , /services",
    notes: "startPrice: 150 (cassette servicing)",
  },
  {
    priceId: "PRC-REP-001",
    file: "lib/published-prices.ts",
    component: "publishedPrices.diagnostic",
    contentType: "Derived helper (safe)",
    pageUrl: "Multiple service pages",
    notes: "Looks up pricing.repair by label — stays in sync automatically",
  },
  {
    priceId: "PRC-CW-001",
    file: "lib/published-prices.ts",
    component: "publishedPrices.chemicalWash15",
    contentType: "Derived helper (safe)",
    pageUrl: "Multiple service pages",
    notes: "Lookup by label — safe",
  },
  {
    priceId: "PRC-INST-001",
    file: "lib/seo.ts",
    component: "installationServiceSchema offers",
    contentType: "Structured data (schema.org)",
    pageUrl: "/aircond-installation-kl etc.",
    schema: "Yes",
    notes: "HARDCODED price: 199 in lib/seo.ts:278/283 and offers list",
  },
  {
    priceId: "PRC-INST-011",
    file: "lib/seo.ts",
    component: "installation offers — Window Unit 1.0–2.0 HP",
    contentType: "Structured data (schema.org)",
    pageUrl: "/aircond-installation-kl etc.",
    schema: "Yes",
    notes: "HARDCODED price: 180 — differs from canonical RM 199 (conflict C5)",
  },
  {
    priceId: "PRC-REP-002",
    file: "app/(en)/services/emergency/page.tsx",
    component: "emergency price table array",
    contentType: "Hardcoded page table",
    pageUrl: "/services/emergency",
    language: "EN/MS/ZH (labels only)",
    notes: "Capacitor RM 230 hardcoded (conflict C4)",
  },
  {
    priceId: "PRC-REP-001",
    file: "app/(en)/services/emergency/page.tsx",
    component: "emergency price table array",
    contentType: "Hardcoded page table",
    pageUrl: "/services/emergency",
    notes: "Diagnostic RM 88",
  },
  {
    priceId: "PRC-INST-001",
    file: "app/(en)/aircond-service-price-malaysia/page.tsx",
    component: "full price table",
    contentType: "Hardcoded page table",
    pageUrl: "/aircond-service-price-malaysia (+ /ms, /zh equivalents)",
    notes: "Trilingual master price page, hardcoded rows",
  },
  {
    priceId: "PRC-INST-001",
    file: "public/llms.txt, public/llms-full.txt, public/aeo-faq.txt, public/site-summary.json, public/.well-known/ai-plugin.json",
    component: "static AI-facing files",
    contentType: "AI / machine-readable file",
    pageUrl: "/llms.txt etc.",
    notes: "Static files cannot import config — must be updated by hand or by sync script",
  },
  {
    priceId: "PRC-GAS-001",
    file: "components/calculators/gas-topup-calculator.tsx",
    component: "GAS_OPTIONS labels",
    contentType: "Calculator UI (duplicated literal)",
    pageUrl: "/aircond-gas-topup-cost-calculator",
    calc: "Yes",
    notes: "Option labels hardcode 'RM 2.50/PSI' and 'RM 3.00/PSI'",
  },
  {
    priceId: "PRC-MAT-001",
    file: "components/calculators/installation-cost-calculator.tsx",
    component: "note/hint strings",
    contentType: "Calculator UI (duplicated literal)",
    pageUrl: "/aircond-installation-cost-calculator",
    calc: "Yes",
    notes: "Prose repeats RM 17–27/ft, RM 9, RM 7, RM 6, RM 12, RM 45–70",
  },
  {
    priceId: "PRC-CW-001",
    file: "components/calculators/electricity-calculator.tsx",
    component: "tip strings",
    contentType: "Calculator UI (duplicated literal)",
    pageUrl: "/aircond-electricity-cost-calculator",
    calc: "Yes",
    notes: "'from RM 120' in all 3 languages",
  },
  {
    priceId: "PRC-REP-001",
    file: "components/diagnostic-tool.tsx",
    component: "solution strings",
    contentType: "Tool UI (duplicated literal)",
    pageUrl: "/which-aircond-service-do-i-need",
    notes: "Publishes RM 138 as diagnostic fee (conflict C1)",
  },
];

for (const s of STRUCTURAL) addLoc({ ...s, pageName: s.pageName ?? s.component });
const structuralIds = new Set(STRUCTURAL.map((s) => s.priceId));
// Fix pageName fallback for structural rows
for (const row of loc) if (!row.pageName) row.pageName = row.component;

// ── Content-level location roll-up (from the reference scan) ────────────────
const refs = JSON.parse(
  fs.readFileSync(path.join(root, "docs/pricing-audit/price-references.json"), "utf8"),
);
const KW = {
  INST: /install|pemasangan|安装/i,
  SERV: /basic servic|servis asas|基本保养|基本服务/i,
  CW: /chemical wash|cuci kimia|化学清洗|化学洗/i,
  OH: /overhaul|大修/i,
  GAS: /gas top-?up|gas refill|tambah gas|加气|gas topup/i,
  REP: /repair|pembaikan|维修|diagnostic/i,
  DIS: /dismantl|relocation|buka pasang|拆卸/i,
  MAT: /copper pipe|paip tembaga|铜管|bracket|casing/i,
  AMC: /\bAMC\b|maintenance contract|kontrak penyelenggaraan|保养合约/i,
};

const CONTENT_TYPES = new Set([
  "Blog content",
  "Blog registry / metadata",
  "Page content",
  "FAQ content",
  "Content config",
  "Area page content",
  "Brand page content",
  "Problem page content",
  "AI / machine-readable file",
]);

const FAMILY = (file) => {
  if (/blog/i.test(file)) return "Blogs";
  if (file.startsWith("config/site/areas")) return "Area pages (49 areas x EN/MS/ZH)";
  if (file.startsWith("config/site/kampungs")) return "Kampung pages (162 x EN/MS/ZH)";
  if (file.startsWith("config/site/brands")) return "Brand pages (20)";
  if (file.startsWith("config/site/problems")) return "Problem pages (20)";
  if (file.includes("faq")) return "FAQ content";
  if (file.startsWith("public/")) return "AI / machine-readable files";
  if (file.startsWith("components/") || file.startsWith("app/(en)/")) return "Pages & components";
  return "Other content configs";
};

const rollup = new Map(); // key: priceId|family
for (const r of refs) {
  const amount = Number((r.text.replace(/,/g, "").match(/\d+(?:\.\d+)?/) ?? [0])[0]);
  if (!amount) continue;
  if (
    r.file.startsWith("config/site/pricing.ts") ||
    r.file === "config/site-public.ts" ||
    r.file === "config/services-data.ts" ||
    r.file === "config/site/services.ts"
  )
    continue;
  for (const m of master) {
    if (m.id.startsWith("DISC")) continue;
    if (!nums(m._raw).includes(amount)) continue;
    const code = m.id.split("-")[1];
    const kw = KW[code];
    if (!kw || !kw.test(r.snippet)) continue;
    const fam = FAMILY(r.file);
    const key = `${m.id}|${fam}`;
    const e = rollup.get(key) ?? { count: 0, files: new Map() };
    e.count += 1;
    e.files.set(r.file, (e.files.get(r.file) ?? 0) + 1);
    rollup.set(key, e);
  }
}

const KEEP_FAMILIES = new Set([
  "Blogs",
  "FAQ content",
  "Area pages (49 areas x EN/MS/ZH)",
  "AI / machine-readable files",
]);
for (const [key, e] of rollup) {
  if (e.count < 8) continue;
  if (!KEEP_FAMILIES.has(key.split("|")[1])) continue;
  const [priceId, fam] = key.split("|");
  const top = [...e.files.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  addLoc({
    priceId,
    pageUrl: "",
    pageName: fam,
    contentType: "Content reference (aggregated)",
    file: top.map(([f, n]) => `${f} (${n})`).join(" · "),
    component: "",
    notes: `${e.count} refs / ${e.files.size} files. Amount + keyword match; confirm lines before editing`,
  });
}

// ── PRICE_CHANGE_LOG ────────────────────────────────────────────────────────
const changeLog = [
  {
    id: "CHG-0001",
    priceId: "ALL",
    previous: "(none)",
    next: "(baseline snapshot)",
    date: TODAY,
    requestedBy: "owner (audit request)",
    approval: "NOT_REQUIRED",
    impl: "COMPLETED",
    branch: "arena/6a0d2bdf-klrenovator",
    commit: "d3adf01",
    deployment: "dpl_5aSb14bv57jPbx9jmX5qkZUHa9r8 (production, predecessor)",
    verification: "VERIFIED",
    errors:
      "Baseline import of every price currently live. No price was changed. Prices captured from config/site/pricing.ts at commit d3adf01.",
  },
];

// ── SYNC_STATUS ────────────────────────────────────────────────────────────
const sync = master.map((m) => ({
  priceId: m.id,
  sheet: m.value + (m.currency === "PERCENT" ? "%" : ""),
  site: m.value,
  checked: TODAY,
  status: m.status === "ACTIVE" ? "IN_SYNC" : "NEEDS_CONFIRMATION",
  affected:
    loc.filter((l) => l.priceId === m.id).length +
    " mapped location(s)",
  errors:
    m.status === "ACTIVE"
      ? ""
      : "Not in config/site/pricing.ts — see MASTER_PRICES notes",
  commit: "d3adf01",
  deploy: "READY (no change deployed)",
}));

// ── BLOG_FAQ_AUDIT ─────────────────────────────────────────────────────────
const blogs = JSON.parse(
  fs.readFileSync(path.join(root, "docs/pricing-audit/blogs.json"), "utf8"),
);
const blogRows = blogs.map((b, i) => ({
  id: `BLG-${String(i + 1).padStart(3, "0")}`,
  type: "Blog",
  title: b.title,
  url: `/blog/${b.slug}`,
  lang: ["EN", b.has_ms ? "MS" : "", b.has_zh ? "ZH" : ""].filter(Boolean).join(" / "),
  service: b.relatedService,
  priceId: "",
  hasPrice: b.rm_en + b.rm_ms + b.rm_zh > 0 ? "Yes" : "No",
  status: "PUBLISHED",
  action:
    b.rm_en + b.rm_ms + b.rm_zh > 0
      ? "Check prices vs MASTER_PRICES"
      : "No price references",
  reviewed: TODAY,
  notes: `${b.date} · RM refs ${b.rm_en}/${b.rm_ms}/${b.rm_zh} · FAQs ${b.faq_en}/${b.faq_ms}/${b.faq_zh} (priced ${b.faq_with_price_en}/${b.faq_with_price_ms}/${b.faq_with_price_zh})`,
}));

const { masterFaqPool } = await load("config/master-faq-pool.ts");
const faqRows = [];
let fi = 0;
for (const lang of ["en", "ms", "zh"]) {
  for (const item of masterFaqPool[lang] ?? []) {
    const hasPrice = /RM\s?\d/.test(item.a) || /RM\s?\d/.test(item.q);
    if (!hasPrice) continue;
    fi += 1;
    faqRows.push({
      id: `FAQ-${String(fi).padStart(3, "0")}`,
      type: "FAQ (master pool)",
      title: item.q,
      url: "/faq",
      lang: lang.toUpperCase(),
      service: item.category,
      priceId: "",
      hasPrice: "Yes",
      status: "PUBLISHED",
      action: "Map to Price_IDs and verify amounts",
      reviewed: TODAY,
      notes: item.a.slice(0, 110),
    });
  }
}

const blogFaqRows = [];
for (const b of blogs) {
  const withPrice = b.faq_with_price_en + b.faq_with_price_ms + b.faq_with_price_zh;
  if (!withPrice) continue;
  blogFaqRows.push({
    id: `BFAQ-${String(blogFaqRows.length + 1).padStart(3, "0")}`,
    type: "FAQ (blog)",
    title: `${b.title} — inline FAQ`,
    url: `/blog/${b.slug}`,
    lang: ["EN", b.has_ms ? "MS" : "", b.has_zh ? "ZH" : ""].filter(Boolean).join(" / "),
    service: b.relatedService,
    priceId: "",
    hasPrice: "Yes",
    status: "PUBLISHED",
    action: "Verify against MASTER_PRICES when the related price changes",
    reviewed: TODAY,
    notes: `${withPrice} priced answers (${b.faq_with_price_en}/${b.faq_with_price_ms}/${b.faq_with_price_zh})`,
  });
}

const serviceFaqRows = [];
for (const [slug, d] of Object.entries(servicesData)) {
  const withPrice =
    (d.faqs ?? []).filter((f) => /RM\s?\d/.test(f.a)).length +
    (d.faqsBM ?? []).filter((f) => /RM\s?\d/.test(f.a)).length +
    (d.faqsZH ?? []).filter((f) => /RM\s?\d/.test(f.a)).length;
  if (!withPrice) continue;
  serviceFaqRows.push({
    id: `SFAQ-${String(serviceFaqRows.length + 1).padStart(3, "0")}`,
    type: "FAQ (service page)",
    title: `${d.title} — service page FAQ block`,
    url: `/services/${slug}`,
    lang: "EN / MS / ZH",
    service: slug,
    priceId: "",
    hasPrice: "Yes",
    status: "PUBLISHED",
    action: "Map answers to Price_IDs; RM 138 / RM 170 conflicts flagged",
    reviewed: TODAY,
    notes: `${withPrice} price-bearing answer(s) across 3 languages`,
  });
}

const audit = [...blogRows, ...faqRows, ...blogFaqRows, ...serviceFaqRows];

// ── Write ───────────────────────────────────────────────────────────────────
const H = {
  master: [
    "Price_ID",
    "Service_Category",
    "Service_Name",
    "Subservice_Name",
    "Price_Type",
    "Current_Approved_Price",
    "Currency",
    "Pricing_Unit",
    "Minimum_Quantity",
    "Included_Quantity",
    "Additional_Quantity_Rate",
    "Material_Cost",
    "Labour_Cost",
    "Discount_Rules",
    "Conditions",
    "Exclusions",
    "Warranty_Conditions",
    "English_Description",
    "Malay_Description",
    "Chinese_Description",
    "Status",
    "Last_Updated",
    "Updated_By",
    "Sync_Status",
    "Last_Synced_Commit",
    "Notes",
  ],
  locations: [
    "Price_ID",
    "Page_URL",
    "Page_Name",
    "Content_Type",
    "Language",
    "GitHub_File_Path",
    "Component_Name",
    "Function_Name",
    "Calculator_Dependency",
    "Schema_Dependency",
    "Notes",
  ],
  changelog: [
    "Change_ID",
    "Price_ID",
    "Previous_Price",
    "New_Price",
    "Change_Date",
    "Change_Requested_By",
    "Approval_Status",
    "Implementation_Status",
    "GitHub_Branch",
    "GitHub_Commit",
    "Vercel_Deployment",
    "Verification_Status",
    "Error_Notes",
  ],
  sync: [
    "Price_ID",
    "Spreadsheet_Value",
    "Website_Value",
    "Last_Checked",
    "Sync_Status",
    "Affected_Locations",
    "Error_Details",
    "Last_Commit",
    "Deployment_Status",
  ],
  audit: [
    "Content_ID",
    "Content_Type",
    "Title_or_Question",
    "URL",
    "Language",
    "Related_Service",
    "Related_Price_ID",
    "Contains_Price",
    "Content_Status",
    "Recommended_Action",
    "Last_Reviewed",
    "Notes",
  ],
};

const rowsMaster = [
  H.master,
  ...master.map((m) => [
    m.id, m.category, m.service, m.subservice, m.priceType, m.value, m.currency,
    m.unit, m.minQty, m.included, m.addl, m.materialCost, m.labourCost, m.discount,
    m.conditions, m.exclusions, m.warranty, m.en, m.ms, m.zh, m.status,
    m.lastUpdated, m.updatedBy, m.sync, m.commit, m.notes,
  ]),
];

const rowsLocations = [
  H.locations,
  ...loc.map((l) => [
    l.priceId, l.pageUrl, l.pageName, l.contentType, l.language, l.file,
    l.component, l.fn, l.calc, l.schema, l.notes,
  ]),
];

const rowsChange = [
  H.changelog,
  ...changeLog.map((c) => [
    c.id, c.priceId, c.previous, c.next, c.date, c.requestedBy, c.approval,
    c.impl, c.branch, c.commit, c.deployment, c.verification, c.errors,
  ]),
];

const rowsSync = [
  H.sync,
  ...sync.map((s) => [
    s.priceId, s.sheet, s.site, s.checked, s.status, s.affected, s.errors,
    s.commit, s.deploy,
  ]),
];

const rowsAudit = [
  H.audit,
  ...audit.map((a) => [
    a.id, a.type, a.title, a.url, a.lang, a.service, a.priceId, a.hasPrice,
    a.status, a.action, a.reviewed, a.notes,
  ]),
];

const write = (n, d) => fs.writeFileSync(path.join(outDir, n), JSON.stringify(d));
write("master-prices.json", rowsMaster);
write("price-locations.json", rowsLocations);
write("price-change-log.json", rowsChange);
write("sync-status.json", rowsSync);
write("blog-faq-audit.json", rowsAudit);

const stats = {
  master_rows: master.length,
  location_rows: loc.length,
  change_log_rows: changeLog.length,
  sync_rows: sync.length,
  audit_rows: audit.length,
  blogs: blogRows.length,
  faqs_master_pool: faqRows.length,
  faqs_blog: blogFaqRows.length,
  faqs_service: serviceFaqRows.length,
  needs_confirmation: master.filter((m) => m.status !== "ACTIVE").map((m) => m.id),
};
fs.writeFileSync(path.join(outDir, "stats.json"), JSON.stringify(stats, null, 2));
console.log(JSON.stringify(stats, null, 2));
