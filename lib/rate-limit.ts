// ─────────────────────────────────────────────────────────────────────────
// Shared, fixed-window rate limiter.
//
// Production uses Upstash Redis REST when UPSTASH_REDIS_REST_URL and
// UPSTASH_REDIS_REST_TOKEN are configured. The small in-memory fallback keeps
// local development and deliberately minimal preview deployments protected,
// but is not relied on for a global serverless guarantee.
// ─────────────────────────────────────────────────────────────────────────

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  /** True when the decision came from the deployment-wide Redis store. */
  shared: boolean;
};

function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function hitInMemory(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: Math.max(0, limit - 1), retryAfterSeconds: 0, shared: false };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      shared: false,
    };
  }

  return { allowed: true, remaining: Math.max(0, limit - existing.count), retryAfterSeconds: 0, shared: false };
}

function upstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

type UpstashPipelineReply = Array<{ result?: unknown; error?: string }>;

/**
 * Enforces a limit against Upstash Redis when configured. The Redis pipeline
 * increments atomically, sets expiry only for a fresh key, then reads TTL.
 * If the optional shared store is unavailable, the bounded local limiter is a
 * safe availability fallback and the error is logged server-side.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const config = upstashConfig();
  if (!config) return hitInMemory(key, limit, windowMs);

  try {
    const response = await fetch(`${config.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["PEXPIRE", key, windowMs, "NX"],
        ["PTTL", key],
      ]),
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });

    if (!response.ok) throw new Error(`Upstash returned ${response.status}`);
    const reply = await response.json() as UpstashPipelineReply;
    const count = Number(reply[0]?.result);
    const ttlMs = Number(reply[2]?.result);
    if (!Number.isSafeInteger(count) || count < 1) throw new Error("Upstash returned an invalid count");

    return {
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      retryAfterSeconds: count <= limit || ttlMs <= 0 ? 0 : Math.max(1, Math.ceil(ttlMs / 1000)),
      shared: true,
    };
  } catch (error) {
    console.error("[rate-limit] Shared store unavailable; using local fallback:", error);
    return hitInMemory(key, limit, windowMs);
  }
}

/**
 * Best-effort client IP. Vercel sets x-forwarded-for; use the first address
 * supplied by the trusted deployment proxy and fall back to a global bucket
 * rather than leaving an endpoint unprotected.
 */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}
