import type { ReactNode } from "react";

type IconName =
  | "billing"
  | "dollarSign"
  | "laptop"
  | "settings"
  | "store"
  | "terminal"
  | "user";

type NavItem = {
  description?: string;
  disabled?: boolean;
  external?: boolean;
  href: string;
  icon?: IconName;
  label?: string;
  title: string;
};

type NavItemWithChildren = {
  items: NavItemWithChildren[];
} & NavItem;

type NavItemWithOptionalChildren = {
  items?: NavItemWithChildren[];
} & NavItem;

export type MainMenuItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type GeneralShellProps = {
  header?: ReactNode;
};
