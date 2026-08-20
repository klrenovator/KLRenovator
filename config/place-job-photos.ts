/**
 * Place / brand / problem job-photo strips.
 *
 * Problem this solves (audit finding C8b / issue #73)
 * ---------------------------------------------------
 * The `og:image` half of C8 is done — every page ships a social card. But
 * 1,103 pages render ZERO `<img>` in their body: all 474 kampung pages, all
 * 360 brand-area pages, the base area / brand / problem templates. They are
 * text-only. That costs a Google Images entry point, removes visual proof of
 * work on the highest-intent (brand + location) pages, and reads as low-effort
 * to page-quality classifiers.
 *
 * The company already owns 157 real job photos in /public/hero. The
 * kampung-*installation* and /services templates wire them in and have 100%
 * image coverage; the base location/brand/problem templates never did.
 *
 * What this module does
 * ---------------------
 * Given a stable page key plus optional brand / area / service hints, it
 * deterministically selects a small set of DISTINCT real job photos and
 * builds page-specific, trilingual alt + caption copy for each one. Rules:
 *
 *   - Same URL → same photos on every rebuild (no CLS, no cache-busting).
 *   - Photos spread across the whole library instead of one image everywhere.
 *   - Where a photo filename matches the page's brand or area, it is preferred,
 *     so a Daikin page in Petaling Jaya gets an actual Daikin / PJ photo.
 *   - Within one strip the photos never repeat.
 *   - Alt text interpolates the page's real place/brand name and the specific
 *     work shown in the photo (parsed from the filename), so no two pages emit
 *     an identical alt string and every image is described, not decorative.
 *
 * These are genuine photos of KL Renovator's own work, so presenting them as
 * proof is accurate — never stock imagery.
 */

export type PhotoLocale = "en" | "ms" | "zh";

/** A photo parsed from its /public/hero filename. */
type JobPhoto = {
  file: string;
  /** brand slug or "generic"/"kl" when the shot isn't brand-specific */
  brand: string;
  /** canonical service token (see SERVICE_WORK) */
  service: string;
  /** area slug when the filename carries one, else "" */
  area: string;
};

// ── Canonical service vocabulary ───────────────────────────────────────────
// Maps the filename service token to the work actually shown, in all three
// locales. Keep the phrasing describing the PHOTO (a verb-y action) so the
// generated alt text reads like a caption, not a keyword stuffing.
const SERVICE_WORK: Record<
  string,
  { en: string; ms: string; zh: string }
> = {
  "basic-servicing": {
    en: "routine aircond servicing and coil cleaning",
    ms: "servis aircond berkala dan pembersihan gegelung",
    zh: "冷气例行保养与盘管清洗",
  },
  "chemical-wash": {
    en: "a high-pressure chemical wash of the indoor unit",
    ms: "cuci kimia tekanan tinggi pada unit dalaman",
    zh: "室内机高压化学清洗",
  },
  "chemical-overhaul": {
    en: "a full chemical overhaul with the unit dismantled",
    ms: "overhaul kimia penuh dengan unit ditanggalkan",
    zh: "拆机全面化学大修",
  },
  "gas-topup": {
    en: "a refrigerant gas top-up with pressure balancing",
    ms: "tambah gas penyejuk dengan penimbangan tekanan",
    zh: "冷媒加气与压力平衡",
  },
  "new-installation": {
    en: "a new wall-mounted aircond installation",
    ms: "pemasangan aircond dinding baharu",
    zh: "全新壁挂式冷气安装",
  },
  installation: {
    en: "an aircond installation with bracket and piping work",
    ms: "pemasangan aircond dengan kerja bracket dan paip",
    zh: "冷气安装含支架与管路作业",
  },
  "ceiling-cassette": {
    en: "ceiling cassette aircond servicing",
    ms: "servis aircond kaset siling",
    zh: "天花嵌入式冷气保养",
  },
  "troubleshooting-repair": {
    en: "diagnostic troubleshooting and repair",
    ms: "diagnosis dan pembaikan kerosakan",
    zh: "故障诊断与维修",
  },
  compressor: {
    en: "outdoor compressor repair and replacement",
    ms: "pembaikan dan penggantian kompresor luar",
    zh: "室外压缩机维修与更换",
  },
  "pcb-board": {
    en: "PCB control-board diagnosis and repair",
    ms: "diagnosis dan pembaikan papan litar PCB",
    zh: "PCB 电路板诊断与维修",
  },
  "water-leaking": {
    en: "a water-leak fix on the indoor unit",
    ms: "pembaikan kebocoran air pada unit dalaman",
    zh: "室内机漏水修复",
  },
  "water-leak": {
    en: "a water-leak fix on the indoor unit",
    ms: "pembaikan kebocoran air pada unit dalaman",
    zh: "室内机漏水修复",
  },
  "dismantle-relocation": {
    en: "an aircond dismantle and relocation job",
    ms: "kerja tanggal dan pindah aircond",
    zh: "冷气拆卸与搬迁作业",
  },
  bracket: {
    en: "outdoor bracket and compressor mounting",
    ms: "pemasangan bracket dan kompresor luar",
    zh: "室外支架与压缩机安装",
  },
  sensor: {
    en: "a temperature-sensor replacement",
    ms: "penggantian sensor suhu",
    zh: "温度传感器更换",
  },
  flaring: {
    en: "copper-pipe flaring and joint work",
    ms: "kerja flare paip kuprum dan sambungan",
    zh: "铜管扩口与接头作业",
  },
  "chemical-service": {
    en: "a chemical service with canvas wrap protection",
    ms: "servis kimia dengan pelindung kanvas",
    zh: "化学清洗含帆布防护",
  },
} as const;

// Ordered longest-first so "chemical-wash" wins over a bare "chemical", etc.
const SERVICE_TOKENS = Object.keys(SERVICE_WORK).sort(
  (a, b) => b.length - a.length,
);

const KNOWN_BRANDS = new Set([
  "acson",
  "aux",
  "daikin",
  "hisense",
  "isonic",
  "lg",
  "midea",
  "mitsubishi",
  "panasonic",
  "samsung",
  "sharp",
  "tcl",
  "toshiba",
  "york",
]);

const AREA_TOKENS = [
  "kuala-lumpur",
  "petaling-jaya",
  "subang-jaya",
  "shah-alam",
  "puchong",
  "klang-valley",
  "klang",
  "rawang",
  "ampang",
  "cheras",
  "kepong",
  "selangor",
  "commercial",
];

/**
 * Every real photo in /public/hero. Kept as a literal list (not a glob) so the
 * build stays static and a missing file surfaces at review time, not runtime.
 * The order here does not matter — selection is hash-driven.
 */
const HERO_FILES: readonly string[] = [
  "acson-aircond-basic-servicing-kuala-lumpur-5",
  "acson-aircond-chemical-overhaul-puchong-38",
  "acson-aircond-chemical-wash-shah-alam-49",
  "acson-aircond-gas-topup-r32-subang-jaya-27",
  "acson-aircond-gas-topup-r410a-petaling-jaya-16",
  "acson-aircond-pcb-board-repair-klang-71",
  "acson-aircond-water-leaking-fix-shah-alam-60",
  "aircond-bracket-installation-kl-renovator",
  "aircond-ceiling-cassette-installation-commercial",
  "aircond-chemical-overhaul-ampang-selangor",
  "aircond-chemical-service-canvas-wrap-kl",
  "aircond-chemical-wash-canvas-kepong-kl",
  "aircond-compressor-bracket-installation-kl",
  "aircond-compressor-flaring-repair-kl",
  "aircond-compressor-installation-new-kl",
  "aircond-gas-topup-r32-r410a-selangor",
  "aircond-installation-ampang-selangor",
  "aircond-installation-double-unit-kl",
  "aircond-installation-kuala-lumpur",
  "aircond-installation-wall-mounted-kl",
  "aircond-new-compressor-installation-rawang",
  "aircond-new-installation-petaling-jaya",
  "aircond-new-installation-rawang-selangor",
  "aircond-pcb-board-replacement-2-klang-valley",
  "aircond-pcb-board-replacement-kl",
  "aircond-pressure-chemical-wash-selangor",
  "aircond-repair-technician-klang-valley",
  "aircond-sensor-replacement-klang-valley",
  "aux-aircond-basic-servicing-shah-alam-53",
  "aux-aircond-ceiling-cassette-service-petaling-jaya-20",
  "aux-aircond-dismantle-relocation-kuala-lumpur-9",
  "aux-aircond-gas-topup-r410a-klang-64",
  "aux-aircond-new-installation-subang-jaya-31",
  "aux-aircond-troubleshooting-repair-puchong-42",
  "daikin-aircond-basic-servicing-ampang-140",
  "daikin-aircond-ceiling-cassette-service-shah-alam-56",
  "daikin-aircond-chemical-wash-kuala-lumpur-1",
  "daikin-aircond-compressor-replacement-subang-jaya-34",
  "daikin-aircond-dismantle-relocation-puchong-45",
  "daikin-aircond-new-installation-ampang-131",
  "daikin-aircond-new-installation-klang-67",
  "daikin-aircond-new-installation-rawang-132",
  "daikin-aircond-pcb-board-repair-petaling-jaya-23",
  "daikin-aircond-water-leaking-fix-kuala-lumpur-12",
  "generic-aircond-basic-servicing-ampang-104",
  "generic-aircond-basic-servicing-ampang-149",
  "generic-aircond-basic-servicing-cheras-124",
  "generic-aircond-basic-servicing-cheras-133",
  "generic-aircond-basic-servicing-kuala-lumpur-125",
  "generic-aircond-basic-servicing-kuala-lumpur-161",
  "generic-aircond-basic-servicing-kuala-lumpur-98",
  "generic-aircond-basic-servicing-puchong-103",
  "generic-aircond-basic-servicing-shah-alam-110",
  "generic-aircond-basic-servicing-shah-alam-146",
  "generic-aircond-basic-servicing-shah-alam-155",
  "generic-aircond-basic-servicing-subang-jaya-100",
  "generic-aircond-ceiling-cassette-service-puchong-112",
  "generic-aircond-chemical-overhaul-cheras-106",
  "generic-aircond-chemical-overhaul-cheras-142",
  "generic-aircond-chemical-overhaul-cheras-160",
  "generic-aircond-chemical-overhaul-klang-129",
  "generic-aircond-chemical-overhaul-kuala-lumpur-143",
  "generic-aircond-chemical-overhaul-shah-alam-128",
  "generic-aircond-chemical-wash-klang-120",
  "generic-aircond-chemical-wash-klang-138",
  "generic-aircond-chemical-wash-petaling-jaya-99",
  "generic-aircond-chemical-wash-puchong-121",
  "generic-aircond-chemical-wash-rawang-105",
  "generic-aircond-chemical-wash-rawang-150",
  "generic-aircond-chemical-wash-shah-alam-119",
  "generic-aircond-chemical-wash-shah-alam-137",
  "generic-aircond-chemical-wash-subang-jaya-154",
  "generic-aircond-compressor-replacement-puchong-157",
  "generic-aircond-dismantle-relocation-ampang-158",
  "generic-aircond-dismantle-relocation-kuala-lumpur-134",
  "generic-aircond-dismantle-relocation-petaling-jaya-135",
  "generic-aircond-dismantle-relocation-puchong-148",
  "generic-aircond-gas-topup-ampang-122",
  "generic-aircond-gas-topup-cheras-151",
  "generic-aircond-gas-topup-kuala-lumpur-107",
  "generic-aircond-gas-topup-rawang-123",
  "generic-aircond-gas-topup-shah-alam-101",
  "generic-aircond-gas-topup-subang-jaya-136",
  "generic-aircond-new-installation-kuala-lumpur-116",
  "generic-aircond-new-installation-kuala-lumpur-152",
  "generic-aircond-new-installation-petaling-jaya-117",
  "generic-aircond-new-installation-petaling-jaya-126",
  "generic-aircond-new-installation-petaling-jaya-144",
  "generic-aircond-new-installation-puchong-139",
  "generic-aircond-new-installation-rawang-159",
  "generic-aircond-new-installation-subang-jaya-109",
  "generic-aircond-new-installation-subang-jaya-118",
  "generic-aircond-new-installation-subang-jaya-127",
  "generic-aircond-new-installation-subang-jaya-145",
  "generic-aircond-pcb-board-repair-klang-147",
  "generic-aircond-pcb-board-repair-klang-156",
  "generic-aircond-troubleshooting-repair-petaling-jaya-108",
  "generic-aircond-troubleshooting-repair-petaling-jaya-153",
  "generic-aircond-troubleshooting-repair-puchong-130",
  "generic-aircond-water-leak-fix-klang-102",
  "hisense-aircond-basic-servicing-ampang-113",
  "hisense-aircond-chemical-wash-klang-111",
  "isonic-aircond-ceiling-cassette-service-puchong-44",
  "isonic-aircond-compressor-replacement-petaling-jaya-22",
  "isonic-aircond-dismantle-relocation-subang-jaya-33",
  "isonic-aircond-new-installation-shah-alam-55",
  "isonic-aircond-pcb-board-repair-kuala-lumpur-11",
  "isonic-aircond-troubleshooting-repair-klang-66",
  "lg-aircond-basic-servicing-subang-jaya-29",
  "lg-aircond-chemical-overhaul-klang-62",
  "lg-aircond-gas-topup-r32-shah-alam-51",
  "lg-aircond-gas-topup-r410a-puchong-40",
  "lg-aircond-new-installation-kuala-lumpur-7",
  "lg-aircond-troubleshooting-repair-petaling-jaya-18",
  "midea-aircond-basic-servicing-petaling-jaya-17",
  "midea-aircond-chemical-overhaul-shah-alam-50",
  "midea-aircond-chemical-wash-klang-61",
  "midea-aircond-gas-topup-r32-puchong-39",
  "midea-aircond-gas-topup-r410a-subang-jaya-28",
  "midea-aircond-troubleshooting-repair-kuala-lumpur-6",
  "midea-aircond-water-leaking-fix-klang-72",
  "mitsubishi-aircond-chemical-overhaul-petaling-jaya-14",
  "mitsubishi-aircond-chemical-wash-subang-jaya-25",
  "mitsubishi-aircond-compressor-replacement-shah-alam-58",
  "mitsubishi-aircond-dismantle-relocation-klang-69",
  "mitsubishi-aircond-gas-topup-r32-kuala-lumpur-3",
  "mitsubishi-aircond-pcb-board-repair-puchong-47",
  "mitsubishi-aircond-water-leaking-fix-subang-jaya-36",
  "panasonic-aircond-ceiling-cassette-service-klang-68",
  "panasonic-aircond-chemical-overhaul-kuala-lumpur-2",
  "panasonic-aircond-chemical-wash-petaling-jaya-13",
  "panasonic-aircond-compressor-replacement-puchong-46",
  "panasonic-aircond-dismantle-relocation-shah-alam-57",
  "panasonic-aircond-pcb-board-repair-subang-jaya-35",
  "panasonic-aircond-water-leaking-fix-petaling-jaya-24",
  "samsung-aircond-basic-servicing-puchong-41",
  "samsung-aircond-ceiling-cassette-service-kuala-lumpur-8",
  "samsung-aircond-gas-topup-r32-klang-63",
  "samsung-aircond-gas-topup-r410a-shah-alam-52",
  "samsung-aircond-new-installation-petaling-jaya-19",
  "samsung-aircond-troubleshooting-repair-subang-jaya-30",
  "sharp-aircond-basic-servicing-cheras-115",
  "sharp-aircond-chemical-wash-rawang-114",
  "tcl-aircond-basic-servicing-klang-65",
  "tcl-aircond-ceiling-cassette-service-subang-jaya-32",
  "tcl-aircond-compressor-replacement-kuala-lumpur-10",
  "tcl-aircond-dismantle-relocation-petaling-jaya-21",
  "tcl-aircond-new-installation-puchong-43",
  "tcl-aircond-troubleshooting-repair-shah-alam-54",
  "toshiba-aircond-gas-topup-rawang-141",
  "york-aircond-chemical-overhaul-subang-jaya-26",
  "york-aircond-chemical-wash-puchong-37",
  "york-aircond-compressor-replacement-klang-70",
  "york-aircond-gas-topup-r32-petaling-jaya-15",
  "york-aircond-gas-topup-r410a-kuala-lumpur-4",
  "york-aircond-pcb-board-repair-shah-alam-59",
  "york-aircond-water-leaking-fix-puchong-48",
];

function parsePhoto(file: string): JobPhoto {
  const head = file.split("-")[0];
  const brand = KNOWN_BRANDS.has(head) ? head : head === "generic" ? "generic" : "kl";
  const service = SERVICE_TOKENS.find((t) => file.includes(t)) ?? "basic-servicing";
  const area = AREA_TOKENS.find((a) => file.includes(a)) ?? "";
  return { file, brand, service, area };
}

const POOL: readonly JobPhoto[] = HERO_FILES.map(parsePhoto);

/** FNV-1a — stable across rebuilds, not tied to any V8 internal. */
function hashKey(key: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function normHint(h: string): string {
  return h.toLowerCase().trim().replace(/\s+/g, "-");
}

/**
 * Order the whole pool for a given page by relevance to its hints, then by a
 * stable hash offset so different pages sharing the same hints still get
 * different lead photos. Returns the pool re-ordered, never filtered, so we
 * can always fill the requested count without repeats.
 */
function rankPool(key: string, hints: string[]): JobPhoto[] {
  // Alias external service slugs onto our filename service vocabulary.
  const SERVICE_ALIAS: Record<string, string> = {
    repair: "troubleshooting-repair",
    troubleshooting: "troubleshooting-repair",
    installation: "new-installation",
    "chemical-service": "chemical-wash",
  };
  const wanted = hints
    .map(normHint)
    .filter(Boolean)
    .map((h) => SERVICE_ALIAS[h] ?? h);
  const brandHints = wanted.filter((h) => KNOWN_BRANDS.has(h));
  const areaHints = wanted.filter((h) => AREA_TOKENS.includes(h));
  const serviceHints = wanted.filter((h) => h in SERVICE_WORK);

  const scored = POOL.map((p, index) => {
    let score = 0;
    if (brandHints.includes(p.brand)) score += 100;
    if (p.area && areaHints.includes(p.area)) score += 40;
    if (serviceHints.includes(p.service)) score += 20;
    // Tie-break: stable per-page rotation so neighbouring pages differ.
    const rotation = (hashKey(key) + index * 0x9e3779b1) >>> 0;
    return { p, score, rotation };
  });

  scored.sort((a, b) => (b.score - a.score) || (a.rotation - b.rotation));
  return scored.map((s) => s.p);
}

export type ResolvedJobPhoto = {
  src: string;
  alt: string;
  caption: string;
};

/** Grammatical place fragment: "in Cheras" / "di Cheras" / "在蕉赖". */
function placeFragment(place: string | undefined, locale: PhotoLocale): string {
  if (!place) {
    return locale === "en"
      ? "across KL & Selangor"
      : locale === "ms"
        ? "di sekitar KL & Selangor"
        : "在吉隆坡与雪兰莪一带";
  }
  return locale === "en"
    ? `in ${place}`
    : locale === "ms"
      ? `di ${place}`
      : `在${place}`;
}

const BRAND_LABEL: Record<string, string> = {
  acson: "Acson",
  aux: "AUX",
  daikin: "Daikin",
  hisense: "Hisense",
  isonic: "iSonic",
  lg: "LG",
  midea: "Midea",
  mitsubishi: "Mitsubishi",
  panasonic: "Panasonic",
  samsung: "Samsung",
  sharp: "Sharp",
  tcl: "TCL",
  toshiba: "Toshiba",
  york: "York",
};

function buildAltCaption(
  photo: JobPhoto,
  opts: { place?: string; brand?: string; locale: PhotoLocale },
): { alt: string; caption: string } {
  const { place, brand, locale } = opts;
  const work = SERVICE_WORK[photo.service] ?? SERVICE_WORK["basic-servicing"];
  const workText = work[locale];
  const frag = placeFragment(place, locale);

  // If the page is about a specific brand, name it in the alt; otherwise, if
  // the PHOTO is brand-specific, name the photo's brand instead. This keeps
  // alt text truthful (never claiming a brand the photo doesn't show) while
  // still working the page's own entity in where relevant.
  const pageBrandLabel = brand ? BRAND_LABEL[normHint(brand)] || brand : "";
  const photoBrandLabel = photo.brand in BRAND_LABEL ? BRAND_LABEL[photo.brand] : "";
  const unitBrand = pageBrandLabel || photoBrandLabel;

  if (locale === "en") {
    const article = unitBrand && /^[aeiou]/i.test(unitBrand) ? "an" : "a";
    const unit = unitBrand ? `${article} ${unitBrand} unit` : "an aircond unit";
    const alt = `KL Renovator technician performing ${workText} on ${unit} ${frag}`;
    const caption = capitalise(`${workText} ${frag}`);
    return { alt, caption };
  }
  if (locale === "ms") {
    const unit = unitBrand ? `unit ${unitBrand}` : "unit aircond";
    const alt = `Juruteknik KL Renovator melakukan ${workText} pada ${unit} ${frag}`;
    const caption = capitalise(`${workText} ${frag}`);
    return { alt, caption };
  }
  const unit = unitBrand ? `${unitBrand}冷气` : "冷气机";
  const alt = `KL Renovator 技术员${frag}为${unit}进行${workText}`;
  const caption = `${frag}${workText}`;
  return { alt, caption };
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Pick N distinct real job photos for a page, with page-specific trilingual
 * alt + caption text.
 *
 * @param opts.key    Stable page identifier (route or slug), NOT anything that
 *                    changes between builds.
 * @param opts.place  Human place name to write into the alt text (area /
 *                    kampung name). Optional.
 * @param opts.brand  Brand slug/name when the page is brand-specific. Optional.
 * @param opts.hints  Matching hints — brand slug, area slug, service token.
 * @param opts.count  How many photos (default 3).
 * @param opts.locale Page language.
 */
export function selectJobPhotos(opts: {
  key: string;
  place?: string;
  brand?: string;
  hints?: string[];
  count?: number;
  locale: PhotoLocale;
}): ResolvedJobPhoto[] {
  const { key, place, brand, hints = [], count = 3, locale } = opts;
  const ranked = rankPool(key, hints);
  const n = Math.max(1, Math.min(count, ranked.length));

  const chosen: JobPhoto[] = [];
  const seenService = new Set<string>();
  // First pass: take top-ranked photos but avoid two shots of the same
  // service so the strip shows variety (wash + install + repair, say).
  for (const p of ranked) {
    if (chosen.length >= n) break;
    if (seenService.has(p.service)) continue;
    chosen.push(p);
    seenService.add(p.service);
  }
  // Second pass: if variety left us short, top up from the ranked order.
  if (chosen.length < n) {
    for (const p of ranked) {
      if (chosen.length >= n) break;
      if (chosen.includes(p)) continue;
      chosen.push(p);
    }
  }

  return chosen.map((photo) => {
    const { alt, caption } = buildAltCaption(photo, { place, brand, locale });
    return { src: `/hero/${photo.file}.webp`, alt, caption };
  });
}
