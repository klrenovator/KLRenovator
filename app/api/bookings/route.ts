import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createCalendarEvent, getBusySlots } from "@/lib/google-calendar";
import { calculateTotalDurationMinutes } from "@/lib/booking-config";
import { validateBooking } from "@/lib/booking-validation";
import { hit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Per-IP: 5 bookings per 10 minutes. Generous for a real customer (who
// books once), restrictive for a script.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: Request) {
  try {
    // ── 1. Rate limit ───────────────────────────────────────────────────
    const limit = hit(`bookings:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_MS);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many booking attempts. Please try again shortly, or WhatsApp us directly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
      );
    }

    // ── 2. Parse + validate ─────────────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Honeypot: a hidden field real users never fill in. Respond 200 so
    // bots believe they succeeded instead of retrying with a new shape.
    if (typeof body === "object" && body !== null) {
      const hp = (body as Record<string, unknown>).company_website;
      if (typeof hp === "string" && hp.trim() !== "") {
        return NextResponse.json({ booking: null, ok: true });
      }
    }

    const parsed = validateBooking(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const input = parsed.value;

    // Booking persistence is privileged. Do not silently downgrade to an
    // anonymous Supabase client if a deployment secret was omitted.
    let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (configError) {
      console.error("Booking storage is not configured:", configError);
      return NextResponse.json(
        { error: "Online booking is temporarily unavailable. Please WhatsApp us directly." },
        { status: 503 },
      );
    }

    // ── 3. Duration ─────────────────────────────────────────────────────
    const calculated_duration_minutes = calculateTotalDurationMinutes(input.line_items);

    const start = new Date(input.start_time);
    // Calendar events are capped at one working day (480 min) so a large
    // multi-day job doesn't render as a single block running past midnight.
    // The database still stores the true total duration.
    const eventDurationMinutes = Math.min(calculated_duration_minutes, 480);
    const end = new Date(start.getTime() + eventDurationMinutes * 60000);

    // ── 4. Re-check availability SERVER-SIDE ────────────────────────────
    if (process.env.GOOGLE_CALENDAR_ID) {
      try {
        const busy = await getBusySlots(start, end);
        const overlaps = busy.some((slot: { start?: string | null; end?: string | null }) => {
          if (!slot.start || !slot.end) return false;
          const busyStart = new Date(slot.start).getTime();
          const busyEnd = new Date(slot.end).getTime();
          return start.getTime() < busyEnd && end.getTime() > busyStart;
        });

        if (overlaps) {
          return NextResponse.json(
            { error: "That time slot was just taken. Please pick another time." },
            { status: 409 },
          );
        }
      } catch (availabilityError) {
        // Availability is advisory — if Google is unreachable we still take
        // the booking rather than blocking a real customer.
        console.error("Availability re-check failed (continuing):", availabilityError);
      }
    }

    // ── 5. Persist ──────────────────────────────────────────────────────
    const baseRow = {
      customer_name: input.customer_name,
      phone: input.phone,
      address: input.address,
      service_type: input.service_type,
      aircond_type: input.aircond_type,
      aircond_size: input.aircond_size,
      quantity: input.quantity,
      calculated_duration_minutes,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      source: input.source,
      calendar_event_id: null,
      line_items: input.line_items,
    };

    // `notes` is a newer column (see scripts/sql/add-booking-notes.sql). Only
    // send it when the customer actually wrote something.
    const rowWithNotes = input.notes ? { ...baseRow, notes: input.notes } : baseRow;

    let { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .insert([rowWithNotes])
      .select()
      .single();

    // If the column hasn't been added to Supabase yet, don't lose the lead —
    // retry without it. The notes still reach the team via Google Calendar
    // and the WhatsApp confirmation.
    const isMissingNotesColumn =
      !!error &&
      input.notes !== "" &&
      (error.code === "PGRST204" || error.code === "42703") &&
      /notes/i.test(error.message ?? "");

    if (isMissingNotesColumn) {
      console.error(
        "Supabase 'bookings.notes' column missing — saving booking without notes. " +
          "Run scripts/sql/add-booking-notes.sql to fix.",
      );
      ({ data: booking, error } = await supabaseAdmin
        .from("bookings")
        .insert([baseRow])
        .select()
        .single());
    }

    if (error) {
      console.error("Supabase insert error:", error);
      // Don't echo raw DB errors to the client — they can leak schema.
      return NextResponse.json(
        { error: "We couldn't save your booking. Please WhatsApp us and we'll sort it out." },
        { status: 500 },
      );
    }

    // ── 6. Mirror to Google Calendar (non-fatal) ────────────────────────
    // Runs after the DB write so a Calendar outage never costs us the lead.
    if (process.env.GOOGLE_CALENDAR_ID) {
      try {
        const itemsDescription = input.line_items.map((item, idx) => {
          const typeFormatted = item.service_type.replace(/_/g, " ").toUpperCase();
          return `${idx + 1}. ${typeFormatted} - ${item.aircond_type} (${item.aircond_size}) x${item.quantity}`;
        }).join("\n");

        const calendar_event_id = await createCalendarEvent({
          summary: `${input.service_type.toUpperCase()} (${input.line_items.length} items) - ${input.customer_name}`,
          description: [
            `Phone: ${input.phone}`,
            `Address: ${input.address}`,
            `Requested Services:`,
            itemsDescription,
            // Only shown when the customer chose to write something — keeps
            // the technician's calendar entry clean otherwise.
            ...(input.notes ? [``, `Customer notes: ${input.notes}`, ``] : []),
            `Source: ${input.source}`,
            `Total Est. Time: ${calculated_duration_minutes / 60} hours`,
          ].join("\n"),
          start,
          end,
        });

        if (calendar_event_id && booking?.id) {
          await supabaseAdmin
            .from("bookings")
            .update({ calendar_event_id })
            .eq("id", booking.id);
        }
      } catch (calError) {
        console.error("Google Calendar warning (booking still saved):", calError);
      }
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Booking API fatal error:", error);
    return NextResponse.json({ error: "System failed to process booking" }, { status: 500 });
  }
}
