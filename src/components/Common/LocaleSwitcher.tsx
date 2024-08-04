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

const TRANSLATED = "⚙️ Translated";
const NATIVE = "⚙️ Native";
const LANGUAGE_LABEL = "Language";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const [translateLanguages, setTranslateLanguages] = useState(true);

  const filteredLocales = locales.filter(
    (currentLocale) => currentLocale !== locale,
  );

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
          hideNamesOnSpecificBreakpoints
          currentLocale={locale}
          translateLanguages={translateLanguages}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{LANGUAGE_LABEL}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* eslint-disable-next-line readable-tailwind/multiline */}
        <DropdownMenuItem className="flex items-center justify-start font-twemoji">
          <Button
            className="w-full text-left"
            onClick={toggleTranslation}
            type="button"
            variant="outline"
          >
            {translateLanguages ? TRANSLATED : NATIVE}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {filteredLocales.map((currentLocale, index) => (
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
  hideNamesOnSpecificBreakpoints?: boolean;
  translateLanguages: boolean;
};

const LocaleNames: FC<LocaleNamesProps> = ({
  currentLocale,
  translateLanguages,
  hideNamesOnSpecificBreakpoints,
}) => {
  const localeLabels = getLocaleLabels(translateLanguages);

  return (
    <div className="flex items-center space-x-2">
      <span aria-hidden="true">{localeFlags[currentLocale]}</span>
      {hideNamesOnSpecificBreakpoints ? (
        <span
          className={`
            hidden

            2xl:flex

            lg:hidden

            md:flex
          `}
        >
          {localeLabels[currentLocale]}
        </span>
      ) : (
        <span>{localeLabels[currentLocale]}</span>
      )}
      <span className="sr-only">Languages</span>
    </div>
  );
};
