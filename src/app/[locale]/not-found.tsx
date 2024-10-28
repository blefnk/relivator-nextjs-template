import Balancer from "react-wrap-balancer";

import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "~/components/ui/button";
import { Shell } from "~/components/shell";
import { cn } from "~/lib/utils";

// @see src/app/[locale]/[...rest]/page.tsx
export default function NotFoundPage() {
  const t = useTranslations("pages.not-found");

  return (
    <Shell>
      <Balancer
        className={`
          mx-auto mt-4 !block leading-normal text-muted-foreground

          sm:text-lg sm:leading-7
        `}
        as="p"
      >
        {t("description")}
      </Balancer>
      <Link
        className={cn(
          buttonVariants({
            size: "default",
            variant: "secondary",
          }),
          "mx-auto mt-6 flex items-center gap-1",
        )}
        href="/"
      >
        <ChevronLeft size={16} />
        <span>{t("go-home")}</span>
      </Link>
    </Shell>
  );
}
