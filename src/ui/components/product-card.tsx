"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import Image from "next/image";
import { cn } from "~/lib/utils";
import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardFooter } from "~/ui/primitives/card";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating?: number;
    inStock?: boolean;
  };
  variant?: "default" | "compact";
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onError">;

export function ProductCard({
  product,
  variant = "default",
  onAddToCart,
  onAddToWishlist,
  className,
  ...props
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const [isInWishlist, setIsInWishlist] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart) {
      setIsAddingToCart(true);
      // Simulate API call
      setTimeout(() => {
        onAddToCart(product.id);
        setIsAddingToCart(false);
      }, 600);
    }
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToWishlist) {
      setIsInWishlist(!isInWishlist);
      onAddToWishlist(product.id);
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const renderStars = () => {
    const rating = product.rating ?? 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={`star-${product.id}-position-${i + 1}`}
            className={cn(
              "h-4 w-4",
              i < fullStars
                ? "text-yellow-400 fill-yellow-400"
                : i === fullStars && hasHalfStar
                  ? "text-yellow-400 fill-yellow-400/50"
                  : "text-muted stroke-muted/40",
            )}
          />
        ))}
        {rating > 0 && (
          <span className="ml-1 text-xs text-muted-foreground">
            {rating.toFixed(1)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={cn("group", className)} {...props}>
      <Link href={`/products/${product.id}`}>
        <Card
          className={cn(
            "relative h-full overflow-hidden rounded-lg transition-all duration-200 ease-in-out hover:shadow-md",
            isHovered && "ring-1 ring-primary/20",
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-300 ease-in-out",
                  isHovered && "scale-105",
                )}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}

            {/* Category badge */}
            <Badge
              variant="outline"
              className="absolute left-2 top-2 bg-background/80 backdrop-blur-sm"
            >
              {product.category}
            </Badge>

            {/* Discount badge */}
            {discount > 0 && (
              <Badge className="absolute right-2 top-2 bg-destructive text-destructive-foreground">
                {discount}% OFF
              </Badge>
            )}

            {/* Wishlist button */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={cn(
                "absolute right-2 bottom-2 z-10 rounded-full bg-background/80 backdrop-blur-sm transition-opacity duration-300",
                !isHovered && !isInWishlist && "opacity-0",
              )}
              onClick={handleAddToWishlist}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isInWishlist
                    ? "fill-destructive text-destructive"
                    : "text-muted-foreground",
                )}
              />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>

          <CardContent className="p-4 pt-4">
            {/* Product name with line clamp */}
            <h3 className="line-clamp-2 text-base font-medium transition-colors group-hover:text-primary">
              {product.name}
            </h3>

            {variant === "default" && (
              <>
                <div className="mt-1.5">{renderStars()}</div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="font-medium text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice ? (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  ) : null}
                </div>
              </>
            )}
          </CardContent>

          {variant === "default" && (
            <CardFooter className="p-4 pt-0">
              <Button
                className={cn(
                  "w-full gap-2 transition-all",
                  isAddingToCart && "opacity-70",
                )}
                disabled={isAddingToCart}
                onClick={handleAddToCart}
              >
                {isAddingToCart ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
                Add to Cart
              </Button>
            </CardFooter>
          )}

          {variant === "compact" && (
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice ? (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  ) : null}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  disabled={isAddingToCart}
                  onClick={handleAddToCart}
                >
                  {isAddingToCart ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <ShoppingCart className="h-4 w-4" />
                  )}
                  <span className="sr-only">Add to cart</span>
                </Button>
              </div>
            </CardFooter>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <Badge variant="destructive" className="text-sm px-3 py-1">
                Out of Stock
              </Badge>
            </div>
          )}
        </Card>
      </Link>
    </div>
  );
}
