import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product, index }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
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
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{
            background: product.badge === 'Sale' ? 'linear-gradient(135deg, #ef4444, #dc2626)' :
              product.badge === 'New' ? 'linear-gradient(135deg, #7c3aed, #db2777)' :
              product.badge === 'Luxury' ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
              'linear-gradient(135deg, #db2777, #7c3aed)',
          }}
        >
          {product.badge}
        </span>
      </div>

      {/* Discount badge */}
      <div className="absolute top-3 right-12 z-10">
        <span className="px-2 py-1 rounded-full text-xs font-bold text-white bg-green-600">
          -{discount}%
        </span>
      </div>

      {/* Wishlist button */}
      <motion.button
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}
        onClick={() => setWishlisted(!wishlisted)}
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        <FiHeart
          size={14}
          className={wishlisted ? 'fill-rose-500 text-rose-500' : 'text-white/70'}
        />
      </motion.button>

      {/* Product visual */}
      <div
        className={`relative h-48 flex items-center justify-center bg-gradient-to-br ${product.bgColor} overflow-hidden`}
      >
        {/* Decorative circles */}
        <div
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{ background: `linear-gradient(135deg, ${product.color.includes('amber') ? '#f59e0b' : product.color.includes('purple') ? '#7c3aed' : '#db2777'}, transparent)`, filter: 'blur(20px)' }}
        />

        {/* Emoji as product visual */}
        <motion.div
          className="relative z-10"
          style={{ fontSize: 80 }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
        >
          {product.emoji}
        </motion.div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="text-xs uppercase tracking-widest mb-1" style={{
          background: 'linear-gradient(90deg, #f59e0b, #db2777)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {product.category}
        </p>

        {/* Name */}
        <h3
          className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-amber-200 transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(s => (
              <FaStar
                key={s}
                size={12}
                className={s <= Math.floor(product.rating) ? 'text-amber-400' : 'text-white/20'}
              />
            ))}
          </div>
          <span className="text-xs text-amber-400 font-semibold">{product.rating}</span>
          <span className="text-xs text-white/30">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Prices */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold gold-gradient">
            ₹{product.salePrice.toLocaleString()}
          </span>
          <span className="text-sm text-white/30 line-through">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* Add to cart button */}
        <motion.button
          className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: added
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : 'linear-gradient(135deg, #7c3aed, #db2777)',
            boxShadow: added
              ? '0 0 20px rgba(34,197,94,0.4)'
              : '0 0 0px rgba(124,58,237,0)',
          }}
          onClick={handleAddToCart}
          whileHover={{
            boxShadow: '0 8px 30px rgba(124,58,237,0.4)',
            y: -2,
          }}
          whileTap={{ scale: 0.97 }}
        >
          <FiShoppingCart size={16} />
          {added ? '✓ Added to Cart!' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
