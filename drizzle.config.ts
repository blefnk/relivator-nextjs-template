/**
 * [drizzle-orm-mono] Drizzle ORM Configuration
 *
 * This script configures drizzle-orm with environment-specific settings, including database connection details.
 * The configuration relies on environment variables for setting the database provider and connection string.
 *
 * @see https://github.com/bs-oss/drizzle-orm-mono
 * @see https://orm.drizzle.team/kit-docs/config-reference
 * @see https://discord.com/channels/1043890932593987624/1043890932593987627/1153940001885794304
 */

import { Config } from "drizzle-kit";

import { env } from "./src/env.mjs";

export type DbCredentials = { connectionString: string };

// Initialize configuration variables
let dbCredentials: DbCredentials;
let driver: "mysql2" | "pg";
let tablesFilter: string[];
let schema: string;
let out: string;

export const csMysql = `${env.DATABASE_URL}?ssl={"rejectUnauthorized":true}`;
export const csPgsql = `${env.DATABASE_URL}?sslmode=require`;

/**
 * Configure this based on the database provider.
 * Feel free to add/remove/edit things if needed.
 */
try {
  switch (env.NEXT_PUBLIC_DB_PROVIDER) {
    case "planetscale":
      driver = "mysql2";
      out = "drizzle/mysql";
      tablesFilter = ["acme_*"];
      schema = "./src/data/db/schema/mysql.ts";
      dbCredentials = { connectionString: csMysql };
      break;
    case "railway":
    case "vercel":
    case "neon":
      driver = "pg";
      out = "drizzle/pgsql";
      tablesFilter = ["acme_*"];
      schema = "./src/data/db/schema/pgsql.ts";
      dbCredentials = { connectionString: csPgsql };
      break;
    default:
      throw new Error(
        `💡 Unsupported NEXT_PUBLIC_DB_PROVIDER '${env.NEXT_PUBLIC_DB_PROVIDER}'. Verify your environment configuration.`,
      );
  }
} catch (error) {
  if (error instanceof Error) {
    // Only the error message will be shown to the user
    console.error(error.message);
    // Exits the process with a failure code
    process.exit(1);
  } else {
    // If for any reason something else was thrown that wasn't an Error handles it
    console.error("❌ An unexpected error occurred:", error);
    // Exit with a failure mode
    process.exit(1);
  }
}

// Drizzle Config
export default {
  out,
  driver,
  schema,
  tablesFilter,
  dbCredentials,
} satisfies Config;

// ===== [🚧 TODO SECTION 🚧] ====================================

// todo: we need to find the way to hook executed `pnpm {dialect}:{cmd}`

// todo: unfinished, checks implementation for the required directories
// import { existsSync } from "node:fs";
// import { join } from "node:path";
// Check if the required directory exists, throw an error if not
/* try {
  const drizzleDirPath = join(process.cwd(), out);
  if (!existsSync(drizzleDirPath)) {
    throw new Error(
      "💡 The required files in `drizzle` directory do not exist. Please execute `pnpm mysql:generate` (PlanetScale provider), or `pnpm pg:generate` (Neon provider), to generate the necessary files. Afterward, you may retry your previous command.",
    );
  }
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    // This block will handle non-Error objects thrown, which is a rare case
    console.error("An unexpected error occurred:", error);
  }
  // Exit with a failure mode
  process.exit(1);
} */

// todo: unfinished, jest fails upon nextjs build
/* type ProviderUrlPrefixes = {
  // Define a type for the provider names and their corresponding URL prefixes
  [key in "postgres" | "mysql"]?: string;
};
// Map database providers to their expected URL prefixes
const providerUrlPrefixes: ProviderUrlPrefixes = {
  postgres: "postgres://",
  mysql: "mysql://",
};
// Validate essential environment variables and check for URL prefix
if (NEXT_PUBLIC_DB_PROVIDER && env.DATABASE_URL) {
  const expectedPrefix =
    providerUrlPrefixes[
      NEXT_PUBLIC_DB_PROVIDER as
        | "planetscale"
        | "neon"
        | "vercel"
        | "railway"
    ];
  if (expectedPrefix) {
    if (!env.DATABASE_URL.startsWith(expectedPrefix)) {
      console.error(
        `💡 Connection error: The DATABASE_URL does not match the expected format for provider '${NEXT_PUBLIC_DB_PROVIDER}'. Please check your configuration.`,
      );
      process.exit(1);
    }
  } else {
    console.error(
      `💡 Unknown NEXT_PUBLIC_DB_PROVIDER '${NEXT_PUBLIC_DB_PROVIDER}'. Please check your configuration.`,
    );
    process.exit(1);
  }
} else {
  console.error(
    "💡 Essential environment variables are missing. Ensure NEXT_PUBLIC_DB_PROVIDER and DATABASE_URL are set.",
  );
  process.exit(1);
} */
