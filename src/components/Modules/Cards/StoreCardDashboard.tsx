import Link from "next/link";

import type { CuratedStore } from "@/types/reliverse/store";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRandomPatternStyle } from "@/server/reliverse/pattern";
import { cn } from "@/utils/reliverse/cn";
import { PackagePlus } from "lucide-react";

type StoreCardProps = {
  href: string;
  store: CuratedStore;
};

export function StoreCard({ href, store }: StoreCardProps) {
  return (
    <Link aria-label={store.name} href={href}>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div
            className={`
              absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/20
            `}
          />
          <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 text-white",
              store.stripeAccountId ? "bg-green-600" : "bg-red-600",
            )}
          >
            {store.stripeAccountId ? "Active" : "Inactive"}
          </Badge>
          <div
            className="h-full rounded-t-md"
            style={getRandomPatternStyle(String(store.id))}
          />
        </AspectRatio>
        <CardHeader className="flex flex-row items-center justify-between p-6">
          <div className="flex flex-col">
            <CardTitle className="line-clamp-1 text-lg">{store.name}</CardTitle>
            {store.description ? (
              <CardDescription className="line-clamp-2">
                {store.description}
              </CardDescription>
            ) : null}
          </div>
          <Link
            aria-label="Add new product"
            className={cn(
              buttonVariants({
                size: "icon",
                variant: "outline",
              }),
              "ml-auto flex items-center rounded",
            )}
            href={`/dashboard/stores/${store.id}/products/new`}
          >
            <PackagePlus aria-hidden="true" className="size-5" />
          </Link>
        </CardHeader>
      </Card>
    </Link>
  );
}
