import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'innoveity.com',
      }
    ]
  }
};

export default nextConfig;
