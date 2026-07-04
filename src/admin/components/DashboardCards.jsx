import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiShoppingBag, FiPackage, FiUsers } from 'react-icons/fi';
import { useAdmin } from '../context/AdminContext';
import { dashboardStats } from '../data/mockData';

function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

const cards = [
  {
    key: 'revenue',
    label: 'Total Revenue',
    value: dashboardStats.totalRevenue,
    prefix: '₹',
    icon: FiDollarSign,
    gradient: 'from-purple-600/30 to-pink-600/20',
    iconBg: 'linear-gradient(135deg, #7c3aed, #db2777)',
  },
  {
    key: 'orders',
    label: 'Total Orders',
    value: dashboardStats.totalOrders,
    icon: FiShoppingBag,
    gradient: 'from-pink-600/30 to-rose-600/20',
    iconBg: 'linear-gradient(135deg, #db2777, #f43f5e)',
  },
  {
    key: 'products',
    label: 'Total Products',
    value: dashboardStats.totalProducts,
    icon: FiPackage,
    gradient: 'from-amber-600/30 to-orange-600/20',
    iconBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    key: 'customers',
    label: 'Total Customers',
    value: dashboardStats.totalCustomers,
    icon: FiUsers,
    gradient: 'from-violet-600/30 to-purple-600/20',
    iconBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  },
];

export default function DashboardCards() {
  const { products, customers } = useAdmin();

  const dynamicValues = {
    revenue: dashboardStats.totalRevenue,
    orders: dashboardStats.totalOrders,
    products: products.length,
    customers: customers.length,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          className={`admin-card p-6 relative overflow-hidden bg-gradient-to-br ${card.gradient}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20"
            style={{ background: card.iconBg, filter: 'blur(30px)' }}
          />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-sm text-white/60 mb-2">{card.label}</p>
              <p className="text-2xl lg:text-3xl font-bold text-white font-luxury">
                <AnimatedCounter
                  value={dynamicValues[card.key]}
                  prefix={card.prefix || ''}
                />
              </p>
            </div>
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl"
              style={{ background: card.iconBg }}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <card.icon />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
