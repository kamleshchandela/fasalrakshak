import React from 'react';
import { ShieldAlert, Droplets, Leaf } from 'lucide-react';

const PrintableReport = ({ result, image }) => {
  if (!result) return null;

  // Extract text safely
  const getOrganic = () => {
    if (result.organicAlternative) return result.organicAlternative;
    const org = result.treatments?.find(t => t.type?.toLowerCase() === 'organic');
    return org ? `${org.action}: ${org.detail} (Apply: ${org.timing})` : "Desi cow dung compost and neem spray is recommended.";
  };

  const getChemical = () => {
    const chem = result.treatments?.find(t => t.type?.toLowerCase() === 'chemical');
    if (chem) return `${chem.action}: ${chem.detail} (Apply: ${chem.timing})`;
    if (result.recommendation?.chemical) return result.recommendation.chemical;
    return "Consult nearest agricultural center for exact chemical dosage.";
  };

  const isHealthy = result.healthStatus === 'healthy' || result.isHealthy;
  const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="w-full h-full bg-white text-black p-8 font-nunito flex flex-col items-center">
      {/* Header */}
      <div className="border-b-4 border-[#4A5D23] w-full pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black font-playfair text-[#2B3B18]">FasalRakshak</h1>
          <p className="text-[#4A5D23] font-bold text-lg mt-1">Smart Agriculture Analysis Report</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-600">Generated On</p>
          <p className="text-gray-900 font-bold">{dateStr}</p>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="w-full flex gap-8 mb-8">
        <div className="w-1/3 rounded-2xl overflow-hidden border-4 border-[#E0EDD5] h-[280px] shadow-sm">
           <img src={image} className="w-full h-full object-cover" alt="Scanned Crop" />
        </div>
        <div className="w-2/3 flex flex-col justify-center">
           <div className="bg-[#FFF8F0] border-2 border-[#F2D7B4] rounded-2xl p-6 mb-4">
              <h2 className="text-gray-500 uppercase font-black tracking-wider text-sm mb-1">Detected Crop</h2>
              <p className="text-3xl font-black text-[#4A5D23]">{result.cropName || 'Unknown Crop'}</p>
           </div>
           
           <div className={`border-2 rounded-2xl p-6 ${isHealthy ? 'bg-[#F0F7EB] border-[#D5E8D4]' : 'bg-[#FFE5E5] border-[#FFCCCC]'}`}>
              <h2 className="text-gray-500 uppercase font-black tracking-wider text-sm mb-1">Health Status</h2>
              <p className={`text-4xl font-black ${isHealthy ? 'text-[#2E7D32]' : 'text-[#D9381E]'}`}>
                 {result.diseaseName || (isHealthy ? 'Healthy Plant' : 'Unknown Disease')}
              </p>
              {!isHealthy && (
                <p className="font-bold text-[#8C1B06] mt-2">Confidence Level: {result.confidencePercent}% • Severity: {result.severity}</p>
              )}
           </div>
        </div>
      </div>

      {/* Symptoms */}
      {!isHealthy && (
        <div className="w-full bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 mb-8 break-inside-avoid">
          <h3 className="text-xl font-black text-gray-800 mb-3 border-b-2 border-gray-200 pb-2">Observed Symptoms</h3>
          <ul className="list-disc pl-5 font-bold text-gray-700 space-y-2">
             {(result.symptoms || []).length > 0 ? (
                result.symptoms.map((sym, i) => <li key={i}>{sym}</li>)
             ) : (
                <li>General abnormal signs detected on {result.affectedParts?.join(', ') || 'leaves'}.</li>
             )}
          </ul>
        </div>
      )}

      {/* Treatments Grid */}
      {!isHealthy && (
        <div className="w-full flex gap-6 mt-4 break-inside-avoid">
           {/* Chemical */}
           <div className="w-1/2 p-6 rounded-2xl border-4 border-[#BBDEFB] bg-[#F8FBFF]">
             <div className="flex items-center gap-3 mb-4 border-b-2 border-[#BBDEFB] pb-3">
               <ShieldAlert className="w-8 h-8 text-[#1976D2]" />
               <h3 className="text-2xl font-black text-[#1565C0] font-playfair">Chemical Medicine</h3>
             </div>
             <p className="font-black text-gray-800 text-[18px] leading-relaxed">
               {getChemical()}
             </p>
             <p className="text-red-600 font-bold mt-4 text-sm">* WARNING: Always use protective gear when using chemicals.</p>
           </div>

           {/* Organic */}
           <div className="w-1/2 p-6 rounded-2xl border-4 border-[#C8E6C9] bg-[#F9FCF9]">
             <div className="flex items-center gap-3 mb-4 border-b-2 border-[#C8E6C9] pb-3">
               <Leaf className="w-8 h-8 text-[#2E7D32]" />
               <h3 className="text-2xl font-black text-[#2E7D32] font-playfair">Organic Ilaaj</h3>
             </div>
             <p className="font-black text-gray-800 text-[18px] leading-relaxed">
               {getOrganic()}
             </p>
             <p className="text-green-700 font-bold mt-4 text-sm">* Safe for soil health and long-term sustainability.</p>
           </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto w-full text-center border-t-2 border-gray-200 pt-6 mt-16 pb-4">
        <p className="font-black text-gray-500 text-sm">FasalRakshak AI Diagnosis • Free App for Indian Farmers • fasalrakshak.app</p>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 1cm; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default PrintableReport;
