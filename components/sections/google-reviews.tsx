"use client";

import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft, FaGoogle } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { googlePlace, googleReviews, type Review } from "@/config/reviews";
import { title, eyebrow } from "@/components/primitives";

const ReviewCard = ({ r }: { r: Review }) => (
  <article className="flex h-[320px] w-[320px] sm:w-[360px] shrink-0 flex-col bg-white border border-slate-200 hover:border-brand-500 transition-colors p-6">
    {/* Header */}
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-700 text-white text-sm font-extrabold">
        {r.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold text-black">
          {r.author}
        </p>
        <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
          {r.date}
        </p>
      </div>
      <FaGoogle aria-hidden className="h-4 w-4 text-slate-400 shrink-0" />
    </div>

    {/* Stars */}
    <div className="mt-4 flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: r.rating }).map((_, k) => (
        <FaStar key={k} className="h-3.5 w-3.5" />
      ))}
    </div>

    {/* Quote */}
    <FaQuoteLeft className="mt-4 h-4 w-4 text-brand-500 shrink-0" />
    <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-black">
      {r.text}
    </p>

    {/* Footer */}
    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700">
        <span className="inline-block h-1.5 w-1.5 bg-brand-500" />
        Verified
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        Google Review
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
    return () => {
      aborted = true;
    };
  }, []);

  // Duplicate the list so the marquee can loop seamlessly.
  const looped = [...reviews, ...reviews];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden py-16 sm:py-20 bg-slate-50"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className={eyebrow()}>Customer Reviews</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>What customers </span>
                <span className={title({ size: "md", color: "brand" })}>
                  say about us
                </span>
              </h2>
            </div>
            <div className="md:text-right">
              <div className="inline-flex flex-wrap items-center justify-start md:justify-end gap-3 border border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className="h-5 w-5" />
                  ))}
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-black leading-none">
                    {meta.rating} / 5
                  </p>
                  <p className="mt-1 text-[11px] text-brand-700 uppercase tracking-wider font-bold">
                    {meta.total}+ Google reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* MARQUEE — left to right, uniform card heights */}
      <div
        className="relative mt-12 group"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
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
              className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black hover:bg-black hover:text-white transition"
            >
              <FaGoogle className="h-4 w-4" />
              Read all reviews on Google
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Marquee animation — left to right, scoped to this section */}
      <style>{`
        @keyframes kl-marquee-scroll {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .kl-marquee {
          animation: kl-marquee-scroll 45s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .kl-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
};
