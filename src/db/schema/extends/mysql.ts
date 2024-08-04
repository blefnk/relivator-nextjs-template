import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/mysql-core";

export const lifecycleDates = {
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
};
