import type { InferSelectModel } from "drizzle-orm";

import type {
  columns,
  items,
  orders,
  products,
  stores,
  users,
} from "~/db/schema/pgsql";

// TYPES
// ========================================================

export type Column = InferSelectModel<typeof columns>;

export type Item = InferSelectModel<typeof items>;

// export type Notification = typeof notifications.$inferSelect;

export type Order = InferSelectModel<typeof orders>;

export type Product = InferSelectModel<typeof products>;

export type Store = InferSelectModel<typeof stores>;

export type User = InferSelectModel<typeof users>;
