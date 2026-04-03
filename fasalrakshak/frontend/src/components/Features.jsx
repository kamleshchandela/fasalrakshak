import React from 'react';
import { WifiOff, Languages, Zap, Heart, History, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: WifiOff,
    title: 'Offline Monitoring',
    desc: 'Bina internet ke bhi khet mein kaam karega app. Syncs when you connect.',
    color: 'text-[#276738]',
    bg: 'bg-green-50',
  },
  {
    icon: Languages,
    title: 'Multilingual Support',
    desc: 'Gujarati, Hindi and English interface for complete farmer independence.',
    color: 'text-[#FF9F43]',
    bg: 'bg-orange-50',
  },
  {
    icon: Zap,
    title: 'Precision AI',
    desc: 'High-speed diagnostic model identifies 150+ diseases in under 2 seconds.',
    color: 'text-[#276738]',
    bg: 'bg-green-50',
  },
  {
    icon: Heart,
    title: 'Verified Treatment',
    desc: 'Get government-vetted medicine names and local bio-fertilizer advice.',
    color: 'text-[#FF9F43]',
    bg: 'bg-orange-50',
  },
  {
    icon: History,
    title: 'Growth Timeline',
    desc: 'Keep a history of your farm scans to track crop growth over seasons.',
    color: 'text-[#276738]',
    bg: 'bg-green-50',
  },
  {
    icon: Cloud,
    title: 'Satellite Weather',
    desc: 'Real-time hyper-local weather risk analysis before the storms arrive.',
    color: 'text-[#FF9F43]',
    bg: 'bg-orange-50',
  }
];

const Features = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-12 max-w-7xl">

        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-nunito font-black text-slate-800 tracking-tighter leading-none mb-8">
            Advanced <span className="text-[#276738]">Features</span> <br/> for Smarter Farming
          </h2>
          <p className="text-slate-500 font-bold text-xl leading-relaxed">
            Everything designed with the farmer in mind — ensuring maximum productivity and minimum loss.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-100/50 border border-slate-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100%] z-0 group-hover:bg-green-50 transition-colors duration-500" />
                
                <div className={`${f.bg} ${f.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 relative z-10 shadow-inner`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-nunito font-black text-slate-800 tracking-tight mb-4 relative z-10">
                   {f.title}
                </h3>
                <p className="text-slate-500 font-bold leading-relaxed relative z-10">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
