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

/**
 * Every real job photograph in `/public/hero`. The filename registry is
 * shared with the body-image selector so OG cards and rendered content draw
 * from the same verified 157-photo pool.
 */
import { HERO_JOB_PHOTO_FILES } from "@/config/place-job-photos";

export const HERO_IMAGE_POOL: readonly string[] = HERO_JOB_PHOTO_FILES.map(
  (file) => `${file}.webp`,
);

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
