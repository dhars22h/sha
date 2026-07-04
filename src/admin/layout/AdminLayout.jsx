import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import '../admin.css';

export default function AdminLayout() {
  return (
    <div className="admin-bg relative flex min-h-screen">
      <div className="admin-orb w-96 h-96 bg-purple-600/20 top-0 -left-48" />
      <div className="admin-orb w-80 h-80 bg-pink-600/15 bottom-0 right-0" />
      <div className="admin-orb w-64 h-64 bg-amber-500/10 top-1/2 left-1/2" />

      <Sidebar />

      <div className="flex-1 min-w-0 relative z-10">
        <motion.main
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
