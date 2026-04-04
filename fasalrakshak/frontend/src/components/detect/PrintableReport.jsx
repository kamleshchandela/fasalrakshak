import React from 'react';
import { ShieldAlert, Droplets, Leaf, Sprout, Building2, FlaskConical } from 'lucide-react';

const PrintableReport = ({ result, image }) => {
  if (!result) return null;

  // Extract text safely
  const getOrganic = () => {
    if (result.organicAlternative) return result.organicAlternative;
    const org = result.treatments?.find(t => t.type?.toLowerCase() === 'organic');
    return org ? `${org.action}:\n${org.detail}\n(Apply: ${org.timing})` : "Desi cow dung compost and neem spray is recommended.";
  };

  const getChemical = () => {
    const chem = result.treatments?.find(t => t.type?.toLowerCase() === 'chemical');
    if (chem) return `${chem.action}:\n${chem.detail}\n(Apply: ${chem.timing})`;
    if (result.recommendation?.chemical) return result.recommendation.chemical;
    return "Consult nearest agricultural center for exact chemical dosage.";
  };

  const isHealthy = result.healthStatus === 'healthy' || result.isHealthy;
  const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const conf = result.confidencePercent || result.confidence || 0;

  return (
    <div className="w-full min-h-screen bg-white text-black p-10 font-nunito flex flex-col items-center mx-auto" style={{ maxWidth: '210mm' }}>
      
      {/* 1. Official Header */}
      <div className="w-full flex items-center justify-between border-b-[3px] border-[#4A5D23] pb-6 mb-8">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 bg-[#F2F7EF] rounded-full border-2 border-[#4A5D23] flex items-center justify-center">
             <Leaf className="w-8 h-8 text-[#4A5D23]" />
           </div>
           <div>
             <h1 className="text-[36px] leading-none font-playfair font-black text-[#2B3B18] tracking-tight">FasalRakshak</h1>
             <p className="text-[#4A5D23] font-bold text-[16px] tracking-wide mt-1">Official Crop Health Certificate</p>
           </div>
        </div>
        <div className="text-right bg-gray-50 border border-gray-200 rounded-xl p-3">
          <p className="text-[12px] uppercase font-bold text-gray-500 tracking-wider">Generated On</p>
          <p className="text-[#1C1C1C] font-black text-[15px]">{dateStr}</p>
        </div>
      </div>

      {/* 2. Main Identity Block (Image + Status) */}
      <div className="w-full flex gap-8 mb-8 items-stretch">
        <div className="w-[40%] rounded-[20px] overflow-hidden border-[3px] border-[#E0EDD5] h-[260px] shadow-sm relative">
           {image ? (
             <img src={image} className="w-full h-full object-cover" alt="Scanned Crop" />
           ) : (
             <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">No Image</div>
           )}
           <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[12px] font-black uppercase text-[#4A5D23] border border-white">
             {result.aiSource === 'local' ? '💻 Device AI Scan' : '☁️ Cloud AI Scan'}
           </div>
        </div>
        
        <div className="w-[60%] flex flex-col gap-4">
           
           <div className="bg-gradient-to-r from-[#FFF8EE] to-[#FFF4E4] border border-[#F2D7B4] rounded-[20px] p-6 flex items-center gap-5">
              <div className="p-3 bg-white rounded-full border border-[#F2D7B4]">
                <Sprout className="w-8 h-8 text-[#A67B5B]" />
              </div>
              <div>
                <h2 className="text-[#A67B5B] uppercase font-black tracking-widest text-[12px] mb-1">फ़सल / Detected Crop</h2>
                <p className="text-[32px] font-black text-[#4A5D23] leading-none">{result.cropName || 'Unknown Crop'}</p>
              </div>
           </div>
           
           <div className={`flex-1 flex items-center gap-5 rounded-[20px] p-6 border-2 shadow-sm ${isHealthy ? 'bg-[#F2F7EF] border-[#D5E8D4]' : 'bg-[#FFF0F0] border-[#FFD6D6]'}`}>
              <div className="p-3 bg-white rounded-full border shadow-sm">
                <ShieldAlert className={`w-8 h-8 ${isHealthy ? 'text-[#2E7D32]' : 'text-[#D9381E]'}`} />
              </div>
              <div>
                <h2 className={`uppercase font-black tracking-widest text-[12px] mb-1 ${isHealthy ? 'text-[#2E7D32]/80' : 'text-[#D9381E]/60'}`}>
                  रोग / Diagnostic Result
                </h2>
                <p className={`text-[32px] leading-[1.1] font-black ${isHealthy ? 'text-[#2E7D32]' : 'text-[#D9381E]'}`}>
                   {result.diseaseName || (isHealthy ? 'Healthy Plant' : 'Unknown Disease')}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[12px] font-bold ${isHealthy ? 'bg-[#D5E8D4] text-[#1B5E20]' : 'bg-[#FFE5E5] text-[#B71C1C]'}`}>
                    AI Confidence: {conf}%
                  </span>
                </div>
              </div>
           </div>

        </div>
      </div>

      {/* 3. Symptoms Log */}
      {!isHealthy && (
        <div className="w-full bg-[#FAFCFA] rounded-[20px] p-6 border-2 border-[#E9F3E8] mb-8 break-inside-avoid shadow-inner">
          <h3 className="text-[18px] uppercase tracking-widest font-black text-[#2B3B18] mb-4 border-b-2 border-[#E9F3E8] pb-2 flex items-center gap-2">
            लक्षण <span className="text-[#2B3B18]/30">|</span> Observed Symptoms
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 font-semibold text-[#3A4D1A]">
             {(result.symptoms || []).length > 0 ? (
                result.symptoms.map((sym, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#4A5D23] mt-0.5">●</span> <span>{sym}</span>
                  </li>
                ))
             ) : (
                <li className="flex items-center gap-2"><span className="text-[#4A5D23]">●</span> General abnormal signs on leaves.</li>
             )}
          </ul>
        </div>
      )}

      {/* 4. Treatment Prescription Grid */}
      {!isHealthy && (
        <div className="w-full flex gap-6 mt-2 break-inside-avoid">
           
           {/* Chemical Prescription */}
           <div className="w-1/2 p-6 rounded-[24px] border-[3px] border-[#EBF5FF] bg-white shadow-sm flex flex-col">
             <div className="flex items-center gap-3 mb-5 border-b-[2px] border-[#EBF5FF] pb-4">
               <div className="p-2 bg-[#F0F7FF] rounded-xl"><FlaskConical className="w-7 h-7 text-[#1976D2]" /></div>
               <div>
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-[#1976D2]/60">रासायनिक / Chemical</h4>
                 <h3 className="text-[22px] font-black text-[#1565C0] font-playfair leading-none">Medicine</h3>
               </div>
             </div>
             <p className="font-bold text-[#2C3E50] text-[16px] leading-relaxed whitespace-pre-line flex-1">
               {getChemical()}
             </p>
             <div className="mt-5 bg-red-50 text-red-600 font-bold p-3 rounded-xl border border-red-100 text-[12px] flex items-center gap-2">
               <ShieldAlert className="w-5 h-5 flex-shrink-0" />
               <p>WARNING: Always use protective gear when spraying chemicals.</p>
             </div>
           </div>

           {/* Organic Prescription */}
           <div className="w-1/2 p-6 rounded-[24px] border-[3px] border-[#F2F8F1] bg-white shadow-sm flex flex-col">
             <div className="flex items-center gap-3 mb-5 border-b-[2px] border-[#F2F8F1] pb-4">
               <div className="p-2 bg-[#F2F8F1] rounded-xl"><Droplets className="w-7 h-7 text-[#2E7D32]" /></div>
               <div>
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-[#2E7D32]/60">जैविक / Organic</h4>
                 <h3 className="text-[22px] font-black text-[#2E7D32] font-playfair leading-none">Solution</h3>
               </div>
             </div>
             <p className="font-bold text-[#33691E] text-[16px] leading-relaxed whitespace-pre-line flex-1">
               {getOrganic()}
             </p>
             <div className="mt-5 bg-[#F2FCE8] text-[#4CAF50] font-bold p-3 rounded-xl border border-[#E9F3E8] text-[12px] flex items-center gap-2">
               <Leaf className="w-5 h-5 flex-shrink-0" />
               <p>Safe for soil health, crops, and long-term farming sustainability.</p>
             </div>
           </div>

        </div>
      )}

      {/* 5. Footer Trust Stamp */}
      <div className="mt-auto w-full flex items-center justify-between border-t-[3px] border-[#E0EDD5] pt-6 mt-16 pb-4">
        <div className="flex items-center gap-2 text-gray-500">
           <Building2 className="w-5 h-5" />
           <p className="font-black text-[13px] uppercase tracking-wider">FasalRakshak Agri-Tech</p>
        </div>
        <p className="font-bold text-gray-400 text-[12px]">This is an AI generated advisory report. (fasalrakshak.app)</p>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 12mm; }
          body { 
            background: white; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default PrintableReport;
