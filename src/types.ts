import { Metadata } from "next";
import type { DefaultSession } from "next-auth";
import { type FileWithPath } from "react-dropzone";
import { type z } from "zod";

import type { Store } from "~/data/db/schema";
import { type userPrivateMetadataSchema } from "~/data/valids/auth";
import type {
  cartItemSchema,
  cartLineItemSchema,
  checkoutItemSchema
} from "~/data/valids/cart";
import { type Icons } from "~/islands/icons";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string | null;
    email?: string | null;
  }
}

export type WithChildren<T = unknown> = T & { children: React.ReactNode };

export type PageParams = { params: { locale: string } };

export type GenerateMetadata = (
  params: PageParams
) => Metadata | Promise<Metadata>;

declare module "translate" {
  export default function translate(
    text: string,
    options: {
      from: string;
      to: string;
      cache?: number;
      engine?: string;
      key?: string;
      url?: string;
    }
  ): string;
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>;

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export interface StoredFile {
  id: string;
  name: string;
  url: string;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface CuratedStore {
  id: Store["id"];
  name: Store["name"];
  description?: Store["description"];
  stripeAccountId?: Store["stripeAccountId"];
  productCount?: number;
}

export type CartItem = z.infer<typeof cartItemSchema>;

export type CheckoutItem = z.infer<typeof checkoutItemSchema>;

export type CartLineItem = z.infer<typeof cartLineItemSchema>;

export interface SubscriptionPlan {
  id: "basic" | "standard" | "pro";
  name: string;
  description: string;
  features: string[];
  stripePriceId: string;
  price: number;
}

export interface UserSubscriptionPlan extends SubscriptionPlan {
  stripeSubscriptionId?: string | null;
  stripeCurrentPeriodEnd?: string | null;
  stripeCustomerId?: string | null;
  isSubscribed: boolean;
  isCanceled: boolean;
  isActive: boolean;
}
