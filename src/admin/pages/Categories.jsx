import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import Topbar from '../components/Topbar';
import { useAdmin } from '../context/AdminContext';

export default function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', icon: '🧴', description: '' });

  const openAdd = () => {
    setForm({ name: '', icon: '🧴', description: '' });
    setModal('add');
  };

  const openEdit = (cat) => {
    setForm({ name: cat.name, icon: cat.icon, description: cat.description || '' });
    setModal(cat.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (modal === 'add') {
      addCategory(form);
    } else {
      updateCategory(modal, form);
    }
    setModal(null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete category "${name}"?`)) deleteCategory(id);
  };

  return (
    <div>
      <Topbar title="Categories" subtitle="Organize your product collections" />

      <div className="p-4 lg:p-8">
        <div className="flex justify-end mb-6">
          <motion.button
            onClick={openAdd}
            className="admin-btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
          >
            <FiPlus /> Add Category
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="admin-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{cat.name}</h3>
                    <p className="text-sm text-white/40">{cat.productCount} products</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(cat)} className="p-2 rounded-lg admin-glass hover:bg-purple-500/20 text-purple-400">
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDelete(cat.id, cat.name)} className="p-2 rounded-lg admin-glass hover:bg-red-500/20 text-red-400">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              {cat.description && (
                <p className="text-sm text-white/50 mt-3">{cat.description}</p>
              )}
            </motion.div>
          ))}
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
                  {modal === 'add' ? 'Add Category' : 'Edit Category'}
                </h3>
                <button type="button" onClick={() => setModal(null)} className="p-2 rounded-lg hover:bg-white/10">
                  <FiX />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Category Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="admin-input" required />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Icon (emoji)</label>
                  <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="admin-input" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="admin-input resize-none" rows={3} />
                </div>
              </div>

              <motion.button type="submit" className="admin-btn-primary w-full mt-6 py-3" whileHover={{ scale: 1.02 }}>
                {modal === 'add' ? 'Create Category' : 'Update Category'}
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
