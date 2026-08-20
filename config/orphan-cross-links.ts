/**
 * Issue #74 — contextual money-page cross-links.
 *
 * Near-orphans (1–2 inbound) concentrate on brand-area, area-installation,
 * kampung-installation, brand-installation and the MS installation landings.
 *
 * This module does NOT emit a generic "related links" strip. Every helper
 * returns a short in-body paragraph with 2–6 inline anchors, hashed so
 * neighbouring pages do not share the same 8-grams. EN / MS / ZH copy is
 * authored separately.
 *
 * Pair existence is gated on `brandAreaPairs()` — we never link a
 * `/brands/{brand}/{area}` URL that `generateStaticParams()` would 404.
 */

import { siteConfig } from "@/config/site";
import {
  brandAreaPairs,
  PRIORITY_AREAS_BY_BRAND,
} from "@/config/brand-area-priority";
import { brandAnchor } from "@/config/anchor-text-diversity";

export type CrossLocale = "en" | "ms" | "zh";

export type CrossPart =
  | { k: "t"; v: string }
  | { k: "a"; href: string; v: string };

export type MoneyCrossBlock = {
  eyebrow: string;
  heading: string;
  parts: CrossPart[];
};

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

function localePrefix(locale: CrossLocale): string {
  return locale === "en" ? "" : `/${locale}`;
}

function brandNameOf(slug: string): string {
  return siteConfig.brandPages.find((b) => b.slug === slug)?.name || slug;
}

function areaNameOf(slug: string): string {
  return (
    siteConfig.areaPages.find((a) => a.slug === slug)?.name ||
    slug.replace(/-/g, " ")
  );
}

let pairSetCache: Set<string> | null = null;
function pairSet(): Set<string> {
  if (pairSetCache) return pairSetCache;
  pairSetCache = new Set(
    brandAreaPairs().map((p) => `${p.brand}|${p.area}`),
  );
  return pairSetCache;
}

export function hasBrandAreaPage(brandSlug: string, areaSlug: string): boolean {
  return pairSet().has(`${brandSlug}|${areaSlug}`);
}

export function brandsForArea(areaSlug: string): { slug: string; name: string }[] {
  const out: { slug: string; name: string }[] = [];
  for (const brand of siteConfig.brandPages) {
    if (hasBrandAreaPage(brand.slug, areaSlug)) {
      out.push({ slug: brand.slug, name: brand.name });
    }
  }
  return out;
}

export function areasForBrand(brandSlug: string): { slug: string; name: string }[] {
  const priority =
    PRIORITY_AREAS_BY_BRAND[brandSlug] || PRIORITY_AREAS_BY_BRAND._default;
  const out: { slug: string; name: string }[] = [];
  for (const areaSlug of priority) {
    if (hasBrandAreaPage(brandSlug, areaSlug)) {
      out.push({ slug: areaSlug, name: areaNameOf(areaSlug) });
    }
  }
  return out;
}

function kampungsForArea(areaSlug: string): { slug: string; name: string }[] {
  return ((siteConfig.kampungPages || []) as { slug: string; parentSlug: string; name: string }[])
    .filter((k) => k.parentSlug === areaSlug)
    .map((k) => ({ slug: k.slug, name: k.name }));
}

export function brandAreaHref(locale: CrossLocale, brand: string, area: string): string {
  return `${localePrefix(locale)}/brands/${brand}/${area}`;
}

export function brandHubHref(locale: CrossLocale, brand: string): string {
  return `${localePrefix(locale)}/brands/${brand}`;
}

export function areaInstallHref(locale: CrossLocale, area: string): string {
  return `${localePrefix(locale)}/areas/${area}/installation`;
}

export function kampungInstallHref(
  locale: CrossLocale,
  parent: string,
  kampung: string,
): string {
  return `${localePrefix(locale)}/areas/${parent}/${kampung}/installation`;
}

export function brandInstallHref(locale: CrossLocale, brand: string): string {
  return `${localePrefix(locale)}/brands/${brand}/installation`;
}

/**
 * Area-page brand chip destination.
 * Real brand-area pairs go to `/brands/{brand}/{area}`; everything else
 * stays on the brand hub so we never mint a 404.
 */
export function brandChipHref(
  locale: CrossLocale,
  brandSlug: string,
  areaSlug: string,
): string {
  if (hasBrandAreaPage(brandSlug, areaSlug)) {
    return brandAreaHref(locale, brandSlug, areaSlug);
  }
  return brandHubHref(locale, brandSlug);
}

// ── Installation-landing catalogue (native MS slugs, EN/ZH keep EN slugs) ─

type LandingId =
  | "1hp"
  | "15hp"
  | "2hp"
  | "wall"
  | "cassette"
  | "window"
  | "newHome"
  | "wholeHouse"
  | "commercial"
  | "pillar";

type Landing = {
  id: LandingId;
  href: Record<CrossLocale, string>;
  anchors: Record<CrossLocale, readonly string[]>;
};

const LANDINGS: readonly Landing[] = [
  {
    id: "1hp",
    href: {
      en: "/1hp-aircond-installation-kl",
      ms: "/ms/pemasangan-aircond-1hp-kl",
      zh: "/zh/1hp-aircond-installation-kl",
    },
    anchors: {
      en: ["1.0 HP bedroom install", "small-room 1 HP hang", "1 HP wall split from RM 199"],
      ms: ["pasang 1.0 HP bilik tidur", "gantung 1 HP bilik kecil", "split 1 HP dari RM 199"],
      zh: ["1.0匹卧室安装", "小房1匹挂机", "1匹壁挂 RM 199起"],
    },
  },
  {
    id: "15hp",
    href: {
      en: "/1.5hp-aircond-installation-kl",
      ms: "/ms/pemasangan-aircond-1.5hp-kl",
      zh: "/zh/1.5hp-aircond-installation-kl",
    },
    anchors: {
      en: ["1.5 HP master-room install", "1.5 HP living-hall hang", "1.5 HP split from RM 199"],
      ms: ["pasang 1.5 HP bilik utama", "gantung 1.5 HP ruang tamu", "split 1.5 HP dari RM 199"],
      zh: ["1.5匹主卧安装", "1.5匹客厅挂机", "1.5匹分体 RM 199起"],
    },
  },
  {
    id: "2hp",
    href: {
      en: "/2hp-aircond-installation-kl",
      ms: "/ms/pemasangan-aircond-2hp-kl",
      zh: "/zh/2hp-aircond-installation-kl",
    },
    anchors: {
      en: ["2.0 HP hall install", "open-plan 2 HP hang", "2 HP split from RM 249"],
      ms: ["pasang 2.0 HP dewan", "gantung 2 HP pelan terbuka", "split 2 HP dari RM 249"],
      zh: ["2.0匹大厅安装", "开放式2匹挂机", "2匹分体 RM 249起"],
    },
  },
  {
    id: "wall",
    href: {
      en: "/wall-mounted-aircond-installation-kl",
      ms: "/ms/pemasangan-aircond-dinding-kl",
      zh: "/zh/wall-mounted-aircond-installation-kl",
    },
    anchors: {
      en: ["wall-mounted split hang", "standard wall-unit install", "wall split from RM 199"],
      ms: ["pasang split dinding", "gantung unit dinding", "split dinding dari RM 199"],
      zh: ["挂壁式分体安装", "标准壁挂安装", "壁挂分体 RM 199起"],
    },
  },
  {
    id: "cassette",
    href: {
      en: "/ceiling-cassette-aircond-installation-kl",
      ms: "/ms/pemasangan-aircond-keset-siling-kl",
      zh: "/zh/ceiling-cassette-aircond-installation-kl",
    },
    anchors: {
      en: ["ceiling cassette install", "4-way cassette hang", "cassette from RM 290"],
      ms: ["pasang keset siling", "gantung cassette 4 arah", "cassette dari RM 290"],
      zh: ["天花卡式机安装", "四面出风卡式", "卡式机 RM 290起"],
    },
  },
  {
    id: "window",
    href: {
      en: "/window-unit-aircond-installation-kl",
      ms: "/ms/pemasangan-aircond-tingkap-kl",
      zh: "/zh/window-unit-aircond-installation-kl",
    },
    anchors: {
      en: ["window-unit install", "window box hang", "window unit from RM 199"],
      ms: ["pasang unit tingkap", "gantung kotak tingkap", "unit tingkap dari RM 199"],
      zh: ["窗式机安装", "窗机挂装", "窗机 RM 199起"],
    },
  },
  {
    id: "newHome",
    href: {
      en: "/new-home-aircond-installation",
      ms: "/ms/pemasangan-aircond-rumah-baru",
      zh: "/zh/new-home-aircond-installation",
    },
    anchors: {
      en: ["new-home install package", "move-in whole-house hang", "new-house aircond package"],
      ms: ["pakej pasang rumah baru", "gantung seluruh rumah masuk", "pakej aircond rumah baru"],
      zh: ["新居安装配套", "入伙整屋挂机", "新屋冷气配套"],
    },
  },
  {
    id: "wholeHouse",
    href: {
      en: "/whole-house-aircond-installation",
      ms: "/ms/pemasangan-aircond-seluruh-rumah",
      zh: "/zh/whole-house-aircond-installation",
    },
    anchors: {
      en: ["whole-house multi-unit hang", "3+ unit same-visit install", "multi-room install day"],
      ms: ["pasang pelbagai unit seluruh rumah", "3+ unit satu lawatan", "hari pasang berbilang bilik"],
      zh: ["整屋多机安装", "一次上门3台以上", "多房安装日"],
    },
  },
  {
    id: "commercial",
    href: {
      en: "/commercial-aircond-installation",
      ms: "/ms/pemasangan-aircond-komersial",
      zh: "/zh/commercial-aircond-installation",
    },
    anchors: {
      en: ["shoplot / office install", "commercial cassette hang", "after-hours shop install"],
      ms: ["pasang kedai / pejabat", "gantung cassette komersial", "pasang kedai selepas tutup"],
      zh: ["店屋/办公室安装", "商用卡式挂装", "打烊后店铺安装"],
    },
  },
  {
    id: "pillar",
    href: {
      en: "/aircond-installation-kl",
      ms: "/ms/pemasangan-aircond-kl",
      zh: "/zh/aircond-installation-kl",
    },
    anchors: {
      en: ["KL installation process", "7-step hang with vacuum pump", "how we commission a new split"],
      ms: ["proses pemasangan KL", "7 langkah dengan pam vakum", "cara kami pentauliah split baharu"],
      zh: ["吉隆坡安装流程", "含真空泵的7步挂机", "新分体机如何调试"],
    },
  },
];

type AreaProfile = "highRise" | "commercial" | "industrial" | "family";

const AREA_PROFILE: Record<string, AreaProfile> = {
  "mont-kiara": "highRise",
  bangsar: "highRise",
  "kuala-lumpur": "highRise",
  damansara: "highRise",
  "bandar-utama": "highRise",
  "desa-parkcity": "highRise",
  cyberjaya: "highRise",
  "petaling-jaya": "commercial",
  "subang-jaya": "commercial",
  sunway: "commercial",
  klang: "industrial",
  "shah-alam": "industrial",
  glenmarie: "industrial",
  puchong: "industrial",
};

const PROFILE_LANDINGS: Record<AreaProfile, LandingId[]> = {
  highRise: ["wall", "15hp", "1hp", "wholeHouse"],
  commercial: ["cassette", "commercial", "2hp", "wholeHouse"],
  industrial: ["commercial", "2hp", "cassette", "window"],
  family: ["1hp", "newHome", "wall", "window", "wholeHouse"],
};

function landingById(id: LandingId): Landing {
  return LANDINGS.find((l) => l.id === id) || LANDINGS[0];
}

function landingAnchor(landing: Landing, locale: CrossLocale, seed: number): string {
  return pick(landing.anchors[locale], seed);
}

// ── Area page: installation-cluster paragraph (MS stitch lives here) ─────

const AREA_CLUSTER_HEADING: Record<CrossLocale, readonly string[]> = {
  en: [
    "Sizing a new hang in {area}",
    "If you are replacing a unit in {area}",
    "New split for a {area} room",
    "Picking HP and type for {area}",
  ],
  ms: [
    "Saiz gantungan baharu di {area}",
    "Kalau nak ganti unit di {area}",
    "Split baharu untuk bilik di {area}",
    "Pilih HP dan jenis untuk {area}",
  ],
  zh: [
    "{area}新挂机怎么选型",
    "在{area}换机前先看这几页",
    "{area}房间的新分体机",
    "{area}按匹数和机型选",
  ],
};

const AREA_CLUSTER_EYEBROW: Record<CrossLocale, string> = {
  en: "New unit · hang",
  ms: "Unit baharu · gantung",
  zh: "新机 · 挂装",
};

export function areaInstallClusterBlock(
  areaSlug: string,
  areaName: string,
  locale: CrossLocale,
): MoneyCrossBlock | null {
  const profile = AREA_PROFILE[areaSlug] || "family";
  const pool = PROFILE_LANDINGS[profile];
  const seed = hashStr(`${areaSlug}::cluster::${locale}`);
  const heading = pick(AREA_CLUSTER_HEADING[locale], seed).replace("{area}", areaName);
  const start = seed % pool.length;
  const ids = [0, 1, 2].map((i) => pool[(start + i) % pool.length]);

  const L0 = landingById(ids[0]);
  const L1 = landingById(ids[1]);
  const L2 = landingById(ids[2]);
  const a0 = landingAnchor(L0, locale, seed);
  const a1 = landingAnchor(L1, locale, seed + 1);
  const a2 = landingAnchor(L2, locale, seed + 2);

  const variants: Record<CrossLocale, CrossPart[][]> = {
    en: [
      [
        { k: "t", v: `Most ${areaName} replacements we hang are a wall split. Start with ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: ` if the room is under 180 sq ft, or ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` when the hall is open-plan. Cassette and shop work sits on ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: `. Every hang includes 7 ft of Type-L copper, vacuum-pump commissioning and a 1-month workmanship warranty — extras are quoted before we drill.` },
      ],
      [
        { k: "t", v: `${areaName} bookings that need a new unit usually come down to HP and mount type, not brand. ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: ` covers the small bedrooms; ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` is the living-hall default. For a shoplot or cassette, use ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: `. Wall-mounted labour starts from RM 199 with the first 7 ft of pipe in the price.` },
      ],
      [
        { k: "t", v: `If the ${areaName} unit on the wall is done, we hang the replacement the same day the slot is confirmed. ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: `, ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` and ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: ` are the three pages that match how this township actually books — bedroom, hall, or commercial cassette.` },
      ],
      [
        { k: "t", v: `A ${areaName} hang is quoted from the HP and the mount, then confirmed on WhatsApp before the van leaves. Read ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: ` and ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` for the two residential sizes we install most here, or ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: ` if the job is a shop or ceiling cassette.` },
      ],
    ],
    ms: [
      [
        { k: "t", v: `Kebanyakan gantian di ${areaName} kami gantung sebagai split dinding. Mula dengan ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: ` kalau bilik bawah 180 kaki persegi, atau ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` bila dewan pelan terbuka. Kerja kedai dan cassette ada di ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: `. Setiap gantungan termasuk 7 kaki kuprum Type-L, pentauliahan pam vakum dan waranti kerja 1 bulan — tambahan disebut sebelum dinding dibor.` },
      ],
      [
        { k: "t", v: `Tempahan ${areaName} yang perlukan unit baharu biasanya tertumpu pada HP dan jenis mounting, bukan jenama. ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: ` untuk bilik tidur kecil; ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` untuk ruang tamu. Untuk kedai atau cassette, buka ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: `. Buruh dinding bermula dari RM 199 dengan 7 kaki paip pertama dalam harga.` },
      ],
      [
        { k: "t", v: `Kalau unit di dinding ${areaName} sudah habis, kami gantung gantian hari yang sama slot disahkan. ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: `, ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` dan ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: ` ialah tiga halaman yang sepadan dengan cara township ini tempah — bilik tidur, dewan, atau cassette kedai.` },
      ],
      [
        { k: "t", v: `Gantungan di ${areaName} disebut dari HP dan mounting, kemudian disahkan di WhatsApp sebelum van keluar. Baca ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: ` dan ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` untuk dua saiz kediaman yang paling kerap kami pasang di sini, atau ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: ` jika kerja itu kedai atau keset siling.` },
      ],
    ],
    zh: [
      [
        { k: "t", v: `${areaName}多数换机我们按壁挂分体来挂。房间不到 180 平方英尺先看 ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: `，开放式客厅看 ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: `。店屋和卡式机在 ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: `。每次挂机含 7 尺 Type-L 铜管、真空泵调试和 1 个月工艺保修——钻孔前才报额外项目。` },
      ],
      [
        { k: "t", v: `${areaName}需要新机的预约，通常卡在匹数和安装方式，而不是品牌。` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: ` 覆盖小卧室；` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` 是客厅默认。店屋或卡式机用 ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: `。壁挂人工 RM 199 起，价格已含首 7 尺铜管。` },
      ],
      [
        { k: "t", v: `${areaName}墙上那台如果已经不行，档期确认当天我们就能挂上新机。` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: `、` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: ` 和 ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: ` 这三页对应本区实际预约方式——卧室、大厅或商用卡式。` },
      ],
      [
        { k: "t", v: `${areaName}的挂机按匹数和安装方式报价，WhatsApp 确认后车才出门。住宅两档看 ` },
        { k: "a", href: L0.href[locale], v: a0 },
        { k: "t", v: ` 和 ` },
        { k: "a", href: L1.href[locale], v: a1 },
        { k: "t", v: `；店铺或天花卡式看 ` },
        { k: "a", href: L2.href[locale], v: a2 },
        { k: "t", v: `。` },
      ],
    ],
  };

  return {
    eyebrow: AREA_CLUSTER_EYEBROW[locale],
    heading,
    parts: pick(variants[locale], seed),
  };
}

// ── Kampung page: own installation child + parent area-install ───────────

const KAMPUNG_HEADING: Record<CrossLocale, readonly ((n: string) => string)[]> = {
  en: [
    (n) => `Hanging a new unit in ${n}`,
    (n) => `${n} install, not just a wash`,
    (n) => `When ${n} needs a replacement hang`,
    (n) => `New split for this ${n} address`,
  ],
  ms: [
    (n) => `Gantung unit baharu di ${n}`,
    (n) => `Pemasangan ${n}, bukan cuci sahaja`,
    (n) => `Bila ${n} perlukan gantungan ganti`,
    (n) => `Split baharu untuk alamat ${n} ini`,
  ],
  zh: [
    (n) => `在${n}挂新机`,
    (n) => `${n}的安装，不只是清洗`,
    (n) => `${n}需要换挂时`,
    (n) => `这个${n}地址的新分体机`,
  ],
};

export function kampungChildBlock(
  kampungSlug: string,
  kampungName: string,
  parentSlug: string,
  parentName: string,
  locale: CrossLocale,
): MoneyCrossBlock {
  const seed = hashStr(`${kampungSlug}::child::${locale}`);
  const heading = pick(KAMPUNG_HEADING[locale], seed)(kampungName);
  const childHref = kampungInstallHref(locale, parentSlug, kampungSlug);
  const parentInstall = areaInstallHref(locale, parentSlug);

  const childAnchors: Record<CrossLocale, readonly string[]> = {
    en: [
      `${kampungName} installation page`,
      `hang a split in ${kampungName}`,
      `${kampungName} new-unit labour`,
      `commission a unit in ${kampungName}`,
    ],
    ms: [
      `halaman pemasangan ${kampungName}`,
      `gantung split di ${kampungName}`,
      `buruh unit baharu ${kampungName}`,
      `pentauliah unit di ${kampungName}`,
    ],
    zh: [
      `${kampungName}安装页`,
      `在${kampungName}挂分体机`,
      `${kampungName}新机人工`,
      `在${kampungName}调试机组`,
    ],
  };
  const parentAnchors: Record<CrossLocale, readonly string[]> = {
    en: [
      `${parentName} installation hub`,
      `wider ${parentName} hang prices`,
      `${parentName} install coverage`,
    ],
    ms: [
      `hab pemasangan ${parentName}`,
      `harga gantung ${parentName} lebih luas`,
      `liputan pasang ${parentName}`,
    ],
    zh: [
      `${parentName}安装总览`,
      `${parentName}更大范围挂机价`,
      `${parentName}安装覆盖`,
    ],
  };
  const childA = pick(childAnchors[locale], seed);
  const parentA = pick(parentAnchors[locale], seed + 3);

  const brands = brandsForArea(parentSlug);
  const brandPick = brands.length
    ? brands[seed % brands.length]
    : null;
  const brandHref = brandPick
    ? brandAreaHref(locale, brandPick.slug, parentSlug)
    : null;
  const brandA = brandPick
    ? brandAnchor(brandPick.slug, locale, seed)
    : "";

  const variants: Record<CrossLocale, CrossPart[][]> = {
    en: [
      [
        { k: "t", v: `A wash in ${kampungName} is one job; hanging a replacement is another. The neighbourhood install write-up is on the ` },
        { k: "a", href: childHref, v: childA },
        { k: "t", v: `. Township-wide labour and pipe extras sit on the ` },
        { k: "a", href: parentInstall, v: parentA },
        ...(brandHref
          ? ([
              { k: "t", v: `. If the compressor on the wall is a ${brandPick!.name}, use ` },
              { k: "a", href: brandHref, v: brandA },
              { k: "t", v: ` for the local service notes.` },
            ] as CrossPart[])
          : ([{ k: "t", v: `.` }] as CrossPart[])),
      ],
      [
        { k: "t", v: `${kampungName} replacements are quoted from the same RM 199 wall-mount base as the rest of ${parentName}, with vacuum-pump commissioning in the price. Open the ` },
        { k: "a", href: childHref, v: childA },
        { k: "t", v: ` for access notes on this street, or the ` },
        { k: "a", href: parentInstall, v: parentA },
        { k: "t", v: ` for HP-size labour.` },
      ],
    ],
    ms: [
      [
        { k: "t", v: `Cuci di ${kampungName} satu kerja; gantung gantian kerja lain. Tulisan pasang kejiranan ada di ` },
        { k: "a", href: childHref, v: childA },
        { k: "t", v: `. Buruh dan paip tambahan seluruh township ada di ` },
        { k: "a", href: parentInstall, v: parentA },
        ...(brandHref
          ? ([
              { k: "t", v: `. Kalau kompressor di dinding itu ${brandPick!.name}, buka ` },
              { k: "a", href: brandHref, v: brandA },
              { k: "t", v: ` untuk nota servis setempat.` },
            ] as CrossPart[])
          : ([{ k: "t", v: `.` }] as CrossPart[])),
      ],
      [
        { k: "t", v: `Gantian di ${kampungName} disebut dari harga dinding RM 199 yang sama dengan ${parentName}, dengan pentauliahan pam vakum dalam harga. Buka ` },
        { k: "a", href: childHref, v: childA },
        { k: "t", v: ` untuk nota akses jalan ini, atau ` },
        { k: "a", href: parentInstall, v: parentA },
        { k: "t", v: ` untuk buruh ikut saiz HP.` },
      ],
    ],
    zh: [
      [
        { k: "t", v: `${kampungName}的清洗是一回事，换挂是另一回事。本社区安装说明在 ` },
        { k: "a", href: childHref, v: childA },
        { k: "t", v: `。整个乡镇的人工和加管在 ` },
        { k: "a", href: parentInstall, v: parentA },
        ...(brandHref
          ? ([
              { k: "t", v: `。墙上压缩机如果是${brandPick!.name}，本地服务备注看 ` },
              { k: "a", href: brandHref, v: brandA },
              { k: "t", v: `。` },
            ] as CrossPart[])
          : ([{ k: "t", v: `。` }] as CrossPart[])),
      ],
      [
        { k: "t", v: `${kampungName}换机按与${parentName}相同的壁挂 RM 199 基价报价，含真空泵调试。这条街的通行备注在 ` },
        { k: "a", href: childHref, v: childA },
        { k: "t", v: `，按匹数的人工在 ` },
        { k: "a", href: parentInstall, v: parentA },
        { k: "t", v: `。` },
      ],
    ],
  };

  return {
    eyebrow:
      locale === "en" ? "Install on this street" : locale === "ms" ? "Pasang di jalan ini" : "这条街的安装",
    heading,
    parts: pick(variants[locale], seed),
  };
}

// ── Brand page: brand-installation child ─────────────────────────────────

export function brandInstallCta(
  brandSlug: string,
  brandName: string,
  locale: CrossLocale,
): MoneyCrossBlock {
  const seed = hashStr(`${brandSlug}::binstall::${locale}`);
  const href = brandInstallHref(locale, brandSlug);
  const headings: Record<CrossLocale, readonly string[]> = {
    en: [
      `Hanging a new ${brandName} split`,
      `${brandName} install, not just a service visit`,
      `New ${brandName} unit from RM 199 labour`,
    ],
    ms: [
      `Gantung split ${brandName} baharu`,
      `Pemasangan ${brandName}, bukan lawatan servis sahaja`,
      `Unit ${brandName} baharu, buruh dari RM 199`,
    ],
    zh: [
      `挂一台新的${brandName}分体机`,
      `${brandName}安装，不只是保养上门`,
      `新${brandName}机组，人工 RM 199起`,
    ],
  };
  const anchors: Record<CrossLocale, readonly string[]> = {
    en: [
      `${brandName} installation page`,
      `commission a ${brandName} hang`,
      `${brandName} new-unit labour`,
    ],
    ms: [
      `halaman pemasangan ${brandName}`,
      `pentauliah gantungan ${brandName}`,
      `buruh unit baharu ${brandName}`,
    ],
    zh: [
      `${brandName}安装页`,
      `${brandName}挂机调试`,
      `${brandName}新机人工`,
    ],
  };
  const heading = pick(headings[locale], seed);
  const anchor = pick(anchors[locale], seed + 1);

  const parts: Record<CrossLocale, CrossPart[]> = {
    en: [
      { k: "t", v: `Servicing an existing ${brandName} is on this page. Hanging a new one — vacuum pump to 500 microns, Type-L copper, 1-month workmanship warranty — is on the ` },
      { k: "a", href, v: anchor },
      { k: "t", v: `. Wall-mounted labour starts from RM 199; ceiling cassette from RM 290. We install units you already bought and units we supply.` },
    ],
    ms: [
      { k: "t", v: `Menservis ${brandName} sedia ada ada di halaman ini. Gantung yang baharu — pam vakum ke 500 mikron, kuprum Type-L, waranti kerja 1 bulan — ada di ` },
      { k: "a", href, v: anchor },
      { k: "t", v: `. Buruh dinding dari RM 199; keset siling dari RM 290. Kami pasang unit yang anda sudah beli dan unit yang kami bekal.` },
    ],
    zh: [
      { k: "t", v: `现有${brandName}的保养在本页。新机挂装——抽真空至 500 微米、Type-L 铜管、1 个月工艺保修——在 ` },
      { k: "a", href, v: anchor },
      { k: "t", v: `。壁挂人工 RM 199 起，天花卡式 RM 290 起。您已买的机器和我们供货的机器都能装。` },
    ],
  };

  return {
    eyebrow: locale === "en" ? "New unit" : locale === "ms" ? "Unit baharu" : "新机",
    heading,
    parts: parts[locale],
  };
}

// ── Brand-area page: area-install + brand-install ────────────────────────

export function brandAreaLocalLinks(
  brandSlug: string,
  brandName: string,
  areaSlug: string,
  areaName: string,
  locale: CrossLocale,
): MoneyCrossBlock {
  const seed = hashStr(`${brandSlug}|${areaSlug}::local::${locale}`);
  const areaH = areaInstallHref(locale, areaSlug);
  const brandH = brandInstallHref(locale, brandSlug);
  const headings: Record<CrossLocale, readonly string[]> = {
    en: [
      `Installing ${brandName} in ${areaName}`,
      `${areaName} hang for a ${brandName} compressor`,
      `New ${brandName} labour in ${areaName}`,
    ],
    ms: [
      `Pasang ${brandName} di ${areaName}`,
      `Gantung ${areaName} untuk kompressor ${brandName}`,
      `Buruh ${brandName} baharu di ${areaName}`,
    ],
    zh: [
      `在${areaName}安装${brandName}`,
      `${areaName}给${brandName}压缩机的挂装`,
      `${areaName}的${brandName}新机人工`,
    ],
  };
  const areaAnchors: Record<CrossLocale, readonly string[]> = {
    en: [`${areaName} installation page`, `hang a split in ${areaName}`, `${areaName} install labour`],
    ms: [`halaman pemasangan ${areaName}`, `gantung split di ${areaName}`, `buruh pasang ${areaName}`],
    zh: [`${areaName}安装页`, `在${areaName}挂分体机`, `${areaName}安装人工`],
  };
  const brandAnchors: Record<CrossLocale, readonly string[]> = {
    en: [`${brandName} install notes`, `${brandName} commissioning page`, `${brandName} new-unit hang`],
    ms: [`nota pasang ${brandName}`, `halaman pentauliahan ${brandName}`, `gantung unit baharu ${brandName}`],
    zh: [`${brandName}安装备注`, `${brandName}调试页`, `${brandName}新机挂装`],
  };

  const heading = pick(headings[locale], seed);
  const aArea = pick(areaAnchors[locale], seed);
  const aBrand = pick(brandAnchors[locale], seed + 2);

  const parts: Record<CrossLocale, CrossPart[]> = {
    en: [
      { k: "t", v: `This page is the ${brandName} service visit in ${areaName}. A replacement hang — same township, new copper and a vacuum-pump commission — is on the ` },
      { k: "a", href: areaH, v: aArea },
      { k: "t", v: `. Brand-specific install notes (gas type, typical HP, outdoor clearances) live on the ` },
      { k: "a", href: brandH, v: aBrand },
      { k: "t", v: `. Wall-mount labour from RM 199, quoted before we drill.` },
    ],
    ms: [
      { k: "t", v: `Halaman ini lawatan servis ${brandName} di ${areaName}. Gantungan ganti — township sama, kuprum baharu dan pentauliahan pam vakum — ada di ` },
      { k: "a", href: areaH, v: aArea },
      { k: "t", v: `. Nota pasang khusus jenama (jenis gas, HP biasa, ruang unit luar) ada di ` },
      { k: "a", href: brandH, v: aBrand },
      { k: "t", v: `. Buruh dinding dari RM 199, disebut sebelum kami bor.` },
    ],
    zh: [
      { k: "t", v: `本页是${areaName}的${brandName}保养上门。换挂——同一乡镇、新铜管和真空泵调试——在 ` },
      { k: "a", href: areaH, v: aArea },
      { k: "t", v: `。品牌安装备注（冷媒类型、常见匹数、室外净空）在 ` },
      { k: "a", href: brandH, v: aBrand },
      { k: "t", v: `。壁挂人工 RM 199 起，钻孔前报价。` },
    ],
  };

  return {
    eyebrow: locale === "en" ? "Install this brand here" : locale === "ms" ? "Pasang jenama ini di sini" : "在这里安装这个品牌",
    heading,
    parts: parts[locale],
  };
}

// ── Brand-installation page: all brand-area children ─────────────────────

export function brandInstallAreaLinks(
  brandSlug: string,
  _brandName: string,
  locale: CrossLocale,
): MoneyCrossBlock | null {
  const brandName = brandNameOf(brandSlug);
  const areas = areasForBrand(brandSlug);
  if (areas.length === 0) return null;
  const seed = hashStr(`${brandSlug}::binstall-areas::${locale}`);

  const headings: Record<CrossLocale, readonly string[]> = {
    en: [
      `${brandName} hangs we actually run`,
      `Where a ${brandName} install usually lands`,
      `${brandName} by township`,
    ],
    ms: [
      `Gantungan ${brandName} yang kami jalankan`,
      `Di mana pasang ${brandName} biasanya mendarat`,
      `${brandName} mengikut township`,
    ],
    zh: [
      `我们实际在做的${brandName}挂机`,
      `${brandName}安装通常落在哪些乡镇`,
      `按乡镇看${brandName}`,
    ],
  };

  const lead: Record<CrossLocale, string> = {
    en: `${brandName} installs we book across KL and Selangor most often start from these township pages: `,
    ms: `Pemasangan ${brandName} yang kami tempah merentasi KL dan Selangor paling kerap bermula dari halaman township ini: `,
    zh: `我们在吉隆坡与雪兰莪预约的${brandName}安装，多数从这些乡镇页开始： `,
  };
  const tail: Record<CrossLocale, string> = {
    en: `. Each page is the local ${brandName} service visit for that area — building access, typical HP and the faults we see on that compressor.`,
    ms: `. Setiap halaman ialah lawatan servis ${brandName} setempat untuk kawasan itu — akses bangunan, HP biasa dan kerosakan yang kami nampak pada kompressor itu.`,
    zh: `。每页是该区${brandName}的本地保养上门——大楼通行、常见匹数，以及这台压缩机上我们见到的故障。`,
  };

  const parts: CrossPart[] = [{ k: "t", v: lead[locale] }];
  areas.forEach((area, i) => {
    const variant = (seed + i) % 3;
    const anchor =
      locale === "en"
        ? variant === 0
          ? `${brandName} in ${area.name}`
          : variant === 1
            ? `${area.name} ${brandName} visit`
            : `servicing ${brandName} around ${area.name}`
        : locale === "ms"
          ? variant === 0
            ? `${brandName} di ${area.name}`
            : variant === 1
              ? `lawatan ${brandName} ${area.name}`
              : `servis ${brandName} sekitar ${area.name}`
          : variant === 0
            ? `${area.name}的${brandName}`
            : variant === 1
              ? `${area.name}${brandName}上门`
              : `${area.name}一带的${brandName}保养`;
    if (i > 0) parts.push({ k: "t", v: i === areas.length - 1 ? " and " : ", " });
    parts.push({ k: "a", href: brandAreaHref(locale, brandSlug, area.slug), v: anchor });
  });
  parts.push({ k: "t", v: tail[locale] });

  return {
    eyebrow: locale === "en" ? "By township" : locale === "ms" ? "Mengikut township" : "按乡镇",
    heading: pick(headings[locale], seed),
    parts,
  };
}

// ── Area-installation page: brand-area children + kampung-install ────────

export function areaInstallBrandLinks(
  areaSlug: string,
  areaName: string,
  locale: CrossLocale,
): MoneyCrossBlock | null {
  const brands = brandsForArea(areaSlug);
  const kampungs = kampungsForArea(areaSlug).slice(0, 4);
  if (brands.length === 0 && kampungs.length === 0) return null;

  const seed = hashStr(`${areaSlug}::ainstall::${locale}`);
  const headings: Record<CrossLocale, readonly string[]> = {
    en: [
      `Brand and street notes for a ${areaName} hang`,
      `Before we drill in ${areaName}`,
      `${areaName} install, by brand and neighbourhood`,
    ],
    ms: [
      `Nota jenama dan jalan untuk gantung di ${areaName}`,
      `Sebelum kami bor di ${areaName}`,
      `Pemasangan ${areaName}, ikut jenama dan kejiranan`,
    ],
    zh: [
      `${areaName}挂机的品牌和街道备注`,
      `在${areaName}钻孔之前`,
      `${areaName}安装，按品牌和社区`,
    ],
  };

  const parts: CrossPart[] = [];
  if (brands.length > 0) {
    const lead: Record<CrossLocale, string> = {
      en: `A ${areaName} hang is quoted from HP and mount; the compressor brand still changes the gas gauges and outdoor clearances. Local ${areaName} notes for `,
      ms: `Gantungan ${areaName} disebut dari HP dan mounting; jenama kompressor tetap ubah tolok gas dan ruang unit luar. Nota ${areaName} setempat untuk `,
      zh: `${areaName}挂机按匹数和安装方式报价；压缩机品牌仍会改变冷媒表和室外净空。${areaName}本地备注：`,
    };
    parts.push({ k: "t", v: lead[locale] });
    const shown = brands.slice(0, 4);
    shown.forEach((b, i) => {
      if (i > 0) parts.push({ k: "t", v: i === shown.length - 1 ? " and " : ", " });
      parts.push({
        k: "a",
        href: brandAreaHref(locale, b.slug, areaSlug),
        v: brandAnchor(b.slug, locale, seed + i),
      });
    });
    parts.push({ k: "t", v: locale === "zh" ? "。" : ". " });
  }

  if (kampungs.length > 0) {
    const lead2: Record<CrossLocale, string> = {
      en: `Street-level install write-ups under ${areaName}: `,
      ms: `Tulisan pasang peringkat jalan di bawah ${areaName}: `,
      zh: `${areaName}下属街道的安装说明：`,
    };
    parts.push({ k: "t", v: lead2[locale] });
    kampungs.forEach((k, i) => {
      const kAnchors: Record<CrossLocale, string> = {
        en: `${k.name} hang`,
        ms: `gantung ${k.name}`,
        zh: `${k.name}挂机`,
      };
      if (i > 0) parts.push({ k: "t", v: i === kampungs.length - 1 ? " and " : ", " });
      parts.push({
        k: "a",
        href: kampungInstallHref(locale, areaSlug, k.slug),
        v: kAnchors[locale],
      });
    });
    parts.push({ k: "t", v: locale === "zh" ? "。" : "." });
  }

  return {
    eyebrow: locale === "en" ? "Local brand + street" : locale === "ms" ? "Jenama + jalan setempat" : "本地品牌 + 街道",
    heading: pick(headings[locale], seed),
    parts,
  };
}

export { brandNameOf, areaNameOf };
