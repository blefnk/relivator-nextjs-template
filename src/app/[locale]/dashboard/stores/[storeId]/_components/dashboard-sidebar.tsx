"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import * as React from "react";

import { Icons } from "~/components/icons";
import { SidebarNav } from "~/components/layouts/sidebar-nav";
import { ScrollArea } from "~/components/ui/scroll-area";
import { siteConfig } from "~/config/site";
import { cn } from "~/server/utils";
import { type SidebarNavItem } from "~/types";

type DashboardSidebarProps = {
  storeId: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function DashboardSidebar({
  storeId,
  children,
  className,
  ...props
}: DashboardSidebarProps) {
  const segments = useSelectedLayoutSegments();

  const sidebarNav: SidebarNavItem[] = [
    {
      title: "Dashboard",
      href: `/dashboard/stores/${storeId}`,
      icon: "dashboard",
      active: segments.length === 0,
    },
    {
      title: "Orders",
      href: `/dashboard/stores/${storeId}/orders`,
      icon: "cart",
      active: segments.includes("orders"),
    },
    {
      title: "Products",
      href: `/dashboard/stores/${storeId}/products`,
      icon: "product",
      active: segments.includes("products"),
    },
    {
      title: "Customers",
      href: `/dashboard/stores/${storeId}/customers`,
      icon: "avatar",
      active: segments.includes("customers"),
    },
    {
      title: "Analytics",
      href: `/dashboard/stores/${storeId}/analytics`,
      icon: "analytics",
      active: segments.includes("analytics"),
    },
    {
      title: "Settings",
      href: `/dashboard/stores/${storeId}/settings`,
      icon: "settings",
      active: segments.includes("settings"),
    },
  ];

  return (
    <aside className={cn("h-screen w-full", className)} {...props}>
      <div className="flex flex-col gap-2.5 px-4 lg:px-6">{children}</div>
      <ScrollArea className="h-[calc(100vh-8rem)] px-3 py-2.5 lg:px-5">
        <SidebarNav items={sidebarNav} className="p-1 pt-4" />
      </ScrollArea>
    </aside>
  );
}
