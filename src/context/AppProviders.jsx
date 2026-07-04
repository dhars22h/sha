import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { ProductProvider } from './ProductContext';

export function AppProviders({ children }) {
  return (
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </ProductProvider>
  );
}
