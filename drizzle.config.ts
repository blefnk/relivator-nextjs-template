import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  dialect: "postgresql",
  migrations: {
    schema: "public",
    table: "drizzle/relivator/pgsql",
  },
  out: "drizzle/relivator/pgsql",
  schema: "src/db/schema.ts",
  strict: true,
  tablesFilter: ["relivator_*"],
  verbose: false,
});
