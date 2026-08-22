/**
GOOGLE REVIEWS — KL Renovator
All reviews copied from KL Renovator Google Business Profile.
dates are in ISO 8601 format (YYYY-MM-DD) for use in Review schema.
dateDisplay is the human-readable label shown on the website.
*/
export type Review = {
  author: string;
  initials: string;
  rating: number;
  text: string;
  date: string;        // ISO 8601 — e.g. "2026-05-01" — used in schema
  dateDisplay: string; // Human readable — e.g. "May 2026" — shown on site
  profileImage?: string;
  /**
   * OWNER REPLY — your public reply to this review on the Google Business
   * Profile ("Response from the owner"). Paste it here to have it render on
   * the website's review card.
   *
   * IMPORTANT: Google's Places API does NOT return owner replies (it only
   * returns author, rating, text and date), so replies can never be
   * auto-synced — they must be pasted manually from the GBP listing.
   * Note: if the live Places API mode is ever enabled, live reviews replace
   * the curated list and pasted replies will not show for those live items.
   */
  ownerReply?: string;
  ownerReplyDate?: string; // Human readable — e.g. "May 2026"
};

export const googlePlace = {
  name: "KL Renovator",
  mapsUrl: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
  reviewsUrl: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
  // True Google Business Profile figures (verified 2026-08-21 — see issue #68).
  // `averageRating` is a number; use `reviewRatingLabel` for the "5.0" string.
  averageRating: 5.0,
  totalReviews: 88,
  lastUpdated: "2026-08-21",
};

/**
 * Single source of truth for review-count copy used across the site.
 * Always derive UI claims from these instead of hardcoding numbers, and
 * keep `totalReviews` / `averageRating` in sync with the Google Business
 * Profile (the /api/google-reviews endpoint overrides these at runtime
 * when GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are configured).
 */
export const reviewCount = googlePlace.totalReviews;            // 88
export const reviewCountLabel = `${googlePlace.totalReviews}+`; // "88+"
export const reviewRatingLabel = googlePlace.averageRating.toFixed(1); // "5.0"

/**
Real Google reviews — copied from the KL Renovator Google Business listing.
Dates approximated from relative timestamps (e.g. "a month ago" → May 2026).
NOTE: The "Sidra Riaz" electrical-work review was never in this file — it
does not exist in this codebase. If it is still visible on the live site,
it is being pulled directly from the Google Business Profile widget, not
from this file, and must be addressed on the GBP listing itself (flag/request
removal via Google) — a code change here cannot remove it.
*/
export const googleReviews: Review[] = [
  {
    author: "Jithin menon",
    initials: "J",
    rating: 5,
    date: "2026-05-01",
    dateDisplay: "May 2026",
    text: "Great lads with a good attitude, dedicated and hard working. They are willing to sacrifice their time to ensure the job is done well. Good work.",
  },
  {
    author: "Afiq Saiful",
    initials: "A",
    rating: 5,
    date: "2026-05-01",
    dateDisplay: "May 2026",
    text: "Response fast to your queries and will answer all your questions should you need any clarification. The job is clean and tolerable for the price.",
  },
  {
    author: "muhd ismail abdul malik",
    initials: "M",
    rating: 5,
    date: "2026-05-01",
    dateDisplay: "May 2026",
    text: "Good technician.. tq very much",
  },
  {
    author: "Nerissa Sinnappah",
    initials: "N",
    rating: 5,
    date: "2026-04-01",
    dateDisplay: "April 2026",
    text: "Love love the team! Very professional. Their work is clean, and neat. They are very kind in explaining to me my concerns and patient. I owe them a lot of gratitude. Even when the air con was slightly leaking after installation they ran back immediately to solve the problem without a fuss!! Please everybody get their services. I promise you won't regret it!",
  },
  {
    author: "rachelle recuenco",
    initials: "R",
    rating: 5,
    date: "2026-02-01",
    dateDisplay: "February 2026",
    text: "Trustworthy and very helpful service",
  },
  {
    author: "Norcs X2",
    initials: "N",
    rating: 5,
    date: "2026-05-01",
    dateDisplay: "May 2026",
    text: "Very good!",
  },
  {
    author: "Reez Iskandar Arbain",
    initials: "R",
    rating: 5,
    date: "2026-03-25",
    dateDisplay: "12 weeks ago",
    text: "Thank you for being able to provide a service that seemed almost impossible — even though it was already past their working hours, they still responded. Without questioning my tight budget, they simply agreed to help and made sure I was in the best possible position. The two technicians, Shahzaib and Waheed, were efficient, easy to work with, and made sure the whole process went smoothly with no complaints afterwards. Boss, give them a raise — kudos to the team!",
  },
  {
    author: "SALAHA",
    initials: "S",
    rating: 5,
    date: "2026-03-25",
    dateDisplay: "12 weeks ago",
    text: "I am very happy with the air conditioner installation service. The team did an excellent job from start to finish. They arrived on time, were very polite and professional, and explained everything clearly before starting the work. The installation was done carefully and neatly without any mess. They made sure everything was working properly before leaving. The air conditioner is running perfectly and cooling very well. I really appreciate their hard work and honesty. I would definitely recommend their service to anyone looking for reliable and professional aircon installation.",
  },
];

