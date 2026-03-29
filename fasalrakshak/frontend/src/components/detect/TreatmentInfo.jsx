import React from 'react';
import { Leaf, FlaskConical, Stethoscope, Droplets, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const TreatmentInfo = ({ data }) => {
  if (!data) return null;

  const isHealthy = data.healthStatus === 'healthy' || data.isHealthy;

  // Extract text safely bridging old structure or Gemini format
  const getOrganic = () => {
    if (data.organicAlternative) return data.organicAlternative;
    const org = data.treatments?.find(t => t.type?.toLowerCase() === 'organic');
    return org ? `${org.action}: ${org.detail} (Apply: ${org.timing})` : null;
  };

  const getChemical = () => {
    const chem = data.treatments?.find(t => t.type?.toLowerCase() === 'chemical');
    if (chem) return `${chem.action}: ${chem.detail} (Apply: ${chem.timing})`;
    if (data.recommendation?.chemical) return data.recommendation.chemical;
    return null;
  };

  const organicText = getOrganic() || "Desi cow dung compost and neem spray is recommended for prevention.";
  const chemicalText = getChemical() || "Consult nearest agricultural center for exact chemical dosage.";
  const guidanceText = data.additionalNotes || data.preventionTips?.[0] || 'Maintain good soil health and water regularly.';

  return (
    <div className="mt-8 space-y-6">
      
      {/* Soft & Natural Disease Banner */}
      {!isHealthy && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#FFF8F0] border-[1.5px] border-[#F2D7B4] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-[#FFE5E5] flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm">
             <Stethoscope className="w-8 h-8 text-[#D9381E]" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-[14px] uppercase tracking-wider font-bold text-[#A67B5B] mb-1 font-nunito">Diagnostic Result</h3>
            <p className="font-playfair font-bold text-[#2C2C2C] text-2xl md:text-3xl">
              <span className="text-[#4A5D23]">{data.cropName}</span> is infected with <br className="hidden md:block"/>
              <span className="text-[#D9381E]">{data.diseaseName || 'an Unknown Disease'}</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Expert Kisan Advice */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#F0F7EB] rounded-2xl p-6 shadow-sm border border-[#D5E8D4]"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-[#E0EDD5]">
            <CheckCircle2 className="w-6 h-6 text-[#4A5D23]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2B3B18] mb-1 font-nunito">Farmer's Quick Advice</h3>
            <p className="text-[#4A5D23] font-medium text-[16px] leading-relaxed">
              "{guidanceText}"
            </p>
          </div>
        </div>
      </motion.div>

      {!isHealthy && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chemical / Medical Area - Making it extremely clear */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white border-2 border-[#E3F2FD] rounded-3xl p-6 shadow-sm flex flex-col hover:border-[#BBDEFB] transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#E3F2FD] rounded-xl text-[#1976D2]">
                <FlaskConical className="w-7 h-7" />
              </div>
              <h4 className="text-[20px] font-bold text-[#1565C0] font-playfair">Chemical Medicine</h4>
            </div>
            
            <div className="flex-1 bg-[#F8FBFF] rounded-2xl p-5 border border-[#E3F2FD]">
              <p className="text-[#2C3E50] text-[16px] font-bold leading-relaxed whitespace-pre-line">
                {chemicalText}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-red-500 text-[12px] font-bold px-2">
               <ShieldAlert className="w-4 h-4" /> Please use gloves and mask safely while spraying.
            </div>
          </motion.div>

          {/* Organic / Jaivik Area */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white border-2 border-[#E8F5E9] rounded-3xl p-6 shadow-sm flex flex-col hover:border-[#C8E6C9] transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#E8F5E9] rounded-xl text-[#2E7D32]">
                <Leaf className="w-7 h-7" />
              </div>
              <h4 className="text-[20px] font-bold text-[#2E7D32] font-playfair">Organic (Jaivik) Ilaaj</h4>
            </div>
            <div className="flex-1 bg-[#F9FCF9] rounded-2xl p-5 border border-[#E8F5E9]">
              <p className="text-[#33691E] text-[16px] font-bold leading-relaxed whitespace-pre-line">
                {organicText}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[#4CAF50] text-[12px] font-bold px-2">
               <Droplets className="w-4 h-4" /> Safe for soil and human health.
            </div>
          </motion.div>
        </div>
      )}

      {/* Symptom Summary Container */}
      {!isHealthy && (
        <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
           className="bg-[#FAFAFA] rounded-2xl p-6 border border-[#E0E0E0]"
        >
          <h4 className="font-bold text-[#424242] mb-3 font-nunito">Detected Symptoms:</h4>
          <ul className="space-y-2">
            {(data.symptoms || []).length > 0 ? (
               data.symptoms.map((symptom, i) => (
                 <li key={i} className="flex gap-2 text-[15px] font-medium text-[#616161]">
                   <span className="text-[#9E9E9E]">•</span> {symptom}
                 </li>
               ))
            ) : (
               <li className="text-[#757575]">General crop anomalies detected.</li>
            )}
          </ul>
        </motion.div>
      )}

    </div>
  );
};

export default TreatmentInfo;
