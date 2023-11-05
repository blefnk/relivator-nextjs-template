import { type SidebarNavItem } from "~/types";

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};

/**
 * You can get it in sync with src/islands/navigation/user-menu.tsx
 */
export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "user",
      items: [],
    },
    {
      title: "Stores",
      href: "/dashboard/stores",
      icon: "store",
      items: [],
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
      items: [],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      items: [],
    },
    {
      title: "Purchases",
      href: "/dashboard/purchases",
      icon: "dollarSign",
      items: [],
    },
  ],
};
