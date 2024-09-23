import { customAlphabet } from "nanoid";

export type TTables =
  | "address"
  | "authenticator"
  | "board"
  | "capability"
  | "cart"
  | "category"
  | "column"
  | "customer"
  | "guest"
  | "item"
  | "notification"
  | "order"
  | "payment"
  | "post"
  | "product"
  | "product_variant"
  | "stock"
  | "store"
  | "store_variant"
  | "subcategory"
  | "subscription"
  | "tag"
  | "todo"
  | "user"
  | "webhook";

type TablesKey = {
  [key in TTables]: key;
};

type PrefixesKey = {
  [key in TTables]: string;
};

export const tables: TablesKey = {
  address: "address",
  authenticator: "authenticator",
  board: "board",
  capability: "capability",
  cart: "cart",
  category: "category",
  column: "column",
  customer: "customer",
  guest: "guest",
  item: "item",
  notification: "notification",
  order: "order",
  payment: "payment",
  post: "post",
  product: "product",
  product_variant: "product_variant",
  stock: "stock",
  store: "store",
  store_variant: "store_variant",
  subcategory: "subcategory",
  subscription: "subscription",
  tag: "tag",
  todo: "todo",
  user: "user",
  webhook: "webhook",
};

export const prefixes: PrefixesKey = {
  address: "adr",
  authenticator: "ath",
  board: "brd",
  capability: "cap",
  cart: "crt",
  category: "cat",
  column: "col",
  customer: "cus",
  guest: "gst",
  item: "itm",
  notification: "ntf",
  order: "ord",
  payment: "pmt",
  post: "pst",
  product: "prd",
  product_variant: "prv",
  stock: "stk",
  store: "str",
  store_variant: "stv",
  subcategory: "sct",
  subscription: "sub",
  tag: "tag",
  todo: "tdo",
  user: "usr",
  webhook: "wbh",
};

export function generateId(prefix: keyof typeof prefixes) {
  const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

  return [prefix, nanoid()].join("_");
}

// TODO: consider to use e.g. tables.address
// instead of "address" in the schema.ts
// const tables = {
//   address: "address",
//   cart: "cart",
//   post: "post",
//   board: "board",
//   column: "column",
//   item: "item",
//   stripe: "stripe",
// }
