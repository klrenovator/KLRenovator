import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";

const BASE = "https://www.klrenovator.com";

// Round 14 / 20B.13 sitemap hygiene: keep <lastmod> stable and tied to
// the latest content deployment instead of changing on every build.
// Round 23 / 20F.50 — updated 2026-07-07 for Cuci Aircond KL landing launch.
const SITEMAP_LAST_MODIFIED = new Date("2026-07-07T00:00:00.000Z");

// ─────────────────────────────────────────────────────────────────────────
// MULTILINGUAL ROUTING — audited 2026-07-06 (Round 14 / 20B.13):
//   - English = default locale, lives at the ROOT path (no /en/ prefix).
//   - Bahasa Malaysia = /ms/* where real pages exist.
//   - Mandarin        = /zh/* where real pages exist.
//   - Service indexes + service detail pages, blog indexes + blog posts,
//     contact, FAQ, about, gallery, areas, brands, problems and kampung
//     pages expose real trilingual URL entries with hreflang alternates.
//   - Internal noindex conversion-only review pages are intentionally
//     EXCLUDED from the sitemap to prevent sitemap/noindex conflict.
//
// RULE: only add /ms/ or /zh/ URLs here once the matching real page exists.
// This keeps the sitemap free of dead URLs and crawl-budget waste.
// ─────────────────────────────────────────────────────────────────────────

const buildCanonicalOnly = (path: string) => ({
  canonical: `${BASE}${path}`,
  languages: {
    "en-MY": `${BASE}${path}`,
  },
});

// For URL families that exist in all 3 languages at the same depth
// (areas, brands, problems, and their kampung children), this builds the
// real per-language alternates map so the sitemap itself — not just each
// page's own <head> tags — tells Google which URLs are translations of
// each other.
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
  const now = SITEMAP_LAST_MODIFIED;

  // ── Static / Index Pages — only URLs with real route files are listed.
  // Review pages are noindex conversion-only routes, so they are excluded.
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: buildCanonicalOnly("") },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/ms/services`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/zh/services`, lastModified: now, changeFrequency: "weekly", priority: 0.88, alternates: buildTrilingual({ en: "/services", ms: "/ms/services", zh: "/zh/services" }) },
    { url: `${BASE}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildCanonicalOnly("/areas") },
    { url: `${BASE}/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildCanonicalOnly("/brands") },
    { url: `${BASE}/problems`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildCanonicalOnly("/problems") },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: buildTrilingual({ en: "/blog", ms: "/ms/blog", zh: "/zh/blog" }) },
    { url: `${BASE}/ms/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.78, alternates: buildTrilingual({ en: "/blog", ms: "/ms/blog", zh: "/zh/blog" }) },
    { url: `${BASE}/zh/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.78, alternates: buildTrilingual({ en: "/blog", ms: "/ms/blog", zh: "/zh/blog" }) },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildTrilingual({ en: "/contact", ms: "/ms/contact", zh: "/zh/contact" }) },
    { url: `${BASE}/ms/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildTrilingual({ en: "/contact", ms: "/ms/contact", zh: "/zh/contact" }) },
    { url: `${BASE}/zh/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildTrilingual({ en: "/contact", ms: "/ms/contact", zh: "/zh/contact" }) },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.75, alternates: buildTrilingual({ en: "/faq", ms: "/ms/faq", zh: "/zh/faq" }) },
    { url: `${BASE}/ms/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.68, alternates: buildTrilingual({ en: "/faq", ms: "/ms/faq", zh: "/zh/faq" }) },
    { url: `${BASE}/zh/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.68, alternates: buildTrilingual({ en: "/faq", ms: "/ms/faq", zh: "/zh/faq" }) },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildTrilingual({ en: "/about", ms: "/ms/about", zh: "/zh/about" }) },
    { url: `${BASE}/ms/about`, lastModified: now, changeFrequency: "monthly", priority: 0.63, alternates: buildTrilingual({ en: "/about", ms: "/ms/about", zh: "/zh/about" }) },
    { url: `${BASE}/zh/about`, lastModified: now, changeFrequency: "monthly", priority: 0.63, alternates: buildTrilingual({ en: "/about", ms: "/ms/about", zh: "/zh/about" }) },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.70, alternates: buildTrilingual({ en: "/gallery", ms: "/ms/gallery", zh: "/zh/gallery" }) },
    { url: `${BASE}/ms/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.63, alternates: buildTrilingual({ en: "/gallery", ms: "/ms/gallery", zh: "/zh/gallery" }) },
    { url: `${BASE}/zh/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.63, alternates: buildTrilingual({ en: "/gallery", ms: "/ms/gallery", zh: "/zh/gallery" }) },
    { url: `${BASE}/near-me`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildCanonicalOnly("/near-me") },
    // ── 20F.50 Cuci Aircond KL dedicated landing — trilingual ──────────
    { url: `${BASE}/cuci-aircond-kl`, lastModified: now, changeFrequency: "weekly", priority: 0.96, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    { url: `${BASE}/ms/cuci-aircond-kl`, lastModified: now, changeFrequency: "weekly", priority: 0.95, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
    { url: `${BASE}/zh/cuci-aircond-kl`, lastModified: now, changeFrequency: "weekly", priority: 0.90, alternates: buildTrilingual({ en: "/cuci-aircond-kl", ms: "/ms/cuci-aircond-kl", zh: "/zh/cuci-aircond-kl" }) },
  ];

  // ── Emergency Service Page — trilingual canonical entries ───────────
  const emergencyPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/services/emergency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.97,
      alternates: buildTrilingual({ en: "/services/emergency", ms: "/ms/services/emergency", zh: "/zh/services/emergency" }),
    },
  ];

  const msEmergencyPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/ms/services/emergency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.90,
      alternates: buildTrilingual({ en: "/services/emergency", ms: "/ms/services/emergency", zh: "/zh/services/emergency" }),
    },
  ];

  const zhEmergencyPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/zh/services/emergency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.90,
      alternates: buildTrilingual({ en: "/services/emergency", ms: "/ms/services/emergency", zh: "/zh/services/emergency" }),
    },
  ];

  // ── Service Detail Pages — EN/MS/ZH canonical entries ───────────────
  const servicePages: MetadataRoute.Sitemap = siteConfig.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.92,
      alternates: buildTrilingual({ en: `/services/${s.slug}`, ms: `/ms/services/${s.slug}`, zh: `/zh/services/${s.slug}` }),
    }));

  const msServicePages: MetadataRoute.Sitemap = siteConfig.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => ({
      url: `${BASE}/ms/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.84,
      alternates: buildTrilingual({ en: `/services/${s.slug}`, ms: `/ms/services/${s.slug}`, zh: `/zh/services/${s.slug}` }),
    }));

  const zhServicePages: MetadataRoute.Sitemap = siteConfig.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => ({
      url: `${BASE}/zh/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.84,
      alternates: buildTrilingual({ en: `/services/${s.slug}`, ms: `/ms/services/${s.slug}`, zh: `/zh/services/${s.slug}` }),
    }));

  // ── Area Pages — all configured areas with real /ms/ and /zh/ twins ──
  const areaPages: MetadataRoute.Sitemap = siteConfig.areaPages.map((area) => ({
    url: `${BASE}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.88,
    alternates: buildTrilingual({
      en: `/areas/${area.slug}`,
      ms: `/ms/areas/${area.slug}`,
      zh: `/zh/areas/${area.slug}`,
    }),
  }));

  const msAreaPages: MetadataRoute.Sitemap = siteConfig.areaPages
    .filter((a) => a.faqsBM && a.faqsBM.length > 0)
    .map((area) => ({
      url: `${BASE}/ms/areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.80,
      alternates: buildTrilingual({
        en: `/areas/${area.slug}`,
        ms: `/ms/areas/${area.slug}`,
        zh: `/zh/areas/${area.slug}`,
      }),
    }));

  const zhAreaPages: MetadataRoute.Sitemap = siteConfig.areaPages
    .filter((a) => a.faqsZH && a.faqsZH.length > 0)
    .map((area) => ({
      url: `${BASE}/zh/areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.80,
      alternates: buildTrilingual({
        en: `/areas/${area.slug}`,
        ms: `/ms/areas/${area.slug}`,
        zh: `/zh/areas/${area.slug}`,
      }),
    }));

  // ── Brand Pages — all configured brands with real /ms/ and /zh/ twins
  const brandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.82,
    alternates: buildTrilingual({
      en: `/brands/${b.slug}`,
      ms: `/ms/brands/${b.slug}`,
      zh: `/zh/brands/${b.slug}`,
    }),
  }));

  const msBrandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/ms/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: buildTrilingual({
      en: `/brands/${b.slug}`,
      ms: `/ms/brands/${b.slug}`,
      zh: `/zh/brands/${b.slug}`,
    }),
  }));
  const zhBrandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/zh/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: buildTrilingual({
      en: `/brands/${b.slug}`,
      ms: `/ms/brands/${b.slug}`,
      zh: `/zh/brands/${b.slug}`,
    }),
  }));

  // ── Problem Pages — all configured problems with real /ms/ and /zh/ twins
  const problemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.80,
    alternates: buildTrilingual({
      en: `/problems/${p.slug}`,
      ms: `/ms/problems/${p.slug}`,
      zh: `/zh/problems/${p.slug}`,
    }),
  }));

  const msProblemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/ms/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.73,
    alternates: buildTrilingual({
      en: `/problems/${p.slug}`,
      ms: `/ms/problems/${p.slug}`,
      zh: `/zh/problems/${p.slug}`,
    }),
  }));
  const zhProblemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/zh/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.73,
    alternates: buildTrilingual({
      en: `/problems/${p.slug}`,
      ms: `/ms/problems/${p.slug}`,
      zh: `/zh/problems/${p.slug}`,
    }),
  }));

  // ── Blog Post Pages — all configured posts with real /ms/blog and /zh/blog
  // twins where contentMS/contentZH exists in config/blog-posts.ts.
  const blogPages: MetadataRoute.Sitemap = allPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
    alternates: buildTrilingual({
      en: `/blog/${p.slug}`,
      ms: `/ms/blog/${p.slug}`,
      zh: `/zh/blog/${p.slug}`,
    }),
  }));

  const msBlogPages: MetadataRoute.Sitemap = allPosts
    .filter((p) => p.contentMS)
    .map((p) => ({
      url: `${BASE}/ms/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildTrilingual({
        en: `/blog/${p.slug}`,
        ms: `/ms/blog/${p.slug}`,
        zh: `/zh/blog/${p.slug}`,
      }),
    }));

  const zhBlogPages: MetadataRoute.Sitemap = allPosts
    .filter((p) => p.contentZH)
    .map((p) => ({
      url: `${BASE}/zh/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildTrilingual({
        en: `/blog/${p.slug}`,
        ms: `/ms/blog/${p.slug}`,
        zh: `/zh/blog/${p.slug}`,
      }),
    }));

  // ── Kampung/Neighbourhood Pages — nested under their parent area, with
  // real /ms/ and /zh/ twins wherever descriptionMS/descriptionZH exists.
  // New batches need zero changes here — they appear automatically the
  // moment they're added to config/site.ts.
  const kampungPages: MetadataRoute.Sitemap = siteConfig.kampungPages.map((k) => ({
    url: `${BASE}/areas/${k.parentSlug}/${k.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.70,
    alternates: buildTrilingual({
      en: `/areas/${k.parentSlug}/${k.slug}`,
      ms: `/ms/areas/${k.parentSlug}/${k.slug}`,
      zh: `/zh/areas/${k.parentSlug}/${k.slug}`,
    }),
  }));
  const msKampungPages: MetadataRoute.Sitemap = siteConfig.kampungPages
    .filter((k) => k.descriptionMS)
    .map((k) => ({
      url: `${BASE}/ms/areas/${k.parentSlug}/${k.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildTrilingual({
        en: `/areas/${k.parentSlug}/${k.slug}`,
        ms: `/ms/areas/${k.parentSlug}/${k.slug}`,
        zh: `/zh/areas/${k.parentSlug}/${k.slug}`,
      }),
    }));
  const zhKampungPages: MetadataRoute.Sitemap = siteConfig.kampungPages
    .filter((k) => k.descriptionZH)
    .map((k) => ({
      url: `${BASE}/zh/areas/${k.parentSlug}/${k.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildTrilingual({
        en: `/areas/${k.parentSlug}/${k.slug}`,
        ms: `/ms/areas/${k.parentSlug}/${k.slug}`,
        zh: `/zh/areas/${k.parentSlug}/${k.slug}`,
      }),
    }));

  return [
    ...staticPages,
    ...emergencyPage,
    ...msEmergencyPage,
    ...zhEmergencyPage,
    ...servicePages,
    ...msServicePages,
    ...zhServicePages,
    ...areaPages,
    ...msAreaPages,
    ...zhAreaPages,
    ...kampungPages,
    ...msKampungPages,
    ...zhKampungPages,
    ...brandPages,
    ...msBrandPages,
    ...zhBrandPages,
    ...problemPages,
    ...msProblemPages,
    ...zhProblemPages,
    ...blogPages,
    ...msBlogPages,
    ...zhBlogPages,
  ];
}
