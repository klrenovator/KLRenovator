import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

import { ADMIN_COOKIE, SESSION_TTL_SECONDS, signSession, safeEqual } from "@/lib/admin-session";

// ─────────────────────────────────────────────────────────────────────────
// Admin login — server-side password check + signed HttpOnly session cookie.
//
// Replaces the previous client-only check in components/admin-auth.tsx,
// which hardcoded the password in source (shipped to every browser and
// committed to a public repo) and could be bypassed entirely by typing
// `localStorage.setItem("klr_admin_auth","true")` in DevTools.
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   ADMIN_PASSWORD        the actual admin password
//   ADMIN_SESSION_SECRET  a long random string used to sign the cookie
//
// If either is missing the route refuses all logins (fail closed) rather
// than falling back to a default password.
// ─────────────────────────────────────────────────────────────────────────

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!password || !secret) {
    console.error(
      "[admin/login] ADMIN_PASSWORD or ADMIN_SESSION_SECRET is not configured — refusing login.",
    );
    return NextResponse.json(
      { error: "Admin login is not configured on this deployment." },
      { status: 503 },
    );
  }

  let submitted = "";
  try {
    const body = await req.json();
    submitted = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Small randomised delay blunts trivial online brute-forcing without
  // needing shared state. This route is not linked or indexed.
  await new Promise((r) => setTimeout(r, 250 + randomBytes(1)[0]));

  if (!safeEqual(submitted, password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const res = NextResponse.json({ ok: true });

  res.cookies.set(ADMIN_COOKIE, signSession(secret, expiresAt), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
