import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

export default function CartPage() {
  const {
    items,
    cartCount,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    discount,
    shipping,
    total,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <section className="pt-28 pb-24 min-h-screen flex items-center justify-center" style={{ background: '#06000f' }}>
        <motion.div
          className="text-center glass rounded-3xl p-12 max-w-md mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiShoppingCart className="text-6xl text-purple-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2 font-luxury">Your Cart is Empty</h1>
          <p className="text-white/50 mb-6">Discover our luxury collection and treat your hair to the best.</p>
          <Link to="/products">
            <motion.button className="px-8 py-3 rounded-full font-semibold text-white btn-luxury" whileHover={{ scale: 1.05 }}>
              Start Shopping
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
          <Link to="/products" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-4 transition-colors">
            <FiArrowLeft /> Continue Shopping
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-white font-luxury">
            Shopping <span className="gradient-text">Cart</span>
          </h1>
          <p className="text-white/50 mt-2">{cartCount} total item{cartCount !== 1 ? 's' : ''} in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <CartSummary
            totalItems={cartCount}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            total={total}
            onClearCart={clearCart}
          />
        </div>
      </div>
    </section>
  );
}
