"use client";

import type { ButtonProps } from "~/components/ui/button";

import { useIsClient } from "@uidotdev/usehooks";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";

type ThemesGeneralSwitcherProps = {
  iconClassName?: string;
} & ButtonProps;

export function ThemesGeneralSwitcher({
  iconClassName = "mr-2 h-4 w-4",
  ...props
}: ThemesGeneralSwitcherProps) {
  const t = useTranslations();
  const { setTheme } = useTheme();
  const isMounted = useIsClient();

  if (!isMounted) {
    return (
      <Button
        className="size-9 rounded-lg border"
        aria-label="Theme Switcher"
        size="icon"
        variant="ghost"
        disabled
        {...props}
      >
        <Sun
          className={`
            size-4 rotate-0 scale-100 transition-all

            dark:-rotate-90 dark:scale-0
          `}
        />
        <Moon
          className={`
            absolute size-4 rotate-90 scale-0 transition-transform

            dark:rotate-0 dark:scale-100
          `}
        />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-9 rounded-lg border"
          aria-label="Theme Switcher"
          size="icon"
          variant="ghost"
          {...props}
        >
          <Sun
            className={`
              size-4 rotate-0 scale-100 transition-all

              dark:-rotate-90 dark:scale-0
            `}
          />
          <Moon
            className={`
              absolute size-4 rotate-90 scale-0 transition-transform

              dark:rotate-0 dark:scale-100
            `}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-medium">
          {t("ThemesGeneralSwitcher.theme")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon className={iconClassName} aria-hidden="true" />
          <span>{t("ThemesGeneralSwitcher.dark")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          <Sun className={iconClassName} aria-hidden="true" />
          <span>{t("ThemesGeneralSwitcher.light")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          <Laptop className={iconClassName} aria-hidden="true" />
          <span>{t("ThemesGeneralSwitcher.system")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
