/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages serves files only, so the app is exported as static HTML.
  output: "export",
  // Emit "bye-laws/index.html" so extensionless URLs resolve on a static host.
  trailingSlash: true,
};

export default nextConfig;
