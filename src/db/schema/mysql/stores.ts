import { boolean, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const stores = createTable("store", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("store")),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  active: boolean("active").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  description: varchar("description", {
    length: 255,
  }),
  slug: varchar("slug", {
    length: 255,
  }),
  stripeAccountId: varchar("stripeAccountId", {
    length: 255,
  }),
  userId: varchar("userId", {
    length: 255,
  }).notNull(),
});
