import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Leaf, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UserMenu from './auth/UserMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Disease Detect', href: '/detect' },
    { name: 'Disease Library', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="bg-primary-lightGreen p-2 rounded-full">
            <Leaf className="w-8 h-8 text-primary-green" />
          </div>
          <div className="flex flex-col">
            <span className="font-playfair font-bold text-2xl text-primary-green leading-none">
              FasalRakshak
            </span>
            <span className="font-nunito text-xs text-primary-yellow font-semibold tracking-wide mt-1">
              Smart Kheti, Healthy Crop
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-text-charcoal font-nunito font-semibold hover:text-primary-green transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'EN' ? 'ગુજ' : 'EN')}
            className="flex items-center gap-1 text-sm font-bold text-text-charcoal hover:bg-primary-lightGreen px-3 py-1.5 rounded-full transition-colors"
          >
            <Globe className="w-4 h-4 text-primary-green" />
            {lang === 'EN' ? 'EN' : 'ગુજ'}
          </button>
          
          {user ? (
            <UserMenu isMobile={false} />
          ) : (
            <Link 
              to="/login"
              className="border-2 border-primary-green text-primary-green font-nunito font-semibold h-10 px-6 rounded-xl hover:bg-primary-lightGreen flex items-center justify-center transition-all text-[15px]"
            >
              Login
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
                  onClick={() => setLang(lang === 'EN' ? 'ગુજ' : 'EN')}
                  className="flex items-center justify-center gap-2 text-text-charcoal font-bold bg-primary-lightGreen py-3 rounded-xl"
                >
                  <Globe className="w-5 h-5 text-primary-green" />
                  Language: {lang === 'EN' ? 'English' : 'ગુજરાતી'}
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
