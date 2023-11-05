/**
 * The file is used for migrations while using "pnpm db:migrate"
 * TODO: Handle possible errors when sending the migrations.
 *
 * @see https://youtu.be/qCLV0Iaq9zU
 * @see https://orm.drizzle.team/docs/sql-schema-declaration
 * @see https://github.com/georgwittberger/next-app-router-template
 * @see https://discord.com/channels/1043890932593987624/1151081762584285238
 */

import { env } from "~/env.mjs";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db } from "~/data/db";

// Initialize configuration variables
let migrationsFolder: string;

/**
 * Configure this based on the database provider.
 * Feel free to add/remove/edit things if needed.
 */
try {
  switch (env.NEXT_PUBLIC_DB_PROVIDER) {
    case "planetscale":
      migrationsFolder = "drizzle/mysql";
      break;
    case "railway":
    case "vercel":
    case "neon":
      migrationsFolder = "drizzle/pgsql";
      break;
    default:
      throw new Error(
        `💡 Unsupported NEXT_PUBLIC_DB_PROVIDER '${env.NEXT_PUBLIC_DB_PROVIDER}'. Verify your environment configuration.`,
      );
  }
} catch (error) {
  console.error("❌ An unexpected error occurred:", error);
  process.exit(1);
}

const main = async () => {
  await migrate(db, { migrationsFolder });
};

main()
  .then(() => {
    const start = Date.now();
    const end = Date.now();
    console.info("[⏳] Database migration script was executed.");
    console.log(
      `💡 ${migrationsFolder} folder will be used for migration, because ${env.NEXT_PUBLIC_DB_PROVIDER} is set as the environment variable.`,
    );
    console.log(`✅ Database migration completed in ${end - start} ms.`);
    console.log(`💡 Use "pnpm db:studio" to check your current db.`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Database migration failed.", error);
    process.exit(1);
  });
