import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import heroLandscape from '../images/hero_landscape.png';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabBar from '../components/profile/ProfileTabBar';
import PersonalInfoTab from '../components/profile/PersonalInfoTab';
import FarmDetailsTab from '../components/profile/FarmDetailsTab';
import ScanHistoryTab from '../components/profile/ScanHistoryTab';
import AccountSettingsTab from '../components/profile/AccountSettingsTab';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [stats, setStats] = useState({ totalScans: 0, diseasesFound: 0, daysActive: 0 });
  
  // Calculate stats on load
  useEffect(() => {
    if (user) {
      // Parse days active
      const createdDate = new Date(user.createdAt || Date.now());
      const diffTime = Math.abs(Date.now() - createdDate);
      const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      
      // Parse scans from localStorage
      let scans = 0, diseased = 0;
      try {
        const stored = JSON.parse(localStorage.getItem('fasalrakshak_scans')) || [];
        scans = stored.length;
        diseased = stored.filter(s => s.status === 'disease').length;
      } catch (e) {}

      setStats({
        totalScans: scans,
        diseasesFound: diseased,
        daysActive: days
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white font-nunito flex flex-col pt-16">
      <Navbar />

      {/* Banner Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-primary-darkGreen relative pt-20 pb-28 lg:pb-32 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={heroLandscape}
            alt="Farm background" 
            className="w-full h-full object-cover filter blur-[2px] opacity-60 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-darkGreen via-primary-darkGreen/50 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center text-white">
          <motion.span 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
             className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm mb-6"
          >
            👤 Kisan Profile
          </motion.span>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
             className="font-playfair text-5xl lg:text-6xl font-black mb-4 drop-shadow-md tracking-tight"
          >
            My Profile
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
             className="text-white/90 text-lg lg:text-xl font-medium tracking-wide max-w-xl mx-auto leading-relaxed drop-shadow"
          >
            Manage your farm details, review your scan history, and update your personal settings securely.
          </motion.p>
        </div>
      </motion.div>

      {/* Profile Header Overlapping Banner */}
      <div className="px-4 w-full">
        <ProfileHeader 
          stats={stats} 
          switchToEditMode={() => setActiveTab('personal')} 
        />
      </div>

      {/* Main Tabs UI */}
      <ProfileTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic Tab Content Area */}
      <main className="w-full max-w-[900px] mx-auto px-4 mb-20 relative -mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            className="min-h-[400px] bg-white rounded-3xl p-6 lg:p-10 shadow-organic border-2 border-primary-sage relative z-20"
          >
            {activeTab === 'personal' && <PersonalInfoTab />}
            {activeTab === 'farm' && <FarmDetailsTab />}
            {activeTab === 'scans' && <ScanHistoryTab />}
            {activeTab === 'settings' && <AccountSettingsTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Logout Footer Section */}
      <section className="bg-white py-12 px-6 border-t border-primary-sage text-center mt-auto">
        <p className="font-nunito font-bold text-gray-500 text-sm mb-4">Done for today?</p>
        <button 
          onClick={handleLogout}
          className="w-full sm:w-auto min-w-[280px] h-[52px] border-2 border-red-500 text-red-500 font-nunito font-bold text-[18px] rounded-xl hover:bg-red-50 transition-colors shadow-sm"
        >
          🚪 Logout from FasalRakshak
        </button>
      </section>

    </div>
  );
};

export default Profile;
