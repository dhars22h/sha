import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage';

const CartContext = createContext(null);
const SHIPPING_THRESHOLD = 1999;
const SHIPPING_FEE = 99;
const DISCOUNT_RATE = 0.1;

function getPrice(product) {
  return Number(product.salePrice ?? product.price ?? 0);
}

function normalizeQuantity(quantity) {
  const parsed = Number(quantity);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadFromStorage(STORAGE_KEYS.CART, []));

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, items);
  }, [items]);

  const addToCart = useCallback((product, quantity = 1) => {
    const safeQuantity = normalizeQuantity(quantity);
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, ...product, quantity: item.quantity + safeQuantity } : item
        );
      }
      return [...prev, { ...product, quantity: safeQuantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const safeQuantity = normalizeQuantity(quantity);
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: safeQuantity } : item))
    );
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + getPrice(item) * item.quantity, 0),
    [items]
  );

  const discount = useMemo(
    () => (subtotal >= 3000 ? Math.round(subtotal * DISCOUNT_RATE) : 0),
    [subtotal]
  );

  const shipping = useMemo(
    () => (items.length === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE),
    [items.length, subtotal]
  );

  const total = useMemo(
    () => Math.max(0, subtotal - discount + shipping),
    [subtotal, discount, shipping]
  );

  const isInCart = useCallback(
    (productId) => items.some((item) => item.id === productId),
    [items]
  );

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    subtotal,
    discount,
    shipping,
    total,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
