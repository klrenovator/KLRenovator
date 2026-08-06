import "server-only";

// Ensure you set these in .env.local:
// GOOGLE_CLIENT_EMAIL
// GOOGLE_PRIVATE_KEY
// GOOGLE_CALENDAR_ID
//
// Performance note (P2-04): `googleapis` is a large all-Google-APIs package.
// Ideal is `@googleapis/calendar` for faster cold-start. This file now uses
// dynamic import so the heavy package is only loaded when a calendar function
// is actually called, not on every serverless invocation that imports this module.
// Full swap to `@googleapis/calendar` is tracked as future optimization.

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export async function getCalendarClient() {
  const { google } = await import("googleapis");
  // Robust Private Key Formatting: Handle multiple variations of how Vercel might pass the key
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || "";
  
  // 1. If it was passed with literal "\n" characters, replace them
  privateKey = privateKey.replace(/\\n/g, "\n");
  
  // 2. If it lost its formatting entirely (no spaces or newlines between BEGIN/END tags)
  if (!privateKey.includes("\n") && privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
    privateKey = privateKey.replace("-----BEGIN PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----\n");
    privateKey = privateKey.replace("-----END PRIVATE KEY-----", "\n-----END PRIVATE KEY-----\n");
    // Replace spaces inside the base64 part with newlines (often happens if copy-pasted without quotes)
    const parts = privateKey.split("\n");
    if (parts.length === 3) {
      parts[1] = parts[1].replace(/ /g, "\n");
      privateKey = parts.join("\n");
    }
  }

  // 3. Ensure no trailing/leading extra quotes
  privateKey = privateKey.replace(/^"|"$/g, '').trim();
  
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: SCOPES,
  });

  return google.calendar({ version: "v3", auth });
}

export async function getBusySlots(dateStart: Date, dateEnd: Date) {
  try {
    const calendar = await getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) return [];

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: dateStart.toISOString(),
        timeMax: dateEnd.toISOString(),
        timeZone: "Asia/Kuala_Lumpur",
        items: [{ id: calendarId }],
      },
    });

    const busy = response.data.calendars?.[calendarId]?.busy || [];
    return busy;
  } catch (error) {
    console.error("Google Calendar Error:", error);
    return [];
  }
}

export async function createCalendarEvent(eventDetails: {
  summary: string;
  description: string;
  start: Date;
  end: Date;
}) {
  try {
    const calendar = await getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) return null;

    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: eventDetails.summary,
        description: eventDetails.description,
        start: {
          dateTime: eventDetails.start.toISOString(),
          timeZone: "Asia/Kuala_Lumpur",
        },
        end: {
          dateTime: eventDetails.end.toISOString(),
          timeZone: "Asia/Kuala_Lumpur",
        },
      },
    });

    return response.data.id;
  } catch (error) {
    console.error("Failed to create Google Calendar Event:", error);
    return null;
  }
}
