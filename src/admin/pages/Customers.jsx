import { motion } from 'framer-motion';
import Topbar from '../components/Topbar';
import CustomerTable from '../components/CustomerTable';

export default function Customers() {
  return (
    <div>
      <Topbar title="Customers" subtitle="View and manage your customer base" />
      <div className="p-4 lg:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <CustomerTable />
        </motion.div>
      </div>
    </div>
  );
}
