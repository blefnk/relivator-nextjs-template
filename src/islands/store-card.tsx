import Link from "next/link";

import { AspectRatio } from "~/islands/primitives/aspect-ratio";
import { Badge } from "~/islands/primitives/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/islands/primitives/card";
import { cn } from "~/utils/server/fmt";
import { getRandomPatternStyle } from "~/utils/server/pattern";
import { type CuratedStore } from "~/utils/types/store-main";

interface StoreCardProps {
  store: CuratedStore;
  href: string;
}

export function StoreCard({ store, href }: StoreCardProps) {
  return (
    <Link aria-label={store.name} href={href}>
      <Card className="h-full">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/20" />
          <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 text-foreground",
              store.stripeAccountId ? "bg-green-600" : "bg-red-600"
            )}
          >
            {store.stripeAccountId ? "Connected" : "Disconnected"}
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
