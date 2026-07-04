import { motion } from 'framer-motion';
import Topbar from '../components/Topbar';
import DashboardCards from '../components/DashboardCards';
import AnalyticsChart from '../components/AnalyticsChart';
import { useAdmin } from '../context/AdminContext';

export default function Dashboard() {
  const { orders } = useAdmin();
  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <Topbar title="Dashboard" subtitle="Welcome back to your luxury command center" />

      <div className="p-4 lg:p-8 space-y-8">
        <DashboardCards />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnalyticsChart compact />
        </motion.div>

        <motion.div
          className="admin-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-6 border-b border-white/10">
            <h3 className="font-luxury text-lg font-semibold">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    <td className="font-mono text-sm text-purple-300">{order.id}</td>
                    <td>{order.customerName}</td>
                    <td className="font-semibold">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`status-badge status-${order.deliveryStatus.toLowerCase()}`}>
                        {order.deliveryStatus}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
