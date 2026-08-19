/**
 * Derive FAQPage entries from a blog post's own body content.
 *
 * Why this exists
 * ---------------
 * Every blog post renders a visible "Reader FAQs" block, but `FAQPage`
 * structured data was only emitted for the handful of posts that had
 * hand-authored `faqs` in config — 36 of 303 pages. The other 267 showed
 * Q&A to users and hid it from search engines.
 *
 * The naive fix (schema-ify the hard-coded 3-question block) would publish
 * the SAME three questions on 300+ URLs. That is textbook FAQ-schema spam
 * and risks a manual action, so we don't do it.
 *
 * Instead we extract question-style headings and their following answer
 * paragraph from the post body. This yields genuinely per-post Q&A that is
 * (a) unique, and (b) actually visible on the page — which is Google's
 * hard requirement for FAQPage markup. Posts without question headings get
 * no FAQ schema at all, which is the correct outcome.
 */

/** Strip tags, decode the entities our content actually uses, collapse space. */
function toText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * A heading counts as a question if it ends in "?" (covers EN/MS) or the
 * CJK full-width "？" used in the ZH translations.
 */
function isQuestion(heading: string): boolean {
  return /[?？]\s*$/.test(heading);
}

export type DerivedFaq = { q: string; a: string };

/**
 * Pull up to `limit` visible Q&A pairs out of a post body.
 *
 * Answers are capped at ~320 chars so the schema stays a concise direct
 * answer (what actually wins snippets) rather than dumping a whole section.
 * Very short answers (<40 chars) are skipped — usually a heading followed
 * by an image or a table rather than a real answer.
 */
export function deriveFaqsFromContent(content: string, limit = 5): DerivedFaq[] {
  if (!content) return [];

  const out: DerivedFaq[] = [];
  const seen = new Set<string>();

  // Capture each h2/h3 plus everything up to the next heading of either level.
  const sectionRe = /<h([23])[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[23][^>]*>|$)/g;

  let match: RegExpExecArray | null;
  while ((match = sectionRe.exec(content)) !== null) {
    if (out.length >= limit) break;

    const question = toText(match[2]);
    if (!question || !isQuestion(question)) continue;

    const key = question.toLowerCase();
    if (seen.has(key)) continue;

    const answer = toText(match[3]);
    if (answer.length < 40) continue;

    let trimmed = answer.slice(0, 320);
    if (answer.length > 320) {
      // Prefer cutting at a sentence end, else at a word boundary.
      const lastStop = Math.max(
        trimmed.lastIndexOf(". "),
        trimmed.lastIndexOf("。"),
        trimmed.lastIndexOf("! "),
      );
      trimmed =
        lastStop > 120
          ? trimmed.slice(0, lastStop + 1)
          : `${trimmed.slice(0, trimmed.lastIndexOf(" "))}…`;
    }

    seen.add(key);
    out.push({ q: question, a: trimmed.trim() });
  }

  return out;
}
