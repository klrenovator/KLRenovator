/**
 * Round 53 / 10.9 & 20.107 — Anchor Text Natural Diversity Pass.
 *
 * Central engine that provides multiple natural anchor-text variants per
 * link target (service, brand, area, problem, blog) in EN, MS, and ZH.
 * Uses a stable hash to pick different variants so Google sees varied,
 * natural phrasing instead of repetitive exact-match anchor text.
 *
 * ─── USAGE ───────────────────────────────────────────────────────────
 *   import { anchor } from "@/config/anchor-text-diversity";
 *
 *   // Service link (deterministic by slug + context):
 *   anchor.service("chemical-wash", "en", 0)   // "Chemical Wash"
 *   anchor.service("chemical-wash", "en", 1)   // "Pressure Chemical Cleaning"
 *   anchor.service("chemical-wash", "en", 2)   // "Deep AC Wash"
 *
 *   // Brand link:
 *   anchor.brand("daikin", "en", 0)            // "Daikin AC Service"
 *   anchor.brand("daikin", "en", 1)            // "Daikin Aircond Specialist"
 *
 *   // Area link:
 *   anchor.area("petaling-jaya", "en", 0)      // "Aircond Service Petaling Jaya"
 *   anchor.area("petaling-jaya", "en", 1)      // "AC Repair in Petaling Jaya"
 *
 *   // Problem link:
 *   anchor.problem("aircond-not-cold", "en", 0)
 *
 *   // For deterministic hashing from slug:
 *   anchor.hashService(slug, "en")             // stable variant per slug
 *
 *   // Blog post inline link (diversified by context index):
 *   anchor.serviceForBlog(slug, "en", contextIdx)
 *
 * The hash is stable across builds — same slug always gets the same
 * primary variant, ensuring consistency while providing diversity across
 * different slugs.
 */

export type AnchorLocale = "en" | "ms" | "zh";

// ─── SIMPLE STRING HASH (stable, deterministic) ──────────────────────
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length];
}

// ═══════════════════════════════════════════════════════════════════════
// SERVICE ANCHOR TEXT VARIANTS (9 core services × 3 languages × 6 variants)
// ═══════════════════════════════════════════════════════════════════════

const SERVICE_ANCHORS: Record<string, Record<AnchorLocale, readonly string[]>> = {
  "chemical-wash": {
    en: [
      "Chemical Wash",
      "Pressure Chemical Cleaning",
      "Deep AC Chemical Wash",
      "Aircond Chemical Cleaning",
      "Full Chemical Service",
      "Chemical Deep-Clean",
    ],
    ms: [
      "Cuci Kimia",
      "Cuci Kimia Bertekanan",
      "Pembersihan Kimia Mendalam",
      "Servis Cuci Kimia Aircond",
      "Cucian Kimia Penuh",
      "Deep-Clean Kimia",
    ],
    zh: [
      "化学清洗",
      "高压化学清洗",
      "冷气化学深层清洁",
      "全面化学清洗服务",
      "冷气化学清洗",
      "深层化学清洁",
    ],
  },
  "chemical-overhaul": {
    en: [
      "Chemical Overhaul",
      "Full Chemical Overhaul",
      "Complete Overhaul Service",
      "Aircond Overhaul",
      "Deep Overhaul Cleaning",
      "Major Overhaul Service",
    ],
    ms: [
      "Overhaul Kimia",
      "Overhaul Kimia Penuh",
      "Servis Overhaul Lengkap",
      "Overhaul Aircond",
      "Pembersihan Overhaul Mendalam",
      "Servis Overhaul Utama",
    ],
    zh: [
      "化学大修",
      "全面化学大修",
      "冷气完整大修服务",
      "冷气大修",
      "深层大修清洁",
      "主要大修服务",
    ],
  },
  "gas-topup": {
    en: [
      "Gas Top-Up",
      "Refrigerant Refill",
      "Aircond Gas Refill",
      "R32/R410A Gas Service",
      "Gas Recharge",
      "Refrigerant Top-Up",
    ],
    ms: [
      "Tambah Gas",
      "Isi Semula Gas",
      "Tambah Gas Aircond",
      "Servis Gas R32/R410A",
      "Cas Semula Bahan Pendingin",
      "Isian Semula Refrigeran",
    ],
    zh: [
      "冷媒充注",
      "冷气加气",
      "制冷剂补充",
      "R32/R410A冷媒服务",
      "加雪种",
      "冷媒重充",
    ],
  },
  "repair": {
    en: [
      "Aircond Repair",
      "AC Troubleshooting & Repair",
      "Aircond Fix",
      "AC Diagnostic & Repair",
      "Unit Repair Service",
      "Aircond Breakdown Repair",
    ],
    ms: [
      "Baiki Aircond",
      "Pembaikan Aircond",
      "Diagnosis & Baiki AC",
      "Servis Pembaikan Unit",
      "Baiki Kerosakan Aircond",
      "Pembaikan & Penyelesaian Masalah",
    ],
    zh: [
      "冷气维修",
      "冷气故障排查与维修",
      "空调修理",
      "冷气诊断与修复",
      "机组维修服务",
      "冷气故障修复",
    ],
  },
  "installation": {
    en: [
      "New AC Installation",
      "Aircond Installation",
      "AC Unit Setup",
      "Wall-Mount Installation",
      "Split Unit Install",
      "New Aircond Fitting",
    ],
    ms: [
      "Pasang Aircond Baru",
      "Pemasangan Aircond",
      "Pasang Unit AC",
      "Pemasangan Dinding",
      "Pasang Unit Split",
      "Pemasangan Aircond Baru",
    ],
    zh: [
      "安装新冷气",
      "冷气安装",
      "空调安装",
      "挂壁式安装",
      "分体式安装",
      "新冷气装配",
    ],
  },
  "basic-servicing": {
    en: [
      "Basic Servicing",
      "Routine AC Maintenance",
      "Standard Aircond Service",
      "General AC Tune-Up",
      "Regular Aircond Check",
      "Basic Maintenance Service",
    ],
    ms: [
      "Servis Asas",
      "Penyelenggaraan Rutin AC",
      "Servis Aircond Standard",
      "Tune-Up AC Umum",
      "Pemeriksaan Aircond Berkala",
      "Servis Penyelenggaraan Asas",
    ],
    zh: [
      "基本保养",
      "冷气日常维护",
      "标准冷气服务",
      "空调常规调整",
      "定期冷气检查",
      "基础维护服务",
    ],
  },
  "ceiling-cassette": {
    en: [
      "Ceiling Cassette Service",
      "Cassette AC Maintenance",
      "Ceiling Unit Servicing",
      "Commercial Cassette Service",
      "Ceiling AC Cleaning",
      "Cassette Unit Repair",
    ],
    ms: [
      "Servis Ceiling Cassette",
      "Penyelenggaraan Cassette AC",
      "Servis Unit Siling",
      "Servis Cassette Komersial",
      "Pembersihan AC Siling",
      "Baiki Unit Cassette",
    ],
    zh: [
      "天花板卡式机服务",
      "卡式空调维护",
      "天花板机组保养",
      "商用卡式机服务",
      "天花板空调清洗",
      "卡式机维修",
    ],
  },
  "dismantling-relocation": {
    en: [
      "Dismantle & Relocation",
      "AC Removal & Reinstall",
      "Aircond Relocation",
      "Unit Move & Setup",
      "Dismantle & Shift Service",
      "Aircond Moving Service",
    ],
    ms: [
      "Buka & Pindah",
      "Tanggalkan & Pasang Semula AC",
      "Pindah Aircond",
      "Alih & Pasang Unit",
      "Servis Buka & Pindah",
      "Servis Pindah Aircond",
    ],
    zh: [
      "拆装移机",
      "冷气拆卸与重装",
      "空调搬迁",
      "机组迁移与安装",
      "拆卸与搬迁服务",
      "冷气搬运服务",
    ],
  },
  "emergency": {
    en: [
      "Emergency Repair",
      "Urgent AC Service",
      "Emergency Aircond Fix",
      "24/7 Emergency Service",
      "Immediate AC Help",
      "Priority Emergency Repair",
    ],
    ms: [
      "Baiki Kecemasan",
      "Servis AC Segera",
      "Baiki Aircond Cemas",
      "Servis Kecemasan 24/7",
      "Bantuan AC Segera",
      "Baiki Kecemasan Keutamaan",
    ],
    zh: [
      "紧急维修",
      "紧急冷气服务",
      "紧急空调修理",
      "24小时紧急服务",
      "即时冷气帮助",
      "优先紧急维修",
    ],
  },
  "maintenance-contract": {
    en: [
      "AMC Plan",
      "Maintenance Contract",
      "Annual AC Plan",
      "Service Contract",
      "Yearly Maintenance Plan",
      "AMC Package",
    ],
    ms: [
      "Pelan AMC",
      "Kontrak Penyelenggaraan",
      "Pelan AC Tahunan",
      "Kontrak Servis",
      "Pelan Penyelenggaraan Tahunan",
      "Pakej AMC",
    ],
    zh: [
      "年度保养合约",
      "维护合同",
      "年度空调计划",
      "服务合同",
      "年度保养计划",
      "AMC配套",
    ],
  },
};

/** Fallback for unknown slugs — returns the slug itself as label. */
function fallbackService(slug: string, locale: AnchorLocale): string {
  // Try to prettify the slug
  const prettified = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  if (locale === "ms") return `Servis ${prettified}`;
  if (locale === "zh") return `${prettified}服务`;
  return prettified;
}

// ═══════════════════════════════════════════════════════════════════════
// BRAND ANCHOR TEXT VARIANTS (20 brands × 3 languages × 5 variants)
// ═══════════════════════════════════════════════════════════════════════

const BRAND_ANCHORS: Record<string, Record<AnchorLocale, readonly string[]>> = {
  daikin: {
    en: ["Daikin AC Service", "Daikin Aircond Specialist", "Servicing Daikin Units", "Daikin Repair & Service", "Daikin Aircond Care"],
    ms: ["Servis AC Daikin", "Pakar Aircond Daikin", "Menservis Unit Daikin", "Baiki & Servis Daikin", "Penjagaan Aircond Daikin"],
    zh: ["大金空调服务", "大金冷气专家", "大金机组维修", "大金维修与保养", "大金冷气护理"],
  },
  panasonic: {
    en: ["Panasonic AC Service", "Panasonic Aircond Specialist", "Servicing Panasonic Units", "Panasonic Repair & Service", "Panasonic Aircond Care"],
    ms: ["Servis AC Panasonic", "Pakar Aircond Panasonic", "Menservis Unit Panasonic", "Baiki & Servis Panasonic", "Penjagaan Aircond Panasonic"],
    zh: ["松下空调服务", "松下冷气专家", "松下机组维修", "松下维修与保养", "松下冷气护理"],
  },
  mitsubishi: {
    en: ["Mitsubishi AC Service", "Mitsubishi Aircond Specialist", "Servicing Mitsubishi Units", "Mitsubishi Repair & Service", "Mitsubishi Aircond Care"],
    ms: ["Servis AC Mitsubishi", "Pakar Aircond Mitsubishi", "Menservis Unit Mitsubishi", "Baiki & Servis Mitsubishi", "Penjagaan Aircond Mitsubishi"],
    zh: ["三菱空调服务", "三菱冷气专家", "三菱机组维修", "三菱维修与保养", "三菱冷气护理"],
  },
  acson: {
    en: ["Acson AC Service", "Acson Aircond Specialist", "Servicing Acson Units", "Acson Repair & Service", "Acson Aircond Care"],
    ms: ["Servis AC Acson", "Pakar Aircond Acson", "Menservis Unit Acson", "Baiki & Servis Acson", "Penjagaan Aircond Acson"],
    zh: ["Acson空调服务", "Acson冷气专家", "Acson机组维修", "Acson维修与保养", "Acson冷气护理"],
  },
  york: {
    en: ["York AC Service", "York Aircond Specialist", "Servicing York Units", "York Repair & Service", "York Aircond Care"],
    ms: ["Servis AC York", "Pakar Aircond York", "Menservis Unit York", "Baiki & Servis York", "Penjagaan Aircond York"],
    zh: ["约克空调服务", "约克冷气专家", "约克机组维修", "约克维修与保养", "约克冷气护理"],
  },
  samsung: {
    en: ["Samsung AC Service", "Samsung Aircond Specialist", "Servicing Samsung Units", "Samsung Repair & Service", "Samsung Aircond Care"],
    ms: ["Servis AC Samsung", "Pakar Aircond Samsung", "Menservis Unit Samsung", "Baiki & Servis Samsung", "Penjagaan Aircond Samsung"],
    zh: ["三星空调服务", "三星冷气专家", "三星机组维修", "三星维修与保养", "三星冷气护理"],
  },
  lg: {
    en: ["LG AC Service", "LG Aircond Specialist", "Servicing LG Units", "LG Repair & Service", "LG Aircond Care"],
    ms: ["Servis AC LG", "Pakar Aircond LG", "Menservis Unit LG", "Baiki & Servis LG", "Penjagaan Aircond LG"],
    zh: ["LG空调服务", "LG冷气专家", "LG机组维修", "LG维修与保养", "LG冷气护理"],
  },
  sharp: {
    en: ["Sharp AC Service", "Sharp Aircond Specialist", "Servicing Sharp Units", "Sharp Repair & Service", "Sharp Aircond Care"],
    ms: ["Servis AC Sharp", "Pakar Aircond Sharp", "Menservis Unit Sharp", "Baiki & Servis Sharp", "Penjagaan Aircond Sharp"],
    zh: ["夏普空调服务", "夏普冷气专家", "夏普机组维修", "夏普维修与保养", "夏普冷气护理"],
  },
  fujitsu: {
    en: ["Fujitsu AC Service", "Fujitsu Aircond Specialist", "Servicing Fujitsu Units", "Fujitsu Repair & Service", "Fujitsu Aircond Care"],
    ms: ["Servis AC Fujitsu", "Pakar Aircond Fujitsu", "Menservis Unit Fujitsu", "Baiki & Servis Fujitsu", "Penjagaan Aircond Fujitsu"],
    zh: ["富士通空调服务", "富士通冷气专家", "富士通机组维修", "富士通维修与保养", "富士通冷气护理"],
  },
  haier: {
    en: ["Haier AC Service", "Haier Aircond Specialist", "Servicing Haier Units", "Haier Repair & Service", "Haier Aircond Care"],
    ms: ["Servis AC Haier", "Pakar Aircond Haier", "Menservis Unit Haier", "Baiki & Servis Haier", "Penjagaan Aircond Haier"],
    zh: ["海尔空调服务", "海尔冷气专家", "海尔机组维修", "海尔维修与保养", "海尔冷气护理"],
  },
  hisense: {
    en: ["Hisense AC Service", "Hisense Aircond Specialist", "Servicing Hisense Units", "Hisense Repair & Service", "Hisense Aircond Care"],
    ms: ["Servis AC Hisense", "Pakar Aircond Hisense", "Menservis Unit Hisense", "Baiki & Servis Hisense", "Penjagaan Aircond Hisense"],
    zh: ["海信空调服务", "海信冷气专家", "海信机组维修", "海信维修与保养", "海信冷气护理"],
  },
  midea: {
    en: ["Midea AC Service", "Midea Aircond Specialist", "Servicing Midea Units", "Midea Repair & Service", "Midea Aircond Care"],
    ms: ["Servis AC Midea", "Pakar Aircond Midea", "Menservis Unit Midea", "Baiki & Servis Midea", "Penjagaan Aircond Midea"],
    zh: ["美的空调服务", "美的冷气专家", "美的机组维修", "美的维修与保养", "美的冷气护理"],
  },
  gree: {
    en: ["Gree AC Service", "Gree Aircond Specialist", "Servicing Gree Units", "Gree Repair & Service", "Gree Aircond Care"],
    ms: ["Servis AC Gree", "Pakar Aircond Gree", "Menservis Unit Gree", "Baiki & Servis Gree", "Penjagaan Aircond Gree"],
    zh: ["格力空调服务", "格力冷气专家", "格力机组维修", "格力维修与保养", "格力冷气护理"],
  },
  toshiba: {
    en: ["Toshiba AC Service", "Toshiba Aircond Specialist", "Servicing Toshiba Units", "Toshiba Repair & Service", "Toshiba Aircond Care"],
    ms: ["Servis AC Toshiba", "Pakar Aircond Toshiba", "Menservis Unit Toshiba", "Baiki & Servis Toshiba", "Penjagaan Aircond Toshiba"],
    zh: ["东芝空调服务", "东芝冷气专家", "东芝机组维修", "东芝维修与保养", "东芝冷气护理"],
  },
  hitachi: {
    en: ["Hitachi AC Service", "Hitachi Aircond Specialist", "Servicing Hitachi Units", "Hitachi Repair & Service", "Hitachi Aircond Care"],
    ms: ["Servis AC Hitachi", "Pakar Aircond Hitachi", "Menservis Unit Hitachi", "Baiki & Servis Hitachi", "Penjagaan Aircond Hitachi"],
    zh: ["日立空调服务", "日立冷气专家", "日立机组维修", "日立维修与保养", "日立冷气护理"],
  },
  carrier: {
    en: ["Carrier AC Service", "Carrier Aircond Specialist", "Servicing Carrier Units", "Carrier Repair & Service", "Carrier Aircond Care"],
    ms: ["Servis AC Carrier", "Pakar Aircond Carrier", "Menservis Unit Carrier", "Baiki & Servis Carrier", "Penjagaan Aircond Carrier"],
    zh: ["开利空调服务", "开利冷气专家", "开利机组维修", "开利维修与保养", "开利冷气护理"],
  },
  trane: {
    en: ["Trane AC Service", "Trane Aircond Specialist", "Servicing Trane Units", "Trane Repair & Service", "Trane Aircond Care"],
    ms: ["Servis AC Trane", "Pakar Aircond Trane", "Menservis Unit Trane", "Baiki & Servis Trane", "Penjagaan Aircond Trane"],
    zh: ["特灵空调服务", "特灵冷气专家", "特灵机组维修", "特灵维修与保养", "特灵冷气护理"],
  },
  mcquay: {
    en: ["McQuay AC Service", "McQuay Aircond Specialist", "Servicing McQuay Units", "McQuay Repair & Service", "McQuay Aircond Care"],
    ms: ["Servis AC McQuay", "Pakar Aircond McQuay", "Menservis Unit McQuay", "Baiki & Servis McQuay", "Penjagaan Aircond McQuay"],
    zh: ["麦克维尔空调服务", "麦克维尔冷气专家", "麦克维尔机组维修", "麦克维尔维修与保养", "麦克维尔冷气护理"],
  },
  fujiaire: {
    en: ["Fujiaire AC Service", "Fujiaire Aircond Specialist", "Servicing Fujiaire Units", "Fujiaire Repair & Service", "Fujiaire Aircond Care"],
    ms: ["Servis AC Fujiaire", "Pakar Aircond Fujiaire", "Menservis Unit Fujiaire", "Baiki & Servis Fujiaire", "Penjagaan Aircond Fujiaire"],
    zh: ["Fujiaire空调服务", "Fujiaire冷气专家", "Fujiaire机组维修", "Fujiaire维修与保养", "Fujiaire冷气护理"],
  },
  chigo: {
    en: ["Chigo AC Service", "Chigo Aircond Specialist", "Servicing Chigo Units", "Chigo Repair & Service", "Chigo Aircond Care"],
    ms: ["Servis AC Chigo", "Pakar Aircond Chigo", "Menservis Unit Chigo", "Baiki & Servis Chigo", "Penjagaan Aircond Chigo"],
    zh: ["志高空调服务", "志高冷气专家", "志高机组维修", "志高维修与保养", "志高冷气护理"],
  },
};

function fallbackBrand(slug: string, locale: AnchorLocale): string {
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  if (locale === "ms") return `Servis ${name}`;
  if (locale === "zh") return `${name}服务`;
  return `${name} Service`;
}

// ═══════════════════════════════════════════════════════════════════════
// AREA ANCHOR TEXT VARIANTS
// ═══════════════════════════════════════════════════════════════════════

const AREA_ANCHOR_TEMPLATES: Record<AnchorLocale, readonly string[]> = {
  en: [
    "Aircond Service {area}",
    "AC Repair in {area}",
    "{area} Aircond Specialist",
    "Aircond Maintenance {area}",
    "AC Service Near {area}",
    "{area} Aircond Team",
  ],
  ms: [
    "Servis Aircond {area}",
    "Baiki AC di {area}",
    "Pakar Aircond {area}",
    "Penyelenggaraan Aircond {area}",
    "Servis AC Berdekatan {area}",
    "Pasukan Aircond {area}",
  ],
  zh: [
    "{area}冷气服务",
    "{area}空调维修",
    "{area}冷气专家",
    "{area}冷气保养",
    "{area}附近空调服务",
    "{area}冷气团队",
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PROBLEM ANCHOR TEXT VARIANTS
// ═══════════════════════════════════════════════════════════════════════

const PROBLEM_ANCHOR_TEMPLATES: Record<AnchorLocale, readonly string[]> = {
  en: [
    "{problem} Guide",
    "{problem} — What to Do",
    "Fix: {problem}",
    "{problem} Troubleshooting",
    "How to Solve {problem}",
    "{problem} Help",
  ],
  ms: [
    "Panduan {problem}",
    "{problem} — Apa Perlu Buat",
    "Baiki: {problem}",
    "Penyelesaian Masalah {problem}",
    "Cara Selesaikan {problem}",
    "Bantuan {problem}",
  ],
  zh: [
    "{problem}指南",
    "{problem}——该怎么办",
    "修复：{problem}",
    "{problem}故障排查",
    "如何解决{problem}",
    "{problem}帮助",
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════

/**
 * Get a diverse anchor text for a service link.
 *
 * @param slug    Service slug (e.g. "chemical-wash")
 * @param locale  "en" | "ms" | "zh"
 * @param variant 0-5 for different phrasing. Use 0 for primary, 1-5 for variety.
 *                Defaults to hash-based selection if omitted.
 */
export function serviceAnchor(slug: string, locale: AnchorLocale, variant?: number): string {
  const variants = SERVICE_ANCHORS[slug]?.[locale];
  if (!variants || variants.length === 0) return fallbackService(slug, locale);

  const idx = variant !== undefined ? variant : hashStr(slug) % variants.length;
  return variants[idx % variants.length];
}

/**
 * Hash-based service anchor — always the same per slug, but different across slugs.
 */
export function serviceAnchorHashed(slug: string, locale: AnchorLocale): string {
  return serviceAnchor(slug, locale, hashStr(slug));
}

/**
 * Get a diverse anchor text for a brand link.
 */
export function brandAnchor(slug: string, locale: AnchorLocale, variant?: number): string {
  const variants = BRAND_ANCHORS[slug]?.[locale];
  if (!variants || variants.length === 0) return fallbackBrand(slug, locale);

  const idx = variant !== undefined ? variant : hashStr(slug) % variants.length;
  return variants[idx % variants.length];
}

/**
 * Hash-based brand anchor.
 */
export function brandAnchorHashed(slug: string, locale: AnchorLocale): string {
  return brandAnchor(slug, locale, hashStr(slug));
}

/**
 * Get a diverse anchor text for an area link.
 * Uses the area's display name, not its slug.
 */
export function areaAnchor(areaName: string, locale: AnchorLocale, variant?: number): string {
  const templates = AREA_ANCHOR_TEMPLATES[locale];
  const idx = variant !== undefined ? variant : hashStr(areaName) % templates.length;
  return templates[idx % templates.length].replace("{area}", areaName);
}

/**
 * Get a diverse anchor text for a problem link.
 *
 * @param problemName The short problem name (e.g. "Aircond Not Cold")
 */
export function problemAnchor(problemName: string, locale: AnchorLocale, variant?: number): string {
  const templates = PROBLEM_ANCHOR_TEMPLATES[locale];
  const idx = variant !== undefined ? variant : hashStr(problemName) % templates.length;
  return templates[idx % templates.length].replace("{problem}", problemName);
}

/**
 * Service anchor specifically for blog inline links — shorter, more natural.
 * Uses the last 3 variants which are more conversational.
 */
export function serviceAnchorForBlog(slug: string, locale: AnchorLocale, contextIdx: number): string {
  const variants = SERVICE_ANCHORS[slug]?.[locale];
  if (!variants || variants.length === 0) return fallbackService(slug, locale);

  // Use the last 3 variants (more conversational) for blog context
  const blogPool = variants.length >= 4 ? variants.slice(2) : variants;
  return blogPool[contextIdx % blogPool.length];
}

/**
 * Brand anchor for blog inline links.
 */
export function brandAnchorForBlog(slug: string, locale: AnchorLocale, contextIdx: number): string {
  const variants = BRAND_ANCHORS[slug]?.[locale];
  if (!variants || variants.length === 0) return fallbackBrand(slug, locale);
  const blogPool = variants.length >= 4 ? variants.slice(1) : variants;
  return blogPool[contextIdx % blogPool.length];
}

// ─── Convenience object ──────────────────────────────────────────────
export const anchor = {
  service: serviceAnchor,
  serviceHash: serviceAnchorHashed,
  serviceBlog: serviceAnchorForBlog,
  brand: brandAnchor,
  brandHash: brandAnchorHashed,
  brandBlog: brandAnchorForBlog,
  area: areaAnchor,
  problem: problemAnchor,
  /** Internal getter: all variants for a service in a locale (for iteration) */
  _serviceVariants: (slug: string, locale: AnchorLocale): readonly string[] =>
    SERVICE_ANCHORS[slug]?.[locale] ?? [fallbackService(slug, locale)],
  _brandVariants: (slug: string, locale: AnchorLocale): readonly string[] =>
    BRAND_ANCHORS[slug]?.[locale] ?? [fallbackBrand(slug, locale)],
};

/**
 * Post-process blog HTML to diversify repetitive anchor texts.
 * Replaces exact-match link texts like "Chemical wash service" →
 * randomly varied phrasing selected from our diversity maps.
 *
 * Each link gets a deterministic variant based on its href + position,
 * so the page is stable across builds but diverse across URLs.
 */
export function diversifyBlogAnchors(html: string, locale: AnchorLocale): string {
  // Service links: /services/{slug}
  html = html.replace(
    /<a\s+href="\/services\/([^"]+)"[^>]*>([^<]+)<\/a>/g,
    (match, slug: string, oldText: string) => {
      const variants = SERVICE_ANCHORS[slug]?.[locale];
      if (!variants) return match;
      // Deterministic variant based on slug + position in the page
      const vIdx = (hashStr(slug) + hashStr(oldText)) % variants.length;
      const newText = variants[vIdx];
      return match.replace(`>${oldText}<`, `>${newText}<`);
    },
  );

  // Brand links: /brands/{slug}
  html = html.replace(
    /<a\s+href="\/brands\/([^"]+)"[^>]*>([^<]+)<\/a>/g,
    (match, slug: string, oldText: string) => {
      const variants = BRAND_ANCHORS[slug]?.[locale];
      if (!variants) return match;
      const vIdx = (hashStr(slug) + hashStr(oldText)) % variants.length;
      const newText = variants[vIdx];
      return match.replace(`>${oldText}<`, `>${newText}<`);
    },
  );

  // Area links: /areas/{slug}
  html = html.replace(
    /<a\s+href="\/areas\/([^"]+)"[^>]*>([^<]+)<\/a>/g,
    (match, areaSlug: string, oldText: string) => {
      // Convert slug to display name
      const areaName = areaSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      const templates = AREA_ANCHOR_TEMPLATES[locale];
      const vIdx = (hashStr(areaSlug) + hashStr(oldText)) % templates.length;
      const newText = templates[vIdx].replace("{area}", areaName);
      return match.replace(`>${oldText}<`, `>${newText}<`);
    },
  );

  // Problem links: /problems/{slug}
  html = html.replace(
    /<a\s+href="\/problems\/([^"]+)"[^>]*>([^<]+)<\/a>/g,
    (match, problemSlug: string, oldText: string) => {
      const problemName = problemSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      const templates = PROBLEM_ANCHOR_TEMPLATES[locale];
      const vIdx = (hashStr(problemSlug) + hashStr(oldText)) % templates.length;
      const newText = templates[vIdx].replace("{problem}", problemName);
      return match.replace(`>${oldText}<`, `>${newText}<`);
    },
  );

  return html;
}
