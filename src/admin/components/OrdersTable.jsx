import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEye, FiX } from 'react-icons/fi';
import { useAdmin } from '../context/AdminContext';
import { statuses } from '../data/mockData';

export default function OrdersTable() {
  const { orders, updateOrderStatus } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.deliveryStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusClass = (s) => `status-badge status-${s.toLowerCase()}`;

  return (
    <>
      <div className="admin-card overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-white/10 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center admin-glass rounded-xl px-4 py-2 gap-2">
            <FiSearch className="text-white/40" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-white/30 w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-input w-auto text-sm"
          >
            <option value="All" className="bg-gray-900">All Status</option>
            {statuses.map((s) => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Delivery</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="font-mono text-sm text-purple-300">{order.id}</td>
                  <td>{order.customerName}</td>
                  <td className="text-white/60">{order.date}</td>
                  <td className="font-semibold">₹{order.amount.toLocaleString('en-IN')}</td>
                  <td><span className={statusClass(order.paymentStatus)}>{order.paymentStatus}</span></td>
                  <td>
                    <select
                      value={order.deliveryStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="admin-input text-xs py-1 px-2 w-auto"
                    >
                      {statuses.map((s) => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <motion.button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 rounded-lg admin-glass hover:bg-blue-500/20 text-blue-400"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiEye />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-white/40 py-8">No orders found</p>
        )}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              className="admin-glass-strong rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-luxury text-xl font-bold">Order Details</h3>
                <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-lg hover:bg-white/10">
                  <FiX />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-white/50">Order ID</span><span className="font-mono text-purple-300">{selectedOrder.id}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Customer</span><span>{selectedOrder.customerName}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Date</span><span>{selectedOrder.date}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Items</span><span>{selectedOrder.items}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Amount</span><span className="font-bold text-gold-400">₹{selectedOrder.amount.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Payment</span><span className={statusClass(selectedOrder.paymentStatus)}>{selectedOrder.paymentStatus}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Delivery</span><span className={statusClass(selectedOrder.deliveryStatus)}>{selectedOrder.deliveryStatus}</span></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
