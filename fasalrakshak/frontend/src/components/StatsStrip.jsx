import React from 'react';
import { Users, Leaf, Target, Zap } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const stats = [
  { icon: Users, value: '50,000+', label: 'Farmer Users', sublabel: 'Across India', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]' },
  { icon: Leaf,  value: '150+',   label: 'Diseases Detected', sublabel: 'Across major crops', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', glow: 'group-hover:shadow-[0_0_30px_rgba(22,163,74,0.3)]' },
  { icon: Target,value: '98%',    label: 'AI Accuracy',       sublabel: 'Clinically validated', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100', glow: 'group-hover:shadow-[0_0_30px_rgba(13,148,136,0.3)]' },
  { icon: Zap,   value: '2 Sec',  label: 'Detection Time',    sublabel: 'Instant offline results', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100', glow: 'group-hover:shadow-[0_0_30px_rgba(8,145,178,0.3)]' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const StatsStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-[#10b981]/5 to-transparent blur-3xl pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#10b981]/10 text-[#10b981] font-nunito font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] mb-4 border border-[#10b981]/20">
            {t('stats.tag')}
          </span>
          <h2 className="font-playfair font-black text-gray-900 text-3xl md:text-4xl">
            {t('stats.title')}
          </h2>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const locItem = Array.isArray(t('stats.items')) ? t('stats.items')[i] : null;
            const value = locItem ? locItem.value : stat.value;
            const label = locItem ? locItem.label : stat.label;
            const sublabel = locItem ? locItem.sublabel : stat.sublabel;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative flex flex-col items-center text-center p-8 rounded-[32px] border ${stat.border} bg-white shadow-sm hover:border-transparent transition-all duration-500 group ${stat.glow}`}
              >
                {/* Internal gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 rounded-[32px] transition-opacity duration-500 -z-10"></div>
                
                <div className={`${stat.bg} ${stat.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner`}>
                  <Icon className="w-10 h-10" />
                </div>
                <div className="font-playfair font-black text-4xl lg:text-5xl text-gray-900 mb-3 tracking-tight">{value}</div>
                <div className="font-nunito font-extrabold text-gray-800 text-lg mb-1">{label}</div>
                <div className="font-nunito font-semibold text-gray-500 text-sm">{sublabel}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsStrip;
