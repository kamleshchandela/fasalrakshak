import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Leaf, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import UserMenu from './auth/UserMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const shouldShowSolid = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.store') || 'Store', href: '/store' },
    { name: t('nav.detect'), href: '/detect' },
    { name: t('nav.library'), href: '/diseases' },
    { name: t('nav.blog'), href: '#' },
    { name: t('nav.about'), href: '#' },
    { name: t('nav.contact'), href: '#' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        shouldShowSolid ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="bg-[#166534] w-9 h-9 rounded-full flex justify-center items-center">
            <span className="text-white font-serif font-black text-xl italic leading-none translate-y-[-1px]">f</span>
          </div>
          <span className="font-sans text-[22px] font-black tracking-tight text-gray-800 flex gap-0 mt-0.5">
            fasal<span className="text-[#166534]">rakshak</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="group relative text-gray-600 font-nunito font-bold hover:text-[#166534] transition-colors text-[14px] flex items-center gap-1.5 tracking-wide"
            >
              {link.name}
              <span className="absolute left-1/2 bottom-[-4px] w-0 h-[2.5px] bg-[#166534] transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2 rounded-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1 gap-1 mx-2">
            {['EN', 'HI', 'GUJ'].map(l => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                className={`${lang === l ? 'bg-[#166534] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'} text-[10px] font-bold px-2 py-1 rounded-full leading-none transition-colors`}
              >
                {l}
              </button>
            ))}
          </div>
          
          {user ? (
            <UserMenu isMobile={false} />
          ) : (
            <Link 
              to="/login"
              className="bg-[#166534] text-white font-nunito font-bold h-10 px-8 rounded-full hover:bg-[#14532d] shadow-[0_4px_10px_rgba(22,101,52,0.3)] hover:-translate-y-[1px] flex items-center justify-center transition-all text-[14px]"
            >
              {t('nav.login')}
            </Link>
          )}
        </div>

        {/* Mobile Toggle & Auth */}
        <div className="lg:hidden flex items-center gap-3">
          {user ? (
            <UserMenu isMobile={true} />
          ) : (
            <Link 
              to="/login"
              className="border-[1.5px] border-primary-green text-primary-green font-nunito font-semibold h-9 px-4 rounded-lg hover:bg-primary-lightGreen flex items-center justify-center transition-all text-sm"
            >
              Login
            </Link>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-charcoal p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-primary-sage overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-text-charcoal font-nunito font-bold text-lg border-b border-primary-sage/30 pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <button
                  onClick={() => setLang(lang === 'EN' ? 'HI' : lang === 'HI' ? 'GUJ' : 'EN')}
                  className="flex items-center justify-center gap-2 text-text-charcoal font-bold bg-primary-lightGreen py-3 rounded-xl"
                >
                  <Globe className="w-5 h-5 text-primary-green" />
                  Language: {lang}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
