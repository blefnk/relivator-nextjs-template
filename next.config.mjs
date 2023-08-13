await import("./src/utils/server/app/env.mjs");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mysql2"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default config;
