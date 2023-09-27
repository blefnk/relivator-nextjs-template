"use client";

import { useTranslations } from "next-intl";

import { env } from "~/data/env/env.mjs";

/**
 * todo: implement environment variables indicator here
 */

export function VariableIndicator() {
  const t = useTranslations("EnvironmentVariables");

  if (env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div>{t("errors.something-wrong")}</div>
    </div>
  );
}
