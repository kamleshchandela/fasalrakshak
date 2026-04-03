import React, { useState, useEffect, useContext, useRef } from 'react';
import { Menu, X, Leaf, Globe, ChevronDown, Bell } from 'lucide-react';
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
    { name: t('nav.home'), href: '/' },
    { name: t('nav.detect'), href: '/detect' },
    { name: t('nav.soil_report'), href: '/soil-report' },
    { name: t('nav.store'), href: '/store' },
    { name: t('nav.library'), href: '/library' },
    { name: t('nav.weather'), href: '/weather' },
  ];

  const languages = [
    { code: 'HI', name: 'हिन्दी', flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'GUJ', name: 'ગુજરાતી', flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'EN', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${shouldShowSolid
          ? 'py-3 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-7xl">

        {/* Simple & Clean Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-[#10b981] w-9 h-9 rounded-xl flex justify-center items-center shadow-sm">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-sans text-[20px] font-black tracking-tight text-[#1a2e1a]">
            Fasal<span className="text-[#10b981]">Rakshak</span>
          </span>
        </Link>

        {/* Minimalist Desktop Nav (No Icons, just clean text) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative font-semibold text-[15px] transition-colors ${isActive ? 'text-[#10b981]' : 'text-gray-600 hover:text-[#10b981]'
                  }`}
              >
                {link.name}
                {link.isNew && (
                  <span className="absolute -top-3 -right-5 bg-orange-500 text-[8px] font-bold text-white px-1.5 py-0.5 rounded shadow">NEW</span>
                )}
                {/* Minimal underline for active view */}
                {isActive && (
                  <div className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#10b981] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions - Neat & compact */}
        <div className="hidden lg:flex items-center gap-4">

          {/* Subtle Language Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium text-sm"
            >
              <Globe className="w-4 h-4 text-gray-500" />
              <span>{currentLang.code}</span>
              <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-1 z-50"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${lang === l.code ? 'text-[#10b981] font-bold bg-green-50/50' : 'text-gray-600'}`}
                    >
                      <img src={l.flag} alt={l.code} className="w-4 h-3 object-cover rounded-sm" />
                      {l.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-5 bg-gray-200"></div>

          {user ? (
            <UserMenu isMobile={false} />
          ) : (
            <Link
              to="/login"
              className="bg-[#10b981] text-white font-bold h-9 px-5 rounded-lg hover:bg-[#059669] transition-colors flex items-center justify-center text-sm shadow-sm"
            >
              {t('nav.login')}
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Simple Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-[#10b981] text-white py-3 rounded-lg font-bold text-center mt-2"
                  >
                    {t('nav.login')}
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
