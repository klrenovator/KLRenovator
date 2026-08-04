// ─────────────────────────────────────────────────────────────────────────
// Rate limiter with shared storage support.
//
// Supports two backends:
// 1. Vercel KV (production) - uses Redis for distributed rate limiting
// 2. In-memory (development/fallback) - works locally but not across instances
//
// The `hit()` function automatically uses the best available backend.
// ─────────────────────────────────────────────────────────────────────────

// Vercel KV import - conditionally used when available
let kv: Awaited<ReturnType<typeof import('@vercel/kv').kv>> | null = null;

async function getKvStore() {
  if (kv !== null) return kv;
  
  try {
    // Only import and initialize KV if we're in a Vercel environment
    // with the required environment variables
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { createClient } = await import('@vercel/kv');
      kv = createClient({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });
      // Test connection
      await kv.ping();
      console.log('[rate-limit] Using Vercel KV for distributed rate limiting');
      return kv;
    }
  } catch (error) {
    console.warn('[rate-limit] Vercel KV not available, falling back to in-memory');
  }
  
  kv = null;
  return null;
}

// ── In-memory fallback ─────────────────────────────────────────────────
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function sweepInMemory(now: number) {
  if (buckets.size < 5000) return;
  Array.from(buckets.keys()).forEach((key) => {
    const bucket = buckets.get(key);
    if (bucket && bucket.resetAt <= now) buckets.delete(key);
  });
}

function hitInMemory(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  sweepInMemory(now);

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

// ── Vercel KV implementation ─────────────────────────────────────────
async function hitKv(key: string, limit: number, windowMs: number) {
  const store = await getKvStore();
  if (!store) return hitInMemory(key, limit, windowMs);

  const now = Date.now();
  const windowSeconds = Math.ceil(windowMs / 1000);
  const bucketKey = `rl:${key}:${Math.floor(now / windowMs)}`;

  try {
    const result = await store.incr(bucketKey);
    const count = result as number;
    
    // Set expiry on first request in window
    if (count === 1) {
      await store.expire(bucketKey, windowSeconds + 1);
    }

    if (count > limit) {
      const ttl = await store.ttl(bucketKey);
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(1, ttl > 0 ? ttl : Math.ceil(windowMs / 1000)),
      };
    }

    return { allowed: true, remaining: limit - count, retryAfterSeconds: 0 };
  } catch (error) {
    console.error('[rate-limit] KV error, falling back to in-memory:', error);
    return hitInMemory(key, limit, windowMs);
  }
}

// ── Public API ───────────────────────────────────────────────────────
export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

/**
 * Record a hit against a rate limit bucket.
 * 
 * Uses Vercel KV in production (when KV_REST_API_URL and KV_REST_API_TOKEN are set),
 * falls back to in-memory storage for local development.
 * 
 * @param key - Unique identifier for this rate limit bucket (e.g., IP address + endpoint)
 * @param limit - Maximum number of requests allowed in the window
 * @param windowMs - Window size in milliseconds
 */
export async function hit(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  // Synchronous fallback for when we're not in an async context
  // or when KV isn't configured
  const store = await getKvStore();
  if (!store) {
    return hitInMemory(key, limit, windowMs);
  }
  return hitKv(key, limit, windowMs);
}

/**
 * Synchronous version using in-memory storage only.
 * Use this when async is not convenient and distributed limiting is not critical.
 */
export function hitSync(key: string, limit: number, windowMs: number): RateLimitResult {
  return hitInMemory(key, limit, windowMs);
}

/**
 * Best-effort client IP extraction from request headers.
 * Works with Vercel, Nginx, and most proxies.
 */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  
  // Vercel-specific
  const vercelIp = req.headers.get("x-vercel-forwarded-for")?.trim();
  if (vercelIp) return vercelIp.split(",")[0].trim();
  
  return "unknown";
}

/**
 * Helper to create a rate limit key from IP and endpoint.
 */
export function makeKey(ip: string, endpoint: string): string {
  return `${ip}:${endpoint}`;
}
