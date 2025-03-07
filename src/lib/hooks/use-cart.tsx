"use client";

import * as React from "react";

import type { CartItem } from "~/ui/components/cart";

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = React.createContext<CartContextType | undefined>(undefined);

// Function to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart) as CartItem[];
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
  }
  return [];
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initializer to load cart from localStorage
  const [items, setItems] = React.useState<CartItem[]>(loadCartFromStorage);

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [items]);

  const addItem = React.useCallback((newItem: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If it exists, increase the quantity
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Otherwise, add the new item with quantity 1
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = React.useCallback((id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }, []);

  const clearCart = React.useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = React.useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = React.useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const value = React.useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    ],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = React.use(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
