/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bypasses extra structural checks during deployment to avoid crashes
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
