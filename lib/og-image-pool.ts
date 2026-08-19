/**
 * Deterministic OG image assignment for programmatic pages.
 *
 * Problem this solves
 * -------------------
 * 971 pages shipped no `og:image` at all (all 474 kampung pages, all 360
 * brand-area pages, 120 area pages), and the kampung-installation pages
 * pointed `og:image` at `/logo/image.png` — a transparent logo, not a
 * 1200×630 social card. In a WhatsApp-first market that means a link
 * preview with no picture on the highest-intent pages on the site.
 *
 * The repo already owns 157 real job photos in /public/hero. This module
 * maps any page key onto one of them deterministically, so:
 *   - the same URL always gets the same photo (stable across rebuilds,
 *     no cache-busting, no CLS in the preview card),
 *   - photos spread evenly across pages instead of one image everywhere,
 *   - where possible the photo actually matches the page's brand/area.
 *
 * These are genuine photos of the company's own work, so using them as
 * social cards is accurate — not stock imagery.
 */

/** Real job photos in /public/hero, filtered to the ones that parse cleanly. */
export const HERO_IMAGE_POOL: readonly string[] = [
  "acson-aircond-basic-servicing-kuala-lumpur-5.webp",
  "aux-aircond-basic-servicing-shah-alam-53.webp",
  "daikin-aircond-basic-servicing-ampang-140.webp",
  "generic-aircond-basic-servicing-ampang-104.webp",
  "hisense-aircond-basic-servicing-ampang-113.webp",
  "isonic-aircond-ceiling-cassette-service-puchong-44.webp",
  "lg-aircond-basic-servicing-subang-jaya-29.webp",
  "midea-aircond-basic-servicing-petaling-jaya-17.webp",
  "mitsubishi-aircond-chemical-overhaul-petaling-jaya-14.webp",
  "panasonic-aircond-ceiling-cassette-service-klang-68.webp",
  "samsung-aircond-basic-servicing-puchong-41.webp",
  "sharp-aircond-basic-servicing-cheras-115.webp",
  "tcl-aircond-basic-servicing-klang-65.webp",
  "toshiba-aircond-gas-topup-rawang-141.webp",
  "york-aircond-chemical-overhaul-subang-jaya-26.webp",
  "acson-aircond-chemical-overhaul-puchong-38.webp",
  "aux-aircond-ceiling-cassette-service-petaling-jaya-20.webp",
  "daikin-aircond-ceiling-cassette-service-shah-alam-56.webp",
  "hisense-aircond-chemical-wash-klang-111.webp",
  "isonic-aircond-compressor-replacement-petaling-jaya-22.webp",
  "lg-aircond-chemical-overhaul-klang-62.webp",
  "midea-aircond-chemical-overhaul-shah-alam-50.webp",
];

/** FNV-1a — small, stable, and not tied to any Node/V8 internals. */
function hashKey(key: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/**
 * Pick a stable hero photo for a page.
 *
 * @param key   Stable page identifier — use the route or slug, NOT anything
 *              that changes between builds.
 * @param hints Optional tokens (brand slug, area slug). If a photo filename
 *              matches a hint we prefer it, so a Daikin page in PJ gets an
 *              actual Daikin/PJ photo where one exists.
 */
export function pickHeroImage(key: string, hints: string[] = []): string {
  const normalisedHints = hints
    .filter(Boolean)
    .map((h) => h.toLowerCase().replace(/\s+/g, "-"));

  if (normalisedHints.length > 0) {
    const matches = HERO_IMAGE_POOL.filter((file) =>
      normalisedHints.some((hint) => file.includes(hint)),
    );
    if (matches.length > 0) {
      return `/hero/${matches[hashKey(key) % matches.length]}`;
    }
  }

  return `/hero/${HERO_IMAGE_POOL[hashKey(key) % HERO_IMAGE_POOL.length]}`;
}

/**
 * Full Next.js `openGraph.images` entry. 1200×630 is the ratio WhatsApp,
 * Facebook, LinkedIn and X all crop against.
 */
export function buildOgImage(
  key: string,
  alt: string,
  hints: string[] = [],
): { url: string; width: number; height: number; alt: string } {
  return { url: pickHeroImage(key, hints), width: 1200, height: 630, alt };
}
