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
 * Sample reviews — placeholders until live reviews are wired up
 * (see top-of-file instructions). Written to sound like realistic
 * KL / Selangor customer feedback.
 */
export const googleReviews: Review[] = [
  {
    author: "Nurul Aisyah",
    initials: "NA",
    rating: 5,
    date: "2 weeks ago",
    text: "Super fast response via WhatsApp. Technician came on time, very professional, and did an amazing chemical wash on my 3 units in Subang Jaya. Aircond is icy cold again and the price was very reasonable. Highly recommended!",
  },
  {
    author: "Jason Tan",
    initials: "JT",
    rating: 5,
    date: "1 month ago",
    text: "Booked via WhatsApp in the morning and they came in the afternoon same day. Installation was neat, tidy, technician even wore shoe covers inside the condo. Explained everything clearly before starting. Syabas KL Renovator!",
  },
  {
    author: "Farid Hakim",
    initials: "FH",
    rating: 5,
    date: "1 month ago",
    text: "Gas top-up for my Daikin inverter done within 40 minutes. Transparent pricing, no hidden fees. Technician also checked the other units for free and gave honest advice. Will definitely use again for next service.",
  },
  {
    author: "Samantha Lee",
    initials: "SL",
    rating: 5,
    date: "2 months ago",
    text: "Third time using KL Renovator — consistent, tidy, on-time. Chemical wash for 4 units and everything works perfectly. My go-to aircon company in KL. The team is trustworthy and communicates clearly.",
  },
  {
    author: "Rajesh Kumar",
    initials: "RK",
    rating: 5,
    date: "3 months ago",
    text: "Called them for an emergency repair on a Sunday — they came same day and fixed the compressor issue. Gave clear quotation before starting work. Very honest and reliable team. Highly recommend for anyone in KL/Selangor.",
  },
];
