import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Sprout, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const OrganicToggle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const isOrganic = location.pathname === '/organic';

  return (
    <div className="fixed top-20 right-4 sm:top-[120px] sm:right-6 lg:right-10 z-[500]">
      <motion.div 
         drag
         dragMomentum={false}
         dragElastic={0.1}
         initial={{ scale: 0.8, opacity: 0, y: -10 }}
         animate={{ scale: 1, opacity: 1, y: 0 }}
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.95, cursor: "grabbing" }}
         className="pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        <button
          onClick={() => navigate(isOrganic ? '/' : '/organic')}
          className={`group flex items-center p-1 rounded-full border shadow-2xl transition-all duration-500 overflow-hidden relative max-w-[48px] sm:max-w-[52px] hover:max-w-[200px] sm:hover:max-w-[240px]
            ${isOrganic 
              ? 'bg-emerald-600 border-white/20 text-white hover:bg-emerald-700' 
              : 'bg-white/90 backdrop-blur-md border-emerald-100 text-slate-800 hover:border-emerald-500 shadow-emerald-500/10'
            }
          `}
        >
          {/* Leading Icon - Stays visible as a circle */}
          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-500 shrink-0
             ${isOrganic 
               ? 'bg-white text-emerald-600' 
               : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
             }
          `}>
             {isOrganic ? <Sprout className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
          </div>

          {/* Hidden Label - Reveals on hover */}
          <div className="flex flex-col items-start pr-6 pl-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 w-max">
             <span className={`text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1 whitespace-nowrap
                ${isOrganic ? 'text-emerald-100' : 'text-emerald-600'}
             `}>
                {isOrganic ? t('organic.toggle.active') : t('organic.toggle.secure')}
             </span>
             <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-tight whitespace-nowrap">
                   {isOrganic ? t('organic.toggle.standard') : t('organic.toggle.hub')}
                </span>
                {!isOrganic && (
                  <Sparkles className="w-3 h-3 text-emerald-500 group-hover:animate-pulse" />
                )}
             </div>
          </div>
        </button>
      </motion.div>
    </div>
  );
};

export default OrganicToggle;
