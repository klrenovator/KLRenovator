import { NextResponse } from "next/server";
import { getBusySlots } from "@/lib/google-calendar";
import { BOOKING_HOURS } from "@/lib/booking-config";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const durationParam = searchParams.get("duration"); // duration in minutes

    if (!dateParam || !durationParam) {
      return NextResponse.json({ error: "Missing date or duration" }, { status: 400 });
    }

    const durationMinutes = parseInt(durationParam, 10);
    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
      return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
    }
    
    // Convert YYYY-MM-DD to Malaysia Timezone strictly (+08:00)
    const dateStr = dateParam.split("T")[0];
    const startHourStr = BOOKING_HOURS.start.toString().padStart(2, "0");
    const endHourStr = BOOKING_HOURS.end.toString().padStart(2, "0");

    const startMyt = new Date(`${dateStr}T${startHourStr}:00:00+08:00`);
    const endMyt = new Date(`${dateStr}T${endHourStr}:00:00+08:00`);

    // Fetch busy slots from Google Calendar
    const busySlots = await getBusySlots(startMyt, endMyt);

    const availableSlots = [];
    const slotIntervalMinutes = 30;
    
    let currentSlot = new Date(startMyt);
    
    // Condition: The job MUST FINISH before or exactly at the 'endMyt' (6:00 PM)
    while (currentSlot.getTime() + durationMinutes * 60000 <= endMyt.getTime()) {
      const slotEnd = new Date(currentSlot.getTime() + durationMinutes * 60000);
      
      // Check for overlap with busy slots
      const isOverlapping = busySlots.some((busy) => {
        if (!busy.start || !busy.end) return false;
        const busyStart = new Date(busy.start).getTime();
        const busyEnd = new Date(busy.end).getTime();
        
        // Overlap condition: slot starts before busy ends AND slot ends after busy starts
        return currentSlot.getTime() < busyEnd && slotEnd.getTime() > busyStart;
      });
      
      if (!isOverlapping) {
        availableSlots.push(new Date(currentSlot));
      }
      
      // Advance by 30 mins
      currentSlot = new Date(currentSlot.getTime() + slotIntervalMinutes * 60000);
    }

    return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error("Availability API Error:", error);
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}
