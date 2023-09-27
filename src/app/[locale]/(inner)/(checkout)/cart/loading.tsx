import { Icons } from "~/islands/icons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/islands/primitives/card";
import { ScrollArea } from "~/islands/primitives/scroll-area";
import { Separator } from "~/islands/primitives/separator";
import { Skeleton } from "~/islands/primitives/skeleton";
import { Shell } from "~/islands/wrappers/shell-variants";

export default function CartLoading() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Checkout</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Checkout with your cart items
        </PageHeaderDescription>
      </PageHeader>
      <Card as="section">
        <CardHeader className="flex flex-row items-center justify-between space-x-4 py-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-20" />
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <ScrollArea className="h-full">
            <div className="flex max-h-[280px] flex-col gap-5">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="space-y-3">
                  <div className="flex flex-col items-start justify-between gap-4 xs:flex-row">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded">
                        <div className="flex h-full items-center justify-center bg-secondary">
                          <Icons.placeholder
                            className="h-4 w-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 self-start text-sm">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-2 w-16" />
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between space-x-1 xs:w-auto xs:justify-normal">
                      <div className="flex items-center space-x-1">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-14" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                      <Skeleton className="h-8 w-8" />
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
