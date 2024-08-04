import { text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const addresses = createTable("address", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => genId("address")),
  city: varchar("city", {
    length: 255,
  }),
  country: varchar("country", {
    length: 255,
  }),
  createdAt: timestamp("createdAt").defaultNow(),
  line1: varchar("line1", {
    length: 255,
  }),
  line2: varchar("line2", {
    length: 255,
  }),
  postalCode: varchar("postalCode", {
    length: 255,
  }),
  state: varchar("state", {
    length: 255,
  }),
});
