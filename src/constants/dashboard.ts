import type { SidebarNavItem } from "~/types/with";

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      href: "/dashboard/stores",
      icon: "store",
      items: [],
      title: "Dashboard",
    },
    {
      href: "/dashboard/billing",
      icon: "billing",
      items: [],
      title: "Billing",
    },
    {
      href: "/dashboard/purchases",
      icon: "dollarSign",
      items: [],
      title: "Purchases",
    },
    {
      href: "/dashboard/account",
      icon: "user",
      items: [],
      title: "Account",
    },
    {
      href: "/dashboard/settings",
      icon: "settings",
      items: [],
      title: "Settings",
    },
  ],
};
