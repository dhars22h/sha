import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUpload, FiX, FiArrowLeft } from 'react-icons/fi';
import Topbar from '../components/Topbar';
import { useAdmin } from '../context/AdminContext';

const categoryOptions = [
  'Dry Hair', 'Oily Hair', 'Curly Hair', 'Anti-Dandruff', 'Hair Growth', 'Color Protection',
];

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useAdmin();
  const product = products.find((p) => p.id === Number(id));

  const [form, setForm] = useState(null);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        salePrice: product.salePrice,
        stock: product.stock,
        status: product.status,
      });
      if (product.images?.length) {
        setImages(product.images.map((src) => ({ preview: src })));
      }
    }
  }, [product]);

  if (!product || !form) {
    return (
      <div>
        <Topbar title="Edit Product" />
        <div className="p-8 text-center text-white/50">Product not found</div>
      </div>
    );
  }

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

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Product name is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.price || form.price <= 0) errs.price = 'Valid price required';
    if (!form.salePrice || form.salePrice <= 0) errs.salePrice = 'Valid sale price required';
    if (form.stock < 0) errs.stock = 'Valid stock quantity required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateProduct(Number(id), {
      ...form,
      price: Number(form.price),
      salePrice: Number(form.salePrice),
      stock: Number(form.stock),
      images: images.map((img) => img.preview),
    });
    navigate('/admin/products');
  };

  return (
    <div>
      <Topbar title="Edit Product" subtitle={`Editing: ${product.name}`} />

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
            <input name="name" value={form.name} onChange={handleChange} className="admin-input" />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm text-white/60 mb-2 block">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="admin-input resize-none" />
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
              <label className="text-sm text-white/60 mb-2 block">Price (₹)</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} className="admin-input" />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Sale Price (₹)</label>
              <input name="salePrice" type="number" value={form.salePrice} onChange={handleChange} className="admin-input" />
              {errors.salePrice && <p className="text-red-400 text-xs mt-1">{errors.salePrice}</p>}
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Stock</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} className="admin-input" />
              {errors.stock && <p className="text-red-400 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm text-white/60 mb-2 block">Product Images</label>
            <div className="flex gap-3 flex-wrap mb-4">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden admin-glass">
                  {img.preview.startsWith('data:') || img.preview.startsWith('http') ? (
                    <img src={img.preview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">{img.preview}</div>
                  )}
                  <button type="button" onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 p-1 rounded-full bg-red-500/80 text-white text-xs">
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
            <label className="admin-glass rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-purple-500/30 border border-dashed border-white/10">
              <FiUpload className="text-xl text-white/40 mb-1" />
              <span className="text-xs text-white/50">Replace / Add Images</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          <motion.button type="submit" className="admin-btn-primary w-full py-3" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Update Product
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
