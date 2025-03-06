import type { NextConfig } from "next";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "api.github.com" },
      { protocol: "https", hostname: "**.githubassets.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
} satisfies NextConfig;

export default nextConfig;
