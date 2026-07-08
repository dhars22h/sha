import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);

  return (
    <motion.div
      className="product-card rounded-2xl overflow-hidden group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
    >
      <div className="absolute top-3 left-3 z-10">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{
            background: product.badge === 'Sale' ? 'linear-gradient(135deg, #28543f, #588157)' :
              product.badge === 'New' ? 'linear-gradient(135deg, #87986c, #606c38)' :
              product.badge === 'Luxury' ? 'linear-gradient(135deg, #344e41, #1c3e30)' :
              'linear-gradient(135deg, #588157, #28543f)',
          }}
        >
          {product.badge}
        </span>
      </div>

      <div className="absolute top-3 right-12 z-10">
        <span className="px-2 py-1 rounded-full text-xs font-bold text-white bg-emerald-700">-{discount}%</span>
      </div>

      <motion.button
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
        onClick={() => toggleWishlist(product)}
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        <FiHeart size={14} className={wishlisted ? 'fill-rose-500 text-rose-500' : 'text-white/70'} />
      </motion.button>

      <Link to={`/product/${product.id}`}>
        <div className={`relative h-56 flex items-center justify-center bg-gradient-to-br ${product.bgColor} overflow-hidden pt-4`}>
          <div
            className="absolute w-32 h-32 rounded-full opacity-30"
            style={{ background: 'linear-gradient(135deg, #a3b18a, transparent)', filter: 'blur(20px)' }}
          />
          <motion.img
            src={product.image}
            alt={product.name}
            className="relative z-10 w-36 h-36 object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
          />
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs uppercase tracking-widest mb-1 gold-gradient font-semibold">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-sage-300 transition-colors font-luxury">
            {product.name}
          </h3>
        </Link>
        <p className="text-white/60 text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <FaStar key={s} size={12} className={s <= Math.floor(product.rating) ? 'text-amber-400' : 'text-white/20'} />
            ))}
          </div>
          <span className="text-xs text-amber-400 font-semibold">{product.rating}</span>
          <span className="text-xs text-white/40">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold gold-gradient">₹{product.salePrice.toLocaleString()}</span>
          <span className="text-sm text-white/30 line-through">₹{product.price.toLocaleString()}</span>
        </div>

        <motion.button
          className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: added ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #28543f, #606c38)',
            boxShadow: added ? '0 0 20px rgba(16,185,129,0.4)' : '0 0 0px rgba(40,84,63,0)',
          }}
          onClick={handleAddToCart}
          whileHover={{ boxShadow: '0 8px 30px rgba(40,84,63,0.3)', y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <FiShoppingCart size={16} />
          {added ? '✓ Added to Cart!' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}
