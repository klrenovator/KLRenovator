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
 *   ├── Service Silo       /services → [8 service pages]
 *   ├── Problem Silo       /problems → [20 problem pages]
 *   ├── Location Silo      /areas    → [38 area pages]
 *   ├── Brand Silo         /brands   → [15 brand pages]
 *   └── Blog Silo          /blog     → [19 blog posts]
 *
 * CROSS-SILO LINK FLOW:
 * Service → Problem (service fixes these problems)
 * Problem → Service (this service fixes the problem)
 * Problem → Blog  (learn more about this problem)
 * Service → Blog  (guides about this service)
 * Area → Service  (this service in this area)
 * Area → Blog     (local + educational guides)
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
  "installation": [],
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
  "aircond-water-leaking": ["aircond-water-leaking-causes", "chemical-wash-vs-chemical-overhaul", "signs-your-aircond-needs-chemical-overhaul-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-making-noise": ["aircond-troubleshooting-guide-malaysia", "aircond-maintenance-checklist-malaysia", "how-often-service-aircond-malaysia"],
  "aircond-bad-smell": ["how-often-service-aircond-malaysia", "aircond-chemical-wash-price-malaysia-2026", "chemical-wash-vs-chemical-overhaul", "aircond-maintenance-checklist-malaysia"],
  "aircond-freezing-up": ["aircond-not-cold-reasons", "r32-r410a-r22-gas-difference", "aircond-water-leaking-causes", "signs-your-aircond-needs-chemical-overhaul-malaysia"],
  "aircond-low-gas": ["r32-r410a-r22-gas-difference", "aircond-not-cold-reasons", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "aircond-gas-leak": ["r32-r410a-r22-gas-difference", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "aircond-compressor-problem": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia", "best-aircond-brands-malaysia-2025"],
  "aircond-pcb-problem": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "aircond-fan-not-working": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-tripping-power": ["aircond-troubleshooting-guide-malaysia"],
  "aircond-remote-not-working": ["aircond-troubleshooting-guide-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-indoor-unit-leaking": ["aircond-water-leaking-causes", "signs-your-aircond-needs-chemical-overhaul-malaysia", "chemical-wash-vs-chemical-overhaul"],
  "aircond-outdoor-unit-not-running": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "aircond-high-electricity-bill": ["how-to-reduce-aircond-electricity-bill-malaysia", "inverter-vs-non-inverter-aircond-malaysia", "how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-weak-airflow": ["aircond-chemical-wash-price-malaysia-2026", "how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-not-turning-on": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "aircond-blinking-light": ["aircond-troubleshooting-guide-malaysia"],
  "aircond-water-dripping": ["aircond-water-leaking-causes", "aircond-chemical-wash-price-malaysia-2026", "signs-your-aircond-needs-chemical-overhaul-malaysia"],
  "aircond-thermostat-problems": ["aircond-troubleshooting-guide-malaysia", "how-often-service-aircond-malaysia"],
};

// ── SERVICE → BLOG MAP (expanded) ─────────────────────────────────────────────
export const SERVICE_BLOG_MAP_V2: Record<string, string[]> = {
  "chemical-wash": ["aircond-chemical-wash-price-malaysia-2026", "chemical-wash-vs-chemical-overhaul", "signs-your-aircond-needs-chemical-overhaul-malaysia", "how-often-service-aircond-malaysia"],
  "chemical-overhaul": ["chemical-wash-vs-chemical-overhaul", "signs-your-aircond-needs-chemical-overhaul-malaysia", "aircond-water-leaking-causes", "how-often-service-aircond-malaysia"],
  "gas-topup": ["r32-r410a-r22-gas-difference", "aircond-not-cold-reasons", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "repair": ["aircond-not-cold-reasons", "aircond-water-leaking-causes", "aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "installation": ["aircond-installation-guide-malaysia", "best-aircond-brands-malaysia-2025", "inverter-vs-non-inverter-aircond-malaysia", "daikin-vs-panasonic-aircond-malaysia"],
  "basic-servicing": ["how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia", "how-to-reduce-aircond-electricity-bill-malaysia", "aircond-service-price-guide-kl-2026"],
  "ceiling-cassette": ["commercial-hvac-maintenance-kl", "aircond-service-price-guide-kl-2026"],
  "dismantling-relocation": ["aircond-installation-guide-malaysia", "aircond-lifespan-malaysia"],
  "emergency": ["aircond-troubleshooting-guide-malaysia", "aircond-not-cold-reasons", "aircond-water-leaking-causes"],
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
    "how-often-service-aircond-malaysia",
    "aircond-chemical-wash-price-malaysia-2026",
    "aircond-troubleshooting-guide-malaysia",
  ],
};

// ── BRAND → COMMON PROBLEMS MAP ──────────────────────────────────────────────
// Each brand page should link to these problem pages
export const BRAND_PROBLEM_MAP: Record<string, string[]> = {
  "daikin": ["aircond-not-cold", "aircond-blinking-light", "aircond-water-leaking", "aircond-low-gas"],
  "panasonic": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-blinking-light"],
  "mitsubishi-electric": ["aircond-not-cold", "aircond-blinking-light", "aircond-pcb-problem", "aircond-water-leaking"],
  "mitsubishi":         ["aircond-not-cold", "aircond-blinking-light", "aircond-pcb-problem", "aircond-water-leaking"],
  "york": ["aircond-not-cold", "aircond-compressor-problem", "aircond-water-leaking", "aircond-low-gas"],
  "acson": ["aircond-not-cold", "aircond-water-leaking", "aircond-making-noise", "aircond-low-gas"],
  "midea": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-making-noise"],
  "samsung": ["aircond-not-cold", "aircond-blinking-light", "aircond-water-leaking", "aircond-pcb-problem"],
  "lg": ["aircond-not-cold", "aircond-water-leaking", "aircond-blinking-light", "aircond-fan-not-working"],
  "_default": ["aircond-not-cold", "aircond-water-leaking", "aircond-bad-smell", "aircond-making-noise"],
};

// ── BRAND → SERVICE MAP ───────────────────────────────────────────────────────
// Key services to promote from each brand page
export const BRAND_SERVICE_MAP: Record<string, string[]> = {
  "_default": ["chemical-wash", "gas-topup", "chemical-overhaul", "repair"],
};

// ── BLOG → SERVICE MAP ────────────────────────────────────────────────────────
// Which services to link from each blog post
export const BLOG_SERVICE_MAP: Record<string, string[]> = {
  "aircond-chemical-wash-price-malaysia-2026": ["chemical-wash", "chemical-overhaul"],
  "chemical-wash-vs-chemical-overhaul": ["chemical-wash", "chemical-overhaul"],
  "signs-your-aircond-needs-chemical-overhaul-malaysia": ["chemical-overhaul", "chemical-wash"],
  "aircond-not-cold-reasons": ["gas-topup", "chemical-wash", "repair"],
  "how-often-service-aircond-malaysia": ["basic-servicing", "chemical-wash"],
  "r32-r410a-r22-gas-difference": ["gas-topup"],
  "aircond-water-leaking-causes": ["chemical-overhaul", "chemical-wash"],
  "best-aircond-brands-malaysia-2025": ["installation"],
  "aircond-maintenance-checklist-malaysia": ["basic-servicing", "chemical-wash"],
  "aircond-service-price-guide-kl-2026": ["basic-servicing", "chemical-wash", "chemical-overhaul", "gas-topup"],
  "inverter-vs-non-inverter-aircond-malaysia": ["installation"],
  "daikin-vs-panasonic-aircond-malaysia": ["installation", "repair"],
  "how-to-reduce-aircond-electricity-bill-malaysia": ["chemical-wash", "basic-servicing"],
  "aircond-installation-guide-malaysia": ["installation"],
  "aircond-lifespan-malaysia": ["basic-servicing", "chemical-overhaul", "repair"],
  "aircond-troubleshooting-guide-malaysia": ["repair", "gas-topup", "chemical-wash"],
  "commercial-hvac-maintenance-kl": ["ceiling-cassette"],
  "aircond-gas-topup-myths-malaysia": ["gas-topup"],
  "aircond-service-batu-caves-selayang-2026": ["chemical-wash", "basic-servicing"],
};

// ── ANCHOR TEXT STRATEGY ─────────────────────────────────────────────────────
// Approved anchor text patterns per link type (use variety — avoid exact match spam)
export const ANCHOR_TEXTS = {
  "chemical-wash": ["pressure chemical wash", "aircond chemical wash", "chemical wash service", "deep chemical clean", "chemical wash KL"],
  "chemical-overhaul": ["chemical overhaul", "full aircond overhaul", "chemical overhaul KL", "deep clean overhaul", "dismantling overhaul"],
  "gas-topup": ["gas top-up", "refrigerant top-up", "gas top-up KL", "R32 gas top-up", "R410A gas top-up"],
  "repair": ["aircond repair", "troubleshooting & repair", "aircond troubleshooting", "fault diagnosis", "repair service KL"],
  "basic-servicing": ["basic servicing", "routine maintenance", "aircond maintenance", "regular service", "service & clean"],
  "installation": ["new installation", "aircond installation KL", "unit installation", "professional installation"],
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
