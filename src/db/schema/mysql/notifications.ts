import { boolean, varchar } from "drizzle-orm/mysql-core";

import { lifecycleDates } from "~/db/schema/extends/mysql";
import { mysqlTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const notifications = createTable("notification", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => genId("notification"))
    .primaryKey(), // prefix_ + nanoid (12)
  communication: boolean("communication").default(false).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  marketing: boolean("marketing").default(false).notNull(),
  newsletter: boolean("newsletter").default(false).notNull(),
  referredBy: varchar("referredBy", { length: 255 }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  userId: varchar("userId", { length: 36 }), // uuid v4
  ...lifecycleDates,
});
