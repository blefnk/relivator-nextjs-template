"use client";

import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import { Button } from "~/islands/primitives/button";

/** used as placeholder when env variables are not specified */
export function ButtonPlaceholder({ text }: { text: string }) {
  const t = useTranslations("environments");
  const notify = () => toast.error(t("auth-button-placeholder"));
  return (
    <>
      <Button variant="default" onClick={notify} className="text-sm">
        {text}
      </Button>
    </>
  );
}
