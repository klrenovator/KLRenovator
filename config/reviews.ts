/**
 * GOOGLE REVIEWS
 * --------------
 * These are the 5 reviews shown on the homepage.
 *
 * OPTION A (current) — static reviews:
 *   Edit the array below whenever you want to update.
 *
 * OPTION B — live fetch:
 *   See /app/api/google-reviews/route.ts for the Places API
 *   implementation. Add GOOGLE_PLACES_API_KEY + PLACE_ID env
 *   vars and the homepage will use live data automatically.
 */

export type Review = {
  author: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
  profileImage?: string;
};

export const googlePlace = {
  name: "KL Renovator",
  // Google Business Profile link
  mapsUrl:
    "https://www.google.com/maps/place/KL+Renovator/@3.214328,101.640755,17z/data=!4m10!1m2!2m1!1sklrenovator!3m6!1s0x64bcb235e3ce847b:0x8fac1f567878cdaa!8m2!3d3.214328!4d101.640755",
  // Same link — used for "View all reviews on Google"
  reviewsUrl:
    "https://www.google.com/maps/place/KL+Renovator/@3.214328,101.640755,17z/data=!4m10!1m2!2m1!1sklrenovator!3m6!1s0x64bcb235e3ce847b:0x8fac1f567878cdaa!8m2!3d3.214328!4d101.640755",
  averageRating: 4.9,
  totalReviews: 520,
};

export const googleReviews: Review[] = [
  {
    author: "Nurul Aisyah",
    initials: "NA",
    rating: 5,
    date: "2 weeks ago",
    text: "Super fast response, technician was punctual and very professional. My aircon back to icy cold after their chemical wash. Price reasonable. Highly recommended!",
  },
  {
    author: "Jason Tan",
    initials: "JT",
    rating: 5,
    date: "1 month ago",
    text: "Booked via WhatsApp in the morning and they came in the afternoon. Installation was neat, cleaned up after. Even wore shoe covers. This is the standard I expect. Syabas KL Renovator!",
  },
  {
    author: "Farid Hakim",
    initials: "FH",
    rating: 5,
    date: "1 month ago",
    text: "Gas top-up for my Daikin done within 30 minutes. Transparent pricing, no hidden fees. The technician even checked the other units for free. Will definitely use again.",
  },
  {
    author: "Samantha Lee",
    initials: "SL",
    rating: 5,
    date: "2 months ago",
    text: "Third time using their service — consistent, tidy, on-time. Chemical wash for 3 units and everything works perfectly. My go-to aircon company in KL.",
  },
  {
    author: "Rajesh Kumar",
    initials: "RK",
    rating: 5,
    date: "3 months ago",
    text: "Called them for an emergency repair, came same day and fixed the compressor issue. Gave clear quotation before starting work. Very honest and reliable team. Thanks guys!",
  },
];
