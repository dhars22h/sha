import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiHeart, FiEye, FiX, FiPlus, FiMinus, FiChevronDown } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { products, categories } from '../data/products';
import AnimatedLogo from './AnimatedLogo';

// Local floating bubbles for the Collections header
const HeaderBubbles = () => {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 6,
    x: Math.random() * 90 + 5,
    y: Math.random() * 80 + 10,
    delay: Math.random() * 4,
    duration: Math.random() * 8 + 6,
    color: ['#ffd700', '#db2777', '#7c3aed', '#fbbf24', '#f472b6'][Math.floor(Math.random() * 5)],
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
            top: `${b.y}%`,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${b.color}25)`,
            border: `1px solid ${b.color}35`,
            boxShadow: `0 0 10px ${b.color}20`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(b.id) * 20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const Collections = ({
  initialCategory = 'All',
  initialSearch = '',
  setSelectedCategory: setGlobalCategory,
  setSearchQuery: setGlobalSearch,
  cartCount,
  setCartCount,
  setSelectedProduct: onProductSelect,
}) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('Bestseller');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For Quick View Modal
  const [modalQty, setModalQty] = useState(1);
  const [modalTab, setModalTab] = useState('ingredients'); // ingredients | benefits | usage
  const [cartFeedback, setCartFeedback] = useState(null); // ID of product recently added to cart
  const [toastMessage, setToastMessage] = useState('');

  // Sync with global props if they change
  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleWishlistToggle = (productId, e) => {
    if (e) e.stopPropagation();
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Added to wishlist!');
    }
  };

  const handleAddToCart = (product, qty = 1, e) => {
    if (e) e.stopPropagation();
    setCartCount(prev => prev + qty);
    setCartFeedback(product.id);
    showToast(`Added ${qty} ${product.name} to Cart!`);
    setTimeout(() => setCartFeedback(null), 1500);
  };

  const popularTags = ["Argan", "Gold", "Growth", "Clarity", "Purple", "Charcoal"];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') {
      return a.salePrice - b.salePrice;
    }
    if (sortBy === 'Price: High to Low') {
      return b.salePrice - a.salePrice;
    }
    if (sortBy === 'Rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'Newest') {
      const aNew = a.badge === 'New' ? 1 : 0;
      const bNew = b.badge === 'New' ? 1 : 0;
      return bNew - aNew;
    }
    if (sortBy === 'Bestseller') {
      const aBest = a.badge === 'Best Seller' ? 1 : 0;
      const bBest = b.badge === 'Best Seller' ? 1 : 0;
      return bBest - aBest;
    }
    return 0;
  });

  // Category counts based on search query
  const getCategoryCount = (catName) => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = catName === 'All' || p.category === catName;
      return matchesSearch && matchesCat;
    }).length;
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  // Mock product specifications depending on ID/Category
  const getProductSpecs = (product) => {
    const specs = {
      ingredients: 'Moroccan Argan Oil, Shea Butter, Hydrated Keratin, Aloe Vera Gel, Organic Jojoba Oil, Essential Fragrance Oils, Purified Water.',
      benefits: 'Intense hydration, locks in natural moisture, prevents split ends, UV protection, improves elasticity, and gives a healthy golden shine.',
      usage: 'Lather into wet hair and massage gently into the scalp. Leave on for 1-2 minutes to allow ingredients to activate, then rinse thoroughly.',
    };

    if (product.category === 'Hair Growth') {
      specs.ingredients = 'Biotin Complex, Rosemary Leaf Extract, Caffeine, Castor Seed Extract, Peppermint Oil, Provitamin B5, Ginseng Root Extract.';
      specs.benefits = 'Stimulates hair follicles, strengthens roots, reduces hair fall, increases volume, improves scalp microcirculation.';
    } else if (product.category === 'Color Protection') {
      specs.ingredients = 'Violet Toning Pigments, Grape Seed Extract, Orchid Flower Extract, Hydrolyzed Silk, Sweet Almond Oil, UV Filters.';
      specs.benefits = 'Neutralizes brassy yellow tones, prolongs color vibrancy, deep conditions chemically processed hair, boosts blonde brilliance.';
    } else if (product.category === 'Anti-Dandruff') {
      specs.ingredients = 'Zinc Pyrithione (1%), Cool Peppermint Extract, Tea Tree Leaf Oil, Eucalyptus Globulus Oil, Salicylic Acid, Menthol.';
      specs.benefits = 'Clears dandruff flakes, calms scalp itching, regulates sebum production, delivers a cooling scalp sensation.';
    } else if (product.category === 'Oily Hair') {
      specs.ingredients = 'Activated Charcoal Powder, Bamboo Extract, Green Tea Extract, Apple Cider Vinegar, Rosemary Oil, Sage Leaf Extract.';
      specs.benefits = 'Deeply purifies excess sebum, detoxifies hair follicles from styling residue, lightweight volume, lasts fresh for 48 hours.';
    } else if (product.category === 'Curly Hair') {
      specs.ingredients = 'Organic Coconut Butter, Avocado Oil, Hibiscus Flower Extract, Murumuru Butter, Vitamin E, Hydrolyzed Wheat Protein.';
      specs.benefits = 'Locks in moisture for defined curls, controls frizz in humid environments, enhances natural bounce, lightweight hydration.';
    }

    return specs;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative bg-[#0a0014] text-white">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(124,58,237,0.08) 0%, transparent 60%), radial-gradient(circle at 10% 70%, rgba(219,39,119,0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(245,158,11,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 text-center rounded-3xl overflow-hidden glass border border-white/5 mb-12">
          <HeaderBubbles />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest gold-gradient border border-amber-500/30 bg-amber-500/5">
                ✦ Shan's Shampoo Atelier ✦
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 section-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
            >
              Discover Your Perfect <span className="gradient-text">Hair Care Collection</span>
            </motion.h1>

            <motion.p
              className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Tailored formulas blended with luxury botanicals, rare oils, and clinical actives. Explore our professional ranges crafted for your hair type.
            </motion.p>

            {/* Premium Search Container */}
            <motion.div
              className="max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative flex items-center p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md focus-within:border-pink-500/50 focus-within:shadow-[0_0_20px_rgba(219,39,119,0.3)] transition-all duration-300">
                <div className="pl-4 text-white/50">
                  <FiSearch size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search products, concern, or key ingredients..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (setGlobalSearch) setGlobalSearch(e.target.value);
                  }}
                  className="w-full bg-transparent border-0 text-white placeholder-white/40 text-sm py-2 px-3 focus:outline-none focus:ring-0"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      if (setGlobalSearch) setGlobalSearch('');
                    }}
                    className="p-2 rounded-full text-white/40 hover:text-white/80 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>

              {/* Popular tags search */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <span className="text-xs text-white/40">Trending searches:</span>
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      if (setGlobalSearch) setGlobalSearch(tag);
                    }}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/60 hover:text-amber-200 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter and Sorting Row */}
        <section className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/5 relative z-20">
          
          {/* Category Filter Cards */}
          <div className="flex-1 overflow-x-auto pb-2 -mb-2 scrollbar-none">
            <div className="flex gap-2.5 min-w-max">
              <button
                onClick={() => {
                  setActiveCategory('All');
                  if (setGlobalCategory) setGlobalCategory('All');
                }}
                className="px-5 py-2.5 rounded-full text-sm font-medium relative transition-colors duration-300"
                style={{
                  border: activeCategory === 'All' ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                  color: activeCategory === 'All' ? '#fff' : 'rgba(255,255,255,0.6)',
                }}
              >
                {activeCategory === 'All' && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="flex items-center gap-1.5">
                  ✨ All ({getCategoryCount('All')})
                </span>
              </button>

              {categories.map((cat) => {
                const count = getCategoryCount(cat.name);
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      if (setGlobalCategory) setGlobalCategory(cat.name);
                    }}
                    className="px-5 py-2.5 rounded-full text-sm font-medium relative transition-colors duration-300"
                    style={{
                      border: isActive ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="flex items-center gap-1.5">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-60">({count})</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sorting Dropdown */}
          <div className="relative flex-shrink-0 self-end lg:self-auto">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="flex items-center justify-between gap-3 px-5 py-2.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 hover:border-amber-500/40 text-white/80 transition-all duration-300 w-48"
            >
              <span>Sort: {sortBy}</span>
              <motion.div
                animate={{ rotate: sortDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown />
              </motion.div>
            </button>

            <AnimatePresence>
              {sortDropdownOpen && (
                <>
                  {/* Backdrop closer */}
                  <div className="fixed inset-0 z-10" onClick={() => setSortDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl glass border border-white/10 p-2 shadow-2xl z-20"
                  >
                    {[
                      'Bestseller',
                      'Newest',
                      'Rating',
                      'Price: Low to High',
                      'Price: High to Low'
                    ].map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setSortDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-white/70 hover:text-white hover:bg-white/5"
                        style={{
                          color: sortBy === option ? '#f59e0b' : '',
                          background: sortBy === option ? 'rgba(255,255,255,0.02)' : '',
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Product Count / Active Filters Summary */}
        <div className="mb-6 flex justify-between items-center text-xs text-white/40">
          <p>Showing {sortedProducts.length} of {products.length} products</p>
          {(activeCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                if (setGlobalCategory) setGlobalCategory('All');
                if (setGlobalSearch) setGlobalSearch('');
              }}
              className="text-amber-400 hover:text-amber-300 font-semibold underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {sortedProducts.length > 0 ? (
            <motion.div
              variants={listContainerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10"
              key={`${activeCategory}-${sortBy}-${searchQuery}`}
            >
              {sortedProducts.map((product, i) => {
                const isWishlisted = wishlist.includes(product.id);
                const isAdded = cartFeedback === product.id;
                const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);

                return (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    className="product-card rounded-2xl overflow-hidden group relative flex flex-col justify-between animate-fade"
                  >
                    {/* Badge left */}
                    {product.badge && (
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                          style={{
                            background: product.badge === 'Sale' ? 'linear-gradient(135deg, #ef4444, #dc2626)' :
                              product.badge === 'New' ? 'linear-gradient(135deg, #7c3aed, #db2777)' :
                              product.badge === 'Luxury' ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                              'linear-gradient(135deg, #db2777, #7c3aed)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                          }}
                        >
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Discount badge right */}
                    <div className="absolute top-3.5 right-12 z-10">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-green-600 shadow-md">
                        -{discount}%
                      </span>
                    </div>

                    {/* Wishlist toggle */}
                    <motion.button
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 border border-white/10 backdrop-blur-md"
                      onClick={(e) => handleWishlistToggle(product.id, e)}
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.6)' }}
                    >
                      <FiHeart
                        size={14}
                        className={isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white/80'}
                      />
                    </motion.button>

                    {/* Visual Container */}
                    <div
                      className={`relative h-56 flex items-center justify-center bg-gradient-to-br ${product.bgColor} overflow-hidden cursor-pointer`}
                      onClick={() => {
                        if (onProductSelect) onProductSelect(product);
                      }}
                    >
                      {/* Decorative backdrop glow */}
                      <div
                        className="absolute w-36 h-36 rounded-full opacity-20 filter blur-xl"
                        style={{
                          background: `linear-gradient(135deg, ${
                            product.color.includes('amber') ? '#f59e0b' : 
                            product.color.includes('purple') ? '#7c3aed' : 
                            product.color.includes('green') ? '#22c55e' :
                            product.color.includes('teal') ? '#0d9488' : '#db2777'
                          }, transparent)`
                        }}
                      />

                      {/* Animated Floating Emoji */}
                      <motion.div
                        className="relative z-10"
                        style={{ fontSize: 90 }}
                        animate={{
                          y: [0, -12, 0],
                          rotate: [0, 4, -4, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: 'easeInOut',
                        }}
                      >
                        {product.emoji}
                      </motion.div>

                      {/* Sweep Shine Effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                          backgroundSize: '200% 100%',
                        }}
                        animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />

                      {/* Premium Quick View Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <motion.button
                          className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-amber-400/50 flex items-center gap-2 shadow-2xl backdrop-blur-md transition-all duration-300"
                          initial={{ opacity: 0, y: 15 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                            setModalQty(1);
                            setModalTab('ingredients');
                          }}
                        >
                          <FiEye size={14} />
                          Quick View
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Metadata Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Category tag */}
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500 block mb-1">
                          {product.category}
                        </span>

                        {/* Product Title */}
                        <h3
                          className="text-white font-bold text-lg mb-2 group-hover:text-amber-200 transition-colors leading-tight cursor-pointer"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          onClick={() => {
                            if (onProductSelect) onProductSelect(product);
                          }}
                        >
                          {product.name}
                        </h3>

                        {/* Description snippet */}
                        <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div>
                        {/* Rating block */}
                        <div className="flex items-center gap-2 mb-4 bg-white/2 p-1.5 rounded-lg border border-white/5 w-fit">
                          <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map(s => (
                              <FaStar
                                key={s}
                                size={11}
                                className={s <= Math.floor(product.rating) ? 'fill-current' : 'text-white/10'}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-amber-400">{product.rating}</span>
                          <span className="text-[10px] text-white/30">({product.reviews})</span>
                        </div>

                        {/* Price block */}
                        <div className="flex items-baseline gap-2.5 mb-4">
                          <span className="text-2xl font-black gold-gradient">
                            ₹{product.salePrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-white/30 line-through">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>

                        {/* CTA button */}
                        <motion.button
                          className="w-full py-3 rounded-xl font-semibold text-xs text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
                          style={{
                            background: isAdded
                              ? 'linear-gradient(135deg, #10b981, #059669)'
                              : 'linear-gradient(135deg, #7c3aed, #db2777)',
                            boxShadow: isAdded
                              ? '0 6px 20px rgba(16,185,129,0.3)'
                              : '0 0 0 rgba(0,0,0,0)',
                          }}
                          onClick={(e) => handleAddToCart(product, 1, e)}
                          whileHover={{
                            boxShadow: isAdded ? '' : '0 6px 20px rgba(124,58,237,0.4)',
                            y: -2,
                          }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <FiShoppingCart size={14} />
                          {isAdded ? '✓ Added to Cart!' : 'Add to Cart'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20 glass border border-white/5 rounded-3xl"
            >
              <div className="text-6xl mb-4">🧴🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                No Products Found
              </h3>
              <p className="text-white/50 text-sm max-w-md mx-auto mb-6">
                We couldn't find any shampoo formulas matching "{searchQuery}". Try adjusting your keywords or clearing the category filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                  if (setGlobalCategory) setGlobalCategory('All');
                  if (setGlobalSearch) setGlobalSearch('');
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold btn-luxury text-white"
              >
                Clear Search & Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop blur overlay */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-xl"
              onClick={() => setSelectedProduct(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Body */}
            <motion.div
              className="relative bg-[#0d041c]/95 border border-white/10 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all duration-200"
              >
                <FiX size={18} />
              </button>

              {/* Left Side: Product Image Visual */}
              <div
                className={`w-full md:w-5/12 bg-gradient-to-br ${selectedProduct.bgColor} p-8 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-full overflow-hidden`}
              >
                {/* Floating bubble effects in modal */}
                <div className="absolute inset-0 opacity-40">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute rounded-full border border-white/20 bg-white/5"
                      style={{
                        width: Math.random() * 20 + 8,
                        height: Math.random() * 20 + 8,
                        left: `${Math.random() * 80 + 10}%`,
                        bottom: -30,
                      }}
                      animate={{
                        y: [-20, -(window.innerHeight / 2)],
                        x: [0, Math.sin(idx) * 30],
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{
                        duration: Math.random() * 6 + 5,
                        delay: Math.random() * 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  ))}
                </div>

                {/* Big Floating Emoji */}
                <motion.div
                  className="relative z-10 text-[120px] md:text-[150px] filter drop-shadow-[0_20px_50px_rgba(245,158,11,0.3)] select-none"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 4, -4, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {selectedProduct.emoji}
                </motion.div>

                {/* Background radial glow */}
                <div
                  className="absolute w-64 h-64 rounded-full opacity-30 filter blur-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${
                      selectedProduct.color.includes('amber') ? '#f59e0b' : 
                      selectedProduct.color.includes('purple') ? '#7c3aed' : '#db2777'
                    }, transparent)`
                  }}
                />

                {/* Badge inside modal */}
                {selectedProduct.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-black/40 border border-white/10"
                    >
                      {selectedProduct.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Side: Product Details & Custom Options */}
              <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  {/* Category */}
                  <span className="text-xs uppercase tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500 block mb-1">
                    {selectedProduct.category}
                  </span>

                  {/* Title */}
                  <h2
                    className="text-2xl md:text-3xl font-black text-white leading-tight mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {selectedProduct.name}
                  </h2>

                  {/* Rating Block */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => (
                        <FaStar
                          key={s}
                          size={14}
                          className={s <= Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-white/10'}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-amber-400">{selectedProduct.rating}</span>
                    <span className="text-xs text-white/40">| {selectedProduct.reviews.toLocaleString()} verified reviews</span>
                  </div>

                  {/* Pricing Details */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <span className="text-3xl font-black gold-gradient">
                      ₹{selectedProduct.salePrice.toLocaleString()}
                    </span>
                    <span className="text-base text-white/30 line-through">
                      ₹{selectedProduct.price.toLocaleString()}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold text-green-500 bg-green-500/10 border border-green-500/20">
                      Save {Math.round(((selectedProduct.price - selectedProduct.salePrice) / selectedProduct.price) * 100)}%
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Tab Control */}
                  <div className="flex border-b border-white/10 gap-6 mb-4">
                    {['ingredients', 'benefits', 'usage'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setModalTab(tab)}
                        className="pb-2.5 text-xs font-semibold uppercase tracking-wider relative text-white/60 hover:text-white transition-colors"
                        style={{ color: modalTab === tab ? '#fff' : '' }}
                      >
                        {tab}
                        {modalTab === tab && (
                          <motion.div
                            layoutId="modalTabBorder"
                            className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{ background: 'linear-gradient(90deg, #f59e0b, #db2777)' }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-[80px] text-xs text-white/50 leading-relaxed mb-6">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={modalTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                      >
                        {getProductSpecs(selectedProduct)[modalTab]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  {/* Stepper qty and Add-to-cart row */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                      <motion.button
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        onClick={() => setModalQty(q => Math.max(1, q - 1))}
                        whileTap={{ scale: 0.8 }}
                      >
                        <FiMinus size={14} />
                      </motion.button>
                      <span className="w-10 text-center font-bold text-sm text-white select-none">
                        {modalQty}
                      </span>
                      <motion.button
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        onClick={() => setModalQty(q => q + 1)}
                        whileTap={{ scale: 0.8 }}
                      >
                        <FiPlus size={14} />
                      </motion.button>
                    </div>

                    {/* Add to Cart inside Modal */}
                    <motion.button
                      className="flex-1 min-w-[150px] py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 btn-luxury shadow-xl"
                      onClick={() => {
                        handleAddToCart(selectedProduct, modalQty);
                        setSelectedProduct(null);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiShoppingCart size={16} />
                      Add {modalQty} to Cart — ₹{(selectedProduct.salePrice * modalQty).toLocaleString()}
                    </motion.button>

                    {/* Wishlist inside modal */}
                    <motion.button
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white hover:border-rose-400/50 hover:bg-rose-500/5 transition-all"
                      onClick={() => handleWishlistToggle(selectedProduct.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiHeart
                        size={18}
                        className={wishlist.includes(selectedProduct.id) ? 'fill-rose-500 text-rose-500' : 'text-white/70'}
                      />
                    </motion.button>
                  </div>

                  {/* Guarantee banner */}
                  <p className="text-[10px] text-white/30 text-center mt-4">
                    ✦ Free delivery on orders above ₹1,999 • 100% money back guarantee
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Toast Notification */}
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

export default Collections;
