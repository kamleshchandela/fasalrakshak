import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';

const ChangePinForm = () => {
  const [formData, setFormData] = useState({ currentPin: '', newPin: '', confirmNewPin: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    // Only allow digits up to 4
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData({ ...formData, [e.target.name]: value });
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 6000);
  };

  const handleUpdate = async () => {
    const { currentPin, newPin, confirmNewPin } = formData;
    if (currentPin.length !== 4) return showError('Current PIN is incorrect.');
    if (newPin.length !== 4) return showError('PIN must be exactly 4 digits.');
    if (newPin !== confirmNewPin) return showError('New PINs do not match.');

    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/profile/change-pin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error connecting to server');
      }

      setSuccess(true);
      setFormData({ currentPin: '', newPin: '', confirmNewPin: '' });
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      showError(err.message || 'Network error. Try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Real-time strength checks
  const isNewPinValid = formData.newPin.length === 4;
  const isMatch = formData.newPin.length === 4 && formData.newPin === formData.confirmNewPin;
  const isMismatch = formData.confirmNewPin.length > 0 && formData.newPin !== formData.confirmNewPin;

  return (
    <div className="bg-[#FFFDF5] border-l-[4px] border-l-[#F5A623] border border-gray-100 rounded-r-2xl md:rounded-r-3xl p-5 md:p-8 shadow-sm">
      <h3 className="font-playfair font-bold text-xl md:text-2xl text-text-charcoal flex items-center gap-2 mb-1">
        🔐 Change Your PIN
      </h3>
      <p className="font-nunito font-semibold text-[13px] md:text-[14px] text-gray-500 mb-6">
        Your PIN is used to log in to FasalRakshak
      </p>

      <div className="flex flex-col gap-4">
        
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg mb-1"
            >
              <p className="text-red-700 font-nunito font-bold text-sm">⚠️ {error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <label className="text-[13px] font-nunito font-bold text-gray-400 ml-1 block mb-1">Current PIN</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input 
              type={showCurrent ? "text" : "password"} inputMode="numeric" maxLength={4}
              name="currentPin" value={formData.currentPin} onChange={handleChange}
              className="w-full h-[52px] bg-white border-[1.5px] border-gray-200 rounded-xl pl-11 pr-12 font-nunito font-extrabold tracking-[0.2em] text-[18px] text-text-charcoal focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/20 outline-none transition-all"
            />
            <button 
              type="button" onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[13px] font-nunito font-bold text-gray-400 ml-1 block mb-1">New PIN (4 digits)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input 
                type="password" inputMode="numeric" maxLength={4}
                name="newPin" value={formData.newPin} onChange={handleChange}
                className="w-full h-[52px] bg-white border-[1.5px] border-gray-200 rounded-xl pl-11 pr-10 font-nunito font-extrabold tracking-[0.2em] text-[18px] text-text-charcoal focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/20 outline-none transition-all"
              />
              {isNewPinValid && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-green">✅</span>}
            </div>
          </div>

          <div className="relative">
            <label className="text-[13px] font-nunito font-bold text-gray-400 ml-1 block mb-1">Confirm New PIN</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input 
                type="password" inputMode="numeric" maxLength={4}
                name="confirmNewPin" value={formData.confirmNewPin} onChange={handleChange}
                className={`w-full h-[52px] bg-white border-[1.5px] rounded-xl pl-11 pr-10 font-nunito font-extrabold tracking-[0.2em] text-[18px] text-text-charcoal outline-none transition-all
                  ${isMismatch ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/20'}`}
              />
              {isMatch && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-green">✅</span>}
              {isMismatch && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">❌</span>}
            </div>
          </div>
        </div>

        <button 
          onClick={handleUpdate}
          disabled={isSaving || formData.currentPin.length < 4 || formData.newPin.length < 4 || formData.newPin !== formData.confirmNewPin}
          className={`w-full mt-4 h-[52px] flex items-center justify-center gap-2 font-nunito font-bold rounded-xl transition-all text-[16px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed
            ${success 
              ? 'bg-[#1A6B2F] text-white border-none' 
              : 'bg-[#F5A623] text-text-charcoal hover:bg-[#E0941B]'}`}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Updating PIN...
            </>
          ) : success ? (
            "PIN updated successfully ✅"
          ) : (
            "🔐 Update PIN"
          )}
        </button>
      </div>

    </div>
  );
};

export default ChangePinForm;
