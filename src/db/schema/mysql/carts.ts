import {
  boolean,
  json,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import type { CartItem } from "~/types";

import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const carts = createTable("cart", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("cart")),
  clientSecret: varchar("clientSecret", {
    length: 255,
  }),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  email: varchar("email", {
    length: 255,
  }),
  items: json("items").$type<CartItem[] | null>().default(null),
  paymentIntentId: varchar("paymentIntentId", {
    length: 255,
  }),
  userId: varchar("userId", {
    length: 255,
  }),
});
