"use client";

import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import { useIsClient } from "~/hooks/use-is-client";
import { Button, type ButtonProps } from "~/islands/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/islands/primitives/dropdown";
import { labels, locales, usePathname, useRouter } from "~/navigation";

// todo: finish the new version of this file:
// todo: src/islands/switchers/localization-main-beta.tsx

type LocalizationMainSwitcherProps = ButtonProps & {
  iconClassName?: string;
  className?: string;
  tTitle?: string;
};

export default function LocalizationMainSwitcher({
  iconClassName = "mr-2",
  tTitle = "Language",
  className,
  ...props
}: LocalizationMainSwitcherProps) {
  const client = useIsClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  if (!client) {
    return (
      <Button
        disabled
        aria-label="Language Switcher"
        className="rounded-lg border"
        variant="ghost"
        {...props}
      >
        <span className="hidden sm:block">
          <LocaleFlagIcon locale={locale} />
          {labels[locale as keyof typeof labels]}
        </span>
        <span className="-mr-2 block sm:hidden">
          <LocaleFlagIcon locale={locale} />
        </span>
      </Button>
    );
  }

  const handleClick = (locale: string) => {
    router.replace(`${pathname}?${searchParams}`, {
      locale,
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="outline-none">
          <Button variant="outline">
            <span className="hidden md:block">
              <span className="flex">
                <LocaleFlagIcon locale={locale} />
                {labels[locale as keyof typeof labels]}
              </span>
            </span>
            <span className="-mr-2 block md:hidden">
              <LocaleFlagIcon locale={locale} />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-heading">
            {tTitle}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={(val) => handleClick(val)}
          >
            {locales.map((locale: string) => (
              <DropdownMenuRadioItem
                key={locale}
                value={locale}
                className="flex"
              >
                <LocaleFlagIcon locale={locale} />
                {labels[locale as keyof typeof labels]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/** @see https://github.com/blefnk/relivator/pull/3/commits */

interface LocaleFlagIconProps {
  locale: string;
}

function LocaleFlagIcon({ locale }: LocaleFlagIconProps) {
  const baseLocale = locale.split("-")[0];
  if (baseLocale === "en") {
    return <span aria-hidden="true" className="fi fi-gb mr-2" />;
  } else if (baseLocale === "uk") {
    return <span aria-hidden="true" className="fi fi-ua mr-2" />;
  } else if (baseLocale === "pl") {
    return (
      <span
        aria-hidden="true"
        className="fi fi-pl mr-2 border border-b-0 border-zinc-200 dark:border-none"
      />
    );
  } else if (baseLocale === "hi") {
    return <span aria-hidden="true" className="fi fi-in mr-2" />;
  } else if (baseLocale === "fa") {
    return <span aria-hidden="true" className="fi fi-ir mr-2" />;
  }
  return <span aria-hidden="true" className={`fi fi-${baseLocale} mr-2`} />;
}
