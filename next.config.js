import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import remarkGfm from "remark-gfm";

// The Reliverse Next Config comes with minimal and recommended configurations.
// Run `pnpm reli:setup` to easily switch between them and set up other tools.
// If you want to try all new Next.js features and Million.js, choose the recommended configuration.
// P.S. The *.mjs extension is no longer necessary because the package.json type module is used.
await import("./src/env.js");

// Everything starts here; this is the main Next.js configuration file.
// @see https://nextjs.org/docs/app/building-the-application/configuring
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],

    // The whitelist of domains allowed to display media content.
    // @see https://nextjs.org/docs/app/api-reference/components/image
    remotePatterns: [
      {
        port: "",
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        port: "",
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        port: "",
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        port: "",
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        port: "",
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        port: "",
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],

    // ?| The following shorthand is most equivalent to
    // the above, but performance is not tested too much.
    // Remember to add: const hostnames = ["example.com"];
    // remotePatterns: hostnames.map((hostname) => ({
    //   hostname,
    //   protocol: "https",
    // })),
  },

  experimental: {
    mdxRs: true,

    // The React Compiler currently uses Webpack/Babel only,
    // so it may slightly slow down the build.
    // reactCompiler: false, // next@canary only

    optimizePackageImports: [
      "recharts",
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-avatar",
      "@radix-ui/react-select",
    ],

    // ?| The following options are untested too much, performance may vary.
    // after: true, // next@canary only
    // ppr: false, // next@canary only
    // optimisticClientCache: true,
    // optimizeServerReact: true,
    // serverMinification: true,

    // ?| Uncomment if you use superjson in the 'browser' context.
    // swcPlugins: [
    //   [
    //     "next-superjson-plugin",
    //     {
    //       excluded: [],
    //     },
    //   ],
    // ],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  // ?| Uncomment the following to enable Adobe React Spectrum.
  // Note: `next dev --turbo` is not supported yet by this library.
  // transpilePackages: [
  //   "@adobe/react-spectrum",
  //   "@react-spectrum/*",
  //   "@spectrum-icons/*",
  // ].flatMap((spec) => glob.sync(spec, { cwd: "node_modules/" })),
};

// Create a configuration wrapper required to integrate modern Next.js MDX support.
// @see https://nextjs.org/docs/app/building-the-application/configuring/mdx
const withMDX = createMDX({
  // extension: /\.mdx?$/,
  options: {
    // providerImportSource: "@mdx-js/react",
    remarkPlugins: [remarkGfm],
  },
});

// Create a configuration wrapper required to change the default next-intl config location.
// @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing
const withIntl = createNextIntlPlugin("./src/i18n.ts");

// =======================================================================
// !| ADVANCED CONFIGURATION
// =======================================================================

// ?| Uncomment the following to enable the Next.js Bundle Analyzer.
// Also, make sure to wrap nextConfig with the withAnalyzer function.
// import bundleAnalyzer from "@next/bundle-analyzer";
// Next.js Bundle Analyzer helps you manage the size of the JavaScript modules.
// @see https://nextjs.org/docs/app/building-the-application/optimizing/bundle-analyzer
// const withAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true", openAnalyzer: false });

// !| Next.js Configuration Chaining:
const chainedNextConfig = withIntl(withMDX(nextConfig));

// ?| Uncomment the following to enable the Million Lint & Million Compiler.
// import MillionLint from "@million/lint";
// import million from "million/compiler";
// [@see https://million.dev] Million Lint & Million Compiler Configuration
// const chainedNextConfig = million.next(MillionLint.next({ rsc: true })(chainedNextConfig),
// { auto: { rsc: true }, rsc: true } );

// ?| Uncomment the following to enable the Vercel Toolbar (and <Reliverse /> component in RootLocaleLayout).
// import withVercelToolbar from "@vercel/toolbar/plugins/next";
// const chainedNextConfigWithVercelToolbar = withVercelToolbar()(chainedNextConfig);
// export default process.env.ENABLE_VERCEL_TOOLBAR ? chainedNextConfigWithVercelToolbar : chainedNextConfig;

export default chainedNextConfig;
