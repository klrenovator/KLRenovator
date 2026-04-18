import { NextResponse } from "next/server";

/**
 * LIVE GOOGLE REVIEWS ENDPOINT
 * ----------------------------
 * To enable live reviews, add these env vars in `.env.local`:
 *
 *   GOOGLE_PLACES_API_KEY=<your key>
 *   GOOGLE_PLACE_ID=<the place id for KL Renovator>
 *
 * How to get the Place ID for your business:
 *   https://developers.google.com/maps/documentation/places/web-service/place-id
 *
 * Without these, the endpoint returns 204 so the homepage
 * falls back to curated reviews in `config/reviews.ts`.
 */

export const dynamic = "force-dynamic";

type PlacesReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
};

type PlacesResponse = {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: PlacesReview[];
  };
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json",
    );
    url.searchParams.set("place_id", placeId);
    url.searchParams.set(
      "fields",
      "rating,user_ratings_total,reviews",
    );
    url.searchParams.set("key", key);
    // sort by most recent
    url.searchParams.set("reviews_sort", "newest");

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) return new NextResponse(null, { status: 204 });

    const data = (await res.json()) as PlacesResponse;
    const reviews =
      data.result?.reviews?.slice(0, 5).map((r) => ({
        author: r.author_name,
        initials: initials(r.author_name),
        rating: r.rating,
        text: r.text,
        date: r.relative_time_description,
        profileImage: r.profile_photo_url,
      })) ?? [];

    return NextResponse.json({
      rating: data.result?.rating,
      total: data.result?.user_ratings_total,
      reviews,
    });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
