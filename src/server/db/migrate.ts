import type { PostgresJsDatabase } from "drizzle-orm/postgres-js/driver";

import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db } from ".";

export async function runMigrate() {
  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db as unknown as PostgresJsDatabase, {
    migrationsFolder: "drizzle",
  });

  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
}

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
