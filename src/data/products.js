export const products = [
  {
    id: 1,
    name: "Royal Argan Luxe Shampoo",
    description: "Infused with pure Moroccan argan oil for deep nourishment and brilliant shine.",
    price: 2499,
    salePrice: 1499,
    rating: 4.9,
    reviews: 2847,
    category: "Dry Hair",
    badge: "Best Seller",
    color: "from-amber-500 to-orange-600",
    emoji: "🧴",
    bgColor: "from-amber-900/30 to-orange-900/20"
  },
  {
    id: 2,
    name: "Purple Violet Toning Elixir",
    description: "Neutralize brassiness and restore platinum perfection to color-treated hair.",
    price: 2899,
    salePrice: 1799,
    rating: 4.8,
    reviews: 1923,
    category: "Color Protection",
    badge: "New",
    color: "from-purple-500 to-violet-600",
    emoji: "💜",
    bgColor: "from-purple-900/30 to-violet-900/20"
  },
  {
    id: 3,
    name: "Rose Gold Repair Serum Shampoo",
    description: "Advanced keratin repair formula that transforms damaged hair into silk.",
    price: 3299,
    salePrice: 1999,
    rating: 4.9,
    reviews: 3412,
    category: "Hair Growth",
    badge: "Top Pick",
    color: "from-pink-500 to-rose-600",
    emoji: "🌹",
    bgColor: "from-pink-900/30 to-rose-900/20"
  },
  {
    id: 4,
    name: "Scalp Clarity Anti-Dandruff Pro",
    description: "Zinc pyrithione formula for 100% flake-free scalp with cooling mint.",
    price: 1899,
    salePrice: 1199,
    rating: 4.7,
    reviews: 5621,
    category: "Anti-Dandruff",
    badge: "Sale",
    color: "from-teal-500 to-cyan-600",
    emoji: "❄️",
    bgColor: "from-teal-900/30 to-cyan-900/20"
  },
  {
    id: 5,
    name: "Curl Defining Coconut Butter",
    description: "Define your curls with intense moisture and frizz-free bounce all day.",
    price: 2699,
    salePrice: 1599,
    rating: 4.8,
    reviews: 1788,
    category: "Curly Hair",
    badge: "Popular",
    color: "from-yellow-500 to-amber-600",
    emoji: "🥥",
    bgColor: "from-yellow-900/30 to-amber-900/20"
  },
  {
    id: 6,
    name: "Oily Scalp Detox Charcoal",
    description: "Activated charcoal purifies excess sebum for fresh, balanced, clean hair.",
    price: 2299,
    salePrice: 1399,
    rating: 4.6,
    reviews: 2103,
    category: "Oily Hair",
    badge: "Trending",
    color: "from-gray-500 to-slate-600",
    emoji: "🖤",
    bgColor: "from-gray-900/30 to-slate-900/20"
  },
  {
    id: 7,
    name: "Biotin Hair Growth Accelerator",
    description: "Triple biotin complex stimulates follicles for visibly thicker, fuller hair.",
    price: 3499,
    salePrice: 2199,
    rating: 4.9,
    reviews: 4567,
    category: "Hair Growth",
    badge: "Premium",
    color: "from-green-500 to-emerald-600",
    emoji: "🌿",
    bgColor: "from-green-900/30 to-emerald-900/20"
  },
  {
    id: 8,
    name: "24K Gold Luxury Restoration",
    description: "Suspended real gold particles and collagen for celebrity-grade hair restoration.",
    price: 4999,
    salePrice: 2999,
    rating: 5.0,
    reviews: 891,
    category: "Dry Hair",
    badge: "Luxury",
    color: "from-yellow-400 to-gold-600",
    emoji: "✨",
    bgColor: "from-yellow-800/30 to-amber-800/20"
  }
];

export const categories = [
  { id: 1, name: "Dry Hair", icon: "💧", count: 24, color: "from-amber-500 to-orange-500" },
  { id: 2, name: "Oily Hair", icon: "✨", count: 18, color: "from-teal-500 to-cyan-500" },
  { id: 3, name: "Curly Hair", icon: "🌀", count: 21, color: "from-purple-500 to-violet-500" },
  { id: 4, name: "Anti-Dandruff", icon: "❄️", count: 15, color: "from-blue-500 to-indigo-500" },
  { id: 5, name: "Hair Growth", icon: "🌿", count: 19, color: "from-green-500 to-emerald-500" },
  { id: 6, name: "Color Protection", icon: "🎨", count: 22, color: "from-pink-500 to-rose-500" },
];

export const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "Shan's Shampoo completely transformed my damaged hair. After just 3 washes, my hair feels like silk. The gold formula is absolutely worth every rupee!",
    avatar: "PS",
    product: "24K Gold Luxury Restoration"
  },
  {
    id: 2,
    name: "Zara Malik",
    location: "Delhi, India",
    rating: 5,
    text: "I've tried every luxury brand out there, but nothing compares to this. My curls have never been so defined and frizz-free. Obsessed!",
    avatar: "ZM",
    product: "Curl Defining Coconut Butter"
  },
  {
    id: 3,
    name: "Ananya Reddy",
    location: "Hyderabad, India",
    rating: 5,
    text: "The argan oil shampoo smells like heaven. My hair growth has visibly improved in just one month. This is a game changer for Indian hair!",
    avatar: "AR",
    product: "Royal Argan Luxe Shampoo"
  },
  {
    id: 4,
    name: "Kavya Nair",
    location: "Bangalore, India",
    rating: 5,
    text: "Finally a shampoo that actually delivers on its promises. No more dandruff, no more itching, and my scalp feels so fresh. 10/10 would recommend!",
    avatar: "KN",
    product: "Scalp Clarity Anti-Dandruff Pro"
  },
];

export const brands = [
  { name: "Dove", color: "#e8d5b7", letter: "D" },
  { name: "Pantene", color: "#c9b99a", letter: "P" },
  { name: "Head & Shoulders", color: "#a8d8ea", letter: "H&S" },
  { name: "Tresemmé", color: "#d4b9da", letter: "T" },
  { name: "L'Oréal", color: "#f2d7b6", letter: "L" },
  { name: "Herbal Essences", color: "#b8e0d2", letter: "HE" },
];
