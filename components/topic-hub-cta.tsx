// ─────────────────────────────────────────────────────────────────────────
// Member → hub strip. Rendered on blog posts, problem pages, service pages,
// calculator pages and price guides so every cluster member links back to
// its topic hub (issue #66, two-way links).
//
// This is a contextual one-line CTA, not a related-links strip: it names the
// hub and its topic in the page's own language and links to the localized
// hub route.
// ─────────────────────────────────────────────────────────────────────────

import NextLink from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {
  TOPIC_HUB_PATH,
  TOPIC_HUB_LABEL,
  TOPIC_HUB_TAGLINE,
  TOPIC_HUB_CTA,
  type HubLocale,
  type TopicHubId,
} from "@/config/topic-hub-links";

export function TopicHubCta({
  hubId,
  locale = "en",
  className = "py-10 bg-slate-50 border-t border-slate-100",
}: {
  hubId: TopicHubId;
  locale?: HubLocale;
  className?: string;
}) {
  const href = locale === "en" ? TOPIC_HUB_PATH[hubId] : `/${locale}${TOPIC_HUB_PATH[hubId]}`;
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NextLink
          href={href}
          className="group flex flex-col gap-4 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-white p-6 transition-all hover:border-sky-400 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-sky-600">
              {locale === "ms" ? "Hab Topik" : locale === "zh" ? "主题总览" : "Topic Hub"}
            </p>
            <h2 className="mt-1 text-base font-black text-slate-900 sm:text-lg">
              {TOPIC_HUB_LABEL[hubId][locale]}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {TOPIC_HUB_TAGLINE[hubId][locale]}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors group-hover:bg-sky-700">
            {TOPIC_HUB_CTA[locale]}
            <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </NextLink>
      </div>
    </section>
  );
}
