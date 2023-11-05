/**
 * Unified Schema Exporter for Multiple Databases
 * ==============================================
 *
 * Please check the "schema/index.ts" file for
 * instructions, resources, inspirations, etc.
 */

import { Client as clientPlanetscale } from "@planetscale/database";
import { env } from "~/env.mjs";
import { drizzle as drizzlePlanetscale } from "drizzle-orm/planetscale-serverless";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schemaMysql from "./schema/mysql";
import * as schemaPgsql from "./schema/pgsql";

if (!env.NEXT_PUBLIC_DB_PROVIDER)
  throw new Error(
    "NEXT_PUBLIC_DB_PROVIDER is not set in environment variables.",
  );

const csMysql = `${env.DATABASE_URL}?ssl={"rejectUnauthorized":true}`;
const csPgsql = `${env.DATABASE_URL}?sslmode=require`;

// todo: We need to figure out how to type this properly
// import type { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
// import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
// export type DB = PlanetScaleDatabase<typeof schemaMysql> | PostgresJsDatabase<typeof schemaPgsql>;
// let db: DB | Promise<DB>;
// type DatabaseInstance = PlanetScaleDatabase<typeof schemaMysql> | PostgresJsDatabase<typeof schemaPgsql>;
// let db: DatabaseInstance;
let db: any;

/**
 * Configure this based on the database provider.
 * Feel free to add/remove/edit things if needed.
 */
try {
  switch (env.NEXT_PUBLIC_DB_PROVIDER) {
    case "planetscale":
      db = drizzlePlanetscale(
        new clientPlanetscale({ url: csMysql }).connection(),
        { schema: schemaMysql, logger: false },
      );
      break;
    case "railway":
    case "vercel":
    case "neon":
      db = drizzlePostgres(postgres(csPgsql, { ssl: "allow", max: 1 }), {
        schema: schemaPgsql,
        logger: false,
      });
      break;
    default:
      throw new Error(
        `💡 Unsupported NEXT_PUBLIC_DB_PROVIDER "${env.NEXT_PUBLIC_DB_PROVIDER}".\
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
