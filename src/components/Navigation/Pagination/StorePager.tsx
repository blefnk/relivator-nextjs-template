"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import consola from "consola";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import {
  getNextStoreIdAction,
  getPreviousStoreIdAction,
} from "~/server/actions/deprecated/store";

type StorePagerProps = {
  storeId: string;
  userId: string;
};

export function StorePager({ storeId, userId }: StorePagerProps) {
  const t = useTranslations();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePreviousStoreClick = () => {
    startTransition(async () => {
      try {
        const previousStoreId = await getPreviousStoreIdAction({
          id: Number(storeId),
          userId,
        });

        router.push(`/dashboard/stores/${previousStoreId}`);
      } catch (error) {
        error instanceof Error
          ? consola.error(error)
          : consola.error("Something went wrong, please try again.");
      }
    });
  };

  const handleNextStoreClick = () => {
    startTransition(async () => {
      try {
        const nextStoreId = await getNextStoreIdAction({
          id: Number(storeId),
          userId,
        });

        router.push(`/dashboard/stores/${nextStoreId}`);
      } catch (error) {
        error instanceof Error
          ? consola.error(error)
          : consola.error("Something went wrong, please try again.");
      }
    });
  };

  return (
    <div className="flex space-x-0.5 pr-1">
      <Button
        disabled={isPending}
        size="icon"
        variant="ghost"
        onClick={handlePreviousStoreClick}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        <span className="sr-only">{t("StorePager.previousStore")}</span>
      </Button>
      <Button
        disabled={isPending}
        size="icon"
        variant="ghost"
        onClick={handleNextStoreClick}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
        <span className="sr-only">{t("StorePager.nextStore")}</span>
      </Button>
    </div>
  );
}
