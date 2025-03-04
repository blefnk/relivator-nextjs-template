import type Stripe from "stripe";

import { type SQL } from "drizzle-orm";
import { type ClientUploadedFileData } from "uploadthing/types";

import type { Icons } from "~/components/icons";

import { type Store } from "~/server/db/schema";

export interface NavItem {
  title: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export type NavItemWithChildren = {
  items?: NavItemWithChildren[];
} & NavItem;

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithChildren;

export type SidebarNavItem = NavItemWithChildren;

export type SearchParams = Record<string, string | string[] | undefined>;

export type UploadedFile<T = unknown> = {} & ClientUploadedFileData<T>;

export interface StoredFile {
  id: string;
  name: string;
  url: string;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export type DrizzleWhere<T> =
  | SQL
  | ((aliases: T) => SQL<T> | undefined)
  | undefined;

export type StripePaymentStatus = Stripe.PaymentIntent.Status;

export interface Plan {
  id: Store["plan"];
  title: string;
  description: string;
  features: string[];
  stripePriceId: string;
  limits: {
    stores: number;
    products: number;
    tags: number;
    variants: number;
  };
}

export type PlanWithPrice = {
  price: string;
} & Plan;

export type UserPlan = {
  stripeSubscriptionId?: string | null;
  stripeCurrentPeriodEnd?: string | null;
  stripeCustomerId?: string | null;
  isSubscribed: boolean;
  isCanceled: boolean;
  isActive: boolean;
} & Plan;
