import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiShoppingBag, FiAlertTriangle, FiMessageCircle } from 'react-icons/fi';
import { useAdmin } from '../context/AdminContext';

const typeIcons = {
  order: FiShoppingBag,
  stock: FiAlertTriangle,
  message: FiMessageCircle,
  review: FiBell,
};

const typeColors = {
  order: '#7c3aed',
  stock: '#f59e0b',
  message: '#3b82f6',
  review: '#db2777',
};

export default function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAdmin();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-xl admin-glass hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiBell className="text-xl text-white/80" />
        {unreadCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #db2777, #f59e0b)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 admin-glass-strong rounded-2xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif, i) => {
                  const Icon = typeIcons[notif.type] || FiBell;
                  return (
                    <motion.div
                      key={notif.id}
                      className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors
                        ${!notif.read ? 'bg-purple-500/5' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => markNotificationRead(notif.id)}
                    >
                      <div className="flex gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${typeColors[notif.type]}20`, color: typeColors[notif.type] }}
                        >
                          <Icon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-white truncate">{notif.title}</p>
                            {!notif.read && (
                              <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{notif.message}</p>
                          <p className="text-xs text-white/30 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
