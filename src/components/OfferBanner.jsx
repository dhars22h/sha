import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const CountdownBox = ({ value, label }) => (
  <motion.div
    className="flex flex-col items-center"
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
  >
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-black text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(219,39,119,0.3))',
        border: '1px solid rgba(245,158,11,0.4)',
        boxShadow: '0 0 20px rgba(124,58,237,0.3)',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2), transparent)' }}
      />
      {String(value).padStart(2, '0')}
    </div>
    <p className="text-white/50 text-xs uppercase tracking-widest mt-2">{label}</p>
  </motion.div>
);

const FloatingBubble = ({ size, x, y, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(124,58,237,0.2))',
      border: '1px solid rgba(255,255,255,0.3)',
    }}
    animate={{
      y: [0, -40, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{ duration: 5 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const OfferBanner = () => {
  const [time, setTime] = useState({ hours: 11, minutes: 47, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden offer-banner">
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(124,58,237,0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(219,39,119,0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(245,158,11,0.1) 0%, transparent 40%)
          `,
        }}
      />

      {/* Animated grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating bubbles */}
      <FloatingBubble size={20} x={5} y={20} delay={0} />
      <FloatingBubble size={12} x={15} y={70} delay={1} />
      <FloatingBubble size={25} x={85} y={30} delay={2} />
      <FloatingBubble size={16} x={90} y={75} delay={0.5} />
      <FloatingBubble size={10} x={50} y={10} delay={3} />
      <FloatingBubble size={18} x={70} y={85} delay={1.5} />

      {/* Lotion splash effect */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${15 * i + 10}%`,
            bottom: '5%',
            width: 60,
            height: 60,
            borderRadius: '50% 50% 30% 30%',
            background: `linear-gradient(135deg, rgba(${i === 1 ? '124,58,237' : i === 2 ? '219,39,119' : '245,158,11'},0.3), transparent)`,
            filter: 'blur(8px)',
          }}
          animate={{
            y: [0, -20, 0],
            scaleY: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            background: 'rgba(245,158,11,0.15)',
            border: '1px solid rgba(245,158,11,0.4)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={{ boxShadow: ['0 0 0px rgba(245,158,11,0)', '0 0 20px rgba(245,158,11,0.4)', '0 0 0px rgba(245,158,11,0)'] }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Limited Time Offer</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Flat{' '}
          <motion.span
            className="gradient-text"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            40% OFF
          </motion.span>
          <br />
          <span className="text-white">Premium Hair Care Collection</span>
        </motion.h2>

        <motion.p
          className="text-white/50 text-lg mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Exclusive discount on our entire luxury range. Treat your hair to the best — before time runs out.
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="flex items-center justify-center gap-4 sm:gap-6 mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <CountdownBox value={time.hours} label="Hours" />
          <motion.span
            className="text-3xl font-black gold-gradient pb-4"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            :
          </motion.span>
          <CountdownBox value={time.minutes} label="Minutes" />
          <motion.span
            className="text-3xl font-black gold-gradient pb-4"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            :
          </motion.span>
          <CountdownBox value={time.seconds} label="Seconds" />
        </motion.div>

        {/* CTA */}
        <motion.button
          className="btn-luxury px-10 py-4 rounded-full font-bold text-white text-lg flex items-center gap-3 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now & Save 40%
          <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <FiArrowRight size={20} />
          </motion.span>
        </motion.button>

        {/* Fine print */}
        <p className="text-white/30 text-xs mt-4">
          *Offer valid on selected products. While stocks last.
        </p>
      </div>
    </section>
  );
};

export default OfferBanner;
