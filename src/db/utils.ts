import { customAlphabet } from "nanoid";

export type TTables =
  | "address"
  | "authenticator"
  | "board"
  | "capability"
  | "cart"
  | "category"
  | "column"
  | "guest"
  | "item"
  | "notification"
  | "order"
  | "payment"
  | "post"
  | "product"
  | "store"
  | "subcategory"
  | "subscription"
  | "todo"
  | "user";

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
  guest: "guest",
  item: "item",
  notification: "notification",
  order: "order",
  payment: "payment",
  post: "post",
  product: "product",
  store: "store",
  subcategory: "subcategory",
  subscription: "subscription",
  todo: "todo",
  user: "user",
};

export const prefixes: PrefixesKey = {
  address: "adr",
  authenticator: "ath",
  board: "brd",
  capability: "cap",
  cart: "crt",
  category: "cat",
  column: "col",
  guest: "gst",
  item: "itm",
  notification: "ntf",
  order: "ord",
  payment: "pmt",
  post: "pst",
  product: "prd",
  store: "str",
  subcategory: "sct",
  subscription: "sub",
  todo: "tdo",
  user: "usr",
};

export function genId(prefix: keyof typeof prefixes) {
  const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

  return [prefix, nanoid()].join("_");
}
