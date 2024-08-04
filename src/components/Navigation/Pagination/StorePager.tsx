"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/browser/reliverse/ui/Button";
import {
  getNextStoreIdAction,
  getPreviousStoreIdAction,
} from "@/server/reliverse/actions/store";
import consola from "consola";

import { Icons } from "~/components/Common/Icons";

type StorePagerProps = {
  storeId: string;
  userId: string;
};

export function StorePager({ storeId, userId }: StorePagerProps) {
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
        onClick={handlePreviousStoreClick}
        size="icon"
        variant="ghost"
      >
        <Icons.chevronLeft aria-hidden="true" className="size-4" />
        <span className="sr-only">Previous store</span>
      </Button>
      <Button
        disabled={isPending}
        onClick={handleNextStoreClick}
        size="icon"
        variant="ghost"
      >
        <Icons.chevronRight aria-hidden="true" className="size-4" />
        <span className="sr-only">Next store</span>
      </Button>
    </div>
  );
}
