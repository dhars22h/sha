import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiSend, FiStar, FiTrendingUp, FiSmile, FiHeart, FiCamera, FiFilter } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';

// Local floating bubbles for the Reviews page header
const HeaderBubbles = () => {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 6,
    x: Math.random() * 90 + 5,
    y: Math.random() * 80 + 10,
    delay: Math.random() * 3,
    duration: Math.random() * 8 + 6,
    color: ['#ffd700', '#db2777', '#7c3aed', '#fbbf24', '#f472b6'][Math.floor(Math.random() * 5)],
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

const ReviewsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [writeOpen, setWriteOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(0); // Before & After carousel
  const [toastMessage, setToastMessage] = useState('');
  
  // Submission Form states
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [ratingHover, setRatingHover] = useState(0);
  const [concern, setConcern] = useState('Shine & Softness');
  const [product, setProduct] = useState('Royal Argan Luxe Shampoo');
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Pre-populated reviews list with concern tags
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      concern: "Shine & Softness",
      product: "24K Gold Luxury Restoration",
      text: "Shan's Shampoo completely transformed my damaged hair. After just 3 washes, my hair feels like silk. The gold formula is absolutely worth every rupee!",
      avatar: "PS",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Zara Malik",
      location: "Delhi, India",
      rating: 5,
      concern: "Frizz Control",
      product: "Curl Defining Coconut Butter",
      text: "I've tried every luxury brand out there, but nothing compares to this. My curls have never been so defined and frizz-free. Obsessed!",
      avatar: "ZM",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Ananya Reddy",
      location: "Hyderabad, India",
      rating: 5,
      concern: "Hair Growth",
      product: "Royal Argan Luxe Shampoo",
      text: "The argan oil shampoo smells like heaven. My hair growth has visibly improved in just one month. This is a game changer for Indian hair!",
      avatar: "AR",
      date: "2 weeks ago"
    },
    {
      id: 4,
      name: "Kavya Nair",
      location: "Bangalore, India",
      rating: 5,
      concern: "Scalp Health",
      product: "Scalp Clarity Anti-Dandruff Pro",
      text: "Finally a shampoo that actually delivers on its promises. No more dandruff, no more itching, and my scalp feels so fresh. 10/10 would recommend!",
      avatar: "KN",
      date: "3 weeks ago"
    },
    {
      id: 5,
      name: "Aditi Roy",
      location: "Kolkata, India",
      rating: 4,
      concern: "Hair Growth",
      product: "Biotin Hair Growth Accelerator",
      text: "Visible reduction in hair fall in about 3 weeks. Hair feels much thicker at the roots. Smells clean and natural.",
      avatar: "AR",
      date: "1 month ago"
    },
    {
      id: 6,
      name: "Shreya Patel",
      location: "Ahmedabad, India",
      rating: 5,
      concern: "Shine & Softness",
      product: "Rose Gold Repair Serum Shampoo",
      text: "My chemically treated hair was dry and brittle. This rose gold formula repaired my strands and added an amazing reflecting glow. Love it!",
      avatar: "SP",
      date: "1 month ago"
    },
    {
      id: 7,
      name: "Meera Joshi",
      location: "Pune, India",
      rating: 5,
      concern: "Scalp Health",
      product: "Oily Scalp Detox Charcoal",
      text: "Excellent clarifying shampoo! Lifts up my flat hair roots and removes grease. I can now go 3 days between washes instead of washing daily.",
      avatar: "MJ",
      date: "2 months ago"
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment) {
      showToast('Please fill out Name and Comments');
      return;
    }
    setIsSending(true);

    setTimeout(() => {
      const newRev = {
        id: Date.now(),
        name,
        location: location || "India",
        rating,
        concern,
        product,
        text: comment,
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        date: "Just now"
      };

      setReviewsList([newRev, ...reviewsList]);
      setIsSending(false);
      setIsSent(true);
      showToast('Review submitted successfully! Thank you.');
      
      // Clear form
      setName('');
      setLocation('');
      setRating(5);
      setComment('');
      
      setTimeout(() => {
        setIsSent(false);
        setWriteOpen(false);
      }, 2000);
    }, 1500);
  };

  // Concern categories
  const concernsList = ['All', 'Shine & Softness', 'Scalp Health', 'Hair Growth', 'Frizz Control'];

  // Before & After comparison data
  const beforeAfterStories = [
    {
      title: "Royal Argan Luxe Transformation",
      client: "Ananya Reddy, 28",
      concern: "Dry, Heat-Damaged Hair",
      product: "Royal Argan Luxe Shampoo",
      beforeLabel: "Dry & Frizzy ⚡",
      afterLabel: "Silky & Luminous 💧",
      beforeColor: "from-red-900/20 to-orange-950/20",
      afterColor: "from-amber-900/30 to-orange-900/30",
      testimonial: "My hair was color-damaged and extremely dry from straightening. After switching to Argan Luxe, it feels completely restored, light, and shiny."
    },
    {
      title: "Biotin Growth Acceleration",
      client: "Aditi Roy, 32",
      concern: "Thinning & Hair Fall",
      product: "Biotin Hair Growth Accelerator",
      beforeLabel: "Limp & Thinning 🍂",
      afterLabel: "Dense & Fuller 🌿",
      beforeColor: "from-gray-900/30 to-slate-950/30",
      afterColor: "from-green-900/30 to-emerald-900/30",
      testimonial: "Post-partum hair fall left my scalp visible at the parting. Within 4 weeks, the Biotin formula stopped the shed and stimulated new baby hairs."
    },
    {
      title: "Coconut Curl Definer",
      client: "Zara Malik, 25",
      concern: "Undefined, Frizzy Curls",
      beforeLabel: "Tangled & Poofy 🌀",
      afterLabel: "Bouncy & Defined ✨",
      beforeColor: "from-purple-900/20 to-violet-950/20",
      afterColor: "from-purple-900/35 to-violet-900/30",
      testimonial: "I used to hide my curls in buns because of frizz. This shampoo defines curls, retains holding shape, and smells like an absolute tropical dream."
    }
  ];

  // Filtered reviews list
  const filteredReviews = activeFilter === 'All'
    ? reviewsList
    : reviewsList.filter(r => r.concern === activeFilter);

  // Statistics summaries
  const totalCount = reviewsList.length + 12835; // Mock scale addition
  const avgRatingVal = 4.9;
  const ratingBars = [
    { stars: 5, pct: 89 },
    { stars: 4, pct: 8 },
    { stars: 3, pct: 2 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 0 },
  ];

  const statBadges = [
    { pct: "98%", label: "Shine & Softness", desc: "Reported softer hair texture" },
    { pct: "95%", label: "Hair Thickness", desc: "Noticed density in 4 weeks" },
    { pct: "99%", label: "Scalp Hydration", desc: "Flake-free scalp satisfaction" }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative bg-[#0a0014] text-white">
      {/* Background radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(124,58,237,0.06) 0%, transparent 60%), radial-gradient(circle at 10% 70%, rgba(219,39,119,0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(245,158,11,0.04) 0%, transparent 50%)',
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
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest gold-gradient border border-amber-500/30 bg-amber-500/5">
                ✦ Shan's Shampoo Clinical & Buyer trust ✦
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 section-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
            >
              Real Results. <span className="gradient-text">Real Stories</span>
            </motion.h1>

            <motion.p
              className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Discover how our luxury formulas have transformed scalp health, density, and hair radiance for thousands of users globally.
            </motion.p>
          </div>
        </section>

        {/* STATISTICS DASHBOARD SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Rating Summary Chart */}
          <div className="lg:col-span-5 p-6 rounded-3xl glass border border-white/5 flex flex-col justify-between">
            <h3 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-6 px-2">
              Atelier Rating Summary
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 mb-8">
              <div className="text-center">
                <span className="text-6xl font-black text-white">{avgRatingVal}</span>
                <div className="flex text-amber-400 mt-2 justify-center">
                  {[1, 2, 3, 4, 5].map(s => <FaStar key={s} size={16} />)}
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-2">
                  {totalCount.toLocaleString()} Verified Ratings
                </p>
              </div>

              {/* Progress bars */}
              <div className="flex-1 w-full max-w-xs space-y-2.5">
                {ratingBars.map(bar => (
                  <div key={bar.stars} className="flex items-center gap-3 text-xs">
                    <span className="w-3 text-white/40 font-bold">{bar.stars}★</span>
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${bar.pct}%`,
                          background: 'linear-gradient(90deg, #f59e0b, #db2777)',
                        }}
                      />
                    </div>
                    <span className="w-8 text-right text-white/30">{bar.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => setWriteOpen(!writeOpen)}
              className="w-full py-3.5 rounded-xl font-bold text-xs text-white btn-luxury shadow-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiCheck size={14} />
              {writeOpen ? 'Cancel Form' : 'Share Your Journey'}
            </motion.button>
          </div>

          {/* Satisfaction Badges Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {statBadges.map((badge, idx) => (
              <motion.div
                key={badge.label}
                className="p-6 rounded-3xl glass border border-white/5 flex flex-col justify-between text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: 'spring' }}
                whileHover={{ y: -5 }}
              >
                {/* Decorative glow corner */}
                <div
                  className="absolute w-28 h-28 rounded-full opacity-5 filter blur-xl pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', top: '-20px', right: '-20px' }}
                />

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-amber-400 mx-auto mb-4">
                  {idx === 0 ? <FiSmile size={22} /> : idx === 1 ? <FiTrendingUp size={22} /> : <FiHeart size={22} />}
                </div>
                <div>
                  <span className="text-4xl font-black gold-gradient block mb-1">
                    {badge.pct}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-2">{badge.label}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPANDABLE REVIEW SUBMISSION FORM */}
        <AnimatePresence>
          {writeOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <form
                onSubmit={handleReviewSubmit}
                className="p-6 sm:p-8 rounded-3xl glass border border-white/10 max-w-4xl mx-auto space-y-5"
              >
                <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3 uppercase tracking-wider gold-gradient flex items-center gap-2">
                  <FiCamera size={16} /> Write Your Review
                </h3>

                {isSent ? (
                  <motion.div
                    className="text-center py-10 flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-500/10 border border-green-500/30 text-green-400 mb-4 animate-bounce">
                      <FiCheck size={28} />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Review Submitted!</h4>
                    <p className="text-white/50 text-xs max-w-xs leading-relaxed">
                      Thank you for sharing your experience. Your story has been added to our verified timeline.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priyanth Sen"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-xs bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white placeholder-white/20 transition-all duration-300"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Location (City, India)</label>
                        <input
                          type="text"
                          placeholder="e.g. Bangalore, India"
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-xs bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white placeholder-white/20 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {/* Rating selection */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2 font-bold">Your Rating</label>
                        <div className="flex gap-1.5 items-center">
                          {[1, 2, 3, 4, 5].map(stars => (
                            <button
                              type="button"
                              key={stars}
                              onClick={() => setRating(stars)}
                              onMouseEnter={() => setRatingHover(stars)}
                              onMouseLeave={() => setRatingHover(0)}
                              className="text-amber-400 hover:scale-125 transition-transform"
                            >
                              {stars <= (ratingHover || rating) ? (
                                <FaStar size={18} />
                              ) : (
                                <FaRegStar size={18} className="text-white/20" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Concern */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Primary Hair Concern</label>
                        <select
                          value={concern}
                          onChange={e => setConcern(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-xs bg-[#140b24] border border-white/10 text-white focus:outline-none focus:border-amber-500/60 focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300"
                        >
                          <option value="Shine & Softness">Shine & Softness</option>
                          <option value="Scalp Health">Scalp Health</option>
                          <option value="Hair Growth">Hair Growth</option>
                          <option value="Frizz Control">Frizz Control</option>
                        </select>
                      </div>

                      {/* Product Used */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Product Used</label>
                        <select
                          value={product}
                          onChange={e => setProduct(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-xs bg-[#140b24] border border-white/10 text-white focus:outline-none focus:border-amber-500/60 focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300"
                        >
                          <option value="Royal Argan Luxe Shampoo">Royal Argan Luxe Shampoo</option>
                          <option value="Biotin Hair Growth Accelerator">Biotin Hair Growth Accelerator</option>
                          <option value="Curl Defining Coconut Butter">Curl Defining Coconut Butter</option>
                          <option value="Scalp Clarity Anti-Dandruff Pro">Scalp Clarity Anti-Dandruff Pro</option>
                          <option value="24K Gold Luxury Restoration">24K Gold Luxury Restoration</option>
                          <option value="Purple Violet Toning Elixir">Purple Violet Toning Elixir</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-bold">Review Description</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail your experience with Shan's Shampoo. What differences did you see in hair texture, scalp cleanliness, or shine?"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-xs bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white placeholder-white/20 transition-all duration-300 resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSending}
                      className="py-3 rounded-xl text-xs font-bold text-white btn-luxury flex items-center justify-center gap-2 w-full sm:w-48 shadow-lg relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSending ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <>
                          <FiSend size={12} /> Submit Review
                        </>
                      )}
                    </motion.button>
                  </>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BEFORE & AFTER SHOWCASE CAROUSEL */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 section-title" style={{ fontFamily: "'Playfair Display', serif" }}>
            Before & After <span className="gradient-text">Success Stories</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            
            {/* Story selector Left */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-none">
              {beforeAfterStories.map((story, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedStory(i)}
                  className="px-5 py-3 rounded-2xl border text-left text-xs font-semibold uppercase tracking-wider min-w-[200px] lg:min-w-0 transition-all duration-300 relative"
                  style={{
                    borderColor: selectedStory === i ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.05)',
                    background: selectedStory === i ? 'rgba(245,158,11,0.03)' : 'rgba(255,255,255,0.02)',
                    color: selectedStory === i ? '#f59e0b' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {selectedStory === i && (
                    <motion.div
                      layoutId="activeStoryPill"
                      className="absolute inset-0 rounded-2xl border border-amber-500 pointer-events-none"
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="block text-[10px] text-white/35 font-bold mb-1">Ritual {i+1}</span>
                  <span className="line-clamp-1 relative z-10">{story.title.split(' ')[0] + ' ' + (story.title.split(' ')[1] || '')}</span>
                </button>
              ))}
            </div>

            {/* Showcase Visual Content Center-Right */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              
              {/* Before and After Visual Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Before Card */}
                <div className={`p-4 rounded-2xl border border-white/5 bg-gradient-to-br ${beforeAfterStories[selectedStory].beforeColor} flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[160px]`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 absolute top-3 left-4">Before</span>
                  <div className="my-auto">
                    <span className="text-5xl block mb-2 filter grayscale select-none">🧴</span>
                    <span className="text-xs font-semibold text-red-400 block px-1.5 py-0.5 rounded-full bg-red-400/10 border border-red-500/20">
                      {beforeAfterStories[selectedStory].beforeLabel}
                    </span>
                  </div>
                </div>

                {/* After Card */}
                <div className={`p-4 rounded-2xl border border-amber-500/20 bg-gradient-to-br ${beforeAfterStories[selectedStory].afterColor} flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[160px] shadow-2xl`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 absolute top-3 left-4">After (4 Wks)</span>
                  <div className="my-auto">
                    <span className="text-5xl block mb-2 select-none filter drop-shadow-[0_8px_15px_rgba(245,158,11,0.4)]">🧴</span>
                    <span className="text-xs font-bold text-green-400 block px-1.5 py-0.5 rounded-full bg-green-400/10 border border-green-500/20 animate-pulse">
                      {beforeAfterStories[selectedStory].afterLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Testimonial details */}
              <div className="flex flex-col justify-between p-2">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500 block mb-1">
                    {beforeAfterStories[selectedStory].concern}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {beforeAfterStories[selectedStory].title}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed mb-4 italic">
                    "{beforeAfterStories[selectedStory].testimonial}"
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 uppercase tracking-widest">
                  <span className="font-bold text-white/60">{beforeAfterStories[selectedStory].client}</span>
                  <span className="gold-gradient font-bold">{beforeAfterStories[selectedStory].product.split(' ')[0]} Range</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TIMELINE VERIFIED REVIEWS SECTION */}
        <section className="relative z-10">
          
          {/* Header and Category Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 border-b border-white/5 pb-6">
            <h2 className="text-2xl font-bold section-title" style={{ fontFamily: "'Playfair Display', serif" }}>
              Verified <span className="gradient-text">Customer Timeline</span>
            </h2>

            {/* Concern Filters */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 -mb-2 scrollbar-none min-w-max">
              {concernsList.map(concernName => (
                <button
                  key={concernName}
                  onClick={() => setActiveFilter(concernName)}
                  className="px-4 py-2 rounded-full text-xs font-semibold relative transition-colors duration-300"
                  style={{
                    border: activeFilter === concernName ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                    color: activeFilter === concernName ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {activeFilter === concernName && (
                    <motion.div
                      layoutId="activeReviewsFilter"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {concernName}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline List of Reviews */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {filteredReviews.length > 0 ? (
                <motion.div
                  className="space-y-6"
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredReviews.map((rev, idx) => (
                    <motion.div
                      key={rev.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08, type: 'spring', stiffness: 100, damping: 15 }}
                      className="p-6 rounded-3xl glass border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row gap-6 items-start"
                    >
                      {/* Avatar & Location block */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                            boxShadow: '0 4px 10px rgba(124,58,237,0.3)',
                          }}
                        >
                          {rev.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{rev.name}</h4>
                          <span className="text-[10px] text-white/30 block">{rev.location}</span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="flex-1 space-y-3 w-full">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-2.5">
                          {/* Tags */}
                          <div className="flex gap-2">
                            <span className="px-2 py-0.5 rounded text-[8px] font-bold text-amber-400 bg-amber-400/5 border border-amber-500/20 uppercase tracking-widest">
                              {rev.concern}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[8px] font-bold text-white/40 bg-white/5 border border-white/5 uppercase tracking-widest line-clamp-1 max-w-[150px]">
                              {rev.product.split(' ')[0]}
                            </span>
                          </div>

                          {/* Rating stars & Date */}
                          <div className="flex items-center gap-3">
                            <div className="flex text-amber-400">
                              {[1, 2, 3, 4, 5].map(s => (
                                <FaStar
                                  key={s}
                                  size={11}
                                  className={s <= rev.rating ? 'fill-current' : 'text-white/10'}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-white/20 font-bold">{rev.date}</span>
                          </div>
                        </div>
                        
                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                          "{rev.text}"
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20 glass border border-white/5 rounded-3xl">
                  <span className="text-5xl block mb-3">📝🔍</span>
                  <h4 className="text-lg font-bold text-white mb-1">No Reviews Found</h4>
                  <p className="text-xs text-white/40 max-w-sm mx-auto">
                    We couldn't find any reviews categorized under "{activeFilter}". Try switching filters or writing the first review.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </section>

      </div>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-amber-500/30"
            style={{
              background: 'linear-gradient(135deg, rgba(20,0,40,0.95), rgba(40,0,80,0.95))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 30px rgba(124,58,237,0.3), 0 0 20px rgba(245,158,11,0.2)',
            }}
          >
            <span className="text-sm font-semibold text-amber-200">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ReviewsPage;
