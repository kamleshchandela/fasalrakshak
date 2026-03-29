import React from 'react';
import { Users, Leaf, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '50,000+', label: 'Farmer Users', sublabel: 'Across Gujarat & India', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { icon: Leaf,  value: '150+',   label: 'Diseases Detected', sublabel: 'Across major crops', color: 'text-[#1A6B2F]', bg: 'bg-[#F0F7EC]', border: 'border-green-100' },
  { icon: Target,value: '94%',    label: 'AI Accuracy',       sublabel: 'Clinically validated', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  { icon: Zap,   value: '2 Sec',  label: 'Detection Time',    sublabel: 'Instant results', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
];

const StatsStrip = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center font-nunito font-bold text-gray-400 text-sm uppercase tracking-widest mb-10"
        >
          Why Gujarat farmers trust FasalRakshak
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i < 2 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                className={`flex flex-col items-center text-center p-6 rounded-2xl border ${stat.border} hover:shadow-md transition-all duration-200 bg-white`}
              >
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="font-playfair font-extrabold text-4xl text-gray-900 mb-1">{stat.value}</div>
                <div className="font-nunito font-bold text-gray-800 text-base mb-1">{stat.label}</div>
                <div className="font-nunito font-medium text-gray-400 text-xs">{stat.sublabel}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
