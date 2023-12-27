/**
 * [drizzle-orm-mono] Drizzle ORM Configuration
 *
 * This script configures drizzle-orm with environment-specific settings,
 * including database connection details. The configuration relies on
 * env vars for setting the database provider and connection string.
 *
 * @see https://github.com/bs-oss/drizzle-orm-mono
 * @see https://orm.drizzle.team/kit-docs/config-reference
 * @see https://discord.com/channels/1043890932593987624/1043890932593987627/1153940001885794304
 */

import { addQueryParamIfMissed } from "~/utils";
import type { Config } from "drizzle-kit";

import { env } from "./src/env.mjs";

// if (!env.NEXT_PUBLIC_DB_PROVIDER || !env.DATABASE_URL)
//   throw new Error(
//     "NEXT_PUBLIC_DB_PROVIDER or DATABASE_URL is not set in environment variables.",
//   );

// Add the ssl query parameter if it's missing
const csMysql: string = addQueryParamIfMissed(
  env.DATABASE_URL,
  "ssl",
  JSON.stringify({ rejectUnauthorized: true }),
);
const csPgsql: string = addQueryParamIfMissed(
  env.DATABASE_URL,
  "sslmode",
  "require",
);

// Connection strings for MySQL and PostgreSQL
// const csMysql = `${env.DATABASE_URL}?ssl={"rejectUnauthorized":true}`;
// const csPgsql = `${env.DATABASE_URL}?sslmode=require`;

// Initialize configuration variables
type MysqlCredentials = { uri: string };
type PgsqlCredentials = { connectionString: string };
let dbCredentials: MysqlCredentials | PgsqlCredentials;
let driver: "mysql2" | "pg";
let tablesFilter: string[];
let schema: string;
let out: string;

/**
 * Configure this based on the database provider.
 * Feel free to add/remove/edit things if needed.
 */
try {
  // Set default DB provider based on DATABASE_URL
  // if NEXT_PUBLIC_DB_PROVIDER is not specified
  let dbProvider = env.NEXT_PUBLIC_DB_PROVIDER;
  if (!dbProvider) {
    const databaseUrl = process.env.DATABASE_URL;
    if (databaseUrl?.startsWith("mysql://")) {
      dbProvider = "planetscale";
    } else if (databaseUrl?.startsWith("postgres://")) {
      dbProvider = "neon";
    }
  }

  switch (dbProvider) {
    case "planetscale":
      driver = "mysql2";
      out = "drizzle/mysql";
      tablesFilter = ["acme_*"];
      dbCredentials = { uri: csMysql };
      schema = "./src/data/db/schema/mysql.ts";
      // console.log("✓ MySQL triggered");
      break;
    case "railway":
    case "vercel":
    case "neon":
      driver = "pg";
      out = "drizzle/pgsql";
      tablesFilter = ["acme_*"];
      dbCredentials = { connectionString: csPgsql };
      schema = "./src/data/db/schema/pgsql.ts";
      // console.log("✓ PostgreSQL triggered");
      break;
    default:
      throw new Error(
        `❌ Unsupported NEXT_PUBLIC_DB_PROVIDER '${dbProvider}'.\
        Verify your environment configuration.`,
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
      "💡 The required files in `drizzle` directory do not exist.\
      Please execute `pnpm mysql:generate` (PlanetScale provider),\
      or `pnpm pg:generate` (Neon provider), to generate the necessary\
      files. Afterward, you may retry your previous command.",
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
        `💡 Connection error: The DATABASE_URL does not match the\
        expected format for provider '${NEXT_PUBLIC_DB_PROVIDER}'.\
        Please check your configuration.`,
      );
      process.exit(1);
    }
  } else {
    console.error(
      `💡 Unknown NEXT_PUBLIC_DB_PROVIDER '${NEXT_PUBLIC_DB_PROVIDER}'.\
      Please check your configuration.`,
    );
    process.exit(1);
  }
} else {
  console.error(
    "💡 Essential environment variables are missing. Ensure\
    NEXT_PUBLIC_DB_PROVIDER and DATABASE_URL are set.",
  );
  process.exit(1);
} */
