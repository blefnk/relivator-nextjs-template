import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    CLERK_SECRET_KEY: z.string(),
    DATABASE_URL: z.string(),
    EMAIL_FROM_ADDRESS: z.string(),
    LOGLIB_API_KEY: z.string().optional(),
    LOGLIB_SITE_ID: z.string().optional(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    RESEND_API_KEY: z.string(),
    STRIPE_API_KEY: z.string(),
    STRIPE_PRO_MONTHLY_PRICE_ID: z.string(),
    STRIPE_STD_MONTHLY_PRICE_ID: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),
    UPLOADTHING_SECRET: z.string()
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string()
  },

  /**
   * You can't destruct `process.env` as a regular object during the Next.js edge runtime (e.g.
   * with middleware) or client-side, so we need to destruct it manually.
   */
  runtimeEnv: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    LOGLIB_API_KEY: process.env.LOGLIB_API_KEY,
    LOGLIB_SITE_ID: process.env.LOGLIB_SITE_ID,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_PRO_MONTHLY_PRICE_ID: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
    STRIPE_STD_MONTHLY_PRICE_ID: process.env.STRIPE_STD_MONTHLY_PRICE_ID,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION
});

/* // !! [ TODO: CONVERT ZOD TO VALIBOT ] =================

import { object, string, url, minLength } from "valibot";
const msg = "error -> Please check your env.";

export const createEnv = object({
  server: object({
    DATABASE_URL: string([minLength(1, msg), url(msg)]),
  }),

  client: object({
    NEXT_PUBLIC_APP_URL: string([minLength(1, msg), url(msg)]),
  }),

  runtimeEnv: object({}),
});

// ===================================================== */
