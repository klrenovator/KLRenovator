import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPosts } from "@/config/blog-posts";

const BASE = "https://www.klrenovator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static Pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`,      lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/areas`,         lastModified: now, changeFrequency: "monthly", priority: 0.90 },
    { url: `${BASE}/brands`,        lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE}/problems`,      lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/contact`,       lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/faq`,           lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE}/gallery`,       lastModified: now, changeFrequency: "weekly",  priority: 0.70 },
  ];

  // ── Service Detail Pages ──────────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = siteConfig.services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.92,
  }));

  // ── Area Pages ────────────────────────────────────────────────────────────
  const areaPages: MetadataRoute.Sitemap = siteConfig.areaPages.map((area) => ({
    url: `${BASE}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  // ── Brand Pages ───────────────────────────────────────────────────────────
  const brandPages: MetadataRoute.Sitemap = siteConfig.brandPages.map((b) => ({
    url: `${BASE}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  // ── Problem Pages ─────────────────────────────────────────────────────────
  const problemPages: MetadataRoute.Sitemap = siteConfig.problemPages.map((p) => ({
    url: `${BASE}/problems/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));

  // ── Blog Post Pages ───────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = allPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...areaPages,
    ...brandPages,
    ...problemPages,
    ...blogPages,
  ];
}
