import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";

const BASE = "https://www.klrenovator.com";

// ─────────────────────────────────────────────────────────────────────────
// MULTILINGUAL ROUTING PLAN (in progress — being built in batches):
//   - English = default locale, lives at the ROOT path (no /en/ prefix).
//     This protects the SEO equity already earned on the current live URLs.
//   - Bahasa Malaysia = /ms/... (NOT YET BUILT — being added batch by batch)
//   - Mandarin        = /zh/... (NOT YET BUILT — being added batch by batch)
//
// RULE FOR THIS FILE: only add a /ms/ or /zh/ URL here ONCE the matching
// real page actually exists and has been deployed. Do not add locale URLs
// "in advance" — that is exactly what caused the ~290 dead-URL bug this
// rewrite fixes. As each batch of /ms/ or /zh/ pages ships, add the
// matching block back into this file in the same pattern as the English
// blocks below, and add a real `languages` hreflang block to that page's
// `generateMetadata()` pointing at all 3 real URLs.
// ─────────────────────────────────────────────────────────────────────────

const buildCanonicalOnly = (path: string) => ({
  canonical: `${BASE}${path}`,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static Pages ─────────────────────────────────────────────────────
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

  // ── Service Detail Pages (English, real, live) ──────────────────────
  const servicePages: MetadataRoute.Sitemap = siteConfig.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.92,
      alternates: buildCanonicalOnly(`/services/${s.slug}`),
    }));

  // ── Area Pages (English, real, live) ────────────────────────────────
  const areaPages: MetadataRoute.Sitemap = siteConfig.areaPages.map((area) => ({
    url: `${BASE}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.88,
    alternates: buildCanonicalOnly(`/areas/${area.slug}`),
  }));

  // ── Area Pages — /ms/ and /zh/ — ONLY for areas with real translated
  // pages live (i.e. faqsBM / faqsZH populated in config/site.ts). As more
  // areas get their translated FAQ content written, they appear here
  // automatically — no manual list to maintain. (Pilot batch shipped
  // 19 June 2026: 11 of 38 areas. See KLRenovator-PROJECT-STATUS-HANDOFF.md.)
  const msAreaPages: MetadataRoute.Sitemap = siteConfig.areaPages
    .filter((a: any) => a.faqsBM && a.faqsBM.length > 0)
    .map((area) => ({
      url: `${BASE}/ms/areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.80,
      alternates: buildCanonicalOnly(`/ms/areas/${area.slug}`),
    }));

  const zhAreaPages: MetadataRoute.Sitemap = siteConfig.areaPages
    .filter((a: any) => a.faqsZH && a.faqsZH.length > 0)
    .map((area) => ({
      url: `${BASE}/zh/areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.80,
      alternates: buildCanonicalOnly(`/zh/areas/${area.slug}`),
    }));

  // ── Brand Pages (English, real, live) ───────────────────────────────
  const brandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.82,
    alternates: buildCanonicalOnly(`/brands/${b.slug}`),
  }));

  // ── Brand Pages — /ms/ and /zh/ — all 15 brands have full translated
  // data, so every brand gets a page (shipped 19 June 2026, no filter needed).
  const msBrandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/ms/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: buildCanonicalOnly(`/ms/brands/${b.slug}`),
  }));
  const zhBrandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/zh/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: buildCanonicalOnly(`/zh/brands/${b.slug}`),
  }));

  // ── Problem Pages (English, real, live) ─────────────────────────────
  const problemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.80,
    alternates: buildCanonicalOnly(`/problems/${p.slug}`),
  }));

  // ── Problem Pages — /ms/ and /zh/ — all 20 problems have full
  // translated data, so every problem gets a page (shipped 19 June 2026).
  const msProblemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/ms/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.73,
    alternates: buildCanonicalOnly(`/ms/problems/${p.slug}`),
  }));
  const zhProblemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/zh/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.73,
    alternates: buildCanonicalOnly(`/zh/problems/${p.slug}`),
  }));

  // ── Blog Post Pages (English, real, live) ───────────────────────────
  const blogPages: MetadataRoute.Sitemap = allPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
    alternates: buildCanonicalOnly(`/blog/${p.slug}`),
  }));

  // ── /ms/ and /zh/ pages get appended here, batch by batch, as they ship ──

  // ── Kampung/Neighbourhood Pages (English, real, live) — BATCH 1: Cheras
  // cluster, shipped 19 June 2026. See KLRenovator-KAMPUNG-MASTER-PLAN.md.
  const kampungPages: MetadataRoute.Sitemap = (siteConfig as any).kampungPages.map((k: any) => ({
    url: `${BASE}/areas/${k.parentSlug}/${k.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.70,
    alternates: buildCanonicalOnly(`/areas/${k.parentSlug}/${k.slug}`),
  }));
  const msKampungPages: MetadataRoute.Sitemap = (siteConfig as any).kampungPages
    .filter((k: any) => k.descriptionMS)
    .map((k: any) => ({
      url: `${BASE}/ms/areas/${k.parentSlug}/${k.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildCanonicalOnly(`/ms/areas/${k.parentSlug}/${k.slug}`),
    }));
  const zhKampungPages: MetadataRoute.Sitemap = (siteConfig as any).kampungPages
    .filter((k: any) => k.descriptionZH)
    .map((k: any) => ({
      url: `${BASE}/zh/areas/${k.parentSlug}/${k.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: buildCanonicalOnly(`/zh/areas/${k.parentSlug}/${k.slug}`),
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
