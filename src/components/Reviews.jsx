import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { reviews } from '../data/products';

const ReviewCard = ({ review, index }) => (
  <motion.div
    className="luxury-card rounded-2xl p-6 relative overflow-hidden group"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Quote icon */}
    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <FaQuoteLeft size={48} className="text-amber-400" />
    </div>

    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[1,2,3,4,5].map(s => (
        <FaStar key={s} size={14} className={s <= review.rating ? 'text-amber-400' : 'text-white/20'} />
      ))}
    </div>

    {/* Review text */}
    <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
      "{review.text}"
    </p>

    {/* Product used */}
    <div
      className="inline-block px-3 py-1 rounded-full text-xs mb-4"
      style={{
        background: 'rgba(245,158,11,0.1)',
        border: '1px solid rgba(245,158,11,0.2)',
        color: '#fbbf24',
      }}
    >
      {review.product}
    </div>

    {/* Reviewer */}
    <div className="flex items-center gap-3 border-t border-white/5 pt-4">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
      >
        {review.avatar}
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{review.name}</p>
        <p className="text-white/40 text-xs">{review.location}</p>
      </div>
      <div className="ml-auto">
        <span className="text-xs text-green-400 font-semibold">✓ Verified</span>
      </div>
    </div>
  </motion.div>
);

const Reviews = () => (
  <section className="py-24 relative overflow-hidden" style={{ background: 'rgba(10,0,20,0.95)' }}>
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 60%)' }}
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm uppercase tracking-widest gold-gradient font-semibold mb-3">✦ Real Stories</p>
        <h2
          className="text-4xl lg:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          What Our{' '}
          <span className="gradient-text">Customers Say</span>
        </h2>
        <p className="text-white/50 max-w-md mx-auto">
          Thousands of women across India trust Shan's Shampoo for their luxury hair care journey.
        </p>
      </motion.div>

      {/* Overall rating */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 p-6 rounded-2xl glass max-w-xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <div className="text-6xl font-bold gold-gradient" style={{ fontFamily: "'Playfair Display', serif" }}>4.9</div>
          <div className="flex gap-1 justify-center mt-1">
            {[1,2,3,4,5].map(s => <FaStar key={s} size={16} className="text-amber-400" />)}
          </div>
          <p className="text-white/50 text-sm mt-1">Overall Rating</p>
        </div>
        <div className="w-px h-16 bg-white/10 hidden sm:block" />
        <div className="space-y-1">
          {[['5 stars', 85], ['4 stars', 10], ['3 stars', 4], ['1-2 stars', 1]].map(([label, pct]) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs text-white/40 w-12">{label}</span>
              <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #f59e0b, #db2777)' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className="text-xs text-white/40">{pct}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
      </div>
    </div>
  </section>
);

export default Reviews;
