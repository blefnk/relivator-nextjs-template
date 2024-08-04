import Link from "next/link";

import { AspectRatio } from "@/browser/reliverse/ui/Aspect-Ratio";
import { Badge } from "@/browser/reliverse/ui/Badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/browser/reliverse/ui/CardUI";
import { getRandomPatternStyle } from "@/server/reliverse/pattern";

import type { CuratedStore } from "~/types";

import { cn } from "~/utils";

type StoreCardProps = {
  href: string;
  store: CuratedStore;
};

export function StoreCardDefault({ href, store }: StoreCardProps) {
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
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{store.name}</CardTitle>
          {store.description ? (
            <CardDescription className="line-clamp-2">
              {store.description}
            </CardDescription>
          ) : null}
        </CardHeader>
      </Card>
    </Link>
  );
}
