/**
 * Everything starts here. This is the main Next.js configuration file.
 * @see https://nextjs.org/docs/app/building-your-application/configuring
 */

import createMDX from "@next/mdx";
// import million from "million/compiler";
import nextIntlPlugin from "next-intl/plugin";
import { createSecureHeaders } from "next-secure-headers";
import remarkGfm from "remark-gfm";

import ContentSecurityPolicy from "./src/core/cors/csp.mjs";

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
  "*.githubusercontent.com",
  "*.googleusercontent.com",
  "api.dicebear.com",
  "cdn.discordapp.com",
  "discordapp.com",
  "githubusercontent.com",
  "googleusercontent.com",
  "i.imgur.com",
  "images.unsplash.com",
  "img.youtube.com",
  "pbs.twimg.com",
  "res.cloudinary.com",
  "utfs.io",
  "www.gravatar.com",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["mysql2"],
    mdxRs: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
    contentSecurityPolicy:
      process.env.NEXT_PUBLIC_CSP_XSS === "true"
        ? `default-src 'self'; frame-src 'none'; img-src 'https://*.googleusercontent.com'; font-src 'self', ${process.env.NEXT_PUBLIC_APP_URL}; sandbox;`
        : undefined,
  },
  async headers() {
    // todo: Please note: it is still experimental, so
    // todo: NEXT_PUBLIC_CSP_XSS is "false" by default
    if (process.env.NEXT_PUBLIC_CSP_XSS === "true") {
      const headers = [];

      // Prevent search engines from indexing the site if it is not live
      // This is useful for staging environments before they are ready to go live
      // To allow robots to crawl the site, use the NEXT_PUBLIC_IS_LIVE env variable
      // You may want to also use this variable to conditionally render any tracking scripts
      // @see https://github.com/payloadcms/payload/blob/main/templates/ecommerce/next.config.js
      if (process.env.NEXT_PUBLIC_IS_LIVE === "false") {
        headers.push({
          headers: [
            {
              key: "X-Robots-Tag",
              value: "noindex",
            },
          ],
          source: "/:path*",
        });
      }

      // Set the Content-Security-Policy header as a security measure to prevent XSS attacks
      // It works by explicitly whitelisting trusted sources of content for your website
      // This will block all inline scripts and styles except for those that are allowed
      // todo: @see src/core/cors/csp.mjs for more details | work in progress | not fully tested
      // todo: make it more stable | currently too much things are allowed than needed
      headers.push({
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // todo: looks like we need to specify some policies
            // todo: here & some in images.contentSecurityPolicy
            value: ContentSecurityPolicy,
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      });

      // Note: to apply CSP changes while dev runtime,
      // CTRL+S this file, to reload Next.js' server.
      return headers;
    } else {
      // @see https://github.com/jagaapple/next-secure-headers
      // default option: using next-secure-headers csp library
      return [
        {
          source: "/(.*)",
          headers: createSecureHeaders(),
        },
      ];
    }
  },
  //
  // Dangerously allow builds to successfully complete
  // even if your project has the types/eslint errors.
  //
  // [Good to know if you want to toggle because `next build` errors]:
  // Next.js has built-in support for TypeScript, using its own plugin.
  // But while you use `pnpm build`, it stops on the first type errors.
  // So you can use `pnpm typecheck` to check all type warns/errors at once.
  //
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
const withNextIntl = nextIntlPlugin(
  // Specify a custom next-intl path
  "./src/i18n.ts",
);

/**
 * Send merged Next.js config to server.
 * @see https://million.dev/docs/install
 */
// @ ts-expect-error ⚠️ v1.2.5
// export default million.next(withNextIntl(withMDX(nextConfig)), {
//   auto: { rsc: true },
// });
export default withNextIntl(withMDX(nextConfig));

/* ========================================================== */
// For the Future Consideration
/* ========================================================== */

/**
 * Navita: Atomic CSS-in-JS with zero runtime
 * pnpm add @navita/css @navita/next-plugin
 * @see https://navita.style
 */
// import { createNavitaStylePlugin } from "@navita/next-plugin";
// export default withNavita(withMDX(withNextIntl(nextConfig)));
// const withNavita = createNavitaStylePlugin({});

/**
 * Panda: Type-Safe CSS-in-JS
 * pnpm add -D @pandacss/dev
 * @see https://panda-css.com
 */
