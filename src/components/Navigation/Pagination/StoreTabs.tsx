"use client";

import type { ComponentPropsWithoutRef } from "react";

import { usePathname, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/reliverse/cn";

type StoreTabsProps = {
  storeId: string;
} & ComponentPropsWithoutRef<typeof Tabs>;

export function StoreTabs({ className, storeId, ...props }: StoreTabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      href: `/dashboard/stores/${storeId}`,
      title: "Store",
    },
    {
      href: `/dashboard/stores/${storeId}/products`,
      title: "Products",
    },
    {
      href: `/dashboard/stores/${storeId}/orders`,
      title: "Orders",
    },
    {
      href: `/dashboard/stores/${storeId}/analytics`,
      title: "Analytics",
    },
  ];

  return (
    <Tabs
      {...props}
      className={cn("w-full overflow-x-auto", className)}
      onValueChange={(value) => {
        router.push(value);
      }}
    >
      <TabsList className="rounded-lg">
        {tabs.map((tab) => (
          <TabsTrigger
            className={cn(
              "rounded-sm",
              pathname === tab.href &&
                "bg-background text-foreground shadow-sm",
            )}
            key={tab.title}
            onClick={() => {
              router.push(tab.href);
            }}
            value={tab.href}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
