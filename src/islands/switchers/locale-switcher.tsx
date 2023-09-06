"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useChangeLocale, useCurrentLocale } from "~/data/i18n/client";

import "/node_modules/flag-icons/css/flag-icons.min.css";

import { LOCALES } from "~/data/i18n";
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
  iconClassName = "mr-2",
  className,
  ...props
}: LocaleSwitcherProps) {

  const client = useIsClient();
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

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
          <span className={`fi fi-${currentLocale === LOCALES.en ? 'gb' : 'ua'}`}></span>
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
            <span className={`fi fi-${currentLocale === LOCALES.en ? 'gb' : 'ua'}`}></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-heading">Language</DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* TODO: Use icons instead. Flags emoji are doen't play nice with Windows. */}
        <DropdownMenuItem onClick={() => changeLocale(LOCALES.en)}>
          <span aria-hidden="true" className={iconClassName}>
            <span className="fi fi-gb"></span>
          </span>
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale(LOCALES.uk)}>
          <span aria-hidden="true" className={iconClassName}>
            <span className="fi fi-ua"></span>
          </span>
          <span>Ukrainian</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
