/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint's build-time runner crashes on this project's flat-config +
  // FlatCompat combination ("Converting circular structure to JSON",
  // thrown inside eslint-plugin-react's plugin object) — a known
  // compatibility gap between this eslint-config-next/eslint pairing.
  // This does NOT disable ESLint itself: `npm run lint` still works
  // standalone, and editor/CI lint integrations are unaffected. Only
  // Next's internal lint-during-build step is skipped. TypeScript build
  // errors (the real type-safety net) are NOT suppressed — see below.
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
    ];
  },
  // ✅ Security headers — Google trust/ranking signal + Lighthouse "Best Practices"
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
        ],
      },
    ];
  },
};

export default nextConfig;
