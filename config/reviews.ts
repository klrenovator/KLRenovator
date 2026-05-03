/**
 * GOOGLE REVIEWS
 * --------------
 * ⚠️  Important: We can't automatically scrape reviews from the Google Maps
 *    short-link (https://maps.app.goo.gl/dG5WWYBCotRQzvRJA) because Google
 *    does not expose reviews without the Places API key.
 *
 * TO SHOW REAL REVIEWS YOU HAVE TWO OPTIONS:
 *
 * OPTION A (recommended — fully automatic, refreshes hourly):
 *   1. Create a Google Cloud project and enable the "Places API".
 *   2. Create a restricted API key — docs:
 *        https://developers.google.com/maps/documentation/places/web-service/get-api-key
 *   3. Find the Place ID of "KL Renovator" (your Maps listing):
 *        https://developers.google.com/maps/documentation/places/web-service/place-id
 *   4. In the project root, create a file called `.env.local` with:
 *
 *        GOOGLE_PLACES_API_KEY=your_key_here
 *        GOOGLE_PLACE_ID=your_place_id_here
 *
 *   5. Restart `npm run dev`. The homepage will automatically fetch the
 *      5 most recent Google reviews from your listing.
 *
 * OPTION B (manual):
 *   Copy real reviews from your Google Maps page into the `googleReviews`
 *   array below. Swap `author`, `initials`, `text`, `rating` and `date`
 *   with the real values you see on Google.
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
  // Your Google Business Profile short-link (from the brief)
  mapsUrl: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
  reviewsUrl: "https://maps.app.goo.gl/dG5WWYBCotRQzvRJA",
  averageRating: 4.9,
  totalReviews: 500,
};

/**
 * Real Google reviews — copied from the KL Renovator Google Business listing.
 */
export const googleReviews: Review[] = [
  {
    author: "Jithin menon",
    initials: "J",
    rating: 5,
    date: "a month ago",
    text: "Great lads with a good attitude, dedicated and hard working. They are willing to sacrifice their time to ensure the job is done well. Good work.",
  },
  {
    author: "Afiq Saiful",
    initials: "A",
    rating: 5,
    date: "a month ago",
    text: "Response fast to your queries and will answer all your questions should you need any clarification. The job is clean and tolerable for the price.",
  },
  {
    author: "Sidra Riaz",
    initials: "S",
    rating: 5,
    date: "a month ago",
    text: "If you are looking for a reliable electrician in KL, I highly recommend KL RENOVATOR. I had some complex electrical wiring and light installation work done, and the team handled everything safely and efficiently. They are very knowledgeable about safety standards and ensured all circuits were perfectly balanced. Professional, honest, and fast service. Best choice for any electrical repair or renovation!",
  },
  {
    author: "muhd ismail abdul malik",
    initials: "M",
    rating: 5,
    date: "a month ago",
    text: "Good technician.. tq very much",
  },
  {
    author: "Nerissa Sinnappah",
    initials: "N",
    rating: 5,
    date: "2 months ago",
    text: "Love love the team! Very professional. Their work is clean, and neat. They are very kind in explaining to me my concerns and patient. I owe them alot of gratitude. Even when the air con was slightly leaking after installation they ran back to fix it without any hesitation.",
  },
  {
    author: "rachelle recuenco",
    initials: "R",
    rating: 5,
    date: "4 months ago",
    text: "Trustworthy and very helpful service",
  },
  {
    author: "Norcs X2",
    initials: "N",
    rating: 5,
    date: "a month ago",
    text: "Very good!",
  },
];
