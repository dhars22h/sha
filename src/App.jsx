import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Products from './components/Products';
import Reviews from './components/Reviews';
import Brands from './components/Brands';
import OfferBanner from './components/OfferBanner';
import Footer from './components/Footer';
import Collections from './components/Collections';
import ProductDetails from './components/ProductDetails';
import Contact from './components/Contact';
import ReviewsPage from './components/ReviewsPage';
import FAQPage from './components/FAQPage';

// Global floating bubbles background
const GlobalBubbles = () => {
  const bubbles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 5,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 8,
    color: ['#7c3aed', '#db2777', '#f59e0b', '#a78bfa', '#f472b6'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bubbles.map(b => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            bottom: -20,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${b.color}30)`,
            border: `1px solid ${b.color}40`,
          }}
          animate={{
            y: [0, -(window.innerHeight + 100)],
            x: [0, Math.sin(b.id) * 60],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// Custom cursor follower
const CursorFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      className="fixed z-50 pointer-events-none rounded-full hidden lg:block"
      style={{
        x: springX,
        y: springY,
        width: 32,
        height: 32,
        background: 'radial-gradient(circle, rgba(245,158,11,0.3), rgba(124,58,237,0.1))',
        border: '1px solid rgba(245,158,11,0.4)',
        mixBlendMode: 'screen',
      }}
    />
  );
};

// Scroll-to-top button
const ScrollTop = () => {
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.button
      className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
      style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      ↑
    </motion.button>
  );
};

// Section divider with shimmer
const SectionDivider = () => (
  <div className="relative h-px overflow-hidden">
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), rgba(124,58,237,0.4), rgba(219,39,119,0.4), transparent)' }}
    />
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const [activeProduct, setActiveProduct] = useState(null);

  // When changing views, scroll to top
  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSelect = (product) => {
    setActiveProduct(product);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen" style={{ background: '#0a0014' }}>
      {/* Global background bubbles */}
      <GlobalBubbles />

      {/* Custom cursor */}
      <CursorFollower />

      {/* Main content */}
      <div className="relative z-10">
        <Navbar 
          cartCount={cartCount} 
          currentView={currentView}
          setView={navigateTo}
          setSelectedCategory={setSelectedCategory}
          setSearchQuery={(query) => {
            setSearchQuery(query);
            if (query) {
              setCurrentView('collections');
            }
          }}
        />

        {currentView === 'home' ? (
          <>
            <Hero setView={navigateTo} />
            <SectionDivider />
            <div id="categories-section">
              <Categories setView={navigateTo} setSelectedCategory={setSelectedCategory} />
            </div>
            <SectionDivider />
            <div id="products-section">
              <Products 
                setView={navigateTo} 
                setSelectedCategory={setSelectedCategory} 
                setSelectedProduct={handleProductSelect}
              />
            </div>
            <SectionDivider />
            <div id="offers-section">
              <OfferBanner />
            </div>
            <SectionDivider />
            <div id="reviews-section">
              <Reviews />
            </div>
            <SectionDivider />
            <div id="brands-section">
              <Brands />
            </div>
          </>
        ) : currentView === 'collections' ? (
          <Collections 
            initialCategory={selectedCategory} 
            initialSearch={searchQuery}
            setSelectedCategory={setSelectedCategory}
            setSearchQuery={setSearchQuery}
            cartCount={cartCount}
            setCartCount={setCartCount}
            setSelectedProduct={handleProductSelect}
          />
        ) : currentView === 'details' ? (
          <ProductDetails 
            product={activeProduct}
            setView={navigateTo}
            setSelectedProduct={handleProductSelect}
            setCartCount={setCartCount}
          />
        ) : currentView === 'reviews' ? (
          <ReviewsPage />
        ) : currentView === 'faq' ? (
          <FAQPage setView={navigateTo} />
        ) : (
          <Contact />
        )}
        
        <div id="about-section">
          <Footer setView={navigateTo} />
        </div>
      </div>

      {/* Scroll to top */}
      <ScrollTop />
    </div>
  );
}

export default App;
