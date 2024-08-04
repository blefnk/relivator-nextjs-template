import Link from "next/link";

import { buttonVariants } from "@/browser/reliverse/ui/Button";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Coffee } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { intlProvider } from "reliverse.config";

import { siteConfig } from "~/app";
import { UserButton } from "~/components/Account/UserButton";
import Combobox from "~/components/Combobox/Combobox";
import { CartDialog } from "~/components/Commerce/Cart";
import { LocaleSwitcher } from "~/components/Common/LocaleSwitcher";
import { MainMenu } from "~/components/Navigation/MainMenu";
import { MobileMenu } from "~/components/Navigation/MobileMenu";
import { ThemesGeneralSwitcher } from "~/components/Switchers/ThemesGeneralSwitcher";
import { dashboardConfig } from "~/constants/nav-items";
import { cn } from "~/utils";

export async function SiteHeader() {
  const t = await getTranslations();

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
        <Combobox
          tCommandDark={t("components.command.dark")}
          tCommandLight={t("components.command.light")}
          tCommandSystem={t("components.command.system")}
          tCommandTheme={t("components.command.theme")}
          tPlaceholder={t("components.search.placeholder")}
          tSearchTitle={t("components.search.title")}
        />
        <ThemeDropdown />
        <div className="flex space-x-2">
          <PatreonLink />
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

function PatreonLink() {
  return (
    <Link
      className={cn(
        buttonVariants({
          size: "icon",
          variant: "outline",
        }),
        `
          hidden

          md:flex
        `,
      )}
      href="https://patreon.com/blefnk"
      rel="noreferrer noopener"
      target="_blank"
    >
      <Coffee className="size-4" />
    </Link>
  );
}
