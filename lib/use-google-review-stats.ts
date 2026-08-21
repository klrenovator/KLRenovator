"use client";

import { useEffect, useState } from "react";
import { googlePlace } from "@/config/reviews";

export type GoogleReviewStats = {
  rating: number;
  total: number;
};

/**
 * Live Google review stats with a smooth config fallback.
 *
 * Starts from the verified figures in `config/reviews.ts` (SSR-safe, no
 * flash of empty state) and hydrates from `/api/google-reviews` when
 * GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are configured. The API route
 * returns 204 without those env vars, so the config values simply stay.
 * Mirrors the behaviour of `components/sections/google-reviews.tsx`.
 */
export function useGoogleReviewStats(): GoogleReviewStats {
  const [stats, setStats] = useState<GoogleReviewStats>({
    rating: googlePlace.averageRating,
    total: googlePlace.totalReviews,
  });

  useEffect(() => {
    let aborted = false;
    fetch("/api/google-reviews", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (aborted || !data) return; // 204 / no env vars → keep config fallback
        setStats({
          rating: data.rating ?? googlePlace.averageRating,
          total: data.total ?? googlePlace.totalReviews,
        });
      })
      .catch(() => {}); // network hiccup → fallback already rendered
    return () => {
      aborted = true;
    };
  }, []);

  return stats;
}

/** "88+" — display label for the current (live or fallback) review count. */
export function reviewCountLabelFor(total: number): string {
  return `${total}+`;
}

/** "5.0" — display label for the current (live or fallback) average rating. */
export function reviewRatingLabelFor(rating: number): string {
  return Number.isInteger(rating) ? rating.toFixed(1) : String(rating);
}
