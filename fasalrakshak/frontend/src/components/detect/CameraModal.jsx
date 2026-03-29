import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RefreshCw, ZoomIn, CircleDot } from 'lucide-react';

const CameraModal = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [isReady, setCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // back camera by default
  const [error, setCameraError] = useState(null);
  const [flash, setFlash] = useState(false);

  const startCamera = useCallback(async (mode = 'environment') => {
    // Stop any existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    setCameraReady(false);
    setCameraError(null);

    try {
      const constraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setCameraError('Camera permission denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setCameraError('No camera found on this device.');
      } else {
        setCameraError('Could not start camera. Please try again or use "Upload from Gallery".');
      }
    }
  }, []);

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const switchCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isReady) return;

    // Flash animation
    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `crop_photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
      onCapture(file);
      onClose();
    }, 'image/jpeg', 0.92);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center"
      >
        {/* Close Button - top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-2.5 transition-colors shadow-lg"
          title="Close Camera"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="absolute top-4 left-4 z-10 text-white font-bold text-lg font-nunito flex items-center gap-2">
          <Camera className="w-5 h-5 text-green-400" />
          Take a Photo
        </div>

        {/* Error State */}
        {error ? (
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <span className="text-5xl">📷</span>
            <p className="text-white text-[16px] font-nunito leading-relaxed">{error}</p>
            <button
              onClick={() => startCamera(facingMode)}
              className="bg-[#1A6B2F] text-white px-6 py-3 rounded-xl font-bold font-nunito"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Video Preview */}
            <div className="relative w-full h-full max-w-[500px] max-h-[70vh] flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-2xl"
                style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
              />

              {/* Camera Ready Overlay Grid */}
              {isReady && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Rule of Thirds Grid */}
                  <div className="w-full h-full border border-white/20 rounded-2xl relative">
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20" />
                    {/* Corner Brackets */}
                    {[['top-2 left-2','border-t-2 border-l-2'],['top-2 right-2','border-t-2 border-r-2'],['bottom-2 left-2','border-b-2 border-l-2'],['bottom-2 right-2','border-b-2 border-r-2']].map(([pos,border],i) => (
                      <div key={i} className={`absolute w-6 h-6 ${pos} ${border} border-green-400 rounded-sm`} />
                    ))}
                  </div>
                </div>
              )}

              {/* Flash Effect */}
              {flash && (
                <div className="absolute inset-0 bg-white rounded-2xl animate-ping" style={{ animationDuration: '0.3s' }} />
              )}

              {/* Loading Spinner */}
              {!isReady && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                  <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8 px-6">
              {/* Switch Camera */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={switchCamera}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors"
                title="Switch Camera"
              >
                <RefreshCw className="w-6 h-6" />
              </motion.button>

              {/* Capture Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={capturePhoto}
                disabled={!isReady}
                className={`w-[72px] h-[72px] rounded-full border-4 border-white flex items-center justify-center transition-all
                  ${isReady ? 'bg-white hover:bg-green-100 cursor-pointer' : 'bg-white/40 cursor-not-allowed'}
                `}
                title="Capture"
              >
                <CircleDot className={`w-8 h-8 ${isReady ? 'text-[#1A6B2F]' : 'text-gray-400'}`} />
              </motion.button>

              {/* Cancel Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors"
                title="Cancel"
              >
                <div className="bg-white/20 hover:bg-red-500/70 rounded-full p-4 transition-colors">
                  <X className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-nunito font-bold">Cancel</span>
              </motion.button>
            </div>
          </>
        )}

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    </AnimatePresence>
  );
};

export default CameraModal;
