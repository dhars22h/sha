import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import AnimatedLogo from './AnimatedLogo';

const Navbar = ({ cartCount = 3 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Products', 'Categories', 'Brands', 'Offers', 'About'];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className="navbar-glass transition-all duration-300"
          style={{
            boxShadow: scrolled ? '0 4px 30px rgba(124,58,237,0.2)' : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.02 }}
              >
                <AnimatedLogo size="nav" className="py-1" />
              </motion.div>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                    style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}
                    whileHover={{ y: -2 }}
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #f59e0b, #db2777)' }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Icons */}
              <div className="flex items-center gap-3 lg:gap-4">
                {/* Search */}
                <motion.button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-full text-white/70 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiSearch size={18} />
                </motion.button>

                {/* Wishlist */}
                <motion.button
                  className="hidden sm:flex p-2 rounded-full text-white/70 hover:text-rose-400 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiHeart size={18} />
                </motion.button>

                {/* Cart */}
                <motion.button
                  className="relative p-2 rounded-full text-white/70 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiShoppingCart size={18} />
                  {cartCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                      style={{ background: 'linear-gradient(135deg, #db2777, #7c3aed)' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Shop Now button - desktop */}
                <motion.button
                  className="hidden lg:block px-5 py-2 rounded-full text-sm font-semibold text-white btn-luxury"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>

                {/* Mobile menu button */}
                <motion.button
                  className="lg:hidden p-2 rounded-full text-white/70"
                  onClick={() => setMenuOpen(!menuOpen)}
                  whileTap={{ scale: 0.9 }}
                >
                  {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/10 overflow-hidden"
              >
                <div className="max-w-2xl mx-auto px-4 py-3">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full glass">
                    <FiSearch className="text-white/50" />
                    <input
                      type="text"
                      placeholder="Search shampoos, categories, brands..."
                      className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
                      autoFocus
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-16 left-0 right-0 py-6 px-4"
              style={{ background: 'rgba(10,0,20,0.95)', borderBottom: '1px solid rgba(245,158,11,0.2)' }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  className="block py-3 px-4 text-white/80 hover:text-white text-lg font-medium border-b border-white/5"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
              <motion.button
                className="mt-4 w-full py-3 rounded-full font-semibold text-white btn-luxury"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Shop Now
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
