import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";

const BASE = "https://www.klrenovator.com";

// ─────────────────────────────────────────────────────────────────────────
// MULTILINGUAL ROUTING — current state as of July 2026:
//   - English = default locale, lives at the ROOT path (no /en/ prefix).
//   - Bahasa Malaysia = /ms/* pages — LIVE across all page types.
//   - Mandarin        = /zh/* pages — LIVE across all page types.
//
// Coverage: 40/40 areas, 20/20 brands, 20/20 problems, 43/43 blog posts,
// 158/158 kampungs, 10/10 services, 13/13 static index pages,
// 3/3 commercial landings, 360 brand-area combos — all have real /ms/ and /zh/ twins.
//
// RULE: only add a /ms/ or /zh/ URL here once the matching real page
// exists — this is what keeps this sitemap free of dead-URL bugs.
// ─────────────────────────────────────────────────────────────────────────

const buildCanonicalOnly = (path: string) => ({
  canonical: `${BASE}${path}`,
  languages: {
    "en-MY": `${BASE}${path}`,
  },
});

// For URL families that exist in all 3 languages at the same depth.
const buildTrilingual = (path: { en: string; ms: string; zh: string }) => ({
  canonical: `${BASE}${path.en}`,
  languages: {
    "en-MY": `${BASE}${path.en}`,
    "ms-MY": `${BASE}${path.ms}`,
    "zh-MY": `${BASE}${path.zh}`,
    "x-default": `${BASE}${path.en}`,
  },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ═══════════════════════════════════════════════════════════════════════
  // 1) TRILINGUAL STATIC INDEX PAGES
  // ═══════════════════════════════════════════════════════════════════════
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage — EN only (no /ms/ or /zh/ root home pages)
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: buildCanonicalOnly("") },
    // Index pages with full trilingual twins
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/ms/services`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/zh/services`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/areas", ms: "/ms/areas", zh: "/zh/areas" }) },
    { url: `${BASE}/ms/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.83, alternates: buildTrilingual({ en: "/areas", ms: "/ms/areas", zh: "/zh/areas" }) },
    { url: `${BASE}/zh/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.83, alternates: buildTrilingual({ en: "/areas", ms: "/ms/areas", zh: "/zh/areas" }) },
    { url: `${BASE}/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/brands", ms: "/ms/brands", zh: "/zh/brands" }) },
    { url: `${BASE}/ms/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.78, alternates: buildTrilingual({ en: "/brands", ms: "/ms/brands", zh: "/zh/brands" }) },
    { url: `${BASE}/zh/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.78, alternates: buildTrilingual({ en: "/brands", ms: "/ms/brands", zh: "/zh/brands" }) },
    { url: `${BASE}/problems`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildTrilingual({ en: "/problems", ms: "/ms/problems", zh: "/zh/problems" }) },
    { url: `${BASE}/ms/problems`, lastModified: now, changeFrequency: "monthly", priority: 0.78, alternates: buildTrilingual({ en: "/problems", ms: "/ms/problems", zh: "/zh/problems" }) },
    { url: `${BASE}/zh/problems`, lastModified: now, changeFrequency: "monthly", priority: 0.78, alternates: buildTrilingual({ en: "/problems", ms: "/ms/problems", zh: "/zh/problems" }) },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: buildTrilingual({ en: "/blog", ms: "/ms/blog", zh: "/zh/blog" }) },
    { url: `${BASE}/ms/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.78, alternates: buildTrilingual({ en: "/blog", ms: "/ms/blog", zh: "/zh/blog" }) },
    { url: `${BASE}/zh/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.78, alternates: buildTrilingual({ en: "/blog", ms: "/ms/blog", zh: "/zh/blog" }) },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildTrilingual({ en: "/contact", ms: "/ms/contact", zh: "/zh/contact" }) },
    { url: `${BASE}/ms/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.73, alternates: buildTrilingual({ en: "/contact", ms: "/ms/contact", zh: "/zh/contact" }) },
    { url: `${BASE}/zh/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.73, alternates: buildTrilingual({ en: "/contact", ms: "/ms/contact", zh: "/zh/contact" }) },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.75, alternates: buildTrilingual({ en: "/faq", ms: "/ms/faq", zh: "/zh/faq" }) },
    { url: `${BASE}/ms/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.68, alternates: buildTrilingual({ en: "/faq", ms: "/ms/faq", zh: "/zh/faq" }) },
    { url: `${BASE}/zh/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.68, alternates: buildTrilingual({ en: "/faq", ms: "/ms/faq", zh: "/zh/faq" }) },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildTrilingual({ en: "/about", ms: "/ms/about", zh: "/zh/about" }) },
    { url: `${BASE}/ms/about`, lastModified: now, changeFrequency: "monthly", priority: 0.63, alternates: buildTrilingual({ en: "/about", ms: "/ms/about", zh: "/zh/about" }) },
    { url: `${BASE}/zh/about`, lastModified: now, changeFrequency: "monthly", priority: 0.63, alternates: buildTrilingual({ en: "/about", ms: "/ms/about", zh: "/zh/about" }) },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.70, alternates: buildTrilingual({ en: "/gallery", ms: "/ms/gallery", zh: "/zh/gallery" }) },
    { url: `${BASE}/ms/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.63, alternates: buildTrilingual({ en: "/gallery", ms: "/ms/gallery", zh: "/zh/gallery" }) },
    { url: `${BASE}/zh/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.63, alternates: buildTrilingual({ en: "/gallery", ms: "/ms/gallery", zh: "/zh/gallery" }) },
    { url: `${BASE}/review`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildTrilingual({ en: "/review", ms: "/ms/review", zh: "/zh/review" }) },
    { url: `${BASE}/ms/review`, lastModified: now, changeFrequency: "monthly", priority: 0.63, alternates: buildTrilingual({ en: "/review", ms: "/ms/review", zh: "/zh/review" }) },
    { url: `${BASE}/zh/review`, lastModified: now, changeFrequency: "monthly", priority: 0.63, alternates: buildTrilingual({ en: "/review", ms: "/ms/review", zh: "/zh/review" }) },
    { url: `${BASE}/near-me`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildTrilingual({ en: "/near-me", ms: "/ms/near-me", zh: "/zh/near-me" }) },
    { url: `${BASE}/ms/near-me`, lastModified: now, changeFrequency: "monthly", priority: 0.73, alternates: buildTrilingual({ en: "/near-me", ms: "/ms/near-me", zh: "/zh/near-me" }) },
    { url: `${BASE}/zh/near-me`, lastModified: now, changeFrequency: "monthly", priority: 0.73, alternates: buildTrilingual({ en: "/near-me", ms: "/ms/near-me", zh: "/zh/near-me" }) },
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // 2) TRILINGUAL COMMERCIAL LANDING PAGES
  // ═══════════════════════════════════════════════════════════════════════
  const commercialLandings: MetadataRoute.Sitemap = [
    // /cuci-aircond-kl
    { url: `${BASE}/cuci-aircond-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.96, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    { url: `${BASE}/ms/cuci-aircond-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.95, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    { url: `${BASE}/zh/cuci-aircond-kl`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    // /installation-price-malaysia
    { url: `${BASE}/installation-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.94, alternates: buildTrilingual({ en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" }) },
    { url: `${BASE}/ms/installation-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.93, alternates: buildTrilingual({ en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" }) },
    { url: `${BASE}/zh/installation-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/installation-price-malaysia", ms: "/ms/installation-price-malaysia", zh: "/zh/installation-price-malaysia" }) },
    // /aircond-service-price-malaysia
    { url: `${BASE}/aircond-service-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.94, alternates: buildTrilingual({ en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" }) },
    { url: `${BASE}/ms/aircond-service-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.96, alternates: buildTrilingual({ en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" }) },
    { url: `${BASE}/zh/aircond-service-price-malaysia`, lastModified: now, changeFrequency: "monthly", priority: 0.88, alternates: buildTrilingual({ en: "/aircond-service-price-malaysia", ms: "/ms/aircond-service-price-malaysia", zh: "/zh/aircond-service-price-malaysia" }) },
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // 3) TRILINGUAL SERVICE DETAIL PAGES (10 services × 3 languages = 30 URLs)
  // ═══════════════════════════════════════════════════════════════════════
  const allServiceSlugs = siteConfig.services.map((s) => s.slug);

  const serviceDetailPages: MetadataRoute.Sitemap = allServiceSlugs.flatMap((slug) => {
    const en = `/services/${slug}`;
    const ms = `/ms/services/${slug}`;
    const zh = `/zh/services/${slug}`;
    const freq: "weekly" | "monthly" = slug === "emergency" ? "weekly" : "monthly";
    const priorityEN = slug === "emergency" ? 0.97 : slug === "maintenance-contract" ? 0.90 : 0.92;
    const priorityLocal = slug === "emergency" ? 0.88 : slug === "maintenance-contract" ? 0.78 : 0.80;

    return [
      { url: `${BASE}${en}`, lastModified: now, changeFrequency: freq, priority: priorityEN, alternates: buildTrilingual({ en, ms, zh }) },
      { url: `${BASE}${ms}`, lastModified: now, changeFrequency: freq, priority: priorityLocal, alternates: buildTrilingual({ en, ms, zh }) },
      { url: `${BASE}${zh}`, lastModified: now, changeFrequency: freq, priority: priorityLocal, alternates: buildTrilingual({ en, ms, zh }) },
    ];
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 4) AREA PAGES — 40 areas × 3 languages
  // ═══════════════════════════════════════════════════════════════════════
  const areaPages: MetadataRoute.Sitemap = siteConfig.areaPages.flatMap((area) => {
    const en = `/areas/${area.slug}`;
    const ms = `/ms/areas/${area.slug}`;
    const zh = `/zh/areas/${area.slug}`;

    return [
      {
        url: `${BASE}${en}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.88,
        alternates: buildTrilingual({ en, ms, zh }),
      },
      {
        url: `${BASE}${ms}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.80,
        alternates: buildTrilingual({ en, ms, zh }),
      },
      {
        url: `${BASE}${zh}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.80,
        alternates: buildTrilingual({ en, ms, zh }),
      },
    ];
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 5) BRAND PAGES — 20 brands × 3 languages
  // ═══════════════════════════════════════════════════════════════════════
  const brandPages: MetadataRoute.Sitemap = siteConfig.brandPages.flatMap((b) => {
    const en = `/brands/${b.slug}`;
    const ms = `/ms/brands/${b.slug}`;
    const zh = `/zh/brands/${b.slug}`;

    return [
      {
        url: `${BASE}${en}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.82,
        alternates: buildTrilingual({ en, ms, zh }),
      },
      {
        url: `${BASE}${ms}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: buildTrilingual({ en, ms, zh }),
      },
      {
        url: `${BASE}${zh}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: buildTrilingual({ en, ms, zh }),
      },
    ];
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 5b) BRAND-AREA COMBO PAGES — 20 brands × 6 priority areas × 3 languages = 360 URLs
  // ═══════════════════════════════════════════════════════════════════════
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

  const brandAreaComboPages: MetadataRoute.Sitemap = siteConfig.brandPages.flatMap((b) => {
    const priority = PRIORITY_AREAS_BY_BRAND[b.slug] || PRIORITY_AREAS_BY_BRAND._default;
    return priority.flatMap((areaSlug) => {
      const en = `/brands/${b.slug}/${areaSlug}`;
      const ms = `/ms/brands/${b.slug}/${areaSlug}`;
      const zh = `/zh/brands/${b.slug}/${areaSlug}`;

      return [
        {
          url: `${BASE}${en}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.78,
          alternates: buildTrilingual({ en, ms, zh }),
        },
        {
          url: `${BASE}${ms}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.70,
          alternates: buildTrilingual({ en, ms, zh }),
        },
        {
          url: `${BASE}${zh}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.70,
          alternates: buildTrilingual({ en, ms, zh }),
        },
      ];
    });
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 6) PROBLEM PAGES — 20 problems × 3 languages
  // ═══════════════════════════════════════════════════════════════════════
  const problemPages: MetadataRoute.Sitemap = siteConfig.problemPages.flatMap((p) => {
    const en = `/problems/${p.slug}`;
    const ms = `/ms/problems/${p.slug}`;
    const zh = `/zh/problems/${p.slug}`;

    return [
      {
        url: `${BASE}${en}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.80,
        alternates: buildTrilingual({ en, ms, zh }),
      },
      {
        url: `${BASE}${ms}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.73,
        alternates: buildTrilingual({ en, ms, zh }),
      },
      {
        url: `${BASE}${zh}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.73,
        alternates: buildTrilingual({ en, ms, zh }),
      },
    ];
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 7) BLOG POST PAGES — 43 posts × 3 languages
  // ═══════════════════════════════════════════════════════════════════════
  const blogPages: MetadataRoute.Sitemap = allPosts.flatMap((p) => {
    const en = `/blog/${p.slug}`;
    const ms = `/ms/blog/${p.slug}`;
    const zh = `/zh/blog/${p.slug}`;
    const hasMS = !!p.contentMS;
    const hasZH = !!p.contentZH;

    return [
      {
        url: `${BASE}${en}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.72,
        alternates: buildTrilingual({ en, ms, zh }),
      },
      ...(hasMS
        ? [
            {
              url: `${BASE}${ms}` as const,
              lastModified: now,
              changeFrequency: "monthly" as const,
              priority: 0.65,
              alternates: buildTrilingual({ en, ms, zh }),
            },
          ]
        : []),
      ...(hasZH
        ? [
            {
              url: `${BASE}${zh}` as const,
              lastModified: now,
              changeFrequency: "monthly" as const,
              priority: 0.65,
              alternates: buildTrilingual({ en, ms, zh }),
            },
          ]
        : []),
    ];
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 8) KAMPUNG / NEIGHBOURHOOD PAGES — 158 kampungs × 3 languages
  // ═══════════════════════════════════════════════════════════════════════
  const kampungPages: MetadataRoute.Sitemap = siteConfig.kampungPages.flatMap((k) => {
    const en = `/areas/${k.parentSlug}/${k.slug}`;
    const ms = `/ms/areas/${k.parentSlug}/${k.slug}`;
    const zh = `/zh/areas/${k.parentSlug}/${k.slug}`;
    const hasMS = !!k.descriptionMS;
    const hasZH = !!k.descriptionZH;

    return [
      {
        url: `${BASE}${en}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.70,
        alternates: buildTrilingual({ en, ms, zh }),
      },
      ...(hasMS
        ? [
            {
              url: `${BASE}${ms}` as const,
              lastModified: now,
              changeFrequency: "monthly" as const,
              priority: 0.65,
              alternates: buildTrilingual({ en, ms, zh }),
            },
          ]
        : []),
      ...(hasZH
        ? [
            {
              url: `${BASE}${zh}` as const,
              lastModified: now,
              changeFrequency: "monthly" as const,
              priority: 0.65,
              alternates: buildTrilingual({ en, ms, zh }),
            },
          ]
        : []),
    ];
  });

  return [
    ...staticPages,
    ...commercialLandings,
    ...serviceDetailPages,
    ...areaPages,
    ...brandPages,
    ...brandAreaComboPages,
    ...problemPages,
    ...blogPages,
    ...kampungPages,
  ];
}
