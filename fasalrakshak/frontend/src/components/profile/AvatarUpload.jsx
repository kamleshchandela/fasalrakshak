import React, { useRef, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';
import { AuthContext } from '../../context/AuthContext';

const AvatarUpload = ({ currentPhoto, gender }) => {
  const { updateUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const getFallbackIcon = () => {
    if (gender === 'female') return '👩';
    if (gender === 'other') return '🧑';
    return '👨';
  };

  const showFallback = !currentPhoto || currentPhoto.trim() === '';

  const handleAvatarSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type and size (5MB before compression)
    if (!file.type.startsWith('image/')) {
      showError('Only JPG and PNG photos supported.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showError('Photo is too large. Max 5MB allowed.');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Compress
      const options = {
        maxSizeMB: 0.2, // 200KB max
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      
      // Convert to Base64
      const base64Photo = await fileToBase64(compressedFile);

      // Call API
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profilePhoto: base64Photo })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to upload photo');

      // Update Context synchronously
      updateUser({ profilePhoto: base64Photo });

      // Toast Success
      setSuccessMsg("Profile photo updated! ✅");
      setTimeout(() => setSuccessMsg(null), 3000);

    } catch (err) {
      console.error(err);
      showError('Compression or upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // reset input
    }
  };

  const handleRemovePhoto = async () => {
    if (!window.confirm("Remove profile photo?")) return;
    
    try {
      setIsUploading(true);
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profilePhoto: "" })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to remove photo');
      
      updateUser({ profilePhoto: "" });
    } catch (err) {
      showError('Could not remove photo.');
    } finally {
      setIsUploading(false);
    }
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 5000);
  };

  return (
    <div className="flex flex-col items-center relative">
      <AnimatePresence>
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-12 whitespace-nowrap bg-green-100 text-primary-green px-4 py-1.5 rounded-full text-sm font-bold shadow-sm"
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative w-[96px] h-[96px] lg:w-[120px] lg:h-[120px] rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden
        ${showFallback ? (gender === 'female' ? 'bg-pink-50' : 'bg-primary-lightGreen') : 'bg-white'}
      `}>
        {isUploading ? (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <svg className="animate-spin h-8 w-8 text-primary-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : null}

        {showFallback ? (
          <span className="text-[48px] lg:text-[64px] select-none">{getFallbackIcon()}</span>
        ) : (
          <img src={currentPhoto} alt="Profile" className="w-full h-full object-cover" />
        )}
      </div>

      <input 
        type="file" 
        accept="image/png, image/jpeg, image/jpg" 
        ref={fileInputRef}
        onChange={handleAvatarSelect}
        className="hidden" 
      />
      
      <button 
        onClick={() => fileInputRef.current.click()}
        disabled={isUploading}
        className="mt-3 px-4 py-1.5 border-[1.5px] border-primary-green text-primary-green rounded-lg font-nunito font-bold text-[13px] hover:bg-primary-lightGreen transition-colors disabled:opacity-50"
      >
        📷 Change Photo
      </button>

      {!showFallback && (
        <button 
          onClick={handleRemovePhoto}
          className="mt-2 text-red-500 hover:text-red-700 font-nunito font-semibold text-[12px] underline decoration-1 underline-offset-2 transition-colors"
        >
          Remove Photo
        </button>
      )}

      {error && (
        <p className="text-red-500 font-nunito font-bold text-xs mt-2 text-center max-w-[150px] leading-tight">
          {error}
        </p>
      )}
    </div>
  );
};

export default AvatarUpload;
