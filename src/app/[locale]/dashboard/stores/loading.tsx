import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export default function StoresLoading() {
  return (
    <Shell variant="sidebar">
      <PageHeader
        aria-labelledby="dashboard-stores-page-header-heading"
        id="dashboard-stores-page-header"
      >
        <div className="flex space-x-4">
          <PageHeaderHeading className="flex-1" size="sm">
            Stores
          </PageHeaderHeading>
          <Skeleton className="h-8 w-24" />
        </div>
        <PageHeaderDescription size="sm">
          Manage the stores
        </PageHeaderDescription>
      </PageHeader>
      <Card
        aria-labelledby="dashboard-stores-page-alert-heading"
        className="flex space-x-4 px-4 py-3"
        id="dashboard-stores-page-alert"
      >
        <Skeleton className="mt-2 size-4 rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-4 w-full" />
          <Skeleton
            className={`
              block h-4 w-full

              md:hidden
            `}
          />
        </div>
      </Card>
      <section
        aria-labelledby="dashboard-stores-page-stores-heading"
        className={`
          grid gap-4

          lg:grid-cols-3

          sm:grid-cols-2
        `}
        id="dashboard-stores-page-stores"
      >
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <Card className="h-full" key={index}>
            <AspectRatio ratio={21 / 9}>
              <Skeleton className="absolute right-2 top-2 h-5 w-20" />
              <Skeleton className="size-full" />
            </AspectRatio>
            <CardHeader className="space-y-2.5">
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
            </CardHeader>
          </Card>
        ))}
      </section>
    </Shell>
  );
}
