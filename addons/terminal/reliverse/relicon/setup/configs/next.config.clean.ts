import createNextIntlPlugin from "next-intl/plugin";

await import("~/env.js");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        port: "",
        protocol: "https",
      },
    ],
  },
};

// @ts-expect-error TODO: fix
export default withNextIntl(nextConfig);
