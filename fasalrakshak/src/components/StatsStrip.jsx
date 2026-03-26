import React from 'react';
import { Users, Leaf, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '50,000+', label: 'Kisaan Users' },
  { icon: Leaf, value: '150+', label: 'Diseases Detected' },
  { icon: Target, value: '94%', label: 'Accuracy' },
  { icon: Zap, value: '2 Sec', label: 'Detection Time' },
];

const StatsStrip = () => {
  return (
    <section className="bg-primary-lightGreen py-12 border-y border-primary-sage">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-primary-sage/50">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex flex-col items-center justify-center text-center ${i > 1 ? 'pt-8 lg:pt-0' : ''} ${i % 2 !== 0 ? 'border-t-0' : ''}`}
              >
                <Icon className="w-8 h-8 text-primary-green mb-4" />
                <div className="font-playfair text-4xl lg:text-5xl font-bold text-text-charcoal mb-2">
                  {stat.value}
                </div>
                <div className="font-nunito text-gray-600 font-semibold uppercase tracking-wider text-sm">
                  {stat.label}
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
