/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  // Enable static export for GitHub Pages
  output: 'export',
  images: {
    // GitHub Pages doesn't have an image optimizer
    unoptimized: true
  }
};

export default nextConfig;
