import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCalendarClient } from "@/lib/google-calendar";

import { ADMIN_COOKIE, verifySession } from "@/lib/admin-session";

// Admin-gated connectivity probe. Previously public, and its error branch
// echoed raw Google API messages (which can include the service-account
// email and calendar ID) to anonymous callers.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const store = await cookies();

  if (!secret || !verifySession(store.get(ADMIN_COOKIE)?.value, secret)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    return NextResponse.json({ ok: false, error: "GOOGLE_CALENDAR_ID is not set" }, { status: 400 });
  }

  try {
    const calendar = getCalendarClient();
    await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 1,
      singleEvents: true,
    });

    return NextResponse.json({ ok: true, message: "Calendar auth is working" });
  } catch (error) {
    console.error("[DEBUG-CALENDAR] Auth failure:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Calendar auth failed",
      },
      { status: 500 },
    );
  }
}
