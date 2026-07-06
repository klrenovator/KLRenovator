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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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
        permanent: true,
      },
      // ── Malay URL slug aliases (Round 13 / 20F.51) ─────────────
      // Top-volume native search queries redirected to canonical MS pages.
      // 301 permanent preserves full link equity.
      { source: '/servis/cuci-aircond-kl',          destination: '/ms/services/chemical-wash',          permanent: true },
      { source: '/servis/cuci-aircond',             destination: '/ms/services/chemical-wash',          permanent: true },
      { source: '/cuci-aircond',                    destination: '/ms/services/chemical-wash',          permanent: true },
      { source: '/cuci-aircond-kl',                 destination: '/ms/services/chemical-wash',          permanent: true },
      { source: '/servis/aircond-murah',            destination: '/ms/services/basic-servicing',        permanent: true },
      { source: '/aircond-murah',                   destination: '/ms/services/basic-servicing',        permanent: true },
      { source: '/harga-pasang-aircond',            destination: '/ms/services/installation',           permanent: true },
      { source: '/pasang-aircond',                  destination: '/ms/services/installation',           permanent: true },
      { source: '/servis/baiki-aircond-kl',         destination: '/ms/services/repair',                 permanent: true },
      { source: '/baiki-aircond',                   destination: '/ms/services/repair',                 permanent: true },
      { source: '/kontrak-penyelenggaraan-aircond', destination: '/ms/services/maintenance-contract',   permanent: true },
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
