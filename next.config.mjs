/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hosted on GoDaddy Node.js Hosting, which runs a persistent Node process:
  // `next build` then `next start` (see package.json). No static export.
  // Keep trailing slashes so URLs already indexed from the previous host still resolve.
  trailingSlash: true,
};

export default nextConfig;
