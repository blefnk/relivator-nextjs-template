import { connect } from "@planetscale/database";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/planetscale-serverless";

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"]
});

export const db = drizzle(connection);

// syncs the migrations folder to PlanetScale
process.env.NODE_ENV === "development" &&
  migrate(db as any, { migrationsFolder: "./migrations" })
    .then((res) => res)
    .catch((err) => console.log("Migration error in db.ts:", err));
