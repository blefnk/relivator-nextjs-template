"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useIsClient } from "~/hooks/use-is-client";
import { Button, type ButtonProps } from "~/islands/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/islands/primitives/dropdown-menu";

export type LocaleSwitcherProps = ButtonProps & {
  iconClassName?: string;
};

export function LocaleSwitcher({
  iconClassName = "mr-2 h-4 w-4",
  className,
  ...props
}: LocaleSwitcherProps) {
  const { setTheme } = useTheme();
  const client = useIsClient();

  if (!client)
    return (
      <Button
        disabled
        aria-label="Language Switcher"
        className="h-9 w-9 border rounded-md"
        variant="ghost"
        size="icon"
        {...props}
      >
        <span className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
          🇬🇧
        </span>
        <span className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100">
          🇺🇦
        </span>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Language Switcher"
          className="h-9 w-9 border rounded-md"
          variant="ghost"
          size="icon"
          {...props}
        >
          <span className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
            🇬🇧
          </span>
          <span className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100">
            🇺🇦
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-heading">Language</DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* TODO: Use icons instead. Flags emoji are doen't play nice with Windows. */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <span aria-hidden="true" className={iconClassName}>
            🇬🇧
          </span>
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <span aria-hidden="true" className={iconClassName}>
            🇺🇦
          </span>
          <span>Ukrainian</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
