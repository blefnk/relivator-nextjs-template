// !! Next.js 13 Configuration File !!
// ==========================================================
// ?? @see https://nextjs.org/docs/app/building-your-application/configuring
// ==========================================================

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
  // ?? even if the project has type or eslint errors.
  // ?? Linting and typechecking are also can be disabled
  // ?? when we have separate tasks in the CI pipeline.
  // typescript: { ignoreBuildErrors: true },
  // eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
