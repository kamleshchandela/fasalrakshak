import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Info, AlertCircle, CheckCircle2, TrendingUp, TrendingDown, Target, Zap, ChevronRight, MessageSquareCode, ShieldCheck } from 'lucide-react';

const SoilInsights = ({ data }) => {
  const getInsights = () => {
    let list = [];
    
    // pH logic
    if (data.pH < 6.5) list.push({ type: 'warning', title: 'Slightly Acidic Soil', desc: 'Add agricultural lime (CaCO3) to neutralize for optimal nutrient uptake.', icon: <AlertCircle className="text-red-500 w-5 h-5 shadow-red-500/10" />, category: 'IMMEDIATE' });
    else if (data.pH > 7.5) list.push({ type: 'warning', title: 'Alkaline Soil', desc: 'Add gypsum or sulfur to lower pH levels back to the target range.', icon: <AlertCircle className="text-orange-500 w-5 h-5 shadow-orange-500/10" />, category: 'URGENT' });
    else list.push({ type: 'success', title: 'Ideal pH Level', desc: 'Great work! Maintain organic matter to keep this balance stable.', icon: <CheckCircle2 className="text-green-500 w-5 h-5" />, category: 'MAINTENANCE' });

    // Nitrogen
    if (data.Nitrogen < 100) list.push({ type: 'danger', title: 'Low Nitrogen (N)', desc: 'Add urea or organic manure immediately to boost leafy growth.', icon: <Zap className="text-[#10b981] w-5 h-5 animate-pulse" />, category: 'CRITICAL' });
    
    // Potassium
    if (data.Potassium < 200) list.push({ type: 'warning', title: 'Potassium Boost Need', desc: 'Enhance plant disease resistance with MOP during mid-stage.', icon: <ShieldCheck className="text-blue-500 w-5 h-5" />, category: 'PLANNED' });

    // Crop Suggestions
    if (data.SoilType === 'Alluvial' || !data.SoilType) list.push({ type: 'crop', title: 'Best for Rice & Wheat', desc: 'Your current NPK balance is ideal for high-yield cereal crops.', icon: <TrendingUp className="text-blue-500 w-5 h-5" />, category: 'YIELD' });

    return list;
  };

  const insights = getInsights();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl relative flex flex-col h-full border border-gray-100/50"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black text-gray-900 font-playfair tracking-tight">AI <span className="text-[#10b981]">Soil Strategies</span></h3>
          <p className="text-gray-400 font-nunito font-bold text-sm">Targeted recommendations for your field</p>
        </div>
        <div className="bg-[#f0fdf4] p-3 rounded-2xl shadow-inner border border-green-50">
           <Lightbulb className="w-6 h-6 text-[#166534]" />
        </div>
      </div>

      <div className="space-y-5 flex-grow pr-2 custom-scrollbar overflow-y-auto max-h-[550px]">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-[32px] border-2 group transition-all hover:translate-x-2 cursor-pointer relative overflow-hidden ${
              insight.type === 'danger' ? 'bg-red-50/30 border-red-100/50 hover:border-red-300' : 
              insight.type === 'warning' ? 'bg-orange-50/30 border-orange-100/50 hover:border-orange-300' :
              insight.type === 'crop' ? 'bg-blue-50/30 border-blue-100/50 hover:border-blue-300' : 'bg-green-50/30 border-green-100/50 hover:border-green-300'
            }`}
          >
            {/* Category Tag */}
            <div className={`absolute top-6 right-6 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full border ${
               insight.category === 'CRITICAL' ? 'bg-red-500 text-white border-red-500' :
               insight.category === 'MAINTENANCE' ? 'bg-[#10b981] text-white border-[#10b981]' :
               'bg-gray-100 text-gray-500 border-gray-200'
            }`}>
               {insight.category}
            </div>

            <div className="flex gap-4">
              <div className="p-3 rounded-2xl bg-white shadow-md shadow-gray-200/50 shrink-0 h-fit flex items-center justify-center border border-gray-50">
                {insight.icon}
              </div>
              <div className="max-w-[80%]">
                <h4 className="font-nunito font-black text-gray-800 tracking-tight text-lg leading-tight mb-2 uppercase text-[15px]">{insight.title}</h4>
                <p className="font-nunito font-bold text-gray-500/80 text-sm leading-relaxed">{insight.desc}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] font-black text-green-700 underline underline-offset-4">Read Complete Protocol</span>
               <ChevronRight className="w-4 h-4 text-green-700" />
            </div>
          </motion.div>
        ))}

        {insights.length === 0 && (
          <div className="text-center py-24 bg-gray-50/30 rounded-[32px] border-2 border-dashed border-gray-100">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-gray-50 animate-pulse">
                <MessageSquareCode className="w-8 h-8 text-gray-300" />
             </div>
             <p className="text-gray-400 font-nunito font-black uppercase tracking-widest text-[10px]">Processing Lab Records...</p>
          </div>
        )}
      </div>

      {/* Yield Forecast Extension */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="mt-8 bg-gradient-to-br from-[#064e3b] to-[#14532d] rounded-[32px] p-8 border border-white/10 shadow-2xl relative overflow-hidden group cursor-pointer"
      >
         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform h-full">
            <TrendingUp className="w-32 h-32 text-white" />
         </div>
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <TrendingUp className="text-white w-5 h-5" />
               </div>
               <p className="text-white font-playfair font-black text-xl tracking-tight">Yield Potential</p>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
               <span className="text-3xl font-black text-emerald-400 tracking-tighter">+12.4%</span>
               <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Growth Forecast</span>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] leading-normal">Optimised by FasalRakshak Core AI Engine</p>
         </div>
      </motion.div>
    </motion.div>
  );
};

export default SoilInsights;
