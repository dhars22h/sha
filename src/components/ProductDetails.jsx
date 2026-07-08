import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiMinus, FiPlus, FiChevronRight, FiCheck, FiSend, FiShoppingBag } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { reviews as initialReviews } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';

// Organic Ingredient Images
import aloeVeraImg from '../assets/images/aloe_vera.jpg';
import coconutImg from '../assets/images/coconut.jpg';
import teaTreeImg from '../assets/images/tea_tree.jpg';
import arganOilImg from '../assets/images/argan_oil.jpg';
import keratinImg from '../assets/images/keratin.jpg';
import biotinImg from '../assets/images/biotin.jpg';

// Local floating bubbles for the image gallery visual
const GalleryBubbles = ({ color }) => {
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 80 + 10,
    delay: Math.random() * 3,
    duration: Math.random() * 6 + 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map(b => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            bottom: -20,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), ${color}30)`,
            border: `1px solid ${color}40`,
          }}
          animate={{
            y: [0, -320],
            x: [0, Math.sin(b.id) * 30],
            opacity: [0, 0.8, 0.4, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { getRelatedProducts } = useProducts();
  const [activeTab, setActiveTab] = useState('description'); // description | ingredients | benefits | usage
  const [activeThumb, setActiveThumb] = useState(0); // 0: Main, 1: Active Botanical, 2: Texture, 3: Packaging
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [bought, setBought] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Reviews state
  const [reviewsList, setReviewsList] = useState([]);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [ratingHover, setRatingHover] = useState(0);

  const reviewsSectionRef = useRef(null);

  // Initialize and filter reviews matching this product
  useEffect(() => {
    const matched = initialReviews.filter(r => r.product === product.name);
    // If no matched reviews, add 2 mock reviews specific to this product
    if (matched.length === 0) {
      setReviewsList([
        {
          id: 101,
          name: "Meera Sen",
          location: "Kolkata, India",
          rating: 5,
          text: `Absolutely in love with the ${product.name}! The fragrance is premium and lingering, and it leaves my hair feeling incredibly soft and salon-styled. Highly recommend for regular care.`,
          avatar: "MS",
          product: product.name
        },
        {
          id: 102,
          name: "Rohan Verma",
          location: "Pune, India",
          rating: 4,
          text: `Great formula. It lathers up really nicely and gives an instant shine. My scalp feels healthy and flake-free. Will definitely buy again.`,
          avatar: "RV",
          product: product.name
        }
      ]);
    } else {
      setReviewsList(matched);
    }
    // Reset view states
    setActiveThumb(0);
    setQty(1);
    setWishlisted(isInWishlist(product.id));
    setAdded(false);
    setBought(false);
    setWriteReviewOpen(false);
    setReviewSubmitted(false);
  }, [product, isInWishlist]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    showToast(`Added ${qty} ${product.name} to Cart!`);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    setBought(true);
    showToast(`Order Placed! Thank you for purchasing ${product.name}!`);
    setTimeout(() => {
      setBought(false);
      navigate('/');
    }, 2000);
  };

  const handleWishlistToggle = () => {
    const wasWishlisted = isInWishlist(product.id);
    toggleWishlist(product);
    showToast(wasWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewName || !newReviewText) {
      showToast('Please fill in all fields');
      return;
    }

    const newRev = {
      id: Date.now(),
      name: newReviewName,
      location: newReviewLocation || "India",
      rating: newReviewRating,
      text: newReviewText,
      avatar: newReviewName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      product: product.name
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    showToast('Review submitted successfully!');
    
    // Clear form
    setNewReviewName('');
    setNewReviewText('');
    setNewReviewLocation('');
    setNewReviewRating(5);
    setTimeout(() => {
      setReviewSubmitted(false);
      setWriteReviewOpen(false);
    }, 2000);
  };

  // Gallery Visual Map
  const getIngredientImage = (cat) => {
    switch (cat) {
      case 'Hair Growth': return biotinImg;
      case 'Color Protection': return aloeVeraImg;
      case 'Anti-Dandruff': return teaTreeImg;
      case 'Curly Hair': return coconutImg;
      case 'Oily Hair': return teaTreeImg;
      case 'Dry Hair': return arganOilImg;
      default: return keratinImg;
    }
  };

  const galleryItems = [
    { label: 'Product Bottle', type: 'image', value: product.image, desc: 'Original bottle visual' },
    { label: 'Key Botanical', type: 'image', value: getIngredientImage(product.category), desc: 'Active botanical ingredient' },
  ];

  // Tab specifications
  const getProductSpecs = () => {
    const specs = {
      description: `Experience the pinnacle of hair care luxury with ${product.name}. This masterfully crafted formula delivers deep nourishment, weightless volume, and an irresistible celebrity-grade shine. Perfect for transforming dull, stressed strands into pure cascading silk. Infused with natural botanicals, essential proteins, and micro-nutrients to restore structural integrity to every follicle.`,
      ingredients: 'Moroccan Argan Oil, Cold-pressed Jojoba, Hydrolyzed Silk Keratin, Pure Aloe Vera Concentrate, Shea Butter Extract, Pro-Vitamin B5, Sweet Almond Oil, Purified Floral Water, Organic Essential Oils.',
      benefits: '• 98% reduction in hair breakage after 3 washes.\n• Deep cuticle hydration without greasy residue.\n• Heat styling protection up to 230°C.\n• Multi-dimensional brilliant shine and silkiness.\n• Color-safe and sulfate-free luxury base.',
      usage: '1. Apply a generous amount to thoroughly wet hair.\n2. Gently massage into the scalp for 2 minutes using circular motions.\n3. Lather along the lengths of the hair.\n4. Rinse completely with lukewarm water.\n5. For optimal restoration, follow with Shan\'s Silk Conditioner.',
    };

    if (product.category === 'Hair Growth') {
      specs.description = `Accelerate your hair thickness and density with the advanced Biotin formulation of ${product.name}. Designed specifically to treat hair thinning and stimulate inactive follicles, this nutrient-dense formula strengthens roots, dramatically reduces shedding, and builds a thicker, fuller hair body from the very first week.`;
      specs.ingredients = 'Biotin (Vitamin B7), Rosemary Extract, Caffeine Liposomes, Castor Oil, Peppermint Extract, Ginseng Root, Hydrolyzed Soy Protein, Vitamin E, Wheat Germ Oil.';
      specs.benefits = '• Stimulates root follicles for accelerated growth.\n• Visibly increases hair density and shaft thickness.\n• Restores dry, brittle strands from the scalp level.\n• Infuses a cool, refreshing peppermint scalp feel.\n• Minimizes hair shedding by up to 84%.';
    } else if (product.category === 'Color Protection') {
      specs.description = `Lock in your salon color vibrancy with the high-performance violet toning system in ${product.name}. Formulated to neutralize brassy yellow and orange hues, this elixir maintains color fidelity, repairs chemical damage from coloring, and coats strands with a protective gloss barrier.`;
      specs.ingredients = 'Acid Violet Toning Pigments, Grape Seed Oil, Orchid Flower Extract, Hydrolyzed Silk, Argan Oil, Green Tea Extract, UV-A & UV-B Shields, Botanical Amino Acids.';
      specs.benefits = '• Neutralizes brassy yellow tones in blonde and silver hair.\n• Prolongs colored dye vibrancy up to 12 weeks.\n• Repairs deep bonds broken by chemical treatment.\n• Protects against color fading from sun and UV exposure.\n• Leaves a brilliant platinum-reflective shine.';
    } else if (product.category === 'Anti-Dandruff') {
      specs.description = `Soothe your scalp and eliminate flakes forever with the refreshing formula of ${product.name}. Harnessing active Zinc Pyrithione and botanical anti-microbials, this shampoo regulates sebum, stops itching instantly, and ensures 100% flake-free clarity while preserving hair moisture.`;
      specs.ingredients = 'Zinc Pyrithione (1.0%), Tea Tree Leaf Oil, Menthol Extract, Salicylic Acid, Eucalyptus Oil, Aloe Vera Leaf Juice, Vitamin B5, Chamomile Extract.';
      specs.benefits = '• 100% dandruff flake removal and itch control.\n• Purifies and balances oily or dry scalp environments.\n• Delivers an intense, long-lasting cooling mint sensation.\n• Soothes irritation, redness, and scalp stress.\n• Softens hair texture unlike ordinary clinical shampoos.';
    } else if (product.category === 'Oily Hair') {
      specs.description = `Detoxify and weightlessly refresh oily hair with the charcoal purifying power of ${product.name}. This formula acts as a magnet to pull out excess oils, styling residues, and environmental toxins from the scalp without stripping hair of its natural moisture.`;
      specs.ingredients = 'Activated Bamboo Charcoal, Tea Tree Extract, Organic Apple Cider Vinegar, Rosemary Extract, Sage Leaves, Green Tea Extract, Hydrolyzed Keratin.';
      specs.benefits = '• Deeply purifies and absorbs excess sebum oil.\n• Detoxifies pores and lifts flat, limp roots.\n• Extends hair freshness for up to 48 hours.\n• Weightless volume and clean, bouncing strands.\n• Eliminates heavy styling product buildup.';
    } else if (product.category === 'Curly Hair') {
      specs.description = `Hydrate and define your natural curl pattern with the rich, frizz-locking coconut butter formulation of ${product.name}. Enriched with nourishing avocado oils and intense moisturizers, this shampoo delivers springy bounce, eliminates frizz, and defines curls with soft, touchable holding control.`;
      specs.ingredients = 'Raw Coconut Butter, Avocado Fruit Oil, Hibiscus Flower Concentrate, Murumuru Seed Butter, Hydrolyzed Wheat Proteins, Silk Powder, Vitamin E.';
      specs.benefits = '• Restores moisture to curly and coily hair shafts.\n• Locks out frizz and humidity for 24-hour curl hold.\n• Enhances natural curl definition and springiness.\n• Gentle cleansing without stripping curly moisture barrier.\n• Leaves curls soft, touchable, and bouncing.';
    }

    return specs;
  };

  const activeSpecs = getProductSpecs();

  const relatedProducts = getRelatedProducts(product.id, product.category, 4);

  // Reviews calculations
  const totalReviewsCount = reviewsList.length;
  const averageRating = totalReviewsCount > 0
    ? (reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / totalReviewsCount).toFixed(1)
    : product.rating.toFixed(1);

  const starBreakdowns = [5, 4, 3, 2, 1].map(stars => {
    const count = reviewsList.filter(r => r.rating === stars).length;
    const percentage = totalReviewsCount > 0 ? Math.round((count / totalReviewsCount) * 100) : 0;
    return { stars, percentage, count };
  });

  const scrollToReviews = (e) => {
    e.preventDefault();
    if (reviewsSectionRef.current) {
      reviewsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeGlowColor = product.color.includes('emerald') ? '#10b981' :
    product.color.includes('sage') ? '#a3b18a' :
    product.color.includes('olive') ? '#606c38' :
    product.color.includes('forest') ? '#28543f' :
    product.color.includes('teal') ? '#14b8a6' :
    product.color.includes('amber') ? '#f59e0b' : '#606c38';

  return (
    <div className="min-h-screen pt-28 pb-20 relative bg-[#05120d] text-white">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(40,84,63,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(96,108,56,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 text-xs text-white/40 mb-8 border-b border-white/5 pb-4">
          <button onClick={() => navigate('/')} className="hover:text-amber-400 transition-colors">Home</button>
          <FiChevronRight size={10} />
          <button onClick={() => navigate('/products')} className="hover:text-amber-400 transition-colors">Shop</button>
          <FiChevronRight size={10} />
          <span className="text-white/60">{product.category}</span>
          <FiChevronRight size={10} />
          <span className="gold-gradient font-semibold">{product.name}</span>
        </div>

        {/* Product Details Section (Gallery + Purchase details) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          
          {/* LEFT: Image Gallery */}
          <div className="flex flex-col gap-4">
            
            {/* Main Visual Frame */}
            <div
              className={`relative aspect-square rounded-3xl bg-gradient-to-br ${product.bgColor} border border-white/10 overflow-hidden flex items-center justify-center`}
              style={{
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(255,255,255,0.05)`,
              }}
            >
              {galleryItems[activeThumb].type !== 'video' && <GalleryBubbles color={activeGlowColor} />}

              {/* Dynamic visual or video player */}
              {galleryItems[activeThumb].type === 'video' ? (
                <video
                  key={activeThumb}
                  src={galleryItems[activeThumb].value}
                  autoPlay
                  muted
                  controls
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-10 rounded-3xl"
                  style={{
                    boxShadow: `0 20px 50px rgba(0,0,0,0.5)`,
                  }}
                />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeThumb}
                    src={galleryItems[activeThumb].value}
                    alt={galleryItems[activeThumb].label}
                    className="w-4/5 h-4/5 object-contain z-10 relative select-none rounded-2xl filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
              )}

              {/* Shine Overlay sweep */}
              {galleryItems[activeThumb].type !== 'video' && (
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none opacity-30"
                  style={{
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                />
              )}

              {/* Active display badge indicator */}
              <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 border border-white/10 text-white/70">
                {galleryItems[activeThumb].label}
              </div>
            </div>

            {/* Thumbnail Navigation Row — 2 images only */}
            <div className="grid grid-cols-2 gap-3">
              {galleryItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumb(idx)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 border bg-[#05120d]`}
                  style={{
                    borderColor: activeThumb === idx ? 'rgba(163,177,138,0.8)' : 'rgba(255,255,255,0.08)',
                    boxShadow: activeThumb === idx ? '0 0 15px rgba(163,177,138,0.3)' : 'none',
                    opacity: activeThumb === idx ? 1 : 0.6,
                  }}
                >
                  <img src={item.value} alt={item.label} className="w-full h-full object-contain p-2 rounded-xl z-0" />
                  <span className="absolute bottom-1 left-0 right-0 text-center text-[9px] text-white/60 font-semibold z-10">{item.label}</span>
                  {activeThumb === idx && (
                    <div className="absolute inset-0 bg-white/5 z-10 pointer-events-none border border-sage-400/30 rounded-2xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Specs & Options */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Product Badge */}
              {product.badge && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r mb-4 inline-block shadow-md"
                  style={{
                    background: product.badge === 'Sale' ? 'linear-gradient(135deg, #28543f, #588157)' :
                      product.badge === 'New' ? 'linear-gradient(135deg, #87986c, #606c38)' :
                      product.badge === 'Luxury' ? 'linear-gradient(135deg, #344e41, #1c3e30)' :
                      'linear-gradient(135deg, #588157, #28543f)',
                  }}
                >
                  ✦ {product.badge}
                </span>
              )}

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h1>

              {/* Review / Ratings link */}
              <div className="flex items-center gap-2 mb-6">
                <a href="#reviews" onClick={scrollToReviews} className="flex text-amber-400 hover:scale-105 transition-transform duration-200">
                  {[1, 2, 3, 4, 5].map(s => (
                    <FaStar
                      key={s}
                      size={14}
                      className={s <= Math.floor(averageRating) ? 'fill-current' : 'text-white/10'}
                    />
                  ))}
                </a>
                <span className="text-sm font-bold text-amber-400">{averageRating}</span>
                <span className="text-white/30">|</span>
                <a href="#reviews" onClick={scrollToReviews} className="text-xs text-white/50 hover:text-white underline">
                  {totalReviewsCount} Customer Reviews
                </a>
              </div>

              {/* Pricing details */}
              <div className="flex items-baseline gap-3.5 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-black gold-gradient">
                  ₹{product.salePrice.toLocaleString()}
                </span>
                <span className="text-lg text-white/30 line-through">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-green-500 bg-green-500/10 border border-green-500/20">
                  Save {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                </span>
              </div>

              {/* Product Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold text-green-400">
                  In Stock - Ready to dispatch from Mumbai
                </span>
              </div>

              {/* Short Summary Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity Selector + Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 pt-4 border-t border-white/5">
                
                {/* Quantity Stepper */}
                <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1 w-full sm:w-fit justify-between">
                  <motion.button
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    whileTap={{ scale: 0.8 }}
                  >
                    <FiMinus size={14} />
                  </motion.button>
                  <span className="w-12 text-center font-bold text-base text-white select-none">
                    {qty}
                  </span>
                  <motion.button
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    onClick={() => setQty(q => q + 1)}
                    whileTap={{ scale: 0.8 }}
                  >
                    <FiPlus size={14} />
                  </motion.button>
                </div>

                {/* Add to Cart button */}
                <motion.button
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 border shadow-lg transition-all duration-300"
                  style={{
                    background: added ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.04)',
                    borderColor: added ? 'transparent' : 'rgba(255,255,255,0.15)',
                  }}
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02, backgroundColor: added ? '' : 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiShoppingCart size={16} />
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </motion.button>

                {/* Wishlist Button */}
                <motion.button
                  className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 hover:border-rose-500/50 hover:bg-rose-500/5 transition-all duration-300"
                  onClick={handleWishlistToggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiHeart
                    size={20}
                    className={isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : 'text-white/70'}
                  />
                </motion.button>
              </div>

              {/* Buy Now Button */}
              <motion.button
                className="w-full py-4 rounded-xl font-bold text-sm text-white btn-luxury flex items-center justify-center gap-2 shadow-2xl mb-8"
                onClick={handleBuyNow}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: bought ? 'linear-gradient(135deg, #10b981, #059669)' : '',
                }}
              >
                <FiShoppingBag size={16} />
                {bought ? '✓ Placing Order...' : 'Buy It Now'}
              </motion.button>
            </div>

            {/* TABBED DETAILS */}
            <div className="border border-white/5 rounded-2xl glass p-5">
              <div className="flex border-b border-white/10 gap-6 mb-4">
                {['description', 'ingredients', 'benefits', 'usage'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="pb-2 text-xs font-semibold uppercase tracking-wider relative text-white/50 hover:text-white transition-colors"
                    style={{ color: activeTab === tab ? '#fff' : '' }}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="detailsTabBorder"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: 'linear-gradient(90deg, #a3b18a, #606c38)' }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="min-h-[100px] text-xs text-white/60 leading-relaxed whitespace-pre-line">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {activeSpecs[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </section>

        {/* CUSTOMER REVIEWS SECTION */}
        <section id="reviews" ref={reviewsSectionRef} className="py-12 border-t border-white/5 mb-16">
          <h2 className="text-2xl font-bold mb-8 section-title" style={{ fontFamily: "'Playfair Display', serif" }}>
            Customer <span className="gradient-text">Reviews</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            {/* Reviews Summary Stats */}
            <div className="md:col-span-4 p-6 glass border border-white/5 rounded-2xl flex flex-col justify-center items-center text-center">
              <span className="text-5xl font-black text-white mb-2">{averageRating}</span>
              <div className="flex text-amber-400 mb-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <FaStar
                    key={s}
                    size={16}
                    className={s <= Math.floor(averageRating) ? 'fill-current' : 'text-white/10'}
                  />
                ))}
              </div>
              <p className="text-white/50 text-sm mb-6">Based on {totalReviewsCount} verified reviews</p>

              {/* Rating Bars breakdown */}
              <div className="w-full space-y-2 mb-6">
                {starBreakdowns.map(({ stars, percentage, count }) => (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-3 text-white/50 font-bold">{stars}★</span>
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          background: 'linear-gradient(90deg, #f59e0b, #db2777)',
                        }}
                      />
                    </div>
                    <span className="w-8 text-right text-white/40">{percentage}%</span>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => setWriteReviewOpen(!writeReviewOpen)}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white border border-white/10 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 transition-all duration-300 w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {writeReviewOpen ? 'Cancel Review' : 'Write a Review'}
              </motion.button>
            </div>

            {/* Review List & Submission Form */}
            <div className="md:col-span-8 flex flex-col gap-4">
              
              {/* Expandable Submission Form */}
              <AnimatePresence>
                {writeReviewOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-4"
                  >
                    <form
                      onSubmit={handleSubmitReview}
                      className="p-6 rounded-2xl glass border border-white/10 space-y-4"
                    >
                      <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-2 gold-gradient">
                        Share your experience
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Priyanth Kumar"
                            value={newReviewName}
                            onChange={e => setNewReviewName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Your Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Bangalore, India"
                            value={newReviewLocation}
                            onChange={e => setNewReviewLocation(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50"
                          />
                        </div>
                      </div>

                      {/* Interactive Stars selector */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">Rating</label>
                        <div className="flex gap-1.5 items-center">
                          {[1, 2, 3, 4, 5].map(stars => (
                            <button
                              type="button"
                              key={stars}
                              onClick={() => setNewReviewRating(stars)}
                              onMouseEnter={() => setRatingHover(stars)}
                              onMouseLeave={() => setRatingHover(0)}
                              className="text-amber-400 hover:scale-125 transition-transform"
                            >
                              {stars <= (ratingHover || newReviewRating) ? (
                                <FaStar size={18} />
                              ) : (
                                <FaRegStar size={18} className="text-white/20" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Review Comments</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us what you love or how we can improve this formula..."
                          value={newReviewText}
                          onChange={e => setNewReviewText(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500/50 resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={reviewSubmitted}
                        className="py-3 rounded-xl text-xs font-bold text-white btn-luxury flex items-center justify-center gap-2 w-full sm:w-48 shadow-lg"
                        style={{
                          background: reviewSubmitted ? 'linear-gradient(135deg, #10b981, #059669)' : '',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {reviewSubmitted ? (
                          <>
                            <FiCheck size={14} /> Review Submitted!
                          </>
                        ) : (
                          <>
                            <FiSend size={12} /> Submit Review
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reviews List */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                <AnimatePresence>
                  {reviewsList.map((rev) => (
                    <motion.div
                      key={rev.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all flex gap-4"
                    >
                      {/* Avatar */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                          boxShadow: '0 4px 10px rgba(124,58,237,0.3)',
                        }}
                      >
                        {rev.avatar}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                          <div>
                            <h4 className="font-bold text-sm text-white">{rev.name}</h4>
                            <span className="text-[10px] text-white/30">{rev.location}</span>
                          </div>
                          
                          {/* Rating display */}
                          <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map(s => (
                              <FaStar
                                key={s}
                                size={11}
                                className={s <= rev.rating ? 'fill-current' : 'text-white/10'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-white/60 text-xs leading-relaxed">{rev.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="py-12 border-t border-white/5 relative z-10">
          <h2 className="text-2xl font-bold mb-8 section-title" style={{ fontFamily: "'Playfair Display', serif" }}>
            Related <span className="gradient-text">Products</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, idx) => {
              const discount = Math.round(((p.price - p.salePrice) / p.price) * 100);
              return (
                <motion.div
                  key={p.id}
                  className="product-card rounded-2xl overflow-hidden group relative flex flex-col justify-between cursor-pointer"
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  {/* Badge */}
                  {p.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white uppercase bg-black/40 border border-white/10">
                        {p.badge}
                      </span>
                    </div>
                  )}

                  {/* Discount percentage */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white bg-green-600">
                      -{discount}%
                    </span>
                  </div>

                  {/* Visual container */}
                  <div className={`h-40 flex items-center justify-center bg-gradient-to-br ${p.bgColor} relative overflow-hidden`}>
                    <div
                      className="absolute w-24 h-24 rounded-full opacity-15 filter blur-lg"
                      style={{
                        background: `linear-gradient(135deg, ${
                          p.color.includes('emerald') ? '#10b981' : p.color.includes('sage') ? '#a3b18a' : p.color.includes('olive') ? '#606c38' : p.color.includes('forest') ? '#28543f' : p.color.includes('teal') ? '#14b8a6' : '#28543f'
                        }, transparent)`
                      }}
                    />
                    <motion.img
                      src={p.image}
                      alt={p.name}
                      className="relative z-10 w-28 h-28 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.25 }}
                    />
                  </div>

                  {/* Metadata */}
                  <div className="p-4">
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500 block mb-1">
                      {p.category}
                    </span>
                    <h3 className="font-bold text-sm text-white group-hover:text-amber-200 transition-colors line-clamp-1 mb-2">
                      {p.name}
                    </h3>
                    
                    {/* Stars + Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <span className="text-sm font-bold gold-gradient">
                        ₹{p.salePrice.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                        <span>★</span>
                        <span>{p.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Global Bottom Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-amber-500/30"
            style={{
              background: 'linear-gradient(135deg, rgba(20,0,40,0.95), rgba(40,0,80,0.95))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 30px rgba(124,58,237,0.3), 0 0 20px rgba(245,158,11,0.2)',
            }}
          >
            <span className="text-sm font-semibold text-amber-200">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default ProductDetails;
