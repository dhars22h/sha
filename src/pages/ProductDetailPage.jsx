import { useParams, Navigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductDetails from '../components/ProductDetails';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(id);

  if (!product) return <Navigate to="/products" replace />;

  return <ProductDetails product={product} />;
}
