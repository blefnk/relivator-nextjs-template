import { integer, json, pgEnum, text, timestamp } from "drizzle-orm/pg-core";

import type { StoredFile } from "~/types";

import { pgTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const categoryEnum = pgEnum("category", [
  "accessories",
  "furniture",
  "clothing",
  "tech",
]);

export const products = createTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("product")),
  name: text("name").notNull(),
  category: categoryEnum("category").default("clothing"),
  createdAt: timestamp("createdAt").defaultNow(),
  description: text("description"),
  images: json("images").$type<null | StoredFile[]>().default(null),
  inventory: integer("inventory").notNull().default(0),
  price: integer("price").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  storeId: integer("storeId").notNull().default(1),
  subcategory: text("subcategory"),
  tags: json("tags").$type<null | string[]>().default(null),
});
