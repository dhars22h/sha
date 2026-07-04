import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEye, FiTrash2, FiX } from 'react-icons/fi';
import { useAdmin } from '../context/AdminContext';

export default function CustomerTable() {
  const { customers, deleteCustomer } = useAdmin();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete customer "${name}"?`)) deleteCustomer(id);
  };

  return (
    <>
      <div className="admin-card overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-white/10">
          <div className="flex items-center admin-glass rounded-xl px-4 py-2 gap-2">
            <FiSearch className="text-white/40" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-white/30 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer, i) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                      >
                        {customer.avatar}
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="text-white/60">{customer.email}</td>
                  <td className="text-white/60">{customer.phone}</td>
                  <td>
                    <span className="px-2 py-1 rounded-lg bg-purple-500/15 text-purple-300 text-sm font-medium">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="text-white/60">{customer.joinedDate}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-2 rounded-lg admin-glass hover:bg-blue-500/20 text-blue-400"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiEye />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(customer.id, customer.name)}
                        className="p-2 rounded-lg admin-glass hover:bg-red-500/20 text-red-400"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiTrash2 />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-white/40 py-8">No customers found</p>
        )}
      </div>

      <AnimatePresence>
        {selectedCustomer && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCustomer(null)}
          >
            <motion.div
              className="admin-glass-strong rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-luxury text-xl font-bold">Customer Profile</h3>
                <button onClick={() => setSelectedCustomer(null)} className="p-2 rounded-lg hover:bg-white/10">
                  <FiX />
                </button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                >
                  {selectedCustomer.avatar}
                </div>
                <div>
                  <p className="text-lg font-semibold">{selectedCustomer.name}</p>
                  <p className="text-sm text-white/50">Member since {selectedCustomer.joinedDate}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-white/50">Email</span><span>{selectedCustomer.email}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Phone</span><span>{selectedCustomer.phone}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Total Orders</span><span className="font-bold text-gold-400">{selectedCustomer.totalOrders}</span></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
