import {
  pickComparisonQuestion,
  pickTermQuestion,
  resolveExplainerPreset,
  type ComparisonSet,
  type ExplainerLocale,
  type GlossaryTerm,
} from "@/config/aeo-explainers";

/**
 * Visible definition + comparison blocks (audit finding C9b / issue #72).
 *
 * Presentational only — which entries appear is decided upstream by
 * `lib/aeo-explainer-select.ts` from the page's own body text, so this
 * component never invents a topic the page does not already cover.
 *
 * Markup shape matters here as much as the copy: a question heading followed
 * immediately by a short answer paragraph is what search and answer engines
 * lift as a direct answer, and the comparison is a real `<table>` rather than
 * a styled grid so it can be parsed as one.
 */

const UI = {
  en: {
    termsEyebrow: "Definitions",
    termsTitle: "Key terms in this guide, explained",
    termsIntro:
      "Short, plain-language definitions of the terms used above — written by the technicians who do the work, not copied from a manufacturer brochure.",
    comparisonEyebrow: "Side-by-side comparison",
    inShort: "In short",
    factor: "What to compare",
  },
  ms: {
    termsEyebrow: "Definisi",
    termsTitle: "Istilah penting dalam panduan ini, dijelaskan",
    termsIntro:
      "Definisi ringkas dalam bahasa mudah bagi istilah yang digunakan di atas — ditulis oleh juruteknik yang membuat kerja itu sendiri, bukan disalin daripada risalah pengeluar.",
    comparisonEyebrow: "Perbandingan sebelah-menyebelah",
    inShort: "Ringkasnya",
    factor: "Perkara dibandingkan",
  },
  zh: {
    termsEyebrow: "术语解释",
    termsTitle: "本文关键术语定义",
    termsIntro:
      "以下是文中术语的简短解释，由实际到府施工的技术员撰写，而不是照抄厂商宣传单张。",
    comparisonEyebrow: "并列对比",
    inShort: "结论",
    factor: "比较项目",
  },
} as const;

export function DefinitionBlocks({
  locale,
  terms,
  seed,
}: {
  locale: ExplainerLocale;
  terms: GlossaryTerm[];
  /** Page identifier — varies the heading phrasing so the same definition
      does not publish an identical H3 on every page that uses it. */
  seed: string;
}) {
  if (terms.length === 0) return null;
  const ui = UI[locale];

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 not-prose shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-emerald-700">
        {ui.termsEyebrow}
      </p>
      <h2 className="mt-2 text-lg font-black uppercase tracking-tight text-slate-950">
        {ui.termsTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{ui.termsIntro}</p>
      <div className="mt-5 space-y-5">
        {terms.map((term) => (
          <div key={term.id} className="border-t border-slate-100 pt-4 first:border-t-0 first:pt-0">
            <h3 className="text-base font-black text-slate-900">{pickTermQuestion(term, locale, seed)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{term.answer[locale]}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{term.practical[locale]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ComparisonBlock({
  locale,
  comparison,
  seed,
}: {
  locale: ExplainerLocale;
  comparison: ComparisonSet | null;
  seed: string;
}) {
  if (!comparison) return null;
  const ui = UI[locale];

  return (
    <section className="mt-8 rounded-2xl border border-sky-100 bg-sky-50/60 p-5 not-prose">
      <p className="text-xs font-black uppercase tracking-widest text-sky-700">
        {ui.comparisonEyebrow}
      </p>
      <h2 className="mt-2 text-lg font-black uppercase tracking-tight text-slate-950">
        {pickComparisonQuestion(comparison, locale, seed)}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{comparison.intro[locale]}</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-widest text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3">{ui.factor}</th>
              <th scope="col" className="px-4 py-3">{comparison.optionA[locale]}</th>
              <th scope="col" className="px-4 py-3">{comparison.optionB[locale]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparison.rows.map((row) => (
              <tr key={row.factor[locale]} className="odd:bg-white even:bg-slate-50/60">
                <th scope="row" className="px-4 py-3 text-left font-bold text-slate-900">
                  {row.factor[locale]}
                </th>
                <td className="px-4 py-3 text-slate-700">{row.a[locale]}</td>
                <td className="px-4 py-3 text-slate-700">{row.b[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        <span className="font-black text-slate-900">{ui.inShort}: </span>
        {comparison.verdict[locale]}
      </p>
    </section>
  );
}

/**
 * Page-level wrapper for template pages (problems, services, calculators,
 * installation landings). Renders the curated preset for `presetId` inside a
 * full-width band so it can be dropped into a page layout with one line.
 * Unknown preset ids render nothing rather than a half-empty section.
 */
export function PageExplainers({
  locale,
  presetId,
}: {
  locale: ExplainerLocale;
  presetId: string;
}) {
  const { terms, comparison } = resolveExplainerPreset(presetId);
  if (terms.length === 0 && !comparison) return null;

  return (
    <section className="py-10 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <DefinitionBlocks locale={locale} terms={terms} seed={presetId} />
        <ComparisonBlock locale={locale} comparison={comparison} seed={presetId} />
      </div>
    </section>
  );
}
