import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { intlProvider } from "~/../reliverse.config";

import { siteConfig } from "~/app";
import { UserButton } from "~/components/Account/UserButton";
import { CartDialog } from "~/components/Commerce/Cart/CartDialog";
import { LocaleSwitcher } from "~/components/Common/LocaleSwitcher";
import { DonateLink } from "~/components/Navigation/DonateLink";
import { MainMenu } from "~/components/Navigation/MainMenu";
import { MobileMenu } from "~/components/Navigation/MobileMenu";
import { ThemesGeneralSwitcher } from "~/components/Switchers/ThemesGeneralSwitcher";
import { dashboardConfig } from "~/constants/nav-items";

export async function SiteHeader() {
  return (
    <header
      className={`
        container sticky top-0 z-40 mb-2 flex h-16 w-full justify-between
        border-b bg-background/90 backdrop-blur-sm duration-slow items-center
        animate-in fade-in slide-in-from-top-full
      `}
    >
      <MainMenu items={siteConfig.mainNav} />
      <MobileMenu
        MainMenuItems={siteConfig.mainNav}
        sidebarNavItems={dashboardConfig.sidebarNav}
      />
      <nav className="flex flex-1 items-center justify-end space-x-2">
        <CartDialog />
        <DonateLink />
        {/* <ProductsCombobox
        // TODO: uncomment when @/actions is fixed
        // import { ProductsCombobox } from "~/components/Navigation/ProductsCombobox";
        // tCommandDark={t("components.command.dark")}
        // tCommandLight={t("components.command.light")}
        // tCommandSystem={t("components.command.system")}
        // tCommandTheme={t("components.command.theme")}
        // tPlaceholder={t("components.search.placeholder")}
        // tSearchTitle={t("components.search.title")}
        /> */}
        <ThemeDropdown />
        <div className="flex space-x-2">
          <GithubLink />
          <DiscordLink />
        </div>
        <IntlDropdown />
        <UserButton />
      </nav>
    </header>
  );
}

function ThemeDropdown() {
  if (!siteConfig.themeToggleEnabled) {
    return null;
  }

  return <ThemesGeneralSwitcher />;
}

function IntlDropdown() {
  if (intlProvider !== "disable") {
    return <LocaleSwitcher />;
  }

  return null;
}

function DiscordLink() {
  return (
    <Link
      className={cn(
        buttonVariants({
          size: "icon",
          variant: "outline",
        }),
        `
          hidden

          sm:flex
        `,
      )}
      href="https://discord.gg/TK2SpfXfTB"
      rel="noreferrer noopener"
      target="_blank"
    >
      <DiscordLogoIcon className="size-4" />
    </Link>
  );
}

function GithubLink() {
  return (
    <Link
      className={cn(
        buttonVariants({
          size: "icon",
          variant: "outline",
        }),
      )}
      href="https://github.com/blefnk/relivator-nextjs-template"
      rel="noreferrer noopener"
      target="_blank"
    >
      <GitHubLogoIcon className="size-4" />
    </Link>
  );
}
