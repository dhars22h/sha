import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSliders } from 'react-icons/fi';
import { categories } from '../data/products';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const sortOptions = ['Bestseller', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Newest'];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchProducts } = useProducts();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('Bestseller');

  useEffect(() => {
    setSearch(searchParams.get('q') || '');
    setCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  useEffect(() => {
    const params = {};
    if (search) params.q = search;
    if (category !== 'All') params.category = category;
    setSearchParams(params, { replace: true });
  }, [search, category, setSearchParams]);

  const filtered = useMemo(() => {
    let list = searchProducts(search, category);
    switch (sortBy) {
      case 'Price: Low to High':
        return [...list].sort((a, b) => a.salePrice - b.salePrice);
      case 'Price: High to Low':
        return [...list].sort((a, b) => b.salePrice - a.salePrice);
      case 'Rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      case 'Newest':
        return [...list].sort((a, b) => b.id - a.id);
      default:
        return [...list].sort((a, b) => b.reviews - a.reviews);
    }
  }, [search, category, sortBy, searchProducts]);

  const categoryFilters = ['All', ...categories.map((c) => c.name)];

  return (
    <section className="pt-28 pb-24 relative min-h-screen" style={{ background: '#06000f' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(219,39,119,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(124,58,237,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm uppercase tracking-widest gold-gradient font-semibold mb-3">✦ Luxury Collection</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-luxury">
            Shop All <span className="gradient-text">Products</span>
          </h1>
          <p className="text-white/50 max-w-md mx-auto">
            Discover premium formulas crafted for every hair type.
          </p>
        </motion.div>

        {/* Search & Sort */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center glass rounded-2xl px-4 py-3 gap-3">
            <FiSearch className="text-white/40 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <FiSliders className="text-white/40 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-2xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {sortOptions.map((o) => (
                <option key={o} value={o} className="bg-gray-900">{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categoryFilters.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: category === cat ? 'linear-gradient(135deg, #7c3aed, #db2777)' : 'rgba(255,255,255,0.05)',
                border: category === cat ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                color: category === cat ? '#fff' : 'rgba(255,255,255,0.6)',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <p className="text-white/40 text-sm mb-6">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          {search && <> for &ldquo;{search}&rdquo;</>}
          {category !== 'All' && <> in {category}</>}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20 glass rounded-3xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2 font-luxury">No Products Found</h3>
            <p className="text-white/50 mb-6 max-w-sm mx-auto">
              We couldn&apos;t find any products matching your search. Try a different keyword or category.
            </p>
            <motion.button
              className="px-8 py-3 rounded-full font-semibold text-white btn-luxury"
              whileHover={{ scale: 1.05 }}
              onClick={() => { setSearch(''); setCategory('All'); }}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
