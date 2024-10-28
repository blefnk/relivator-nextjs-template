"use client";

import type { Locale } from "~/i18n/routing";

import type { FC, MouseEvent } from "react";
import { Fragment, useState } from "react";

import { usePathname, routing } from "~/i18n/routing";

import Link from "next/link";

import { labels, localeFlags } from "~/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

const TRANSLATED = "⚙️ Translated";
const NATIVE = "⚙️ Native";
const LANGUAGE_LABEL = "Language";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [translateLanguages, setTranslateLanguages] = useState(false);

  const filteredLocales = routing.locales.filter(
    (currentLocale) => currentLocale !== locale,
  );

  const toggleTranslation = (event_: MouseEvent) => {
    event_.preventDefault();
    setTranslateLanguages(!translateLanguages);
  };

  // Helper function to strip current locale from pathname
  const getPathWithoutLocale = () => {
    const regex = new RegExp(`^/(${routing.locales.join("|")})`);

    return pathname.replace(regex, ""); // Remove the locale part from the current pathname
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
          currentLocale={locale}
          translateLanguages={translateLanguages}
          hideNamesOnSpecificBreakpoints
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{LANGUAGE_LABEL}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-twemoji flex items-center justify-start">
          <Button
            className="w-full text-left"
            type="button"
            variant="outline"
            onClick={toggleTranslation}
          >
            {translateLanguages ? TRANSLATED : NATIVE}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {filteredLocales.map((currentLocale, index) => (
          <Fragment key={index}>
            <Link
              href={`/${currentLocale}${getPathWithoutLocale()}`} // Correctly prepend the new locale
              locale={currentLocale}
            >
              <DropdownMenuItem
                className={`
          font-twemoji flex cursor-pointer items-center justify-start
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
      "fr-FR": "Français",
      "hi-IN": "हिन्दी",
      "it-IT": "Italiano",
      "ms-MY": "Melayu",
      "pl-PL": "Polski",
      "tr-TR": "Türkçe",
      "uk-UA": "Українська",
      "zh-CN": "中文",
    } as const;
  }

  return labels;
};

interface LocaleNamesProps {
  currentLocale: Locale;
  hideNamesOnSpecificBreakpoints?: boolean;
  translateLanguages: boolean;
}

const LocaleNames: FC<LocaleNamesProps> = ({
  currentLocale,
  hideNamesOnSpecificBreakpoints,
  translateLanguages,
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

            md:flex

            lg:hidden

            2xl:flex
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
