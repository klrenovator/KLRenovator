/**
 * Bundle Analyzer (audit P1-03):
 *   npm install --save-dev @next/bundle-analyzer
 *   Wrap this config with `withBundleAnalyzer({...})` from
 *   '@next/bundle-analyzer' and run ANALYZE=true npm run build.
 *   Then review per-route JS budgets and lazy-load below-fold widgets.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Lint runs in CI (`npm run lint`) rather than inside `next build`.
  // Keeping it out of the build avoids the FlatCompat/eslint-plugin-react
  // "Converting circular structure to JSON" crash that this
  // eslint-config-next pairing hits, while still gating every push —
  // see .github/workflows/ci.yml, which runs lint + typecheck + build.
  // NOTE: the flat config previously matched no .ts/.tsx files at all, so
  // linting was silently a no-op. That is fixed in eslint.config.mjs.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Round 16 / 20H.80: include real mobile viewport widths so the
    // homepage hero and other full-width images do not force 640px+
    // variants on 360–414px phones.
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800,
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  // ✅ Force non-www to www redirect (application-level)
  // ✅ PLUS Malay URL slug aliases — Round 13 / 20F.51 (Decision Locked 2026-07-06):
  // Friendly /servis/* Malay short-URLs permanently 301 to the canonical
  // /ms/services/* pages. Preserves all EN/MS canonical routes and SEO
  // equity while capturing native Bahasa Malaysia search queries like
  // "cuci aircond KL", "servis aircond murah", "harga pasang aircond".
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'klrenovator.com',
          },
        ],
        destination: 'https://www.klrenovator.com/:path*',
        // Use explicit 301. Next.js `permanent: true` emits 308 on Vercel.
        statusCode: 301,
      },
      // ── Malay URL slug aliases (Round 13 / 20F.51 + Round 23 / 20F.50) ──
      // 20F.50 Cuci Aircond KL dedicated landing — v30
      // Top-volume native search queries now resolve to the dedicated
      // trilingual /cuci-aircond-kl cluster landing pages instead of the
      // generic /ms/services/chemical-wash service detail.
      // 301 permanent preserves full link equity.
      // NOTE: /cuci-aircond-kl is now a real static page (EN primary),
      // so the old redirect that pointed /cuci-aircond-kl → /ms/services/chemical-wash
      // has been removed to allow the new landing to serve 200 OK.
      { source: '/servis/cuci-aircond-kl',          destination: '/ms/cuci-aircond-kl',                 statusCode: 301 },
      { source: '/servis/cuci-aircond',             destination: '/ms/cuci-aircond-kl',                 statusCode: 301 },
      { source: '/cuci-aircond',                    destination: '/ms/cuci-aircond-kl',                 statusCode: 301 },
      { source: '/servis/aircond-murah',            destination: '/ms/services/basic-servicing',        statusCode: 301 },
      { source: '/aircond-murah',                   destination: '/ms/services/basic-servicing',        statusCode: 301 },
      // Round 25 / 20F.53: Malay aliases now point to dedicated installation price landing
      { source: '/harga-pasang-aircond',            destination: '/ms/installation-price-malaysia',     statusCode: 301 },
      { source: '/pasang-aircond',                  destination: '/ms/installation-price-malaysia',     statusCode: 301 },
      { source: '/installation-price',              destination: '/installation-price-malaysia',        statusCode: 301 },
      { source: '/servis/baiki-aircond-kl',         destination: '/ms/services/repair',                 statusCode: 301 },
      { source: '/baiki-aircond',                   destination: '/ms/services/repair',                 statusCode: 301 },
      { source: '/kontrak-penyelenggaraan-aircond', destination: '/ms/services/maintenance-contract',   statusCode: 301 },
      // Round 50 / 20G.77: Malay aliases for Harga Servis Aircond 2026 pricing guide
      { source: '/harga-servis-aircond',            destination: '/ms/aircond-service-price-malaysia',  statusCode: 301 },
      { source: '/harga-servis-aircond-2026',       destination: '/ms/aircond-service-price-malaysia',  statusCode: 301 },
      { source: '/servis/harga-servis-aircond',     destination: '/ms/aircond-service-price-malaysia',  statusCode: 301 },
      { source: '/senarai-harga-aircond',           destination: '/ms/aircond-service-price-malaysia',  statusCode: 301 },
      { source: '/aircond-service-price',           destination: '/aircond-service-price-malaysia',     statusCode: 301 },
      // Old WordPress/Legacy Redirects from Bing Webmaster Tools
      { source: '/blog-2', destination: '/blog', statusCode: 301 },
      // NOTE: /privacy-policy used to 301 to the homepage. It is now a real
      // page (app/privacy-policy/page.tsx) — required because the booking
      // form collects names, phone numbers and addresses (PDPA 2010).
      // The redirect has been removed so the page can serve 200 OK.
      // Note: Query parameter redirects like /?pagelayer-template=home-header cannot be handled purely by source matching in Next.js.
      // Next.js handles query params in redirects using the `has` array, which we will add below.
      { 
        source: '/', 
        has: [{ type: 'query', key: 'pagelayer-template', value: 'home-header' }], 
        destination: '/', 
        statusCode: 301 
      },

    ];
  },
  // ✅ Security headers — Google trust/ranking signal + Lighthouse "Best Practices"
  // ── Content-Security-Policy (audit item P0-04) ─────────────────────────────
  // Phase 1 (this session): REPORT-ONLY rollout. The policy below is designed to
  // be enforceable, but is deliberately sent as `Content-Security-Policy-Report-Only`
  // so the site keeps working unchanged while browsers report every violation to
  // /api/csp-report. 'unsafe-inline' remains in script-src because GTM, the
  // <html lang> fixer, Clarity, GA4 and the JSON-LD blocks are inline scripts;
  // enforcement (nonce/hash strategy) is tracked as P0-04b in DEEP_WEBSITE_AUDIT.md.
  // Violations must be reviewed for at least one full production cycle before the
  // policy is switched to enforcement (drop the "-Report-Only" suffix).
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            // CSP3 report group consumed by the `report-to` directive.
            key: 'Report-To',
            value: '{"group":"csp-endpoint","max_age":31536000,"endpoints":[{"url":"https://www.klrenovator.com/api/csp-report"}]}',
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'self'",
              "form-action 'self' https://wa.me https://api.whatsapp.com",
              "img-src 'self' data: blob: https://*.googleusercontent.com https://*.googleapis.com",
              // GTM container, GA4 loader, Clarity tag, Vercel Analytics.
              // 'unsafe-eval' listed so Next dev / React dev can keep working
              // during the report-only phase — remove it at enforcement if the
              // violation log shows nothing needs it in production.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms https://va.vercel-scripts.com https://*.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://*.clarity.ms https://*.vercel-scripts.com https://*.supabase.co https://maps.googleapis.com https://www.googleapis.com https://*.doubleclick.net",
              "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://www.youtube.com",
              "worker-src 'self' blob:",
              "report-uri /api/csp-report",
              "report-to csp-endpoint",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
