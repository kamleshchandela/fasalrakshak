import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const CROPS_OPTIONS = [
  { id: 'Wheat', label: '🌾 Wheat' }, { id: 'Cotton', label: '🫘 Cotton' }, 
  { id: 'Groundnut', label: '🥜 Groundnut' }, { id: 'Corn', label: '🌽 Corn' }, 
  { id: 'Rice', label: '🍚 Rice' }, { id: 'Onion', label: '🧅 Onion' }, 
  { id: 'Tomato', label: '🍅 Tomato' }, { id: 'Vegetables', label: '🫑 Vegetables' }, 
  { id: 'Garlic', label: '🧄 Garlic' }, { id: 'Potato', label: '🥔 Potato' }, 
  { id: 'Mustard', label: '🫚 Mustard' }, { id: 'Other', label: '🌿 Other' }
];

const IRRIGATION_OPTIONS = [
  { id: 'Drip', label: '💧 Drip' },
  { id: 'Sprinkler', label: '🚿 Sprinkler' },
  { id: 'Flood', label: '🌊 Flood' },
  { id: 'Rain-fed', label: '☔ Rain-fed' }
];

const FarmDetailsTab = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    cropTypes: [],
    landSize: '',
    irrigationMethod: '',
    farmingType: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        cropTypes: user.cropTypes || [],
        landSize: user.landSize || '',
        irrigationMethod: user.irrigationMethod || '',
        farmingType: user.farmingType || ''
      });
    }
  }, [user]);

  const toggleCrop = (cropId) => {
    setFormData(prev => {
      const isSelected = prev.cropTypes.includes(cropId);
      if (isSelected) {
        return { ...prev, cropTypes: prev.cropTypes.filter(c => c !== cropId) };
      } else {
        return { ...prev, cropTypes: [...prev.cropTypes, cropId] };
      }
    });
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 5000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update farm details');
      
      updateUser(formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsEditMode(false);
      }, 1500);

    } catch (err) {
      showError(err.message || 'Error connecting to server');
    } finally {
      setIsSaving(false);
    }
  };

  const hasNoData = formData.cropTypes.length === 0 && !formData.landSize && !formData.irrigationMethod && !formData.farmingType;

  return (
    <div className="bg-white border-2 border-primary-sage rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_8px_30px_rgba(26,107,47,0.06)] w-full relative">
      
      <div className="flex justify-between items-center mb-6 border-b border-primary-sage pb-4">
        <h3 className="font-playfair font-bold text-2xl text-text-charcoal flex items-center gap-2">
          🌾 Farm Details
        </h3>
        {!isEditMode && (
          <button 
            onClick={() => setIsEditMode(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-lightGreen text-primary-green hover:bg-primary-green hover:text-white transition-colors border border-primary-sage"
          >
            ✏️
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isEditMode ? 'edit' : 'view'}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          {!isEditMode ? (
            <div className="flex flex-col gap-6">
              {hasNoData ? (
                <div className="text-center py-6 bg-primary-lightGreen rounded-xl border border-primary-sage border-dashed">
                  <p className="text-gray-500 font-nunito font-semibold mb-4 px-4">
                    Add your farm details to get better crop-specific disease alerts and recommendations.
                  </p>
                  <button 
                    onClick={() => setIsEditMode(true)}
                    className="bg-white text-primary-green border border-primary-green px-6 py-2 rounded-lg font-nunito font-bold hover:bg-primary-green hover:text-white transition-colors shadow-sm"
                  >
                    Add Farm Details
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-nunito text-gray-400 font-bold text-[14px]">Crops You Grow</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.cropTypes.length > 0 ? formData.cropTypes.map(c => {
                        const cropLabel = CROPS_OPTIONS.find(opt => opt.id === c)?.label || c;
                        return (
                          <span key={c} className="bg-primary-lightGreen border border-primary-green text-primary-green px-3 py-1.5 rounded-full font-nunito font-bold text-[13px]">
                            {cropLabel}
                          </span>
                        );
                      }) : <span className="font-nunito font-extrabold text-[16px] text-gray-300">Not set</span>}
                    </div>
                  </div>
                  
                  <div className="h-px bg-primary-sage w-full my-2 relative" />

                  <div className="flex justify-between items-center">
                    <span className="font-nunito text-gray-400 font-bold text-[14px]">Land Size</span>
                    <span className={`font-nunito font-extrabold text-[16px] ${formData.landSize ? 'text-text-charcoal' : 'text-gray-300'}`}>
                      {formData.landSize || "Not set"}
                    </span>
                  </div>
                  
                  <div className="h-px bg-primary-sage w-full my-2 relative" />

                  <div className="flex justify-between items-center">
                    <span className="font-nunito text-gray-400 font-bold text-[14px]">Irrigation Method</span>
                    <span className={`font-nunito font-extrabold text-[16px] ${formData.irrigationMethod ? 'text-text-charcoal' : 'text-gray-300'}`}>
                      {IRRIGATION_OPTIONS.find(i => i.id === formData.irrigationMethod)?.label || formData.irrigationMethod || "Not set"}
                    </span>
                  </div>
                  
                  <div className="h-px bg-primary-sage w-full my-2 relative" />

                  <div className="flex justify-between items-center">
                    <span className="font-nunito text-gray-400 font-bold text-[14px]">Farming Type</span>
                    <span className={`font-nunito font-extrabold text-[16px] ${formData.farmingType ? 'text-primary-green' : 'text-gray-300'}`}>
                      {formData.farmingType === 'Organic' ? '🌿 Organic Farming' : formData.farmingType === 'Conventional' ? '⚗️ Conventional' : 'Not set'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg mb-2"
                  >
                    <p className="text-red-700 font-nunito font-bold text-sm">⚠️ {error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Crops Multi Select */}
              <div className="space-y-2">
                <div>
                  <label className="text-[15px] font-nunito font-bold text-text-charcoal">Crops You Grow</label>
                  <p className="text-[13px] font-nunito font-semibold text-gray-400 leading-none mt-1">Tap to select all crops you grow</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {CROPS_OPTIONS.map(crop => {
                    const isSelected = formData.cropTypes.includes(crop.id);
                    return (
                      <motion.button
                        key={crop.id} type="button" whileTap={{ scale: 0.92 }}
                        onClick={() => toggleCrop(crop.id)}
                        className={`min-h-[44px] px-4 py-2 rounded-full font-nunito font-bold text-[14px] transition-all
                          ${isSelected 
                            ? 'bg-primary-green text-white shadow-sm ring-2 ring-primary-green ring-offset-1' 
                            : 'bg-white border-[1.5px] border-primary-green text-primary-green hover:bg-primary-lightGreen'}`}
                      >
                        {isSelected && "✓ "}{crop.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Land Size */}
              <div className="space-y-1 mt-2">
                <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">Total Farm Land</label>
                <input 
                  type="text" placeholder="e.g. 5 acres or 3 bigha"
                  value={formData.landSize} onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                  className="w-full h-[52px] bg-white border-[1.5px] border-primary-sage rounded-xl px-4 font-nunito font-bold text-[16px] text-text-charcoal focus:border-primary-green focus:ring-4 focus:ring-primary-lightGreen outline-none transition-all"
                />
              </div>

              {/* Irrigation Method */}
              <div className="space-y-2 mt-2">
                <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">Irrigation Method</label>
                <div className="flex flex-wrap gap-2">
                  {IRRIGATION_OPTIONS.map(irr => {
                    const isSelected = formData.irrigationMethod === irr.id;
                    return (
                      <motion.button
                        key={irr.id} type="button" whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({...formData, irrigationMethod: irr.id})}
                        className={`min-h-[44px] px-4 py-2 rounded-full font-nunito font-bold text-[14px] transition-all
                          ${isSelected 
                            ? 'bg-primary-green text-white shadow-sm ring-2 ring-primary-green ring-offset-1' 
                            : 'bg-white border-[1.5px] border-primary-sage text-gray-600 hover:bg-primary-lightGreen'}`}
                      >
                        {irr.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Farming Type */}
              <div className="space-y-2 mt-2">
                <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">Farming Type</label>
                <div className="flex gap-3">
                  <motion.button
                    type="button" whileTap={{ scale: 0.97 }}
                    onClick={() => setFormData({...formData, farmingType: 'Organic'})}
                    className={`flex-1 h-[48px] rounded-xl font-nunito font-bold text-[14px] md:text-[15px] transition-all flex items-center justify-center gap-2
                      ${formData.farmingType === 'Organic' 
                        ? 'bg-primary-green text-white shadow-md' 
                        : 'bg-white border-[1.5px] border-primary-sage text-gray-500 hover:bg-gray-50'}`}
                  >
                    🌿 Organic Farming
                  </motion.button>
                  <motion.button
                    type="button" whileTap={{ scale: 0.97 }}
                    onClick={() => setFormData({...formData, farmingType: 'Conventional'})}
                    className={`flex-1 h-[48px] rounded-xl font-nunito font-bold text-[14px] md:text-[15px] transition-all flex items-center justify-center gap-2
                      ${formData.farmingType === 'Conventional' 
                        ? 'bg-primary-green text-white shadow-md' 
                        : 'bg-white border-[1.5px] border-primary-sage text-gray-500 hover:bg-gray-50'}`}
                  >
                    ⚗️ Conventional
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-primary-sage">
                <button 
                  onClick={() => setIsEditMode(false)}
                  disabled={isSaving}
                  className="w-full sm:flex-1 h-[52px] border-[1.5px] border-gray-300 text-gray-600 font-nunito font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ✕ Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`w-full sm:flex-[2] h-[52px] flex items-center justify-center gap-2 font-nunito font-bold rounded-xl transition-all text-[16px] shadow-sm
                    ${success 
                      ? 'bg-green-500 text-white border-none' 
                      : 'bg-primary-green text-white hover:bg-[#155A26] border border-primary-green'}`}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : success ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">✅ Saved Successfully</motion.div>
                  ) : (
                    "💾 Save Farm Details"
                  )}
                </button>
              </div>

            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FarmDetailsTab;
