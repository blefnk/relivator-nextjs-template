/** @see https://nextjs.org/docs/app/building-your-application/configuring */

/**
 * If you need, you can run `build` or `dev` with `SKIP_ENV_VALIDATION`.
 * It skips env validation. This is especially useful for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mysql2"]
  },
  images: {
    domains: ["uploadthing.com"]
  }
};

export default nextConfig;
