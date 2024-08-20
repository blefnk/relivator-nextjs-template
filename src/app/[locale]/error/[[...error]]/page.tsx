import { Balancer } from "react-wrap-balancer";

import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import { config } from "@reliverse/core";

import { CriticalErrorMessage } from "~/app/[locale]/error/[[...error]]/client";
import PageLayout from "~/components/Wrappers/PageLayout";

export const metadata: Metadata = {
  robots: "noindex,nofollow",
  title: "😢 Something went wrong",
};

export default function CriticalErrorPage() {
  return (
    <PageLayout title="😢 Something went wrong">
      <Balancer
        as="p"
        className={`
          mx-auto mt-4 !block leading-normal text-muted-foreground

          sm:text-lg sm:leading-7
        `}
      >
        We're so sorry, but critical error has occurred on our side. Please try
        again later or contact support if the problem persists.
      </Balancer>
      <Balancer
        as="p"
        className={`
          mx-auto mt-4 !block leading-normal text-muted-foreground

          sm:text-lg sm:leading-7
        `}
      >
        <CriticalErrorMessage />
      </Balancer>
      <div className="flex w-full justify-center">
        <Link
          className={cn(
            buttonVariants({
              size: "default",
              variant: "secondary",
            }),
            "mt-4 w-full max-w-lg",
          )}
          href="/"
        >
          Go to homepage
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <Link
          className={cn(
            buttonVariants({
              size: "default",
              variant: "secondary",
            }),
            "mt-4 w-full max-w-lg",
          )}
          href={config.social.discord}
        >
          {config.framework.name}'s Discord
        </Link>
      </div>
    </PageLayout>
  );
}
