import React from 'react';
import { Users, Leaf, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const StatsStrip = () => {
  const { t } = useContext(LanguageContext);

  const stats = [
    { icon: Users, value: '500k+', label: t('stat_farmers'), sublabel: 'Trusted across rural India', color: 'text-primary-green' },
    { icon: Leaf,  value: '220+',  label: t('stat_crops'), sublabel: 'Comprehensive monitoring', color: 'text-primary-green' },
    { icon: Target,value: '98%',   label: t('stat_accuracy'),   sublabel: 'Clinically validated results', color: 'text-primary-green' },
    { icon: Zap,   value: '1.5s', label: t('stat_speed'), sublabel: 'Instant AI identification', color: 'text-primary-green' },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-6 p-4 bg-slate-50 rounded-[2rem] group-hover:bg-primary-lightGreen transition-colors duration-500">
                  <Icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <div className="font-nunito font-black text-5xl text-slate-800 tracking-tighter mb-2 group-hover:scale-105 transition-transform duration-500">{stat.value}</div>
                <div className="font-nunito font-black text-slate-400 text-xs uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
