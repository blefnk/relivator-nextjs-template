import type { ReactNode } from "react";

import type { Icons } from "~/components/Common/Icons";

type NavItem = {
  description?: string;
  disabled?: boolean;
  external?: boolean;
  href: string;
  icon?: keyof typeof Icons;
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
