import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().optional().default(3000),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env.
   * Add ` on ID and SECRET if you want to make sure they're not empty.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default DATABASE_URL",
      ),
    NEXTAUTH_SECRET: z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => {
        // Use Vercel URL if available, otherwise use the provided
        // string, or default string to localhost in development.
        return (
          process.env.VERCEL_URL ??
          str ??
          (process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : undefined)
        );
      },
      // VERCEL_URL doesn't include `https` so it can't be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    ADDITIONAL_CSP_ORIGINS: z.string().optional(),
    CHECK_BOT_ACTIVITY: z.string().optional(),
    CLERK_SECRET_KEY: z.string().optional(),
    DEV_DEMO_NOTES: z.string().optional(),
    DISCORD_CLIENT_ID: z.string().optional(),
    DISCORD_CLIENT_SECRET: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    LOGLIB_SITE_ID: z.string().optional(),
    STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID: z.string().optional(),
    STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID: z.string().optional(),
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SIGNING_SECRET: z.string().optional(),
    UPLOADTHING_APP_ID: z.string().optional(),
    UPLOADTHING_SECRET: z.string().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
    UPSTASH_REDIS_REST_URL: z.string().optional(),
    EMAIL_FROM_ADDRESS: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().optional(),
    NEXT_PUBLIC_AUTH_PROVIDER: z.string().optional(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
    NEXT_PUBLIC_CSP_XSS: z.string().optional(),
    NEXT_PUBLIC_CMS_PROVIDER: z.string().optional(),
    NEXT_PUBLIC_DB_LIBRARY: z.string().optional(),
    NEXT_PUBLIC_DB_PROVIDER: z.string().optional(),
    NEXT_PUBLIC_INTL_PROVIDER: z.string().optional(),
    NEXT_PUBLIC_IS_LIVE: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    NEXT_PUBLIC_HIDE_ENV_INFO: z.string().optional(),
    NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes
   * (for example the middlewares) or client-side so we need to destruct it manually.
   */
  runtimeEnv: {
    PORT: process.env.PORT,
    VERCEL_URL: process.env.VERCEL_URL,

    // Specify server-side environment variables here:
    ADDITIONAL_CSP_ORIGINS: process.env.ADDITIONAL_CSP_ORIGINS,
    CHECK_BOT_ACTIVITY: process.env.CHECK_BOT_ACTIVITY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    DEV_DEMO_NOTES: process.env.DEV_DEMO_NOTES,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    LOGLIB_SITE_ID: process.env.LOGLIB_SITE_ID,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID:
      process.env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID,
    STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID:
      process.env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SIGNING_SECRET: process.env.STRIPE_WEBHOOK_SIGNING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    RESEND_API_KEY: process.env.RESEND_API_KEY,

    // Specify client-side environment variables here:
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_AUTH_PROVIDER: process.env.NEXT_PUBLIC_AUTH_PROVIDER,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CSP_XSS: process.env.NEXT_PUBLIC_CSP_XSS,
    NEXT_PUBLIC_CMS_PROVIDER: process.env.NEXT_PUBLIC_CMS_PROVIDER,
    NEXT_PUBLIC_DB_LIBRARY: process.env.NEXT_PUBLIC_DB_LIBRARY,
    NEXT_PUBLIC_DB_PROVIDER: process.env.NEXT_PUBLIC_DB_PROVIDER,
    NEXT_PUBLIC_INTL_PROVIDER: process.env.NEXT_PUBLIC_INTL_PROVIDER,
    NEXT_PUBLIC_IS_LIVE: process.env.NEXT_PUBLIC_IS_LIVE,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_HIDE_ENV_INFO: process.env.NEXT_PUBLIC_HIDE_ENV_INFO,
    NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * uThis is especially useful for CI on Github or for the Docker builds.
   */
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
