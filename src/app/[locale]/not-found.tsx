import Balancer from "react-wrap-balancer";

import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "~/components/ui/button";
import PageLayout from "~/components/Wrappers/PageLayout";
import { cn } from "~/utils/cn";

// @see src/app/[locale]/[...rest]/page.tsx
export default function NotFoundPage() {
  const t = useTranslations("pages.not-found");

  return (
    <PageLayout title={t("title")}>
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
    </PageLayout>
  );
}
