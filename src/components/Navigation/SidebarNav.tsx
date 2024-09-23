import Link from "next/link";

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

import { Separator } from "~/components/ui/separator";

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
      disabled: false,
      href: "/dashboard",
      icon: "dashboard",
      title: "Dashboard",
    },
    {
      disabled: true,
      href: "/dashboard/stores",
      icon: "stores",
      title: "Stores",
    },
    {
      disabled: true,
      href: "/dashboard/purchases",
      icon: "purchases",
      title: "Purchases",
    },
    {
      disabled: true,
      href: "/dashboard",
      icon: "products",
      title: "Products",
    },
    {
      disabled: true,
      href: "/dashboard",
      icon: "analytics",
      title: "Analytics",
    },
    {
      disabled: true,
      href: "/dashboard",
      icon: "customers",
      title: "Customers",
    },
    {
      disabled: false,
      href: "/dashboard/settings",
      icon: "settings",
      title: "Settings",
    },
    {
      disabled: true,
      href: "/dashboard/account",
      icon: "account",
      title: "Account",
    },
  ];

  const planItem: SidebarNavItem = UserHasPlan
    ? {
        disabled: false,
        href: "/dashboard/billing",
        icon: "myplan",
        title: "My Plan",
      }
    : {
        disabled: false,
        href: "/dashboard/billing",
        icon: "upgrade",
        title: "Upgrade",
      };

  const adminItem: null | SidebarNavItem = UserIsAdmin
    ? {
        disabled: false,
        href: "/dashboard/admin",
        icon: "admin",
        title: "Admin",
      }
    : null;

  const iconMap: Record<IconType, any> = {
    account: CircleUserRound,
    admin: FileSliders,
    analytics: ChartColumn,
    customers: Users,
    dashboard: Home,
    myplan: IdCard,
    products: Boxes,
    purchases: ShoppingCart,
    settings: Settings,
    stores: Store,
    upgrade: IdCard,
  };

  return (
    <div className={`flex h-full flex-col ${className}`}>
      <div className="flex grow flex-col gap-2">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon || "dashboard"];

          return item.href && !item.disabled ? (
            <Link
              key={index}
              aria-label={item.title}
              href={item.href}
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
                <Icon className="mr-2 size-4" aria-hidden="true" />
                <span>{item.title}</span>
              </span>
            </Link>
          ) : (
            <span
              key={index}
              className={`
                flex w-full items-center rounded-lg p-2
                text-muted-foreground
                ${item.disabled ? "pointer-events-none opacity-60" : ""}
              `}
            >
              <Icon className="mr-2 size-4" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          );
        })}
      </div>

      <Separator className="mb-6 mt-10" />

      <div className="flex flex-col gap-2">
        <Link
          className={`
            group flex w-full items-center rounded-lg p-2
            hover:bg-muted hover:text-foreground
            ${planItem.disabled ? "pointer-events-none opacity-60" : ""}
          `}
          aria-label={planItem.title}
          href={planItem.href}
        >
          <IdCard className="mr-2 size-4" aria-hidden="true" />
          <span>{planItem.title}</span>
        </Link>

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
              <FileSliders className="mr-2 size-4" aria-hidden="true" />
              <span>{adminItem.title}</span>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
