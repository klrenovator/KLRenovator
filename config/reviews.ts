/**
 * GOOGLE REVIEWS — KL Renovator
 * All reviews copied from KL Renovator Google Business Profile.
 * dates are in ISO 8601 format (YYYY-MM-DD) for use in Review schema.
 * dateDisplay is the human-readable label shown on the website.
 */

export type Review = {
  author: string;
  initials: string;
  rating: number;
  text: string;
  date: string;        // ISO 8601 — e.g. "2026-05-01" — used in schema
  dateDisplay: string; // Human readable — e.g. "May 2026" — shown on site
  profileImage?: string;
};

export const googlePlace = {
  name: "KL Renovator",
  mapsUrl: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
  reviewsUrl: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
  averageRating: 4.9,
  totalReviews: 500,
};

/**
 * Real Google reviews — copied from the KL Renovator Google Business listing.
 * Dates approximated from relative timestamps (e.g. "a month ago" → May 2026).
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
    author: "Sidra Riaz",
    initials: "S",
    rating: 5,
    date: "2026-05-01",
    dateDisplay: "May 2026",
    text: "If you are looking for a reliable electrician in KL, I highly recommend KL RENOVATOR. I had some complex electrical wiring and light installation work done, and the team handled everything safely and efficiently. They are very knowledgeable about safety standards and ensured all circuits were perfectly balanced. Professional, honest, and fast service. Best choice for any electrical repair or renovation!",
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
    text: "Love love the team! Very professional. Their work is clean, and neat. They are very kind in explaining to me my concerns and patient. I owe them alot of gratitude. Even when the air con was slightly leaking after installation they ran back to fix it without any hesitation.",
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
];
