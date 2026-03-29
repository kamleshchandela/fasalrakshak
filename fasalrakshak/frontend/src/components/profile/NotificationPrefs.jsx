import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Custom toggle switch for iOS like feel
const Toggle = ({ isOn, onToggle }) => (
  <motion.button
    onClick={onToggle}
    className={`w-12 h-6 md:w-14 md:h-7 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-primary-green' : 'bg-gray-300'}`}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-sm"
      style={{ marginLeft: isOn ? 'auto' : 0 }}
    />
  </motion.button>
);

const NotificationPrefs = () => {
  const [prefs, setPrefs] = useState({
    diseaseAlerts: true,
    treatmentReminders: true,
    featureUpdates: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fasalrakshak_prefs');
      if (stored) setPrefs(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const handleToggle = (key) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccess(false);
    
    // Simulate API save (in reality we could attach this to profile PATCH)
    await new Promise(r => setTimeout(r, 800));
    
    localStorage.setItem('fasalrakshak_prefs', JSON.stringify(prefs));
    setSuccess(true);
    setIsSaving(false);
    setTimeout(() => setSuccess(false), 2000);
  };

  const PrefRow = ({ title, subTitle, stateKey }) => (
    <div className="flex justify-between items-center py-4 border-b border-primary-sage last:border-0 hover:bg-[#F0F7EB]/30 px-3 -mx-3 rounded-lg transition-colors">
      <div className="flex flex-col pr-4">
        <span className="font-nunito font-bold text-[16px] text-text-charcoal mb-0.5">{title}</span>
        <span className="font-nunito font-semibold text-[13px] text-gray-500 leading-tight">{subTitle}</span>
      </div>
      <Toggle isOn={prefs[stateKey]} onToggle={() => handleToggle(stateKey)} />
    </div>
  );

  return (
    <div className="bg-[#F9FDFA] border-l-[4px] border-l-primary-green border border-gray-100 rounded-r-2xl md:rounded-r-3xl p-5 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-primary-sage pb-4 gap-4">
        <div>
          <h3 className="font-playfair font-bold text-xl md:text-2xl text-text-charcoal flex items-center gap-2 mb-1">
            🔔 Notification Preferences
          </h3>
          <p className="font-nunito font-semibold text-[13px] md:text-[14px] text-gray-500">
            Choose what alerts you want to receive
          </p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`h-[44px] px-6 rounded-lg font-nunito font-bold text-sm transition-all flex items-center gap-2 flex-shrink-0
            ${success ? 'bg-primary-green text-white border-none' : 'bg-transparent border-2 border-primary-green text-primary-green hover:bg-primary-lightGreen'}`}
        >
          {isSaving ? "Saving..." : success ? "✅ Saved" : "Save Preferences"}
        </button>
      </div>

      <div className="flex flex-col">
        <PrefRow 
          title="Disease Alert Tips" 
          subTitle="Get seasonal disease warnings for your crops"
          stateKey="diseaseAlerts" 
        />
        <PrefRow 
          title="Treatment Reminders" 
          subTitle="Remind me to re-apply treatment after 7 days"
          stateKey="treatmentReminders" 
        />
        <PrefRow 
          title="New Feature Updates" 
          subTitle="Be the first to know about new FasalRakshak features"
          stateKey="featureUpdates" 
        />
      </div>
    </div>
  );
};

export default NotificationPrefs;
