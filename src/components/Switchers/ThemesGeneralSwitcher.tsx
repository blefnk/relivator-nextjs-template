"use client";

import type { ButtonProps } from "@/components/ui/button";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { useIsClient } from "@uidotdev/usehooks";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

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
        aria-label="Theme Switcher"
        className="size-9 rounded-lg border"
        disabled
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
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Theme Switcher"
          className="size-9 rounded-lg border"
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
          <Moon aria-hidden="true" className={iconClassName} />
          <span>{t("ThemesGeneralSwitcher.dark")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          <Sun aria-hidden="true" className={iconClassName} />
          <span>{t("ThemesGeneralSwitcher.light")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          <Laptop aria-hidden="true" className={iconClassName} />
          <span>{t("ThemesGeneralSwitcher.system")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
