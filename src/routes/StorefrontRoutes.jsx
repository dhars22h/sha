import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CustomShampoo from '../pages/CustomShampoo';
import WishlistPage from '../pages/WishlistPage';
import CartPage from '../pages/CartPage';
import ReviewsPage from '../pages/ReviewsPage';
import ContactPage from '../pages/ContactPage';
import FAQPage from '../pages/FAQPage';

export default function StorefrontRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="custom-shampoo" element={<CustomShampoo />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FAQPage />} />
      </Route>
    </Routes>
  );
}
