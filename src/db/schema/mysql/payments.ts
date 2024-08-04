import { boolean, int, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const payments = createTable("payment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("payment")),
  createdAt: timestamp("createdAt").defaultNow(),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  storeId: int("storeId").notNull(),
  stripeAccountCreatedAt: int("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: int("stripeAccountExpiresAt"),
  stripeAccountId: varchar("stripeAccountId", {
    length: 255,
  }).notNull(),
});
