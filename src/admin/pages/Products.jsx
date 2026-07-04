import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import Topbar from '../components/Topbar';
import ProductTable from '../components/ProductTable';

export default function Products() {
  return (
    <div>
      <Topbar title="Products" subtitle="Manage your luxury product catalog" />

      <div className="p-4 lg:p-8">
        <div className="flex justify-end mb-6">
          <Link to="/admin/products/add">
            <motion.button
              className="admin-btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiPlus /> Add Product
            </motion.button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ProductTable />
        </motion.div>
      </div>
    </div>
  );
}
