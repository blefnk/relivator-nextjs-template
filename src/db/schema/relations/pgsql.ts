import { relations } from "drizzle-orm";

import {
  accounts,
  authenticators,
  boards,
  capabilities,
  carts,
  columns,
  items,
  payments,
  products,
  sessions,
  stores,
  todos,
  users,
} from "~/db/schema/pgsql";

// RELATIONS
// ========================================================
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  authenticators: many(authenticators),
  boards: many(boards),
  capabilities: many(capabilities),
  carts: many(carts),
  products: many(products),
  sessions: many(sessions),
  stores: many(stores),
  todos: many(todos),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
  user: one(users, {
    fields: [authenticators.userId],
    references: [users.id],
  }),
}));

export const boardsRelations = relations(boards, ({ many, one }) => ({
  columns: many(columns),
  items: many(items),
  owner: one(users, {
    fields: [boards.ownerId],
    references: [users.id],
  }),
}));

export const columnsRelations = relations(columns, ({ many, one }) => ({
  board: one(boards, {
    fields: [columns.boardId],
    references: [boards.id],
  }),
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one }) => ({
  board: one(boards, {
    fields: [items.boardId],
    references: [boards.id],
  }),
  column: one(columns, {
    fields: [items.columnId],
    references: [columns.id],
  }),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, {
    fields: [todos.userId],
    references: [users.email],
  }),
}));

export const storesRelations = relations(stores, ({ many, one }) => ({
  payments: many(payments),
  products: many(products),
  user: one(users, {
    fields: [stores.id],
    references: [users.id],
  }),
}));

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  user: one(users, {
    fields: [products.storeId],
    references: [users.id],
  }),
}));

export const cartsRelations = relations(carts, ({ one }) => ({
  store: one(stores, {
    fields: [carts.id],
    references: [stores.id],
  }),
  user: one(users, {
    fields: [carts.id],
    references: [users.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  store: one(stores, {
    fields: [payments.storeId],
    references: [stores.id],
  }),
}));

export const guestsRelations = relations(users, ({ many }) => ({
  carts: many(carts),
  products: many(products),
  todos: many(todos),
}));

export const capabilitiesRelations = relations(capabilities, ({ one }) => ({
  user: one(users, {
    fields: [capabilities.userId],
    references: [users.id],
  }),
}));
