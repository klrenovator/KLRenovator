import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createCalendarEvent } from "@/lib/google-calendar";
import { calculateDurationMinutes } from "@/lib/booking-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      customer_name, 
      phone, 
      address, 
      service_type, 
      aircond_type, 
      aircond_size,
      quantity, 
      start_time, 
      source = "web" 
    } = body;

    if (!customer_name || !phone || !address || !service_type || !aircond_type || !aircond_size || !quantity || !start_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Calculate total duration in minutes
    const calculated_duration_minutes = calculateDurationMinutes(service_type, aircond_type, quantity);
    
    const start = new Date(start_time);
    
    // For Google Calendar, we cap the event length to max 1 full day (8 hours / 480 mins)
    // so it doesn't span over midnight into non-working hours. 
    // The database still saves the TRUE full calculated_duration_minutes.
    const eventDurationMinutes = Math.min(calculated_duration_minutes, 480);
    const end = new Date(start.getTime() + eventDurationMinutes * 60000);

    let calendar_event_id = null;
    
    try {
      if (process.env.GOOGLE_CALENDAR_ID) {
        const eventSummary = `${service_type.toUpperCase()} - ${customer_name}`;
        const eventDescription = `Phone: ${phone}\nAddress: ${address}\nAircond Type: ${aircond_type}\nSize (HP): ${aircond_size}\nQuantity: ${quantity}\nSource: ${source}\nTotal Est. Time: ${calculated_duration_minutes / 60} hours`;
        
        calendar_event_id = await createCalendarEvent({
          summary: eventSummary,
          description: eventDescription,
          start,
          end,
        });
      }
    } catch (calError) {
      console.error("Google Calendar Warning:", calError);
    }

    // Insert into Supabase
    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .insert([
        {
          customer_name,
          phone,
          address,
          service_type,
          aircond_type,
          aircond_size,
          quantity,
          calculated_duration_minutes,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          source,
          calendar_event_id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Database Error:", error);
      return NextResponse.json({ error: `DB Error: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Booking API Fatal Error:", error);
    return NextResponse.json({ error: "System failed to process booking" }, { status: 500 });
  }
}
