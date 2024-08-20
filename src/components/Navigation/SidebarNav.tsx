import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
  Boxes,
  ChartColumn,
  CircleUserRound,
  FileSliders,
  Home,
  IdCard,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

type IconType =
  | "account"
  | "admin"
  | "analytics"
  | "customers"
  | "dashboard"
  | "myplan"
  | "products"
  | "purchases"
  | "settings"
  | "stores"
  | "upgrade";

type SidebarNavItem = {
  disabled: boolean;
  external?: boolean;
  href: string;
  icon: IconType;
  title: string;
};

type SidebarNavProps = {
  className?: string;
};

export function SidebarNav({ className }: SidebarNavProps) {
  const UserHasPlan = false; // TODO: temp hardcoded boolean
  const UserIsAdmin = true; // TODO: temp hardcoded boolean

  const items: SidebarNavItem[] = [
    {
      title: "Dashboard",
      icon: "dashboard",
      disabled: false,
      href: "/dashboard",
    },
    {
      title: "Stores",
      icon: "stores",
      disabled: true,
      href: "/dashboard/stores",
    },
    {
      title: "Purchases",
      icon: "purchases",
      disabled: true,
      href: "/dashboard/purchases",
    },
    {
      title: "Products",
      icon: "products",
      disabled: true,
      href: "/dashboard",
    },
    {
      title: "Analytics",
      icon: "analytics",
      disabled: true,
      href: "/dashboard",
    },
    {
      title: "Customers",
      icon: "customers",
      disabled: true,
      href: "/dashboard",
    },
    {
      title: "Settings",
      icon: "settings",
      disabled: false,
      href: "/dashboard/settings",
    },
    {
      title: "Account",
      icon: "account",
      disabled: true,
      href: "/dashboard/account",
    },
  ];

  const planItem: SidebarNavItem = UserHasPlan
    ? {
        title: "My Plan",
        icon: "myplan",
        disabled: true,
        href: "/dashboard/billing",
      }
    : {
        title: "Upgrade",
        icon: "upgrade",
        disabled: true,
        href: "/dashboard/billing",
      };

  const adminItem: null | SidebarNavItem = UserIsAdmin
    ? {
        title: "Admin",
        icon: "admin",
        disabled: false,
        href: "/dashboard/admin",
      }
    : null;

  const iconMap: Record<IconType, any> = {
    admin: FileSliders,
    dashboard: Home,
    upgrade: IdCard,
    myplan: IdCard,
    settings: Settings,
    stores: Store,
    account: CircleUserRound,
    analytics: ChartColumn,
    products: Boxes,
    customers: Users,
    purchases: ShoppingCart,
  };

  return (
    <div className={`flex h-full flex-col ${className}`}>
      <div className="flex grow flex-col gap-2">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon || "dashboard"];

          return item.href && !item.disabled ? (
            <Link
              aria-label={item.title}
              href={item.href}
              key={index}
              rel={item.external ? "noreferrer" : ""}
              target={item.external ? "_blank" : ""}
            >
              <span
                className={`
                  group flex w-full items-center rounded-lg border
                  border-transparent px-2 py-1
                  hover:bg-muted hover:text-foreground
                `}
              >
                <Icon aria-hidden="true" className="mr-2 size-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          ) : (
            <span
              className={`
                flex w-full items-center rounded-lg p-2
                text-muted-foreground
                ${item.disabled ? "pointer-events-none opacity-60" : ""}
              `}
              key={index}
            >
              <Icon aria-hidden="true" className="mr-2 size-4" />
              <span>{item.title}</span>
            </span>
          );
        })}
      </div>

      <Separator className="mb-6 mt-10" />

      <div className="flex flex-col gap-2">
        <span
          className={`
            group flex w-full items-center rounded-lg p-2
            text-muted-foreground
            ${planItem.disabled ? "pointer-events-none opacity-60" : ""}
          `}
        >
          <IdCard aria-hidden="true" className="mr-2 size-4" />
          <span>{planItem.title}</span>
        </span>

        {adminItem && (
          <Link
            aria-label={adminItem.title}
            href={adminItem.href}
            rel={adminItem.external ? "noreferrer" : ""}
            target={adminItem.external ? "_blank" : ""}
          >
            <span
              className={`
                group flex w-full items-center rounded-lg border
                border-transparent px-2 py-1
                hover:bg-muted hover:text-foreground
              `}
            >
              <FileSliders aria-hidden="true" className="mr-2 size-4" />
              <span>{adminItem.title}</span>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
