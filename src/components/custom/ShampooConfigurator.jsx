import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDroplet, FiEdit3, FiGift, FiHeart, FiLayers, FiPackage, FiSmile } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import FormulaOptions from './FormulaOptions';
import OrderSummary from './OrderSummary';
import { calculateCustomShampooPrice } from './PriceCalculator';

const hairTypes = ['Dry Hair', 'Oily Hair', 'Curly Hair', 'Straight Hair', 'Damaged Hair', 'Color-Treated Hair'];
const concerns = ['Hair Fall', 'Dandruff', 'Frizz Control', 'Split Ends', 'Hair Growth', 'Scalp Care', 'Shine Enhancement', 'Volume Boost'];
const ingredients = ['Argan Oil', 'Coconut Oil', 'Aloe Vera', 'Keratin', 'Biotin', 'Tea Tree Oil', 'Rosemary Extract', 'Shea Butter'];
const fragrances = ['Rose', 'Lavender', 'Jasmine', 'Vanilla', 'Ocean Fresh', 'Coconut', 'Unscented'];
const bottleSizes = ['100ml', '250ml', '500ml', '1 Liter'];
const bottleDesigns = ['Classic Gold', 'Luxury Purple', 'Rose Gold', 'Premium Black'];

const initialFormula = {
  hairType: 'Dry Hair',
  concerns: ['Shine Enhancement'],
  ingredients: ['Argan Oil'],
  fragrance: 'Rose',
  bottleSize: '250ml',
  bottleDesign: 'Classic Gold',
  customerName: '',
  productName: 'Shan Luxe Blend',
  message: '',
};

export default function ShampooConfigurator() {
  const [formula, setFormula] = useState(initialFormula);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const { addToCart } = useCart();

  const price = useMemo(() => calculateCustomShampooPrice(formula), [formula]);

  const updateFormula = (key, value) => {
    setFormula((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const customProduct = {
    id: `custom-shampoo-${Date.now()}`,
    name: formula.productName || 'Custom Shan Shampoo',
    description: `${formula.hairType} formula with ${formula.ingredients.join(', ')} and ${formula.fragrance} fragrance.`,
    price: price.total,
    salePrice: price.total,
    rating: 5,
    reviews: 0,
    category: 'Custom Shampoo',
    badge: 'Custom',
    color: 'from-purple-500 to-pink-600',
    emoji: 'S',
    bgColor: 'from-purple-900/30 to-pink-900/20',
    customFormula: formula,
  };

  const handleAddToCart = () => {
    addToCart(customProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleSave = () => {
    localStorage.setItem('shans-custom-shampoo-formula', JSON.stringify({ formula, price }));
    setSaved(true);
  };

  const handleReset = () => {
    setFormula(initialFormula);
    setSaved(false);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_390px] gap-6 lg:gap-8 items-start">
      <div className="space-y-6">
        <FormulaOptions
          title="Select Hair Type"
          eyebrow="Step 01"
          icon={FiDroplet}
          options={hairTypes}
          selected={formula.hairType}
          onChange={(value) => updateFormula('hairType', value)}
          columns="sm:grid-cols-2 lg:grid-cols-3"
        />

        <FormulaOptions
          title="Select Hair Concerns"
          eyebrow="Step 02"
          icon={FiHeart}
          options={concerns}
          selected={formula.concerns}
          onChange={(value) => updateFormula('concerns', value)}
          multiple
          columns="sm:grid-cols-2 lg:grid-cols-4"
        />

        <FormulaOptions
          title="Select Key Ingredients"
          eyebrow="Step 03"
          icon={FiLayers}
          options={ingredients}
          selected={formula.ingredients}
          onChange={(value) => updateFormula('ingredients', value)}
          multiple
          columns="sm:grid-cols-2 lg:grid-cols-4"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormulaOptions
            title="Select Fragrance"
            eyebrow="Step 04"
            icon={FiSmile}
            options={fragrances}
            selected={formula.fragrance}
            onChange={(value) => updateFormula('fragrance', value)}
          />
          <FormulaOptions
            title="Select Bottle Size"
            eyebrow="Step 05"
            icon={FiPackage}
            options={bottleSizes}
            selected={formula.bottleSize}
            onChange={(value) => updateFormula('bottleSize', value)}
          />
        </div>

        <FormulaOptions
          title="Select Bottle Design"
          eyebrow="Step 06"
          icon={FiGift}
          options={bottleDesigns}
          selected={formula.bottleDesign}
          onChange={(value) => updateFormula('bottleDesign', value)}
          columns="sm:grid-cols-2 lg:grid-cols-4"
        />

        <motion.div
          className="glass rounded-3xl p-5 sm:p-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="flex items-start gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-amber-200 bg-white/10 border border-amber-300/20">
              <FiEdit3 size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest gold-gradient font-semibold">Custom Label</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-luxury">Personalize The Bottle</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-white/60 mb-2 block">Customer Name</span>
              <input
                value={formula.customerName}
                onChange={(event) => updateFormula('customerName', event.target.value)}
                className="w-full rounded-2xl px-4 py-3 bg-white/10 border border-white/10 text-white placeholder-white/35 outline-none focus:border-amber-300/60"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-sm text-white/60 mb-2 block">Product Name</span>
              <input
                value={formula.productName}
                onChange={(event) => updateFormula('productName', event.target.value)}
                className="w-full rounded-2xl px-4 py-3 bg-white/10 border border-white/10 text-white placeholder-white/35 outline-none focus:border-amber-300/60"
                placeholder="Formula name"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm text-white/60 mb-2 block">Personalized Message</span>
              <textarea
                value={formula.message}
                onChange={(event) => updateFormula('message', event.target.value)}
                rows={4}
                className="w-full rounded-2xl px-4 py-3 bg-white/10 border border-white/10 text-white placeholder-white/35 outline-none resize-none focus:border-amber-300/60"
                placeholder="A short note for the bottle label"
              />
            </label>
          </div>

          {saved && (
            <motion.p
              className="mt-4 text-sm text-emerald-300"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Formula saved on this device.
            </motion.p>
          )}
        </motion.div>
      </div>

      <OrderSummary
        formula={formula}
        price={price}
        onAddToCart={handleAddToCart}
        onSave={handleSave}
        onReset={handleReset}
        added={added}
      />
    </div>
  );
}
