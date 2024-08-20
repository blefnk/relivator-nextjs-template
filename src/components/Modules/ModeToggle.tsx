"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { useIsClient } from "@uidotdev/usehooks";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { siteConfig } from "~/app";

export function ModeToggle() {
  const t = useTranslations();

  const isMounted = useIsClient();
  const { setTheme } = useTheme();

  if (!siteConfig.themeToggleEnabled) {
    return null;
  }

  if (!isMounted) {
    return (
      <Button size="icon" variant="outline">
        <Sun
          className={`
            size-[1.2rem] rotate-0 scale-100 transition-all

            dark:-rotate-90 dark:scale-0
          `}
        />
        <Moon
          className={`
            absolute size-[1.2rem] rotate-90 scale-0 transition-all

            dark:rotate-0 dark:scale-100
          `}
        />
        <span className="sr-only">{t("ModeToggle.toggleTheme")}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <Sun
            className={`
              size-[1.2rem] rotate-0 scale-100 transition-all

              dark:-rotate-90 dark:scale-0
            `}
          />
          <Moon
            className={`
              absolute size-[1.2rem] rotate-90 scale-0 transition-all

              dark:rotate-0 dark:scale-100
            `}
          />
          <span className="sr-only">{t("ModeToggle.toggleTheme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
