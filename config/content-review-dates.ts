/**
 * Content review dates — freshness signals for search and AI answer engines.
 *
 * Why this exists
 * ---------------
 * The Part 2 audit found 1,824 of 2,169 pages (84%) carried NO freshness
 * signal — no `dateModified`, no visible "last updated". Blog and service
 * pages were dated; the 1,428 area / kampung / brand-area pages were not.
 *
 * Freshness is a direct ranking input for Google and a strong citation
 * filter for ChatGPT, Claude, Gemini and Perplexity: undated pages are
 * treated as unverifiable and rarely quoted.
 *
 * Why these are constants rather than `new Date()`
 * ------------------------------------------------
 * Publishing today's date on every build would be a lie — the content did
 * not change, only the deploy did. Google's structured-data spam policy
 * treats auto-bumped `dateModified` as deceptive, and it destroys the value
 * of the signal. These dates are seeded from the real last-modification
 * date of the underlying content files (`git log -1 --format=%cs -- <file>`)
 * and should be bumped BY HAND when the corresponding content is genuinely
 * revised.
 *
 * How to update
 * -------------
 * When you meaningfully revise a content collection, set its date here:
 *
 *   git log -1 --format=%cs -- config/site/areas.ts
 *
 * ISO 8601 (YYYY-MM-DD), matching the convention in config/blog-posts.ts.
 */

export const CONTENT_REVIEW_DATES = {
  /** config/site/areas.ts — the 40 main area landing pages. */
  areas: "2026-08-18",
  /** config/site/kampungs.ts — the 158 neighbourhood/kampung pages. */
  kampungs: "2026-08-19",
  /** config/site/brands.ts + brand-area combos — 20 brands × priority areas. */
  brands: "2026-08-19",
  /** config/site/problems.ts — the 20 problem/diagnostic pages. */
  problems: "2026-08-19",
  /** config/site/services.ts + services-data.ts — the 10 service pages. */
  services: "2026-08-18",
} as const;

export type ContentCollection = keyof typeof CONTENT_REVIEW_DATES;

/** ISO date for a collection, for use in `dateModified`. */
export function reviewDateFor(collection: ContentCollection): string {
  return CONTENT_REVIEW_DATES[collection];
}

/**
 * Human-readable review date, e.g. "18 August 2026" / "18 Ogos 2026" /
 * "2026年8月18日". Used for the visible "last reviewed" line — Google wants
 * the visible date and the structured date to agree.
 */
export function reviewDateDisplay(
  collection: ContentCollection,
  locale: "en" | "ms" | "zh" = "en",
): string {
  const [y, m, d] = CONTENT_REVIEW_DATES[collection].split("-");
  const day = Number(d);
  const monthIdx = Number(m) - 1;

  if (locale === "zh") return `${y}年${Number(m)}月${day}日`;

  const months =
    locale === "ms"
      ? ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"]
      : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return `${day} ${months[monthIdx]} ${y}`;
}
