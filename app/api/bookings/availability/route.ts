import { NextResponse } from "next/server";
import { getBusySlots } from "@/lib/google-calendar";
import { BUSINESS_HOURS } from "@/lib/booking-config";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const durationParam = searchParams.get("duration"); // duration in minutes

    if (!dateParam || !durationParam) {
      return NextResponse.json({ error: "Missing date or duration" }, { status: 400 });
    }

    const durationMinutes = parseInt(durationParam, 10);
    const requestedDate = new Date(dateParam);
    
    // Set time range for the given day
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(BUSINESS_HOURS.start, 0, 0, 0);
    
    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(BUSINESS_HOURS.end, 0, 0, 0);

    // Fetch busy slots from Google Calendar
    const busySlots = await getBusySlots(startOfDay, endOfDay);

    // Generate possible slots (e.g. every 30 mins)
    const availableSlots = [];
    const slotIntervalMinutes = 30;
    
    let currentSlot = new Date(startOfDay);
    
    while (currentSlot.getTime() + durationMinutes * 60000 <= endOfDay.getTime()) {
      const slotEnd = new Date(currentSlot.getTime() + durationMinutes * 60000);
      
      // Check for overlap with busy slots
      const isOverlapping = busySlots.some((busy: any) => {
        const busyStart = new Date(busy.start).getTime();
        const busyEnd = new Date(busy.end).getTime();
        
        // Overlap condition
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
