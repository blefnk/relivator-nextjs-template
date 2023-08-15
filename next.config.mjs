await import("./src/utils/appts/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  typescript: {
    // ?? Dangerously allow builds to successfully complete even if your project has type errors.
    // !! Turn Back on When Things are Stable !!
    ignoreBuildErrors: true
  },
  experimental: {
    serverComponentsExternalPackages: ["mysql2"],
    serverActions: true
    // ==========================================
    // ?? https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
    // typedRoutes: true
  },
  reactStrictMode: true
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };
  //   return config;
  // }
};

export default nextConfig;
