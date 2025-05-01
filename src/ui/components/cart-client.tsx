"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { cn } from "~/lib/cn";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "~/ui/primitives/drawer";
import { Separator } from "~/ui/primitives/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/primitives/sheet";

export interface CartItem {
  category: string;
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  className?: string;
  mockCart: CartItem[];
}

export function CartClient({ className, mockCart }: CartProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>(mockCart);
  const [isMounted, setIsMounted] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const CartTrigger = (
    <Button
      aria-label="Open cart"
      className="relative h-9 w-9 rounded-full"
      size="icon"
      variant="outline"
    >
      <ShoppingCart className="h-4 w-4" />
      {totalItems > 0 && (
        <Badge
          className={`
            absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-[10px]
          `}
          variant="default"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  );

  const CartContent = (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <div className="text-xl font-semibold">Your Cart</div>
            <div className="text-sm text-muted-foreground">
              {totalItems === 0
                ? "Your cart is empty"
                : `You have ${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
            </div>
          </div>
          {isDesktop && (
            <SheetClose asChild>
              <Button size="icon" variant="ghost">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          <AnimatePresence>
            {cartItems.length === 0 ? (
              <motion.div
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <div
                  className={`
                    mb-4 flex h-20 w-20 items-center justify-center rounded-full
                    bg-muted
                  `}
                >
                  <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Your cart is empty</h3>
                <p className="mb-6 text-center text-sm text-muted-foreground">
                  Looks like you haven't added anything to your cart yet.
                </p>
                {isDesktop ? (
                  <SheetClose asChild>
                    <Link href="/products">
                      <Button>Browse Products</Button>
                    </Link>
                  </SheetClose>
                ) : (
                  <DrawerClose asChild>
                    <Link href="/products">
                      <Button>Browse Products</Button>
                    </Link>
                  </DrawerClose>
                )}
              </motion.div>
            ) : (
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      group relative flex rounded-lg border bg-card p-2
                      shadow-sm transition-colors
                      hover:bg-accent/50
                    `}
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key={item.id}
                    layout
                    transition={{ duration: 0.15 }}
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded">
                      <Image
                        alt={item.name}
                        className="object-cover"
                        fill
                        src={item.image}
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <Link
                            className={`
                              line-clamp-2 text-sm font-medium
                              group-hover:text-primary
                            `}
                            href={`/products/${item.id}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                          <button
                            className={`
                              -mt-1 -mr-1 ml-2 rounded-full p-1
                              text-muted-foreground transition-colors
                              hover:bg-muted hover:text-destructive
                            `}
                            onClick={() => handleRemoveItem(item.id)}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-md border">
                          <button
                            className={`
                              flex h-7 w-7 items-center justify-center
                              rounded-l-md border-r text-muted-foreground
                              transition-colors
                              hover:bg-muted hover:text-foreground
                            `}
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            type="button"
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </button>
                          <span
                            className={`
                              flex h-7 w-7 items-center justify-center text-xs
                              font-medium
                            `}
                          >
                            {item.quantity}
                          </span>
                          <button
                            className={`
                              flex h-7 w-7 items-center justify-center
                              rounded-r-md border-l text-muted-foreground
                              transition-colors
                              hover:bg-muted hover:text-foreground
                            `}
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            type="button"
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </button>
                        </div>
                        <div className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {cartItems.length > 0 && (
          <div className="border-t px-6 py-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Total</span>
                <span className="text-base font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
              <div className="flex items-center justify-between">
                {isDesktop ? (
                  <SheetClose asChild>
                    <Button variant="outline">Continue Shopping</Button>
                  </SheetClose>
                ) : (
                  <DrawerClose asChild>
                    <Button variant="outline">Continue Shopping</Button>
                  </DrawerClose>
                )}
                <Button
                  className="ml-2"
                  onClick={handleClearCart}
                  variant="outline"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (!isMounted) {
    return (
      <div className={cn("relative", className)}>
        <Button
          aria-label="Open cart"
          className="relative h-9 w-9 rounded-full"
          size="icon"
          variant="outline"
        >
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge
              className={`
                absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-[10px]
              `}
              variant="default"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {isDesktop ? (
        <Sheet onOpenChange={setIsOpen} open={isOpen}>
          <SheetTrigger asChild>{CartTrigger}</SheetTrigger>
          <SheetContent className="flex w-[400px] flex-col p-0">
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            {CartContent}
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer onOpenChange={setIsOpen} open={isOpen}>
          <DrawerTrigger asChild>{CartTrigger}</DrawerTrigger>
          <DrawerContent>{CartContent}</DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
