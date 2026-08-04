-- ─────────────────────────────────────────────────────────────────────────
-- Adds calendar_sync_status column to track Google Calendar sync state.
--
-- This enables:
-- 1. Marking bookings as "pending confirmation" when Calendar is unavailable
-- 2. Retrying failed Calendar syncs via a background job
-- 3. Operations visibility into Calendar sync health
--
-- Run this once in Supabase → SQL Editor.
--
-- Safe to re-run: `IF NOT EXISTS` makes it idempotent.
-- ─────────────────────────────────────────────────────────────────────────

-- Add calendar sync status enum type if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'calendar_sync_status') THEN
        CREATE TYPE calendar_sync_status AS ENUM ('pending', 'synced', 'failed');
    END IF;
EXCEPTION
    WHEN others THEN
        -- Type might already exist, ignore error
        RAISE NOTICE 'calendar_sync_status type might already exist: %', SQLERRM;
END
$$;

-- Add the column
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS calendar_sync_status calendar_sync_status
  DEFAULT 'pending';

COMMENT ON COLUMN public.bookings.calendar_sync_status IS
  'Tracks Google Calendar sync state: pending (default), synced (success), failed (error)';

-- Index for operations queries
CREATE INDEX IF NOT EXISTS idx_bookings_calendar_sync_status
  ON public.bookings(calendar_sync_status)
  WHERE calendar_sync_status != 'synced';

-- Add calendar_event_id column if it doesn't exist (for reference)
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS calendar_event_id text;

COMMENT ON COLUMN public.bookings.calendar_event_id IS
  'Google Calendar event ID once synced';

-- ─────────────────────────────────────────────────────────────────────────
-- Create a function to retry failed Calendar syncs
-- Can be called by a cron job or manually
-- ─────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION retry_failed_calendar_syncs()
RETURNS TABLE(
  booking_id uuid,
  success boolean,
  error_message text
) AS $$
DECLARE
  failed_booking RECORD;
  sync_result boolean := false;
  result_error text := NULL;
BEGIN
  FOR failed_booking IN
    SELECT id, customer_name, phone, address, service_type, start_time, end_time, notes, line_items
    FROM public.bookings
    WHERE calendar_sync_status = 'failed'
      AND calendar_event_id IS NULL
    LIMIT 50  -- Process in batches
  LOOP
    BEGIN
      -- Attempt to create calendar event
      -- Note: This would need to be implemented in application code
      -- The SQL function just marks as synced if we get here
      
      UPDATE public.bookings
      SET calendar_sync_status = 'pending_retry'
      WHERE id = failed_booking.id;
      
      RETURN QUERY SELECT failed_booking.id, false, 'Marked for retry';
      
    EXCEPTION WHEN OTHERS THEN
      RETURN QUERY SELECT failed_booking.id, false, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION retry_failed_calendar_syncs IS
  'Marks failed Calendar syncs for retry. Called by cron job.';
