import { motion } from 'framer-motion';
import { FiRefreshCw, FiSave, FiShoppingBag, FiTag } from 'react-icons/fi';

const SummaryRow = ({ label, value }) => (
  <div className="py-3 border-b border-white/10 last:border-b-0">
    <p className="text-xs uppercase tracking-widest text-white/35 mb-1">{label}</p>
    <p className="text-sm font-semibold text-white/85">{value || 'Not selected'}</p>
  </div>
);

export default function OrderSummary({ formula, price, onAddToCart, onSave, onReset, added }) {
  const labelDetails = [
    formula.customerName && `Name: ${formula.customerName}`,
    formula.productName && `Product: ${formula.productName}`,
    formula.message && `Message: ${formula.message}`,
  ].filter(Boolean);

  return (
    <motion.aside
      className="glass rounded-3xl p-5 sm:p-6 lg:sticky lg:top-28"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-amber-300/15 text-amber-200 border border-amber-200/25">
          <FiTag size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest gold-gradient font-semibold">Live Summary</p>
          <h2 className="text-2xl font-bold text-white font-luxury">Your Formula</h2>
        </div>
      </div>

      <div className="rounded-3xl p-5 mb-5 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(40,84,63,0.25), rgba(96,108,56,0.15), rgba(163,177,138,0.1))', border: '1px solid rgba(163,177,138,0.2)' }}>
        <div className="absolute -right-8 -top-10 w-28 h-28 rounded-full bg-emerald-700/10 blur-2xl" />
        <motion.div
          className="mx-auto mb-4 w-24 h-36 rounded-b-3xl rounded-t-xl relative overflow-hidden"
          style={{
            background:
              formula.bottleDesign === 'Earth Clay'
                ? 'linear-gradient(145deg, #3d2a1b, #4a3728, #e9e0d2)'
                : formula.bottleDesign === 'Olive Wellness'
                  ? 'linear-gradient(145deg, #283618, #606c38, #a3b18a)'
                  : formula.bottleDesign === 'Sage Botanical'
                    ? 'linear-gradient(145deg, #2d6a4f, #a3b18a, #fdfbf7)'
                    : 'linear-gradient(145deg, #0f221c, #1b4332, #a3b18a)',
            boxShadow: '0 22px 45px rgba(40,84,63,0.3)',
          }}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-5 rounded-b-lg bg-white/30" />
          <div className="absolute inset-x-3 top-14 rounded-2xl bg-white/18 border border-white/25 px-2 py-3 text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/70">Shan&apos;s</p>
            <p className="text-xs font-bold text-white leading-tight">{formula.productName || 'Custom Luxe'}</p>
          </div>
        </motion.div>
        <p className="text-center text-sm text-white/60">Crafted in a {formula.bottleSize} bottle</p>
      </div>

      <div className="divide-y divide-white/0 mb-5">
        <SummaryRow label="Hair Type" value={formula.hairType} />
        <SummaryRow label="Hair Concerns" value={formula.concerns.join(', ')} />
        <SummaryRow label="Ingredients" value={formula.ingredients.join(', ')} />
        <SummaryRow label="Fragrance" value={formula.fragrance} />
        <SummaryRow label="Bottle Size" value={formula.bottleSize} />
        <SummaryRow label="Bottle Design" value={formula.bottleDesign} />
        <SummaryRow label="Custom Label" value={labelDetails.join(' | ')} />
      </div>

      <div className="rounded-2xl p-4 mb-5 bg-black/20 border border-white/10">
        <div className="flex justify-between text-sm text-white/55 mb-2">
          <span>Base Price</span>
          <span>Rs. {price.basePrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-white/55 mb-2">
          <span>Ingredients</span>
          <span>Rs. {price.ingredientTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-white/55 mb-2">
          <span>Bottle Size</span>
          <span>Rs. {price.sizeTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-white/55">
          <span>Bottle Design</span>
          <span>Rs. {price.designTotal.toLocaleString()}</span>
        </div>
        <div className="h-px bg-white/10 my-4" />
        <div className="flex items-end justify-between">
          <span className="text-white font-semibold">Estimated Price</span>
          <span className="text-3xl font-bold gold-gradient">Rs. {price.total.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3">
        <motion.button
          type="button"
          onClick={onAddToCart}
          className="w-full py-3.5 rounded-full font-semibold text-white btn-luxury flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
        >
          <FiShoppingBag />
          {added ? 'Added To Cart' : 'Add Custom Shampoo To Cart'}
        </motion.button>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            onClick={onSave}
            className="py-3 rounded-full font-semibold text-sm text-white/85 bg-white/10 border border-white/10 flex items-center justify-center gap-2"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiSave />
            Save Formula
          </motion.button>
          <motion.button
            type="button"
            onClick={onReset}
            className="py-3 rounded-full font-semibold text-sm text-white/85 bg-white/10 border border-white/10 flex items-center justify-center gap-2"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiRefreshCw />
            Reset
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}
