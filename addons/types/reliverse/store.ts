import type { ComponentType } from "react";
import type { FileWithPath } from "react-dropzone";

import type {
  cartItemSchema,
  cartLineItemSchema,
  checkoutItemSchema,
} from "@/actions/reliverse/validations/cart";
import type { z } from "zod";

import type { Store } from "~/db/schema/provider";

// Store and Product-Related Types
export type Option = {
  icon?: ComponentType<{
    className?: string;
  }>;
  label: string;
  value: string;
};

export type FileWithPreview = {
  preview: string;
} & FileWithPath;

export type StoredFile = {
  id: string;
  name: string;
  url: string;
};

export type DataTableSearchableColumn<TData> = {
  id: keyof TData;
  title: string;
};

export type DataTableFilterableColumn<TData> = {
  id: string;
  options: Option[];
} & DataTableSearchableColumn<TData>;

export type CuratedStore = {
  description?: Store["description"];
  id: Store["id"];
  name: Store["name"];
  productCount?: number;
  stripeAccountId?: Store["stripeAccountId"];
};

export type CartItem = z.infer<typeof cartItemSchema>;

export type CheckoutItem = z.infer<typeof checkoutItemSchema>;

export type CartLineItem = z.infer<typeof cartLineItemSchema>;
