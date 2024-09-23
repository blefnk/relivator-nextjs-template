import Link from "next/link";

import { useTranslations } from "next-intl";

import { buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Shell } from "~/components/Wrappers/ShellVariants";
import { cn } from "~/utils/cn";

export default function DashboardPage() {
  const t = useTranslations();

  return (
    <Shell>
      <header>
        <section className="">
          <h1 className="text-xl font-semibold">{t("page.dashboard")}</h1>
          <Separator
            className={`
            mt-2

            md:hidden
          `}
          />
        </section>
        <section
          className={`
          flex gap-2 text-sm

          md:hidden
        `}
        >
          <Link href="/dashboard/stores">{t("page.stores")}</Link>
          <Link href="/dashboard/billing">{t("page.billing")}</Link>
          <Link href="/dashboard/account">{t("page.account")}</Link>
          <Link href="/dashboard/settings">{t("page.settings")}</Link>
          <Link href="/dashboard/purchases">{t("page.purchases")}</Link>
          <Link href="/dashboard/admin">{t("page.admin")}</Link>
        </section>
        <Separator className="my-6" />
      </header>

      <div className="space-x-3">
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/dashboard/stores"
        >
          {t("page.stores")}
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/dashboard/billing"
        >
          {t("page.billing")}
        </Link>
      </div>
    </Shell>
  );
}
