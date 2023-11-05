/**
 * Everything starts here. This is the main Next.js configuration file.
 * @see https://nextjs.org/docs/app/building-your-application/configuring
 */

import createMDX from "@next/mdx";
import nextIntlPlugin from "next-intl/plugin";
import { createSecureHeaders } from "next-secure-headers";
import remarkGfm from "remark-gfm";

/**
 * If you need, you can very dangerously run build or dev with SKIP_ENV_VALIDATION.
 * It skips environment vars validation. This is especially useful for Docker builds.
 * @example !process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));
 */
await import("./src/env.mjs");

/**
 * The whitelist list of domains,
 * that are allowed to show media.
 */
const hostnames = [
  "avatars.githubusercontent.com",
  "lh3.googleusercontent.com",
  "githubusercontent.com",
  "googleusercontent.com",
  "images.unsplash.com",
  "cdn.discordapp.com",
  "res.cloudinary.com",
  "www.gravatar.com",
  "api.dicebear.com",
  "img.youtube.com",
  "discordapp.com",
  "pbs.twimg.com",
  "i.imgur.com",
  "utfs.io",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  /**
   * Toggle experimental features.
   */
  experimental: {
    serverComponentsExternalPackages: ["mysql2"],
    mdxRs: true,
  },
  /**
   * Configuration for next/image.
   */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
  /**
   * Set custom website headers with next-secure-headers.
   * @see https://github.com/jagaapple/next-secure-headers
   */
  async headers() {
    return [
      {
        /**
         * Set security headers to all routes.
         */
        source: "/(.*)",
        headers: createSecureHeaders(),
      },
    ];
  },
  /**
   * Dangerously allow builds to successfully complete
   * even if your project has the types/eslint errors.
   *
   * Next.js has built-in support for TypeScript, using its own plugin.
   * But while you use `pnpm build`, it stops on the first type errors.
   * So you can use `pnpm bv` to check all type warns and errors at once.
   */
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

/**
 * Create a config wrapper required to integrate a modern Nextjs MDX support.
 * @see https://nextjs.org/docs/app/building-your-application/configuring/mdx
 */
const withMDX = createMDX({ options: { remarkPlugins: [remarkGfm] } });

/**
 * Create configuration wrapper required for using next-intl with React Server Components.
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
 */
const withNextIntl = nextIntlPlugin("./src/i18n.ts");

/**
 * Send the config to server while build or lint.
 */
export default withNextIntl(withMDX(nextConfig));
