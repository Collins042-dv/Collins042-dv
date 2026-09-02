"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import type { CartItem } from "@/types/commerce";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CART_KEY = "oma-luxury-cart";
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(CART_KEY);
    if (raw) {
      setItems(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) =>
          item.product.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor,
      );

      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [...current, { product, quantity, selectedSize, selectedColor }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    setItems((current) =>
      current.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          ),
      ),
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.product.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + (item.product.salePrice ?? item.product.price) * item.quantity, 0),
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [items, isCartOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
