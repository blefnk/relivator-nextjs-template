import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    NEXT_SECRET_URL_ORM_DRIZZLE: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    CLERK_SECRET_KEY: z.string(),
    RESEND_API_KEY: z.string(),
    EMAIL_FROM_ADDRESS: z.string(),
    UPLOADTHING_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),
    STRIPE_API_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_STD_MONTHLY_PRICE_ID: z.string(),
    STRIPE_PRO_MONTHLY_PRICE_ID: z.string()
  },
  // !! ===========================================================================================
  client: {
    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    NEXT_PUBLIC_URL_AUTHJS: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string()
  },
  // !! ===========================================================================================
  runtimeEnv: {
    /**
     * You can't destruct `process.env` as a regular object during the Next.js edge runtime (e.g.
     * with middleware) or client-side, so we need to destruct it manually.
     */
    NEXT_SECRET_URL_ORM_DRIZZLE: process.env.NEXT_SECRET_URL_ORM_DRIZZLE,
    NEXT_PUBLIC_URL_AUTHJS: process.env.NEXT_PUBLIC_URL_AUTHJS,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_STD_MONTHLY_PRICE_ID: process.env.STRIPE_STD_MONTHLY_PRICE_ID,
    STRIPE_PRO_MONTHLY_PRICE_ID: process.env.STRIPE_PRO_MONTHLY_PRICE_ID
  },
  // !! ===========================================================================================
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION
});

/* // ?? [ TODO: CONVERT ZOD TO VALIDABOT ] =======================================================

import { object, string, url, minLength } from "valibot";

const msg = "error -> Please check your env.";

export const createEnv = object({
  server: object({
    NEXT_SECRET_URL_ORM_DRIZZLE: string([minLength(1, msg), url(msg)]),
  }),

  client: object({
    NEXT_PUBLIC_URL_AUTHJS: string([minLength(1, msg), url(msg)]),
  }),

  runtimeEnv: object({}),
});

// ============================================================================================= */
