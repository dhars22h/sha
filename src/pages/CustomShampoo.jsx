import { motion } from 'framer-motion';
import { FiAward, FiSliders, FiStar } from 'react-icons/fi';
import ShampooConfigurator from '../components/custom/ShampooConfigurator';

const bubbles = [
  { size: 74, left: '6%', top: '18%', delay: 0 },
  { size: 42, left: '82%', top: '15%', delay: 0.8 },
  { size: 58, left: '72%', top: '52%', delay: 1.6 },
  { size: 34, left: '13%', top: '68%', delay: 2.2 },
  { size: 88, left: '90%', top: '74%', delay: 1.1 },
];

export default function CustomShampoo() {
  return (
    <section className="pt-28 pb-24 min-h-screen relative overflow-hidden" style={{ background: '#071911' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 12%, rgba(163,177,138,0.15) 0%, transparent 34%), radial-gradient(circle at 82% 24%, rgba(96,108,56,0.12) 0%, transparent 36%), radial-gradient(circle at 45% 75%, rgba(40,84,63,0.12) 0%, transparent 42%)',
        }}
      />

      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            top: bubble.top,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.58), rgba(96,108,56,0.15), rgba(40,84,63,0.04))',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: 'inset 0 0 22px rgba(255,255,255,0.18), 0 18px 55px rgba(40,84,63,0.15)',
          }}
          animate={{ y: [0, -24, 0], x: [0, 12, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 6 + index, delay: bubble.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8 items-end mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div>
            <p className="text-sm uppercase tracking-widest gold-gradient font-semibold mb-3">Bespoke Hair Atelier</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-luxury leading-tight mb-5">
              Create Your <span className="gradient-text">Custom Shampoo</span>
            </h1>
            <p className="text-white/58 max-w-2xl leading-relaxed">
              Design a personalized Shan&apos;s Shampoo formula with luxury actives, fragrance,
              bottle styling, and a custom label made for your hair ritual.
            </p>
          </div>

          <div className="glass rounded-3xl p-5 grid grid-cols-3 gap-3">
            {[
              { icon: FiSliders, label: 'Formula' },
              { icon: FiStar, label: 'Luxury' },
              { icon: FiAward, label: 'Label' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center rounded-2xl bg-white/5 border border-white/10 py-4 px-2">
                <Icon className="mx-auto mb-2 text-sage-300" size={20} />
                <p className="text-xs font-semibold text-white/65">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <ShampooConfigurator />
      </div>
    </section>
  );
}
