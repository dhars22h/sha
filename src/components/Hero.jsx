import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import AnimatedLogo from './AnimatedLogo';
import heroVid from '../assets/videos/hero_bg.mp4';
import arganImg from '../assets/images/argan_shampoo.png';

const ShampooBottle = () => (
  <motion.div
    className="relative z-10"
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  >
    {/* Realistic bottle image showcase */}
    <div className="relative group">
      <img
        src={arganImg}
        alt="Moroccan Argan Oil Shampoo"
        className="w-64 sm:w-72 lg:w-80 h-auto rounded-3xl border border-white/10 relative z-10 transition-transform duration-500 group-hover:scale-105"
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.05)',
          filter: 'drop-shadow(0 0 40px rgba(163,177,138,0.25))',
        }}
      />
      {/* Decorative leaf reflection glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-sage-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
    </div>

    {/* Glow ring shadow */}
    <motion.div
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
      style={{
        width: 160,
        height: 15,
        background: 'radial-gradient(ellipse, rgba(163,177,138,0.4), transparent 70%)',
        filter: 'blur(8px)',
      }}
      animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </motion.div>
);

const Hero = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: '#05120d' }}
    >
      {/* Full-bleed background cinematic video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
      >
        <source src={heroVid} type="video/mp4" />
      </video>

      {/* Forest ambient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(40,84,63,0.15) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(96,108,56,0.1) 0%, transparent 50%)
          `
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(163,177,138,0.08)',
                border: '1px solid rgba(163,177,138,0.25)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest gold-gradient">
                ✦ Organic Hair Care ✦
              </span>
            </motion.div>

            {/* 3D Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="mb-6"
            >
              <AnimatedLogo size="hero" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight font-luxury"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Nourish Strands with{' '}
              <span className="gradient-text">Pure Botanical</span> Science
            </motion.h2>

            {/* Subheading */}
            <motion.p
              className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Experience professional, natural hair care crafted from organic herbs, cold-pressed oils, and essential nutrients. Free from sulfates, parabens, and artificial coloring.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                className="btn-luxury px-8 py-4 rounded-full font-semibold text-white text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
              >
                Shop Collection
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight />
                </motion.span>
              </motion.button>

              <motion.button
                className="px-8 py-4 rounded-full font-semibold text-white text-lg flex items-center justify-center gap-2 group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(163,177,138,0.45)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #28543f, #606c38)' }}
                >
                  <FiPlay size={12} className="ml-0.5" />
                </span>
                Watch Botanical Story
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 mt-10 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '100%', label: 'Organic Extracts' },
                { value: '4.9★', label: 'Customer Rating' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold gold-gradient">{value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right content – Bottle */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
          >
            <ShampooBottle />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <div
          className="w-0.5 h-8 rounded-full"
          style={{ background: 'linear-gradient(180deg, rgba(163,177,138,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
