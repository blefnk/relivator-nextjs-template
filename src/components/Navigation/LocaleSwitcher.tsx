"use client";

import type { ChangeEvent } from "react";
import { useTransition } from "react";

import type { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";

const LocaleSwitcher: NextPage = () => {
  const t = useTranslations();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeValue = useLocale();

  const path = usePathname();

  const pathName = path.split("/").pop();

  const handleChange = (event_: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event_.target.value;

    startTransition(() => {
      if (
        pathName === "en" ||
        pathName === "uk" ||
        pathName === "de" ||
        pathName === "es"
      ) {
        router.replace(`/${nextLocale}`);
      } else {
        router.replace(`/${nextLocale}/${pathName}`);
        router.refresh();
      }
    });
  };

  return (
    <label>
      <p className="sr-only">{t("LocaleSwitcher.changeLanguage")}</p>
      <select
        className={`
          block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5
          text-sm text-gray-900

          focus:border-blue-500 focus:ring-blue-500
        `}
        defaultValue={localeValue}
        disabled={isPending}
        onChange={handleChange}
      >
        <option value="en">{t("LocaleSwitcher.english")}</option>
        <option value="uk">{t("LocaleSwitcher.ukrainian")}</option>
        <option value="de">{t("LocaleSwitcher.germany")}</option>
        <option value="es">{t("LocaleSwitcher.spanish")}</option>
      </select>
    </label>
  );
};

export default LocaleSwitcher;
