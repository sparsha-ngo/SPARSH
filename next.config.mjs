/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hosted on Cloudflare Pages as a static export.
  // Next.js compiles the entire application to HTML/CSS/JS into `out/`.
  output: "export",
  images: {
    unoptimized: true,
  },
  // Keep trailing slashes so URLs (e.g. /bye-laws/) resolve cleanly to directory index.html.
  trailingSlash: true,
};

export default nextConfig;
