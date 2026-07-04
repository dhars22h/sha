import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCreditCard, FiTrash2 } from 'react-icons/fi';

export default function CartSummary({ totalItems, subtotal, discount, shipping, total, onClearCart }) {
  const rows = [
    ['Total items', totalItems.toLocaleString('en-IN')],
    ['Subtotal', `Rs. ${subtotal.toLocaleString('en-IN')}`],
    ['Discount', discount > 0 ? `- Rs. ${discount.toLocaleString('en-IN')}` : 'Rs. 0'],
    ['Shipping', shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString('en-IN')}`],
  ];

  return (
    <motion.aside
      className="luxury-card rounded-2xl p-6 h-fit lg:sticky lg:top-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-white font-luxury mb-6">Order Summary</h2>

      <div className="space-y-3 text-sm mb-6">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-white/60">
            <span>{label}</span>
            <span className={label === 'Discount' && discount > 0 ? 'text-green-400' : 'text-white'}>{value}</span>
          </div>
        ))}
        <div className="h-px bg-white/10" />
        <div className="flex justify-between gap-4 text-lg font-bold">
          <span className="text-white">Final total</span>
          <span className="gold-gradient">Rs. {total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <motion.button
        className="w-full py-3.5 rounded-xl font-semibold text-white btn-luxury mb-3 inline-flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FiCreditCard size={16} /> Checkout
      </motion.button>

      <Link to="/products" className="w-full py-3 rounded-xl font-semibold text-white/80 glass mb-3 inline-flex items-center justify-center gap-2 hover:text-white transition-colors">
        <FiArrowLeft size={16} /> Continue Shopping
      </Link>

      <button
        onClick={onClearCart}
        className="w-full py-2 text-sm text-white/40 hover:text-red-400 transition-colors inline-flex items-center justify-center gap-2"
      >
        <FiTrash2 size={14} /> Clear Cart
      </button>
    </motion.aside>
  );
}
