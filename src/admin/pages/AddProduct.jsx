import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUpload, FiX, FiArrowLeft } from 'react-icons/fi';
import Topbar from '../components/Topbar';
import { useAdmin } from '../context/AdminContext';

const categoryOptions = [
  'Dry Hair', 'Oily Hair', 'Curly Hair', 'Anti-Dandruff', 'Hair Growth', 'Color Protection',
];

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useAdmin();
  const [form, setForm] = useState({
    name: '', description: '', category: 'Dry Hair',
    price: '', salePrice: '', stock: '', status: 'active',
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [...prev, { file, preview: ev.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Product name is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.price || form.price <= 0) errs.price = 'Valid price required';
    if (!form.salePrice || form.salePrice <= 0) errs.salePrice = 'Valid sale price required';
    if (!form.stock || form.stock < 0) errs.stock = 'Valid stock quantity required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addProduct({
      ...form,
      price: Number(form.price),
      salePrice: Number(form.salePrice),
      stock: Number(form.stock),
      emoji: '🧴',
      images: images.map((img) => img.preview),
      rating: 0,
      reviews: 0,
      badge: 'New',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-900/30 to-violet-900/20',
    });
    navigate('/admin/products');
  };

  return (
    <div>
      <Topbar title="Add Product" subtitle="Create a new luxury product listing" />

      <div className="p-4 lg:p-8 max-w-3xl">
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft /> Back to Products
        </button>

        <motion.form
          onSubmit={handleSubmit}
          className="admin-card p-6 lg:p-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <label className="text-sm text-white/60 mb-2 block">Product Name *</label>
            <input name="name" value={form.name} onChange={handleChange} className="admin-input" placeholder="Royal Argan Luxe Shampoo" />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm text-white/60 mb-2 block">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="admin-input resize-none" placeholder="Product description..." />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="admin-input">
                {categoryOptions.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="admin-input">
                <option value="active" className="bg-gray-900">Active</option>
                <option value="inactive" className="bg-gray-900">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Price (₹) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} className="admin-input" placeholder="2499" />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Sale Price (₹) *</label>
              <input name="salePrice" type="number" value={form.salePrice} onChange={handleChange} className="admin-input" placeholder="1499" />
              {errors.salePrice && <p className="text-red-400 text-xs mt-1">{errors.salePrice}</p>}
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Stock Quantity *</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} className="admin-input" placeholder="100" />
              {errors.stock && <p className="text-red-400 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm text-white/60 mb-2 block">Product Images</label>
            <label className="admin-glass rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/30 border border-dashed border-white/10 transition-colors">
              <FiUpload className="text-2xl text-white/40 mb-2" />
              <span className="text-sm text-white/50">Click to upload images</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
            {images.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden admin-glass">
                    <img src={img.preview} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 p-1 rounded-full bg-red-500/80 text-white text-xs">
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            className="admin-btn-primary w-full py-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Product
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
