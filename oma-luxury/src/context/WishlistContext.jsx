import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import products from '../data/products';

const WishlistContext = createContext();
const storageKey = 'oma-luxury-wishlist';

export function WishlistProvider({ children }) {
  const [itemIds, setItemIds] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(itemIds));
  }, [itemIds]);

  const addItem = (productId) => setItemIds((current) => (current.includes(productId) ? current : [...current, productId]));
  const removeItem = (productId) => setItemIds((current) => current.filter((id) => id !== productId));
  const toggleItem = (productId) => setItemIds((current) => (current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]));
  const isWishlisted = (productId) => itemIds.includes(productId);

  const items = useMemo(() => products.filter((product) => itemIds.includes(product.id)), [itemIds]);

  return (
    <WishlistContext.Provider value={{ itemIds, items, addItem, removeItem, toggleItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
