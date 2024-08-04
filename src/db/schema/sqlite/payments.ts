import { integer, text } from "drizzle-orm/sqlite-core";

import { sqliteTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const payments = createTable("payment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("payment")),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  detailsSubmitted: integer("detailsSubmitted", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  storeId: integer("storeId").notNull(),
  stripeAccountCreatedAt: integer("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: integer("stripeAccountExpiresAt"),
  stripeAccountId: text("stripeAccountId").notNull(),
});
