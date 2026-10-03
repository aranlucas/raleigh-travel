import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: { cpus: 2 },
  redirects() {
    return [
      {
        source: "/study/:path*",
        destination: "https://oral-boards.vercel.app/study/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
