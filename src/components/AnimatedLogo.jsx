import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const BubbleParticle = ({ size, x, y, delay, duration, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${color}40)`,
      border: `1px solid ${color}60`,
      boxShadow: `0 0 ${size/2}px ${color}40, inset 0 0 ${size/4}px rgba(255,255,255,0.3)`,
    }}
    initial={{ opacity: 0, scale: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 0.8, 0],
      scale: [0, 1, 1.1, 0.8],
      y: [0, -80, -160, -240],
      x: [0, Math.random() > 0.5 ? 20 : -20, Math.random() > 0.5 ? -10 : 10, 5],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
  />
);

const SplashDrop = ({ x, y, delay }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1.5, 2],
    }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 3 }}
  >
    <div style={{
      width: 30,
      height: 30,
      borderRadius: '50% 50% 50% 0',
      background: 'linear-gradient(135deg, rgba(245,158,11,0.6), rgba(219,39,119,0.4))',
      transform: 'rotate(-45deg)',
      boxShadow: '0 0 10px rgba(245,158,11,0.4)'
    }} />
  </motion.div>
);

const RippleEffect = ({ x, y, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none border"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      borderColor: 'rgba(245,158,11,0.3)',
      width: 20,
      height: 20,
      marginLeft: -10,
      marginTop: -10,
    }}
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 8, opacity: 0 }}
    transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: 2 }}
  />
);

const AnimatedLogo = ({ size = 'hero', className = '' }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isHero = size === 'hero';
  const fontSize = isHero ? 'clamp(48px, 8vw, 100px)' : 'clamp(20px, 3vw, 32px)';
  const containerSize = isHero ? { width: '100%', minHeight: 200 } : { width: 'auto', minHeight: 60 };

  const bubbles = isHero ? [
    { size: 12, x: 5, y: 20, delay: 0, duration: 5, color: '#f59e0b' },
    { size: 18, x: 10, y: 60, delay: 1, duration: 6, color: '#7c3aed' },
    { size: 8, x: 20, y: 40, delay: 0.5, duration: 4, color: '#db2777' },
    { size: 15, x: 80, y: 30, delay: 2, duration: 7, color: '#f59e0b' },
    { size: 10, x: 88, y: 70, delay: 0.8, duration: 5, color: '#7c3aed' },
    { size: 20, x: 75, y: 50, delay: 1.5, duration: 6, color: '#db2777' },
    { size: 6, x: 50, y: 10, delay: 3, duration: 4, color: '#fbbf24' },
    { size: 14, x: 35, y: 80, delay: 2.5, duration: 5, color: '#a78bfa' },
    { size: 9, x: 65, y: 85, delay: 0.3, duration: 6, color: '#f472b6' },
    { size: 16, x: 92, y: 20, delay: 1.8, duration: 7, color: '#fcd34d' },
    { size: 7, x: 3, y: 80, delay: 4, duration: 5, color: '#c084fc' },
    { size: 11, x: 55, y: 90, delay: 2.2, duration: 6, color: '#f59e0b' },
  ] : [];

  return (
    <motion.div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ ...containerSize, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bubble particles */}
      {bubbles.map((b, i) => (
        <BubbleParticle key={i} {...b} />
      ))}

      {/* Splash drops */}
      {isHero && (
        <>
          <SplashDrop x={15} y={70} delay={0} />
          <SplashDrop x={82} y={25} delay={1.5} />
          <SplashDrop x={45} y={85} delay={3} />
        </>
      )}

      {/* Ripple effects */}
      {isHero && (
        <>
          <RippleEffect x={10} y={50} delay={0} />
          <RippleEffect x={85} y={60} delay={2} />
          <RippleEffect x={50} y={20} delay={4} />
        </>
      )}

      {/* Main 3D floating logo */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative"
      >
        {/* Glow background */}
        {isHero && (
          <motion.div
            className="absolute inset-0 blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(245,158,11,0.3) 0%, rgba(124,58,237,0.2) 50%, transparent 70%)',
              transform: 'scale(1.5)',
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* 3D depth shadow layers */}
        {isHero && (
          <>
            <div
              className="absolute inset-0 select-none pointer-events-none"
              aria-hidden
              style={{
                fontSize,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontStyle: 'italic',
                color: 'rgba(124,58,237,0.3)',
                transform: 'translate(4px, 4px)',
                filter: 'blur(2px)',
                zIndex: 0,
                whiteSpace: 'nowrap',
              }}
            >
              Shan's Shampoo
            </div>
            <div
              className="absolute inset-0 select-none pointer-events-none"
              aria-hidden
              style={{
                fontSize,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontStyle: 'italic',
                color: 'rgba(219,39,119,0.2)',
                transform: 'translate(8px, 8px)',
                filter: 'blur(4px)',
                zIndex: 0,
                whiteSpace: 'nowrap',
              }}
            >
              Shan's Shampoo
            </div>
          </>
        )}

        {/* Main logo text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1
            className="logo-3d relative"
            style={{
              fontSize,
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontStyle: isHero ? 'italic' : 'normal',
              letterSpacing: isHero ? '-1px' : '0px',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              cursor: 'default',
            }}
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(245,158,11,0.5)) drop-shadow(0 0 40px rgba(124,58,237,0.3))',
                'drop-shadow(0 0 40px rgba(245,158,11,0.8)) drop-shadow(0 0 80px rgba(124,58,237,0.5))',
                'drop-shadow(0 0 20px rgba(245,158,11,0.5)) drop-shadow(0 0 40px rgba(124,58,237,0.3))',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Shan's Shampoo

            {/* Shine sweep overlay */}
            <motion.span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.7) 50%, transparent 70%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backgroundSize: '200% 100%',
                pointerEvents: 'none',
              }}
              animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.h1>

          {/* Tagline under hero logo */}
          {isHero && (
            <motion.p
              className="text-center mt-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(11px, 1.5vw, 16px)',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #f59e0b, #db2777, #7c3aed, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['0% 0', '100% 0', '0% 0'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ✦ Luxury Hair Care ✦
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;
