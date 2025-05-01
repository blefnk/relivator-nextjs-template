"use client";

import * as React from "react";

import type { CartItem } from "~/ui/components/cart";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface CartContextType {
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  clearCart: () => void;
  itemCount: number;
  items: CartItem[];
  removeItem: (id: string) => void;
  subtotal: number;
  updateQuantity: (id: string, quantity: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                                Context                                     */
/* -------------------------------------------------------------------------- */

const CartContext = React.createContext<CartContextType | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*                         Local-storage helpers                              */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = "cart";
const DEBOUNCE_MS = 500;

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed as CartItem[];
    }
  } catch (err) {
    console.error("Failed to load cart:", err);
  }
  return [];
};

/* -------------------------------------------------------------------------- */
/*                               Provider                                     */
/* -------------------------------------------------------------------------- */

export function CartProvider({ children }: React.PropsWithChildren) {
  const [items, setItems] = React.useState<CartItem[]>(loadCartFromStorage);

  /* -------------------- Persist to localStorage (debounced) ------------- */
  const saveTimeout = React.useRef<null | ReturnType<typeof setTimeout>>(null);

  React.useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (err) {
        console.error("Failed to save cart:", err);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [items]);

  /* ----------------------------- Actions -------------------------------- */
  const addItem = React.useCallback(
    (newItem: Omit<CartItem, "quantity">, qty = 1) => {
      if (qty <= 0) return;
      setItems((prev) => {
        const existing = prev.find((i) => i.id === newItem.id);
        if (existing) {
          return prev.map((i) =>
            i.id === newItem.id ? { ...i, quantity: i.quantity + qty } : i,
          );
        }
        return [...prev, { ...newItem, quantity: qty }];
      });
    },
    [],
  );

  const removeItem = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = React.useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return i;
        if (qty <= 0) return []; // treat zero/negative as remove
        if (qty === i.quantity) return i;
        return { ...i, quantity: qty };
      }),
    );
  }, []);

  const clearCart = React.useCallback(() => setItems([]), []);

  /* --------------------------- Derived data ----------------------------- */
  const itemCount = React.useMemo(
    () => items.reduce((t, i) => t + i.quantity, 0),
    [items],
  );

  const subtotal = React.useMemo(
    () => items.reduce((t, i) => t + i.price * i.quantity, 0),
    [items],
  );

  /* ----------------------------- Context value -------------------------- */
  const value = React.useMemo<CartContextType>(
    () => ({
      addItem,
      clearCart,
      itemCount,
      items,
      removeItem,
      subtotal,
      updateQuantity,
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

/* -------------------------------------------------------------------------- */
/*                                 Hook                                      */
/* -------------------------------------------------------------------------- */

export function useCart(): CartContextType {
  const ctx = React.use(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
