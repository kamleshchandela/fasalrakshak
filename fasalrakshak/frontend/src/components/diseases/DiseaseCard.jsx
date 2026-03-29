import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PART_ICONS = { leaf: '🍃', stem: '🌿', root: '🌱', fruit: '🍎', flower: '🌸' };

const SeverityBadge = ({ severity }) => {
  const map = { severe: { color: 'rgba(229,62,62,0.88)', label: '🔴 Severe' }, moderate: { color: 'rgba(245,166,35,0.88)', label: '🟡 Moderate' }, mild: { color: 'rgba(26,107,47,0.88)', label: '🟢 Mild' } };
  const s = map[severity] || map.mild;
  return <span style={{ background: s.color }} className="text-white font-nunito font-bold text-[12px] px-2.5 py-1 rounded-full absolute top-3 left-3">{s.label}</span>;
};

const TypeBadge = ({ type }) => {
  const map = { fungal: '🍄 Fungal', bacterial: '🦠 Bacterial', viral: '🧬 Viral', pest: '🐛 Pest', nutrient: '🌱 Nutrient' };
  return <span className="bg-black/55 text-white font-nunito font-bold text-[12px] px-2.5 py-1 rounded-full absolute top-3 right-3">{map[type] || type}</span>;
};

const DiseaseCard = ({ disease, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="bg-white border-[1.5px] border-[#E0EDD5] rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] cursor-pointer group hover:border-[#1A6B2F] hover:shadow-[0_12px_32px_rgba(26,107,47,0.14)] hover:-translate-y-1.5 transition-all duration-200 flex flex-col"
    >
      {/* Image area */}
      <div className="relative h-[170px] bg-[#F0F7EC] flex-shrink-0 overflow-hidden">
        {!imgError ? (
          <img
            src={disease.thumbnailImage || disease.image}
            alt={disease.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[56px]">{disease.cropEmoji}</span>
          </div>
        )}

        <SeverityBadge severity={disease.severity} />
        <TypeBadge type={disease.diseaseType} />

        {disease.spreadRate === 'fast' && (
          <span className="bg-[rgba(245,166,35,0.88)] text-white font-nunito font-bold text-[11px] px-2 py-0.5 rounded-full absolute bottom-3 left-3">⚡ Spreads Fast</span>
        )}
        {disease.commonInGujarat && (
          <span className="bg-[rgba(26,107,47,0.88)] text-white font-nunito font-bold text-[11px] px-2 py-0.5 rounded-full absolute bottom-3 right-3">📍 Gujarat</span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Crop badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#F0F7EC] border border-[#E0EDD5] rounded-full px-3 py-1 self-start mb-3">
          <span className="text-[13px]">{disease.cropEmoji}</span>
          <span className="font-nunito font-bold text-[12px] text-[#1A6B2F]">{disease.cropName}</span>
        </div>

        <h3 className="font-playfair font-bold text-[17px] text-[#1C1C1C] mb-1 leading-snug line-clamp-2">{disease.name}</h3>
        {disease.localName && (
          <p className="font-nunito text-[13px] italic text-gray-400 mb-2.5">aka {disease.localName}</p>
        )}

        {/* Symptoms preview */}
        <ul className="flex flex-col gap-1 mb-3 flex-1">
          {disease.symptoms.slice(0, 2).map((s, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-[6px] h-[6px] rounded-full bg-gray-400 mt-[6px] flex-shrink-0" />
              <span className="font-nunito text-[13px] text-gray-600 leading-snug">{s}</span>
            </li>
          ))}
          {disease.symptoms.length > 2 && (
            <span className="font-nunito text-[12px] text-[#1A6B2F] mt-0.5">+{disease.symptoms.length - 2} more symptoms</span>
          )}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F0F0F0]">
          <div className="flex gap-1.5">
            {disease.affectedParts.slice(0, 3).map(part => (
              <span key={part} className="w-7 h-7 flex items-center justify-center bg-[#F9F6EE] rounded-full text-[14px]" title={part}>
                {PART_ICONS[part] || '🌿'}
              </span>
            ))}
            {disease.affectedParts.length > 3 && (
              <span className="font-nunito text-[12px] text-gray-400 self-center">+{disease.affectedParts.length - 3}</span>
            )}
          </div>

          <Link
            to={`/diseases/${disease.slug}`}
            className="flex items-center gap-1 font-nunito font-bold text-[13px] text-[#1A6B2F] hover:underline group/link"
            onClick={e => e.stopPropagation()}
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DiseaseCard;
