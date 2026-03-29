import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import AvatarUpload from './AvatarUpload';
import { Eye, EyeOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ProfileHeader = ({ stats, switchToEditMode }) => {
  const { user } = useContext(AuthContext);
  const [showMobile, setShowMobile] = useState(false);

  // Animated counters logic for Stats
  const [displayedScans, setDisplayedScans] = useState(0);
  const [displayedDiseases, setDisplayedDiseases] = useState(0);
  const [displayedDays, setDisplayedDays] = useState(0);

  useEffect(() => {
    // Animates count from 0 to target over 1 second
    const animateStat = (target, setter) => {
      let start = 0;
      const duration = 1000;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      const increment = target / totalFrames;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, frameRate);
      return timer;
    };

    const t1 = animateStat(stats.totalScans || 0, setDisplayedScans);
    const t2 = animateStat(stats.diseasesFound || 0, setDisplayedDiseases);
    const t3 = animateStat(stats.daysActive || 0, setDisplayedDays);

    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, [stats]);

  if (!user) return null;

  // Mask mobile number
  const maskedMobile = user.mobile ? `+91 ${showMobile ? user.mobile : 'XXXXXX' + user.mobile.slice(-4)}` : '';

  // Get date created
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown';
  let lastLoginText = "Recently";
  try {
    if (user.loginTime) {
      lastLoginText = formatDistanceToNow(new Date(user.loginTime), { addSuffix: true });
    }
  } catch (e) {}

  return (
    <motion.div 
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white border-2 border-primary-sage rounded-3xl p-5 md:p-8 shadow-[0_8px_40px_rgba(26,107,47,0.12)] w-full max-w-[900px] mx-auto relative z-10 -mt-8 md:-mt-10 lg:-mt-12"
    >
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center lg:items-start relative">
        
        {/* Left Side: Avatar */}
        <div className="flex-shrink-0">
          <AvatarUpload currentPhoto={user.profilePhoto} gender={user.gender} />
        </div>

        {/* Right Side: Info */}
        <div className="flex-grow flex flex-col items-center lg:items-start text-center lg:text-left mt-2 lg:mt-0">
          <h2 className="font-playfair font-bold text-3xl text-text-charcoal mb-2">
            {user.name}
          </h2>
          
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
              user.gender === 'male' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
              user.gender === 'female' ? 'bg-pink-50 text-pink-700 border border-pink-200' :
              'bg-gray-100 text-gray-700 border border-gray-300'
            }`}>
              {user.gender === 'male' ? '👨 Male' : user.gender === 'female' ? '👩 Female' : '🧑 Other'}
            </span>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600 font-nunito font-semibold mb-2">
            <span>📱 {maskedMobile}</span>
            <button onClick={() => setShowMobile(!showMobile)} className="text-gray-400 hover:text-primary-green focus:outline-none">
              {showMobile ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-gray-500 font-nunito font-semibold text-[14px] mb-1">
            🌿 FasalRakshak member since {joinDate}
          </p>
          <p className="text-gray-400 font-nunito font-semibold text-[13px]">
            Last login: {lastLoginText}
          </p>
        </div>

        {/* Edit Button (Desktop Absolute, Mobile Flow) */}
        <button 
          onClick={switchToEditMode}
          className="lg:absolute lg:top-0 lg:right-0 mt-4 lg:mt-0 w-full lg:w-auto px-6 h-[44px] border-2 border-primary-green text-primary-green font-nunito font-bold rounded-xl hover:bg-primary-lightGreen transition-colors flex items-center justify-center gap-2"
        >
          ✏️ Edit Profile
        </button>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 w-full mt-8 pt-6 border-t border-primary-sage">
        {[
          { icon: '🔍', label: 'Total Scans', val: displayedScans },
          { icon: '⚠️', label: 'Diseases Found', val: displayedDiseases },
          { icon: '🌱', label: 'Days Active', val: displayedDays }
        ].map((stat, i) => (
          <div key={i} className="bg-primary-lightGreen rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center">
            <span className="font-playfair font-bold text-2xl md:text-3xl text-primary-green leading-none mb-1">
              {stat.val}
            </span>
            <p className="font-nunito font-semibold text-gray-600 text-[11px] md:text-[13px] flex items-center gap-1">
              <span className="hidden sm:inline">{stat.icon}</span> {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
