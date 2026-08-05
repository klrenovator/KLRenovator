import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";

import { ADMIN_COOKIE, verifySession } from "@/lib/admin-session";

// ─────────────────────────────────────────────────────────────────────────
// SECURITY: this route previously returned five full `bookings` rows —
// customer names, phone numbers and home addresses — to ANY anonymous
// visitor who guessed the URL. That is a PDPA (Malaysia) exposure.
//
// It is now (a) admin-session gated and (b) returns only a connectivity
// check plus row count — never customer PII.
// ─────────────────────────────────────────────────────────────────────────

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const store = await cookies();

  if (!secret || !verifySession(store.get(ADMIN_COOKIE)?.value, secret)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { count, error } = await supabaseAdmin
      .from("bookings")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("[DEBUG-SUPABASE] DB error:", error);
      return NextResponse.json(
        { ok: false, error: "Supabase DB error" },
        { status: 500 },
      );
    }

    // Deliberately no row payload — count only.
    return NextResponse.json({ ok: true, message: "Supabase connection healthy", count });
  } catch (error) {
    console.error("[DEBUG-SUPABASE] Exception:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Supabase connection failed",
      },
      { status: 500 },
    );
  }
}
