import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, TrendingUp, Droplets, Wind, Thermometer, ShieldCheck, AlertTriangle } from 'lucide-react';

const SoilVisualization = ({ data }) => {
  const primaryNutrients = [
    { label: 'Nitrogen (N)', value: data.Nitrogen, color: '#ef4444', icon: <Zap className="w-5 h-5" />, unit: 'kg/ha', ideal: 140, status: data.Nitrogen < 100 ? 'Low' : 'Optimal' },
    { label: 'Phosphorus (P)', value: data.Phosphorus, color: '#f59e0b', icon: <Target className="w-5 h-5" />, unit: 'kg/ha', ideal: 60, status: data.Phosphorus < 40 ? 'Medium' : 'Optimal' },
    { label: 'Potassium (K)', value: data.Potassium, color: '#10b981', icon: <TrendingUp className="w-5 h-5" />, unit: 'kg/ha', ideal: 250, status: data.Potassium < 150 ? 'Low' : 'Optimal' }
  ];

  const secondaryParams = [
    { label: 'pH Level', value: data.pH, color: '#064e3b', icon: <Thermometer className="w-4 h-4" />, unit: '', ideal: '6.5 - 7.5' },
    { label: 'Organic Carbon', value: data.OrganicCarbon, color: '#78350f', icon: <Wind className="w-4 h-4" />, unit: '%', ideal: '0.5 - 0.8' },
    { label: 'Moisture', value: data.Moisture, color: '#2563eb', icon: <Droplets className="w-4 h-4" />, unit: '%', ideal: '15 - 25' }
  ];

  const getProgress = (val, ideal) => {
    const idealVal = typeof ideal === 'string' ? parseFloat(ideal.split('-')[1]) : ideal;
    return Math.min((val / (idealVal * 1.2)) * 100, 100);
  };

  return (
    <div className="space-y-6 h-full">
      {/* Result Overview Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-8">
           <div>
              <h3 className="text-xl font-black text-gray-900 font-playfair tracking-tight">Primary <span className="text-[#10b981]">Soil Vitals</span></h3>
              <p className="text-gray-400 font-nunito font-bold text-xs uppercase tracking-widest mt-1">Key Growth Regulators</p>
           </div>
           <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#10b981]">
              <ShieldCheck className="w-6 h-6" />
           </div>
        </div>

        <div className="space-y-4">
           {primaryNutrients.map((n, i) => (
             <motion.div 
               key={n.label}
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: i * 0.1 }}
               className="p-5 rounded-3xl bg-gray-50/50 border border-gray-100 group hover:shadow-lg hover:bg-white transition-all"
             >
               <div className="flex items-center gap-6">
                  {/* Icon and Progress Info */}
                  <div className="flex-grow">
                     <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-white" style={{ backgroundColor: n.color + '15', color: n.color }}>
                              {n.icon}
                           </div>
                           <span className="font-nunito font-black text-gray-800 tracking-tight">{n.label}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${
                           n.status === 'Low' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
                        }`}>
                           {n.status}
                        </div>
                     </div>
                     
                     <div className="relative pt-1 px-1">
                        <div className="flex items-end justify-between mb-2">
                           <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-black text-gray-900">{n.value}</span>
                              <span className="text-[10px] font-bold text-gray-400">{n.unit}</span>
                           </div>
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ideal: {n.ideal}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${getProgress(n.value, n.ideal)}%` }}
                             transition={{ duration: 1, ease: 'circOut' }}
                             className="h-full rounded-full"
                             style={{ backgroundColor: n.color }}
                           />
                        </div>
                     </div>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>
      </motion.div>

      {/* Secondary Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {secondaryParams.map((p, i) => (
           <motion.div 
             key={p.label}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.4 + i * 0.1 }}
             className="bg-white rounded-[32px] p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center gap-2"
           >
              <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                {p.icon}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.label}</p>
              <div className="text-xl font-black text-gray-900 tracking-tight">
                 {p.value}<span className="text-[10px] font-bold text-gray-400 ml-1">{p.unit}</span>
              </div>
              <div className="mt-2 text-[8px] font-black text-[#10b981] bg-green-50 px-2 py-0.5 rounded-full border border-green-100 uppercase tracking-widest flex items-center gap-1">
                 <AlertTriangle className="w-2 h-2" /> Target: {p.ideal}
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
};

export default SoilVisualization;
