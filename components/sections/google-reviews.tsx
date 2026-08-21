"use client";

import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { googlePlace, googleReviews, type Review } from "@/config/reviews";
import { reviewRatingLabelFor } from "@/lib/use-google-review-stats";
import { title, eyebrow } from "@/components/primitives";
import { translations, useLang, type Lang } from "@/context/language-context";

// ── Official Google "G" + star SVGs as a single sprite ─────────────────────
// Each review card used to inline the full multicolor-G path data and five
// star paths (~2 KB of duplicate SVG per card). The symbols are now defined
// ONCE per section and referenced with <use>.
const IconSprites = () => (
  <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
    <symbol id="kl-google-g" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6.26c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </symbol>
    <symbol id="kl-star" viewBox="0 0 576 512">
      <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.1c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288.1 439.8 416.2 507.7c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.3 329 542.4 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381 150.3 316.9 18z"/>
    </symbol>
  </svg>
);

const GoogleGIcon = ({ className }: { className?: string }) => (
  <svg className={className} aria-hidden="true">
    <use href="#kl-google-g" />
  </svg>
);

const Stars = ({ count, className }: { count: number; className?: string }) => (
  <span className={`inline-flex items-center gap-0.5 text-amber-400 ${className ?? ""}`} aria-label={`${count} star rating`}>
    {Array.from({ length: count }).map((_, k) => (
      <svg key={k} className="h-3.5 w-3.5" aria-hidden="true">
        <use href="#kl-star" />
      </svg>
    ))}
  </span>
);

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

    <Stars count={r.rating} className="mt-3" />

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
      <IconSprites />
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
                <span className="inline-flex items-center gap-1 text-amber-400" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-5 w-5" aria-hidden="true"><use href="#kl-star" /></svg>
                  ))}
                </span>
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
        <div className="kl-marquee flex w-max gap-5 px-6 py-4 group-hover:[animation-play-state:paused]">
          {looped.map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} r={r} />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mt-12 flex justify-center">
            <a
              href={googlePlace.reviewsUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2.5 border-2 border-[#4285F4] px-6 py-3 text-sm font-black uppercase tracking-widest transition-all hover:opacity-90 bg-white text-slate-700"
            >
              <GoogleGIcon className="h-5 w-5 shrink-0" />
              Read all reviews on Google
              <FiArrowUpRight className="h-4 w-4 text-[#4285F4]" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
