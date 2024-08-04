// Everything starts here. This is the main Next.js configuration file.
// The Reliverse Next Config comes with minimal and recommended configurations.
// Run `pnpm reli:setup` to easily switch between them and set up other
// tools. If you want to try all new Next.js features and
// Million.js, choose the recommended configuration.
// P.S. The *.mjs extension is not needed anymore
// because the package.json type module is used.
import MillionLint from "@million/lint";
import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import withVercelToolbar from "@vercel/toolbar/plugins/next";
import million from "million/compiler";
import createNextIntlPlugin from "next-intl/plugin";
import remarkGfm from "remark-gfm";

await import("~/env.js");

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
  "images.clerk.com",
];

// Everything starts here, this is the main Next.js configuration file
// @see https://nextjs.org/docs/app/building-the-application/configuring
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  experimental: {
    // React Compiler currently uses Webpack/Babel
    // only, so it may slightly slow down the build
    // reactCompiler: true,
    // after: true,
    mdxRs: true,
    optimisticClientCache: true,
    optimizePackageImports: [
      "recharts",
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-avatar",
      "@radix-ui/react-select",
      "date-fns",
    ],
    optimizeServerReact: true,
    ppr: true,
    serverMinification: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: hostnames.map((hostname) => ({
      hostname,
      protocol: "https",
    })),
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  serverExternalPackages: ["mysql2"],
};

// Create a config wrapper required to integrate a modern Next.js MDX support
// @see https://nextjs.org/docs/app/building-the-application/configuring/mdx
const withMDX = createMDX({
  // extension: /\.mdx?$/,
  options: {
    // providerImportSource: "@mdx-js/react",
    rehypePlugins: [],
    remarkPlugins: [remarkGfm],
  },
});

// Create a configuration wrapper required to change the default next-intl config location
// @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing
const withIntl = createNextIntlPlugin("./src/i18n.ts");

// Next.js Bundle Analyzer helps you manage the size of the JavaScript modules
// @see https://nextjs.org/docs/app/building-the-application/optimizing/bundle-analyzer
const withAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line no-restricted-properties
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

// @ts-expect-error TODO: fix
const withMillion = withAnalyzer(withIntl(withMDX(nextConfig)));

const reliverseConfig = million.next(
  MillionLint.next({
    // Million Lint Configuration
    // @see https://million.dev
    filter: {
      exclude: [
        "**/node_modules/**/*",
        "./src/app/[locale]/**",
        "./src/components/**",

        // @see https://github.com/blefnk/relivator-nextjs-template#faq
        // TODO: Eliminate things above, then repeat the
        // TODO: builds, adding specific files as below.
        "./src/app/[locale]/(adm)/dashboard/admin/_components/privileges.tsx",
        "./src/app/[locale]/(blog)/blog/new/_components/editor-plate.tsx",
        "./src/app/[locale]/(main)/404/[[...404]]/client.tsx",
        "./src/app/[locale]/(main)/error/[[...error]]/client.tsx",
        "./src/app/global-error.tsx",
        "./src/app/not-found.tsx",
        "./src/components/misc/loading-button.tsx",
        "./src/components/misc/localization.tsx",
        "./src/components/misc/product-building.tsx",
        "./src/components/misc/stores.tsx",
        "./src/core/auth/authjs/components/check-user-button.tsx",
        "./src/core/auth/clerkjs/components/user-profile-clerk.tsx",
        "./src/core/trpc/react.tsx",
        "./src/core/trpc/tanstack/products-admin.tsx",
        "./src/components/forms/ManageSubscriptionForm.tsx",
        "./src/components/forms/UpdateEmailPreferencesForm.tsx",
        "./src/components/account/avatar.tsx",
        "./src/components/Primitives/ui/toaster.tsx",
        "./src/components/providers/theme-provider.tsx",
        "./src/components/providers/tooltip.tsx",
      ],
    },
    rsc: true,
  })(withMillion),
  {
    // Million.js Compiler Configuration
    auto: {
      rsc: true,
    },
    rsc: true,
  },
);

const reliverseConfigWithVercelToolbar = withVercelToolbar()(reliverseConfig);

// Export the chained config
// eslint-disable-next-line no-restricted-properties
export default process.env.ENABLE_VERCEL_TOOLBAR
  ? reliverseConfigWithVercelToolbar
  : reliverseConfig;
