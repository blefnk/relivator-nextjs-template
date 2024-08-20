"use client";

import { useSearchParams } from "next/navigation";

import { useTranslations } from "next-intl";

// @see https://nextjs.org/docs/app/api-ref/functions/use-search-params
export function CriticalErrorMessage() {
  const t = useTranslations();

  // TODO: What approach is better for this function? 🤔
  const searchParameters = useSearchParams();

  // const [message] = useQueryState("message");
  const message = searchParameters && searchParameters.get("message");
  const techMessage = searchParameters && searchParameters.get("techMessage");

  if (message === "user-not-found") {
    // URL -> `/error?message=user-not-found`
    // `message` -> 'user-not-found'
    return <code>{t("client.userNotFound")}</code>;
  }

  return (
    <code className="px-20">
      {message && <>{message}</>}
      {techMessage && <>{techMessage}</>}
      {!message && !techMessage && <>Unknown error</>}
    </code>
  );
}
