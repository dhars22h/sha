import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import AnimatedLogo from './AnimatedLogo';

const FloatingOrb = ({ x, y, size, color, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color}40, transparent 70%)`,
      filter: `blur(${size / 3}px)`,
    }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.4, 0.7, 0.4],
      x: [0, 20, -10, 0],
      y: [0, -15, 10, 0],
    }}
    transition={{ duration: 8 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const ShampooBottle = () => (
  <motion.div
    className="relative"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    style={{ filter: 'drop-shadow(0 30px 60px rgba(124,58,237,0.5))' }}
  >
    {/* Stylized shampoo bottle using CSS */}
    <div className="relative" style={{ width: 160, height: 280 }}>
      {/* Bottle body */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: 100,
          height: 220,
          borderRadius: '50px 50px 30px 30px',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(219,39,119,0.8), rgba(245,158,11,0.6))',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 0 40px rgba(124,58,237,0.6), inset 0 0 30px rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shine streak */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            width: '15%',
            height: '100%',
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)',
            borderRadius: 10,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Label area */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '10%',
            right: '10%',
            bottom: '20%',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
          }}
        >
          <span style={{ fontSize: 9, color: '#fcd34d', letterSpacing: 2, fontFamily: 'Inter', textTransform: 'uppercase', textAlign: 'center', padding: '0 4px' }}>
            Shan's<br/>Shampoo
          </span>
          <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)', marginTop: 4, letterSpacing: 1 }}>LUXE</span>
        </div>
      </div>

      {/* Bottle cap */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: 45,
          height: 40,
          top: 15,
          borderRadius: '10px 10px 0 0',
          background: 'linear-gradient(135deg, #fcd34d, #f59e0b)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 0 15px rgba(245,158,11,0.5)',
        }}
      />

      {/* Pump nozzle */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: 10,
          height: 30,
          top: 0,
          borderRadius: 5,
          background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
        }}
      />

      {/* Liquid drips */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 6,
            height: 15,
            borderRadius: '0 0 5px 5px',
            background: 'linear-gradient(180deg, rgba(219,39,119,0.8), rgba(124,58,237,0.4))',
            left: `${35 + i * 15}%`,
            top: '55%',
          }}
          animate={{
            height: [8, 20, 8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
    </div>

    {/* Glow ring */}
    <motion.div
      className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full"
      style={{
        width: 120,
        height: 20,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.6), transparent 70%)',
        filter: 'blur(10px)',
      }}
      animate={{ opacity: [0.4, 0.9, 0.4] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </motion.div>
);

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: 'radial-gradient(ellipse at top, #1a0033 0%, #0a0014 40%, #000 100%)',
      }}
    >
      {/* Background mesh gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(124,58,237,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(219,39,119,0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(245,158,11,0.05) 0%, transparent 60%)
          `
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb x={5} y={10} size={300} color="#7c3aed" delay={0} />
      <FloatingOrb x={75} y={60} size={400} color="#db2777" delay={2} />
      <FloatingOrb x={50} y={80} size={250} color="#f59e0b" delay={4} />
      <FloatingOrb x={85} y={15} size={200} color="#7c3aed" delay={1} />
      <FloatingOrb x={15} y={70} size={180} color="#db2777" delay={3} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest gold-gradient">
                ✦ Premium Collection 2025
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
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Transform Your Hair Into{' '}
              <span className="gradient-text">Pure Luxury</span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              className="text-lg text-white/60 mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Premium shampoo crafted for shine, strength, and confidence. Experience salon-grade hair care from the comfort of your home.
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
              >
                Shop Now
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
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(245,158,11,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                >
                  <FiPlay size={12} />
                </span>
                Explore Collection
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
                { value: '100%', label: 'Natural Ingredients' },
                { value: '4.9★', label: 'Average Rating' },
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
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
          >
            <div className="relative">
              {/* Glow backdrop */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.3), rgba(219,39,119,0.2), transparent 70%)',
                  width: 350,
                  height: 350,
                  top: -35,
                  left: -95,
                  filter: 'blur(30px)',
                }}
              />
              <ShampooBottle />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        <div
          className="w-0.5 h-8 rounded-full"
          style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
