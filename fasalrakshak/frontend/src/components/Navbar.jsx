import React, { useState, useEffect, useContext, useRef } from 'react';
import { Menu, X, Leaf, Globe, ChevronDown, Sparkles, Package, Users, Bell, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import UserMenu from './auth/UserMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
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

  const navLinks = [
    { name: t('nav.home'), href: '/', icon: <Leaf className="w-4 h-4 text-[#2d5a27]" /> },
    { name: t('nav.detect'), href: '/detect', icon: <Sparkles className="w-4 h-4 text-orange-400" /> },
    { name: t('nav.soil_report'), href: '/soil-report', icon: <Leaf className="w-4 h-4 text-[#10b981] animate-pulse" />, isNew: true },
    { name: t('nav.store') || 'AgriStore', href: '/store', icon: <ShoppingBag className="w-4 h-4 text-emerald-600" /> },
    { name: t('nav.library'), href: '/library', icon: <Package className="w-4 h-4 text-emerald-600" /> },
    { name: t('nav.weather'), href: '/weather', icon: <Globe className="w-4 h-4 text-blue-500 hover:rotate-90 transition-transform" /> },
  ];

  const languages = [
    { code: 'EN', name: t('lang_en'), flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'HI', name: t('lang_hi'), flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'GUJ', name: t('lang_guj'), flag: 'https://flagcdn.com/w40/in.png' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        shouldShowSolid ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-[#2d5a27] w-9 h-9 md:w-10 md:h-10 rounded-[12px] flex justify-center items-center group-hover:rotate-6 transition-transform shadow-md overflow-hidden">
             <Leaf className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="font-sans text-[20px] md:text-[24px] font-bold tracking-tight text-[#1a2e1a] hidden sm:flex gap-0">
            Fasal<span className="text-[#2d5a27]">Rakshak</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-2 xl:gap-4 xxl:gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`group relative flex flex-col items-center gap-1 transition-all ${link.isNew ? 'hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''}`}
              >
                <div className={`flex items-center gap-1.5 transition-colors font-bold text-[13px] xl:text-[14px] whitespace-nowrap px-2 py-1 rounded-full ${
                  isActive 
                    ? 'text-[#2d5a27] bg-green-50' 
                    : link.isNew 
                      ? 'text-[#10b981] group-hover:text-[#059669]' 
                      : 'text-gray-700 group-hover:text-[#2d5a27]'
                }`}>
                  {link.icon}
                  <span>{link.name}</span>
                  {link.isNew && (
                    <span className="bg-[#10b981] text-[8px] font-black tracking-widest text-white px-1.5 py-0.5 rounded-full ml-1 animate-bounce">NEW</span>
                  )}
                </div>
                {/* Underline animation */}
                <span className={`h-[2.5px] bg-[#2d5a27] transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                
                {/* Active Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-2 w-1.5 h-1.5 bg-[#2d5a27] rounded-full shadow-[0_0_8px_#2d5a27]" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-all text-sm font-bold border border-transparent shadow-sm"
            >
              <Globe className="w-4 h-4" />
              <span>{lang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2 z-[100]"
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
                      <img src={l.flag} alt={l.code} className="w-5 h-4 object-cover rounded-sm shadow-sm" />
                      <span className="text-[14px] font-bold">{l.name}</span>
                      {lang === l.code && <div className="ml-auto w-2 h-2 rounded-full bg-[#2d5a27]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons for Guests */}
          {!user && (
            <button className="p-2.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-all border border-transparent shadow-sm relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          )}
          
          {user ? (
            <UserMenu isMobile={false} />
          ) : (
            <Link 
              to="/login"
              className="bg-[#2d5a27] text-white font-bold h-11 px-8 rounded-full hover:bg-[#1a3818] shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-[15px]"
            >
              {t('nav.login')}
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="lg:hidden fixed top-0 right-0 w-[80%] h-screen bg-white shadow-2xl z-[60] py-20 px-6 flex flex-col gap-6"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                      isActive ? 'bg-green-50 text-[#2d5a27]' : 'text-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-colors ${isActive ? 'bg-[#2d5a27] text-white shadow-lg shadow-green-900/20' : 'bg-gray-100 text-gray-500'}`}>
                        {link.icon}
                      </div>
                      <span className="font-bold text-lg">{link.name}</span>
                    </div>
                    {link.isNew && (
                      <span className="bg-[#10b981] text-[10px] font-black tracking-widest text-white px-2 py-1 rounded-full animate-bounce shadow-md shadow-green-500/20">NEW</span>
                    )}
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#2d5a27] shadow-[0_0_8px_#2d5a27]" />}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
               <div className="flex flex-col gap-2">
                 <span className="text-gray-400 text-xs font-black uppercase tracking-widest pl-2">Language</span>
                 <div className="grid grid-cols-3 gap-2">
                   {languages.map(l => (
                     <button 
                       key={l.code}
                       onClick={() => setLang(l.code)}
                       className={`flex flex-col items-center gap-1 py-3 rounded-xl border ${lang === l.code ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}
                     >
                       <img src={l.flag} alt={l.code} className="w-6 h-4 object-cover" />
                       <span className="text-[10px] font-bold">{l.code}</span>
                     </button>
                   ))}
                 </div>
               </div>
               {user ? null : (
                 <Link to="/login" className="w-full bg-[#2d5a27] text-white py-4 rounded-2xl font-bold text-center">
                    {t('nav.login')}
                 </Link>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
