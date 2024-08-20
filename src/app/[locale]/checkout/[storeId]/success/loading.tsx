import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";

export default function OrderSuccessLoading() {
  const t = useTranslations();

  return (
    <div
      className={`
        flex size-full max-h-dvh flex-col gap-10 overflow-hidden pb-8 pt-6

        md:py-8
      `}
    >
      <div className="grid gap-10 overflow-auto">
        <PageHeader className="container flex max-w-7xl flex-col">
          <PageHeaderHeading>
            {t("loading.thankYouForTheOrder")}
          </PageHeaderHeading>
          <PageHeaderDescription>
            Store will be in touch with you shortly
          </PageHeaderDescription>
        </PageHeader>
        <section className="flex flex-col space-y-6 overflow-auto">
          <ScrollArea className="h-full">
            <div className="container flex max-w-7xl flex-col gap-5">
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <div className="space-y-3" key={index}>
                  <div
                    className={`
                      flex flex-col items-start justify-between gap-4

                      xs:flex-row
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative size-16 overflow-hidden rounded">
                        <div
                          className={`
                            flex h-full items-center justify-center bg-secondary
                          `}
                        >
                          <ImageIcon
                            aria-hidden="true"
                            className="size-4 text-muted-foreground"
                          />
                        </div>
                      </div>
                      <div
                        className={`
                          flex flex-1 flex-col gap-2 self-start text-sm
                        `}
                      >
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-2.5 w-10" />
                        <Skeleton className="h-2.5 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="container flex max-w-7xl items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </section>
        <section
          aria-labelledby="order-success-actions-heading"
          className={`
            container flex max-w-7xl items-center justify-center space-x-2.5
          `}
          id="order-success-actions"
        >
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-16" />
        </section>
      </div>
    </div>
  );
}
