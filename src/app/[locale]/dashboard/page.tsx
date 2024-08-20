import Link from "next/link";

import Onboarding from "@/cluster/components/Onboarding";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

import { Shell } from "~/components/Wrappers/ShellVariants";

export default function DashboardPage() {
  const t = useTranslations();

  return (
    <Shell>
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

      {/* {env.NODE_ENV === "development" && <Onboarding />} */}
      <Onboarding />
    </Shell>
  );
}
