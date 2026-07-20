// Duration in hours per unit
export const SERVICE_DURATION_RULES = {
  service: 1.5,
  installation: 3,
  repair: 2,
};

// Booking hours shown to customer on the website
// Office opens at 9, but online slots start at 10 AM.
// System will ensure the final job ends exactly at or before 6 PM (18:00).
export const BOOKING_HOURS = {
  start: 10, // 10:00 AM
  end: 18,   // 6:00 PM
};

export const MAX_RESCHEDULES = 1;
