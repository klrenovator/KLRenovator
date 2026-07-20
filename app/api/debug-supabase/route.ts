import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { data, error } = await supabaseAdmin.from("bookings").select("*").limit(5);

    if (error) {
      return NextResponse.json({ error: "Supabase DB Error", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: data.length, rows: data });
  } catch (error: any) {
    return NextResponse.json({ error: "Supabase Connection Failed", details: error.message || String(error) }, { status: 500 });
  }
}
