/**
 * The file is generally used for manual migrations while using `pnpm db:migrate`.
 *
 * todo: handle possible errors when using the `pnpm db:migrate` script command.
 *
 * @see https://orm.drizzle.team/docs/sql-schema-declaration
 *
 * todo: this script possibly still has window
 * todo: for even more new interesting things
 *
 * @see https://youtu.be/qCLV0Iaq9zU
 * @see https://github.com/georgwittberger/next-app-router-template
 * @see https://discord.com/channels/1043890932593987624/1151081762584285238
 */

import path from "node:path";

import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import * as schema from "~/data/db/schema";

/**
 * Load environments before importing
 * db to get access from the console.
 */
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const connectionString = process.env.DATABASE_URL + "?sslmode=require";

if (!connectionString) {
  throw new Error(
    "[❌] Connection to database is failed.\n\
    [❌] Missing database connection string.\n\
    [❌] Please check DATABASE_URL variable.\n",
  );
}

const migrationClient = postgres(connectionString, { ssl: "allow", max: 1 });
const db = drizzle(migrationClient, { schema, logger: false });

const main = async () => {
  await migrate(db, { migrationsFolder: "migrations" });
};

console.info("[⏳] Database migration script was executed.");
const start = Date.now();
main()
  .then(() => {
    const end = Date.now();
    console.log(`[✅] Database migration completed in ${end - start}ms.`);
    console.log(`[💡] Use "pnpm db:studio" to check your current db.`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("[❌] Database migration failed.", error);
    process.exit(1);
  });
