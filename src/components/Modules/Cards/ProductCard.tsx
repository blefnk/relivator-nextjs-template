"use client";

import type { HTMLAttributes } from "react";
import { useTransition } from "react";

import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatPrice } from "@/utils";

import type { Product } from "~/db/schema";

import { Icons } from "~/components/Common/Icons";

type ProductCardProps = {
  product: Pick<
    Product,
    "category" | "id" | "images" | "inventory" | "name" | "price" | "storeId"
  >;
  isAddedToCart?: boolean;
  storeId: string;
  tAddToCart: string;
  variant?: "default" | "guest" | "switchable";
  onSwitch?: () => Promise<void>;
} & HTMLAttributes<HTMLDivElement>;

export function ProductCard({
  className,
  isAddedToCart = false,
  onSwitch,
  product,
  tAddToCart = "Add to cart",
  variant = "default",
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = useTransition();

  // consola.info("(x) storeId:", storeId, typeof storeId);
  // consola.info("(x) product.storeId:", product.storeId, typeof product.storeId);
  return (
    <Card className={cn("h-full overflow-hidden", className)} {...props}>
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {product && product.images && product.images.length > 0 ? (
              <Image
                alt={product.images[0]?.name || product.name}
                className="object-cover"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={
                  product.images[0]?.url || "/images/product-placeholder.webp"
                }
              />
            ) : (
              <div
                aria-label="Placeholder"
                aria-roledescription="placeholder"
                className={`
                  flex size-full items-center justify-center bg-secondary
                `}
                role="img"
              >
                <Icons.placeholder
                  aria-hidden="true"
                  className="size-9 text-muted-foreground"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
      >
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {formatPrice(product.price)}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        {variant === "default" && (
          <Button
            className="h-8 w-full whitespace-nowrap"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {});
            }}
            size="default"
            variant="secondary"
          >
            {isPending && (
              <Icons.spinner
                aria-hidden="true"
                className="mr-2 size-4 animate-spin"
              />
            )}
            {tAddToCart}
          </Button>
        )}
        {variant === "switchable" && (
          <Button
            aria-label={isAddedToCart ? "Remove from cart" : String(tAddToCart)}
            className="h-8 w-full whitespace-nowrap"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                await onSwitch?.();
              });
            }}
            size="default"
            variant="secondary"
          >
            {isPending ? (
              <Icons.spinner
                aria-hidden="true"
                className="mr-2 size-4 animate-spin"
              />
            ) : isAddedToCart ? (
              <Icons.check aria-hidden="true" className="mr-2 size-4" />
            ) : (
              <Icons.add aria-hidden="true" className="mr-2 size-4" />
            )}
            {isAddedToCart ? "Added" : String(tAddToCart)}
          </Button>
        )}
        {variant === "guest" && (
          <Link
            className={cn(
              buttonVariants({
                size: "default",
                variant: "secondary",
              }),
              "h-8 w-full whitespace-nowrap",
            )}
            href="/auth/sign-in"
          >
            {tAddToCart}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
