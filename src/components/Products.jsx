import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';

const Products = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', ...categories.map(c => c.name)];

  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <section className="py-24 relative" style={{ background: '#06000f' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(219,39,119,0.06) 0%, transparent 60%), radial-gradient(circle at 20% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-widest gold-gradient font-semibold mb-3">✦ Handpicked for You</p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured{' '}
            <span className="gradient-text">Products</span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Each formula is crafted with precision-selected ingredients for transformative results.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {filters.slice(0, 7).map(filter => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeFilter === filter
                  ? 'linear-gradient(135deg, #7c3aed, #db2777)'
                  : 'rgba(255,255,255,0.05)',
                border: activeFilter === filter
                  ? '1px solid transparent'
                  : '1px solid rgba(255,255,255,0.1)',
                color: activeFilter === filter ? '#fff' : 'rgba(255,255,255,0.6)',
                boxShadow: activeFilter === filter ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-10 py-4 rounded-full font-semibold text-white btn-luxury"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
