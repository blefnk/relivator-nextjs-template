import { relations } from "drizzle-orm";

import { userTable } from "../users/tables";
import { polarCustomerTable, polarSubscriptionTable } from "./tables";

export const polarCustomerRelations = relations(polarCustomerTable, ({ one }) => ({
  user: one(userTable, {
    fields: [polarCustomerTable.userId],
    references: [userTable.id],
  }),
}));

export const polarSubscriptionRelations = relations(polarSubscriptionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [polarSubscriptionTable.userId],
    references: [userTable.id],
  }),
}));

export const extendUserRelations = relations(userTable, ({ many }) => ({
  polarCustomers: many(polarCustomerTable),
  polarSubscriptions: many(polarSubscriptionTable),
}));
