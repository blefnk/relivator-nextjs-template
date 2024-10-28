"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

import { Shell } from "~/components/shell";

interface Props {
  error: Error;
  reset(): void;
}

export default function Error({ error, reset }: Props) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Shell>
      <div>
        {t.rich("description", {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          retry: (chunks) => (
            <button
              className="underline underline-offset-2"
              type="button"
              onClick={reset}
            >
              {chunks}
            </button>
          ),
        })}
      </div>
    </Shell>
  );
}
