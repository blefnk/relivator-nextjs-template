import {
  int,
  json,
  mysqlEnum,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import type { StoredFile } from "~/types";

import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const products = createTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("product")),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  category: mysqlEnum("category", [
    "accessories",
    "furniture",
    "clothing",
    "tech",
  ]).default("clothing"),
  createdAt: timestamp("createdAt").defaultNow(),
  description: varchar("description", {
    length: 255,
  }),
  images: json("images").$type<null | StoredFile[]>().default(null),
  inventory: int("inventory").notNull().default(0),
  price: int("price").notNull().default(0),
  rating: int("rating").notNull().default(0),
  storeId: int("storeId").notNull().default(1),
  subcategory: varchar("subcategory", {
    length: 255,
  }),
  tags: json("tags").$type<null | string[]>().default(null),
});
