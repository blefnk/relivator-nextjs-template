/**
 * @see https://next-intl-docs.vercel.app/docs/environments/error-files
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 */

import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { Button } from "~/islands/primitives/button";
import PageLayout from "~/islands/wrappers/page-layout";
import { Link } from "~/navigation";

export default function NotFoundContent() {
  const t = useTranslations("pages.not-found");
  return (
    <PageLayout title={t("title")}>
      <Balancer
        as="p"
        className="mx-auto mt-4 !block leading-normal text-muted-foreground sm:text-lg sm:leading-7"
      >
        {t("description")}
      </Balancer>
      <Button className="mx-auto mt-6 w-fit gap-1" asChild>
        <Link href="/">
          <ChevronLeft size={16} />
          <span>{t("go-home")}</span>
        </Link>
      </Button>
    </PageLayout>
  );
}
