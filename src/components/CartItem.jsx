import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function CartItem({ item, index = 0, onIncrease, onDecrease, onUpdateQuantity, onRemove }) {
  const price = item.salePrice ?? item.price ?? 0;

  return (
    <motion.article
      className="product-card rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/product/${item.id}`} className="flex-shrink-0">
        <div className={`w-24 h-24 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br ${item.bgColor}`}>
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
          ) : (
            <span className="text-4xl">{item.emoji}</span>
          )}
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.id}`}>
          <h3 className="font-bold text-white font-luxury hover:text-amber-200 transition-colors">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-white/40">{item.category}</p>
        <p className="text-lg font-bold gold-gradient mt-1">Rs. {price.toLocaleString('en-IN')}</p>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
        <div className="flex items-center gap-2 glass rounded-xl p-1">
          <motion.button
            onClick={() => onDecrease(item.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white disabled:opacity-40"
            whileTap={{ scale: 0.9 }}
            disabled={item.quantity <= 1}
            aria-label={`Decrease ${item.name} quantity`}
          >
            <FiMinus size={14} />
          </motion.button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(event) => onUpdateQuantity(item.id, event.target.value)}
            className="w-12 bg-transparent text-center text-white font-semibold outline-none"
            aria-label={`${item.name} quantity`}
          />
          <motion.button
            onClick={() => onIncrease(item.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white"
            whileTap={{ scale: 0.9 }}
            aria-label={`Increase ${item.name} quantity`}
          >
            <FiPlus size={14} />
          </motion.button>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">Rs. {(price * item.quantity).toLocaleString('en-IN')}</p>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-400 hover:text-red-300 text-xs inline-flex items-center gap-1 mt-1"
          >
            <FiTrash2 size={12} /> Remove
          </button>
        </div>
      </div>
    </motion.article>
  );
}
