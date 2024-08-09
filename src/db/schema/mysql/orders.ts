import type { CheckoutItem } from "@/types";

import { int, json, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const orders = createTable("order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("order")),
  name: varchar("name", {
    length: 255,
  }),
  addressId: int("addressId"),
  amount: int("amount").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  email: varchar("email", {
    length: 255,
  }),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: int("quantity"),
  storeId: int("storeId").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", {
    length: 255,
  }).notNull(),
  stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
    length: 255,
  }).notNull(),
});
