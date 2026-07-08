import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronDown, FiHelpCircle, FiX, FiArrowRight } from 'react-icons/fi';

// Local floating bubbles for the FAQ page header
const HeaderBubbles = () => {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 6,
    x: Math.random() * 90 + 5,
    y: Math.random() * 80 + 10,
    delay: Math.random() * 3,
    duration: Math.random() * 8 + 6,
    color: ['#a3b18a', '#606c38', '#28543f', '#588157', '#b5c49f'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map(b => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${b.color}20)`,
            border: `1px solid ${b.color}30`,
            boxShadow: `0 0 8px ${b.color}15`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(b.id) * 15, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const FAQPage = ({ setView }) => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const categoriesList = ['General', 'Hair Care', 'Orders & Shipping', 'Returns & Refunds', 'Payments & Security'];

  const faqData = [
    {
      category: "General",
      q: "What makes Shan's Shampoo premium compared to ordinary shampoos?",
      a: "Shan's Shampoo is an artisanal blend of 100% natural cold-pressed botanicals, rare Moroccan Argan oils, and clinical hair-growth actives like Biotin. Our signature luxury restorations contain suspended particles of real 24K gold and collagen which rebuild hair structure at the molecular level, delivering salon-grade radiance.",
      tags: ["gold", "luxury", "ingredients"]
    },
    {
      category: "General",
      q: "Are your products cruelty-free and vegan?",
      a: "Yes, absolutely. None of our products are tested on animals. We are proudly 100% cruelty-free. All our formulas (with the exception of raw organic honey extracts in select custom conditioners) are fully vegan and sulfate-free.",
      tags: ["vegan", "cruelty-free", "testing"]
    },
    {
      category: "General",
      q: "Are your shampoos sulfate-free and paraben-free?",
      a: "Every single one of our shampoo formulations is 100% free from sulfates, parabens, silicones, and harsh synthetic chemicals. We believe beautiful hair is a form of self-respect, and that starts with clean, non-toxic formulations.",
      tags: ["sulfate-free", "silicone-free", "chemicals"]
    },
    {
      category: "Hair Care",
      q: "Which Shan's formulation is best for severe hair fall?",
      a: "We highly recommend our Biotin Hair Growth Accelerator or Rose Gold Repair Serum Shampoo. They stimulate follicle roots, accelerate blood circulation to the scalp, and decrease hair shedding by up to 84% in just 4 weeks.",
      tags: ["hair fall", "growth", "biotin"]
    },
    {
      category: "Hair Care",
      q: "Can I use your shampoos on color-treated or chemically straightened hair?",
      a: "Yes! All our shampoos are 100% sulfate-free and color-safe. For blonde, platinum, or silver hair, we specifically recommend our Purple Violet Toning Elixir to prevent brassiness and boost shine.",
      tags: ["color protection", "blonde", "keratin"]
    },
    {
      category: "Hair Care",
      q: "How often should I wash my hair with Shan's Shampoo?",
      a: "Because our formulas are extremely gentle and free from stripping detergents, you can wash your hair 2 to 3 times a week. For oily hair types using our Charcoal Detox, twice a week is usually sufficient to maintain balanced sebum.",
      tags: ["wash", "hair type", "scalp"]
    },
    {
      category: "Orders & Shipping",
      q: "How long does delivery take across India?",
      a: "We dispatch all orders within 24 hours from our Mumbai headquarters. Delivery to metros takes 2-4 business days, while other locations take 4-7 business days. Express shipping options are available at checkout.",
      tags: ["shipping", "delivery", "mumbai"]
    },
    {
      category: "Orders & Shipping",
      q: "Do you ship internationally?",
      a: "Yes, we ship globally! International deliveries take 7-14 business days depending on customs processing in your destination country.",
      tags: ["international", "worldwide", "delivery"]
    },
    {
      category: "Orders & Shipping",
      q: "How can I track my order?",
      a: "Once your order is shipped, you will receive a tracking link via email and WhatsApp. You can also view details under the 'Track My Order' link in our website footer.",
      tags: ["tracking", "order status", "concierge"]
    },
    {
      category: "Returns & Refunds",
      q: "What is your return policy?",
      a: "We offer a 30-day, 100% satisfaction guarantee. If you feel the formula is not suited to your hair type, you can return the bottle (even if partially used) for a full refund or exchange.",
      tags: ["returns", "refunds", "satisfaction"]
    },
    {
      category: "Returns & Refunds",
      q: "How do I initiate a refund?",
      a: "Simply contact our Care Concierge at hello@shansshampoo.com with your order number. Our team will arrange a free home pickup for the item and process your refund within 48 hours of retrieval.",
      tags: ["refund", "pickup", "concierge"]
    },
    {
      category: "Payments & Security",
      q: "What payment methods do you accept?",
      a: "We accept all major credit and debit cards (Visa, Mastercard, RuPay, Amex), UPI transactions (GPay, PhonePe, Paytm), Netbanking, and Cash on Delivery (COD) for pin codes across India.",
      tags: ["upi", "card", "cash on delivery"]
    },
    {
      category: "Payments & Security",
      q: "Is my payment information secure?",
      a: "Yes, completely. All transactions are processed through 3D-Secure payment gateways encrypted with 256-bit SSL technology. We never store your card details or credentials on our servers.",
      tags: ["security", "ssl", "payment gateway"]
    }
  ];

  // Filter FAQs based on active category OR search query
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = searchQuery
      ? faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      : faq.category === activeCategory;
    return matchesSearch;
  });

  const toggleAccordion = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleConciergeClick = () => {
    if (setView) setView('contact');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative bg-[#071911] text-white">
      {/* Background radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(96,108,56,0.06) 0%, transparent 60%), radial-gradient(circle at 10% 70%, rgba(40,84,63,0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(163,177,138,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative py-12 md:py-16 text-center rounded-3xl overflow-hidden glass border border-white/5 mb-12">
          <HeaderBubbles />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest gold-gradient border border-sage-500/30 bg-sage-500/5">
                ✦ Shan's Shampoo Atelier Help Desk ✦
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 section-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
            >
              Frequently Asked <span className="gradient-text">Questions</span>
            </motion.h1>

            <motion.p
              className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Find instant answers to questions regarding our formulations, shipping timelines, order tracking, and refund guarantees.
            </motion.p>

            {/* Premium FAQ Search Bar */}
            <motion.div
              className="max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative flex items-center p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md focus-within:border-pink-500/50 focus-within:shadow-[0_0_20px_rgba(219,39,119,0.3)] transition-all duration-300">
                <div className="pl-4 text-white/50">
                  <FiSearch size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Ask a question (e.g. shipping, biotin, argan)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setExpandedIndex(null); // Reset accordion
                  }}
                  className="w-full bg-transparent border-0 text-white placeholder-white/40 text-sm py-2 px-3 focus:outline-none focus:ring-0"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 rounded-full text-white/40 hover:text-white/80 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CATEGORY FILTERS ROW (Hidden when search query is active) */}
        <AnimatePresence>
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/5 relative z-20 justify-start sm:justify-center"
            >
              <div className="flex gap-2 min-w-max">
                {categoriesList.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setExpandedIndex(null);
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold relative transition-colors duration-300"
                      style={{
                        border: isActive ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeFAQFilter"
                          className="absolute inset-0 rounded-full"
                          style={{ background: 'linear-gradient(135deg, #28543f, #606c38)', zIndex: -1 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {cat}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACCORDION FAQ ITEMS LIST */}
        <div className="space-y-4 mb-16 min-h-[250px]">
          <AnimatePresence mode="wait">
            {filteredFAQs.length > 0 ? (
              <motion.div
                key={activeCategory + '-' + searchQuery}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredFAQs.map((faq, index) => {
                  // If searching, auto expand matching answers
                  const isOpen = searchQuery ? true : expandedIndex === index;
                  
                  return (
                    <motion.div
                      key={index}
                      className="rounded-2xl glass border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300"
                      style={{
                        borderColor: isOpen ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.05)',
                        boxShadow: isOpen ? '0 10px 30px rgba(124,58,237,0.1)' : 'none',
                      }}
                    >
                      {/* Accordion Question Header */}
                      <button
                        onClick={() => !searchQuery && toggleAccordion(index)}
                        disabled={!!searchQuery} // Disable accordion toggle when search query forces expand
                        className={`w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white transition-colors select-none ${
                          searchQuery ? '' : 'cursor-pointer hover:bg-white/2'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <FiHelpCircle className="text-sage-300 flex-shrink-0" size={18} />
                          <span>{faq.q}</span>
                        </span>
                        
                        {!searchQuery && (
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-white/40 flex-shrink-0"
                          >
                            <FiChevronDown size={18} />
                          </motion.div>
                        )}
                      </button>

                      {/* Accordion Answer Content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="p-5 pt-0 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/5 bg-[#140b24]/20">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              // Empty State
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 glass border border-white/5 rounded-3xl"
              >
                <span className="text-5xl block mb-3">🔍🛡️</span>
                <h4 className="text-lg font-bold text-white mb-1">No FAQs Found</h4>
                <p className="text-xs text-white/40 max-w-sm mx-auto">
                  We couldn't find any questions matching your query "{searchQuery}". Try using different terms or contact our concierge.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* HELP CONCIERGE CTA CARD */}
        <motion.section
          className="p-6 sm:p-8 rounded-3xl glass border border-white/5 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Faint gold mesh background glow */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(163,177,138,0.2) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Still have questions?
            </h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
              Our care concierge is ready to help you with personalized consultations, order queries, or custom formulations. Let our Atelier experts guide you.
            </p>
            <motion.button
              onClick={handleConciergeClick}
              className="px-6 py-3 rounded-xl font-bold text-xs text-white btn-luxury inline-flex items-center gap-2 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Concierge
              <FiArrowRight size={13} className="animate-pulse" />
            </motion.button>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default FAQPage;
