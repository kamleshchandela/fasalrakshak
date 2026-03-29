import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
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
        transition={{ duration: 0.4 }}
        className="w-full bg-primary-lightGreen relative pt-16 pb-24 lg:pb-28"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"
            alt="Farm background" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0B2C13] opacity-60"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center text-white">
          <span className="inline-block bg-primary-green/90 border border-primary-green text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm mb-4">
            👤 Kisan Profile
          </span>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold mb-3 drop-shadow-md tracking-tight">
            My Profile
          </h1>
          <p className="text-gray-100/90 text-[15px] lg:text-[17px] font-semibold tracking-wide max-w-md mx-auto leading-relaxed drop-shadow">
            Manage your farm details, scan history and account settings
          </p>
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
      <main className="w-full max-w-[900px] mx-auto px-4 mb-16 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="min-h-[400px]"
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
