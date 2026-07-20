import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google-calendar";

export async function GET(req: Request) {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
      return NextResponse.json({ error: "No Calendar ID set in Vercel" }, { status: 400 });
    }

    // Try a simple read request to check auth
    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 1,
      singleEvents: true,
    });

    return NextResponse.json({ success: true, message: "Calendar Auth is working!" });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Calendar Auth Failed", 
      details: error.message || String(error)
    }, { status: 500 });
  }
}
