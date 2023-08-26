import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "~/data/env";

import * as schema from "./schema";

export const client = connect({ url: env.DATABASE_URL });
export const db = drizzle(client, { schema, logger: false });
