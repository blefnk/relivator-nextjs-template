import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export default function PurchasesLoading() {
  const t = useTranslations();

  return (
    <Shell variant="sidebar">
      <PageHeader
        aria-labelledby="dashboard-purchases-header-heading"
        id="dashboard-purchases-header"
      >
        <PageHeaderHeading size="sm">
          {t("loading.purchases")}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage the purchases
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-10 rounded-lg border p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-8 w-40" />
      </div>
    </Shell>
  );
}
