import { cn } from "~/lib/cn";

import { CartClient } from "./cart-client";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartProps {
  className?: string;
}

const mockCart: CartItem[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Audio",
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 299.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Wearables",
  },
];

export function Cart({ className }: CartProps) {
  return (
    <div className={cn("relative", className)}>
      {/* // TODO: Fetch cart from e.g. LocalStorage and/or database */}
      <CartClient className={cn("", className)} mockCart={mockCart} />
    </div>
  );
}
