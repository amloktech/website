import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  output: 'export',
  // Cloudflare serves the exported images directly, without a Next.js server.
  images: { unoptimized: true },
};
export default config;
