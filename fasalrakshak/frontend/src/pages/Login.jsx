import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown, ShieldCheck, Zap, Leaf } from 'lucide-react';
import { useSignIn, SignInButton } from '@clerk/clerk-react';

const Login = () => {
  const { user } = useContext(AuthContext);
  const { lang, setLang, t } = useLanguage();
  const { isLoaded: isSignInLoaded } = useSignIn();
  const navigate = useNavigate();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  useEffect(() => { 
    if (user) {
      console.log("User already logged in, redirecting to /detect...");
      navigate('/detect'); 
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'EN', name: t('lang_en'), flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'HI', name: t('lang_hi'), flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'GUJ', name: t('lang_guj'), flag: 'https://flagcdn.com/w40/in.png' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f0f9f1] flex flex-col items-center justify-center relative px-4 py-20 overflow-hidden font-nunito">
      
      {/* Background blobs for premium feel */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-green-200/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald-200/40 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Language Switcher Top Right */}
      <div className="absolute top-8 right-8 z-[100]" ref={langMenuRef}>
        <button 
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100 transition-all hover:bg-white text-sm font-bold text-gray-700"
        >
          <Globe className="w-4 h-4 text-green-700" />
          <span>{lang}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence>
          {isLangMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-50 overflow-hidden py-2"
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${lang === l.code ? 'bg-green-50 text-[#2d5a27]' : 'text-gray-600'}`}
                >
                  <img src={l.flag} alt={l.code} className="w-5 h-4 object-cover rounded-sm" />
                  <span className="text-[14px] font-bold">{l.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] bg-white rounded-[40px] shadow-[0_20px_50px_rgba(45,90,39,0.1)] border border-white/60 p-8 md:p-12 relative z-10"
      >
        {/* Progress Line Top */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex rounded-t-[40px] overflow-hidden">
           <div className="w-1/2 h-full bg-[#2d5a27]"></div>
           <div className="w-1/2 h-full bg-orange-400"></div>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4 mb-8 pt-4">
           <div className="w-16 h-16 bg-[#f0f9f1] rounded-2xl flex items-center justify-center border border-green-100 shadow-sm">
             <Leaf className="w-10 h-10 text-[#2d5a27]" />
           </div>
           <h1 className="text-3xl font-bold text-[#1a2e1a] tracking-tight">
             Fasal<span className="text-[#2d5a27]">Rakshak</span>
           </h1>
           <p className="text-gray-500 font-medium text-center leading-relaxed">
             {t('login.slogan')}
           </p>
        </div>

        {/* Buttons Section */}
        <div className="space-y-4">
          <SignInButton mode="modal" fallbackRedirectUrl="/detect" forceRedirectUrl="/detect">
            <motion.button 
              whileHover={isSignInLoaded ? { scale: 1.02 } : {}}
              whileTap={isSignInLoaded ? { scale: 0.98 } : {}}
              disabled={!isSignInLoaded}
              className={`w-full h-16 rounded-[22px] text-white font-bold text-[18px] flex items-center justify-center gap-6 shadow-xl transition-all border border-white/10 px-10 ${
                !isSignInLoaded ? 'bg-green-800 opacity-60 cursor-wait' : 'bg-[#2d5a27] hover:bg-[#1a3818]'
              }`}
            >
              {!isSignInLoaded ? (
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 border-2 border-green-200 border-t-white rounded-full animate-spin"></div>
                  <span className="tracking-tight uppercase text-sm">Preparing...</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner shrink-0 scale-90">
                    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <span className="tracking-tight">{t('login.googleBtn')}</span>
                </>
              )}
            </motion.button>
          </SignInButton>
          
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-green-50 rounded-full border border-green-100">
               <ShieldCheck className="w-4 h-4 text-green-700" />
               <span className="text-xs font-bold text-green-800 tracking-wide uppercase">{t('login.secure')}</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 bg-[#f0f9f1] rounded-full border border-green-100">
               <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
               <span className="text-xs font-bold text-green-800 tracking-wide uppercase">{t('login.free')}</span>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-12 pt-8 border-t border-dashed border-gray-200">
           <p className="text-center text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase mb-6">
             {t('login.trusted')}
           </p>
           <div className="flex justify-center -space-x-3">
             <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&q=80" alt="farmer1" />
             <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1495539406979-bf61750d38ad?w=100&h=100&q=80" alt="farmer2" />
             <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1?w=100&h=100&q=80" alt="farmer3" />
             <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&q=80" alt="farmer4" />
             <div className="w-10 h-10 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-800">+10k</div>
           </div>
        </div>

      </motion.div>

      {/* Footer text */}
      <footer className="mt-12 flex flex-col items-center gap-4 text-gray-400">
         <p className="text-sm font-medium">{t('login.designed')}</p>
         <Link to="/" className="text-xs font-bold hover:text-green-700 transition-colors uppercase tracking-widest bg-white/50 px-4 py-1.5 rounded-full border border-white/50 shadow-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {t('login.back')}
         </Link>
      </footer>
    </div>
  );
};

export default Login;
