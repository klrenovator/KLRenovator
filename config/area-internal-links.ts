/**
 * Area internal-link helpers (area → kampung / nearby area).
 * Improves landmark chips + neighbourhood mesh without hardcoding per page.
 */

import { siteConfig } from "@/config/site";

export type AreaLinkLocale = "en" | "ms" | "zh";

export type ResolvedAreaLink = {
  href: string;
  label: string;
  kind: "kampung" | "area";
};

type KampungLite = {
  slug: string;
  parentSlug: string;
  name: string;
};

type AreaLite = {
  slug: string;
  name: string;
};

function localePrefix(locale: AreaLinkLocale): string {
  return locale === "en" ? "" : `/${locale}`;
}

function norm(input: string): string {
  return input
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[–—-]/g, " ")
    .replace(/[^a-z0-9\u4e00-\u9fff\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Explicit landmark → kampung/area overrides for common alias gaps */
const LANDMARK_OVERRIDES: Record<
  string,
  { type: "kampung"; parentSlug: string; slug: string } | { type: "area"; slug: string }
> = {
  // PJ / Damansara
  "damansara utama (ss21)": { type: "kampung", parentSlug: "damansara", slug: "damansara-utama" },
  "damansara utama": { type: "kampung", parentSlug: "damansara", slug: "damansara-utama" },
  ss2: { type: "area", slug: "ss2" },
  "ss2 pasar malam": { type: "area", slug: "ss2" },
  tropicana: { type: "kampung", parentSlug: "bandar-utama", slug: "tropicana" },
  "kelana jaya": { type: "kampung", parentSlug: "petaling-jaya", slug: "kelana-jaya" },
  "ara damansara": { type: "area", slug: "ara-damansara" },
  "kota damansara": { type: "kampung", parentSlug: "damansara", slug: "kota-damansara" },
  "mutiara damansara": { type: "kampung", parentSlug: "damansara", slug: "mutiara-damansara" },
  "damansara perdana": { type: "kampung", parentSlug: "damansara", slug: "damansara-perdana" },
  "damansara damai": { type: "kampung", parentSlug: "damansara", slug: "damansara-damai" },
  "one utama": { type: "area", slug: "bandar-utama" },
  "one utama shopping centre": { type: "area", slug: "bandar-utama" },

  // Subang / Sunway / USJ
  "usj (1–21)": { type: "kampung", parentSlug: "subang-jaya", slug: "usj" },
  "usj (1-21)": { type: "kampung", parentSlug: "subang-jaya", slug: "usj" },
  usj: { type: "kampung", parentSlug: "subang-jaya", slug: "usj" },
  "putra heights": { type: "kampung", parentSlug: "subang-jaya", slug: "putra-heights" },
  "bandar sunway": { type: "kampung", parentSlug: "sunway", slug: "bandar-sunway" },
  "sunway pyramid": { type: "kampung", parentSlug: "sunway", slug: "sunway-pyramid-vicinity" },
  "sunway pyramid vicinity": { type: "kampung", parentSlug: "sunway", slug: "sunway-pyramid-vicinity" },
  sunway: { type: "area", slug: "sunway" },

  // Mont Kiara / Bangsar
  "mont kiara": { type: "area", slug: "mont-kiara" },
  "sri hartamas": { type: "kampung", parentSlug: "mont-kiara", slug: "sri-hartamas" },
  "solaris dutamas": { type: "kampung", parentSlug: "mont-kiara", slug: "dutamas" },
  "solaris mont kiara": { type: "kampung", parentSlug: "mont-kiara", slug: "solaris-mont-kiara" },
  "duta nusantara": { type: "kampung", parentSlug: "mont-kiara", slug: "duta-nusantara" },
  dutamas: { type: "kampung", parentSlug: "mont-kiara", slug: "dutamas" },
  bangsar: { type: "area", slug: "bangsar" },
  "bangsar baru": { type: "kampung", parentSlug: "bangsar", slug: "bangsar-baru" },
  "bangsar south": { type: "kampung", parentSlug: "bangsar", slug: "bangsar-south" },
  "kampung kerinchi": { type: "kampung", parentSlug: "bangsar", slug: "kampung-kerinchi" },
  "pantai dalam": { type: "kampung", parentSlug: "bangsar", slug: "pantai-dalam" },

  // KL / Sentul / Setapak
  sentul: { type: "area", slug: "sentul" },
  "sentul park": { type: "kampung", parentSlug: "sentul", slug: "bandar-baru-sentul" },
  brickfields: { type: "kampung", parentSlug: "sentul", slug: "brickfields" },
  "taman wahyu": { type: "kampung", parentSlug: "sentul", slug: "taman-wahyu" },
  "wangsa maju": { type: "area", slug: "wangsa-maju" },
  "sri rampai": { type: "kampung", parentSlug: "wangsa-maju", slug: "sri-rampai" },
  gombak: { type: "kampung", parentSlug: "batu-caves", slug: "taman-sri-gombak" },

  // Shah Alam / Setia / Kota Kemuning
  "setia alam": { type: "area", slug: "setia-alam" },
  "kota kemuning": { type: "area", slug: "kota-kemuning" },
  "bukit jelutong": { type: "area", slug: "bukit-jelutong" },
  "shah alam": { type: "area", slug: "shah-alam" },
  "section 7": { type: "kampung", parentSlug: "shah-alam", slug: "shah-alam-seksyen" },
  "section 13": { type: "kampung", parentSlug: "shah-alam", slug: "shah-alam-seksyen" },
  "section 17": { type: "kampung", parentSlug: "shah-alam", slug: "shah-alam-seksyen" },
  "eco ardence": { type: "kampung", parentSlug: "setia-alam", slug: "eco-ardence" },
  "hicom glenmarie": { type: "kampung", parentSlug: "glenmarie", slug: "hicom-glenmarie" },
  glenmarie: { type: "area", slug: "glenmarie" },

  // Puchong / Puteri
  "puchong jaya": { type: "kampung", parentSlug: "puchong", slug: "puchong-jaya" },
  "bukit puchong": { type: "kampung", parentSlug: "puchong", slug: "bukit-puchong" },
  "taman wawasan": { type: "kampung", parentSlug: "puchong", slug: "taman-wawasan" },
  "bandar puteri": { type: "area", slug: "bandar-puteri" },
  puchong: { type: "area", slug: "puchong" },

  // Batu Caves / Selayang / Rawang
  "taman selayang": { type: "kampung", parentSlug: "batu-caves", slug: "taman-selayang-batu-caves" },
  "taman selayang baru": { type: "kampung", parentSlug: "selayang", slug: "taman-selayang-baru" },
  "kepong baru": { type: "kampung", parentSlug: "kepong", slug: "kepong-baru" },
  "batu caves": { type: "area", slug: "batu-caves" },
  rawang: { type: "area", slug: "rawang" },
  kepong: { type: "area", slug: "kepong" },

  // Putrajaya / Cyberjaya / Semenyih
  cyberjaya: { type: "area", slug: "cyberjaya" },
  dengkil: { type: "kampung", parentSlug: "putrajaya", slug: "dengkil" },
  "semenyih town": { type: "kampung", parentSlug: "kajang-semenyih", slug: "semenyih-town" },
  "taman pelangi": { type: "kampung", parentSlug: "kajang-semenyih", slug: "taman-pelangi-semenyih" },
  "bangi lama": { type: "kampung", parentSlug: "kajang-semenyih", slug: "bangi-lama" },
  "jade hills": { type: "kampung", parentSlug: "cyberjaya", slug: "jade-hills" },
  "tamarind square": { type: "kampung", parentSlug: "cyberjaya", slug: "tamarind-square" },

  // Melawati / Ampang
  "hulu kelang": { type: "area", slug: "hulu-kelang" },
  "ampang jaya": { type: "kampung", parentSlug: "ampang", slug: "ampang-jaya" },
  "bandar sri damansara": { type: "kampung", parentSlug: "desa-parkcity", slug: "bandar-sri-damansara" },

  // Klang
  klang: { type: "area", slug: "klang" },
  "taman sri muda": { type: "kampung", parentSlug: "bandar-botanic", slug: "taman-sri-muda" },

  // Subang airport / misc
  "subang jaya": { type: "area", slug: "subang-jaya" },
  "petaling jaya": { type: "area", slug: "petaling-jaya" },
  damansara: { type: "area", slug: "damansara" },
  setapak: { type: "area", slug: "setapak" },
};

function kampungHref(locale: AreaLinkLocale, parentSlug: string, slug: string): string {
  return `${localePrefix(locale)}/areas/${parentSlug}/${slug}`;
}

function areaHref(locale: AreaLinkLocale, slug: string): string {
  return `${localePrefix(locale)}/areas/${slug}`;
}

function kampungAnchor(locale: AreaLinkLocale, name: string, seed: number): string {
  if (locale === "ms") {
    const opts = [`Servis Aircond ${name}`, `Aircond di ${name}`, `${name} — Servis Aircond`];
    return opts[seed % opts.length];
  }
  if (locale === "zh") {
    const opts = [`${name}冷气服务`, `${name}冷气维修`, `冷气服务 · ${name}`];
    return opts[seed % opts.length];
  }
  const opts = [`Aircond Service ${name}`, `AC Service in ${name}`, `${name} Aircond Technician`];
  return opts[seed % opts.length];
}

/**
 * Resolve a landmark chip to a real internal URL when possible.
 */
export function resolveLandmarkLink(
  landmark: string,
  currentAreaSlug: string,
  locale: AreaLinkLocale = "en",
): ResolvedAreaLink | null {
  const areas = siteConfig.areaPages as AreaLite[];
  const kampungs = (siteConfig.kampungPages ?? []) as KampungLite[];
  const key = landmark.trim().toLowerCase();
  const n = norm(landmark);

  // 1) Explicit overrides
  const ov = LANDMARK_OVERRIDES[key] || LANDMARK_OVERRIDES[n];
  if (ov) {
    if (ov.type === "kampung") {
      const k = kampungs.find((x) => x.slug === ov.slug && x.parentSlug === ov.parentSlug);
      if (k) {
        return {
          href: kampungHref(locale, k.parentSlug, k.slug),
          label: landmark,
          kind: "kampung",
        };
      }
    } else if (ov.slug !== currentAreaSlug) {
      return {
        href: areaHref(locale, ov.slug),
        label: landmark,
        kind: "area",
      };
    }
  }

  // 2) Exact kampung under current parent
  const local = kampungs.find((k) => k.parentSlug === currentAreaSlug && k.name === landmark);
  if (local) {
    return {
      href: kampungHref(locale, local.parentSlug, local.slug),
      label: landmark,
      kind: "kampung",
    };
  }

  // 3) Exact top-level area name
  const crossArea = areas.find((a) => a.name === landmark && a.slug !== currentAreaSlug);
  if (crossArea) {
    return {
      href: areaHref(locale, crossArea.slug),
      label: landmark,
      kind: "area",
    };
  }

  // 4) Exact kampung name under any parent
  const elsewhere = kampungs.find((k) => k.name === landmark);
  if (elsewhere) {
    return {
      href: kampungHref(locale, elsewhere.parentSlug, elsewhere.slug),
      label: landmark,
      kind: "kampung",
    };
  }

  // 5) Normalized name / slug match
  const byNorm = kampungs.find((k) => norm(k.name) === n || norm(k.slug.replace(/-/g, " ")) === n);
  if (byNorm) {
    return {
      href: kampungHref(locale, byNorm.parentSlug, byNorm.slug),
      label: landmark,
      kind: "kampung",
    };
  }

  // 6) Contains match (conservative: only if unique-ish)
  const contains = kampungs.filter((k) => {
    const kn = norm(k.name);
    return n.length >= 4 && kn.length >= 4 && (n.includes(kn) || kn.includes(n));
  });
  if (contains.length === 1) {
    const k = contains[0];
    return {
      href: kampungHref(locale, k.parentSlug, k.slug),
      label: landmark,
      kind: "kampung",
    };
  }

  // 7) Area normalized match
  const areaNorm = areas.find((a) => a.slug !== currentAreaSlug && (norm(a.name) === n || norm(a.slug.replace(/-/g, " ")) === n));
  if (areaNorm) {
    return {
      href: areaHref(locale, areaNorm.slug),
      label: landmark,
      kind: "area",
    };
  }

  return null;
}

export type NeighbourhoodLink = {
  href: string;
  name: string;
  label: string;
  parentSlug: string;
  slug: string;
};

/**
 * All child kampung pages for an area (locale-correct href + varied anchors).
 */
export function getAreaNeighbourhoodLinks(
  areaSlug: string,
  locale: AreaLinkLocale = "en",
): NeighbourhoodLink[] {
  const kampungs = ((siteConfig.kampungPages ?? []) as KampungLite[]).filter(
    (k) => k.parentSlug === areaSlug,
  );
  return kampungs.map((k, i) => ({
    href: kampungHref(locale, k.parentSlug, k.slug),
    name: k.name,
    label: kampungAnchor(locale, k.name, i + areaSlug.length),
    parentSlug: k.parentSlug,
    slug: k.slug,
  }));
}

/**
 * For areas with few/no children, suggest relevant kampung pages from nearby parents.
 */
export function getRelatedNeighbourhoodLinks(
  areaSlug: string,
  locale: AreaLinkLocale = "en",
  limit = 8,
): NeighbourhoodLink[] {
  const children = getAreaNeighbourhoodLinks(areaSlug, locale);
  if (children.length >= 4) return [];

  const NEARBY: Record<string, string[]> = {
    "kuala-lumpur": ["sentul", "bangsar", "mont-kiara", "setapak", "cheras", "kepong"],
    ss2: ["petaling-jaya", "damansara", "bandar-utama"],
    "ara-damansara": ["damansara", "subang-jaya", "glenmarie", "petaling-jaya"],
    "bandar-puteri": ["puchong", "subang-jaya", "cyberjaya"],
    "bukit-jelutong": ["shah-alam", "kota-kemuning", "glenmarie", "setia-alam"],
    "bandar-utama": ["damansara", "petaling-jaya"],
    "desa-parkcity": ["kepong", "damansara", "mont-kiara"],
    selayang: ["batu-caves", "kepong", "rawang"],
    putrajaya: ["cyberjaya", "puchong", "kajang-semenyih"],
    sunway: ["subang-jaya", "petaling-jaya", "puchong"],
  };

  const parents = NEARBY[areaSlug] ?? [];
  const kampungs = (siteConfig.kampungPages ?? []) as KampungLite[];
  const picks: NeighbourhoodLink[] = [];
  for (const parent of parents) {
    for (const k of kampungs.filter((x) => x.parentSlug === parent)) {
      picks.push({
        href: kampungHref(locale, k.parentSlug, k.slug),
        name: k.name,
        label: kampungAnchor(locale, k.name, picks.length + parent.length),
        parentSlug: k.parentSlug,
        slug: k.slug,
      });
      if (picks.length >= limit) return picks;
    }
  }
  return picks;
}
