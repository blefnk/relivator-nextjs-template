"use client";

import type { FC, MouseEvent } from "react";
import { Fragment, useState } from "react";

import Link from "next/link";

import type { Locale } from "~/../reliverse.i18n";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/utils/reliverse/cn";
import { labels, localeFlags, locales } from "~/../reliverse.i18n";
import { useLocale, useTranslations } from "next-intl";

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
          "font-twemoji",
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

const determinateLocaleLabels = (translateLanguages: boolean) => {
  if (translateLanguages) {
    return {
      "de-DE": "Deutsch",
      "en-US": "English",
      "es-ES": "Español",
      "fa-IR": "فارسی",
      "fr-FR": "Français",
      "hi-IN": "हिन्दी",
      "it-IT": "Italiano",
      "pl-PL": "Polski",
      "tr-TR": "Türkçe",
      "uk-UA": "Українська",
      "zh-CN": "中文",
    } as const;
  }

  return labels;
};

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
  const t = useTranslations();
  const localeLabels = determinateLocaleLabels(translateLanguages);

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
      <span className="sr-only">{t("LocaleSwitcher.languages")}</span>
    </div>
  );
};
