import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const SEVERITY_COLORS = {
  severe: 'rgba(229,62,62,0.88)',
  moderate: 'rgba(245,166,35,0.88)',
  mild: 'rgba(26,107,47,0.88)',
};

const TYPE_LABELS = { fungal: '🍄 Fungal', bacterial: '🦠 Bacterial', viral: '🧬 Viral', pest: '🐛 Pest', nutrient: '🌱 Nutrient' };

const DiseaseHero = ({ disease }) => (
  <section className="relative h-[300px] md:h-[400px] overflow-hidden">
    <img
      src={disease.image}
      alt={disease.name}
      loading="eager"
      onError={e => { e.target.style.display = 'none'; }}
      className="absolute inset-0 w-full h-full object-cover scale-[1.03] animate-[slowZoom_0.6s_ease-out_forwards]"
    />
    <div className="absolute inset-0 bg-black/65" />

    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-white/70 font-nunito text-[13px] mb-4 flex-wrap">
        <Link to="/" className="hover:text-white">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/diseases" className="hover:text-white">Disease Library</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white">{disease.name}</span>
      </nav>

      {/* Crop badge */}
      <span className="inline-flex self-start items-center gap-1.5 bg-white/20 border border-white/30 text-white font-nunito font-bold text-[13px] px-3 py-1 rounded-full mb-3">
        {disease.cropEmoji} {disease.cropName}
      </span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="font-playfair font-extrabold text-3xl md:text-5xl text-white mb-1 leading-tight"
      >
        {disease.name}
      </motion.h1>

      {disease.localName && (
        <p className="font-nunito italic text-white/75 text-[15px] mb-4">Also known as: {disease.localName}</p>
      )}

      <div className="flex gap-2 flex-wrap">
        <span style={{ background: SEVERITY_COLORS[disease.severity] }} className="text-white font-nunito font-bold text-xs px-3 py-1 rounded-full">
          {disease.severity === 'severe' ? '🔴' : disease.severity === 'moderate' ? '🟡' : '🟢'} {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)}
        </span>
        <span className="bg-black/50 text-white font-nunito font-bold text-xs px-3 py-1 rounded-full">
          {TYPE_LABELS[disease.diseaseType]}
        </span>
        {disease.spreadRate === 'fast' && (
          <span className="bg-[rgba(245,166,35,0.85)] text-white font-nunito font-bold text-xs px-3 py-1 rounded-full">⚡ Spreads Fast</span>
        )}
      </div>
    </div>
  </section>
);

export default DiseaseHero;
