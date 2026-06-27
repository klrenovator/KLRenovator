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
