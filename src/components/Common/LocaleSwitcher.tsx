"use client";

import type { FC, MouseEvent } from "react";
import { Fragment, useState } from "react";

import Link from "next/link";

import { Button, buttonVariants } from "@/browser/reliverse/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/browser/reliverse/ui/Dropdown";
import { useLocale } from "next-intl";

import type { Locale } from "~/constants/navigation";

import { getLocaleLabels, localeFlags, locales } from "~/constants/navigation";
import { cn } from "~/utils";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const [translateLanguages, setTranslateLanguages] = useState(true);

  const filteredLocales =
    locales && locales.filter((currentLocale) => currentLocale !== locale);

  const toggleTranslation = (event_: MouseEvent) => {
    event_.preventDefault();
    setTranslateLanguages(!translateLanguages);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            size: "sm",
            variant: "outline",
          }),
          "p-3 font-twemoji",
        )}
      >
        <LocaleNames
          currentLocale={locale}
          translateLanguages={translateLanguages}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`
          flex items-center justify-start font-twemoji
        `}
        >
          <Button
            className="w-full text-left"
            onClick={toggleTranslation}
            type="button"
            variant="outline"
          >
            {translateLanguages ? "⚙️ Translated" : "⚙️ Native"}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {filteredLocales &&
          filteredLocales.map((currentLocale, index) => (
            <Fragment key={index}>
              <Link href={currentLocale} locale={currentLocale}>
                <DropdownMenuItem
                  className={`
                    flex cursor-pointer items-center justify-start font-twemoji
                  `}
                >
                  <LocaleNames
                    currentLocale={currentLocale}
                    translateLanguages={translateLanguages}
                  />
                </DropdownMenuItem>
              </Link>
            </Fragment>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type LocaleNamesProps = {
  currentLocale: Locale;
  translateLanguages: boolean;
};

const LocaleNames: FC<LocaleNamesProps> = ({
  currentLocale,
  translateLanguages,
}) => {
  const localeLabels = getLocaleLabels(translateLanguages);

  return (
    <div className="flex items-center space-x-2">
      <span aria-hidden="true">{localeFlags[currentLocale]}</span>
      <span>{localeLabels[currentLocale]}</span>
      <span className="sr-only">Languages</span>
    </div>
  );
};
