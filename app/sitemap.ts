import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";

const BASE = "https://www.klrenovator.com";
const LOCALES = ["en", "ms", "zh"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Helper to build alternates for a URL
  const buildAlternates = (path: string) => ({
    languages: Object.fromEntries(
      LOCALES.map((locale) => [`${locale}-MY`, `${BASE}/${locale}${path}`])
    ),
    "x-default": `${BASE}${path}`,
  });

  // Helper to build alternates for non-localized pages
  const buildCanonicalOnly = (path: string) => ({
    canonical: `${BASE}${path}`,
  });

  // ── Static Pages (non-localized) ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: buildCanonicalOnly("") },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95, alternates: buildCanonicalOnly("/services") },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.80, alternates: buildCanonicalOnly("/contact") },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.75, alternates: buildCanonicalOnly("/faq") },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.70, alternates: buildCanonicalOnly("/about") },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.70, alternates: buildCanonicalOnly("/gallery") },
  ];

  // ── Hub pages — localized (one entry per locale) ──────────────────────
  const localizedHubPages: MetadataRoute.Sitemap = [];
  (["areas", "brands", "problems", "blog"] as const).forEach((hub) => {
    LOCALES.forEach((locale) => {
      localizedHubPages.push({
        url: `${BASE}/${locale}/${hub}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: hub === "areas" ? 0.90 : 0.85,
        alternates: buildAlternates(`/${hub}`),
      });
    });
  });

  // ── Emergency Page ────────────────────────────────────────────────────
  const emergencyPage: MetadataRoute.Sitemap = [
    { url: `${BASE}/services/emergency`, lastModified: now, changeFrequency: "monthly", priority: 0.97, alternates: buildCanonicalOnly("/services/emergency") },
  ];

  // ── Service Detail Pages ──────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = siteConfig.services
    .filter((s) => s.slug !== "emergency")
    .map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.92,
      alternates: buildCanonicalOnly(`/services/${s.slug}`),
    }));

  // ── Area Pages (localized) ────────────────────────────────────────────
  const areaPages: MetadataRoute.Sitemap = [];
  siteConfig.areaPages.forEach((area) => {
    LOCALES.forEach((locale) => {
      areaPages.push({
        url: `${BASE}/${locale}/areas/${area.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.88,
        alternates: buildAlternates(`/areas/${area.slug}`),
      });
    });
  });

  // ── Brand Pages (localized) ───────────────────────────────────────────
  const brandPages: MetadataRoute.Sitemap = [];
  siteConfig.brandPages.forEach((b) => {
    LOCALES.forEach((locale) => {
      brandPages.push({
        url: `${BASE}/${locale}/brands/${b.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.82,
        alternates: buildAlternates(`/brands/${b.slug}`),
      });
    });
  });

  // ── Problem Pages (localized) ─────────────────────────────────────────
  const problemPages: MetadataRoute.Sitemap = [];
  siteConfig.problemPages.forEach((p) => {
    LOCALES.forEach((locale) => {
      problemPages.push({
        url: `${BASE}/${locale}/problems/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.80,
        alternates: buildAlternates(`/problems/${p.slug}`),
      });
    });
  });

  // ── Blog Post Pages (localized) ───────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = [];
  allPosts.forEach((p) => {
    LOCALES.forEach((locale) => {
      blogPages.push({
        url: `${BASE}/${locale}/blog/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.72,
        alternates: buildAlternates(`/blog/${p.slug}`),
      });
    });
  });

  return [
    ...staticPages,
    ...localizedHubPages,
    ...emergencyPage,
    ...servicePages,
    ...areaPages,
    ...brandPages,
    ...problemPages,
    ...blogPages,
  ];
}
