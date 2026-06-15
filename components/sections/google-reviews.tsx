"use client";

import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { googlePlace, googleReviews, type Review } from "@/config/reviews";
import { title, eyebrow } from "@/components/primitives";
import { useLang } from "@/context/language-context";

// ── Official Google "G" multicolor SVG ───────────────────────────────────────
const GoogleGIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
    aria-hidden="true"
  >
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

const ReviewCard = ({ r }: { r: Review }) => (
  <article className="flex h-[320px] w-[320px] sm:w-[360px] shrink-0 flex-col bg-white border border-slate-200 hover:border-slate-300 transition-colors p-6 shadow-sm hover:shadow-md">
    {/* Header */}
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-sky-700 text-white text-sm font-black uppercase">
        {r.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black text-slate-950">{r.author}</p>
        <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">{r.date}</p>
      </div>
      {/* Multicolor Google G icon */}
      <GoogleGIcon className="h-5 w-5 shrink-0" />
    </div>

    {/* Stars */}
    <div className="mt-4 flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: r.rating }).map((_, k) => (
        <FaStar key={k} className="h-3.5 w-3.5" />
      ))}
    </div>

    {/* Quote */}
    <FaQuoteLeft className="mt-4 h-4 w-4 text-sky-500 shrink-0" />
    <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-slate-700 font-medium">
      {r.text}
    </p>

    {/* Footer */}
    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-sky-700">
        <span className="inline-block h-1.5 w-1.5 bg-sky-500" />
        Verified
      </span>
      {/* "Google Review" label with Google brand colors — each letter colored */}
      <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-0.5">
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>o</span>
        <span style={{ color: "#FBBC05" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#34A853" }}>l</span>
        <span style={{ color: "#EA4335" }}>e</span>
        <span className="text-slate-400 ml-1">Review</span>
      </span>
    </div>
  </article>
);

export const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(googleReviews);
  const [meta, setMeta] = useState({
    rating: googlePlace.averageRating,
    total: googlePlace.totalReviews,
  });
  const { t } = useLang();

  useEffect(() => {
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

  const looped = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative overflow-hidden py-16 sm:py-20 bg-slate-50">
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
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className="h-5 w-5" />
                  ))}
                </div>
                {/* Multicolor Google G next to rating */}
                <GoogleGIcon className="h-6 w-6" />
                <div>
                  <p className="text-2xl font-black text-slate-950 leading-none">
                    {meta.rating} / 5
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider font-black flex items-center gap-1">
                    <span style={{ color: "#EA4335" }}>G</span>
                    <span style={{ color: "#4285F4" }}>o</span>
                    <span style={{ color: "#FBBC05" }}>o</span>
                    <span style={{ color: "#34A853" }}>g</span>
                    <span style={{ color: "#EA4335" }}>l</span>
                    <span style={{ color: "#4285F4" }}>e</span>
                    <span className="text-slate-500 ml-0.5">Reviews · {meta.total}+</span>
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
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border-2 px-6 py-3 text-sm font-black uppercase tracking-widest transition-all hover:opacity-90 bg-white"
              style={{ borderColor: "#4285F4" }}
            >
              {/* Multicolor G icon in button */}
              <GoogleGIcon className="h-5 w-5 shrink-0" />
              {/* "Read all reviews on Google" with Google colored word */}
              <span className="text-slate-700">Read all reviews on&nbsp;</span>
              <span className="flex items-center gap-0.5">
                <span style={{ color: "#EA4335" }} className="font-black">G</span>
                <span style={{ color: "#4285F4" }} className="font-black">o</span>
                <span style={{ color: "#FBBC05" }} className="font-black">o</span>
                <span style={{ color: "#34A853" }} className="font-black">g</span>
                <span style={{ color: "#EA4335" }} className="font-black">l</span>
                <span style={{ color: "#4285F4" }} className="font-black">e</span>
              </span>
              <FiArrowUpRight className="h-4 w-4" style={{ color: "#4285F4" }} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
