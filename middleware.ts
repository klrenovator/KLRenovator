import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────
// KL Renovator — middleware (intentionally a no-op).
//
// Architecture decision (locked in 19 June 2026): English lives unprefixed
// at the root (e.g. /areas/petaling-jaya — unchanged, protects existing
// SEO equity). Bahasa Malaysia and Mandarin live under literal /ms/ and
// /zh/ folder routes (e.g. /ms/areas/petaling-jaya, /zh/areas/petaling-jaya).
// There is NO dynamic [lang] catch-all segment — each locale is its own
// real, separate, statically-generated App Router folder tree
// (see app/ms/areas/[slug]/page.tsx and app/zh/areas/[slug]/page.tsx for
// the pattern). Because of this, routing itself needs NO middleware logic
// at all — Next.js handles the literal folder paths natively.
//
// We deliberately do NOT use middleware to redirect visitors based on
// browser language (Accept-Language) — that would confuse Googlebot/AI
// crawlers and risks being treated as cloaking. We also deliberately do
// NOT use middleware to pass a locale header into the root layout for a
// dynamic <html lang> attribute — see the long comment in app/layout.tsx
// for why (it would force the whole site out of static generation).
// So: this file stays a clean no-op. Do not add routing logic here unless
// the architecture decision above changes.
// ─────────────────────────────────────────────────────────────────────────

export const config = {
  matcher: [],
};

export function middleware(request: NextRequest) {
  return NextResponse.next();
}
