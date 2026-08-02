// ─────────────────────────────────────────────────────────────────────────
// Tool links strip — the reusable internal-linking component that appears
// on every calculator page, pricing pages, service pages and the homepage.
// Keeps all calculator URLs in one registry (config/tools.ts).
//
// Lang-aware: on /ms and /zh pages the chips are translated AND link to the
// matching localized tool page (all tools now ship in EN/MS/ZH).
// ─────────────────────────────────────────────────────────────────────────

import NextLink from "next/link";
import { TOOLS } from "@/config/tools";

export type ToolLinksLang = "en" | "ms" | "zh";

function labelFor(tool: (typeof TOOLS)[number], lang: ToolLinksLang): string {
  if (lang === "ms") return tool.titleMS;
  if (lang === "zh") return tool.titleZH;
  return tool.anchor;
}

export function ToolLinks({
  heading = "Free Aircond Calculators",
  lang = "en",
}: {
  heading?: string;
  lang?: ToolLinksLang;
}) {
  const items = TOOLS;
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">{heading}</h3>
      <div className="flex flex-wrap gap-2.5">
        {items.map((t) => (
          <NextLink
            key={t.slug}
            href={lang === "en" ? t.slug : `/${lang}${t.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all"
          >
            <span aria-hidden="true">{t.icon}</span>
            {labelFor(t, lang)}
          </NextLink>
        ))}
      </div>
    </div>
  );
}
