import { createContext, useContext, useState, useCallback } from 'react';
import { products as defaultProducts } from '../data/products';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(defaultProducts);

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === Number(id)),
    [products]
  );

  const searchProducts = useCallback(
    (query, category = 'All') => {
      const q = query.trim().toLowerCase();
      return products.filter((p) => {
        const matchCategory = category === 'All' || p.category === category;
        const matchSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        return matchCategory && matchSearch;
      });
    },
    [products]
  );

  const getRelatedProducts = useCallback(
    (productId, category, limit = 4) =>
      products
        .filter((p) => p.id !== productId && p.category === category)
        .slice(0, limit),
    [products]
  );

  const updateProducts = useCallback((updater) => {
    setProducts((prev) => (typeof updater === 'function' ? updater(prev) : updater));
  }, []);

  const value = {
    products,
    setProducts,
    updateProducts,
    getProductById,
    searchProducts,
    getRelatedProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
}
