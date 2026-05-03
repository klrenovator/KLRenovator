"use client";

import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft, FaGoogle } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { googlePlace, googleReviews, type Review } from "@/config/reviews";
import { title, eyebrow } from "@/components/primitives";

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
        setReviews(data.reviews.slice(0, 6));
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

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              <div className="inline-flex flex-wrap items-center justify-start md:justify-end gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className="h-5 w-5" />
                  ))}
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-ink leading-none">
                    {meta.rating} / 5
                  </p>
                  <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">
                    {meta.total}+ Google reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px bg-slate-200 md:grid-cols-2 lg:grid-cols-3 border border-slate-200">
          {reviews.slice(0, 6).map((r, i) => (
            <Reveal key={r.author + i} delay={i * 60}>
              <article className="flex h-full flex-col bg-white p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-brand-700 text-white text-sm font-extrabold">
                      {r.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{r.author}</p>
                      <p className="text-xs text-slate-500">{r.date}</p>
                    </div>
                  </div>
                  <FaGoogle className="h-4 w-4 text-slate-400" />
                </div>

                <div className="mt-3 flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <FaStar key={k} className="h-3.5 w-3.5" />
                  ))}
                </div>

                <FaQuoteLeft className="mt-4 h-4 w-4 text-brand-700 shrink-0" />
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">
                  {r.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <a
              href={googlePlace.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-ink bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-white transition"
            >
              <FaGoogle className="h-4 w-4" />
              Read all reviews on Google
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
