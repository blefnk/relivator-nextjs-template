"use client";

import type { ChangeEvent } from "react";
import { useTransition } from "react";

import type { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";

import { useLocale } from "next-intl";

const LocaleSwitcher: NextPage = () => {
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
      <p className="sr-only">change language</p>
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
        <option value="en">English</option>
        <option value="uk">Ukrainian</option>
        <option value="de">Germany</option>
        <option value="es">Spanish</option>
      </select>
    </label>
  );
};

export default LocaleSwitcher;
