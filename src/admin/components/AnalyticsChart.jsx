import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { analyticsData } from '../data/mockData';

const chartColors = {
  revenue: '#7c3aed',
  orders: '#db2777',
  customers: '#f59e0b',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="admin-glass-strong rounded-xl p-3 text-sm">
      <p className="font-semibold text-white mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsChart({ period = 'monthly', compact = false }) {
  const [activePeriod, setActivePeriod] = useState(period);
  const data = analyticsData[activePeriod]?.sales || [];

  const periods = [
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {periods.map((p) => (
          <motion.button
            key={p.key}
            onClick={() => setActivePeriod(p.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${activePeriod === p.key
                ? 'admin-btn-primary'
                : 'admin-glass text-white/60 hover:text-white'}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {p.label}
          </motion.button>
        ))}
      </div>

      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-6`}>
        <motion.div
          className="admin-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-luxury text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={compact ? 220 : 280}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors.revenue} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartColors.revenue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke={chartColors.revenue} fill="url(#salesGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="admin-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-luxury text-lg font-semibold mb-4">Revenue Chart</h3>
          <ResponsiveContainer width="100%" height={compact ? 220 : 280}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenue" fill={chartColors.revenue} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {!compact && (
          <>
            <motion.div
              className="admin-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-luxury text-lg font-semibold mb-4">Orders Chart</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="orders" name="Orders" stroke={chartColors.orders} strokeWidth={2} dot={{ fill: chartColors.orders }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              className="admin-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-luxury text-lg font-semibold mb-4">Customer Growth</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.customers} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColors.customers} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="customers" name="Customers" stroke={chartColors.customers} fill="url(#custGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
