import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import remarkGfm from "remark-gfm";

// The Reliverse Next Config comes with minimal and recommended configurations.
// Run `pnpm reli:setup` to easily switch between them and set up other tools.
// If you want to try all new Next.js features and Million.js, choose the recommended configuration.
// P.S. The *.mjs extension is no longer necessary because the package.json type module is used.
await import("~/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
  },

  experimental: {
    mdxRs: true,
    optimizePackageImports: [
      "recharts",
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-avatar",
      "@radix-ui/react-select",
    ],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

const withIntl = createNextIntlPlugin("./src/i18n.ts");

// @ts-expect-error TODO: fix
const chainedNextConfig = withIntl(withMDX(nextConfig));

export default chainedNextConfig;
