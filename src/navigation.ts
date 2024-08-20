import { localePrefix, locales, pathnames } from "~/../reliverse.i18n";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, pathnames, localePrefix });
