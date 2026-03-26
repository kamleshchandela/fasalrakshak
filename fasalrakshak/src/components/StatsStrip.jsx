import React from 'react';
import { Users, Leaf, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '50,000+', label: 'Kisaan Users', sublabel: 'Across Gujarat & India', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Leaf, value: '150+', label: 'Diseases Detected', sublabel: 'Across all major crops', color: 'text-primary-green', bg: 'bg-primary-lightGreen' },
  { icon: Target, value: '94%', label: 'Accuracy', sublabel: 'AI-powered precision', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: Zap, value: '2 Sec', label: 'Detection Time', sublabel: 'Instant results', color: 'text-purple-600', bg: 'bg-purple-50' },
];

const StatsStrip = () => {
  return (
    <section className="py-16 bg-white border-b border-primary-sage/30">
      <div className="container mx-auto px-4 md:px-8">
        
        <p className="text-center font-nunito font-bold text-gray-500 text-sm uppercase tracking-widest mb-10">
          Kyon kisaan FasalRakshak par bharosa karte hain
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-primary-sage hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: '2.5rem', color: '#1C1C1C', lineHeight: 1 }} className="mb-1">
                  {stat.value}
                </div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#1C1C1C', fontSize: '1rem' }} className="mb-1">
                  {stat.label}
                </div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 500, color: '#888', fontSize: '0.8rem' }}>
                  {stat.sublabel}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
