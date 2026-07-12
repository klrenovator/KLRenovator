/**
 * KL Renovator — Topical Authority Map
 * Version: 1.0 — June 2026
 *
 * This file defines the complete silo architecture:
 * - Pillar pages and their cluster pages
 * - Link flow between clusters
 * - Anchor text strategy per relationship
 * - Cross-cluster contextual linking rules
 *
 * SILO ARCHITECTURE:
 * Homepage (Authority Hub)
 *   ├── Service Silo       /services → [9 service pages]
 *   ├── Problem Silo       /problems → [20 problem pages]
 *   ├── Location Silo      /areas    → [39 area pages + 116 kampung pages]
 *   ├── Brand Silo         /brands   → [18 brand pages]
 *   └── Blog Silo          /blog     → [20 blog posts]
 *
 * CROSS-SILO LINK FLOW:
 * Service → Problem (service fixes these problems)
 * Problem → Service (this service fixes the problem)
 * Problem → Blog  (learn more about this problem)
 * Service → Blog  (guides about this service)
 * Area → Service  (this service in this area)
 * Area → Blog     (local + educational guides)
 * Kampung → Problem/Blog (inherits parent area's map — see getProblemsForKampung/getBlogsForKampung below)
 * Blog → Service  (book this service)
 * Blog → Problem  (related problems)
 * Brand → Service (service this brand)
 * Brand → Problem (problems common with this brand)
 */

// ── Types ─────────────────────────────────────────────────────────────────────
export interface SiloPage {
  slug: string;
  url: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  parent: string;
  recommendedAnchors: string[];
}

export interface CrossLink {
  fromType: "service" | "problem" | "area" | "brand" | "blog";
  fromSlug: string;
  toType: "service" | "problem" | "area" | "brand" | "blog" | "emergency";
  toSlugs: string[];
  anchorTexts: string[];
  context: string; // why this link exists
}

// ── PILLAR PAGES ──────────────────────────────────────────────────────────────
export const PILLAR_PAGES = {
  homepage: { url: "/", keyword: "aircond service KL Selangor", priority: 1.0 },
  services: { url: "/services", keyword: "aircond services KL Selangor", priority: 0.95 },
  emergency: { url: "/services/emergency", keyword: "emergency aircond repair KL", priority: 0.97 },
  problems: { url: "/problems", keyword: "aircond problems KL Selangor", priority: 0.85 },
  areas: { url: "/areas", keyword: "aircond service areas KL Selangor", priority: 0.90 },
  brands: { url: "/brands", keyword: "aircond brands KL Selangor", priority: 0.88 },
  blog: { url: "/blog", keyword: "aircond guides Malaysia", priority: 0.85 },
};

// ── SERVICE → PROBLEM MAP ─────────────────────────────────────────────────────
// Which problems does each service fix?
export const SERVICE_PROBLEM_MAP: Record<string, string[]> = {
  "chemical-wash": [
    "aircond-not-cold",
    "aircond-bad-smell",
    "aircond-weak-airflow",
    "aircond-high-electricity-bill",
    "aircond-water-dripping",
  ],
  "chemical-overhaul": [
    "aircond-water-leaking",
    "aircond-indoor-unit-leaking",
    "aircond-freezing-up",
    "aircond-bad-smell",
    "aircond-water-dripping",
  ],
  "gas-topup": [
    "aircond-not-cold",
    "aircond-low-gas",
    "aircond-gas-leak",
    "aircond-freezing-up",
    "aircond-high-electricity-bill",
  ],
  "repair": [
    "baiki-vs-tukar-baru-aircond-malaysia",
    "aircond-making-noise",
    "aircond-not-turning-on",
    "aircond-tripping-power",
    "aircond-fan-not-working",
    "aircond-pcb-problem",
    "aircond-compressor-problem",
    "aircond-remote-not-working",
    "aircond-outdoor-unit-not-running",
    "aircond-blinking-light",
    "aircond-thermostat-problems",
  ],
  "basic-servicing": [
    "aircond-high-electricity-bill",
    "aircond-weak-airflow",
    "aircond-bad-smell",
  ],
  "installation": [
    "cara-pilih-hp-aircond-bilik-malaysia",],
  "dismantling-relocation": [],
  "ceiling-cassette": [
    "aircond-water-leaking",
    "aircond-not-cold",
    "aircond-weak-airflow",
  ],
  "emergency": [
    "aircond-not-turning-on",
    "aircond-tripping-power",
    "aircond-water-leaking",
    "aircond-outdoor-unit-not-running",
    "aircond-compressor-problem",
  ],
};

// ── PROBLEM → SERVICE MAP (primary + secondary) ───────────────────────────────
export const PROBLEM_SERVICE_MAP: Record<string, { primary: string; secondary?: string }> = {
  "aircond-not-cold": { primary: "gas-topup", secondary: "chemical-wash" },
  "aircond-water-leaking": { primary: "chemical-overhaul", secondary: "chemical-wash" },
  "aircond-making-noise": { primary: "repair", secondary: "chemical-wash" },
  "aircond-bad-smell": { primary: "chemical-wash", secondary: "chemical-overhaul" },
  "aircond-freezing-up": { primary: "chemical-overhaul", secondary: "gas-topup" },
  "aircond-low-gas": { primary: "gas-topup" },
  "aircond-gas-leak": { primary: "gas-topup", secondary: "repair" },
  "aircond-compressor-problem": { primary: "repair" },
  "aircond-pcb-problem": { primary: "repair" },
  "aircond-fan-not-working": { primary: "repair" },
  "aircond-tripping-power": { primary: "repair" },
  "aircond-remote-not-working": { primary: "repair" },
  "aircond-indoor-unit-leaking": { primary: "chemical-overhaul", secondary: "chemical-wash" },
  "aircond-outdoor-unit-not-running": { primary: "repair" },
  "aircond-high-electricity-bill": { primary: "chemical-wash", secondary: "gas-topup" },
  "aircond-weak-airflow": { primary: "chemical-wash" },
  "aircond-not-turning-on": { primary: "repair" },
  "aircond-blinking-light": { primary: "repair" },
  "aircond-water-dripping": { primary: "chemical-wash", secondary: "chemical-overhaul" },
  "aircond-thermostat-problems": { primary: "repair" },
};

// ── PROBLEM → BLOG MAP (expanded) ─────────────────────────────────────────────
export const PROBLEM_BLOG_MAP_V2: Record<string, string[]> = {
  "aircond-not-cold": ["aircond-not-cold-reasons", "r32-r410a-r22-gas-difference", "aircond-troubleshooting-guide-malaysia", "aircond-gas-topup-myths-malaysia"],
  "aircond-water-leaking": ["aircond-water-leaking-causes", "chemical-wash-vs-chemical-overhaul", "signs-your-aircon-needs-chemical-overhaul-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-making-noise": ["aircond-troubleshooting-guide-malaysia", "aircond-maintenance-checklist-malaysia", "how-often-service-aircond-malaysia"],
  "aircond-bad-smell": ["how-often-service-aircond-malaysia", "aircond-chemical-wash-price-malaysia-2026", "chemical-wash-vs-chemical-overhaul", "aircond-maintenance-checklist-malaysia"],
  "aircond-freezing-up": ["aircond-not-cold-reasons", "r32-r410a-r22-gas-difference", "aircond-water-leaking-causes", "signs-your-aircon-needs-chemical-overhaul-malaysia"],
  "aircond-low-gas": ["r32-r410a-r22-gas-difference", "aircond-not-cold-reasons", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "aircond-gas-leak": ["r32-r410a-r22-gas-difference", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "aircond-compressor-problem": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia", "best-aircond-brands-malaysia-2026"],
  "aircond-pcb-problem": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "aircond-fan-not-working": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-tripping-power": ["aircond-troubleshooting-guide-malaysia"],
  "aircond-remote-not-working": ["aircond-troubleshooting-guide-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-indoor-unit-leaking": ["aircond-water-leaking-causes", "signs-your-aircon-needs-chemical-overhaul-malaysia", "chemical-wash-vs-chemical-overhaul"],
  "aircond-outdoor-unit-not-running": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "aircond-high-electricity-bill": ["how-to-reduce-aircond-electricity-bill-malaysia", "inverter-vs-non-inverter-aircond-malaysia", "how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-weak-airflow": ["aircond-chemical-wash-price-malaysia-2026", "how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-not-turning-on": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "aircond-blinking-light": ["aircond-troubleshooting-guide-malaysia"],
  "aircond-water-dripping": ["aircond-water-leaking-causes", "aircond-chemical-wash-price-malaysia-2026", "signs-your-aircon-needs-chemical-overhaul-malaysia"],
  "aircond-thermostat-problems": ["aircond-troubleshooting-guide-malaysia", "how-often-service-aircond-malaysia"],
};

// ── SERVICE → BLOG MAP (expanded) ─────────────────────────────────────────────
export const SERVICE_BLOG_MAP_V2: Record<string, string[]> = {
  "chemical-wash": [
    "pressure-chemical-wash-leaking-aircond-kl-selangor",
    "smelly-aircond-foul-musty-odor-kl-selangor",
    "aircond-chemical-wash-price-malaysia-2026",
    "chemical-wash-vs-chemical-overhaul",
    "how-often-service-aircond-malaysia",
    "harga-servis-aircond-2026-malaysia",
  ],
  "chemical-overhaul": [
    "aircond-chemical-overhaul-kl-selangor-cooling-efficiency",
    "signs-your-aircon-needs-chemical-overhaul-malaysia",
    "chemical-wash-vs-chemical-overhaul",
    "aircond-water-leaking-causes",
    "smelly-aircond-foul-musty-odor-kl-selangor",
  ],
  "gas-topup": [
    "aircond-gas-topup-malaysia-r32-r410a-r22-balancing",
    "r32-vs-r410a-vs-r22-aircond-gas-malaysia",
    "r32-r410a-r22-gas-difference",
    "aircond-gas-topup-myths-malaysia",
    "aircond-not-cold-reasons",
  ],
  "repair": [
    "baiki-vs-tukar-baru-aircond-malaysia",
    "aircond-troubleshooting-repair-kl-selangor-leaks-noise-wiring",
    "aircond-troubleshooting-guide-malaysia",
    "aircond-not-cold-reasons",
    "aircond-water-leaking-causes",
    "aircond-lifespan-malaysia",
  ],
  "installation": [
    "cara-pilih-hp-aircond-bilik-malaysia",
    "professional-new-aircond-installation-kl-selangor-2026",
    "rm199-vs-rm300-aircond-installation-kl-renovator",
    "aircond-installation-dismantling-kl-selangor-price-guide",
    "aircond-installation-guide-malaysia",
    "inverter-vs-non-inverter-aircond-malaysia-tnb-bill",
  ],
  "basic-servicing": [
    "regular-aircond-basic-servicing-kl-selangor-2026",
    "how-often-service-aircond-malaysia",
    "aircond-maintenance-checklist-malaysia",
    "how-to-reduce-aircond-electricity-bill-malaysia",
    "aircond-service-price-guide-kl-2026",
    "inverter-vs-non-inverter-aircond-service-malaysia-2026",
    "harga-servis-aircond-2026-malaysia",
  ],
  "ceiling-cassette": [
    "commercial-hvac-maintenance-kl",
    "aircond-service-price-guide-kl-2026",
    "aircond-chemical-overhaul-kl-selangor-cooling-efficiency",
    "aircond-troubleshooting-repair-kl-selangor-leaks-noise-wiring",
  ],
  "dismantling-relocation": [
    "aircond-installation-dismantling-kl-selangor-price-guide",
    "professional-new-aircond-installation-kl-selangor-2026",
    "rm199-vs-rm300-aircond-installation-kl-renovator",
    "aircond-installation-guide-malaysia",
    "aircond-lifespan-malaysia",
  ],
  "emergency": [
    "aircond-troubleshooting-repair-kl-selangor-leaks-noise-wiring",
    "aircond-troubleshooting-guide-malaysia",
    "aircond-not-cold-reasons",
    "pressure-chemical-wash-leaking-aircond-kl-selangor",
    "aircond-water-leaking-causes",
  ],
  "maintenance-contract": [
    "servis-aircond-rumah-sewa-airbnb-malaysia",
    "aircond-maintenance-contract-malaysia-2026",
    "how-often-service-aircond-malaysia",
    "aircond-maintenance-checklist-malaysia",
    "aircond-service-price-guide-kl-2026",
  ],
};

// ── AREA → TOP PROBLEMS MAP ───────────────────────────────────────────────────
// Top problems to link from each area page (drives problem cluster traffic)
export const AREA_PROBLEM_MAP: Record<string, string[]> = {
  // Default for all areas — top 5 most searched problems
  "_default": [
    "aircond-not-cold",
    "aircond-water-leaking",
    "aircond-bad-smell",
    "aircond-making-noise",
    "aircond-weak-airflow",
  ],
  // Commercial-heavy areas get ceiling cassette problems too
  "petaling-jaya": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-high-electricity-bill", "aircond-making-noise"],
  "klang": ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-weak-airflow", "aircond-tripping-power"],
  "subang-jaya": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-high-electricity-bill", "aircond-freezing-up"],
  "shah-alam": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-weak-airflow", "aircond-high-electricity-bill"],
  "cheras": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-making-noise", "aircond-low-gas"],
  "ampang": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-making-noise", "aircond-freezing-up"],
  "kajang": ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-bad-smell", "aircond-weak-airflow"],
  "puchong": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-making-noise", "aircond-high-electricity-bill"],
};

// ── AREA → TOP BLOGS MAP ─────────────────────────────────────────────────────
// Blog posts to feature from each area page
export const AREA_BLOG_MAP: Record<string, string[]> = {
  "_default": [
    "regular-aircond-basic-servicing-kl-selangor-2026",
    "pressure-chemical-wash-leaking-aircond-kl-selangor",
    "aircond-troubleshooting-repair-kl-selangor-leaks-noise-wiring",
    "aircond-service-price-guide-kl-2026",
  ],
};

// ── KAMPUNG → TOP PROBLEMS / BLOGS (inherits from parent area) ──────────────
// Kampung/neighbourhood pages (config/site.ts → kampungPages) don't get their
// own entries here — with 116+ of them and growing, manually duplicating the
// parent area's list per kampung would be a maintenance trap (every future
// batch would need a matching map edit, breaking the "data-only" promise in
// KLRenovator-KAMPUNG-MASTER-PLAN.md). Instead, a kampung page resolves its
// cross-links by looking up its OWN parentSlug in the maps above. This means:
//   - Every existing + future kampung gets relevant problem/blog links
//     automatically the moment its parentSlug area has a map entry.
//   - Areas not yet in AREA_PROBLEM_MAP/AREA_BLOG_MAP fall through to
//     "_default", same as the parent area page itself does.
// Call these from the kampung page templates instead of indexing the maps
// directly with the kampung's own slug.
export function getProblemsForKampung(parentSlug: string): string[] {
  return AREA_PROBLEM_MAP[parentSlug] || AREA_PROBLEM_MAP["_default"];
}

export function getBlogsForKampung(parentSlug: string): string[] {
  return AREA_BLOG_MAP[parentSlug] || AREA_BLOG_MAP["_default"];
}


// ── BRAND → COMMON PROBLEMS MAP ──────────────────────────────────────────────
// Each brand page should link to these problem pages
export const BRAND_PROBLEM_MAP: Record<string, string[]> = {
  "daikin": ["aircond-not-cold", "aircond-blinking-light", "aircond-water-leaking", "aircond-low-gas"],
  "panasonic": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-blinking-light"],
  "mitsubishi":         ["aircond-not-cold", "aircond-blinking-light", "aircond-pcb-problem", "aircond-water-leaking"],
  "york": ["aircond-not-cold", "aircond-compressor-problem", "aircond-water-leaking", "aircond-low-gas"],
  "acson": ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-low-gas"],
  "midea": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-making-noise"],
  "samsung": ["aircond-not-cold", "aircond-blinking-light", "aircond-water-leaking", "aircond-pcb-problem"],
  "lg": ["aircond-not-cold", "aircond-water-leaking", "aircond-blinking-light", "aircond-fan-not-working"],
  "hisense": ["aircond-not-cold", "aircond-water-leaking", "aircond-blinking-light", "aircond-low-gas"],
  "aux": ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-low-gas"],
  "tcl": ["aircond-not-cold", "aircond-bad-smell", "aircond-water-leaking", "aircond-blinking-light"],
  "national": ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-low-gas"],
  "isonic": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-low-gas"],
  "_default": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-making-noise"],
};

// ── BRAND → SERVICE MAP ───────────────────────────────────────────────────────
// Key services to promote from each brand page
export const BRAND_SERVICE_MAP: Record<string, string[]> = {
  // Round 51 / 10.1–10.6: brand → service reverse links (triangular brand↔service↔problem)
  "daikin": ["chemical-wash", "gas-topup", "chemical-overhaul", "repair", "installation"],
  "panasonic": ["chemical-wash", "gas-topup", "chemical-overhaul", "repair", "basic-servicing"],
  "mitsubishi": ["chemical-wash", "gas-topup", "repair", "chemical-overhaul"],
  "york": ["chemical-wash", "gas-topup", "repair", "installation"],
  "acson": ["chemical-wash", "gas-topup", "chemical-overhaul", "repair"],
  "midea": ["chemical-wash", "basic-servicing", "gas-topup", "repair"],
  "samsung": ["chemical-wash", "repair", "gas-topup", "installation"],
  "lg": ["chemical-wash", "repair", "gas-topup", "basic-servicing"],
  "hisense": ["chemical-wash", "gas-topup", "basic-servicing", "repair"],
  "aux": ["chemical-wash", "gas-topup", "repair", "basic-servicing"],
  "tcl": ["chemical-wash", "basic-servicing", "gas-topup", "repair"],
  "national": ["chemical-wash", "gas-topup", "repair", "chemical-overhaul"],
  "isonic": ["chemical-wash", "basic-servicing", "gas-topup", "repair"],
  "carrier": ["chemical-wash", "gas-topup", "chemical-overhaul", "repair"],
  "haier": ["chemical-wash", "basic-servicing", "gas-topup", "repair"],
  "toshiba": ["chemical-wash", "gas-topup", "repair", "installation"],
  "hitachi": ["chemical-wash", "gas-topup", "chemical-overhaul", "repair"],
  "sharp": ["chemical-wash", "basic-servicing", "gas-topup", "repair"],
  "fujitsu": ["chemical-wash", "gas-topup", "repair", "installation"],
  "gree": ["chemical-wash", "basic-servicing", "gas-topup", "repair"],
  "_default": ["chemical-wash", "gas-topup", "chemical-overhaul", "repair"],
};

// ── PROBLEM → BRAND MAP (derived from BRAND_PROBLEM_MAP above) ────────────────
// Problem pages previously linked to Services, Areas, and Blog posts but never
// to Brand pages. Built once at module load by inverting BRAND_PROBLEM_MAP,
// so it stays in sync automatically if brand-problem associations change.
export const PROBLEM_BRAND_MAP: Record<string, string[]> = (() => {
  const map: Record<string, string[]> = {};
  for (const [brandSlug, problemSlugs] of Object.entries(BRAND_PROBLEM_MAP)) {
    if (brandSlug === "_default") continue;
    for (const problemSlug of problemSlugs) {
      if (!map[problemSlug]) map[problemSlug] = [];
      map[problemSlug].push(brandSlug);
    }
  }
  return map;
})();

// ── BLOG → SERVICE MAP ────────────────────────────────────────────────────────
// Which services to link from each blog post
// Round 51 / 10.1–10.6: complete reverse coverage for all 43 blog posts
export const BLOG_SERVICE_MAP: Record<string, string[]> = {
  "aircond-service-batu-caves-selayang-2026": ["chemical-wash", "chemical-overhaul", "basic-servicing"],
  "aircond-chemical-wash-price-malaysia-2026": ["chemical-wash", "chemical-overhaul", "basic-servicing"],
  "signs-your-aircon-needs-chemical-overhaul-malaysia": ["chemical-overhaul", "chemical-wash", "repair"],
  "chemical-wash-vs-chemical-overhaul": ["chemical-overhaul", "chemical-wash", "repair"],
  "aircond-not-cold-reasons": ["repair", "gas-topup", "chemical-wash"],
  "how-often-service-aircond-malaysia": ["basic-servicing", "chemical-wash", "maintenance-contract"],
  "r32-r410a-r22-gas-difference": ["gas-topup", "repair", "chemical-wash"],
  "aircond-water-leaking-causes": ["chemical-overhaul", "chemical-wash", "repair"],
  "best-aircond-brands-malaysia-2026": ["installation", "dismantling-relocation", "basic-servicing"],
  "aircond-maintenance-checklist-malaysia": ["basic-servicing", "chemical-wash", "maintenance-contract"],
  "aircond-service-price-guide-kl-2026": ["chemical-wash", "chemical-overhaul", "basic-servicing"],
  "inverter-vs-non-inverter-aircond-malaysia": ["installation", "dismantling-relocation", "basic-servicing"],
  "daikin-vs-panasonic-aircond-malaysia": ["installation", "dismantling-relocation", "basic-servicing"],
  "how-to-reduce-aircond-electricity-bill-malaysia": ["chemical-wash", "chemical-overhaul", "basic-servicing"],
  "aircond-installation-guide-malaysia": ["installation", "dismantling-relocation", "basic-servicing"],
  "aircond-lifespan-malaysia": ["repair", "gas-topup", "chemical-wash"],
  "aircond-troubleshooting-guide-malaysia": ["repair", "gas-topup", "chemical-wash"],
  "commercial-hvac-maintenance-kl": ["ceiling-cassette", "chemical-wash", "maintenance-contract"],
  "aircond-gas-topup-myths-malaysia": ["gas-topup", "repair", "chemical-wash"],
  "aircond-buying-guide-malaysia-2026": ["installation", "dismantling-relocation", "basic-servicing"],
  "professional-new-aircond-installation-kl-selangor-2026": ["installation", "dismantling-relocation", "basic-servicing"],
  "regular-aircond-basic-servicing-kl-selangor-2026": ["basic-servicing", "chemical-wash", "maintenance-contract"],
  "pressure-chemical-wash-leaking-aircond-kl-selangor": ["chemical-wash", "chemical-overhaul", "basic-servicing"],
  "aircond-chemical-overhaul-kl-selangor-cooling-efficiency": ["chemical-overhaul", "chemical-wash", "repair"],
  "aircond-gas-topup-malaysia-r32-r410a-r22-balancing": ["gas-topup", "repair", "chemical-wash"],
  "aircond-troubleshooting-repair-kl-selangor-leaks-noise-wiring": ["repair", "gas-topup", "chemical-wash"],
  "aircond-installation-dismantling-kl-selangor-price-guide": ["dismantling-relocation", "installation", "gas-topup"],
  "inverter-vs-non-inverter-aircond-malaysia-tnb-bill": ["installation", "dismantling-relocation", "basic-servicing"],
  "smelly-aircond-foul-musty-odor-kl-selangor": ["chemical-wash", "chemical-overhaul", "basic-servicing"],
  "r32-vs-r410a-vs-r22-aircond-gas-malaysia": ["gas-topup", "repair", "chemical-wash"],
  "rm199-vs-rm300-aircond-installation-kl-renovator": ["installation", "dismantling-relocation", "basic-servicing"],
  "aircond-installation-cost-malaysia-2026": ["installation", "dismantling-relocation", "basic-servicing"],
  "why-aircond-installation-expensive-malaysia": ["installation", "dismantling-relocation", "basic-servicing"],
  "1-hp-aircond-bedroom-malaysia": ["installation", "dismantling-relocation", "basic-servicing"],
  "ac-unit-installation-cost-malaysia": ["installation", "dismantling-relocation", "basic-servicing"],
  "3-minute-rule-aircon-malaysia": ["repair", "gas-topup", "chemical-wash"],
  "ac-service-price-malaysia-2026": ["basic-servicing", "chemical-wash", "maintenance-contract"],
  "1-hour-ac-electricity-cost-malaysia": ["basic-servicing", "chemical-wash", "maintenance-contract"],
  "aircond-leaking-water-malaysia": ["repair", "gas-topup", "chemical-wash"],
  "aircond-installation-time-malaysia": ["installation", "dismantling-relocation", "basic-servicing"],
  "aircond-maintenance-contract-malaysia-2026": ["maintenance-contract", "basic-servicing", "chemical-wash"],
  "inverter-vs-non-inverter-aircond-service-malaysia-2026": ["basic-servicing", "chemical-wash", "maintenance-contract"],
  "harga-servis-aircond-2026-malaysia": ["chemical-wash", "chemical-overhaul", "basic-servicing"],
};



// ── ROUND 51 / 10.1–10.6 BI-DIRECTIONAL LINKING HELPERS ───────────────────────
// Shared builders so EN/MS/ZH templates stay in parity without duplicating map logic.

export type LinkLocale = "en" | "ms" | "zh";

const LOCALE_PREFIX: Record<LinkLocale, string> = {
  en: "",
  ms: "/ms",
  zh: "/zh",
};

export function localePath(locale: LinkLocale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const prefix = LOCALE_PREFIX[locale];
  if (!prefix) return clean;
  if (clean === "/") return prefix || "/";
  return `${prefix}${clean}`;
}

export function getServicesForBrand(brandSlug: string): string[] {
  return BRAND_SERVICE_MAP[brandSlug] || BRAND_SERVICE_MAP["_default"] || [];
}

export function getProblemsForBrand(brandSlug: string): string[] {
  return BRAND_PROBLEM_MAP[brandSlug] || BRAND_PROBLEM_MAP["_default"] || [];
}

export function getServicesForBlog(blogSlug: string): string[] {
  return BLOG_SERVICE_MAP[blogSlug] || [];
}

export function getBlogsForProblem(problemSlug: string): string[] {
  return PROBLEM_BLOG_MAP_V2[problemSlug] || [];
}

export function getServicesForProblem(problemSlug: string): { primary?: string; secondary?: string } {
  return PROBLEM_SERVICE_MAP[problemSlug] || {};
}

export function getProblemsForService(serviceSlug: string): string[] {
  return SERVICE_PROBLEM_MAP[serviceSlug] || [];
}

export function getBlogsForService(serviceSlug: string): string[] {
  return SERVICE_BLOG_MAP_V2[serviceSlug] || [];
}

/** Invert SERVICE_BLOG_MAP_V2 → blog slug list that should link back to a given service */
export function getBlogsLinkingToService(serviceSlug: string): string[] {
  const out: string[] = [];
  for (const [blogSlug, services] of Object.entries(BLOG_SERVICE_MAP)) {
    if (services.includes(serviceSlug)) out.push(blogSlug);
  }
  // also include forward SERVICE_BLOG_MAP_V2 entries
  for (const slug of SERVICE_BLOG_MAP_V2[serviceSlug] || []) {
    if (!out.includes(slug)) out.push(slug);
  }
  return out;
}

// ── ANCHOR TEXT STRATEGY ─────────────────────────────────────────────────────
// Approved anchor text patterns per link type (use variety — avoid exact match spam)
export const ANCHOR_TEXTS = {
  "chemical-wash": ["pressure chemical wash", "aircond chemical wash", "chemical wash service", "deep chemical clean", "chemical wash KL"],
  "chemical-overhaul": ["chemical overhaul", "full aircond overhaul", "chemical overhaul KL", "deep clean overhaul", "dismantling overhaul"],
  "gas-topup": ["gas top-up", "refrigerant top-up", "gas top-up KL", "R32 gas top-up", "R410A gas top-up"],
  "repair": [
    "baiki-vs-tukar-baru-aircond-malaysia","aircond repair", "troubleshooting & repair", "aircond troubleshooting", "fault diagnosis", "repair service KL"],
  "basic-servicing": ["basic servicing", "routine maintenance", "aircond maintenance", "regular service", "service & clean"],
  "installation": [
    "cara-pilih-hp-aircond-bilik-malaysia","new installation", "aircond installation KL", "unit installation", "professional installation"],
  "ceiling-cassette": ["ceiling cassette service", "cassette aircond service", "commercial cassette"],
  "dismantling-relocation": ["dismantle & relocate", "aircond relocation", "unit relocation"],
  "emergency": ["emergency aircond repair", "same-day emergency repair", "urgent aircond repair", "emergency service KL"],
  "aircond-not-cold": ["aircond not cold", "why aircond not cooling", "aircond running but not cold"],
  "aircond-water-leaking": ["aircond water leaking", "aircond leaking water", "aircond dripping water"],
  "aircond-bad-smell": ["aircond bad smell", "mouldy aircond smell", "aircond musty odour"],
  "aircond-making-noise": ["aircond making noise", "noisy aircond", "aircond strange sounds"],
  "aircond-high-electricity-bill": ["high electricity bill aircond", "aircond energy consumption", "reduce aircond bill"],
  "aircond-weak-airflow": ["weak airflow aircond", "aircond low airflow", "poor aircond airflow"],
  "services-hub": ["view all services", "our aircond services", "full service list"],
  "areas-hub": ["service areas", "areas we cover", "KL and Selangor coverage"],
};

// ── HOMEPAGE SILO STRUCTURE ───────────────────────────────────────────────────
// Defines the full topical hub displayed on homepage
export const HOMEPAGE_SILO = {
  problems: {
    label: "Aircond Problems · Masalah",
    featured: [
      { slug: "aircond-not-cold", anchor: "Aircond Not Cold" },
      { slug: "aircond-water-leaking", anchor: "Aircond Water Leaking" },
      { slug: "aircond-bad-smell", anchor: "Aircond Bad Smell" },
      { slug: "aircond-making-noise", anchor: "Aircond Noisy" },
      { slug: "aircond-freezing-up", anchor: "Aircond Freezing Up" },
      { slug: "aircond-high-electricity-bill", anchor: "High Electricity Bill" },
    ],
  },
  brands: {
    label: "Brands We Service · Jenama",
    featured: [
      { slug: "daikin", anchor: "Daikin Aircond Service" },
      { slug: "panasonic", anchor: "Panasonic Aircond Service" },
      { slug: "mitsubishi", anchor: "Mitsubishi Aircond Service" },
      { slug: "york", anchor: "York Aircond Service" },
      { slug: "acson", anchor: "Acson Aircond Service" },
      { slug: "midea", anchor: "Midea Aircond Service" },
    ],
  },
  areas: {
    label: "Service Areas · Kawasan",
    featured: [
      { slug: "petaling-jaya", anchor: "Aircond Service Petaling Jaya" },
      { slug: "cheras", anchor: "Aircond Service Cheras" },
      { slug: "subang-jaya", anchor: "Aircond Service Subang Jaya" },
      { slug: "ampang", anchor: "Aircond Service Ampang" },
      { slug: "shah-alam", anchor: "Aircond Service Shah Alam" },
      { slug: "bangsar", anchor: "Aircond Service Bangsar" },
    ],
  },
  blog: {
    label: "Expert Guides · Panduan",
    featured: [
      { slug: "how-often-service-aircond-malaysia", anchor: "How Often to Service Aircond" },
      { slug: "chemical-wash-vs-chemical-overhaul", anchor: "Chemical Wash vs Overhaul" },
      { slug: "aircond-not-cold-reasons", anchor: "Why Aircond Not Cold" },
      { slug: "aircond-water-leaking-causes", anchor: "Why Aircond Leaking Water" },
      { slug: "r32-r410a-r22-gas-difference", anchor: "R32 vs R410A vs R22 Gas" },
      { slug: "aircond-service-price-guide-kl-2026", anchor: "Aircond Price Guide KL 2026" },
    ],
  },
  emergency: {
    label: "Emergency Service",
    featured: [
      { slug: "aircond-not-turning-on", anchor: "Aircond Not Turning On" },
      { slug: "aircond-tripping-power", anchor: "Aircond Tripping MCB" },
      { slug: "aircond-outdoor-unit-not-running", anchor: "Outdoor Unit Not Running" },
    ],
  },
};
