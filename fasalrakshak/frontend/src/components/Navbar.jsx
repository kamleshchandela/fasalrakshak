import React, { useState, useEffect, useContext, useRef } from 'react';
<<<<<<< HEAD
import { Menu, X, Leaf, Globe, ChevronDown, Sparkles, Package, Users, Bell, ShoppingBag, Landmark, FlaskConical, ArrowLeft } from 'lucide-react';
=======
import { Menu, X, Leaf, Globe, ChevronDown, Bell } from 'lucide-react';
>>>>>>> main
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

  const isOrganicMode = location.pathname === '/organic';

  const navLinks = [
<<<<<<< HEAD
    { name: t('nav.home'), href: '/', icon: <Leaf className="w-4 h-4 text-[#2d5a27]" /> },
    { name: t('nav.detect'), href: '/detect', icon: <Sparkles className="w-4 h-4 text-orange-400" /> },
    { name: t('nav.soil_report'), href: '/soil-report', icon: <Leaf className="w-4 h-4 text-[#10b981]" />, isNew: true },
    { name: t('nav.store'), href: '/store', icon: <ShoppingBag className="w-4 h-4 text-emerald-600" /> },
    { name: t('nav.library'), href: '/library', icon: <Package className="w-4 h-4 text-emerald-600" /> },
    { name: t('nav.weather'), href: '/weather', icon: <Globe className="w-4 h-4 text-blue-500" /> },
=======
    { name: t('nav.home'), href: '/' },
    { name: t('nav.detect'), href: '/detect' },
    { name: t('nav.soil_report'), href: '/soil-report' },
    { name: t('nav.store'), href: '/store' },
    { name: t('nav.library'), href: '/library' },
    { name: t('nav.weather'), href: '/weather' },
>>>>>>> main
  ];

  const organicLinks = [
    { name: 'Dashboard', href: '/', icon: <Leaf className="w-4 h-4 text-emerald-400" /> },
    { name: 'Market Info', href: '#schemes', icon: <Landmark className="w-4 h-4 text-orange-400" /> },
    { name: 'Crop Path', href: '#timeline', icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { name: 'Engine', href: '#features', icon: <FlaskConical className="w-4 h-4 text-emerald-400" /> },
    { name: 'Greenhouse', href: '#greenhouse', icon: <Globe className="w-4 h-4 text-sky-400" /> },
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
<<<<<<< HEAD
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
            <div className={`${isOrganicMode ? 'bg-[#10b981]' : 'bg-[#2d5a27]'} w-9 h-9 md:w-10 md:h-10 rounded-[12px] flex justify-center items-center group-hover:rotate-6 transition-transform shadow-md overflow-hidden`}>
               <Leaf className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className={`font-sans text-[20px] md:text-[24px] font-bold tracking-tight ${isOrganicMode ? 'text-white' : 'text-[#1a2e1a]'} hidden sm:flex gap-0`}>
              Fasal<span className={isOrganicMode ? 'text-emerald-400' : 'text-[#2d5a27]'}>Organic</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className={`hidden lg:flex flex-1 justify-center items-center ${isOrganicMode ? 'gap-8 xl:gap-10' : 'gap-1 xl:gap-3'} transition-all duration-500`}>
          {activeLinks.map((link) => {
=======
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${shouldShowSolid
          ? 'py-3 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-7xl">

        {/* Simple & Clean Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-[#2d5a27] w-8 h-8 rounded-[10px] flex justify-center items-center group-hover:rotate-6 transition-transform shadow-md overflow-hidden">
             <Leaf className="text-white w-4 h-4" />
          </div>
          <span className="font-sans text-[18px] md:text-[20px] font-bold tracking-tight text-[#1a2e1a] hidden sm:flex gap-0">
            Fasal<span className="text-[#2d5a27]">Rakshak</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
>>>>>>> main
            const isActive = location.pathname === link.href;
            const itemColorClass = isOrganicMode 
               ? (isActive ? 'text-emerald-400 bg-white/5' : 'text-emerald-100/70 hover:text-white')
               : (isActive ? 'text-[#2d5a27] bg-green-50' : 'text-gray-700 hover:text-[#2d5a27]');

            return (
              <a
                key={link.name}
<<<<<<< HEAD
                href={link.href}
                className={`group relative flex flex-col items-center gap-1 transition-all ${link.isNew ? 'hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''}`}
              >
                <div className={`flex items-center gap-1.5 transition-colors font-bold text-[13px] xl:text-[14px] whitespace-nowrap px-3 py-1.5 rounded-full ${itemColorClass} ${link.isOrganicTab ? 'border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-emerald-500/5' : ''}`}>
                  {link.icon}
                  <span className={link.isOrganicTab && isOrganicMode ? 'text-emerald-400 drop-shadow-[0_0_8px_#10b981]' : ''}>{link.name}</span>
                </div>
                {/* Active Underline */}
                <span className={`h-[2px] bg-current transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full opacity-30'}`}></span>
              </a>
=======
                to={link.href}
                className={`relative font-semibold text-[15px] transition-colors ${isActive ? 'text-[#10b981]' : 'text-gray-600 hover:text-[#10b981]'
                  }`}
              >
                <div className={`flex items-center gap-1 transition-colors font-bold text-[12px] xl:text-[13px] whitespace-nowrap px-2 py-1 rounded-full ${
                  isActive 
                    ? 'text-[#2d5a27] bg-green-50' 
                    : link.isNew 
                      ? 'text-[#10b981] group-hover:text-[#059669]' 
                      : 'text-gray-700 group-hover:text-[#2d5a27]'
                }`}>
                  {link.icon}
                  <span>{link.name}</span>
                  {link.isNew && (
                    <span className="bg-[#10b981] text-[7px] font-black tracking-widest text-white px-1.5 py-0.5 rounded-full ml-0.5 animate-bounce">NEW</span>
                  )}
                </div>
                {/* Underline animation */}
                <span className={`h-[2.5px] bg-[#2d5a27] transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                
                {/* Active Dot */}
                {isActive && (
                  <div className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#10b981] rounded-full" />
                )}
              </Link>
>>>>>>> main
            );
          })}
        </nav>

        {/* Right Actions */}
<<<<<<< HEAD
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative hidden md:block" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs font-bold border shadow-sm ${isOrganicMode ? 'bg-white/5 border-white/10 text-emerald-100 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-transparent'}`}
=======
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-full transition-all text-xs font-bold border border-transparent"
>>>>>>> main
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
<<<<<<< HEAD
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute right-0 mt-3 w-48 rounded-2xl shadow-2xl border overflow-hidden py-2 z-[100] ${isOrganicMode ? 'bg-emerald-900 border-white/10' : 'bg-white border-gray-100'}`}
=======

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-1 z-50"
>>>>>>> main
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangMenuOpen(false);
                      }}
<<<<<<< HEAD
                      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${lang === l.code ? (isOrganicMode ? 'bg-emerald-800 text-emerald-400' : 'bg-green-50 text-[#2d5a27]') : (isOrganicMode ? 'text-emerald-100' : 'text-gray-600')}`}
                    >
                      <img src={l.flag} alt={l.code} className="w-5 h-4 object-cover rounded-sm shadow-sm" />
                      <span className="text-[14px] font-bold">{l.name}</span>
                      {lang === l.code && <div className={`ml-auto w-2 h-2 rounded-full ${isOrganicMode ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-[#2d5a27]'}`} />}
=======
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${lang === l.code ? 'text-[#10b981] font-bold bg-green-50/50' : 'text-gray-600'}`}
                    >
                      <img src={l.flag} alt={l.code} className="w-4 h-3 object-cover rounded-sm" />
                      {l.name}
>>>>>>> main
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

<<<<<<< HEAD
=======
          {/* Notification bell */}
          {!user && (
            <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          )}
          
>>>>>>> main
          {user ? (
            <UserMenu isMobile={false} />
          ) : (
            <Link
              to="/login"
<<<<<<< HEAD
              className={`${isOrganicMode ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30' : 'bg-[#2d5a27] hover:bg-[#1a3818] shadow-green-900/10'} text-white font-bold h-11 px-6 md:px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-[14px] md:text-[15px]`}
=======
              className="bg-[#2d5a27] text-white font-bold h-9 px-5 rounded-full hover:bg-[#1a3818] shadow-md transition-all flex items-center justify-center text-[13px] whitespace-nowrap"
>>>>>>> main
            >
              Log In
            </Link>
          )}

<<<<<<< HEAD
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
=======
        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
>>>>>>> main
      </div>

      {/* Simple Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
<<<<<<< HEAD
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className={`lg:hidden fixed top-0 right-0 w-[80%] h-screen shadow-2xl z-[600] py-20 px-6 flex flex-col gap-6 ${isOrganicMode ? 'bg-emerald-950 text-white' : 'bg-white text-gray-800'}`}
          >
            <nav className="flex flex-col gap-4 pt-4">
              {activeLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                      isActive ? (isOrganicMode ? 'bg-white/5 text-emerald-400 shadow-xl' : 'bg-green-50 text-[#2d5a27]') : (isOrganicMode ? 'text-emerald-100/70' : 'text-gray-800')
                    }`}
=======
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 w-[280px] h-full bg-white shadow-xl z-50 py-6 px-5 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-sans text-[20px] font-black text-[#1a2e1a]">
                  Fasal<span className="text-[#10b981]">Rakshak</span>
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-lg ${isActive ? 'bg-green-50 text-[#10b981] font-bold' : 'text-gray-700 font-medium'}`}
                    >
                      <span>{link.name}</span>
                      {link.isNew && <span className="bg-orange-500 text-[10px] text-white px-2 py-0.5 rounded font-bold">NEW</span>}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-gray-100 pt-6 gap-4 flex flex-col">
                <div className="text-sm font-bold text-gray-400 mb-1">Language</div>
                <div className="flex gap-2">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`flex-1 py-2 rounded-lg border text-xs font-bold ${lang === l.code ? 'bg-green-50 border-green-200 text-[#10b981]' : 'border-gray-200 text-gray-500'
                        }`}
                    >
                      {l.code}
                    </button>
                  ))}
                </div>

                {user ? null : (
                  <Link
                    to="/login"
>>>>>>> main
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-[#10b981] text-white py-3 rounded-lg font-bold text-center mt-2"
                  >
<<<<<<< HEAD
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-colors ${isActive ? (isOrganicMode ? 'bg-emerald-500 text-emerald-950' : 'bg-[#2d5a27] text-white') : (isOrganicMode ? 'bg-white/5 text-emerald-400' : 'bg-gray-100 text-gray-500')}`}>
                        {link.icon}
                      </div>
                      <span className="font-bold text-[16px]">{link.name}</span>
                    </div>
                  </a>
                );
              })}
            </nav>
          </motion.div>
=======
                    {t('nav.login')}
                  </Link>
                )}
              </div>
            </motion.div>
          </>
>>>>>>> main
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
