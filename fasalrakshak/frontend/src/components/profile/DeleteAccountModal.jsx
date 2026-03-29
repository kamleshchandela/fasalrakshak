import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AlertTriangle, Lock } from 'lucide-react';

const DeleteAccountModal = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [pin, setPin] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleClearScans = () => {
    if (window.confirm("Are you sure? This will delete all 10 scan records from this device.")) {
      localStorage.removeItem('fasalrakshak_scans');
      alert("Scan history cleared.");
    }
  };

  const handleConfirmDelete = async () => {
    if (pin.length !== 4) return setError("Please enter your 4-digit PIN.");
    
    setIsDeleting(true);
    setError(null);
    try {
      const resp = await fetch('/api/profile/delete-account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      const data = await resp.json();
      
      if (!resp.ok) throw new Error(data.message || 'Server Error');

      // Success
      localStorage.removeItem('fasalrakshak_user');
      localStorage.removeItem('fasalrakshak_scans');
      localStorage.removeItem('fasalrakshak_profile');
      localStorage.removeItem('fasalrakshak_prefs');
      
      // Update context and force navigation
      logout(); 
      navigate('/signup', { state: { message: "Your account has been deleted permanently." }});
    } catch (err) {
      setError(err.message || "Failed to delete account");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-[#FFF5F5] border-l-[4px] border-l-[#E53E3E] border border-gray-100 rounded-r-2xl md:rounded-r-3xl p-5 md:p-8 shadow-sm">
        <h3 className="font-playfair font-bold text-xl md:text-2xl text-text-charcoal flex items-center gap-2 mb-1">
          ⚠️ Danger Zone
        </h3>
        <p className="font-nunito font-semibold text-[13px] md:text-[14px] text-gray-500 mb-6">
          These actions cannot be undone
        </p>

        <div className="flex flex-col divide-y divide-[#FCA5A5]/30">
          
          {/* Row 1: Clear History */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                 🗑️
              </div>
              <div>
                <h4 className="font-nunito font-bold text-[16px] text-red-500">Clear All Scan History</h4>
                <p className="font-nunito font-semibold text-[13px] text-gray-500 mt-0.5 leading-tight">Removes all saved scans from this device</p>
              </div>
            </div>
            <button 
              onClick={handleClearScans}
              className="w-full sm:w-auto px-5 h-[40px] border-[1.5px] border-red-300 text-red-500 font-nunito font-bold text-[14px] rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
            >
              Clear Data
            </button>
          </div>

          {/* Row 2: Delete Account */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-red-900 text-white flex items-center justify-center flex-shrink-0">
                 🚫
              </div>
              <div>
                <h4 className="font-nunito font-bold text-[16px] text-[#7F1D1D]">Delete My Account</h4>
                <p className="font-nunito font-semibold text-[13px] text-gray-500 mt-0.5 leading-tight">Permanently removes your account and all data</p>
              </div>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto px-5 h-[40px] bg-red-600 text-white font-nunito font-bold text-[14px] rounded-lg shadow-sm hover:bg-red-700 transition-colors flex-shrink-0"
            >
              Delete Account
            </button>
          </div>

        </div>
      </div>

      {/* Delete Confirmation Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-[420px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative z-10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-5 border-[4px] border-white shadow-sm">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                
                <h2 className="font-playfair font-bold text-2xl text-red-600 mb-2">Delete Account?</h2>
                <p className="font-nunito font-semibold text-[14px] leading-relaxed text-gray-500 mb-6">
                  This will permanently delete your account, all your profile data, and scan history stored on our servers. This cannot be undone.
                </p>

                {error && <p className="text-red-600 font-nunito font-bold text-sm mb-4 bg-red-50 p-2 rounded-lg w-full">⚠️ {error}</p>}

                <div className="w-full text-left mb-6 relative">
                  <label className="text-[13px] font-nunito font-bold text-gray-500 ml-1 block mb-1">Enter your PIN to confirm</label>
                  <Lock className="absolute left-4 top-[34px] text-gray-400 w-5 h-5 pointer-events-none" />
                  <input 
                    type="password" inputMode="numeric" maxLength={4}
                    value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0,4))}
                    placeholder="****"
                    className="w-full h-[48px] bg-red-50/50 border-[1.5px] border-red-200 rounded-xl pl-11 pr-4 font-nunito font-extrabold tracking-[0.2em] text-[18px] text-text-charcoal focus:border-red-400 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  />
                </div>

                <div className="flex w-full gap-3">
                  <button 
                    onClick={() => { setShowModal(false); setError(null); setPin(''); }}
                    disabled={isDeleting}
                    className="flex-1 h-[48px] border-[1.5px] border-gray-300 text-gray-600 font-nunito font-bold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmDelete}
                    disabled={isDeleting || pin.length < 4}
                    className="flex-[1.5] h-[48px] bg-red-600 text-white font-nunito font-bold border-none rounded-xl shadow-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isDeleting ? "Deleting..." : "Yes, Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteAccountModal;
