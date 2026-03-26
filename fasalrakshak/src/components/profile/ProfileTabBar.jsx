import React from 'react';
import { motion } from 'framer-motion';

const TABS = [
  { id: 'personal', label: '👤 Personal Info' },
  { id: 'farm', label: '🌾 Farm Details' },
  { id: 'scans', label: '📊 Scan History' },
  { id: 'settings', label: '⚙️ Account Settings' }
];

const ProfileTabBar = ({ activeTab, setActiveTab }) => {
  return (
    <section className="w-full max-w-[900px] mx-auto px-4 mt-8 mb-6 relative z-20">
      <div className="flex flex-wrap md:flex-nowrap gap-3 w-full">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[45%] md:min-w-0 h-[52px] rounded-xl font-nunito font-bold text-[15px] sm:text-[16px] transition-all duration-300 relative
                ${isActive 
                  ? 'bg-primary-green text-white shadow-md' 
                  : 'bg-white text-primary-green border-[1.5px] border-primary-sage hover:bg-primary-lightGreen'
                }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-primary-green rounded-xl z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileTabBar;
