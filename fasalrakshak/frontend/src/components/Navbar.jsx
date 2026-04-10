import React, { useState, useEffect, useContext, useRef } from 'react';
import { Menu, X, Leaf, Globe, ChevronDown, Sparkles, Package, Users, Bell, ShoppingBag, Landmark, FlaskConical, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import UserMenu from './auth/UserMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const langMenuRef = useRef(null);

  const isHomePage = location.pathname === '/';
  const shouldShowSolid = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Smooth scroll handler for hash links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.pathname, location.hash]);

  const isOrganicMode = location.pathname === '/organic';

  const navLinks = [
    { name: t('nav.home'), href: '/', icon: <Leaf className="w-4 h-4 text-[#2d5a27]" /> },
    { name: t('nav.detect'), href: '/detect', icon: <Sparkles className="w-4 h-4 text-orange-400" /> },
    { name: t('nav.soil_report'), href: '/soil-report', icon: <Leaf className="w-4 h-4 text-[#10b981]" />, isNew: true },
    { name: t('nav.store'), href: '/store', icon: <ShoppingBag className="w-4 h-4 text-emerald-600" /> },
    { name: t('nav.library'), href: '/library', icon: <Package className="w-4 h-4 text-emerald-600" /> },
    { name: t('nav.weather'), href: '/weather', icon: <Globe className="w-4 h-4 text-blue-500" /> },
    { name: t('nav.ecosystem'), href: '/ecosystem', icon: <Landmark className="w-4 h-4 text-purple-500" /> },
  ];

  const organicLinks = [
    { name: t('nav.organic.dashboard'), href: '/organic#hero', icon: <Leaf className="w-4 h-4 text-emerald-400" /> },
    { name: t('nav.organic.market'), href: '/organic#schemes', icon: <Landmark className="w-4 h-4 text-orange-400" /> },
    { name: t('nav.organic.crop_path'), href: '/organic#timeline', icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { name: t('nav.organic.engine'), href: '/organic#features', icon: <FlaskConical className="w-4 h-4 text-emerald-400" /> },
    { name: t('nav.organic.greenhouse'), href: '/organic#greenhouse', icon: <Globe className="w-4 h-4 text-sky-400" /> },
  ];

  const activeLinks = isOrganicMode ? organicLinks : navLinks;

  const languages = [
    { code: 'HI', name: 'हिन्दी', flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'GUJ', name: 'ગુજરાતી', flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'EN', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  const headerStyles = isOrganicMode 
    ? (shouldShowSolid ? 'py-4 bg-[#022c22]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]' : 'bg-transparent py-8')
    : (shouldShowSolid ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent py-6');

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${headerStyles}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center max-w-7xl">
        {/* Logo & Back */}
        <div className="flex items-center gap-4">
          {!isHomePage && (
            <button 
              onClick={() => navigate(-1)}
              className={`p-2 rounded-xl transition-all flex items-center justify-center border shadow-sm ${isOrganicMode ? 'bg-white/10 border-white/10 text-emerald-100 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'}`}
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <Link to={isOrganicMode ? "/organic" : "/"} className="flex items-center gap-2 group shrink-0">
            <div className={`${isOrganicMode ? 'bg-[#10b981]' : 'bg-[#2d5a27]'} w-8 h-8 md:w-9 md:h-9 rounded-[10px] flex justify-center items-center group-hover:rotate-6 transition-transform shadow-md overflow-hidden`}>
               <Leaf className="text-white w-4 h-4 md:w-5 h-5" />
            </div>
            <span className={`font-sans text-[16px] md:text-[20px] font-bold tracking-tight ${isOrganicMode ? 'text-white' : 'text-[#1a2e1a]'} hidden sm:flex gap-0`}>
              Fasal<span className={isOrganicMode ? 'text-emerald-400' : 'text-[#2d5a27]'}>{isOrganicMode ? 'Organic' : 'Rakshak'}</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav - Optimized for overcrowding */}
        <nav className={`hidden lg:flex flex-1 items-center ml-4 xl:ml-6 ${isOrganicMode ? 'gap-2 xl:gap-4' : 'gap-1 xl:gap-2'} transition-all duration-500`}>
          {activeLinks.map((link) => {
            const isActive = location.pathname === link.href;
            const itemColorClass = isOrganicMode 
               ? (isActive ? 'text-emerald-400 bg-white/5' : 'text-emerald-100/70 hover:text-white')
               : (isActive ? 'text-[#2d5a27] bg-green-50' : 'text-gray-700 hover:text-[#2d5a27]');

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`group relative flex flex-col items-center gap-1 transition-all ${link.isNew ? 'hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''}`}
              >
                <div className={`flex items-center gap-1 transition-colors font-bold text-[11px] 2xl:text-[13px] whitespace-nowrap px-1.5 py-1.5 rounded-full ${itemColorClass}`}>
                  <span>{link.icon}</span>
                  <span className={link.isOrganicTab && isOrganicMode ? 'text-emerald-400 drop-shadow-[0_0_8px_#10b981]' : ''}>{link.name}</span>
                </div>
                {/* Active Underline */}
                <span className={`h-[2px] bg-current transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full opacity-30'}`}></span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative hidden md:block" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs font-bold border shadow-sm ${isOrganicMode ? 'bg-white/5 border-white/10 text-emerald-100 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-transparent'}`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute right-0 mt-3 w-48 rounded-2xl shadow-2xl border overflow-hidden py-2 z-[100] ${isOrganicMode ? 'bg-emerald-900 border-white/10' : 'bg-white border-gray-100'}`}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${lang === l.code ? (isOrganicMode ? 'bg-emerald-800 text-emerald-400' : 'bg-green-50 text-[#2d5a27]') : (isOrganicMode ? 'text-emerald-100' : 'text-gray-600')}`}
                    >
                      <img src={l.flag} alt={l.code} className="w-5 h-4 object-cover rounded-sm shadow-sm" />
                      <span className="text-[14px] font-bold">{l.name}</span>
                      {lang === l.code && <div className={`ml-auto w-2 h-2 rounded-full ${isOrganicMode ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-[#2d5a27]'}`} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user ? (
            <div className="hidden lg:block">
              <UserMenu isMobile={false} />
            </div>
          ) : (
            <Link
              to="/login"
              className={`hidden lg:flex ${isOrganicMode ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30' : 'bg-[#2d5a27] hover:bg-[#1a3818] shadow-green-900/10'} text-white font-bold h-10 px-6 rounded-full shadow-lg hover:shadow-xl transition-all items-center justify-center text-[13px]`}
            >
              Log In
            </Link>
          )}

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
             <button
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className={`${isOrganicMode ? 'text-emerald-400' : 'text-gray-800'} p-2 focus:outline-none`}
             >
               {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
             </button>
          </div>
        </div>
      </div>

      {/* Simple Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className={`lg:hidden fixed top-0 right-0 w-[85%] sm:w-[350px] h-screen shadow-2xl z-[1000] py-10 px-6 flex flex-col gap-6 ${isOrganicMode ? 'bg-emerald-950 text-white' : 'bg-white text-gray-800'}`}
          >
             <div className="flex justify-between items-center mb-4 border-b border-gray-100/10 pb-4">
                <span className="font-sans text-lg font-black">
                   Fasal<span className={isOrganicMode ? 'text-emerald-400' : 'text-[#2d5a27]'}>{isOrganicMode ? 'Organic' : 'Rakshak'}</span>
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileMenuOpen(false);
                  }} 
                  className={`p-2 rounded-xl transition-all ${isOrganicMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

             {/* Mobile Account Access */}
             <div className="py-2">
                {user ? (
                  <UserMenu isMobile={true} />
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${isOrganicMode ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'bg-[#2d5a27] text-white shadow-xl shadow-green-900/20 hover:bg-[#1a3818]'}`}
                  >
                    Get Started / Log In
                  </Link>
                )}
             </div>

            <nav className="flex flex-col gap-3 pt-2">
              {activeLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${
                      isActive ? (isOrganicMode ? 'bg-white/5 text-emerald-400' : 'bg-green-50 text-[#2d5a27]') : (isOrganicMode ? 'text-emerald-100/70' : 'text-gray-800')
                    }`}
                  >
                     <div className={`p-2.5 rounded-xl transition-colors ${isActive ? (isOrganicMode ? 'bg-emerald-500 text-emerald-950' : 'bg-[#2d5a27] text-white') : (isOrganicMode ? 'bg-white/5 text-emerald-400' : 'bg-gray-100 text-gray-500')}`}>
                        {link.icon}
                      </div>
                    <span className="font-bold text-[15px]">{link.name}</span>
                    {isActive && <div className={`ml-auto w-1.5 h-1.5 rounded-full ${isOrganicMode ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-[#2d5a27]'}`} />}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100/10">
               <div className="text-[10px] font-black opacity-40 mb-4 uppercase tracking-[0.2em]">Language Settings</div>
               <div className="flex gap-2">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { 
                        setLang(l.code); 
                        setIsMobileMenuOpen(false); 
                      }}
                      className={`flex-1 py-3 px-2 rounded-xl border text-[11px] font-black transition-all ${lang === l.code ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg' : 'border-gray-200 text-gray-500 bg-gray-50'}`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
