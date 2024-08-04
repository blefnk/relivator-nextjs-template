import { integer, text } from "drizzle-orm/sqlite-core";

import type { CheckoutItem } from "~/types";

import { sqliteTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const orders = createTable("order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("order")),
  name: text("name"),
  addressId: integer("addressId"),
  amount: integer("amount").notNull().default(0),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }),
  email: text("email"),
  items: text("items", {
    mode: "json",
  })
    .$type<CheckoutItem[] | null>()
    .default(null),
  quantity: integer("quantity"),
  storeId: integer("storeId").notNull(),
  stripePaymentIntentId: text("stripePaymentIntentId").notNull(),
  stripePaymentIntentStatus: text("stripePaymentIntentStatus").notNull(),
});
