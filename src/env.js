import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

/* eslint-disable no-restricted-properties */
// ===================================================
//
// Reliverse EnvJs Config comes with
// Recommended and RulesDisabled presets.
// Run `pnpm reli:setup` to switch between
// them and set up some other tools.
//
// ===================================================
//
// Register here and below the variables that will be
// allowed to be used in the .env file. Please don't
// forget to update the .env.example file as well.
//
export const knownVariables = {
  variables: [
    "AUTH_DISCORD_ID",
    "AUTH_DISCORD_SECRET",
    "AUTH_GITHUB_ID",
    "AUTH_GITHUB_SECRET",
    "AUTH_GOOGLE_ID",
    "AUTH_GOOGLE_SECRET",
    "AUTH_SECRET",
    "CLERK_SECRET_KEY",
    "DATABASE_URL",
    "DEMO_NOTES_ENABLED",
    "DISCORD_CLIENT_ID",
    "DISCORD_CLIENT_SECRET",
    "DISCORD_WEBHOOK_URL",
    "ENABLE_FEATURE_FLAGS",
    "ENABLE_VERCEL_TOOLBAR",
    "ENABLE_VT_ON_PRODUCTION",
    "FLAGS_SECRET",
    "LOGLIB_ID",
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_DATABASE_PREFIX",
    "NEXT_PUBLIC_RESEND_API_KEY",
    "NEXT_PUBLIC_RESEND_EMAIL_FROM",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "NODE_ENV",
    "PORT",
    "PYTHON_INSTALLED",
    "REMOTION_GITHUB_TOKEN",
    "STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID",
    "STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SIGNING_SECRET",
    "TURSO_AUTH_TOKEN",
    "TURSO_DATABASE_URL",
    "UPLOADTHING_APP_ID",
    "UPLOADTHING_SECRET",
  ],
};

// @see addons/scripts/reliverse/relimter/core/env
export const recommendedEnvVariables = {
  authjs: [
    "AUTH_DISCORD_SECRET",
    "AUTH_DISCORD_ID",
    "AUTH_GITHUB_SECRET",
    "AUTH_GITHUB_ID",
    "AUTH_GOOGLE_SECRET",
    "AUTH_GOOGLE_ID",
  ],
  clerk: ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"],
  important: ["DATABASE_URL", "NEXT_PUBLIC_APP_URL", "AUTH_SECRET"],
  other: ["UPLOADTHING_SECRET", "UPLOADTHING_APP_ID"],
  stripe: [
    "STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_WEBHOOK_SIGNING_SECRET",
    "STRIPE_SECRET_KEY",
  ],
};

export const env = createEnv({
  //
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
    NEXT_PUBLIC_DATABASE_PREFIX: z.string().optional(),
    NEXT_PUBLIC_RESEND_API_KEY: z.string().optional(),
    NEXT_PUBLIC_RESEND_EMAIL_FROM: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  }, // ==============================================
  //
  // Specify your client-side environment variables
  // schema here. This way you can ensure the app
  // isn't built with invalid vars. To expose them
  // to the client, prefix them with "NEXT_PUBLIC_".
  //
  // Note: We make Vercel deployments not
  // fail if NEXT_PUBLIC_APP_URL is not set.
  // P.S. VERCEL_URL doesn't include the https
  // protocol, so it can't be validated as a URL.
  //
  emptyStringAsUndefined: true, // ===================
  //
  // Makes it so that empty strings are treated
  // as undefined. "SOME_VAR: z.string()" and
  // "SOME_VAR=''" will throw an error.
  extends: [vercel()], // ============================
  //
  // You can't destructure "process.env" as a
  // regular object in the Next.js edge runtimes
  // (e.g. middlewares) or client-side,
  // so we need to destruct manually.
  //
  runtimeEnv: {
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    DEMO_NOTES_ENABLED: process.env.DEMO_NOTES_ENABLED,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    ENABLE_FEATURE_FLAGS: process.env.ENABLE_FEATURE_FLAGS,
    ENABLE_VERCEL_TOOLBAR: process.env.ENABLE_VERCEL_TOOLBAR,
    ENABLE_VT_ON_PRODUCTION: process.env.ENABLE_VT_ON_PRODUCTION,
    FLAGS_SECRET: process.env.FLAGS_SECRET,
    LOGLIB_ID: process.env.LOGLIB_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_DATABASE_PREFIX: process.env.NEXT_PUBLIC_DATABASE_PREFIX,
    NEXT_PUBLIC_RESEND_API_KEY: process.env.NEXT_PUBLIC_RESEND_API_KEY,
    NEXT_PUBLIC_RESEND_EMAIL_FROM: process.env.NEXT_PUBLIC_RESEND_EMAIL_FROM,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PYTHON_INSTALLED: process.env.PYTHON_INSTALLED,
    REMOTION_GITHUB_TOKEN: process.env.REMOTION_GITHUB_TOKEN,
    STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID:
      process.env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID,
    STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID:
      process.env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SIGNING_SECRET: process.env.STRIPE_WEBHOOK_SIGNING_SECRET,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
  }, // ==============================================
  //
  // Specify your server-side environment variables
  // schema here. This way you can ensure the
  // app isn't built with invalid env vars.
  //
  server: {
    AUTH_DISCORD_ID: z.string().optional(),
    AUTH_DISCORD_SECRET: z.string().optional(),
    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    AUTH_SECRET: z.string().optional(),
    CLERK_SECRET_KEY: z.string().optional(),
    DATABASE_URL: z.string().url().optional(),
    DEMO_NOTES_ENABLED: z.string().optional(),
    DISCORD_CLIENT_ID: z.string().optional(),
    DISCORD_CLIENT_SECRET: z.string().optional(),
    DISCORD_WEBHOOK_URL: z.string().optional(),
    ENABLE_FEATURE_FLAGS: z.string().optional(),
    ENABLE_VERCEL_TOOLBAR: z.string().optional(),
    ENABLE_VT_ON_PRODUCTION: z.string().optional(),
    FLAGS_SECRET: z.string().optional(),
    LOGLIB_ID: z.string().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().default(3000),
    PYTHON_INSTALLED: z.string().optional(),
    REMOTION_GITHUB_TOKEN: z.string().optional(),
    STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID: z.string().optional(),
    STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID: z.string().optional(),
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SIGNING_SECRET: z.string().optional(),
    TURSO_AUTH_TOKEN: z.string().optional(),
    TURSO_DATABASE_URL: z.string().optional(),
    UPLOADTHING_APP_ID: z.string().optional(),
    UPLOADTHING_SECRET: z.string().optional(),
  }, // ==============================================
  //
  // Run "build" or "dev" with "SKIP_ENV_VALIDATION"
  // to skip env validation. Useful for Docker build.
  // You can also use "|| !!process.env.CI" if needed.
  //
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
