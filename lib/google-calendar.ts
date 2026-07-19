import { google } from "googleapis";

// Ensure you set these in .env.local:
// GOOGLE_CLIENT_EMAIL
// GOOGLE_PRIVATE_KEY
// GOOGLE_CALENDAR_ID

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export function getCalendarClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  
  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    privateKey,
    SCOPES
  );

  return google.calendar({ version: "v3", auth });
}

export async function getBusySlots(dateStart: Date, dateEnd: Date) {
  try {
    const calendar = getCalendarClient();
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
    const calendar = getCalendarClient();
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
