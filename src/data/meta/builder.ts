import { env } from "~/data/env/env.mjs";

/**
 * Helper function to determine the hostname for the given environment,
 * with a focus on working with Vercel deployments. Set by Vercel automatically.
 * @returns the hostname for the given environment.
 */
export function appHost(includeProtocol = true): string {
  const host = env.NEXT_PUBLIC_APP_URL
    ? env.NEXT_PUBLIC_APP_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  return includeProtocol
    ? host
    : host.replace("https://", "").replace("http://", "");
}

/**
 * Build a URL for the given path.
 * @returns the URL for the given path.
 */
export function fullURL(path = "", host = appHost()): URL {
  return new URL(path, host);
}
