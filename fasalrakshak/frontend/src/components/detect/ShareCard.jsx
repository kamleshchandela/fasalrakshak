import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, FileText, Copy, RefreshCw } from 'lucide-react';

const ShareCard = ({ result, onScanAgain }) => {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const buildSummaryText = () => {
    return `🌾 FasalRakshak Crop Report
Crop: ${result.cropName || 'Unknown'}
Status: ${result.healthStatus || 'Not Determined'}
Disease: ${result.diseaseName || 'None'}
Severity: ${result.severity || 'N/A'}
Confidence: ${result.confidencePercent || 0}%
Top Treatment: ${result.treatments && result.treatments.length > 0 ? result.treatments[0].action : 'None specified'}

Get free crop diagnosis: https://fasalrakshak.app/detect`;
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(buildSummaryText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    // Inject super basic print styles on the fly, then print
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white border-2 border-gray-100 rounded-3xl p-5 md:p-8 shadow-sm flex flex-col items-center print:hidden"
    >
      <h3 className="font-playfair font-bold text-xl md:text-2xl text-text-charcoal mb-6 w-full text-left">
        📤 Share & Save Results
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleWhatsAppShare}
          className="h-[52px] bg-[#25D366] text-white rounded-xl font-nunito font-bold text-[15px] flex items-center justify-center gap-3 shadow-sm hover:bg-[#1DA851] transition-colors"
        >
          <MessageCircle className="w-5 h-5" /> Share on WhatsApp
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handlePrint}
          className="h-[52px] bg-[#E53E3E] text-white rounded-xl font-nunito font-bold text-[15px] flex items-center justify-center gap-3 shadow-sm hover:bg-[#C62828] transition-colors"
        >
          <FileText className="w-5 h-5" /> Download PDF / Print
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className="h-[52px] bg-white border-2 border-primary-green text-primary-green rounded-xl font-nunito font-bold text-[15px] flex items-center justify-center gap-3 shadow-sm hover:bg-primary-lightGreen transition-colors overflow-hidden relative"
        >
          <AnimatePresence mode="popLayout">
            {copied ? (
              <motion.div key="check" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex gap-2">
                <span>✅ Copied!</span>
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex gap-2">
                <Copy className="w-5 h-5" /> Copy Summary
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={onScanAgain}
          className="h-[52px] bg-primary-green text-white rounded-xl font-nunito font-bold text-[15px] flex items-center justify-center gap-3 shadow-[0_4px_15px_rgba(26,107,47,0.2)] hover:bg-[#155A26] transition-colors"
        >
          <RefreshCw className="w-5 h-5" /> Scan Another Crop
        </motion.button>
      </div>

    </motion.div>
  );
};

export default ShareCard;
