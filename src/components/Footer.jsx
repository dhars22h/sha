import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import AnimatedLogo from './AnimatedLogo';

const FooterLink = ({ children }) => (
  <motion.a
    href="#"
    className="block text-white/50 hover:text-white text-sm py-1 transition-colors"
    whileHover={{ x: 4, color: '#f59e0b' }}
  >
    {children}
  </motion.a>
);

const SocialButton = ({ icon: Icon, color }) => (
  <motion.a
    href="#"
    className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all"
    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
    whileHover={{ scale: 1.15, background: color, borderColor: 'transparent' }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={16} />
  </motion.a>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer
      className="relative overflow-hidden pt-20 pb-8"
      style={{
        background: 'linear-gradient(180deg, #06000f 0%, #0a0014 100%)',
        borderTop: '1px solid rgba(245,158,11,0.1)',
      }}
    >
      {/* Glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), rgba(124,58,237,0.5), transparent)' }}
      />

      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <AnimatedLogo size="nav" className="mb-4 justify-start" />
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              India's most luxurious hair care brand, crafted for those who believe beautiful hair is a form of self-respect.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <FiMapPin size={14} className="text-amber-400 flex-shrink-0" />
                Mumbai, Maharashtra, India
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <FiPhone size={14} className="text-amber-400 flex-shrink-0" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <FiMail size={14} className="text-amber-400 flex-shrink-0" />
                hello@shansshampoo.com
              </div>
            </div>
            <div className="flex gap-3">
              <SocialButton icon={FiInstagram} color="linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" />
              <SocialButton icon={FiFacebook} color="#1877f2" />
              <SocialButton icon={FiTwitter} color="#1da1f2" />
              <SocialButton icon={FiYoutube} color="#ff0000" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 gold-gradient">
              Quick Links
            </h4>
            <div className="space-y-1">
              {['Home', 'Shop All', 'New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards', 'Loyalty Program'].map(l => (
                <FooterLink key={l}>{l}</FooterLink>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 gold-gradient">
              Customer Service
            </h4>
            <div className="space-y-1">
              {['Track My Order', 'Returns & Exchanges', 'Shipping Policy', 'FAQ', 'Contact Us', 'Size Guide', 'Loyalty Points'].map(l => (
                <FooterLink key={l}>{l}</FooterLink>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 gold-gradient">
              Join Our World
            </h4>
            <p className="text-white/40 text-sm mb-4">
              Get exclusive offers, hair care tips, and early access to new launches.
            </p>
            <div className="relative mb-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none pr-12"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
              />
              <motion.button
                onClick={handleSubscribe}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiArrowRight size={14} />
              </motion.button>
            </div>

            {subscribed && (
              <motion.p
                className="text-green-400 text-xs"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ You're subscribed! Welcome to the luxury circle.
              </motion.p>
            )}

            <p className="text-white/25 text-xs mt-2">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>

            {/* Payment icons */}
            <div className="mt-6">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">We Accept</p>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'MC', 'UPI', 'GPay', 'PayTM'].map(p => (
                  <span
                    key={p}
                    className="px-2 py-1 rounded text-xs text-white/50 font-semibold"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), rgba(124,58,237,0.3), transparent)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © 2025 Shan's Shampoo. All rights reserved. Made with ✦ in India.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(l => (
              <motion.a
                key={l}
                href="#"
                className="text-white/30 text-xs hover:text-white/60 transition-colors"
                whileHover={{ color: '#f59e0b' }}
              >
                {l}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
