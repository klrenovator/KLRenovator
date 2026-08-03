-- ─────────────────────────────────────────────────────────────────────────
-- Adds the optional customer "job details / notes" field to bookings.
--
-- The booking form now has a free-text box where the customer can describe
-- the job in their own words (fault symptoms, access notes, preferred
-- timing). It is always optional — most bookings will leave it NULL/empty.
--
-- Run this once in Supabase → SQL Editor.
--
-- Safe to re-run: `IF NOT EXISTS` makes it idempotent.
--
-- Until this is run, /api/bookings detects the missing column and saves the
-- booking without notes rather than failing (the notes still reach the team
-- via the Google Calendar event and the WhatsApp confirmation message), so
-- there is no downtime window — but run it so nothing is lost.
-- ─────────────────────────────────────────────────────────────────────────

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS notes text;

-- Mirrors MAX_NOTES_LENGTH in lib/booking-validation.ts. The API already
-- rejects anything longer; this is defence in depth for direct DB writes.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'bookings_notes_length_check'
      AND conrelid = 'public.bookings'::regclass
  ) THEN
    ALTER TABLE public.bookings
      ADD CONSTRAINT bookings_notes_length_check
      CHECK (notes IS NULL OR char_length(notes) <= 1000);
  END IF;
END
$$;

COMMENT ON COLUMN public.bookings.notes IS
  'Optional free-text job details written by the customer at booking time (max 1000 chars).';
