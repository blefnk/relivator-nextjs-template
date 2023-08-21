import { connect } from "@planetscale/database";
import { env } from "~/env.mjs";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as schema from "./schema";

// CREATE THE CONNECTION
const connection = connect({
  url: env.DATABASE_URL
});
export const db = drizzle(connection, { schema });
