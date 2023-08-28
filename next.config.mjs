/** @see https://nextjs.org/docs/app/building-your-application/configuring */

import nextMDX from "@next/mdx";
import { createSecureHeaders } from "next-secure-headers";

/**
 * If you need, you can run `build` or `dev` with `SKIP_ENV_VALIDATION`.
 * It skips env validation. This is especially useful for Docker builds.
 */
await import("./src/data/env/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  /**
   * Toggle experimental features
   */
  experimental: {
    serverComponentsExternalPackages: ["mysql2"],
    serverActions: true,
    mdxRs: true
  },
  /**
   * Configuration for next/image
   */
  images: {
    domains: ["uploadthing.com"]
  },
  /**
   * Set custom website headers
   */
  async headers() {
    return [
      {
        /**
         * Set security headers to all routes
         */
        source: "/:locale(.*)",
        headers: createSecureHeaders()
      }
    ];
  }
};

const withMDX = nextMDX();

export default withMDX(nextConfig);
