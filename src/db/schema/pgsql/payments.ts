import { boolean, integer, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const payments = createTable("payment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("payment")),
  createdAt: timestamp("createdAt").defaultNow(),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  storeId: integer("storeId").notNull(),
  stripeAccountCreatedAt: integer("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: integer("stripeAccountExpiresAt"),
  stripeAccountId: text("stripeAccountId").notNull(),
});
