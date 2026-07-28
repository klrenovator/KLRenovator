// ─────────────────────────────────────────────────────────────────────────
// Brand × Area page matrix — SINGLE SOURCE OF TRUTH
//
// Route: /brands/[slug]/[area]  (+ /ms and /zh twins)
//
// This map used to be copy-pasted into all three locale route files, and
// the sitemap didn't reference it at all. Result: 360 real, indexable,
// prerendered brand-area pages (120 per locale) were missing from
// sitemap.xml. In Search Console those show up as "Discovered — currently
// not indexed", or simply never get crawled, because nothing links to most
// of them either.
//
// Everything now derives from this one file: `generateStaticParams()` in
// each of the three route files, and `app/sitemap.ts`. Add a brand or
// change an area list here and the pages, the sitemap and the hreflang
// cluster all stay in sync automatically.
// ─────────────────────────────────────────────────────────────────────────

import { siteConfig } from "@/config/site";

export const PRIORITY_AREAS_BY_BRAND: Record<string, string[]> = {
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

/**
 * Every (brand, area) pair that has a real prerendered page.
 *
 * A pair is only emitted when the area actually exists in
 * `siteConfig.areaPages` — the route calls `notFound()` otherwise, and a
 * sitemap entry for a 404 is a hard Search Console error
 * ("Submitted URL not found (404)").
 */
export function brandAreaPairs(): { brand: string; area: string }[] {
  const validAreas = new Set(siteConfig.areaPages.map((a) => a.slug));
  const pairs: { brand: string; area: string }[] = [];

  for (const brand of siteConfig.brandPages) {
    const priority = PRIORITY_AREAS_BY_BRAND[brand.slug] || PRIORITY_AREAS_BY_BRAND._default;
    for (const area of priority) {
      if (validAreas.has(area)) pairs.push({ brand: brand.slug, area });
    }
  }
  return pairs;
}
