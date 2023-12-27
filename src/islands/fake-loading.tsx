import { Skeleton } from "~/islands/primitives/skeleton";
import { Shell } from "~/islands/wrappers/shell-variants";

import { Icons } from "./icons";
import { AspectRatio } from "./primitives/aspect-ratio";
import { Card, CardContent, CardFooter, CardHeader } from "./primitives/card";
import { Separator } from "./primitives/separator";

export function FakeLoadingVariantOne() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-xs rounded-lg p-4 shadow-lg">
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function FakeLoadingVariantOneSpecial() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-xs rounded-lg p-4 shadow-lg">
        <div className="flex flex-col space-y-4">
          <div className="relative flex h-8 w-full">
            <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20 opacity-75" />
            <div className="relative inline-flex h-8 w-full rounded-lg bg-primary/10" />
          </div>
          <div className="relative flex h-8 w-full">
            <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20 opacity-75" />
            <div className="relative inline-flex h-8 w-full rounded-lg bg-primary/10" />
          </div>
          <div className="relative flex h-4 w-3/4">
            <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20 opacity-75" />
            <div className="relative inline-flex h-4 w-3/4 rounded-lg bg-primary/10" />
          </div>
          <div className="relative flex h-4 w-1/2">
            <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20 opacity-75" />
            <div className="relative inline-flex h-4 w-1/2 rounded-lg bg-primary/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FakeLoadingVariantTwo() {
  return (
    <Shell>
      <div className="flex h-full max-h-[100dvh] w-full flex-col gap-10 overflow-hidden pb-8 pt-6 md:py-8">
        <div className="grid gap-10 overflow-auto">
          x
          <section className="flex flex-col space-y-6 overflow-auto">
            <div className="container flex max-w-7xl flex-col gap-5">
              <div className="space-y-3">
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
                      <Skeleton className="h-2.5 w-10" />
                      <Skeleton className="h-2.5 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
                <Separator />
              </div>
            </div>
            <div className="container flex max-w-7xl items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </section>
          <section
            id="order-success-actions"
            aria-labelledby="order-success-actions-heading"
            className="container flex max-w-7xl items-center justify-center space-x-2.5"
          >
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </section>
        </div>
      </div>
    </Shell>
  );
}

export function FakeLoadingVariantThree() {
  return (
    <Shell>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-6 w-14" />
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col gap-2">
            <div
              aria-label="Placeholder"
              role="img"
              aria-roledescription="placeholder"
              className="flex aspect-square h-full flex-1 items-center justify-center bg-secondary"
            >
              <Icons.placeholder
                className="h-9 w-9 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <div className="flex w-full items-center justify-center gap-2">
              <Skeleton className="h-7 w-7 rounded-none" />
              <Skeleton className="aspect-square h-full w-full max-w-[100px] rounded-none" />
              <Skeleton className="h-7 w-7 rounded-none" />
            </div>
          </div>
        </div>
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-14" />
          </div>
          <Separator className="my-1.5" />
          <div className="grid gap-4 sm:max-w-[240px]">
            <div className="grid space-y-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-9 w-full" />
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
          <Separator className="mb-2.5 mt-5" />
          <div className="flex items-center">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="ml-auto h-4 w-4" />
          </div>
          <Separator className="mt-2.5" />
        </div>
      </div>
      <div className="overflow-hidden md:pt-6">
        <Skeleton className="h-9 w-14" />
        <div className="overflow-x-auto pb-2 pt-6">
          <div className="flex gap-4">
            <Card className="min-w-[260px] rounded-sm">
              <CardHeader className="border-b p-0">
                <AspectRatio ratio={4 / 3}>
                  <div className="flex h-full items-center justify-center bg-secondary">
                    <Icons.placeholder
                      className="h-9 w-9 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                </AspectRatio>
              </CardHeader>
              <CardContent className="grid gap-2.5 p-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
                  <Skeleton className="h-8 w-full rounded-sm" />
                  <Skeleton className="h-8 w-full rounded-sm" />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function FakeLoadingVariantFour() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-6xl rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col items-baseline justify-between space-y-1.5 border-b p-6 px-4">
          <Skeleton className="h-6 rounded" />
          <Skeleton className="mx-auto h-6 w-3/4 rounded" />
        </div>
        <div className="container flex flex-col items-center p-6 pt-0 lg:p-8">
          <div className="flex w-full flex-col justify-center space-y-6">
            <div className="mx-auto mb-4 flex flex-col content-center gap-8">
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          </div>
          <div className="space-y-8">
            <Skeleton className="mx-auto h-4 w-5/6 rounded" />
          </div>
          <div className="flex flex-1 flex-col items-center gap-4 space-y-2" />
        </div>
        <div className="flex items-baseline justify-center space-x-1 border-t p-6 pl-8 pt-0 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-full rounded" />
        </div>
      </div>
    </div>
  );
}
