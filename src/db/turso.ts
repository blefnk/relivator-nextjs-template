// turso
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "~/db/schema/sqlite";
import { env } from "~/env";

const turso = createClient({
  authToken: env.TURSO_AUTH_TOKEN,
  url: env.TURSO_DATABASE_URL || "",
});

export const db = drizzle(turso, {
  schema,
});
