"use client";

import { FiArrowUpRight, FiEdit3 } from "react-icons/fi";

import { GoogleGIcon, GoogleIconSprites, GoogleStars } from "@/components/google-brand-icons";
import { googlePlace } from "@/config/reviews";
import { sitePublic } from "@/config/site-public";
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
    write: string;
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
    write: "Write a review",
    note: "Opens Google — a free Google account is all you need. Takes about 60 seconds.",
  },
  ms: {
    badge: "Ulasan Google",
    reviewsLabel: (count) => `${count} ulasan Google`,
    outOfFive: "daripada 5",
    blurb:
      "Ulasan disahkan daripada pelanggan sebenar di KL & Selangor, diterbitkan di Profil Perniagaan Google kami.",
    read: "Baca ulasan kami di Google",
    write: "Tulis ulasan",
    note: "Membuka Google — anda hanya perlukan akaun Google percuma. Ambil masa kira-kira 60 saat.",
  },
  zh: {
    badge: "谷歌评价",
    reviewsLabel: (count) => `${count} 条 Google 评价`,
    outOfFive: "满分 5 分",
    blurb: "来自吉隆坡与雪兰莪真实客户的已验证评价，发布于我们的 Google 商家资料。",
    read: "在 Google 上查看评价",
    write: "撰写评价",
    note: "将打开 Google — 只需一个免费的 Google 账号，大约 60 秒即可完成。",
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

      {/* Actions — both are plain links to Google. No API, no key. */}
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <a
          href={googlePlace.reviewsUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border-2 border-[#4285F4] bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-700 transition-all hover:bg-slate-50"
        >
          <GoogleGIcon className="h-4 w-4 shrink-0" />
          <span className="text-center">{d.read}</span>
          <FiArrowUpRight className="h-4 w-4 shrink-0 text-[#4285F4]" />
        </a>
        <a
          href={sitePublic.links.googleBusiness}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border-2 border-slate-900 bg-slate-900 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800"
        >
          <FiEdit3 className="h-4 w-4 shrink-0" />
          <span className="text-center">{d.write}</span>
        </a>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-600">{d.note}</p>
    </div>
  );
}

export default GoogleReviewWidget;
