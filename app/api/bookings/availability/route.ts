import { NextResponse } from "next/server";
import { getBusySlots } from "@/lib/google-calendar";
import { BOOKING_HOURS } from "@/lib/booking-config";
import { MAX_LEAD_DAYS } from "@/lib/booking-validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_DURATION_MINUTES = 480;
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function parseMalaysiaDate(value: string): Date | null {
  if (!DATE_PATTERN.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  // Date accepts values such as 2026-02-31 by rolling them into March. Check
  // UTC calendar parts first, then create the equivalent MYT midnight.
  const calendarDate = new Date(Date.UTC(year, month - 1, day));
  if (
    calendarDate.getUTCFullYear() !== year
    || calendarDate.getUTCMonth() !== month - 1
    || calendarDate.getUTCDate() !== day
  ) return null;
  return new Date(`${value}T00:00:00+08:00`);
}

export async function GET(req: Request) {
  const limit = await rateLimit(`availability:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many availability requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const durationParam = searchParams.get("duration");

    if (!dateParam || !durationParam) {
      return NextResponse.json({ error: "Missing date or duration." }, { status: 400 });
    }

    // Number(), unlike parseInt(), rejects "90minutes" and similar malformed
    // values instead of treating them as valid input.
    const durationMinutes = Number(durationParam);
    if (!Number.isInteger(durationMinutes) || durationMinutes <= 0 || durationMinutes > MAX_DURATION_MINUTES) {
      return NextResponse.json(
        { error: `Duration must be a whole number between 1 and ${MAX_DURATION_MINUTES} minutes.` },
        { status: 400 },
      );
    }

    const day = parseMalaysiaDate(dateParam);
    if (!day) {
      return NextResponse.json({ error: "Date must be a valid YYYY-MM-DD value." }, { status: 400 });
    }

    const now = Date.now();
    const maxDate = now + MAX_LEAD_DAYS * 24 * 60 * 60 * 1000;
    // Compare the end of requested MYT day so today's slots remain available.
    const dayEnd = new Date(day.getTime() + 24 * 60 * 60 * 1000 - 1);
    if (dayEnd.getTime() < now || day.getTime() > maxDate) {
      return NextResponse.json(
        { error: `Please choose a date from today up to ${MAX_LEAD_DAYS} days ahead.` },
        { status: 400 },
      );
    }

    const startHour = String(BOOKING_HOURS.start).padStart(2, "0");
    const endHour = String(BOOKING_HOURS.end).padStart(2, "0");
    const startMyt = new Date(`${dateParam}T${startHour}:00:00+08:00`);
    const endMyt = new Date(`${dateParam}T${endHour}:00:00+08:00`);

    const busySlots = await getBusySlots(startMyt, endMyt);
    const availableSlots: Date[] = [];
    const slotIntervalMinutes = 30;

    for (
      let currentSlot = new Date(startMyt);
      currentSlot.getTime() + durationMinutes * 60000 <= endMyt.getTime();
      currentSlot = new Date(currentSlot.getTime() + slotIntervalMinutes * 60000)
    ) {
      // Do not offer slots that have already elapsed today.
      if (currentSlot.getTime() < now) continue;
      const slotEnd = new Date(currentSlot.getTime() + durationMinutes * 60000);
      const isOverlapping = busySlots.some((busy) => {
        if (!busy.start || !busy.end) return false;
        return currentSlot.getTime() < new Date(busy.end).getTime()
          && slotEnd.getTime() > new Date(busy.start).getTime();
      });
      if (!isOverlapping) availableSlots.push(currentSlot);
    }

    return NextResponse.json(
      { availableSlots },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    console.error("Availability API Error:", error);
    return NextResponse.json({ error: "Unable to check availability right now." }, { status: 503 });
  }
}
