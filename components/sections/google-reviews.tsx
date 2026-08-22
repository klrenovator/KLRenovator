"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import {
  GoogleGIcon,
  GoogleIconSprites,
  GoogleStars,
} from "@/components/google-brand-icons";
import { GoogleReviewWidget } from "@/components/google-review-widget";
import { googlePlace, googleReviews, type Review } from "@/config/reviews";
import { reviewRatingLabelFor } from "@/lib/use-google-review-stats";
import { title, eyebrow } from "@/components/primitives";
import { translations, useLang, type Lang } from "@/context/language-context";

const ReviewCard = ({ r }: { r: Review }) => (
  <article className="flex h-[300px] w-[320px] sm:w-[350px] shrink-0 flex-col bg-white border border-slate-200 hover:border-slate-300 transition-colors p-5 shadow-sm hover:shadow-md">
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-sky-700 text-white text-xs font-black uppercase">
        {r.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black text-slate-950">{r.author}</p>
        <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">{r.dateDisplay || r.date}</p>
      </div>
      <GoogleGIcon className="h-5 w-5 shrink-0" />
    </div>

    <GoogleStars count={r.rating} className="mt-3" />

    <span className="mt-3 text-sky-500 text-lg leading-none" aria-hidden="true">&#10077;</span>
    <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-slate-700 font-medium">
      {r.text}
    </p>

    <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-sky-700">
        <span className="inline-block h-1.5 w-1.5 bg-sky-500" />
        Verified Google Review
      </span>
    </div>
  </article>
);

export const GoogleReviews = ({ locale }: { locale?: Lang } = {}) => {
  const [reviews, setReviews] = useState<Review[]>(googleReviews);
  const [meta, setMeta] = useState({
    rating: googlePlace.averageRating,
    total: googlePlace.totalReviews,
  });
  // The marquee needs a duplicated run of cards for a seamless infinite
  // loop. That used to be server-rendered, which DOUBLED this section's
  // HTML (~45 KB of duplicate cards on every homepage). The duplicate set
  // is now appended client-side after mount — SSR ships one set only.
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);
  const { lang: ctxLang, t: ctxT } = useLang();
  const lang: Lang = locale ?? ctxLang;
  const t = (key: keyof typeof translations["en"]): string =>
    ((translations[lang] as Record<string, string>)[key]) ?? ctxT(key);

  useEffect(() => {
    setMounted(true);
    let aborted = false;
    fetch("/api/google-reviews", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (aborted || !data || !data.reviews?.length) return;
        setReviews(data.reviews.slice(0, 10));
        setMeta({
          rating: data.rating ?? googlePlace.averageRating,
          total: data.total ?? googlePlace.totalReviews,
        });
      })
      .catch(() => {});
    return () => { aborted = true; };
  }, []);

  // SSR ships the first 4 cards only (enough to fill the visible marquee
  // width); the full doubled run renders after mount. This cut ~30 KB of
  // review markup out of the initial document.
  const looped = mounted ? [...reviews, ...reviews] : reviews.slice(0, 4);

  return (
    <section id="reviews" className="relative overflow-hidden py-16 sm:py-20 bg-slate-50">
      <GoogleIconSprites />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className={eyebrow()}>{t("reviews_eyebrow")}</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>{t("reviews_title1")}</span>
                <span className={title({ size: "md", color: "brand" })}>{t("reviews_title2")}</span>
              </h2>
            </div>
            <div className="md:text-right">
              <div className="inline-flex flex-wrap items-center justify-start md:justify-end gap-3 border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <GoogleStars count={5} starClassName="h-5 w-5" className="gap-1" />
                <GoogleGIcon className="h-6 w-6" />
                <div>
                  <p className="text-2xl font-black text-slate-950 leading-none">
                    {reviewRatingLabelFor(meta.rating)} / 5
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider font-black text-slate-500">
                    Google Reviews · {meta.total}+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee */}
      <div
        className="relative mt-12 group"
        style={{
          maskImage: "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
        }}
      >
        <div
          className={`kl-marquee flex w-max gap-5 px-6 py-4 ${paused ? "[animation-play-state:paused]" : "group-hover:[animation-play-state:paused]"}`}
        >
          {looped.map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} r={r} />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play reviews" : "Pause reviews"}
            aria-pressed={paused}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:border-slate-300 hover:text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {paused ? "▶ Play" : "⏸ Pause"} Reviews
          </button>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          {/* Official Google review widget — keyless (no Places API / Cloud
              project). Sprite already rendered above, so it is suppressed here. */}
          <div className="mx-auto mt-12 w-full max-w-xl">
            <GoogleReviewWidget locale={lang} includeSprite={false} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
