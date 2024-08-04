// Everything starts here. This is the main Next.js configuration file.
// The Reliverse Next Config comes with minimal and recommended configurations.
// Run `pnpm reli:setup` to easily switch between them and set up other
// tools. If you want to try all new Next.js features and
// Million.js, choose the recommended configuration.
// P.S. The *.mjs extension is not needed anymore
// because the package.json type module is used.

import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import remarkGfm from "remark-gfm";

await import("./src/env.js");

// Uncomment the following lines to enable the Vercel Toolbar (and <Reliverse /> component in LocaleLayout)
// import withVercelToolbar from "@vercel/toolbar/plugins/next";
//
// The whitelist list of domains that are allowed to show media content

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
  "img.clerk.com",
  "images.clerk.com",
];

// @see https://nextjs.org/docs/app/building-the-application/configuring
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // React Compiler currently uses Webpack/Babel only, so it may slightly slow down the build
    // reactCompiler: false,
    mdxRs: true,
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    ppr: false, // true - supported by next@canary only
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: hostnames.map((hostname) => ({
      hostname,
      protocol: "https",
    })),
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

// Create a config wrapper required to integrate a modern Next.js MDX support
// @see https://nextjs.org/docs/app/building-the-application/configuring/mdx
const withMDX = createMDX({
  // extension: /\.mdx?$/,
  options: {
    rehypePlugins: [],
    remarkPlugins: [remarkGfm],
  },
});

// Create a configuration wrapper required to change the default next-intl config location
// @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing
const withIntl = createNextIntlPlugin("./src/i18n.ts");

// Uncomment the following lines to enable the Vercel Toolbar (and <Reliverse /> component in LocaleLayout)
//
// const reliverseConfig = withIntl(withMDX(nextConfig));
// const reliverseConfigWithVercelToolbar = withVercelToolbar()(reliverseConfig);
// Export the chained config
// export default process.env.ENABLE_VERCEL_TOOLBAR
//   ? reliverseConfigWithVercelToolbar
//   : reliverseConfig;
export default withIntl(withMDX(nextConfig));
