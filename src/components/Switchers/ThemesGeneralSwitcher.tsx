"use client";

import type { ButtonProps } from "@/browser/reliverse/ui/Button";

import { Button } from "@/browser/reliverse/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/browser/reliverse/ui/Dropdown";
import { useIsClient } from "@uidotdev/usehooks";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemesGeneralSwitcherProps = {
  iconClassName?: string;
} & ButtonProps;

export function ThemesGeneralSwitcher({
  iconClassName = "mr-2 h-4 w-4",
  ...props
}: ThemesGeneralSwitcherProps) {
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
        <DropdownMenuItem className="font-medium">Theme</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon aria-hidden="true" className={iconClassName} />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          <Sun aria-hidden="true" className={iconClassName} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          <Laptop aria-hidden="true" className={iconClassName} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
