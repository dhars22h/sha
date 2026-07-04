import { motion } from 'framer-motion';
import {
  FiGrid, FiPackage, FiShoppingBag, FiUsers, FiStar, FiSettings, FiLogOut,
} from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
  { path: '/admin/products', label: 'Products', icon: FiPackage },
  { path: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  { path: '/admin/customers', label: 'Customers', icon: FiUsers },
  { path: '/admin/reviews', label: 'Reviews', icon: FiStar },
  { path: '/admin/settings', label: 'Settings', icon: FiSettings },
];

export default function Sidebar() {
  const { logout, sidebarOpen, setSidebarOpen } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — fixed drawer on mobile, static column on desktop */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 shrink-0 h-screen flex flex-col
          admin-glass-strong border-r border-white/10
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
            >
              ✨
            </div>
            <div>
              <h1 className="font-luxury text-lg font-bold admin-gradient-text">Shan&apos;s Shampoo</h1>
              <p className="text-xs text-white/40">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <NavLink
                to={item.path}
                end={item.path === '/admin/dashboard'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}
              >
                <item.icon className="text-lg flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="admin-sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <FiLogOut className="text-lg flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
