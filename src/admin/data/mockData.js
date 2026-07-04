import { products as storefrontProducts, categories as storefrontCategories } from '../../data/products';

export const initialProducts = storefrontProducts.map((p) => ({
  ...p,
  stock: Math.floor(Math.random() * 150) + 10,
  status: Math.random() > 0.15 ? 'active' : 'inactive',
  images: [p.emoji],
  createdAt: '2025-11-12',
}));

export const initialCategories = storefrontCategories.map((c) => ({
  id: c.id,
  name: c.name,
  icon: c.icon,
  productCount: c.count,
  description: `Premium ${c.name.toLowerCase()} care collection`,
}));

export const initialCustomers = [
  { id: 1, name: 'Priya Sharma', email: 'priya.sharma@gmail.com', phone: '+91 98765 43210', totalOrders: 12, joinedDate: '2024-03-15', avatar: 'PS' },
  { id: 2, name: 'Zara Malik', email: 'zara.malik@outlook.com', phone: '+91 87654 32109', totalOrders: 8, joinedDate: '2024-06-22', avatar: 'ZM' },
  { id: 3, name: 'Ananya Reddy', email: 'ananya.reddy@yahoo.com', phone: '+91 76543 21098', totalOrders: 15, joinedDate: '2023-11-08', avatar: 'AR' },
  { id: 4, name: 'Kavya Nair', email: 'kavya.nair@gmail.com', phone: '+91 65432 10987', totalOrders: 6, joinedDate: '2025-01-30', avatar: 'KN' },
  { id: 5, name: 'Meera Patel', email: 'meera.patel@gmail.com', phone: '+91 54321 09876', totalOrders: 21, joinedDate: '2023-08-14', avatar: 'MP' },
  { id: 6, name: 'Sneha Gupta', email: 'sneha.gupta@hotmail.com', phone: '+91 43210 98765', totalOrders: 4, joinedDate: '2025-04-02', avatar: 'SG' },
  { id: 7, name: 'Riya Kapoor', email: 'riya.kapoor@gmail.com', phone: '+91 32109 87654', totalOrders: 9, joinedDate: '2024-09-18', avatar: 'RK' },
  { id: 8, name: 'Divya Iyer', email: 'divya.iyer@yahoo.com', phone: '+91 21098 76543', totalOrders: 17, joinedDate: '2023-12-25', avatar: 'DI' },
];

const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentStatuses = ['Paid', 'Pending', 'Refunded'];

export const initialOrders = [
  { id: 'ORD-2026-1042', customerId: 1, customerName: 'Priya Sharma', date: '2026-07-01', amount: 4497, paymentStatus: 'Paid', deliveryStatus: 'Delivered', items: 2 },
  { id: 'ORD-2026-1041', customerId: 2, customerName: 'Zara Malik', date: '2026-06-30', amount: 1599, paymentStatus: 'Paid', deliveryStatus: 'Shipped', items: 1 },
  { id: 'ORD-2026-1040', customerId: 3, customerName: 'Ananya Reddy', date: '2026-06-29', amount: 6298, paymentStatus: 'Paid', deliveryStatus: 'Processing', items: 3 },
  { id: 'ORD-2026-1039', customerId: 4, customerName: 'Kavya Nair', date: '2026-06-28', amount: 1199, paymentStatus: 'Paid', deliveryStatus: 'Delivered', items: 1 },
  { id: 'ORD-2026-1038', customerId: 5, customerName: 'Meera Patel', date: '2026-06-27', amount: 8997, paymentStatus: 'Paid', deliveryStatus: 'Delivered', items: 4 },
  { id: 'ORD-2026-1037', customerId: 6, customerName: 'Sneha Gupta', date: '2026-06-26', amount: 2199, paymentStatus: 'Pending', deliveryStatus: 'Pending', items: 1 },
  { id: 'ORD-2026-1036', customerId: 7, customerName: 'Riya Kapoor', date: '2026-06-25', amount: 3798, paymentStatus: 'Paid', deliveryStatus: 'Shipped', items: 2 },
  { id: 'ORD-2026-1035', customerId: 8, customerName: 'Divya Iyer', date: '2026-06-24', amount: 2999, paymentStatus: 'Refunded', deliveryStatus: 'Cancelled', items: 1 },
  { id: 'ORD-2026-1034', customerId: 1, customerName: 'Priya Sharma', date: '2026-06-23', amount: 5498, paymentStatus: 'Paid', deliveryStatus: 'Delivered', items: 2 },
  { id: 'ORD-2026-1033', customerId: 3, customerName: 'Ananya Reddy', date: '2026-06-22', amount: 1799, paymentStatus: 'Paid', deliveryStatus: 'Delivered', items: 1 },
];

export const initialReviews = [
  { id: 1, customerName: 'Priya Sharma', product: '24K Gold Luxury Restoration', rating: 5, review: "Shan's Shampoo completely transformed my damaged hair. The gold formula is absolutely worth every rupee!", status: 'approved', date: '2026-06-15' },
  { id: 2, customerName: 'Zara Malik', product: 'Curl Defining Coconut Butter', rating: 5, review: "My curls have never been so defined and frizz-free. Obsessed!", status: 'approved', date: '2026-06-12' },
  { id: 3, customerName: 'Ananya Reddy', product: 'Royal Argan Luxe Shampoo', rating: 5, review: 'My hair growth has visibly improved in just one month. Game changer!', status: 'approved', date: '2026-06-10' },
  { id: 4, customerName: 'Kavya Nair', product: 'Scalp Clarity Anti-Dandruff Pro', rating: 4, review: 'No more dandruff, no more itching. My scalp feels so fresh.', status: 'pending', date: '2026-07-01' },
  { id: 5, customerName: 'Meera Patel', product: 'Purple Violet Toning Elixir', rating: 5, review: 'Perfect for my color-treated hair. Brassiness is completely gone!', status: 'pending', date: '2026-07-02' },
  { id: 6, customerName: 'Sneha Gupta', product: 'Oily Scalp Detox Charcoal', rating: 3, review: 'Good product but the scent is a bit strong for my liking.', status: 'pending', date: '2026-07-02' },
  { id: 7, customerName: 'Riya Kapoor', product: 'Biotin Hair Growth Accelerator', rating: 5, review: 'Visible thickness after 6 weeks. Highly recommend!', status: 'approved', date: '2026-05-28' },
  { id: 8, customerName: 'Divya Iyer', product: 'Rose Gold Repair Serum Shampoo', rating: 4, review: 'Great repair formula. Hair feels silky smooth.', status: 'rejected', date: '2026-05-20' },
];

export const initialOffers = [
  { id: 1, name: 'Summer Glow Sale', discountType: 'percentage', discountValue: 25, couponCode: 'SUMMER25', expiryDate: '2026-08-31', status: 'active' },
  { id: 2, name: 'First Order Welcome', discountType: 'fixed', discountValue: 500, couponCode: 'WELCOME500', expiryDate: '2026-12-31', status: 'active' },
  { id: 3, name: 'VIP Gold Members', discountType: 'percentage', discountValue: 15, couponCode: 'VIPGOLD15', expiryDate: '2026-09-30', status: 'active' },
  { id: 4, name: 'Flash Friday', discountType: 'percentage', discountValue: 40, couponCode: 'FLASH40', expiryDate: '2026-07-04', status: 'active' },
  { id: 5, name: 'New Year Special', discountType: 'fixed', discountValue: 1000, couponCode: 'NY2026', expiryDate: '2026-01-15', status: 'expired' },
];

export const initialNotifications = [
  { id: 1, type: 'order', title: 'New Order Received', message: 'ORD-2026-1042 from Priya Sharma — ₹4,497', time: '5 min ago', read: false },
  { id: 2, type: 'stock', title: 'Low Stock Alert', message: '24K Gold Luxury Restoration — only 8 units left', time: '1 hour ago', read: false },
  { id: 3, type: 'message', title: 'Customer Message', message: 'Kavya Nair asked about international shipping', time: '2 hours ago', read: false },
  { id: 4, type: 'order', title: 'New Order Received', message: 'ORD-2026-1041 from Zara Malik — ₹1,599', time: '3 hours ago', read: true },
  { id: 5, type: 'stock', title: 'Low Stock Alert', message: 'Purple Violet Toning Elixir — only 12 units left', time: '5 hours ago', read: true },
  { id: 6, type: 'review', title: 'New Review Pending', message: 'Meera Patel left a 5-star review', time: '6 hours ago', read: true },
];

export const analyticsData = {
  weekly: {
    sales: [
      { label: 'Mon', revenue: 12400, orders: 18, customers: 12 },
      { label: 'Tue', revenue: 15800, orders: 22, customers: 15 },
      { label: 'Wed', revenue: 11200, orders: 16, customers: 10 },
      { label: 'Thu', revenue: 18900, orders: 28, customers: 19 },
      { label: 'Fri', revenue: 22400, orders: 35, customers: 24 },
      { label: 'Sat', revenue: 28600, orders: 42, customers: 31 },
      { label: 'Sun', revenue: 19800, orders: 29, customers: 21 },
    ],
  },
  monthly: {
    sales: [
      { label: 'Jan', revenue: 185000, orders: 280, customers: 145 },
      { label: 'Feb', revenue: 212000, orders: 310, customers: 168 },
      { label: 'Mar', revenue: 198000, orders: 295, customers: 152 },
      { label: 'Apr', revenue: 245000, orders: 360, customers: 189 },
      { label: 'May', revenue: 278000, orders: 410, customers: 215 },
      { label: 'Jun', revenue: 312000, orders: 465, customers: 248 },
      { label: 'Jul', revenue: 129100, orders: 190, customers: 132 },
    ],
  },
  yearly: {
    sales: [
      { label: '2022', revenue: 1850000, orders: 2800, customers: 890 },
      { label: '2023', revenue: 2450000, orders: 3650, customers: 1240 },
      { label: '2024', revenue: 3120000, orders: 4520, customers: 1680 },
      { label: '2025', revenue: 3890000, orders: 5680, customers: 2150 },
      { label: '2026', revenue: 1559100, orders: 2310, customers: 1059 },
    ],
  },
};

export const dashboardStats = {
  totalRevenue: 3892847,
  totalOrders: 1042,
  totalProducts: initialProducts.length,
  totalCustomers: initialCustomers.length,
};

export const defaultSettings = {
  store: {
    name: "Shan's Shampoo",
    email: 'hello@shansshampoo.com',
    phone: '+91 98765 43210',
    address: '42 Luxury Lane, Bandra West, Mumbai 400050',
    description: 'Premium luxury hair care for the modern Indian woman.',
  },
  admin: {
    name: 'Shan Admin',
    email: 'admin@shansshampoo.com',
    avatar: 'SA',
  },
  social: {
    instagram: 'https://instagram.com/shansshampoo',
    facebook: 'https://facebook.com/shansshampoo',
    twitter: 'https://twitter.com/shansshampoo',
    youtube: 'https://youtube.com/shansshampoo',
  },
  theme: {
    darkMode: true,
    accentColor: 'purple',
  },
};

export { statuses, paymentStatuses };
