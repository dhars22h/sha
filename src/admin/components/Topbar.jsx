import { motion } from 'framer-motion';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { useAdmin } from '../context/AdminContext';
import NotificationPanel from './NotificationPanel';

export default function Topbar({ title, subtitle }) {
  const { setSidebarOpen, settings } = useAdmin();

  return (
    <motion.header
      className="sticky top-0 z-30 admin-glass border-b border-white/10 px-4 lg:px-8 py-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl admin-glass hover:bg-white/10 transition-colors"
          >
            <FiMenu className="text-xl" />
          </button>
          <div>
            <h2 className="font-luxury text-xl lg:text-2xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-sm text-white/50 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center admin-glass rounded-xl px-4 py-2 gap-2">
            <FiSearch className="text-white/40" />
            <input
              type="text"
              placeholder="Quick search..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-white/30 w-48"
            />
          </div>

          <NotificationPanel />

          <motion.div
            className="flex items-center gap-3 admin-glass rounded-xl px-3 py-2"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
            >
              {settings.admin.avatar}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">{settings.admin.name}</p>
              <p className="text-xs text-white/40">Administrator</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
