import { connect } from "@planetscale/database";
import { env } from "~/env.mjs";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as schema from "./schema";

// ?? Create the connection
const connection = connect({
  url: env.NEXT_SECRET_URL_ORM_DRIZZLE
});
export const drizzleOrm = drizzle(connection, { schema });

// ?? Sync dev with the deploy migration folder
env.NODE_ENV === "development" &&
  migrate(drizzleOrm as any, { migrationsFolder: "./dm" })
    .then((res) => res)
    .catch((err) =>
      console.log(
        "[error] Migration failed. The file ~/data/db/drizzle.ts error:",
        err
      )
    );
