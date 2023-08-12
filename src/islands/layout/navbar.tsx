import { Github, Twitter, ActivitySquare } from "lucide-react";
import Link from "next/link";
import { type VariantProps, tv } from "tailwind-variants";

import { getScopedI18n } from "~/utils/server/i18n";

import { CommandMenu } from "../common/command-menu";
import { MainNav } from "../common/main-nav";
import { ThemeToggler } from "../common/theme-toggler";
import { Button } from "../ui/button";

const NavbarStyles = tv({
  base: "w-full border-b border-transparent bg-background/95 backdrop-blur-sm animate-in fade-in slide-in-from-top-full duration-slow",
  variants: {
    border: {
      true: "border-border",
    },
    sticky: {
      true: "sticky top-0 z-40",
    },
  },
});

export type NavbarProps = VariantProps<typeof NavbarStyles>;

export async function Navbar({ border, sticky }: NavbarProps) {
  const t = await getScopedI18n("islands");

  return (
    <header className={NavbarStyles({ border, sticky })}>
      <nav className="container sticky top-0 z-40 flex h-full items-center justify-between">
        <div className="mr-4 hidden items-center md:flex">
          <Link
            className="mr-6 flex items-center gap-2 transition-opacity hover:opacity-80"
            href="/"
          >
            <ActivitySquare className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Bleverse Relivator
            </span>
          </Link>

          <MainNav />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <Button className="h-9 w-9" asChild variant="ghost" size="icon">
            <a
              href="https://github.com/bleverse_com"
              target="_blank"
              rel="noreferrer"
              aria-label={t("navbar.links.github")}
            >
              <Github size={16} />
            </a>
          </Button>
          <Button className="h-9 w-9" asChild variant="ghost" size="icon">
            <a
              href="https://x.com/bleverse_com"
              target="_blank"
              rel="noreferrer"
              aria-label={t("navbar.links.twitter")}
            >
              <Twitter size={16} />
            </a>
          </Button>
          <ThemeToggler />
        </div>
      </nav>
    </header>
  );
}
