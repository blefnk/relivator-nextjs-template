// !! DOES NOT WORK: NEED TO BE FIXED !!

// ?? The script can be triggered by running `pnpm db:migrate`

import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import { fetch } from "undici";

// import { env } from "~/data/env/env.mjs";

import "dotenv/config";

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const connection = connect({ url: process.env.DATABASE_URL, fetch });

  const db = drizzle(connection);

  console.log("⏳ Running drizzle-orm migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "src/data/db/drizzle" });

  const end = Date.now();

  console.log(`✅ Drizzle migrations completed in ${end - start}ms.`);

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Drizzle migration failed!");

  console.error(err);

  process.exit(1);
});
