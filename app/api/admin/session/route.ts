import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ADMIN_COOKIE, verifySession } from "@/lib/admin-session";

// Lightweight "am I still logged in?" probe used by <AdminAuth> on mount.
// The session cookie is HttpOnly, so client JS cannot read it directly.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return NextResponse.json({ authenticated: false, configured: false });

  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;

  return NextResponse.json({
    authenticated: verifySession(token, secret),
    configured: true,
  });
}
