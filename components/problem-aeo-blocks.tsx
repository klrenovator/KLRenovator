/**
 * Direct-answer blocks + visible HowTo steps for /problems/[slug].
 *
 * Detector contract (audit/extract.mjs):
 *   - a question H2–H4 immediately followed by a 15–120 word <p>
 *   - HowTo JSON-LD only when the same steps are visible as an <ol>
 *   - HowTo heading must match /how to|how do|step|langkah|cara|步骤|如何/
 *
 * Keep each <h2> and its answer <p> as siblings — do not wrap the
 * paragraph in extra chrome between the heading and the <p>.
 */

import { buildHowToSchema } from "@/lib/seo";
import { PageExplainers } from "@/components/aeo-explainer-blocks";
import {
  getProblemAeoCopy,
  type ProblemAeoLocale,
} from "@/config/problem-howto-answers";

const LOCALE_LABEL: Record<ProblemAeoLocale, { answers: string; howTo: string }> = {
  en: { answers: "Direct answers", howTo: "Step-by-step" },
  ms: { answers: "Jawapan terus", howTo: "Langkah demi langkah" },
  zh: { answers: "直接解答", howTo: "分步说明" },
};

export function ProblemAeoBlocks({
  slug,
  locale,
  pageUrl,
}: {
  slug: string;
  locale: ProblemAeoLocale;
  pageUrl: string;
}) {
  const copy = getProblemAeoCopy(slug, locale);
  if (!copy) return null;

  const howToSchema = buildHowToSchema({
    name: copy.howToName,
    description: copy.howToDescription,
    url: pageUrl,
    totalTime: copy.totalTime,
    estimatedCost: { currency: "MYR", value: copy.estimatedCostValue },
    supply: copy.supply,
    tool: copy.tool,
    steps: copy.steps,
    inLanguage: locale === "ms" ? "ms-MY" : locale === "zh" ? "zh-MY" : "en-MY",
  });

  const labels = LOCALE_LABEL[locale];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <section className="py-10 bg-sky-50 border-b border-sky-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-6">
            {labels.answers}
          </p>
          <div className="space-y-8">
            {copy.answers.map((item) => (
              <div key={item.q}>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                  {item.q}
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-800 speakable">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-2">
            {labels.howTo}
          </p>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
            {copy.howToHeading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {copy.howToDescription}
          </p>
          <ol className="mt-6 space-y-4">
            {copy.steps.map((step, i) => (
              <li
                key={step.name}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-black text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-950">{step.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Definition + comparison blocks (issue #72). Curated per problem so
          a capacitor page defines the capacitor, not a generic glossary. */}
      <PageExplainers locale={locale} presetId={`problem:${slug}`} />
    </>
  );
}
