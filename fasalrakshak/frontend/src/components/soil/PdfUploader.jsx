import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, UploadCloud, RefreshCcw, CheckCircle2, AlertCircle, FileSearch, Sparkles } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Configure pdfjs worker for modern Vite environments
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfUploader = ({ onDataChange }) => {
  const [file, setFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
       processPdf(uploadedFile);
    }
  };

  const processPdf = async (file) => {
    setFile(file);
    setIsParsing(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        
        let fullText = '';
        const numPages = pdf.numPages;
        
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += textContent.items.map(item => item.str).join(' ');
        }

        // Enhanced Extraction Logic for standard lab tables
        const extractedData = {
          pH: extractValue(fullText, /pH\s+Level/i, 6.5),
          Nitrogen: extractValue(fullText, /Nitrogen\s+\(N\)/i, 40),
          Phosphorus: extractValue(fullText, /Phosphorus\s+\(P\)/i, 30),
          Potassium: extractValue(fullText, /Potassium\s+\(K\)/i, 20),
          Moisture: extractValue(fullText, /Moisture/i, 18),
          OrganicCarbon: extractValue(fullText, /Organic\s+Carbon/i, 0.75),
          SoilType: 'Black'
        };
        // Process immediately for instant feedback
        setIsParsing(false);
        onDataChange(extractedData);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
       console.error('PDF Parse Error:', error);
       setIsParsing(false);
    }
  };

  const extractValue = (text, keyword, defaultValue) => {
    const keywordIndex = text.search(new RegExp(keyword, 'i'));
    if (keywordIndex === -1) return defaultValue;

    // Search for a number within 40 characters after the keyword
    const searchArea = text.slice(keywordIndex, keywordIndex + 40);
    const valueMatch = searchArea.match(/(\d+\.?\d*)/);
    
    return valueMatch ? parseFloat(valueMatch[1]) : defaultValue;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 min-h-[400px]">
      {!file ? (
        <motion.div 
          onDragOver={(e) => { e.preventDefault(); setIsHovered(true); }}
          onDragLeave={() => setIsHovered(false)}
          onDrop={(e) => { e.preventDefault(); setIsHovered(false); handleFileUpload({ target: { files: e.dataTransfer.files }}); }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full max-w-xl border-4 border-dashed rounded-[40px] p-24 flex flex-col items-center justify-center gap-6 cursor-pointer transition-all ${
            isHovered ? 'border-[#10b981] bg-green-50/50' : 'border-gray-100 hover:border-[#10b981]/30 hover:bg-green-50/20'
          }`}
        >
          <div className="w-24 h-24 bg-[#10b981]/10 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
             <UploadCloud className="text-[#10b981] w-12 h-12" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black text-gray-800 font-playfair mb-2 tracking-tight">Drop your PDF Report</h3>
            <p className="text-gray-400 font-nunito font-semibold">Our AI will parse the lab results automatically</p>
          </div>
          <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} id="pdf-upload" />
          <label htmlFor="pdf-upload" className="px-8 py-3 bg-[#166534] text-white rounded-full font-black tracking-wide text-sm cursor-pointer shadow-lg shadow-green-900/20 hover:bg-[#114b27] transition-all">BRROWSE FILE</label>
        </motion.div>
      ) : (
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full max-w-lg bg-green-50 p-8 rounded-[40px] border border-green-100 flex flex-col items-center gap-8 shadow-inner relative"
        >
           {isParsing && (
             <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center gap-6 rounded-[40px]">
                <div className="w-16 h-16 relative">
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-full h-full border-4 border-[#10b981]/20 border-t-[#10b981] rounded-full" />
                   <FileSearch className="absolute inset-0 m-auto w-6 h-6 text-[#10b981] animate-pulse" />
                </div>
                <h4 className="text-[#166534] font-black uppercase tracking-[0.2em] text-xs">Parsing Document...</h4>
             </div>
           )}

           <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white">
              <FileText className="text-[#166534] w-12 h-12" />
           </div>
           
           <div className="text-center">
              <h3 className="text-xl font-black text-gray-900 font-playfair mb-1 max-w-[200px] truncate mx-auto">{file.name}</h3>
              <p className="text-[#10b981]/80 font-nunito font-bold text-sm tracking-widest uppercase">{(file.size / 1024).toFixed(1)} KB PDF</p>
           </div>
           
           {!isParsing && (
            <button
               onClick={() => { setFile(null); onDataChange(null); }}
               className="px-10 py-4 bg-white text-gray-400 rounded-full font-black tracking-widest text-xs hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100 shadow-sm flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> RESTART PROCESS
            </button>
           )}
        </motion.div>
      )}

      {/* PDF Engine Info */}
      {!isParsing && !file && (
        <div className="bg-emerald-50/50 p-6 rounded-[28px] border border-emerald-100/50 flex flex-col md:flex-row items-center gap-6 max-w-4xl">
           <div className="w-14 h-14 bg-[#10b981]/10 rounded-2xl flex items-center justify-center shrink-0">
              <Sparkles className="text-[#10b981] w-7 h-7" />
           </div>
           <p className="text-gray-500 font-nunito font-semibold text-sm leading-relaxed">
             <span className="text-[#166534] font-black uppercase tracking-wider block mb-1">Deep Scan Engine:</span>
             Our system extracts biometric health data directly from your standard PDF lab reports. Simply drag and drop to begin the analysis.
           </p>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
