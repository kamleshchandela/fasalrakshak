import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

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
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      scale={1.01}
      transitionSpeed={400}
      perspective={1000}
      className="h-full flex"
      tiltReverse={true}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
        className="bg-white border-[1.5px] border-primary-sage rounded-[24px] overflow-hidden shadow-sm cursor-pointer group hover:border-primary-green/50 hover:shadow-organic hover:-translate-y-2 transition-all duration-300 flex flex-col flex-1"
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
      <div className="p-5 flex flex-col flex-1">
        {/* Crop badge */}
        <div className="inline-flex items-center gap-1.5 bg-primary-lightGreen border border-primary-sage rounded-full px-3 py-1 self-start mb-4">
          <span className="text-[13px]">{disease.cropEmoji}</span>
          <span className="font-nunito font-bold text-[12px] text-primary-darkGreen">{disease.cropName}</span>
        </div>

        <h3 className="font-playfair font-black text-[18px] text-text-charcoal mb-1.5 leading-snug line-clamp-2">{disease.name}</h3>
        {disease.localName && (
          <p className="font-nunito text-[13px] font-semibold text-gray-500 mb-3">aka {disease.localName}</p>
        )}

        {/* Symptoms preview */}
        <ul className="flex flex-col gap-1.5 mb-4 flex-1">
          {disease.symptoms.slice(0, 2).map((s, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-green/50 mt-[6px] flex-shrink-0" />
              <span className="font-nunito text-[13px] text-gray-600 font-medium leading-snug">{s}</span>
            </li>
          ))}
          {disease.symptoms.length > 2 && (
            <span className="font-nunito text-[12px] text-primary-green font-bold mt-1">+{disease.symptoms.length - 2} more symptoms</span>
          )}
        </ul>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex gap-1.5">
            {disease.affectedParts.slice(0, 3).map(part => (
              <span key={part} className="w-8 h-8 flex items-center justify-center bg-background-cream rounded-full text-[14px] border border-gray-100" title={part}>
                {PART_ICONS[part] || '🌿'}
              </span>
            ))}
            {disease.affectedParts.length > 3 && (
              <span className="font-nunito text-[12px] text-gray-400 self-center">+{disease.affectedParts.length - 3}</span>
            )}
          </div>

          <Link
            to={`/diseases/${disease.slug}`}
            className="flex items-center gap-1 font-nunito font-bold text-[14px] text-primary-green hover:text-primary-darkGreen group/link transition-colors"
            onClick={e => e.stopPropagation()}
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      </motion.div>
    </Tilt>
  );
};

export default DiseaseCard;
