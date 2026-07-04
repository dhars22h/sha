import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

export default function WishlistCard({ product, index = 0, onMoveToCart, onRemove }) {
  const price = product.salePrice ?? product.price ?? 0;
  const originalPrice = product.price ?? price;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.article
      className="product-card rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl flex items-center justify-center text-5xl bg-gradient-to-br ${product.bgColor}`}>
          {product.emoji}
        </div>
      </Link>

      <div className="flex-1 text-center sm:text-left">
        <p className="text-xs uppercase tracking-widest gold-gradient font-semibold mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-white font-luxury hover:text-amber-200 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} size={12} className={star <= Math.floor(product.rating) ? 'text-amber-400' : 'text-white/20'} />
          ))}
          <span className="text-xs text-amber-400 ml-1">{product.rating}</span>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
          <span className="text-xl font-bold gold-gradient">Rs. {price.toLocaleString('en-IN')}</span>
          {originalPrice > price && (
            <span className="text-sm text-white/30 line-through">Rs. {originalPrice.toLocaleString('en-IN')}</span>
          )}
          {discount > 0 && <span className="text-xs text-green-400 font-semibold">-{discount}%</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <motion.button
          onClick={() => onMoveToCart(product.id)}
          className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <FiShoppingCart size={16} /> Move to Cart
        </motion.button>
        <button
          onClick={() => onRemove(product.id)}
          className="px-6 py-2 text-sm text-red-400 hover:text-red-300 flex items-center justify-center gap-1"
        >
          <FiTrash2 size={14} /> Remove
        </button>
      </div>
    </motion.article>
  );
}
