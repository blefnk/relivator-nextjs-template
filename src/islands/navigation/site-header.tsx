import Link from "next/link";
import type { User } from "@clerk/nextjs/server";
import { settings, siteConfig } from "~/app";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

import { dashboardConfig } from "~/server/config/dashboard";
import { getScopedI18n } from "~/data/i18n/server";
import { Avatar, AvatarFallback, AvatarImage } from "~/islands/account/avatar";
import { CartSheet } from "~/islands/checkout/cart-sheet";
import { Icons } from "~/islands/icons";
import { Combobox } from "~/islands/navigation/combobox";
import { MainNav } from "~/islands/navigation/main-nav";
import { MobileNav } from "~/islands/navigation/mobile-nav";
import { Button, buttonVariants } from "~/islands/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "~/islands/primitives/dropdown-menu";
import { LocaleSwitcher } from "~/islands/switchers/locale-switcher";
import { ThemeSwitcher } from "~/islands/switchers/theme-switcher";

const NavbarStyles = tv({
  base: "w-full border-b border-transparent bg-background/95 backdrop-blur-sm animate-in fade-in slide-in-from-top-full duration-slow",
  variants: {
    border: {
      true: "border-border"
    },
    sticky: {
      true: "sticky top-0 z-40"
    }
  }
});

export type SiteHeaderProps = {
  user: User | null;
} & VariantProps<typeof NavbarStyles>;

export async function SiteHeader({ user, border, sticky }: SiteHeaderProps) {
  const t = await getScopedI18n("islands");

  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`;
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  return (
    <header className={NavbarStyles({ border, sticky })}>
      <nav className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Combobox />
            {settings.themeToggleEnabled && <ThemeSwitcher />}
            {settings.internationalizationEnabled && <LocaleSwitcher />}
            <CartSheet />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.username ?? ""}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">
                        <Icons.user
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Account
                        <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/stores">
                        <Icons.terminal
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Dashboard
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/settings">
                        <Icons.settings
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/sign-out">
                      <Icons.logout
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/sign-in"
                className={buttonVariants({
                  size: "sm"
                })}
              >
                Sign In
                <span className="sr-only">Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      </nav>
    </header>
  );
}
