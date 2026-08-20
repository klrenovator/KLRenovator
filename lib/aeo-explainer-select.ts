/**
 * Pick the definition + comparison blocks that genuinely belong on a page.
 *
 * The rule is deliberately restrictive: a glossary term is only ever shown on
 * a page whose own body already discusses that term, and a comparison table
 * only appears when BOTH sides of the comparison are discussed. That keeps
 * these blocks editorial rather than boilerplate — a drainage post gets the
 * drain-pipe and blower-wheel answers, an energy post gets MEPS and inverter,
 * and neither gets the other's copy.
 *
 * Selection is deterministic (hashed from the page seed), so the same page
 * always renders the same blocks across builds — no `Math.random`, no
 * build-to-build content churn, and no two neighbouring pages picking the
 * identical trio just because it happens to be first in the array.
 */

import {
  COMPARISON_QUESTION_VARIANTS,
  COMPARISON_SETS,
  GLOSSARY_TERMS,
  TERM_QUESTION_VARIANTS,
  type ComparisonSet,
  type ExplainerLocale,
  type GlossaryTerm,
} from "@/config/aeo-explainers";

export type SelectedExplainers = {
  terms: GlossaryTerm[];
  comparison: ComparisonSet | null;
};

export type ExplainerBundle = Record<ExplainerLocale, SelectedExplainers>;

const LOCALES: ExplainerLocale[] = ["en", "ms", "zh"];

/** Strip markup + entities and lower-case, so matching sees plain prose. */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

/** Stable 32-bit string hash — same input, same output, every build. */
function hashText(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash >>> 0;
}

function matchesAny(text: string, fragments: string[]): boolean {
  return fragments.some((fragment) => text.includes(fragment));
}

/**
 * Order candidates deterministically but differently per page, so two posts
 * that mention the same five terms do not both publish the same first three.
 */
function rotate<T extends { id: string }>(items: T[], seed: string): T[] {
  return [...items].sort(
    (a, b) => hashText(`${seed}:${a.id}`) - hashText(`${seed}:${b.id}`),
  );
}

export function selectExplainersForLocale({
  html,
  locale,
  seed,
  maxTerms = 3,
}: {
  html: string;
  locale: ExplainerLocale;
  seed: string;
  maxTerms?: number;
}): SelectedExplainers {
  const text = toPlainText(html);
  if (!text) return { terms: [], comparison: null };

  const candidates = GLOSSARY_TERMS.filter((term) => {
    if (!matchesAny(text, term.match[locale])) return false;
    // The page already answers this question in its own words — don't repeat it.
    const phrasings = [
      term.question[locale],
      ...(TERM_QUESTION_VARIANTS[term.id]?.[locale] || []),
    ];
    return !phrasings.some((phrasing) => text.includes(phrasing.toLowerCase()));
  });

  const terms = rotate(candidates, `${seed}|${locale}`).slice(0, maxTerms);

  const comparisons = COMPARISON_SETS.filter((set) => {
    if (!matchesAny(text, set.matchA[locale])) return false;
    if (!matchesAny(text, set.matchB[locale])) return false;
    const phrasings = [
      set.question[locale],
      ...(COMPARISON_QUESTION_VARIANTS[set.id]?.[locale] || []),
    ];
    return !phrasings.some((phrasing) => text.includes(phrasing.toLowerCase()));
  });

  const comparison = rotate(comparisons, `${seed}|cmp|${locale}`)[0] || null;

  return { terms, comparison };
}

/**
 * Build all three locales at once.
 *
 * The unprefixed `/blog/[slug]` route renders one HTML document that the
 * language toggle switches client-side, so the component needs every locale
 * resolved up front rather than only the one the server happened to render.
 */
export function selectExplainerBundle({
  html,
  seed,
  maxTerms = 3,
}: {
  html: Record<ExplainerLocale, string>;
  seed: string;
  maxTerms?: number;
}): ExplainerBundle {
  const bundle = {} as ExplainerBundle;
  for (const locale of LOCALES) {
    bundle[locale] = selectExplainersForLocale({
      html: html[locale] || "",
      locale,
      seed,
      maxTerms,
    });
  }
  return bundle;
}
