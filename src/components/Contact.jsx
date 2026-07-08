import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheck, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';

// Local floating bubbles for the Contact page header
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Mock API call transition
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      showToast('Message sent! Our hair experts will contact you soon.');
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });

      // Reset success state after a delay
      setTimeout(() => {
        setIsSent(false);
      }, 4000);
    }, 2000);
  };

  const infoItems = [
    {
      icon: FiPhone,
      title: "Call Our Atelier",
      val: "+91 98765 43210",
      desc: "Mon - Sun, 9am to 6pm IST",
      color: "from-sage-400 to-emerald-600",
      href: "tel:+919876543210"
    },
    {
      icon: FiMail,
      title: "Write to Us",
      val: "hello@shansshampoo.com",
      desc: "For general inquiries & partnerships",
      color: "from-emerald-600 to-forest-700",
      href: "mailto:hello@shansshampoo.com"
    },
    {
      icon: FiMapPin,
      title: "Visit Our Headquarters",
      val: "Atelier Shan, Bandra West",
      desc: "Mumbai, MH - 400050, India",
      color: "from-olive-500 to-sage-600",
      href: "#map"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative bg-[#071911] text-white">
      {/* Background radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(96,108,56,0.06) 0%, transparent 60%), radial-gradient(circle at 10% 70%, rgba(40,84,63,0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(163,177,138,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
                ✦ Shan's Shampoo Care Concierge ✦
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 section-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
            >
              Let's Talk <span className="gradient-text">Hair Care</span>
            </motion.h1>

            <motion.p
              className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-2 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Have questions about our luxury botanical formulas, custom orders, or your hair ritual?
            </motion.p>
            <motion.p
              className="text-white/40 text-xs sm:text-sm max-w-xl mx-auto mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Our concierge team of hair care specialists is here to guide you toward premium hair health.
            </motion.p>
          </div>
        </section>

        {/* MAIN CONTENTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Info Cards & Abstract Map Mockup */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Contact Details Cards */}
            <div className="space-y-4">
              {infoItems.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-5 p-5 rounded-2xl glass border border-white/5 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 group block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, type: 'spring' }}
                  whileHover={{ y: -3 }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} text-white flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-1">{item.title}</h3>
                    <p className="text-white font-bold text-sm sm:text-base mb-0.5 group-hover:text-amber-200 transition-colors">{item.val}</p>
                    <span className="text-white/40 text-xs">{item.desc}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Business Hours Card */}
            <motion.div
              className="p-6 rounded-2xl glass border border-white/5 flex gap-4 items-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-amber-400 flex-shrink-0">
                <FiClock size={18} />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-2">Atelier Hours</h3>
                <div className="space-y-1 text-xs text-white/70">
                  <p className="flex justify-between gap-10">
                    <span className="font-semibold text-white">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM IST</span>
                  </p>
                  <p className="flex justify-between gap-10">
                    <span className="font-semibold text-white">Saturday - Sunday:</span>
                    <span>10:00 AM - 4:00 PM IST</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* HQ Abstract Map Mockup */}
            <motion.div
              id="map"
              className="rounded-2xl glass border border-white/5 p-4 flex flex-col gap-3 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xs uppercase tracking-widest font-bold text-white/40 px-2 flex justify-between items-center">
                <span>Headquarters Map</span>
                <span className="text-[10px] text-amber-400 font-semibold normal-case">✦ Bandra West, Mumbai</span>
              </h3>

              {/* Stylized Vector Map inside SVG */}
              <div className="relative aspect-video rounded-xl bg-[#0f041c] border border-white/5 overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 400 220"
                  className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
                  fill="none"
                >
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGrid)" />

                  {/* Abstract Landmass lines */}
                  <path
                    d="M30 40 C60 20 120 30 150 60 C180 90 200 130 250 150 C300 170 330 120 360 140 C380 150 390 180 370 200 C340 220 280 200 240 180 C200 160 150 170 120 150 C80 120 40 80 30 40 Z"
                    stroke="rgba(245,158,11,0.06)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M100 20 C140 10 180 20 220 40 C250 60 260 90 300 100 C330 110 350 90 380 110 C400 120 390 150 360 160 C330 170 290 150 250 130 C200 110 140 100 100 20 Z"
                    stroke="rgba(124,58,237,0.05)"
                    strokeWidth="1.5"
                  />

                  {/* Faint Latitude/Longitude text */}
                  <text x="15" y="200" fill="rgba(255,255,255,0.15)" fontSize="7" fontFamily="Inter">19.0760° N, 72.8777° E</text>
                  <text x="310" y="25" fill="rgba(255,255,255,0.15)" fontSize="7" fontFamily="Inter">SHAN ATELIER</text>
                </svg>

                {/* Ocean-like backdrop glow */}
                <div
                  className="absolute rounded-full w-40 h-40 opacity-25 filter blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(40,84,63,0.3) 0%, rgba(96,108,56,0.2) 60%, transparent 100%)',
                    left: '30%',
                    top: '20%'
                  }}
                />

                {/* Pulsing Pin Indicator */}
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* Pin Circle Wave */}
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-60"></span>
                    <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-r from-sage-400 to-emerald-600 border-2 border-white shadow-2xl relative z-10" />
                  </div>
                  
                  {/* Location Tag */}
                  <motion.div
                    className="mt-1 px-2.5 py-1 rounded bg-[#071911]/90 border border-sage-500/40 text-[9px] font-bold text-white uppercase tracking-wider shadow-2xl backdrop-blur-md"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Atelier Headquarters
                  </motion.div>
                </div>
              </div>

              {/* Social Icons row inside Map Card */}
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider px-2">Follow Our Journey</span>
                <div className="flex gap-2.5">
                  {[
                    { icon: FiInstagram, color: 'hover:bg-gradient-to-tr hover:from-[#833ab4] hover:to-[#fcb045] hover:border-transparent', href: '#' },
                    { icon: FiFacebook, color: 'hover:bg-[#1877f2] hover:border-transparent', href: '#' },
                    { icon: FiTwitter, color: 'hover:bg-[#1da1f2] hover:border-transparent', href: '#' },
                    { icon: FiYoutube, color: 'hover:bg-[#ff0000] hover:border-transparent', href: '#' },
                  ].map((s, idx) => (
                    <motion.a
                      key={idx}
                      href={s.href}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white border border-white/10 bg-white/5 transition-all duration-300 ${s.color}`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <s.icon size={13} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Luxury Contact Form */}
          <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-3xl glass border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Form Success View */}
              <AnimatePresence mode="wait">
                {isSent ? (
                  <motion.div
                    className="text-center py-20 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring' }}
                  >
                    {/* Success Icon */}
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center bg-green-500/10 border border-green-500/30 text-green-400 mb-6"
                      initial={{ rotate: -45, scale: 0.5 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    >
                      <FiCheck size={36} />
                    </motion.div>

                    <h3
                      className="text-2xl sm:text-3xl font-black text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Message Received
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed mb-6">
                      Thank you for contacting our atelier. A hair care concierge specialist has been assigned to your query and will reach out to you within 24 hours.
                    </p>
                    
                    <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">
                      ✦ Shan's Shampoo Atelier Concierge ✦
                    </span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <h2
                      className="text-xl sm:text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-3 gold-gradient"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Send Message
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-4 py-3 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sage-500/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(163,177,138,0.15)] transition-all duration-300 placeholder-white/20"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. priya@sharma.com"
                          className="w-full px-4 py-3 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sage-500/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(163,177,138,0.15)] transition-all duration-300 placeholder-white/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sage-500/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(163,177,138,0.15)] transition-all duration-300 placeholder-white/20"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Subject</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-xs bg-[#05120d] border border-white/10 text-white focus:outline-none focus:border-sage-500/60 focus:shadow-[0_0_15px_rgba(163,177,138,0.15)] transition-all duration-300"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Product Question">Product Concern / Consultation</option>
                          <option value="Order Issue">Order & Shipping Status</option>
                          <option value="Partnership">B2B & Partnerships</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Message</label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here... Let us know about your hair type or any questions."
                        className="w-full px-4 py-3 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sage-500/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(163,177,138,0.15)] transition-all duration-300 placeholder-white/20 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 rounded-xl font-bold text-sm text-white btn-luxury flex items-center justify-center gap-2.5 shadow-2xl relative overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <AnimatePresence mode="wait">
                        {isSending ? (
                          <motion.span
                            key="sending"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending Message...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="send"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                          >
                            <FiSend size={14} className="animate-pulse" />
                            Send Message
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>

              {/* Faint decorative glow corner */}
              <div
                className="absolute w-40 h-40 rounded-full opacity-10 filter blur-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, #28543f, #606c38)',
                  right: '-20px',
                  bottom: '-20px'
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-sage-500/30"
            style={{
              background: 'linear-gradient(135deg, rgba(8,28,21,0.95), rgba(15,38,29,0.95))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 30px rgba(40,84,63,0.3), 0 0 20px rgba(163,177,138,0.2)',
            }}
          >
            <span className="text-sm font-semibold text-sage-200">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Contact;
