import type { InferSelectModel } from "drizzle-orm";

import type {
  addresses,
  boards,
  carts,
  columns,
  items,
  notifications,
  orders,
  payments,
  products,
  stores,
  todos,
  users,
} from "~/db/schema/mysql";

// TYPES
// ========================================================

export type Address = InferSelectModel<typeof addresses>;

export type Board = InferSelectModel<typeof boards>;

export type Cart = InferSelectModel<typeof carts>;

export type Column = InferSelectModel<typeof columns>;

export type Item = InferSelectModel<typeof items>;

export type Notification = typeof notifications.$inferSelect;

export type Order = InferSelectModel<typeof orders>;

export type Payment = InferSelectModel<typeof payments>;

export type Product = InferSelectModel<typeof products>;

export type Store = InferSelectModel<typeof stores>;

export type Todo = InferSelectModel<typeof todos>;

export type User = InferSelectModel<typeof users>;
