/**
 * utils/db/migrate.ts
 * ===================
 *
 * Migrates the database to the current version using 'pnpm db:migrate'.
 *
 * @see https://youtu.be/qCLV0Iaq9zU
 * @see https://orm.drizzle.team/docs/sql-schema-declaration
 * @see https://github.com/georgwittberger/next-app-router-template
 * @see https://discord.com/channels/1043890932593987624/1151081762584285238
 */

import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db } from "~/data/db";
import { env } from "~/env.mjs";

// Improved error handling for better debugging and maintenance
const getMigrationsFolder = (provider: string): string => {
  switch (provider) {
    case "planetscale":
      return "drizzle/mysql";
    case "railway":
    case "vercel":
    case "neon":
      return "drizzle/pgsql";
    default:
      throw new Error(
        `Unsupported DB provider '${provider}'. Check your environment configuration.`,
      );
  }
};

const main = async () => {
  try {
    const dbProvider = env.NEXT_PUBLIC_DB_PROVIDER;
    if (typeof dbProvider !== "string") {
      throw new TypeError(
        "Environment variable 'NEXT_PUBLIC_DB_PROVIDER' is not set.\
        Please refer to .env.example file for the instructions.",
      );
    }

    const migrationsFolder = getMigrationsFolder(dbProvider);
    const start = Date.now();

    await migrate(db, { migrationsFolder });

    const end = Date.now();
    console.info("[⏳] Database migration script executed.");
    console.log(
      `💡 Using '${migrationsFolder}' for migration as '${env.NEXT_PUBLIC_DB_PROVIDER}' is set.`,
    );
    console.log(` ✓ Database migration completed in ${end - start} ms.`);
    console.log(`💡 Use "pnpm db:studio" to check your current db.`);
  } catch (error) {
    console.error("❌ Database migration failed:", error);
    process.exit(1);
  }
};

main();
