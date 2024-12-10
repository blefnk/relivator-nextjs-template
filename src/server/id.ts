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

type PrefixesKey = Record<TTables, string>;

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

type GenerateIdOptions = {
  /**
   * The length of the generated ID.
   * @default 16
   * @example 16 => "abc123def456ghi7"
   * */
  length?: number;
  /**
   * The separator to use between the prefix and the generated ID.
   * @default "_"
   * @example "_" => "str_abc123"
   * */
  separator?: string;
};

/**
 * Generates a unique ID with a given prefix.
 * @param prefix The prefix to use for the generated ID.
 * @param options The options for generating the ID.
 * @example
 * generateId("store") => "str_abc123def456"
 * generateId("store", { length: 8 }) => "str_abc123d"
 * generateId("store", { separator: "-" }) => "str-abc123def456"
 */
export function generateId(
  prefix?: keyof typeof prefixes,
  { length = 12, separator = "_" }: GenerateIdOptions = {},
) {
  const id = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length,
  )();
  return prefix ? `${prefixes[prefix]}${separator}${id}` : id;
}

export function generateIdByTableName(prefix: keyof typeof prefixes) {
  const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

  return [prefix, nanoid()].join("_");
}
