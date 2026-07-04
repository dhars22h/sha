import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCheck, FiX, FiTrash2, FiStar } from 'react-icons/fi';
import Topbar from '../components/Topbar';
import { useAdmin } from '../context/AdminContext';

export default function Reviews() {
  const { reviews, updateReviewStatus, deleteReview } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = reviews.filter((r) => {
    const matchSearch =
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} className={i < rating ? 'text-gold-400 fill-gold-400' : 'text-white/20'} />
    ));

  return (
    <div>
      <Topbar title="Reviews" subtitle="Moderate customer product reviews" />

      <div className="p-4 lg:p-8">
        <div className="admin-card overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-white/10 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center admin-glass rounded-xl px-4 py-2 gap-2">
              <FiSearch className="text-white/40" />
              <input
                type="text"
                placeholder="Search reviews..."
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
              <option value="pending" className="bg-gray-900">Pending</option>
              <option value="approved" className="bg-gray-900">Approved</option>
              <option value="rejected" className="bg-gray-900">Rejected</option>
            </select>
          </div>

          <div className="divide-y divide-white/5">
            {filtered.map((review, i) => (
              <motion.div
                key={review.id}
                className="p-4 lg:p-6 hover:bg-white/[0.02] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                      >
                        {review.customerName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{review.customerName}</p>
                        <p className="text-xs text-white/40">{review.product}</p>
                      </div>
                      <span className={`status-badge status-${review.status} ml-auto lg:ml-2`}>
                        {review.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">{renderStars(review.rating)}</div>
                    <p className="text-sm text-white/70">{review.review}</p>
                    <p className="text-xs text-white/30 mt-2">{review.date}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {review.status !== 'approved' && (
                      <motion.button
                        onClick={() => updateReviewStatus(review.id, 'approved')}
                        className="p-2 rounded-lg admin-glass hover:bg-green-500/20 text-green-400"
                        whileHover={{ scale: 1.1 }}
                        title="Approve"
                      >
                        <FiCheck />
                      </motion.button>
                    )}
                    {review.status !== 'rejected' && (
                      <motion.button
                        onClick={() => updateReviewStatus(review.id, 'rejected')}
                        className="p-2 rounded-lg admin-glass hover:bg-amber-500/20 text-amber-400"
                        whileHover={{ scale: 1.1 }}
                        title="Reject"
                      >
                        <FiX />
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => { if (window.confirm('Delete this review?')) deleteReview(review.id); }}
                      className="p-2 rounded-lg admin-glass hover:bg-red-500/20 text-red-400"
                      whileHover={{ scale: 1.1 }}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-white/40 py-8">No reviews found</p>
          )}
        </div>
      </div>
    </div>
  );
}
