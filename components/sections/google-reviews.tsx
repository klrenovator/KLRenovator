"use client";

import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft, FaGoogle } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { googlePlace, googleReviews, type Review } from "@/config/reviews";
import { title, eyebrow } from "@/components/primitives";
import { useLang } from "@/context/language-context";

const ReviewCard = ({ r }: { r: Review }) => (
  <article className="flex h-[320px] w-[320px] sm:w-[360px] shrink-0 flex-col bg-white border border-slate-200 hover:border-sky-400 transition-colors p-6 shadow-sm hover:shadow-md">
    {/* Header */}
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-sky-700 text-white text-sm font-black uppercase">
        {r.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black text-slate-950">{r.author}</p>
        <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">{r.date}</p>
      </div>
      <FaGoogle aria-hidden className="h-4 w-4 shrink-0" style={{ color: "#4285F4" }} />
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
      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#4285F4" }}>
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
                <div>
                  <p className="text-2xl font-black text-slate-950 leading-none">
                    {meta.rating} / 5
                  </p>
                  <p className="mt-1 text-[11px] text-sky-700 uppercase tracking-wider font-black">
                    {meta.total}+ Google Reviews
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
              className="inline-flex items-center gap-2.5 border-2 px-6 py-3 text-sm font-black uppercase tracking-widest transition-all hover:opacity-90"
              style={{ borderColor: "#4285F4", color: "#4285F4", backgroundColor: "#ffffff" }}
            >
              <FaGoogle className="h-4 w-4" style={{ color: "#4285F4" }} />
              Read all reviews on Google
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
