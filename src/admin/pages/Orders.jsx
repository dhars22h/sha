import { motion } from 'framer-motion';
import Topbar from '../components/Topbar';
import OrdersTable from '../components/OrdersTable';

export default function Orders() {
  return (
    <div>
      <Topbar title="Orders" subtitle="Track and manage customer orders" />
      <div className="p-4 lg:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <OrdersTable />
        </motion.div>
      </div>
    </div>
  );
}
