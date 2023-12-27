"use client";

import * as React from "react";
import Image from "next/image";
import { cn, formatPrice } from "~/utils";
import { toast } from "react-hot-toast";

import { Link as ButtonLink } from "~/core/link";
import { type Product } from "~/data/db/schema";
import { Icons } from "~/islands/icons";
import { AspectRatio } from "~/islands/primitives/aspect-ratio";
import { Button } from "~/islands/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";
import { Link } from "~/navigation";
import { addToCartAction } from "~/server/actions/cart";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Pick<
    Product,
    "id" | "storeId" | "name" | "price" | "images" | "category" | "inventory"
  >;
  storeId: number | undefined;
  variant?: "default" | "switchable" | "guest";
  isAddedToCart?: boolean;
  tAddToCart: string;
  onSwitch?: () => Promise<void>;
}

export function ProductCard({
  tAddToCart = "Add to cart",
  isAddedToCart = false,
  variant = "default",
  className,
  onSwitch,
  product,
  storeId,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition();

  // console.log("(x) storeId:", storeId, typeof storeId);
  // console.log("(x) product.storeId:", product.storeId, typeof product.storeId);

  return (
    <Card className={cn("h-full overflow-hidden", className)} {...props}>
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {product?.images?.length ?
              <Image
                src={
                  product.images[0]?.url ?? "/images/product-placeholder.webp"
                }
                alt={product.images[0]?.name ?? product.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
                loading="lazy"
              />
            : <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            }
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
            size="default"
            variant="secondary"
            className="h-8 w-full whitespace-nowrap"
            onClick={() => {
              startTransition(async () => {
                try {
                  await addToCartAction({
                    productId: product.id,
                    storeId: Number(product.storeId),
                    quantity: 1,
                  });
                  // console.log("(!) addToCartAction awaited...");
                  // console.log(
                  //   "(!) product.storeId:",
                  //   product.storeId,
                  //   typeof product.storeId,
                  // );
                  toast.success("Added to cart.");
                } catch (error) {
                  error instanceof Error ?
                    toast.error(error.message)
                  : toast.error(
                      "Something went wrong, please try again later.",
                    );
                }
              });
            }}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            {tAddToCart}
          </Button>
        )}
        {variant === "switchable" && (
          <Button
            aria-label={isAddedToCart ? "Remove from cart" : `${tAddToCart}`}
            size="default"
            variant="secondary"
            className="h-8 w-full whitespace-nowrap"
            onClick={() => {
              startTransition(async () => {
                await onSwitch?.();
              });
            }}
            disabled={isPending}
          >
            {isPending ?
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            : isAddedToCart ?
              <Icons.check className="mr-2 h-4 w-4" aria-hidden="true" />
            : <Icons.add className="mr-2 h-4 w-4" aria-hidden="true" />}
            {isAddedToCart ? "Added" : `${tAddToCart}`}
          </Button>
        )}
        {variant === "guest" && (
          <ButtonLink
            href="/sign-in"
            size="default"
            variant="secondary"
            className="h-8 w-full whitespace-nowrap"
          >
            {tAddToCart}
          </ButtonLink>
        )}
      </CardFooter>
    </Card>
  );
}
