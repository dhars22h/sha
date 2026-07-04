import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import Topbar from '../components/Topbar';
import { useAdmin } from '../context/AdminContext';

export default function Offers() {
  const { offers, addOffer, updateOffer, deleteOffer } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    name: '', discountType: 'percentage', discountValue: '', couponCode: '', expiryDate: '',
  });

  const openAdd = () => {
    setForm({ name: '', discountType: 'percentage', discountValue: '', couponCode: '', expiryDate: '' });
    setModal('add');
  };

  const openEdit = (offer) => {
    setForm({
      name: offer.name,
      discountType: offer.discountType,
      discountValue: offer.discountValue,
      couponCode: offer.couponCode,
      expiryDate: offer.expiryDate,
    });
    setModal(offer.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.couponCode.trim()) return;
    const data = { ...form, discountValue: Number(form.discountValue) };
    if (modal === 'add') {
      addOffer(data);
    } else {
      updateOffer(modal, data);
    }
    setModal(null);
  };

  return (
    <div>
      <Topbar title="Offers" subtitle="Create and manage promotional offers" />

      <div className="p-4 lg:p-8">
        <div className="flex justify-end mb-6">
          <motion.button onClick={openAdd} className="admin-btn-primary flex items-center gap-2" whileHover={{ scale: 1.03 }}>
            <FiPlus /> Create Offer
          </motion.button>
        </div>

        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table w-full">
              <thead>
                <tr>
                  <th>Offer Name</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Coupon Code</th>
                  <th>Expiry</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer, i) => (
                  <motion.tr
                    key={offer.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td className="font-medium">{offer.name}</td>
                    <td className="capitalize text-white/60">{offer.discountType}</td>
                    <td className="font-semibold text-gold-400">
                      {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
                    </td>
                    <td>
                      <code className="px-2 py-1 rounded-lg bg-purple-500/15 text-purple-300 text-sm">
                        {offer.couponCode}
                      </code>
                    </td>
                    <td className="text-white/60">{offer.expiryDate}</td>
                    <td>
                      <span className={`status-badge ${offer.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                        {offer.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(offer)} className="p-2 rounded-lg admin-glass hover:bg-purple-500/20 text-purple-400">
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => { if (window.confirm('Delete this offer?')) deleteOffer(offer.id); }}
                          className="p-2 rounded-lg admin-glass hover:bg-red-500/20 text-red-400"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="admin-glass-strong rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-luxury text-xl font-bold">
                  {modal === 'add' ? 'Create Offer' : 'Edit Offer'}
                </h3>
                <button type="button" onClick={() => setModal(null)} className="p-2 rounded-lg hover:bg-white/10">
                  <FiX />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Offer Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="admin-input" required />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Discount Type</label>
                  <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} className="admin-input">
                    <option value="percentage" className="bg-gray-900">Percentage Discount</option>
                    <option value="fixed" className="bg-gray-900">Fixed Discount</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Discount Value</label>
                  <input type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: e.target.value })} className="admin-input" required />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Coupon Code</label>
                  <input value={form.couponCode} onChange={(e) => setForm({ ...form, couponCode: e.target.value.toUpperCase() })} className="admin-input" required />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Expiry Date</label>
                  <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className="admin-input" required />
                </div>
              </div>

              <motion.button type="submit" className="admin-btn-primary w-full mt-6 py-3" whileHover={{ scale: 1.02 }}>
                {modal === 'add' ? 'Create Offer' : 'Update Offer'}
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
