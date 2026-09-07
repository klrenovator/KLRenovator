import bundleAnalyzer from "@next/bundle-analyzer";

/**
 * Set ANALYZE=true npm run bundle-analyze to write interactive client, server
 * and edge bundle reports to .next/analyze/. This is deliberately opt-in so
 * normal production builds remain unchanged.
 *
 * @type {import('next').NextConfig}
 */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
  analyzerMode: "static",
});

const REPORT_TO_VALUE = JSON.stringify({
  group: "csp-endpoint",
  max_age: 31536000,
  endpoints: [{ url: "https://www.klrenovator.com/api/csp-report" }],
});

// P0-04b final: enforced CSP + report-only both from next.config (static pages remain prerendered)
// Middleware removed to keep 2120+ pages static. Nonce phase documented as next step.
// Enforced policy removes unsafe-eval, adds upgrade-insecure-requests, keeps unsafe-inline temporarily for GTM compat
const CSP_ENFORCED = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://wa.me https://api.whatsapp.com",
  "img-src 'self' data: blob: https: https://*.googleusercontent.com https://*.googleapis.com",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms https://va.vercel-scripts.com https://*.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://*.clarity.ms https://*.vercel-scripts.com https://*.supabase.co https://maps.googleapis.com https://www.googleapis.com https://*.doubleclick.net https://*.googleusercontent.com",
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://www.youtube.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
  "report-uri /api/csp-report",
  "report-to csp-endpoint",
].join("; ");

const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://wa.me https://api.whatsapp.com",
  "img-src 'self' data: blob: https://*.googleusercontent.com https://*.googleapis.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms https://va.vercel-scripts.com https://*.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.clarity.ms https://*.vercel-scripts.com https://*.supabase.co https://maps.googleapis.com https://www.googleapis.com https://*.doubleclick.net",
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://www.youtube.com",
  "worker-src 'self' blob:",
  "report-uri /api/csp-report",
  "report-to csp-endpoint",
].join("; ");

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800,
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'klrenovator.com' }],
        destination: 'https://www.klrenovator.com/:path*',
        statusCode: 301,
      },
      { source: '/servis/cuci-aircond-kl',          destination: '/ms/cuci-aircond-kl',                 statusCode: 301 },
      { source: '/servis/cuci-aircond',             destination: '/ms/cuci-aircond-kl',                 statusCode: 301 },
      { source: '/cuci-aircond',                    destination: '/ms/cuci-aircond-kl',                 statusCode: 301 },
      { source: '/servis/aircond-murah',            destination: '/ms/services/basic-servicing',        statusCode: 301 },
      { source: '/aircond-murah',                   destination: '/ms/services/basic-servicing',        statusCode: 301 },
      { source: '/harga-pasang-aircond',            destination: '/ms/installation-price-malaysia',     statusCode: 301 },
      { source: '/pasang-aircond',                  destination: '/ms/installation-price-malaysia',     statusCode: 301 },
      { source: '/installation-price',              destination: '/installation-price-malaysia',        statusCode: 301 },
      { source: '/servis/baiki-aircond-kl',         destination: '/ms/services/repair',                 statusCode: 301 },
      { source: '/baiki-aircond',                   destination: '/ms/services/repair',                 statusCode: 301 },
      { source: '/kontrak-penyelenggaraan-aircond', destination: '/ms/services/maintenance-contract',   statusCode: 301 },
      { source: '/harga-servis-aircond',            destination: '/ms/aircond-service-price-malaysia',  statusCode: 301 },
      { source: '/harga-servis-aircond-2026',       destination: '/ms/aircond-service-price-malaysia',  statusCode: 301 },
      { source: '/servis/harga-servis-aircond',     destination: '/ms/aircond-service-price-malaysia',  statusCode: 301 },
      { source: '/senarai-harga-aircond',           destination: '/ms/aircond-service-price-malaysia',  statusCode: 301 },
      { source: '/aircond-service-price',           destination: '/aircond-service-price-malaysia',     statusCode: 301 },
      { source: '/blog-2', destination: '/blog', statusCode: 301 },
      // ── GSC 404 cleanup (Sept 2026 audit) ────────────────────────────────
      // Historical URLs Google still crawls from the pre-Next.js (WordPress /
      // Pagelayer) era and from early blog slugs. Each 301 points at the live
      // equivalent so "Not found" validation can pass in Search Console.
      // Source-level causes were verified as gone from the codebase first:
      // the /services/{search_term_string} SearchAction was already removed
      // from the WebSite schema, and no internal link emits any of these paths.
      { source: '/blog/best-aircond-brands-malaysia-2025',          destination: '/blog/best-aircond-brands-malaysia-2026',   statusCode: 301 },
      { source: '/ms/blog/best-aircond-brands-malaysia-2025',       destination: '/ms/blog/best-aircond-brands-malaysia-2026', statusCode: 301 },
      { source: '/zh/blog/best-aircond-brands-malaysia-2025',       destination: '/zh/blog/best-aircond-brands-malaysia-2026', statusCode: 301 },
      // The MS indoor-air-quality page was renamed to its Bahasa slug.
      { source: '/ms/indoor-air-quality-aircond',                   destination: '/ms/kualiti-udara-dalaman-aircond',          statusCode: 301 },
      // The price guide lives at the root, not under /services/.
      { source: '/services/aircond-service-price-malaysia',         destination: '/aircond-service-price-malaysia',            statusCode: 301 },
      // Old assistant-tool path -> the diagnostic tool that replaced it.
      { source: '/aircond-assistant',                               destination: '/which-aircond-service-do-i-need',           statusCode: 301 },
      { source: '/ms/aircond-assistant',                            destination: '/ms/which-aircond-service-do-i-need',        statusCode: 301 },
      // Mangled template/parameter junk inherited from the old site —
      // collapse to the homepage so crawlers stop hitting 404s on them.
      // (/年 could not be matched by the redirects matcher and keeps serving
      // a clean 404, which is the correct response for a junk path.)
      { source: '/&',                                               destination: '/', statusCode: 301 },
      { source: '/$',                                               destination: '/', statusCode: 301 },
      { source: '/year',                                            destination: '/', statusCode: 301 },
      { source: '/tahun',                                           destination: '/', statusCode: 301 },
      // NOTE on ?pagelayer-template=... (GSC "Alternative page with proper
      // canonical"): Next.js redirects ALWAYS preserve the incoming query
      // string, so destination '/' redirects to itself — an infinite loop
      // (verified locally: the previous rules 301'd to their own URL,
      // including the old home-header rule). Query-stripping redirects are
      // impossible in next.config, and middleware was deliberately removed
      // from this project to keep 2,100+ pages static. Correct handling,
      // already in place:
      //   1. These URLs serve homepage HTML whose canonical is the bare
      //      homepage, so Google consolidates them ("alternative page with
      //      proper canonical" is an informational exclusion, not an error).
      //   2. public/robots.txt disallows /*?pagelayer-template= so they are
      //      never crawled again.
      // Do NOT re-add a redirect rule for these without testing for loops.
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Report-To', value: REPORT_TO_VALUE },
          // P0-04b: enforced CSP live (no unsafe-eval, upgrade-insecure-requests) + report-only for monitoring
          { key: 'Content-Security-Policy', value: CSP_ENFORCED },
          { key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
