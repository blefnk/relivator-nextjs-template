"use client";

import { Link } from "~/navigation";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { Button } from "~/islands/primitives/button";
import PageLayout from "~/islands/wrappers/page-layout";

/** @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found */

export default function NotFoundPage() {
  const t = useTranslations("pages");
  return (
    <PageLayout title={t("not-found.title")}>
      <Balancer
        as="p"
        className="mx-auto mt-4 !block leading-normal text-muted-foreground sm:text-lg sm:leading-7"
      >
        {t("not-found.description")}
      </Balancer>
      <Button className="mx-auto mt-6 w-fit gap-1" asChild>
        <Link href="/">
          <ChevronLeft size={16} />
          <span>{t("not-found.go-home")}</span>
        </Link>
      </Button>
    </PageLayout>
  );
}
