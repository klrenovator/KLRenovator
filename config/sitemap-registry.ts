// P2-05: Typed sitemap registry — derived from siteConfig / content registries
// Rather than hard-coding ~44 KB of URLs in app/sitemap.ts, build entries
// from typed domain collections (areas, brands, services, blog posts).

import { siteConfig } from "./site";

export const BASE = "https://www.klrenovator.com";

// Area hubs: generate from siteConfig.areaPages (now split to site-area-pages)
export const areaUrls = (siteConfig.areaPages ?? []).map((a: { slug: string }) => ({
  url: `${BASE}/areas/${a.slug}`,
  lastModified: new Date().toISOString(),
  changeFrequency: "weekly" as const,
  priority: 0.8,
}));

// Brand pages: from siteConfig.brandPages
export const brandUrls = (siteConfig.brandPages ?? []).map((b: { slug: string }) => ({
  url: `${BASE}/brands/${b.slug}`,
  lastModified: new Date().toISOString(),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));

// Services index + dynamic service slugs can be added when service registry is typed.
export const sitemapRegistry = {
  areaUrls,
  brandUrls,
};
