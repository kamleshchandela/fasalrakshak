import React, { useContext } from 'react';
import { Camera, Search, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';

const HowItWorks = () => {
  const { t } = useContext(LanguageContext);

  const steps = [
    {
      number: '01', icon: Camera,
      title: t('how_step_1'), subtitle: 'Capture Field Data',
      desc: t('how_step_1_desc'),
      color: 'text-[#276738]'
    },
    {
      number: '02', icon: Search,
      title: t('how_step_2'), subtitle: 'Instant AI Sync',
      desc: t('how_step_2_desc'),
      color: 'text-[#276738]'
    },
    {
      number: '03', icon: HeartPulse,
      title: t('how_step_3'), subtitle: 'Expert Solution',
      desc: t('how_step_3_desc'),
      color: 'text-[#276738]'
    }
  ];

  return (
    <section id="how" className="py-32 bg-white flex flex-col items-center">
      <div className="container mx-auto px-4 md:px-12 max-w-7xl">
        
        <div className="text-center mb-24 max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#276738] uppercase bg-green-50 px-4 py-2 rounded-full">Process Flow</span>
          <h2 className="text-5xl md:text-6xl font-nunito font-black text-slate-800 tracking-tighter leading-none">
            {t('how_title')}
          </h2>
          <p className="text-slate-400 font-bold text-lg">Sophisticated technology. Simplified for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="text-[5rem] font-black text-slate-50 line-none mb-[-2.5rem] group-hover:text-green-100 transition-colors duration-500">{step.number}</div>
                <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-center mb-8 border border-slate-50 group-hover:scale-110 transition-transform duration-500">
                  <Icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-2xl font-nunito font-black text-slate-800 tracking-tight mb-2">
                   <span className="text-[#FF9F43]">{step.title.split(' ')[0]}</span> {step.title.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-[10px] font-black text-[#276738] uppercase tracking-widest mb-4">{step.subtitle}</p>
                <p className="text-slate-500 font-bold leading-relaxed max-w-[280px]">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
