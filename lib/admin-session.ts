import { createHmac, timingSafeEqual } from "node:crypto";

// ─────────────────────────────────────────────────────────────────────────
// Signed admin session token helpers.
//
// Lives in lib/ (not in a route file) because Next.js App Router route
// modules may only export route handlers and a fixed set of config keys —
// exporting helpers from `app/api/**/route.ts` is a type error.
//
// Token format: `<expiresAtMs>.<hmacSha256(expiresAtMs, secret)>`
// Stateless, so no session store is needed; rotating ADMIN_SESSION_SECRET
// immediately invalidates every outstanding session.
// ─────────────────────────────────────────────────────────────────────────

export const ADMIN_COOKIE = "klr_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export function signSession(secret: string, expiresAt: number): string {
  const payload = String(expiresAt);
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySession(token: string | undefined, secret: string): boolean {
  if (!token) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const a = new Uint8Array(Buffer.from(sig, "utf8"));
  const b = new Uint8Array(Buffer.from(expected, "utf8"));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

/**
 * Constant-time password compare.
 *
 * Both inputs are HMAC'd first so the buffers are always the same length —
 * this means we can always run a real constant-time comparison and never
 * leak the password length through an early return.
 */
export function safeEqual(a: string, b: string): boolean {
  const digest = (s: string) =>
    new Uint8Array(createHmac("sha256", "cmp").update(s, "utf8").digest());
  return timingSafeEqual(digest(a), digest(b));
}
