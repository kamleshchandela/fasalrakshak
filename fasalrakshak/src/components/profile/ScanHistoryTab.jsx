import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const ScanHistoryTab = () => {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fasalrakshak_scans');
      if (stored) {
        setScans(JSON.parse(stored).slice(0, 10)); // max 10
      }
    } catch (e) {}
  }, []);

  const handleClear = () => {
    if (window.confirm("Are you sure? This will delete all your local scan history.")) {
      localStorage.removeItem('fasalrakshak_scans');
      setScans([]);
    }
  };

  const filteredScans = scans.filter(s => {
    if (filter === 'All') return true;
    if (filter === 'Diseased') return s.status === 'disease';
    if (filter === 'Healthy') return s.status === 'healthy';
    
    // date filters
    if (!s.timestamp) return false;
    const scanDate = new Date(s.timestamp);
    const now = new Date();
    if (filter === 'This Week') {
      const diffTime = Math.abs(now - scanDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) <= 7;
    }
    if (filter === 'This Month') {
      return scanDate.getMonth() === now.getMonth() && scanDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const diseasedCount = scans.filter(s => s.status === 'disease').length;
  const healthyCount = scans.filter(s => s.status === 'healthy').length;

  return (
    <div className="bg-white border-2 border-primary-sage rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_8px_30px_rgba(26,107,47,0.06)] w-full relative">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-primary-sage">
        <h3 className="font-playfair font-bold text-2xl text-text-charcoal flex items-center gap-2">
          📊 Your Scan History
        </h3>
        {scans.length > 0 && (
          <button 
            onClick={handleClear}
            className="h-[36px] px-4 border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-500 rounded-lg text-[13px] font-nunito font-bold transition-all"
          >
            Clear All
          </button>
        )}
      </div>

      {scans.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
          {['All', 'Diseased', 'Healthy', 'This Week', 'This Month'].map(f => (
            <motion.button 
              key={f} whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full font-nunito font-bold text-[13px] transition-colors
                ${filter === f ? 'bg-primary-green text-white' : 'bg-primary-lightGreen text-primary-green border border-primary-green/30'}`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {filteredScans.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full min-h-[250px] bg-primary-lightGreen/50 rounded-xl border border-primary-sage border-dashed"
            >
              <Leaf className="w-16 h-16 text-primary-green mb-4 opacity-50" />
              <p className="font-playfair font-bold text-xl text-text-charcoal mb-1">No scans yet</p>
              <p className="font-nunito font-semibold text-gray-500 text-[14px] mb-6">Scan your first crop to see history here</p>
              <button 
                onClick={() => navigate('/detect')}
                className="bg-primary-green text-white h-[44px] px-6 rounded-xl font-nunito font-bold shadow-sm hover:bg-[#155A26] transition-colors"
              >
                🔍 Scan a Crop
              </button>
            </motion.div>
          ) : (
            filteredScans.map((scan, index) => (
              <ScanCard key={scan.id || index} scan={scan} delay={index * 0.05} />
            ))
          )}
        </AnimatePresence>
      </div>

      {scans.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-primary-sage justify-center">
          <StatBadge label={`Total: ${scans.length} scans`} />
          <StatBadge label={`Diseases: ${diseasedCount}`} isAlert={true} />
          <StatBadge label={`Healthy: ${healthyCount}`} />
        </div>
      )}
    </div>
  );
};

// Expandable Card Component
const ScanCard = ({ scan, delay }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isHealthy = scan.status === 'healthy';
  const confidence = scan.confidence || 90;
  
  // Try format date cleanly
  let timeStr = "";
  try {
    if (scan.timestamp) {
      const d = new Date(scan.timestamp);
      timeStr = `${formatDistanceToNow(d, { addSuffix: true })} · ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}`;
    }
  } catch (e) { timeStr = "Recent"; }

  const handleRoute = (e) => {
    e.stopPropagation();
    navigate('/detect', { state: { preloadedScanId: scan.id } }); // Provide a way to route back safely
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: delay }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white border border-primary-sage hover:border-primary-green hover:shadow-md transition-all rounded-2xl p-4 cursor-pointer overflow-hidden relative"
    >
      <div className="flex items-center gap-4">
        {/* Left: Thumbnail container */}
        <div className={`flex-shrink-0 w-[56px] h-[56px] rounded-full border-2 overflow-hidden bg-gray-100 ${isHealthy ? 'border-primary-green' : 'border-red-400'}`}>
          {scan.imageThumbnail ? (
            <img src={scan.imageThumbnail} alt="Crop" className="w-full h-full object-cover" />
          ) : (
            <Leaf className={`w-full h-full p-3 ${isHealthy ? 'text-primary-green' : 'text-red-400'}`} />
          )}
        </div>

        {/* Center: Info */}
        <div className="flex-grow flex flex-col justify-center overflow-hidden">
          <h4 className="font-nunito font-bold text-[16px] text-text-charcoal truncate">
            {scan.diseaseName || (isHealthy ? 'Healthy Plant' : 'Unknown Disease')}
          </h4>
          <p className="font-nunito font-semibold text-[13px] text-gray-500 truncate mb-0.5">
            {scan.cropType || 'Unknown Crop'}
          </p>
          <p className="font-nunito font-semibold text-[12px] text-gray-400 truncate">
            {timeStr}
          </p>
        </div>

        {/* Right: Badges */}
        <div className="flex flex-shrink-0 items-center justify-end gap-3 w-[70px] sm:w-[90px]">
          <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold text-white shadow-sm
            ${confidence >= 80 ? 'bg-primary-green' : confidence >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}>
            {confidence}%
          </span>
          <div className={`w-3 h-3 rounded-full shadow-sm ${isHealthy ? 'bg-primary-green' : 'bg-red-500'}`} />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 mt-4 border-t border-primary-sage"
          >
            <div className="bg-primary-lightGreen/50 p-4 rounded-xl">
              <p className="font-nunito font-semibold text-gray-600 text-sm mb-4">
                {scan.description || (isHealthy ? "No pathogens or visual anomalies found on leaf." : "Disease detected. Immediate action recommended to prevent spread.")}
              </p>
              
              <button 
                onClick={handleRoute}
                className="w-full h-[40px] bg-primary-green text-white font-nunito font-bold text-sm rounded-lg shadow-sm hover:bg-[#155A26] transition-colors"
              >
                View Full Report
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const StatBadge = ({ label, isAlert }) => (
  <div className={`px-4 py-1.5 rounded-full font-nunito font-bold text-[13px] shadow-sm tracking-wide
    ${isAlert ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-[#F0F7EC] text-primary-green border border-[#E0EDD5]'}`}
  >
    {label}
  </div>
);

export default ScanHistoryTab;
