import "flag-icons/css/flag-icons.min.css";

import { currentUser } from "@clerk/nextjs";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import LocalizationMainSwitcher from "~/localization-main";
import { Github } from "lucide-react";
import { type Session } from "next-auth";
import { getTranslations } from "next-intl/server";
import { tv, type VariantProps } from "tailwind-variants";

import { settings, siteConfig } from "~/app";
import { Link as ButtonLink } from "~/core/link";
import { env } from "~/env.mjs";
import { CartSheet } from "~/islands/checkout/cart-sheet";
import { Combobox } from "~/islands/navigation/combobox";
import { MainMenu } from "~/islands/navigation/main-menu";
import { MobileMenu } from "~/islands/navigation/mobile-menu";
import { ThemesGeneralSwitcher } from "~/islands/switchers/themes-general-switcher";
import { dashboardConfig } from "~/server/config/dashboard";
import { getCurrentUser } from "~/utils/auth/users";

import { ButtonPlaceholder } from "../placeholders";
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
      true: "duration-slow animate-in fade-in slide-in-from-top-full",
    },
  },
});

export type SiteHeaderProps = {
  session?: Session | null;
} & VariantProps<typeof NavbarStyles>;

export async function SiteHeader({
  border = true,
  sticky = true, // todo: fix browser's console warn if true
}: SiteHeaderProps) {
  let session: any;
  const authProvider = env.NEXT_PUBLIC_AUTH_PROVIDER || "authjs";

  // [1/2] Calling `(use|get)Translations` in Server Component (get in async) ...
  // https://next-intl-docs.vercel.app/docs/environments/server-client-components
  const t = await getTranslations();

  if (authProvider === "clerk") {
    session = await currentUser();
  } else if (authProvider === "authjs") {
    session = await getCurrentUser();
  } else {
    throw new Error("❌ [SiteHeader] NEXT_PUBLIC_AUTH_PROVIDER is invalid");
  }

  return (
    <header className={NavbarStyles({ border, sticky })}>
      <nav className="container flex h-16 items-center justify-between">
        <MainMenu items={siteConfig.mainNav} />

        <MobileMenu
          MainMenuItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />

        <div className="flex flex-1 items-center justify-end space-x-2">
          <CartSheet />

          <Combobox
            tSearchTitle={t("islands.search.title")}
            tPlaceholder={t("islands.search.placeholder")}
            tCmdTheme={t("islands.command.theme")}
            tCmdLight={t("islands.command.light")}
            tCmdDark={t("islands.command.dark")}
            tCmdSystem={t("islands.command.system")}
          />

          {settings.themeToggleEnabled && <ThemesGeneralSwitcher />}

          {/* {env.DEV_DEMO_NOTES === "true" && ( */}
          <div className="hidden sm:block">
            <ButtonLink
              size="icon"
              target="_blank"
              variant="outline"
              href="https://github.com/blefnk/relivator"
            >
              <Github className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              size="icon"
              target="_blank"
              variant="outline"
              href="https://discord.gg/TK2SpfXfTB"
            >
              <DiscordLogoIcon className="h-4 w-4" />
            </ButtonLink>
          </div>
          {/* )} */}

          {env.NEXT_PUBLIC_INTL_PROVIDER !== "disable" && (
            // [2/2] ... Then passing to Client Component
            <LocalizationMainSwitcher
              tTitle={t("LanguageSwitch.choose-language")}
            />
          )}

          {authProvider === "clerk" ?
            env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && env.CLERK_SECRET_KEY ?
              <UserMenu />
            : <ButtonPlaceholder
                text="Sign In"
                auth_provider={authProvider}
                tNextAuthError={t("environments.auth-button-placeholder")}
              />

          : (
            (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) ||
            (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) ||
            (env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET)
          ) ?
            <UserMenu />
          : <ButtonPlaceholder
              text="Sign In"
              auth_provider={authProvider}
              tNextAuthError={t("environments.auth-button-placeholder")}
            />
          }
        </div>
      </nav>
    </header>
  );
}
