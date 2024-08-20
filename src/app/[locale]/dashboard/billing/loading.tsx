import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/reliverse/cn";
import { useTranslations } from "next-intl";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export default function BillingLoading() {
  const t = useTranslations();

  return (
    <Shell as="div" variant="sidebar">
      <PageHeader separated>
        <PageHeaderHeading size="sm">{t("loading.billing")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage the billing and subscription
        </PageHeaderDescription>
      </PageHeader>
      <section className="space-y-5">
        <h2
          className={`
            text-xl font-semibold

            sm:text-2xl
          `}
        >
          Billing info
        </h2>
        <Card className="grid gap-4 p-6">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </Card>
      </section>
      <section className="space-y-5 pb-2.5">
        <h2
          className={`
            text-xl font-semibold

            sm:text-2xl
          `}
        >
          Subscription Plans
        </h2>
        <div
          className={`
            grid gap-6

            lg:grid-cols-2

            xl:grid-cols-3
          `}
        >
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <Card
              className={cn(
                "flex flex-col",
                index === 2 &&
                  `
                    lg:col-span-2

                    xl:col-span-1
                  `,
              )}
              key={index}
            >
              <CardHeader>
                <Skeleton className="h-6 w-10" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="grid flex-1 place-items-start gap-6">
                <Skeleton className="h-7 w-16" />
                <div className="w-full space-y-2">
                  {Array.from({
                    length: 2,
                  }).map((_, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <Skeleton className="size-4" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Skeleton className="h-6 w-1/2" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </Shell>
  );
}
