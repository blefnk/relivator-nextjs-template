"use client";

import type { HTMLAttributes } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { SidebarNavItem } from "@/types";

import { cn } from "@/utils";

import { Icons } from "~/components/Common/Icons";

type SidebarNavProps = {
  items: SidebarNavItem[];
} & HTMLAttributes<HTMLDivElement>;

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  // @ts-expect-error TODO: fix
  if (!items && items.length > 0) {
    return null;
  }

  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "chevronLeft"];

        return item.href ? (
          <Link
            aria-label={item.title}
            href={item.href}
            key={index}
            rel={item.external ? "noreferrer" : ""}
            target={item.external ? "_blank" : ""}
          >
            <span
              className={cn(
                `
                  group flex w-full items-center rounded-lg border
                  border-transparent px-2 py-1

                  hover:bg-muted hover:text-foreground
                `,
                pathname === item.href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60",
              )}
            >
              <Icon aria-hidden="true" className="mr-2 size-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            className={`
              flex w-full cursor-not-allowed items-center rounded-lg p-2
              text-muted-foreground

              hover:underline
            `}
            key={index}
          >
            {item.title}
          </span>
        );
      })}
    </div>
  );
}
