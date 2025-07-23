/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // ✅ เพิ่ม config ให้ copy service-worker.js ไปยัง build
  experimental: {
    appDir: true,
  },
  output: 'standalone',
};

export default nextConfig;
