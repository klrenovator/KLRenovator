"use client";

import { FiArrowUpRight } from "react-icons/fi";

import { GoogleGIcon, GoogleIconSprites, GoogleStars } from "@/components/google-brand-icons";
import { googlePlace } from "@/config/reviews";
import {
  reviewCountLabelFor,
  reviewRatingLabelFor,
  useGoogleReviewStats,
} from "@/lib/use-google-review-stats";

type Lang = "en" | "ms" | "zh";

/**
 * GOOGLE REVIEW WIDGET — keyless, zero-config.
 *
 * Google does not publish an embeddable keyless reviews widget: the Places API
 * (billing + API key + Cloud project) is the only programmatic source, and the
 * site owner explicitly cannot maintain that. This component is the official,
 * supported keyless alternative — Google's own review surfaces (the Business
 * Profile Maps listing and the "rate & review" short link) presented as a
 * Google-styled review card.
 *
 * • No API key, no env vars, no billing, no third-party script.
 * • Rating + review count come from `useGoogleReviewStats()`, which starts at
 *   the verified figures in `config/reviews.ts` and silently upgrades to live
 *   values if `/api/google-reviews` is ever configured. Numbers are NEVER
 *   hardcoded here.
 * • The star/G artwork is referenced from the shared sprite in
 *   `components/google-brand-icons.tsx` (no duplicated path data).
 */

const COPY: Record<
  Lang,
  {
    badge: string;
    reviewsLabel: (count: string) => string;
    outOfFive: string;
    blurb: string;
    read: string;
    note: string;
  }
> = {
  en: {
    badge: "Google Reviews",
    reviewsLabel: (count) => `${count} Google reviews`,
    outOfFive: "out of 5",
    blurb:
      "Verified reviews from real KL & Selangor customers, published on our Google Business Profile.",
    read: "Read our reviews on Google",
    note: "Opens Google Maps in a new tab — every review is from a verified KL & Selangor customer.",
  },
  ms: {
    badge: "Ulasan Google",
    reviewsLabel: (count) => `${count} ulasan Google`,
    outOfFive: "daripada 5",
    blurb:
      "Ulasan disahkan daripada pelanggan sebenar di KL & Selangor, diterbitkan di Profil Perniagaan Google kami.",
    read: "Baca ulasan kami di Google",
    note: "Membuka Google Maps dalam tab baharu — setiap ulasan daripada pelanggan tersahkan KL & Selangor.",
  },
  zh: {
    badge: "谷歌评价",
    reviewsLabel: (count) => `${count} 条 Google 评价`,
    outOfFive: "满分 5 分",
    blurb: "来自吉隆坡与雪兰莪真实客户的已验证评价，发布于我们的 Google 商家资料。",
    read: "在 Google 上查看评价",
    note: "在新标签页打开 Google 地图 — 每条评价均来自已验证的吉隆坡与雪兰莪客户。",
  },
};

export type GoogleReviewWidgetProps = {
  locale?: Lang;
  /**
   * Render the shared SVG sprite. Set to `false` when another component on the
   * same page (e.g. the homepage reviews marquee) already rendered it.
   */
  includeSprite?: boolean;
  className?: string;
};

export function GoogleReviewWidget({
  locale = "en",
  includeSprite = true,
  className,
}: GoogleReviewWidgetProps) {
  const { rating, total } = useGoogleReviewStats();
  const ratingLabel = reviewRatingLabelFor(rating);
  const countLabel = reviewCountLabelFor(total);
  // Filled stars follow the live rating (5 today) instead of a hardcoded row.
  const filledStars = Math.min(5, Math.max(1, Math.round(rating)));
  const d = COPY[locale];

  return (
    <div
      className={`w-full border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-7 ${className ?? ""}`}
    >
      {includeSprite ? <GoogleIconSprites /> : null}

      {/* Header — Google G + rating summary */}
      <div className="flex items-center gap-4">
        <GoogleGIcon className="h-9 w-9 shrink-0" />
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-600">
            {d.badge}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-2xl font-black leading-none text-slate-950">{ratingLabel}</span>
            <GoogleStars
              count={filledStars}
              starClassName="h-4 w-4"
              label={`${ratingLabel} ${d.outOfFive}`}
            />
            <span className="text-xs font-bold text-slate-600">{d.outOfFive}</span>
          </div>
          <p className="mt-1 text-xs font-bold text-slate-600">{d.reviewsLabel(countLabel)}</p>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">{d.blurb}</p>

      {/* Actions — plain link to Google. The former "Write a review" CTA was
          removed at the owner's request (worried about bad-faith reviews);
          reading reviews stays. No API, no key. */}
      <div className="mt-5">
        <a
          href={googlePlace.reviewsUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 border-2 border-[#4285F4] bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-700 transition-all hover:bg-slate-50"
        >
          <GoogleGIcon className="h-4 w-4 shrink-0" />
          <span className="text-center">{d.read}</span>
          <FiArrowUpRight className="h-4 w-4 shrink-0 text-[#4285F4]" />
        </a>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-600">{d.note}</p>
    </div>
  );
}

export default GoogleReviewWidget;
