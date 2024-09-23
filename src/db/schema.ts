import type {
  CartItemSchema,
  CheckoutItemSchema,
} from "~/server/validations/cart";
import type { CartItem, CheckoutItem, StoredFile } from "~/types/store";
import type { InferSelectModel } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";
import type Stripe from "stripe";

import { databasePrefix } from "~/../reliverse.config";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  json,
  pgEnum,
  pgTableCreator,
  primaryKey,
  real,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { createdUpdatedAt } from "~/db/extends";
import { generateId } from "~/db/utils";

export const createTable = pgTableCreator(
  (name) => `${databasePrefix}_${name}`,
);

export const addresses = createTable("address", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("address"))
    .primaryKey()
    .notNull(),
  city: text("city"),
  country: text("country"),
  line1: text("line1"),
  line2: text("line2"),
  postalCode: text("postalCode"),
  state: text("state"),
  ...createdUpdatedAt,
});

export type Address = typeof addresses.$inferSelect;

export type NewAddress = typeof addresses.$inferInsert;

export const carts = createTable("cart", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("cart"))
    .primaryKey()
    .notNull(),
  clientSecret: text("client_secret"),
  closed: boolean("closed").notNull().default(false),
  email: text("email"),
  items: json("items").$type<CartItemSchema[] | null>().default(null),
  paymentIntentId: varchar("payment_intent_id", { length: 256 }),
  userId: text("user_id"),
  ...createdUpdatedAt,
});

export type Cart = typeof carts.$inferSelect;

export type NewCart = typeof carts.$inferInsert;

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

export const subcategories = createTable(
  "subcategory",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("subcategory"))
      .primaryKey()
      .notNull(),
    name: text("name").notNull().unique(),
    categoryId: varchar("category_id", { length: 30 })
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
    description: text("description"),
    slug: text("slug").unique().notNull(),
    ...createdUpdatedAt,
  },
  (table) => ({
    subcategoriesCategoryIdIdx: index("subcategories_category_id_idx").on(
      table.categoryId,
    ),
  }),
);

export const subcategoriesRelations = relations(subcategories, ({ one }) => ({
  category: one(categories, {
    fields: [subcategories.categoryId],
    references: [categories.id],
  }),
}));

export type Subcategory = typeof subcategories.$inferSelect;

export type NewSubcategory = typeof subcategories.$inferInsert;

export const categories = createTable("category", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("category"))
    .primaryKey()
    .notNull(),
  name: text("name").notNull().unique(),
  description: text("description"),
  image: text("image"),
  slug: text("slug").notNull().unique(),
  ...createdUpdatedAt,
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
  subcategories: many(subcategories),
}));

export type Category = typeof categories.$inferSelect;

export type NewCategory = typeof categories.$inferInsert;

export const customers = createTable(
  "customer",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("customer"))
      .primaryKey()
      .notNull(),
    name: text("name"),
    email: text("email"),
    storeConnectId: varchar("store_connect_id").unique(),
    storeId: varchar("store_id", { length: 30 })
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),
    stripeCustomerId: varchar("stripe_customer_id").unique().notNull(),
    ...createdUpdatedAt,
  },
  (table) => ({
    storeIdIdx: index("customers_store_id_idx").on(table.storeId),
    stripeCustomerIdIdx: index("customers_stripe_customer_id_idx").on(
      table.stripeCustomerId,
    ),
  }),
);

export type Customer = typeof customers.$inferSelect;

export type NewCustomer = typeof customers.$inferInsert;

export const customersRelations = relations(customers, ({ one }) => ({
  store: one(stores, {
    fields: [customers.storeId],
    references: [stores.id],
  }),
}));

export const posts = createTable(
  "post",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("post"))
      .primaryKey()
      .notNull(),
    name: varchar("name", {
      length: 256,
    }),
    content: text("content").notNull(),
    createdById: varchar("createdById", {
      length: 255,
    })
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    title: text("title").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ...createdUpdatedAt,
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const boards = createTable(
  "board",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("board"))
      .primaryKey()
      .notNull(),
    name: text("name").notNull(),
    color: text("color").notNull(),
    ownerId: text("owner_id").notNull(),
  },
  (table) => ({
    ownerIdx: index("board_owner_idx").on(table.ownerId),
  }),
);

export const createBoardSchema = createInsertSchema(boards, {
  color: z.string().regex(/^#[\da-f]{6}$/i),
}).omit({
  id: true,
  ownerId: true,
});

export const boardsRelations = relations(boards, ({ many, one }) => ({
  columns: many(columns),
  items: many(items),
  owner: one(users, {
    fields: [boards.ownerId],
    references: [users.id],
  }),
}));

export const columns = createTable(
  "column",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("column"))
      .primaryKey()
      .notNull(),
    name: text("name").notNull(),
    boardId: text("board_id").notNull(),
    order: integer("order").notNull(),
  },
  (table) => ({
    boardIdx: index("column_board_idx").on(table.boardId),
  }),
);

export type Column = InferSelectModel<typeof columns>;

export const createColumnSchema = createInsertSchema(columns, {
  id: z.string().startsWith("col_"),
}).omit({
  order: true,
});

export const columnsRelations = relations(columns, ({ many, one }) => ({
  board: one(boards, {
    fields: [columns.boardId],
    references: [boards.id],
  }),
  items: many(items),
}));

export const items = createTable(
  "item",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("item"))
      .primaryKey()
      .notNull(),
    boardId: text("board_id").notNull(),
    columnId: text("column_id").notNull(),
    content: text("content"),
    order: integer("order").notNull(),
    title: text("title").notNull(),
  },
  (table) => ({
    boardIdx: index("item_board_idx").on(table.boardId),
    columnIdx: index("item_column_idx").on(table.columnId),
  }),
);

export type Item = InferSelectModel<typeof items>;

export const createItemSchema = createInsertSchema(items, {
  id: z.string().startsWith("itm_"),
  order: z.coerce.number(),
}).omit({});

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

export const webhooks = createTable("webhook", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("webhook"))
    .primaryKey()
    .notNull(),
  stripeAccount: text("stripe_account"),
  stripeApiVersion: text("stripe_api_version"),
  stripeData: json("stripe_data").$type<Stripe.Event.Data>(),
  stripeLiveMode: boolean("stripe_livemode"),
  stripeObject: text("stripe_object"),
  stripePendingWebhooks: real("stripe_pending_webhooks"),
  stripeRequest: json("stripe_request").$type<Stripe.Event.Request>(),
  stripeType: text("stripe_type"),
  ...createdUpdatedAt,
});

export const todos = createTable("todo", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("todo"))
    .primaryKey()
    .notNull(),
  content: text("content").notNull(),

  done: boolean("done"),
  position: integer("position").default(0),
  userId: text("user_id").notNull(),
  ...createdUpdatedAt,
});

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, {
    fields: [todos.userId],
    references: [users.email],
  }),
}));

export const notifications = createTable("notification", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("notification"))
    .primaryKey()
    .notNull(),
  communication: boolean("communication").default(false).notNull(),
  email: text("email").notNull().unique(),
  marketing: boolean("marketing").default(false).notNull(),
  newsletter: boolean("newsletter").default(false).notNull(),
  referredBy: text("referredBy"),
  token: text("token").notNull().unique(),
  userId: varchar("user_id", { length: 36 }),
  ...createdUpdatedAt,
});

export type Notification = typeof notifications.$inferSelect;

export type NewNotification = typeof notifications.$inferInsert;

export const storeVariants = createTable(
  "store_variant",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("store_variant"))
      .primaryKey()
      .notNull(),
    name: text("name").notNull(),
    storeId: varchar("store_id", { length: 30 })
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),
    ...createdUpdatedAt,
  },
  (table) => ({
    storeIdIdx: index("store_variants_store_id_idx").on(table.storeId),
    variantsNameUnique: unique("store_variants_name_store_id_unique")
      .on(table.name, table.storeId)
      .nullsNotDistinct(),
  }),
);

export const variantsRelations = relations(storeVariants, ({ one }) => ({
  store: one(stores, {
    fields: [storeVariants.storeId],
    references: [stores.id],
  }),
}));

export type Variant = typeof storeVariants.$inferSelect;

export type NewVariant = typeof storeVariants.$inferInsert;

export const productVariants = createTable(
  "product_variant",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("product_variant"))
      .primaryKey()
      .notNull(),
    productId: varchar("product_id", { length: 30 })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    variantId: varchar("variant_id", { length: 30 })
      .references(() => storeVariants.id, { onDelete: "cascade" })
      .notNull(),
    ...createdUpdatedAt,
  },
  (table) => ({
    productIdIdx: index("product_variants_product_id_idx").on(table.productId),
    variantIdIdx: index("product_variants_variant_id_idx").on(table.variantId),
  }),
);

export const productVariantsRelations = relations(
  productVariants,
  ({ many, one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    productVariantValues: many(productVariantValues),
    variant: one(storeVariants, {
      fields: [productVariants.variantId],
      references: [storeVariants.id],
    }),
  }),
);

export type ProductVariant = typeof productVariants.$inferSelect;

export type NewProductVariant = typeof productVariants.$inferInsert;

export const productVariantValues = createTable(
  "product_variant_value",
  {
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    productVariantId: varchar("product_variant_id", { length: 30 })
      .references(() => productVariants.id, { onDelete: "cascade" })
      .notNull(),
    stockId: varchar("stock_id", { length: 30 })
      .references(() => stocks.id, { onDelete: "cascade" })
      .notNull(),
    value: text("value").notNull(),
    ...createdUpdatedAt,
  },
  (table) => ({
    pk: primaryKey({
      name: "product_variant_values_pk",
      columns: [table.productVariantId, table.value],
    }),
    productVariantIdIdx: index("variant_values_product_variant_id_idx").on(
      table.productVariantId,
    ),
    stockIdIdx: index("variant_values_stock_id_idx").on(table.stockId),
  }),
);

export const productVariantValuesRelations = relations(
  productVariantValues,
  ({ one }) => ({
    productVariant: one(productVariants, {
      fields: [productVariantValues.productVariantId],
      references: [productVariants.productId],
    }),
  }),
);

export type ProductVariantValue = typeof productVariantValues.$inferSelect;

export type NewProductVariantValue = typeof productVariantValues.$inferInsert;

export const orders = createTable(
  "order",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("order"))
      .primaryKey()
      .notNull(),
    name: text("name").notNull(),
    addressId: varchar("address_id", { length: 30 })
      .references(() => addresses.id, { onDelete: "cascade" })
      .notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    email: text("email").notNull(),
    items: json("items").$type<CheckoutItemSchema[] | null>().default(null),
    quantity: integer("quantity"),
    storeId: varchar("store_id", { length: 30 })
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),
    stripePaymentIntentId: text("stripe_payment_intent_id").notNull(),
    stripePaymentIntentStatus: text("stripe_payment_intent_status").notNull(),
    ...createdUpdatedAt,
  },
  (table) => ({
    addressIdIdx: index("orders_address_id_idx").on(table.addressId),
    storeIdIdx: index("orders_store_id_idx").on(table.storeId),
  }),
);

export type Order = typeof orders.$inferSelect;

export type NewOrder = typeof orders.$inferInsert;

export const payments2 = createTable("payment", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("payment"))
    .primaryKey()
    .notNull(),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  storeId: integer("storeId").notNull(),
  stripeAccountCreatedAt: integer("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: integer("stripeAccountExpiresAt"),
  stripeAccountId: text("stripeAccountId").notNull(),
  ...createdUpdatedAt,
});

export const paymentsRelations2 = relations(payments2, ({ one }) => ({
  store: one(stores, {
    fields: [payments2.storeId],
    references: [stores.id],
  }),
}));

export const payments = createTable(
  "payment",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("payment"))
      .primaryKey()
      .notNull(),
    detailsSubmitted: boolean("details_submitted").notNull().default(false),
    storeId: varchar("store_id", { length: 30 })
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),
    stripeAccountCreatedAt: timestamp("stripe_account_created_at"),
    stripeAccountExpiresAt: timestamp("stripe_account_expires_at"),
    stripeAccountId: varchar("stripe_account_id", { length: 256 }).notNull(),
    ...createdUpdatedAt,
  },
  (table) => ({
    storeIdIdx: index("payments_store_id_idx").on(table.storeId),
  }),
);

export const paymentsRelations = relations(payments, ({ one }) => ({
  store: one(stores, { fields: [payments.storeId], references: [stores.id] }),
}));

export type Payment = typeof payments.$inferSelect;

export type NewPayment = typeof payments.$inferInsert;

export const categoryEnum = pgEnum("category", [
  "accessories",
  "furniture",
  "clothing",
  "tech",
]);

export const products2 = createTable("product", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("product"))
    .primaryKey()
    .notNull(),
  name: text("name").notNull(),
  category: categoryEnum("category").default("clothing"),
  description: text("description"),
  images: json("images").$type<null | StoredFile[]>().default(null),
  inventory: integer("inventory").notNull().default(0),
  price: integer("price").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  storeId: integer("storeId").notNull().default(1),
  subcategory: text("subcategory"),
  tags: json("tags").$type<null | string[]>().default(null),
  ...createdUpdatedAt,
});

export type Product2 = InferSelectModel<typeof products>;

export const productsRelations2 = relations(products2, ({ one }) => ({
  store: one(stores, {
    fields: [products2.storeId],
    references: [stores.id],
  }),
  user: one(users, {
    fields: [products2.storeId],
    references: [users.id],
  }),
}));

export const productStatusEnum = pgEnum("product_status", [
  "active",
  "draft",
  "archived",
]);

export const products = createTable(
  "product",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("product"))
      .primaryKey()
      .notNull(),
    name: text("name").notNull(),
    categoryId: varchar("category_id", { length: 30 })
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
    description: text("description"),
    images: json("images").$type<null | StoredFile[]>().default(null),
    inventory: integer("inventory").notNull().default(0),
    originalPrice: decimal("original_price", {
      precision: 10,
      scale: 2,
    }).default("0"),

    /**
     * postgresql docs suggest using numeric for money
     * @see https://www.postgresql.org/docs/current/datatype-money.html#:~:text=Values%20of%20the%20numeric%2C%20int%2C%20and%20bigint%20data%20types%20can%20be%20cast%20to%20money.
     * numeric and decimal are the same in postgresql
     * @see https://www.postgresql.org/docs/current/datatype-numeric.html#:~:text=9223372036854775808%20to%20%2B9223372036854775807-,decimal,the%20decimal%20point%3B%20up%20to%2016383%20digits%20after%20the%20decimal%20point,-real
     */
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    rating: integer("rating").notNull().default(0),
    status: productStatusEnum("status").notNull().default("active"),
    storeId: varchar("store_id", { length: 30 })
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),
    subcategoryId: varchar("subcategory_id", { length: 30 }).references(
      () => subcategories.id,
      { onDelete: "cascade" },
    ),
    ...createdUpdatedAt,
  },
  (table) => ({
    categoryIdIdx: index("products_category_id_idx").on(table.categoryId),
    storeIdIdx: index("products_store_id_idx").on(table.storeId),
    subcategoryIdIdx: index("products_subcategory_id_idx").on(
      table.subcategoryId,
    ),
  }),
);

export const productsRelations = relations(products, ({ many, one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
  subcategory: one(subcategories, {
    fields: [products.subcategoryId],
    references: [subcategories.id],
  }),
  tags: many(productTags, { relationName: "productTags" }),
  variants: many(productVariants, { relationName: "productVariants" }),
}));

export type Product = typeof products.$inferSelect;

export type NewProduct = typeof products.$inferInsert;

export const stocks = createTable(
  "stock",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("stock"))
      .primaryKey()
      .notNull(),
    productVariantId: varchar("product_variant_id", { length: 30 })
      .references(() => productVariants.id, { onDelete: "cascade" })
      .notNull(),
    quantity: integer("quantity").notNull().default(0),
    ...createdUpdatedAt,
  },
  (table) => ({
    productVariantIdIdx: index("stocks_product_variant_id_idx").on(
      table.productVariantId,
    ),
  }),
);

export const stocksRelations = relations(stocks, ({ one }) => ({
  productVariant: one(productVariants, {
    fields: [stocks.productVariantId],
    references: [productVariants.id],
  }),
  productVariantValues: one(productVariantValues, {
    fields: [stocks.productVariantId],
    references: [productVariantValues.productVariantId],
  }),
}));

export type Stock = typeof stocks.$inferSelect;

export type NewStock = typeof stocks.$inferInsert;

export const storePlanEnum2 = pgEnum("store_plan", ["free", "starter", "pro"]);

export const stores2 = createTable("store", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("store"))
    .primaryKey()
    .notNull(),
  name: text("name").notNull(),
  active: boolean("active").notNull().default(false),
  cancelPlanAtEnd: boolean("cancel_plan_at_end").default(false),
  description: text("description"),
  plan: storePlanEnum2("plan").notNull().default("free"),
  planEndsAt: timestamp("ends_at"),
  productLimit: integer("product_limit").notNull().default(10),
  slug: text("slug").unique().notNull(),
  stripeAccountId: varchar("stripe_account_id").unique(),
  stripeCustomerId: varchar("stripe_customer_id").unique(),
  tagLimit: integer("tag_limit").notNull().default(5),
  userId: varchar("user_id", { length: 36 }).notNull(),
  variantLimit: integer("variant_limit").notNull().default(5),
  ...createdUpdatedAt,
});

export type Store2 = InferSelectModel<typeof stores>;

export const storesRelations2 = relations(stores2, ({ many, one }) => ({
  payments: many(payments),
  products: many(products),
  user: one(users, {
    fields: [stores2.id],
    references: [users.id],
  }),
}));

export const storePlanEnum = pgEnum("store_plan", ["free", "standard", "pro"]);

export const stores = createTable("store", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("store"))
    .primaryKey()
    .notNull(),
  name: text("name").notNull(),
  cancelPlanAtEnd: boolean("cancel_plan_at_end").default(false),
  description: text("description"),
  plan: storePlanEnum("plan").notNull().default("free"),

  planEndsAt: timestamp("ends_at"),
  productLimit: integer("product_limit").notNull().default(10),
  slug: text("slug").unique().notNull(),
  stripeAccountId: varchar("stripe_account_id").unique(), // stripe connect
  stripeCustomerId: varchar("stripe_customer_id").unique(),
  tagLimit: integer("tag_limit").notNull().default(5),
  userId: varchar("user_id", { length: 36 }).notNull(), // uuid v4
  variantLimit: integer("variant_limit").notNull().default(5),
  ...createdUpdatedAt,
});

export const storesRelations = relations(stores, ({ many }) => ({
  customers: many(customers, { relationName: "storeCustomers" }),
  payments: many(payments, { relationName: "storePayments" }),
  products: many(products, { relationName: "storeProducts" }),
  tags: many(tags, { relationName: "storeTags" }),
  variants: many(storeVariants, { relationName: "storeVariants" }),
}));

export type Store = typeof stores.$inferSelect;

export type NewStore = typeof stores.$inferInsert;

// store tags
export const tags = createTable(
  "tag",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("tag"))
      .primaryKey()
      .notNull(),
    name: text("name").notNull(),
    color: text("color").notNull().default("blue"),
    storeId: varchar("store_id", { length: 30 })
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),
    ...createdUpdatedAt,
  },
  (table) => ({
    storeIdIdx: index("tags_store_id_idx").on(table.storeId),
    tagsNameUnique: unique("tags_name_store_id_unique")
      .on(table.name, table.storeId)
      .nullsNotDistinct(),
  }),
);

export const tagsRelations = relations(tags, ({ many, one }) => ({
  products: many(products, {
    relationName: "productTags",
  }),
  store: one(stores, { fields: [tags.storeId], references: [stores.id] }),
}));

export type Tag = typeof tags.$inferSelect;

export type NewTag = typeof tags.$inferInsert;

export const productTags = createTable(
  "product_tag",
  {
    productId: varchar("product_id", { length: 30 })
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    tagId: varchar("tag_id", { length: 30 })
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
    ...createdUpdatedAt,
  },
  (table) => ({
    pk: primaryKey({
      name: "product_tags_pk",
      columns: [table.productId, table.tagId],
    }),
    productTagIdx: index("product_tags_product_id_tag_id_idx").on(
      table.productId,
      table.tagId,
    ),
  }),
);

export const productTagsRelations = relations(productTags, ({ one }) => ({
  product: one(products, {
    fields: [productTags.productId],
    references: [products.id],
  }),
  tag: one(tags, { fields: [productTags.tagId], references: [tags.id] }),
}));

export type ProductTag = typeof productTags.$inferSelect;

export type NewProductTag = typeof productTags.$inferInsert;

export const modeEnum = pgEnum("mode", ["buyer", "seller"]);

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const statusEnum = pgEnum("status", [
  "guest",
  "idle",
  "invisible",
  "no-disturb",
  "offline",
  "online",
]);

export const users = createTable("user", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("user"))
    .primaryKey()
    .notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  currentCartId: text("currentCartId"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  hashedPassword: text("hashedPassword"),
  image: text("image"),
  mode: modeEnum("mode").default("buyer"),
  role: roleEnum("role").default("user"),
  status: statusEnum("status").default("offline"),
  stripeCurrentPeriodEnd: text("stripeCurrentPeriodEnd"),
  stripeCustomerId: text("stripeCustomerId"),
  stripePriceId: text("stripePriceId"),
  stripeSubscriptionId: text("stripeSubscriptionId"),
  ...createdUpdatedAt,
});

export type User = InferSelectModel<typeof users>;

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

export const accounts = createTable(
  "account",
  {
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    id_token: text("id_token"),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    scope: text("scope"),
    session_state: text("session_state"),
    token_type: text("token_type"),
    type: text("type").$type<AdapterAccountType>().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export type InsertUser = typeof users.$inferInsert;

export type SelectUser = typeof users.$inferSelect;

export const sessions = createTable(
  "session",
  {
    expires: timestamp("expires", {
      mode: "date",
    }).notNull(),
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    expires: timestamp("expires", {
      mode: "date",
    }).notNull(),
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({
      columns: [vt.identifier, vt.token],
    }),
  }),
);

export const authenticators = createTable(
  "authenticator",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId("authenticator"))
      .primaryKey()
      .notNull(),
    counter: integer("counter").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialID: text("credentialId").notNull().unique(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    transports: text("transports"),
    userId: text("user_id").notNull(),
  },
  (authenticator) => ({
    userIdIdx: index("userId_idx").on(authenticator.userId),
  }),
);

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
  user: one(users, {
    fields: [authenticators.userId],
    references: [users.id],
  }),
}));

export const guests = createTable("guest", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("guest"))
    .primaryKey()
    .notNull(),
  email: text("email"),
  ...createdUpdatedAt,
});

export const guestsRelations = relations(users, ({ many }) => ({
  carts: many(carts),
  products: many(products),
  todos: many(todos),
}));

export const capabilities = createTable("capability", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId("capability"))
    .primaryKey()
    .notNull(),
  promoteUsers: boolean("promote_users").default(false),
  removeUsers: boolean("remove_users").default(false),
  userId: text("user_id").notNull(),
  ...createdUpdatedAt,
});

export const capabilitiesRelations = relations(capabilities, ({ one }) => ({
  user: one(users, {
    fields: [capabilities.userId],
    references: [users.id],
  }),
}));
