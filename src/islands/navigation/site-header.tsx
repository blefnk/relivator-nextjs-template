import { settings, siteConfig } from "~/app";
import { type Session } from "next-auth";
import { tv, type VariantProps } from "tailwind-variants";

import { dashboardConfig } from "~/server/config/dashboard";
import { CartSheet } from "~/islands/checkout/cart-sheet";
import { Combobox } from "~/islands/navigation/combobox";
import { MainMenu } from "~/islands/navigation/main-menu";
import { MobileMenu } from "~/islands/navigation/mobile-menu";
import LocaleSwitcher from "~/islands/switchers/localization-main-switcher";
import { ThemesGeneralSwitcher } from "~/islands/switchers/themes-general-switcher";

import UserMenu from "./user-menu";

const NavbarStyles = tv({
  base: "w-full border-b border-transparent bg-background/95 backdrop-blur-sm",
  variants: {
    border: {
      true: "border-border",
    },
    sticky: {
      true: "sticky top-0 z-40",
    },
    animated: {
      true: "animate-in fade-in slide-in-from-top-full duration-slow",
    },
  },
});

export type SiteHeaderProps = {
  session?: Session | null;
} & VariantProps<typeof NavbarStyles>;

export async function SiteHeader({
  border = true,
  sticky = true,
}: SiteHeaderProps) {
  return (
    <header className={NavbarStyles({ border, sticky })}>
      <nav className="container flex justify-between h-16 items-center">
        <MainMenu items={siteConfig.mainNav} />
        <MobileMenu
          MainMenuItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Combobox />
          {settings.themeToggleEnabled && <ThemesGeneralSwitcher />}
          <CartSheet />
          {settings.internationalizationEnabled && <LocaleSwitcher />}
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
