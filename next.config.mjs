/** @type {import('next').NextConfig} */
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
