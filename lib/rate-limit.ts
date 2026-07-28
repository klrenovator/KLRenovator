// ─────────────────────────────────────────────────────────────────────────
// Minimal in-memory fixed-window rate limiter.
//
// Scope & limitations (read before relying on this):
//   • State lives in the Node process. On Vercel each serverless instance
//     has its own map, so the effective limit is (limit × warm instances).
//     That is still enough to stop a naive script hammering one endpoint.
//   • For a hard global guarantee, swap the `hit()` body for Vercel KV or
//     Upstash Redis — the call signature is designed to stay the same.
//
// This exists because /api/bookings had NO abuse protection at all: a
// trivial loop could create unlimited DB rows and Google Calendar events.
// ─────────────────────────────────────────────────────────────────────────

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Opportunistic cleanup so the map cannot grow without bound.
function sweep(now: number) {
  if (buckets.size < 5000) return;
  // Array.from avoids needing downlevelIteration under this tsconfig target.
  Array.from(buckets.keys()).forEach((key) => {
    const bucket = buckets.get(key);
    if (bucket && bucket.resetAt <= now) buckets.delete(key);
  });
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function hit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/**
 * Best-effort client IP. Vercel sets `x-forwarded-for`; the first entry is
 * the original client. Falls back to a constant so the limiter degrades to
 * "global" rather than "off" when no header is present.
 */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}
