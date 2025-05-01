import { relations } from "drizzle-orm";
import { userTable } from "../users/tables";
import { uploadsTable } from "./tables";

export const uploadsRelations = relations(uploadsTable, ({ one }) => ({
  user: one(userTable, {
    fields: [uploadsTable.userId],
    references: [userTable.id],
  }),
}));
