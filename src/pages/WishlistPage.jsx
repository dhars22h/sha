import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import WishlistCard from '../components/WishlistCard';

export default function WishlistPage() {
  const { items, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <section className="pt-28 pb-24 min-h-screen flex items-center justify-center" style={{ background: '#06000f' }}>
        <motion.div
          className="text-center glass rounded-3xl p-12 max-w-md mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiHeart className="text-6xl text-rose-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2 font-luxury">Your Wishlist is Empty</h1>
          <p className="text-white/50 mb-6">Save your favourite luxury products here for later.</p>
          <Link to="/products">
            <motion.button className="px-8 py-3 rounded-full font-semibold text-white btn-luxury" whileHover={{ scale: 1.05 }}>
              Explore Products
            </motion.button>
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-24 min-h-screen" style={{ background: '#06000f' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white font-luxury">
                My <span className="gradient-text">Wishlist</span>
              </h1>
              <p className="text-white/50 mt-2">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={clearWishlist}
              className="self-start sm:self-auto px-5 py-2 rounded-xl text-sm text-red-300 glass hover:text-red-200 inline-flex items-center gap-2"
            >
              <FiTrash2 size={14} /> Clear Wishlist
            </button>
          </div>
        </motion.div>

        <div className="space-y-4">
          {items.map((product, index) => (
            <WishlistCard
              key={product.id}
              product={product}
              index={index}
              onMoveToCart={moveToCart}
              onRemove={removeFromWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
