import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  initialProducts,
  initialCategories,
  initialCustomers,
  initialOrders,
  initialReviews,
  initialOffers,
  initialNotifications,
  defaultSettings,
} from '../data/mockData';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../../utils/storage';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });
  const [rememberMe, setRememberMe] = useState(false);

  const [products, setProducts] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PRODUCTS, initialProducts)
  );
  const [categories, setCategories] = useState(initialCategories);
  const [customers, setCustomers] = useState(initialCustomers);
  const [orders, setOrders] = useState(initialOrders);
  const [reviews, setReviews] = useState(initialReviews);
  const [offers, setOffers] = useState(initialOffers);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [settings, setSettings] = useState(defaultSettings);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  const login = useCallback((email, password, remember) => {
    if (email === 'admin@shansshampoo.com' && password === 'admin123') {
      setIsAuthenticated(true);
      setRememberMe(remember);
      if (remember) localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }, []);

  const addProduct = useCallback((product) => {
    const newProduct = { ...product, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateOrderStatus = useCallback((id, deliveryStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, deliveryStatus } : o)));
  }, []);

  const deleteCustomer = useCallback((id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateReviewStatus = useCallback((id, status) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const deleteReview = useCallback((id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const addCategory = useCallback((category) => {
    const newCat = { ...category, id: Date.now(), productCount: 0 };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  }, []);

  const updateCategory = useCallback((id, updates) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  }, []);

  const deleteCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const addOffer = useCallback((offer) => {
    const newOffer = { ...offer, id: Date.now(), status: 'active' };
    setOffers((prev) => [newOffer, ...prev]);
    return newOffer;
  }, []);

  const updateOffer = useCallback((id, updates) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  }, []);

  const deleteOffer = useCallback((id) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const updateSettings = useCallback((section, updates) => {
    setSettings((prev) => ({ ...prev, [section]: { ...prev[section], ...updates } }));
  }, []);

  const value = {
    isAuthenticated,
    rememberMe,
    login,
    logout,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    customers,
    deleteCustomer,
    orders,
    updateOrderStatus,
    reviews,
    updateReviewStatus,
    deleteReview,
    offers,
    addOffer,
    updateOffer,
    deleteOffer,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    settings,
    updateSettings,
    sidebarOpen,
    setSidebarOpen,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
