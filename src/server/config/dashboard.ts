import type { SidebarNavItem } from "~/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

/**
 * You can keep it in sync with similar:
 * src/islands/navigation/user-menu.tsx
 */
export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
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
      title: "Account",
      href: "/dashboard/account",
      icon: "user",
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
    {
      title: "Admin Page",
      href: "/dashboard/admin",
      icon: "terminal",
      items: [],
    },
  ],
};
