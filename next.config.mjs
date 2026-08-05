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

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Include real mobile viewport widths so hero and full-width images do not force 640px+ variants on 360–414px phones.
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800,
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  // Force non-www to www + Malay short-URL aliases (see CHANGELOG.md for history)
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
        statusCode: 301,
      },
      // Malay short-URL aliases → canonical localized pages (301 preserves equity)
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
      { 
        source: '/', 
        has: [{ type: 'query', key: 'pagelayer-template', value: 'home-header' }], 
        destination: '/', 
        statusCode: 301 
      },
    ];
  },
  // Security headers — HSTS, XFO, nosniff, referrer, permissions, CSP Report-Only (P0-04)
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

export default withBundleAnalyzer(nextConfig);
