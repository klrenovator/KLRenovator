/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allows production builds to complete even if ESLint errors exist
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bypasses extra structural checks during deployment
    ignoreBuildErrors: true,
  },
  images: {
    // Enable modern image formats for better Core Web Vitals
    formats: ["image/avif", "image/webp"],
    // Responsive image sizes for srcSet generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL for optimized images (1 week)
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
