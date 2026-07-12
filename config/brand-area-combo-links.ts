export type BrandAreaComboLocale = "en" | "ms" | "zh";

type BrandRecord = {
  slug: string;
  name: string;
  gasTypes?: readonly string[];
};

type AreaRecord = {
  slug: string;
  name: string;
  state: string;
  landmarks?: readonly string[];
};

type BrandFocus = "inverter" | "commercial" | "family" | "value" | "legacy";

export type BrandAreaComboLink = {
  title: string;
  href: string;
  eyebrow: string;
  description: string;
  tags: string[];
};

export type BrandAreaComboModule = {
  taskId: "20D.34";
  eyebrow: string;
  heading: string;
  intro: string;
  allAreasHref: string;
  allAreasLabel: string;
  combos: BrandAreaComboLink[];
};

const PRIORITY_AREAS_BY_BRAND: Record<string, string[]> = {
  daikin: ["petaling-jaya", "mont-kiara", "subang-jaya", "kuala-lumpur", "shah-alam", "bangsar"],
  panasonic: ["puchong", "cheras", "petaling-jaya", "subang-jaya", "klang", "kuala-lumpur"],
  mitsubishi: ["shah-alam", "mont-kiara", "damansara", "kuala-lumpur", "puchong", "subang-jaya"],
  york: ["klang", "shah-alam", "kepong", "puchong", "petaling-jaya", "sentul"],
  acson: ["cheras", "shah-alam", "klang", "puchong", "kuala-lumpur", "setapak"],
  carrier: ["glenmarie", "shah-alam", "kuala-lumpur", "petaling-jaya", "klang", "damansara"],
  midea: ["puchong", "cheras", "subang-jaya", "petaling-jaya", "klang", "kajang"],
  haier: ["cheras", "ampang", "puchong", "kajang", "kepong", "setapak"],
  toshiba: ["damansara", "petaling-jaya", "kuala-lumpur", "mont-kiara", "bangsar", "subang-jaya"],
  hitachi: ["shah-alam", "glenmarie", "kuala-lumpur", "damansara", "petaling-jaya", "klang"],
  samsung: ["mont-kiara", "bangsar", "petaling-jaya", "subang-jaya", "kuala-lumpur", "cyberjaya"],
  lg: ["mont-kiara", "petaling-jaya", "subang-jaya", "puchong", "kuala-lumpur", "bangsar"],
  sharp: ["cheras", "ampang", "kepong", "setapak", "puchong", "kajang"],
  fujitsu: ["glenmarie", "shah-alam", "kuala-lumpur", "damansara", "cyberjaya", "petaling-jaya"],
  gree: ["puchong", "klang", "kajang", "cheras", "ampang", "seri-kembangan"],
  hisense: ["kajang", "balakong", "puchong", "klang", "cheras", "ampang"],
  aux: ["shah-alam", "klang", "puchong", "subang-jaya", "rawang", "kepong"],
  tcl: ["puchong", "cheras", "subang-jaya", "petaling-jaya", "klang", "kajang"],
  national: ["sentul", "kepong", "cheras", "ampang", "kuala-lumpur", "petaling-jaya"],
  isonic: ["klang", "puchong", "shah-alam", "cheras", "kajang", "rawang"],
  _default: ["kuala-lumpur", "petaling-jaya", "cheras", "puchong", "shah-alam", "klang"],
};

const BRAND_FOCUS: Record<string, BrandFocus> = {
  daikin: "inverter", panasonic: "inverter", mitsubishi: "inverter",
  york: "commercial", acson: "family", carrier: "commercial",
  midea: "value", haier: "value", toshiba: "inverter", hitachi: "commercial",
  samsung: "inverter", lg: "inverter", sharp: "family", fujitsu: "commercial",
  gree: "value", hisense: "value", aux: "value", tcl: "value",
  national: "legacy", isonic: "value",
};

const FOCUS_COPY: Record<BrandAreaComboLocale, Record<BrandFocus, { label: string; summary: string; tags: string[] }>> = {
  en: {
    inverter: { label: "Inverter diagnostics route", summary: "Best for inverter PCB checks, R32/R410A pressure balancing, indoor coil cleaning and cooling-performance testing.", tags: ["Inverter PCB", "R32/R410A", "Cooling test"] },
    commercial: { label: "Commercial / cassette route", summary: "Best for shop offices, ceiling cassette units, long run-hours, drain-line clearing and scheduled maintenance planning.", tags: ["Ceiling cassette", "Drain check", "AMC ready"] },
    family: { label: "Family-home service route", summary: "Best for terrace houses, apartments and family rooms needing chemical wash, leak checks and regular preventive servicing.", tags: ["Chemical wash", "Water leak", "RM99 service"] },
    value: { label: "Value-brand service route", summary: "Best for fast RM99 basic servicing, chemical wash, gas diagnosis and practical repair-or-replace advice.", tags: ["RM99 service", "Gas diagnosis", "Fast booking"] },
    legacy: { label: "Older-unit repair route", summary: "Best for older systems needing R22/R410A checks, capacitor diagnosis, drain clearing and honest repair-or-replace advice.", tags: ["Older units", "R22/R410A", "Repair check"] },
  },
  ms: {
    inverter: { label: "Laluan diagnosis inverter", summary: "Sesuai untuk semakan PCB inverter, balancing tekanan R32/R410A, cuci coil dalaman dan ujian prestasi cooling.", tags: ["PCB inverter", "R32/R410A", "Ujian cooling"] },
    commercial: { label: "Laluan komersial / cassette", summary: "Sesuai untuk shop office, ceiling cassette, penggunaan lama, pembersihan drain dan pelan maintenance berjadual.", tags: ["Ceiling cassette", "Semak drain", "AMC ready"] },
    family: { label: "Laluan rumah keluarga", summary: "Sesuai untuk rumah teres, apartmen dan bilik keluarga yang perlukan cuci kimia, semak bocor dan servis pencegahan.", tags: ["Cuci kimia", "Air menitis", "Servis RM99"] },
    value: { label: "Laluan jenama value", summary: "Sesuai untuk servis asas RM99, cuci kimia, diagnosis gas dan nasihat praktikal sama ada baiki atau ganti.", tags: ["Servis RM99", "Diagnosis gas", "Tempahan cepat"] },
    legacy: { label: "Laluan baiki unit lama", summary: "Sesuai untuk sistem lama yang perlukan semakan R22/R410A, diagnosis kapasitor, pembersihan drain dan nasihat baiki/ganti.", tags: ["Unit lama", "R22/R410A", "Semak repair"] },
  },
  zh: {
    inverter: { label: "变频诊断路线", summary: "适合变频PCB检查、R32/R410A压力平衡、室内盘管清洗和制冷表现测试。", tags: ["变频PCB", "R32/R410A", "制冷测试"] },
    commercial: { label: "商业 / 卡式机路线", summary: "适合店屋办公室、天花板卡式机、长时间运转、排水管疏通和定期保养安排。", tags: ["天花板卡式机", "排水检查", "保养合约"] },
    family: { label: "家庭住宅路线", summary: "适合排屋、公寓和家庭房间，需要化学清洗、漏水检查和预防性保养。", tags: ["化学清洗", "漏水", "RM99保养"] },
    value: { label: "经济品牌服务路线", summary: "适合快速RM99基础保养、化学清洗、冷媒诊断，以及实用维修或更换建议。", tags: ["RM99保养", "冷媒诊断", "快速预约"] },
    legacy: { label: "旧机维修路线", summary: "适合旧系统的R22/R410A检查、电容诊断、排水疏通，以及诚实维修或更换建议。", tags: ["旧机", "R22/R410A", "维修检查"] },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// 10.9 & 20.107 — ANCHOR TEXT DIVERSITY for Brand+Area combo cards.
// Instead of repetitive "[Brand] AC Service [Area]" on all 120 cards,
// each card gets a varied title via deterministic hash selection.
// ═══════════════════════════════════════════════════════════════════════
const COMBO_TITLE_VARIANTS: Record<BrandAreaComboLocale, readonly ((b: string, a: string) => string)[]> = {
  en: [
    (b, a) => `${b} AC Service ${a}`,
    (b, a) => `${b} Aircond Repair in ${a}`,
    (b, a) => `${b} Aircond Specialist ${a}`,
    (b, a) => `Servicing ${b} in ${a}`,
  ],
  ms: [
    (b, a) => `Servis Aircond ${b} ${a}`,
    (b, a) => `Baiki Aircond ${b} di ${a}`,
    (b, a) => `Pakar Aircond ${b} ${a}`,
    (b, a) => `Servis & Baiki ${b} di ${a}`,
  ],
  zh: [
    (b, a) => `${a}${b}冷气服务`,
    (b, a) => `${a}${b}空调维修`,
    (b, a) => `${a}${b}冷气保养`,
    (b, a) => `${a}的${b}冷气维修`,
  ],
};

function comboTitleHash(brandSlug: string, areaIdx: number): number {
  let h = 0;
  const s = brandSlug + String(areaIdx);
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function diverseComboTitle(locale: BrandAreaComboLocale, brandName: string, areaName: string, areaIdx: number): string {
  const variants = COMBO_TITLE_VARIANTS[locale];
  const idx = comboTitleHash(brandName, areaIdx) % variants.length;
  return variants[idx](brandName, areaName);
}

// ─── Static text (headings, intros, etc.) ──────────────────────────────
const TEXT = {
  en: {
    eyebrow: "Brand service areas",
    heading: (brand: string) => `${brand} AC Service by Priority Area`,
    intro: (brand: string) => `Choose the closest ${brand} service area below. Each card opens a local area page where you can check coverage, common service needs and booking details.`,
    allAreasLabel: "All KL & Selangor areas",
    description: (brand: string, area: AreaRecord, focus: string, summary: string) => `${focus} for ${brand} units in ${area.name}, ${area.state}. ${summary}`,
  },
  ms: {
    eyebrow: "Kawasan servis jenama",
    heading: (brand: string) => `Servis Aircond ${brand} Mengikut Kawasan Utama`,
    intro: (brand: string) => `Pilih kawasan servis ${brand} yang paling dekat di bawah. Setiap kad membuka halaman kawasan tempatan untuk menyemak liputan, keperluan servis biasa dan butiran tempahan.`,
    allAreasLabel: "Semua kawasan KL & Selangor",
    description: (brand: string, area: AreaRecord, focus: string, summary: string) => `${focus} untuk unit ${brand} di ${area.name}, ${area.state}. ${summary}`,
  },
  zh: {
    eyebrow: "品牌服务区域",
    heading: (brand: string) => `${brand}冷气重点区域服务`,
    intro: (brand: string) => `从下方选择最接近的${brand}服务区域。每张卡都会打开本地区域页面，方便您查看覆盖范围、常见服务需求和预约详情。`,
    allAreasLabel: "所有KL与雪兰莪区域",
    description: (brand: string, area: AreaRecord, focus: string, summary: string) => `${focus}，适用于${area.name}, ${area.state}的${brand}冷气。${summary}`,
  },
} as const;

function areaHref(locale: BrandAreaComboLocale, slug: string) {
  if (locale === "en") return `/areas/${slug}`;
  return `/${locale}/areas/${slug}`;
}

function allAreasHref(locale: BrandAreaComboLocale) {
  if (locale === "en") return "/areas";
  return `/${locale}/areas`;
}

export function buildBrandAreaComboModule(
  brand: BrandRecord,
  areaPages: readonly AreaRecord[],
  locale: BrandAreaComboLocale,
): BrandAreaComboModule {
  const focus = BRAND_FOCUS[brand.slug] ?? "family";
  const copy = FOCUS_COPY[locale][focus];
  const areaMap = new Map(areaPages.map((area) => [area.slug, area]));
  const prioritySlugs = PRIORITY_AREAS_BY_BRAND[brand.slug] ?? PRIORITY_AREAS_BY_BRAND._default;
  const selectedAreas = prioritySlugs
    .map((slug) => areaMap.get(slug))
    .filter((area): area is AreaRecord => Boolean(area))
    .slice(0, 6);
  const fallbackAreas = selectedAreas.length >= 6 ? [] : areaPages
    .filter((area) => !selectedAreas.some((selected) => selected.slug === area.slug))
    .slice(0, 6 - selectedAreas.length);
  const t = TEXT[locale];

  const combos = [...selectedAreas, ...fallbackAreas].map((area, idx) => {
    const landmarks = area.landmarks?.slice(0, 2).join(" / ");
    const landmarkTag = landmarks || area.state;

    return {
      // 10.9: Diverse title per card instead of repetitive "[Brand] AC Service [Area]"
      title: diverseComboTitle(locale, brand.name, area.name, idx),
      href: areaHref(locale, area.slug),
      eyebrow: copy.label,
      description: t.description(brand.name, area, copy.label, copy.summary),
      tags: [...copy.tags, landmarkTag].slice(0, 4),
    } satisfies BrandAreaComboLink;
  });

  return {
    taskId: "20D.34",
    eyebrow: t.eyebrow,
    heading: t.heading(brand.name),
    intro: t.intro(brand.name),
    allAreasHref: allAreasHref(locale),
    allAreasLabel: t.allAreasLabel,
    combos,
  };
}
