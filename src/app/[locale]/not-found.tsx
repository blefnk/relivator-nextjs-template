import Balancer from "react-wrap-balancer";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import PageLayout from "~/components/Wrappers/PageLayout";

// @see src/app/[locale]/[...rest]/page.tsx
export default function NotFoundPage() {
  const t = useTranslations("pages.not-found");

  return (
    <PageLayout title={t("title")}>
      <Balancer
        as="p"
        className={`
          mx-auto mt-4 !block leading-normal text-muted-foreground

          sm:text-lg sm:leading-7
        `}
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
