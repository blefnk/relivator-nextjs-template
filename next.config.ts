import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

import "./src/env.js";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // done manually using bun check
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withNextIntl(nextConfig);
