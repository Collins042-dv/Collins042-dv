import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();
const storageKey = 'oma-luxury-cart';

const buildLineId = (productId, size) => `${productId}-${size || 'default'}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1, selectedSize = '') => {
    const lineId = buildLineId(product.id, selectedSize);
    setItems((current) => {
      const existing = current.find((item) => item.lineId === lineId);
      if (existing) {
        return current.map((item) =>
          item.lineId === lineId ? { ...item, qty: item.qty + qty } : item,
        );
      }

      return [
        ...current,
        {
          ...product,
          productId: product.id,
          lineId,
          qty,
          selectedSize,
        },
      ];
    });
  };

  const removeItem = (lineId) => setItems((current) => current.filter((item) => item.lineId !== lineId));

  const updateQty = (lineId, qty) => {
    if (qty <= 0) {
      removeItem(lineId);
      return;
    }

    setItems((current) => current.map((item) => (item.lineId === lineId ? { ...item, qty } : item)));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
