import React from 'react';
import { motion } from 'framer-motion';
import { brands } from '../data/products';

const BrandLogo = ({ brand, index }) => (
  <motion.div
    className="flex items-center justify-center p-6 rounded-2xl cursor-pointer group relative overflow-hidden"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05, borderColor: 'rgba(245,158,11,0.3)' }}
  >
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
      style={{ background: 'radial-gradient(circle at center, rgba(245,158,11,0.06), transparent 70%)' }}
    />

    <div className="text-center relative z-10">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
        style={{
          background: `linear-gradient(135deg, ${brand.color}40, ${brand.color}20)`,
          border: `1px solid ${brand.color}60`,
          color: brand.color,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {brand.letter}
      </div>
      <p className="text-white/50 text-sm font-medium group-hover:text-white/80 transition-colors">
        {brand.name}
      </p>
    </div>
  </motion.div>
);

const Brands = () => (
  <section className="py-24 relative" style={{ background: '#06000f' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm uppercase tracking-widest gold-gradient font-semibold mb-3">✦ Our Partners</p>
        <h2
          className="text-4xl lg:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Trusted{' '}
          <span className="gradient-text">Brands</span>
        </h2>
        <p className="text-white/50 max-w-md mx-auto">
          We partner exclusively with the world's most prestigious hair care houses.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {brands.map((brand, i) => (
          <BrandLogo key={brand.name} brand={brand} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Brands;
