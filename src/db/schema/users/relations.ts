import { relations } from "drizzle-orm";
import { uploadsTable } from "../uploads/tables";
import { accountTable, sessionTable, userTable } from "./tables";

export const userRelations = relations(userTable, ({ many }) => ({
  uploads: many(uploadsTable),
  sessions: many(sessionTable),
  accounts: many(accountTable),
}));

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));

export const accountRelations = relations(accountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}));
