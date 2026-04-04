import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Info } from 'lucide-react';

const ManualForm = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    pH: 7,
    Nitrogen: 0,
    Phosphorus: 0,
    Potassium: 0,
    Moisture: 0,
    OrganicCarbon: 0,
    SoilType: 'Alluvial'
  });

  const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Desert', 'Mountain'];

  useEffect(() => {
    onDataChange(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (parseFloat(value) || 0) : value
    }));
  };

  const getHealthStatus = (name, value) => {
    if (name === 'pH') {
      if (value < 6) return { label: 'Acidic', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
      if (value > 7.5) return { label: 'Alkaline', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' };
      return { label: 'Neutral', color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' };
    }
    // Simple mock ranges for others
    if (value < 50) return { label: 'Low', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
    if (value < 150) return { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { label: 'High', color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' };
  };

  const fields = [
    { name: 'pH', icon: '⚗️', max: 14, min: 0, step: 0.1, unit: '' },
    { name: 'Nitrogen', icon: 'N', max: 500, min: 0, step: 1, unit: 'mg/kg' },
    { name: 'Phosphorus', icon: 'P', max: 500, min: 0, step: 1, unit: 'mg/kg' },
    { name: 'Potassium', icon: 'K', max: 500, min: 0, step: 1, unit: 'mg/kg' },
    { name: 'Moisture', icon: '💧', max: 100, min: 0, step: 1, unit: '%' },
    { name: 'OrganicCarbon', icon: '🌱', max: 10, min: 0, step: 0.1, unit: '%' },
  ];

  return (
    <div className="space-y-12">
      {/* Soil Type Selector */}
      <section>
        <label className="block text-gray-900 font-nunito font-black text-xl mb-6">Soil Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {soilTypes.map(type => (
            <button
              key={type}
              onClick={() => setFormData(prev => ({ ...prev, SoilType: type }))}
              className={`px-4 py-4 rounded-2xl font-bold text-[14px] transition-all border ${
                formData.SoilType === type 
                ? 'bg-[#166534] text-white border-transparent shadow-lg shadow-green-900/20' 
                : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100'
              }`}
            >
              {type} Soil
            </button>
          ))}
        </div>
      </section>

      {/* Grid Inputs */}
      <section>
        <label className="block text-gray-900 font-nunito font-black text-xl mb-6">Nutrient Profile</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fields.map(field => {
            const status = getHealthStatus(field.name, formData[field.name]);
            return (
              <motion.div key={field.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-black text-[#166534] text-xs shadow-inner uppercase tracking-wider">{field.icon}</span>
                    <label className="font-nunito font-black text-gray-800 tracking-tight">{field.name} {field.unit && <span className="text-gray-400 font-bold ml-0.5 opacity-60">({field.unit})</span>}</label>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest ${status.bg} ${status.color} border ${status.border} shadow-sm animate-pulse`}>
                    {status.label}
                  </div>
                </div>
                
                <div className="relative group">
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    max={field.max}
                    min={field.min}
                    step={field.step}
                    className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 font-nunito font-bold text-xl text-gray-900 outline-none focus:border-[#10b981] focus:ring-4 focus:ring-[#10b981]/5 transition-all shadow-sm"
                  />
                  {/* Visual Progress Line */}
                  <div className="absolute bottom-0 left-4 right-4 h-[3px] bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${(formData[field.name] / field.max) * 100}%` }}
                      className={`h-full ${status.bg.replace('50', '500')}`}
                    />
                  </div>
                </div>
                
                {/* Hints */}
                {status.label === 'Low' && (
                  <p className="text-[12px] font-bold text-red-400 flex items-center gap-1 bg-red-50/50 p-2 rounded-lg">
                    <AlertTriangle className="w-3 h-3" /> {field.name} level is very low. Suggestions: Apply NPK 19-19-19.
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ManualForm;
