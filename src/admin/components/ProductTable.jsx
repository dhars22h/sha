import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiEdit2, FiTrash2, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const ITEMS_PER_PAGE = 5;

export default function ProductTable() {
  const { products, deleteProduct } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) deleteProduct(id);
  };

  return (
    <div className="admin-card overflow-hidden">
      <div className="p-4 lg:p-6 border-b border-white/10 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center admin-glass rounded-xl px-4 py-2 gap-2">
          <FiSearch className="text-white/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="bg-transparent border-none outline-none text-sm text-white placeholder-white/30 w-full"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className="admin-input w-auto text-sm"
        >
          {categories.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="admin-input w-auto text-sm"
        >
          <option value="All" className="bg-gray-900">All Status</option>
          <option value="active" className="bg-gray-900">Active</option>
          <option value="inactive" className="bg-gray-900">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product, i) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden admin-glass">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-xl">{product.emoji || '🧴'}</span>
                    )}
                  </div>
                </td>
                <td className="font-medium">{product.name}</td>
                <td className="text-white/60">{product.category}</td>
                <td>
                  <span className={product.stock < 15 ? 'text-amber-400' : ''}>{product.stock}</span>
                </td>
                <td>
                  <span className="text-white/50 line-through text-sm mr-1">₹{product.price}</span>
                  <span className="font-semibold text-gold-400">₹{product.salePrice}</span>
                </td>
                <td>
                  <span className={`status-badge status-${product.status}`}>{product.status}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                      className="p-2 rounded-lg admin-glass hover:bg-purple-500/20 text-purple-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiEdit2 />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 rounded-lg admin-glass hover:bg-red-500/20 text-red-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiTrash2 />
                    </motion.button>
                    <motion.button
                      className="p-2 rounded-lg admin-glass hover:bg-blue-500/20 text-blue-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiEye />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-white/40 py-8">No products found</p>
      )}

      {totalPages > 1 && (
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-sm text-white/50">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg admin-glass disabled:opacity-30"
            >
              <FiChevronLeft />
            </button>
            <span className="text-sm text-white/60 px-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg admin-glass disabled:opacity-30"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
