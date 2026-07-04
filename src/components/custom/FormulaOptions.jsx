import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

export default function FormulaOptions({
  title,
  eyebrow,
  icon: Icon,
  options,
  selected,
  onChange,
  multiple = false,
  columns = 'sm:grid-cols-2',
}) {
  const isSelected = (value) => (
    multiple ? selected.includes(value) : selected === value
  );

  const handleClick = (value) => {
    if (!multiple) {
      onChange(value);
      return;
    }

    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  return (
    <motion.div
      className="glass rounded-3xl p-5 sm:p-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex items-start gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-amber-200 bg-white/10 border border-amber-300/20">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest gold-gradient font-semibold">{eyebrow}</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-luxury">{title}</h2>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${columns} gap-3`}>
        {options.map((option) => {
          const active = isSelected(option);

          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => handleClick(option)}
              className="min-h-14 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all flex items-center justify-between gap-3"
              style={{
                background: active
                  ? 'linear-gradient(135deg, rgba(124,58,237,0.95), rgba(219,39,119,0.9), rgba(245,158,11,0.72))'
                  : 'rgba(255,255,255,0.055)',
                border: active ? '1px solid rgba(251,191,36,0.55)' : '1px solid rgba(255,255,255,0.1)',
                color: active ? '#fff' : 'rgba(255,255,255,0.72)',
                boxShadow: active ? '0 14px 34px rgba(124,58,237,0.24)' : 'none',
              }}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{option}</span>
              {active && (
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FiCheck size={14} />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
