export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

export const STORAGE_KEYS = {
  CART: 'shans_cart',
  WISHLIST: 'shans_wishlist',
  PRODUCTS: 'shans_products',
  ADMIN_PRODUCTS: 'shans_admin_products',
  ADMIN_AUTH: 'shans_admin_auth',
};
