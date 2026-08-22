import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000;

type ContactPayload = {
  name: string;
  area: string;
  service: string;
  units: string;
  hp?: string;
  message?: string;
  company_website?: string;
};

function validateContact(body: unknown): { ok: true; value: ContactPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Invalid body" };
  const b = body as Record<string, unknown>;
  if (typeof b.company_website === "string" && b.company_website.trim() !== "") {
    // honeypot – pretend success
    return { ok: true, value: { name: "", area: "", service: "", units: "" } };
  }
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const area = typeof b.area === "string" ? b.area.trim() : "";
  const service = typeof b.service === "string" ? b.service.trim() : "";
  const units = typeof b.units === "string" ? b.units.trim() : "";
  const hp = typeof b.hp === "string" ? b.hp.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim().slice(0, 2000) : "";

  if (!name || name.length < 2) return { ok: false, error: "Name too short" };
  if (!area || area.length < 2) return { ok: false, error: "Area required" };
  if (!service) return { ok: false, error: "Service required" };
  if (!units) return { ok: false, error: "Units required" };

  return { ok: true, value: { name, area, service, units, hp, message } };
}

export async function POST(req: Request) {
  try {
    const limit = await rateLimit(`contact:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_MS);
    if (!limit.allowed) {
      return NextResponse.json({ error: "Too many requests, please try again shortly." }, { status: 429 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = validateContact(body);
    if (!parsed.ok) {
      // honeypot case returns ok true with empty name – we handle below
      if ((body as any)?.company_website) {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { name, area, service, units, hp, message } = parsed.value;

    // If honeypot triggered (empty name), pretend success
    if (!name && !area) {
      return NextResponse.json({ ok: true });
    }

    // Try to persist to Supabase if configured – but don't fail if not
    try {
      const supabase = getSupabaseAdmin();
      await supabase.from("contact_leads").insert({
        customer_name: name,
        area,
        service,
        units,
        hp: hp || null,
        message: message || null,
        source: "contact_form",
        created_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("Contact lead storage not configured or failed, continuing:", e);
      // Continue – lead still goes to WhatsApp
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
