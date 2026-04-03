import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UserMenu from './auth/UserMenu';
import { LanguageContext } from '../context/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_smart_farming'), href: '/detect', hasDropdown: true },
    { name: t('nav_carbon_credit'), href: '#' },
    { name: t('nav_products'), href: '/diseases' },
    { name: t('nav_weather'), href: '/weather' },
    { name: t('nav_wallet'), href: '#', hasDropdown: true },
    { name: t('nav_resources'), href: '#', hasDropdown: true },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-xl py-3' : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
        {/* Logo - Rupiya Style */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary-green w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-primary-green/20 group-hover:scale-110 transition-transform duration-500">
             <div className="text-white font-black text-2xl tracking-tighter italic">f</div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl text-slate-800 tracking-tighter leading-none group-hover:text-primary-green transition-colors">
              fasal<span className="text-primary-green">.rakshak</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Clean Rupiya Style */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-slate-600 font-nunito font-bold text-[15px] hover:text-primary-green transition-all flex items-center gap-1 group"
            >
              {link.name}
              {link.hasDropdown && (
                <svg className="w-4 h-4 text-slate-400 group-hover:text-primary-green group-hover:rotate-180 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions - 3 Language Toggle */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex bg-slate-50 border border-slate-100 rounded-full p-1 shadow-inner">
            {['EN', 'HI', 'GUJ'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${
                  lang === l ? 'bg-[#276738] text-white shadow-md' : 'text-slate-400 hover:text-[#276738]'
                }`}
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
              className="bg-[#276738] text-white font-nunito font-bold h-11 px-8 rounded-full hover:bg-[#1B4D2B] hover:shadow-xl hover:shadow-[#276738]/30 flex items-center justify-center transition-all text-sm tracking-wide"
            >
              {t('nav_login')}
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
            className="text-slate-800 p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
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
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-8 gap-4 pb-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-slate-700 font-nunito font-black text-xl border-b border-slate-100 pb-4 flex justify-between items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <svg className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>}
                </Link>
              ))}
              
              <div className="mt-8 space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Select Language</p>
                <div className="flex bg-slate-50 border border-slate-100 rounded-2xl p-2 gap-2">
                  {['EN', 'HI', 'GUJ'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex-1 py-4 rounded-xl text-sm font-black transition-all ${
                        lang === l ? 'bg-[#276738] text-white shadow-lg' : 'text-slate-400 hover:text-[#276738]'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
