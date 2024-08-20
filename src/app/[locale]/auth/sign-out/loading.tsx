import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export default function SignOutLoading() {
  const t = useTranslations();

  return (
    <Shell className="max-w-xs">
      <PageHeader className="text-center">
        <PageHeaderHeading size="sm">{t("loading.signOut")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex w-full items-center space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </Shell>
  );
}
