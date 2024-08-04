import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const lifecycleDates = {
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
};
