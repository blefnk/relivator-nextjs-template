// !! new beta version of localization-main.tsx - currently not used !!

"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

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

import {
  defaultLocale,
  locales,
  usePathname,
  useRouter,
} from "./navigation-new-beta";

type LocalizationMainSwitcherProps = ButtonProps & {
  iconClassName?: string;
  className?: string;
};

export default function LocalizationMainSwitcher({
  iconClassName = "mr-2",
  className,
  ...props
}: LocalizationMainSwitcherProps) {
  const t = useTranslations("LanguageSwitch");
  const client = useIsClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  // Find the current app locale object or default to the first one
  const currentAppLocale =
    locales.find((locale) => locale.code === currentLocale) ||
    locales.find((locale) => locale.code === defaultLocale);

  // In case locales array is empty
  if (!currentAppLocale) {
    console.error("currentAppLocale is undefined");
    return null;
  }

  if (!client) {
    return (
      <Button
        disabled
        aria-label="Language Switcher"
        className="rounded-lg border"
        variant="ghost"
        {...props}
      >
        <span className={`hidden sm:block ${iconClassName}`}>
          <LocaleFlagIcon flag={currentAppLocale.flag} />
          {currentAppLocale.label}
        </span>
        <span className={`block sm:hidden ${iconClassName}`}>
          <LocaleFlagIcon flag={currentAppLocale.flag} />
        </span>
      </Button>
    );
  }

  const handleClick = (localeCode: string) => {
    router.replace(`${pathname}?${searchParams}`, {
      locale: localeCode,
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="outline-none">
          <Button variant="outline">
            <span className={`hidden md:block ${iconClassName}`}>
              <LocaleFlagIcon flag={currentAppLocale.flag} />
              {currentAppLocale.label}
            </span>
            <span className={`block md:hidden ${iconClassName}`}>
              <LocaleFlagIcon flag={currentAppLocale.flag} />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-heading">
            {t("choose-language")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={currentLocale}
            onValueChange={handleClick}
          >
            {locales.map((locale) => (
              <DropdownMenuRadioItem
                key={locale.code}
                value={locale.code}
                className="flex"
              >
                <LocaleFlagIcon flag={locale.flag} />
                {locale.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function LocaleFlagIcon({ flag }: { flag: string }) {
  // biome-ignore lint/style/useSelfClosingElements: <explanation>
  return <span aria-hidden="true" className={`mr-2 ${flag}`}></span>;
}
