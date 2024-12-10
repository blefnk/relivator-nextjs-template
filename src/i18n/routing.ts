import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import { locales } from "./locales";

export const routing = defineRouting({
  defaultLocale: "en",
  locales,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
