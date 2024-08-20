import type { HTMLAttributes } from "react";

import Image from "next/image";

import type { CartLineItem } from "@/types/reliverse/store";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/reliverse/cn";
import { formatPrice } from "@/utils/reliverse/number";
import { Slot } from "@radix-ui/react-slot";
import { Edit, ImageIcon } from "lucide-react";

// TODO: fix and enable back in v1.3.0-canary.x
// import { UpdateCart } from "~/components/Checkout/UpdateCart";

type CartLineItemsProps = {
  isEditable?: boolean;
  isScrollable?: boolean;
  items: CartLineItem[];
  variant?: "default" | "minimal";
} & HTMLAttributes<HTMLDivElement>;

export function CartLineItems({
  className,
  isEditable = true,
  isScrollable = false,
  items,
  variant = "default",
  ...props
}: CartLineItemsProps) {
  const Wrapper = isScrollable ? ScrollArea : Slot;

  return (
    <Wrapper className="h-full">
      <div
        className={cn(
          "flex w-full flex-col gap-5",
          isScrollable && "pr-6",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <div className="space-y-3" key={item.id}>
            <div
              className={cn(
                "flex items-start justify-between gap-4",
                isEditable
                  ? `
                    flex-col

                    xs:flex-row
                  `
                  : "flex-row",
              )}
            >
              <div className="flex items-center space-x-4">
                {variant === "default" ? (
                  <div
                    className={`
                      relative aspect-square size-16 min-w-fit overflow-hidden
                      rounded
                    `}
                  >
                    {item?.images && item.images.length > 0 ? (
                      <Image
                        alt={item.images[0]?.name || item.name}
                        className="absolute object-cover"
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={
                          item.images[0]?.url ||
                          "/images/product-placeholder.webp"
                        }
                      />
                    ) : (
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
                    )}
                  </div>
                ) : null}
                <div className="flex flex-col space-y-1 self-start">
                  <span className="line-clamp-1 text-sm font-medium">
                    {item.name}
                  </span>
                  {isEditable ? (
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {formatPrice(item.price)} x {item.quantity} ={" "}
                      {formatPrice(
                        (Number(item.price) * Number(item.quantity)).toFixed(2),
                      )}
                    </span>
                  ) : (
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      Qty {item.quantity}
                    </span>
                  )}
                  {variant === "default" ? (
                    <span
                      className={`
                        line-clamp-1 text-xs capitalize text-muted-foreground
                      `}
                    >
                      {`${item.category} ${item.subcategory ? `/ ${item.subcategory}` : ""}`}
                    </span>
                  ) : null}
                </div>
              </div>
              {isEditable ? (
                <>
                  <Edit />
                  {/* <UpdateCart cartLineItem={item} /> */}
                </>
              ) : (
                <div className="flex flex-col space-y-1 font-medium">
                  <span className="ml-auto line-clamp-1 text-sm">
                    {formatPrice(
                      (Number(item.price) * item.quantity).toFixed(2),
                    )}
                  </span>
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    {formatPrice(item.price)} each
                  </span>
                </div>
              )}
            </div>
            {variant === "default" ? <Separator /> : null}
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
