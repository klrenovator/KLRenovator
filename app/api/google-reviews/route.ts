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

// P2-02: Rate limit imports only when needed (lightweight)
const RATE_LIMIT = 60; // 60 requests per minute per IP
const RATE_WINDOW_MS = 60 * 1000;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);
  
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  
  if (bucket.count >= RATE_LIMIT) {
    return false;
  }
  
  bucket.count++;
  return true;
}

export async function GET(req: Request) {
  // P2-02: Best-effort client IP extraction
  const fwd = req.headers.get("x-forwarded-for");
  const clientIp = fwd ? fwd.split(",")[0].trim() : "unknown";
  
  // P2-02: Apply rate limiting
  if (!checkRateLimit(clientIp)) {
    return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "60",
        "Cache-Control": "private, no-store",
      },
    });
  }

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

    // P2-02: Use longer cache with stale-while-revalidate
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      return new NextResponse(null, { 
        status: 204,
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" },
      });
    }

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

    // P2-02: Explicit cache headers
    return NextResponse.json(
      {
        rating: data.result?.rating,
        total: data.result?.user_ratings_total,
        reviews,
      },
      {
        headers: {
          // CDN cache: 1 hour, allow stale response for up to 24 hours while revalidating
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          // Vary by Accept-Encoding for compression
          "Vary": "Accept-Encoding",
        },
      }
    );
  } catch {
    return new NextResponse(null, { 
      status: 204,
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  }
}
