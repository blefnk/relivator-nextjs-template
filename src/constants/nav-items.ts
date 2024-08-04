import type { SidebarNavItem } from "~/types";

type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};

// You can keep it in sync with similar:
// src/components/navigation/user-menu.tsx
export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      href: "/dashboard/stores",
      icon: "store",
      items: [],
      title: "Stores",
    },
    {
      href: "/dashboard/billing",
      icon: "billing",
      items: [],
      title: "Billing",
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
    {
      href: "/dashboard/purchases",
      icon: "dollarSign",
      items: [],
      title: "Purchases",
    },
    {
      href: "/dashboard",
      icon: "laptop",
      items: [],
      title: "Dashboard",
    },
    {
      href: "/dashboard/admin",
      icon: "terminal",
      items: [],
      title: "Admin Page",
    },
  ],
};
