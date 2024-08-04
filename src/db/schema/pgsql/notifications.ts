import { boolean, text, varchar } from "drizzle-orm/pg-core";

import { lifecycleDates } from "~/db/schema/extends/pgsql";
import { pgTable as createTable } from "~/db/schema/insert/table";
import { genId } from "~/db/utils";

export const notifications = createTable("notification", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => genId("notification"))
    .primaryKey(), // prefix_ + nanoid (12)
  communication: boolean("communication").default(false).notNull(),
  email: text("email").notNull().unique(),
  marketing: boolean("marketing").default(false).notNull(),
  newsletter: boolean("newsletter").default(false).notNull(),
  referredBy: text("referredBy"),
  token: text("token").notNull().unique(),
  userId: varchar("userId", { length: 36 }), // uuid v4
  ...lifecycleDates,
});
