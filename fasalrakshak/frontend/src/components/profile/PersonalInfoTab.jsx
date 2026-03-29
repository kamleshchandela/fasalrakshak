import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

const PersonalInfoTab = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    village: '',
    district: '',
    state: ''
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        gender: user.gender || 'male',
        village: user.village || '',
        district: user.district || '',
        state: user.state || 'Gujarat'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderSelect = (g) => {
    setFormData({ ...formData, gender: g });
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 5000);
  };

  const handleSave = async () => {
    if (formData.name.trim().length < 2) {
      showError("Name must be at least 2 characters.");
      return;
    }
    
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || "Something went wrong. Try again.");
      
      // Update global context
      updateUser(formData);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsEditMode(false);
      }, 1500);

    } catch (err) {
      showError(err.message || "No internet. Check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  const ViewRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-4 border-b border-primary-sage last:border-0 relative hover:-translate-y-[1px] transition-transform duration-200">
      <span className="font-nunito text-gray-400 font-bold text-[14px]">{label}</span>
      <span className={`font-nunito font-extrabold text-[16px] text-text-charcoal ${!value && 'text-gray-300'}`}>
        {value || "Not set"}
      </span>
    </div>
  );

  return (
    <div className="bg-white border-2 border-primary-sage rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_8px_30px_rgba(26,107,47,0.06)] w-full">
      
      <div className="flex justify-between items-center mb-6 border-b border-primary-sage pb-4">
        <h3 className="font-playfair font-bold text-2xl text-text-charcoal flex items-center gap-2">
          👤 Personal Information
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {!isEditMode ? (
            <div className="flex flex-col">
              <ViewRow label="Full Name" value={user?.name} />
              <ViewRow label="Gender" value={
                <span className={`px-3 py-1 rounded-full text-[13px] ${
                  user?.gender === 'male' ? 'bg-blue-50 text-blue-700' :
                  user?.gender === 'female' ? 'bg-pink-50 text-pink-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {user?.gender === 'male' ? '👨 Male' : user?.gender === 'female' ? '👩 Female' : '🧑 Other'}
                </span>
              } />
              
              {/* Mobile row gets custom rendering */}
              <div className="flex justify-between items-center py-4 border-b border-primary-sage relative">
                <span className="font-nunito text-gray-400 font-bold text-[14px]">Mobile Number</span>
                <span className="font-nunito font-extrabold text-[16px] text-text-charcoal flex items-center gap-2">
                  +91 XXXXXX{user?.mobile?.slice(-4)}
                </span>
              </div>

              <ViewRow label="Village / Town" value={user?.village} />
              <ViewRow label="District" value={user?.district} />
              <ViewRow label="State" value={user?.state} />
              
              <p className="mt-8 text-center text-gray-400 font-bold text-[12px] bg-gray-50 p-3 rounded-lg border border-gray-100">
                🔒 Mobile number cannot be changed. Contact support if needed.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              
              {/* Render Errors visually inline */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg"
                  >
                    <p className="text-red-700 font-nunito font-bold text-sm flex items-center gap-2">
                      ⚠️ {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1">
                <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">Full Name</label>
                <input 
                  type="text" name="name"
                  value={formData.name} onChange={handleChange}
                  className="w-full h-[52px] bg-white border-[1.5px] border-primary-sage rounded-xl px-4 font-nunito font-bold text-[16px] text-text-charcoal focus:border-primary-green focus:ring-4 focus:ring-primary-lightGreen outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">Gender</label>
                <div className="flex gap-2">
                  {[
                    { id: 'male', label: '👨 Male' },
                    { id: 'female', label: '👩 Female' },
                    { id: 'other', label: '🧑 Other' }
                  ].map((g) => (
                    <motion.button
                      key={g.id}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleGenderSelect(g.id)}
                      className={`flex-1 h-[52px] rounded-xl font-nunito font-bold text-[15px] transition-all
                        ${formData.gender === g.id 
                          ? 'bg-primary-green text-white shadow-md' 
                          : 'bg-white border-[1.5px] border-primary-sage text-gray-500 hover:bg-gray-50'}`}
                    >
                      {g.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 relative">
                <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">Mobile Number</label>
                <div className="relative">
                  <input 
                    type="text" disabled 
                    value={`+91 ${user?.mobile}`}
                    className="w-full h-[52px] bg-gray-50 border-[1.5px] border-gray-200 rounded-xl pl-12 font-nunito font-bold text-[16px] text-gray-400 cursor-not-allowed"
                  />
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">Village / Town</label>
                  <input 
                    type="text" name="village" placeholder="e.g. Anand, Kheda"
                    value={formData.village} onChange={handleChange}
                    className="w-full h-[52px] bg-white border-[1.5px] border-primary-sage rounded-xl px-4 font-nunito font-bold text-[16px] text-text-charcoal focus:border-primary-green focus:ring-4 focus:ring-primary-lightGreen outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">District</label>
                  <input 
                    type="text" name="district" placeholder="e.g. Vadodara"
                    value={formData.district} onChange={handleChange}
                    className="w-full h-[52px] bg-white border-[1.5px] border-primary-sage rounded-xl px-4 font-nunito font-bold text-[16px] text-text-charcoal focus:border-primary-green focus:ring-4 focus:ring-primary-lightGreen outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">State</label>
                <input 
                  type="text" name="state"
                  value={formData.state} onChange={handleChange}
                  className="w-full h-[52px] bg-white border-[1.5px] border-primary-sage rounded-xl px-4 font-nunito font-bold text-[16px] text-text-charcoal focus:border-primary-green focus:ring-4 focus:ring-primary-lightGreen outline-none transition-all"
                />
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
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                       ✅ Saved Successfully
                    </motion.div>
                  ) : (
                    "💾 Save Personal Info"
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

export default PersonalInfoTab;
