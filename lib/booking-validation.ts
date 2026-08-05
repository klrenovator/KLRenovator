// ─────────────────────────────────────────────────────────────────────────
// Booking payload validation.
//
// The booking API previously only checked that fields were non-empty, so it
// accepted: malformed phone numbers, bookings in the past, bookings years in
// the future, `quantity: 99999` (which would create an absurd calendar block
// and a huge duration), unknown service types, and megabyte-long strings.
//
// Hand-rolled rather than pulling in a schema library, to avoid adding a
// runtime dependency for one endpoint.
// ─────────────────────────────────────────────────────────────────────────

import { BOOKING_HOURS } from "@/lib/booking-config";

export const SERVICE_TYPES = [
  "service",
  "installation",
  "repair",
  "gas_top_up",
  "dismantle",
  "relocate",
  "conceal_piping",
] as const;

export const AIRCOND_TYPES = ["Wall Mounted", "Ceiling Cassette", "Window Unit", "Portable"] as const;

export const MAX_QUANTITY = 30;
export const MAX_LINE_ITEMS = 15;
/** How far ahead a customer may self-book. */
export const MAX_LEAD_DAYS = 180;
/**
 * Optional free-text job description from the customer. Capped so the field
 * can't be used to push a huge payload into the DB / calendar description.
 */
export const MAX_NOTES_LENGTH = 1000;

export type BookingLineItem = {
  service_type: string;
  aircond_type: string;
  aircond_size: string;
  quantity: number;
};

export type BookingInput = {
  customer_name: string;
  phone: string;
  address: string;
  line_items: BookingLineItem[];
  /** Customer's own description of the job. Empty string when not provided. */
  notes: string;
  start_time: string;
  source: string;
  consent: boolean;
  // Fallbacks for older DB columns / queries
  service_type: string;
  aircond_type: string;
  aircond_size: string;
  quantity: number;
};

export type ValidationResult =
  | { ok: true; value: BookingInput }
  | { ok: false; error: string };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/**
 * Malaysian mobile/landline, tolerant of user formatting.
 * Accepts: 0182983573 · 018-298 3573 · +60182983573 · 60182983573
 */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s()\-.]/g, "");
  const m = /^((?:\+?60|0))(\d{8,10})$/.exec(digits);
  if (!m) return null;
  return `+60${m[2]}`;
}

export function validateBooking(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;

  const customer_name = str(b.customer_name);
  if (customer_name.length < 2 || customer_name.length > 100) {
    return { ok: false, error: "Please enter a valid name (2–100 characters)." };
  }

  const phone = normalisePhone(str(b.phone));
  if (!phone) {
    return { ok: false, error: "Please enter a valid Malaysian phone number." };
  }

  const address = str(b.address);
  if (address.length < 10 || address.length > 500) {
    return { ok: false, error: "Please enter a full address (10–500 characters)." };
  }

  // Optional: the customer may describe the job in their own words, or skip
  // it entirely. Only the upper bound is enforced.
  const notes = str(b.notes);
  if (notes.length > MAX_NOTES_LENGTH) {
    return {
      ok: false,
      error: `Job details are too long (max ${MAX_NOTES_LENGTH} characters). Please shorten them or send the rest via WhatsApp.`,
    };
  }

  let parsedLineItems: BookingLineItem[] = [];

  // Parse multi-service line items if present, otherwise fallback to single fields
  if (Array.isArray(b.line_items) && b.line_items.length > 0) {
    if (b.line_items.length > MAX_LINE_ITEMS) {
      return { ok: false, error: `Maximum ${MAX_LINE_ITEMS} different services can be booked at once.` };
    }

    let totalQty = 0;
    for (const rawItem of b.line_items) {
      if (typeof rawItem !== "object" || rawItem === null) {
        return { ok: false, error: "Invalid item format." };
      }
      const item = rawItem as Record<string, unknown>;
      const sType = str(item.service_type);
      if (!(SERVICE_TYPES as readonly string[]).includes(sType)) {
        return { ok: false, error: `Unknown service type: "${sType}".` };
      }

      const aType = str(item.aircond_type);
      if (aType.length < 2 || aType.length > 60) {
        return { ok: false, error: "Please select an aircond type for all items." };
      }

      const aSize = str(item.aircond_size);
      if (aSize.length < 1 || aSize.length > 30) {
        return { ok: false, error: "Please select an aircond size for all items." };
      }

      const qty = Number(item.quantity);
      if (!Number.isInteger(qty) || qty < 1) {
        return { ok: false, error: "Quantity for all items must be a whole number of at least 1." };
      }

      totalQty += qty;
      parsedLineItems.push({
        service_type: sType,
        aircond_type: aType,
        aircond_size: aSize,
        quantity: qty,
      });
    }

    if (totalQty > MAX_QUANTITY) {
      return { ok: false, error: `Total units of airconds across all selected services cannot exceed ${MAX_QUANTITY}.` };
    }
  } else {
    // Fallback to old format fields
    const service_type = str(b.service_type);
    if (!(SERVICE_TYPES as readonly string[]).includes(service_type)) {
      return { ok: false, error: "Unknown service type." };
    }

    const aircond_type = str(b.aircond_type);
    if (aircond_type.length < 2 || aircond_type.length > 60) {
      return { ok: false, error: "Please select an aircond type." };
    }

    const aircond_size = str(b.aircond_size);
    if (aircond_size.length < 1 || aircond_size.length > 30) {
      return { ok: false, error: "Please select an aircond size." };
    }

    const quantity = Number(b.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      return { ok: false, error: `Quantity must be a whole number between 1 and ${MAX_QUANTITY}.` };
    }

    parsedLineItems.push({
      service_type,
      aircond_type,
      aircond_size,
      quantity,
    });
  }

  const firstItem = parsedLineItems[0];

  const startRaw = str(b.start_time);
  const start = new Date(startRaw);
  if (Number.isNaN(start.getTime())) {
    return { ok: false, error: "Invalid appointment time." };
  }

  const now = Date.now();
  // Small negative tolerance absorbs clock skew between client and server.
  if (start.getTime() < now - 5 * 60 * 1000) {
    return { ok: false, error: "Appointment time cannot be in the past." };
  }
  if (start.getTime() > now + MAX_LEAD_DAYS * 24 * 60 * 60 * 1000) {
    return { ok: false, error: `Bookings can only be made up to ${MAX_LEAD_DAYS} days ahead.` };
  }

  // Must start inside published working hours, evaluated in Malaysia time
  // regardless of where the server runs.
  const myHour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kuala_Lumpur",
      hour: "2-digit",
      hour12: false,
    }).format(start),
  );
  if (myHour < BOOKING_HOURS.start || myHour >= BOOKING_HOURS.end) {
    return {
      ok: false,
      error: `Appointments start between ${BOOKING_HOURS.start}:00 and ${BOOKING_HOURS.end}:00 (MYT).`,
    };
  }

  // P1-04: PDPA explicit consent must be present and true (client also disables submit, but server enforces)
  const consentRaw = b.consent;
  const consent = consentRaw === true || consentRaw === "true" || consentRaw === 1 || consentRaw === "1";
  if (!consent) {
    return { ok: false, error: "Please accept the Privacy Policy consent before booking." };
  }

  const sourceRaw = str(b.source) || "web";
  const source = sourceRaw.slice(0, 40);

  return {
    ok: true,
    value: {
      customer_name,
      phone,
      address,
      line_items: parsedLineItems,
      notes,
      start_time: start.toISOString(),
      source,
      consent: true,
      service_type: firstItem.service_type,
      aircond_type: firstItem.aircond_type,
      aircond_size: firstItem.aircond_size,
      quantity: firstItem.quantity,
    },
  };
}
