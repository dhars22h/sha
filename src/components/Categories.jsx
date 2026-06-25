import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/products';

const CategoryCard = ({ category, index }) => (
  <motion.div
    className="luxury-card rounded-2xl p-6 text-center cursor-pointer group relative overflow-hidden"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -8, scale: 1.02 }}
  >
    {/* Hover gradient */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: `linear-gradient(135deg, ${category.color.replace('from-', '').split(' ')[0].replace('from-', '')}20, transparent)`,
      }}
    />

    {/* Icon */}
    <motion.div
      className="text-5xl mb-4"
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
    >
      {category.icon}
    </motion.div>

    {/* Name */}
    <h3
      className="text-white font-bold text-lg mb-1"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {category.name}
    </h3>

    {/* Count */}
    <p className="text-sm text-white/40">{category.count} products</p>

    {/* Bottom bar */}
    <div
      className="mt-4 h-0.5 w-0 group-hover:w-full mx-auto transition-all duration-500 rounded-full"
      style={{
        background: `linear-gradient(90deg, ${category.color.includes('amber') ? '#f59e0b' : category.color.includes('teal') ? '#14b8a6' : category.color.includes('purple') ? '#7c3aed' : category.color.includes('blue') ? '#3b82f6' : category.color.includes('green') ? '#22c55e' : '#ec4899'}, transparent)`,
      }}
    />
  </motion.div>
);

const Categories = () => (
  <section className="py-24 relative" style={{ background: 'rgba(10,0,20,0.9)' }}>
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)',
      }}
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm uppercase tracking-widest gold-gradient font-semibold mb-3">✦ Browse by Type</p>
        <h2
          className="text-4xl lg:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Shop by{' '}
          <span className="gradient-text">Hair Type</span>
        </h2>
        <p className="text-white/50 max-w-md mx-auto">
          Find your perfect formula. Every hair type deserves a luxurious, personalised care ritual.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Categories;
