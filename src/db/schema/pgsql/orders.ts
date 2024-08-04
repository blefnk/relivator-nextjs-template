import { integer, json, text, timestamp } from "drizzle-orm/pg-core";

import type { CheckoutItem } from "~/types";

import { pgTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const orders = createTable("order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("order")),
  name: text("name"),
  addressId: integer("addressId"),
  amount: integer("amount").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  email: text("email"),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: integer("quantity"),
  storeId: integer("storeId").notNull(),
  stripePaymentIntentId: text("stripePaymentIntentId").notNull(),
  stripePaymentIntentStatus: text("stripePaymentIntentStatus").notNull(),
});
