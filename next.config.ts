import type { NextConfig } from "next";

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
} satisfies NextConfig;

export default nextConfig;
