import { motion } from 'framer-motion';
import Topbar from '../components/Topbar';
import AnalyticsChart from '../components/AnalyticsChart';

export default function Analytics() {
  return (
    <div>
      <Topbar title="Analytics" subtitle="Deep insights into your business performance" />

      <div className="p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnalyticsChart />
        </motion.div>
      </div>
    </div>
  );
}
