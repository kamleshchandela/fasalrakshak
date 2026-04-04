import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '../../context/LanguageContext';

const ScanHistoryPreview = () => {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fasalrakshak_scans');
      if (stored) {
        setScans(JSON.parse(stored).slice(0, 5)); // Just bottom 5 for preview
      }
    } catch (e) {}
  }, []); // Needs sync polling maybe? Let's just grab on mount. It's a preview.

  return (
    <div className="w-full bg-white border-t-2 border-[#E0EDD5] py-12 relative z-20">
      <div className="container mx-auto px-4 max-w-[800px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-playfair font-bold text-xl md:text-2xl text-text-charcoal flex items-center gap-2">
            📊 {t('history.title')}
          </h3>
          <Link to="/profile" className="font-nunito font-bold text-[14px] text-primary-green hover:text-[#155A26] transition-colors">
            {t('history.view_all')} →
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {scans.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center p-8 bg-primary-lightGreen/40 rounded-2xl border border-dashed border-primary-sage">
                <Leaf className="w-12 h-12 text-primary-green/50 mb-3" />
                <p className="font-nunito font-semibold text-gray-500 text-[15px]">{t('history.no_scans')}</p>
              </motion.div>
            ) : (
              scans.map((scan, i) => {
                const isHealthy = scan.status === 'healthy' || scan.healthStatus === 'healthy';
                const confidence = scan.confidencePercent || scan.confidence || 0;
                
                let timeStr = "Recent";
                try {
                  timeStr = formatDistanceToNow(new Date(scan.timestamp), { addSuffix: true });
                } catch(e) {}

                return (
                  <motion.div 
                    key={scan.id || i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-4 bg-white border border-gray-200 hover:border-primary-green rounded-[16px] p-3 cursor-pointer transition-colors shadow-sm"
                  >
                    <div className={`w-[52px] h-[52px] rounded-full border-2 overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-50
                      ${isHealthy ? 'border-primary-green' : 'border-red-400'}
                    `}>
                      {scan.imageThumbnail ? (
                        <img src={scan.imageThumbnail} className="w-full h-full object-cover" alt="thumb" />
                      ) : (
                        <Leaf className={`w-6 h-6 ${isHealthy ? 'text-primary-green' : 'text-red-400'}`} />
                      )}
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-nunito font-bold text-[15px] text-[#1C1C1C] truncate">
                        {isHealthy ? t('history.healthy') : (scan.diseaseName || t('history.unknown_disease'))}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-nunito font-semibold text-[13px] text-gray-500 truncate">{scan.cropName || t('history.unknown_crop')}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="font-nunito font-semibold text-[12px] text-gray-400 truncate">{timeStr}</span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                      <span className={`font-nunito font-bold text-[13px] ${confidence > 80 ? 'text-primary-green' : confidence > 60 ? 'text-amber-500' : 'text-red-600'}`}>
                        {confidence}%
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ScanHistoryPreview;
