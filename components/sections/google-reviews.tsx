"use client";

import { useEffect, useState } from "react";
import { Star, Quote, ExternalLink } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Reveal } from "@/components/reveal";
import { googlePlace, googleReviews, type Review } from "@/config/reviews";
import { title } from "@/components/primitives";

/**
 * Google Reviews section — tries to fetch live reviews from
 * /api/google-reviews if GOOGLE_PLACES_API_KEY + PLACE_ID are set.
 * Falls back to the curated list in config/reviews.ts otherwise.
 */
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
    <section
      id="reviews"
      className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <FaGoogle className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
              Verified Google Reviews
            </div>
            <h2 className="mt-4">
              <span className={title({ size: "md" })}>What customers </span>
              <span className={title({ size: "md", color: "brand" })}>
                say about us
              </span>
            </h2>
            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-500 dark:text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5" fill="currentColor" />
                ))}
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {meta.rating}/5
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                from {meta.total}+ Google reviews
              </span>
            </div>
          </div>
        </Reveal>

        {/* Reviews grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 5).map((r, i) => (
            <Reveal
              key={r.author + i}
              delay={i * 60}
              className={
                i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              }
            >
              <article
                className={
                  "flex h-full flex-col rounded-2xl border p-5 sm:p-6 shadow-sm hover:shadow-xl transition-shadow " +
                  (i === 0
                    ? "border-brand-200 dark:border-brand-800 bg-gradient-to-br from-white to-brand-50 dark:from-slate-900 dark:to-brand-900/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900")
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 via-brand-700 to-[rgb(var(--color-accent-500))] text-white text-sm font-bold">
                      {r.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {r.author}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {r.date}
                      </p>
                    </div>
                  </div>
                  <FaGoogle className="h-4 w-4 text-slate-400" />
                </div>

                <div className="mt-3 flex items-center gap-0.5 text-amber-500 dark:text-amber-400">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4" fill="currentColor" />
                  ))}
                </div>

                <Quote className="mt-3 h-5 w-5 text-brand-400 dark:text-brand-500 shrink-0" />
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
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
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              <FaGoogle className="h-4 w-4" />
              Read all reviews on Google
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
