// Product Images
import arganImg from '../assets/images/argan_shampoo.png';
import aloeImg from '../assets/images/aloe_shampoo.png';
import rosemaryImg from '../assets/images/rosemary_shampoo.png';
import teatreeImg from '../assets/images/teatree_shampoo.png';
import coconutImg from '../assets/images/coconut_shampoo.png';
import keratinImg from '../assets/images/keratin_shampoo.png';
import dandruffImg from '../assets/images/dandruff_shampoo.png';
import growthImg from '../assets/images/growth_shampoo.png';

// Product Videos
import arganVid from '../assets/videos/argan_video.mp4';
import aloeVid from '../assets/videos/aloe_video.mp4';
import rosemaryVid from '../assets/videos/rosemary_video.mp4';
import teatreeVid from '../assets/videos/teatree_video.mp4';
import coconutVid from '../assets/videos/coconut_video.mp4';
import keratinVid from '../assets/videos/keratin_video.mp4';
import dandruffVid from '../assets/videos/dandruff_video.mp4';
import growthVid from '../assets/videos/growth_video.mp4';

// Customer Photos
import priyaAvatar from '../assets/images/customer_priya.jpg';
import zaraAvatar from '../assets/images/customer_zara.jpg';
import ananyaAvatar from '../assets/images/customer_ananya.jpg';
import kavyaAvatar from '../assets/images/customer_kavya.jpg';

export const products = [
  {
    id: 1,
    name: "Moroccan Argan Oil Shampoo",
    description: "Deeply nourish dry and brittle strands with premium cold-pressed argan oil and essential nutrients for brilliant natural shine.",
    price: 2499,
    salePrice: 1499,
    rating: 4.9,
    reviews: 2847,
    category: "Dry Hair",
    badge: "Best Seller",
    color: "from-emerald-600 to-forest-700",
    emoji: "🌿",
    bgColor: "from-emerald-950/40 to-forest-900/20",
    image: arganImg,
    video: arganVid,
    ingredientsList: ["Pure Moroccan Argan Oil", "Cold-pressed Jojoba Oil", "Shea Butter Extract", "Pro-Vitamin B5"]
  },
  {
    id: 2,
    name: "Pure Aloe Vera Shampoo",
    description: "Formulated with 100% organic aloe leaf juice to soothe scalp irritation, lock in intense hydration, and protect colored hair.",
    price: 2899,
    salePrice: 1799,
    rating: 4.8,
    reviews: 1923,
    category: "Color Protection",
    badge: "New",
    color: "from-sage-500 to-emerald-600",
    emoji: "🍃",
    bgColor: "from-sage-950/40 to-emerald-900/20",
    image: aloeImg,
    video: aloeVid,
    ingredientsList: ["Organic Aloe Vera Gel", "Green Tea Extract", "Hydrolyzed Silk", "UV-B Protective Complex"]
  },
  {
    id: 3,
    name: "Organic Rosemary Shampoo",
    description: "Infused with therapeutic rosemary extract and biotin to strengthen hair roots, optimize follicle health, and prevent breakage.",
    price: 3299,
    salePrice: 1999,
    rating: 4.9,
    reviews: 3412,
    category: "Dry Hair",
    badge: "Top Pick",
    color: "from-emerald-700 to-olive-700",
    emoji: "🌱",
    bgColor: "from-emerald-950/50 to-olive-900/20",
    image: rosemaryImg,
    video: rosemaryVid,
    ingredientsList: ["Rosemary Leaf Extract", "Castor Oil", "Ginseng Root", "Biotin (Vitamin B7)"]
  },
  {
    id: 4,
    name: "Tea Tree Scalp Therapy Shampoo",
    description: "Deeply cleanse and balance oily scalps using antimicrobial tea tree extract and refreshing cooling mint formula.",
    price: 1899,
    salePrice: 1199,
    rating: 4.7,
    reviews: 5621,
    category: "Oily Hair",
    badge: "Sale",
    color: "from-olive-600 to-forest-600",
    emoji: "🌲",
    bgColor: "from-olive-950/40 to-forest-900/20",
    image: teatreeImg,
    video: teatreeVid,
    ingredientsList: ["Australian Tea Tree Oil", "Peppermint Extract", "Salicylic Acid", "Eucalyptus Oil"]
  },
  {
    id: 5,
    name: "Coconut Moisture Shampoo",
    description: "Lock in moisture, reduce frizz, and define natural curl patterns with organic coconut milk and rich avocado extracts.",
    price: 2699,
    salePrice: 1599,
    rating: 4.8,
    reviews: 1788,
    category: "Curly Hair",
    badge: "Popular",
    color: "from-sage-500 to-forest-600",
    emoji: "🥥",
    bgColor: "from-sage-950/30 to-forest-900/20",
    image: coconutImg,
    video: coconutVid,
    ingredientsList: ["Organic Coconut Milk", "Raw Coconut Butter", "Avocado Fruit Oil", "Hibiscus Flower Extract"]
  },
  {
    id: 6,
    name: "Keratin Bond Repair Shampoo",
    description: "Rebuild damaged hair fibers, seal cuticles, and restore structural strength with plant-derived keratin and silk amino acids.",
    price: 2299,
    salePrice: 1399,
    rating: 4.6,
    reviews: 2103,
    category: "Color Protection",
    badge: "Trending",
    color: "from-olive-500 to-sage-600",
    emoji: "🌾",
    bgColor: "from-olive-950/35 to-sage-900/25",
    image: keratinImg,
    video: keratinVid,
    ingredientsList: ["Hydrolyzed Wheat Keratin", "Silk Powder", "Sweet Almond Oil", "Vitamin E"]
  },
  {
    id: 7,
    name: "Clinical Anti-Dandruff Shampoo",
    description: "Medical-grade dandruff flake control and itch relief combined with organic herbs to maintain scalp moisture barrier.",
    price: 3499,
    salePrice: 2199,
    rating: 4.9,
    reviews: 4567,
    category: "Anti-Dandruff",
    badge: "Premium",
    color: "from-teal-600 to-emerald-700",
    emoji: "❄️",
    bgColor: "from-teal-950/40 to-emerald-900/20",
    image: dandruffImg,
    video: dandruffVid,
    ingredientsList: ["Zinc Pyrithione (1.0%)", "Tea Tree Extract", "Chamomile Extract", "Menthol Liposomes"]
  },
  {
    id: 8,
    name: "Biotin Hair Growth Shampoo",
    description: "Accelerate volume and thickness. Infused with double strength biotin, botanical herbs, and vitamins to stimulate new hair growth.",
    price: 4999,
    salePrice: 2999,
    rating: 5.0,
    reviews: 891,
    category: "Hair Growth",
    badge: "Luxury",
    color: "from-emerald-500 to-olive-600",
    emoji: "✨",
    bgColor: "from-emerald-950/40 to-olive-900/20",
    image: growthImg,
    video: growthVid,
    ingredientsList: ["Double Strength Biotin", "Organic Green Leaves", "Apple Cider Vinegar", "Wheat Germ Oil"]
  }
];

export const categories = [
  { id: 1, name: "Dry Hair", icon: "💧", count: 24, color: "from-emerald-600 to-teal-700" },
  { id: 2, name: "Oily Hair", icon: "🌱", count: 18, color: "from-sage-600 to-forest-700" },
  { id: 3, name: "Curly Hair", icon: "🥥", count: 21, color: "from-olive-600 to-forest-600" },
  { id: 4, name: "Anti-Dandruff", icon: "🌿", count: 15, color: "from-teal-600 to-forest-700" },
  { id: 5, name: "Hair Growth", icon: "✨", count: 19, color: "from-emerald-600 to-olive-600" },
  { id: 6, name: "Color Protection", icon: "🌸", count: 22, color: "from-sage-500 to-olive-600" },
];

export const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "This Moroccan Argan Oil shampoo completely transformed my damaged hair. After just 3 washes, my hair feels like pure silk and smells absolutely heavenly. It is worth every rupee!",
    avatar: priyaAvatar,
    product: "Moroccan Argan Oil Shampoo"
  },
  {
    id: 2,
    name: "Zara Malik",
    location: "Delhi, India",
    rating: 5,
    text: "I have tried every wellness brand out there, but nothing compares to this. My curls have never been so defined, bouncy, and completely frizz-free. Simply obsessed!",
    avatar: zaraAvatar,
    product: "Coconut Moisture Shampoo"
  },
  {
    id: 3,
    name: "Ananya Reddy",
    location: "Hyderabad, India",
    rating: 5,
    text: "The rosemary shampoo smells like a fresh botanical garden. My hair thickness and growth have visibly improved in just one month. The best choice for natural hair care!",
    avatar: ananyaAvatar,
    product: "Organic Rosemary Shampoo"
  },
  {
    id: 4,
    name: "Kavya Nair",
    location: "Bangalore, India",
    rating: 5,
    text: "Finally a natural shampoo that actually delivers on its promises. Flake-free scalp, zero itching, and my hair remains soft instead of feeling dry. 10/10 recommendation!",
    avatar: kavyaAvatar,
    product: "Clinical Anti-Dandruff Shampoo"
  },
];

export const brands = [
  { name: "Forest Essentials", color: "#2d5a27", letter: "FE" },
  { name: "Kama Ayurveda", color: "#3f4a21", letter: "KA" },
  { name: "The Body Shop", color: "#193f24", letter: "TBS" },
  { name: "Mamaearth", color: "#4f7547", letter: "ME" },
  { name: "L'Occitane", color: "#5c572b", letter: "L" },
  { name: "Aveda", color: "#283b27", letter: "A" },
];
