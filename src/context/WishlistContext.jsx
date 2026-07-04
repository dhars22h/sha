import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage';
import { useCart } from './CartContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => loadFromStorage(STORAGE_KEYS.WISHLIST, []));
  const { addToCart } = useCart();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WISHLIST, items);
  }, [items]);

  const isInWishlist = useCallback(
    (productId) => items.some((item) => item.id === productId),
    [items]
  );

  const addToWishlist = useCallback((product) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const moveToCart = useCallback(
    (productId, quantity = 1) => {
      const product = items.find((item) => item.id === productId);
      if (!product) return;
      addToCart(product, quantity);
      setItems((prev) => prev.filter((item) => item.id !== productId));
    },
    [items, addToCart]
  );

  const clearWishlist = useCallback(() => setItems([]), []);

  const wishlistCount = useMemo(() => items.length, [items]);

  const value = {
    items,
    wishlistCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    moveToCart,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
