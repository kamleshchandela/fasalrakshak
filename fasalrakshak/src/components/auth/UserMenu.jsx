import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const UserMenu = ({ isMobile }) => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  if (!user) return null;

  const getAvatarIcon = () => {
    if (user.gender === 'female') return '👩';
    return '👨';
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-primary-lightGreen flex items-center justify-center text-xl shadow-sm border border-primary-sage">
          {getAvatarIcon()}
        </div>
        {!isMobile && (
          <span className="font-nunito font-bold text-[15px] text-primary-green hidden lg:block">
            {user.name ? `Hello, ${user.name.split(' ')[0]}` : 'Hello'}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${isMobile ? 'right-0 mt-4' : 'right-0 mt-3'} w-48 bg-white border border-primary-green rounded-xl shadow-lg py-2 z-50`}
          >
            <Link 
              to="/profile" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-primary-lightGreen text-text-charcoal font-semibold text-sm transition-colors"
            >
              👤 My Profile
            </Link>
            <Link 
              to="/detect" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-primary-lightGreen text-text-charcoal font-semibold text-sm transition-colors"
            >
              🌿 My Scans
            </Link>
            <div className="h-px bg-primary-sage/50 my-1 mx-2"></div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 font-semibold text-sm transition-colors text-left"
            >
              🚪 Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
