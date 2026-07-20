import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createCalendarEvent } from "@/lib/google-calendar";
import { SERVICE_DURATION_RULES } from "@/lib/booking-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_name, phone, address, service_type, aircond_type, quantity, start_time, source = "web" } = body;

    if (!customer_name || !phone || !address || !service_type || !aircond_type || !quantity || !start_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Calculate duration
    const durationHours = SERVICE_DURATION_RULES[service_type as keyof typeof SERVICE_DURATION_RULES];
    if (!durationHours) {
      return NextResponse.json({ error: "Invalid service type" }, { status: 400 });
    }

    const calculated_duration_minutes = durationHours * quantity * 60;
    const start = new Date(start_time);
    const end = new Date(start.getTime() + calculated_duration_minutes * 60000);

    let calendar_event_id = null;
    
    // Google Calendar insertion ko Try/Catch main dala hai
    try {
      if (process.env.GOOGLE_CALENDAR_ID) {
        const eventSummary = `${service_type.toUpperCase()} - ${customer_name}`;
        const eventDescription = `Phone: ${phone}\nAddress: ${address}\nAircond Type: ${aircond_type}\nQuantity: ${quantity}\nSource: ${source}`;
        
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
