import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { Shell } from "~/components/Wrappers/ShellVariants";

export default function CartLoading() {
  const t = useTranslations();

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">{t("loading.checkout")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Checkout with the cart items
        </PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-x-4 py-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-20" />
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <ScrollArea className="h-full">
            <div className="flex max-h-[280px] flex-col gap-5">
              {Array.from({
                length: 2,
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
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-2 w-16" />
                      </div>
                    </div>
                    <div
                      className={`
                        flex w-full items-center justify-between space-x-1

                        xs:w-auto xs:justify-normal
                      `}
                    >
                      <div className="flex items-center space-x-1">
                        <Skeleton className="size-8" />
                        <Skeleton className="h-8 w-14" />
                        <Skeleton className="size-8" />
                      </div>
                      <Skeleton className="size-8" />
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <Separator className="mb-4" />
        <CardFooter className="justify-between space-x-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </CardFooter>
      </Card>
    </Shell>
  );
}
