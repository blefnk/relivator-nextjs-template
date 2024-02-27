/**
 * Unified Schema Exporter for Multiple Databases
 * ==============================================
 * Please check the "schema/index.ts" file for
 * instructions, resources, inspirations, etc.
 */

import { Client as ClientPlanetscale } from "@planetscale/database";
import { addQueryParamIfMissed } from "~/utils";
import {
  drizzle as drizzlePlanetscale,
  type PlanetScaleDatabase,
} from "drizzle-orm/planetscale-serverless";
import {
  drizzle as drizzlePostgres,
  type PostgresJsDatabase,
} from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env.mjs";

import * as schemaMysql from "./schema/mysql";
import * as schemaPgsql from "./schema/pgsql";

// Connection strings for MySQL and PostgreSQL
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

// todo: we need to figure out
// todo: how to type db properly

let db:
  | PlanetScaleDatabase<typeof schemaMysql>
  | PostgresJsDatabase<typeof schemaPgsql>
  | any;

let dbProvider = env.NEXT_PUBLIC_DB_PROVIDER;

// Configure this based on the database provider.
// Feel free to add/remove/edit things if needed.
try {
  // Set default DB provider based on DATABASE_URL
  // if NEXT_PUBLIC_DB_PROVIDER is not specified
  if (!dbProvider) {
    const databaseUrl = process.env.DATABASE_URL;
    if (databaseUrl?.startsWith("mysql://")) dbProvider = "planetscale";
    else if (databaseUrl?.startsWith("postgres://")) dbProvider = "neon";
  }

  switch (dbProvider) {
    case "planetscale": {
      const clientPlanetscale = new ClientPlanetscale({
        host: process.env["DATABASE_HOST"],
        username: process.env["DATABASE_USERNAME"],
        password: process.env["DATABASE_PASSWORD"],
      });
      db = drizzlePlanetscale(clientPlanetscale, {
        schema: schemaMysql,
        logger: false,
      });
      break;
    }
    case "railway":
    case "vercel":
    case "neon": {
      db = drizzlePostgres(postgres(csPgsql, { ssl: "allow", max: 1 }), {
        schema: schemaPgsql,
        logger: false,
      });
      break;
    }
    default:
      throw new Error(
        `❌ Unsupported NEXT_PUBLIC_DB_PROVIDER "${dbProvider}". \
        Please check your environment configuration.`,
      );
  }
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
    process.exit(1);
  } else {
    // If for any reason something else was
    // thrown that wasn't an Error, handle it
    console.error("❌ An unexpected error occurred:", error);
    process.exit(1); // Exits the process with a failure code
  }
}

export { db };
