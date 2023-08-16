// ==============================
// ! Next.js Configuration File !
// ===========================================================================
// ?? @see https://nextjs.org/docs/app/building-your-application/configuring |
// ===========================================================================

await import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mysql2"]
  },
  reactStrictMode: true,
  images: { domains: ["uploadthing.com"] }
  // ?? Dangerously allow builds to successfully complete
  // ?? even if your project has type or eslint errors.
  // typescript: { ignoreBuildErrors: true },
  // eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
