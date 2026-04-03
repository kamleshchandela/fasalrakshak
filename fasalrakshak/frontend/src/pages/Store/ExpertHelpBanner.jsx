import React from 'react';
import { Bot, User, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpertHelpBanner = () => {
  const navigate = useNavigate();

  const handleConsultExpert = () => {
    const encodedMessage = encodeURIComponent("Hi, I'm unsure about which product to use. Can you help me?");
    window.open(`https://wa.me/919979265140?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 mb-6 mt-4">
      <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-sm border border-green-100">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <HelpCircle className="w-8 h-8 text-primary-green" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              🌿 Unsure what to buy?
            </h2>
            <p className="text-gray-600 font-medium mt-1">
              Get instant help from AI or talk to a real expert.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button 
            onClick={() => navigate('/detect')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-xl font-bold border border-gray-200 shadow-sm transition-all whitespace-nowrap"
          >
            <Bot className="w-5 h-5 text-blue-500" />
            Ask AI
          </button>
          
          <button 
            onClick={handleConsultExpert}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb355] text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-all whitespace-nowrap"
          >
            <User className="w-5 h-5" />
            Consult Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertHelpBanner;
