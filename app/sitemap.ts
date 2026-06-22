import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";

const BASE = "https://www.klrenovator.com";

// ─────────────────────────────────────────────────────────────────────────
// MULTILINGUAL ROUTING — current state as of June 2026:
//   - English = default locale, lives at the ROOT path (no /en/ prefix).
//   - Bahasa Malaysia = /ms/areas, /ms/brands, /ms/problems — LIVE.
//   - Mandarin        = /zh/areas, /zh/brands, /zh/problems — LIVE.
//   - Blog posts: English only — BM/ZH translation not started yet.
//   - Static pages (home, about, contact, gallery, faq, services): English only.
//
// Coverage: 39/39 areas, 18/18 brands, 20/20 problems all have real /ms/
// and /zh/ pages. 116 kampung/neighbourhood pages also have real /ms/
// and /zh/ twins wherever descriptionMS/descriptionZH exists in the data
// (currently all 116). RULE: only add a /ms/ or /zh/ URL here once the
// matching real page exists — this is what keeps this sitemap free of the
// dead-URL bug that used to submit ~290 404s to Google.
// ─────────────────────────────────────────────────────────────────────────

const buildCanonicalOnly = (path: string) => ({
  canonical: `${BASE}${path}`,
});

// For URL families that exist in all 3 languages at the same depth
// (areas, brands, problems, and their kampung children), this builds the
// real per-language alternates map so the sitemap itself — not just each
// page's own <head> tags — tells Google which URLs are translations of
// each other.
const buildTrilingual = (path: string) => ({
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

  // ── Static Pages (English only — no /ms/ or /zh/ twin yet) ──────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: buildCanonicalOnly("") },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95, alternates: buildCanonicalOnly("/services") },
    { url: `${BASE}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.90, alternates: buildCanonicalOnly("/areas") },
    { url: `${BASE}/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildCanonicalOnly("/brands") },
    { url: `${BASE}/problems`, lastModified: now, changeFrequency: "monthly", priority: 0.85, alternates: buildCanonicalOnly("/problems") },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: buildCanonicalOnly("/blog") },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildCanonicalOnly("/contact") },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.75, alternates: buildCanonicalOnly("/faq") },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildCanonicalOnly("/about") },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.70, alternates: buildCanonicalOnly("/gallery") },
  ];

  // ── Emergency Page ───────────────────────────────────────────────────
  const emergencyPage: MetadataRoute.Sitemap = [
    { url: `${BASE}/services/emergency`, lastModified: now, changeFrequency: "monthly", priority: 0.97, alternates: buildCanonicalOnly("/services/emergency") },
  ];

  // ── Service Detail Pages (English only — no /ms/ or /zh/ twin yet) ──
  const servicePages: MetadataRoute.Sitemap = siteConfig.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.92,
      alternates: buildCanonicalOnly(`/services/${s.slug}`),
    }));

  // ── Area Pages — all 39 areas have real /ms/ and /zh/ twins ─────────
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

  // ── Brand Pages — all 18 brands have real /ms/ and /zh/ twins ───────
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

  // ── Problem Pages — all 20 problems have real /ms/ and /zh/ twins ───
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

  // ── Blog Post Pages (English only — BM/ZH translation not started) ──
  const blogPages: MetadataRoute.Sitemap = allPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
    alternates: buildCanonicalOnly(`/blog/${p.slug}`),
  }));

  // ── Kampung/Neighbourhood Pages — 116 pages nested under their parent
  // area, real /ms/ and /zh/ twins wherever descriptionMS/descriptionZH
  // exists (currently all 116). New batches need zero changes here — they
  // appear automatically the moment they're added to config/site.ts.
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
    ...servicePages,
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
  ];
}
