import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { Bell } from 'lucide-react';

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

  // Get first initial
  const initial = user.firstName ? user.firstName.charAt(0).toUpperCase() : (user.name ? user.name.charAt(0).toUpperCase() : 'F');

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-4">
        {/* Notification Bell - Styled like screenshot */}
        {!isMobile && (
          <button className="w-10 h-10 rounded-full border border-green-100 bg-green-50/50 flex items-center justify-center text-gray-500 hover:bg-green-100 transition-colors shadow-sm">
            <Bell className="w-5 h-5 stroke-[1.5]" />
          </button>
        )}

        {/* User Info & Avatar Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 hover:opacity-90 transition-all focus:outline-none group"
        >
          {!isMobile && (
            <div className="flex flex-col items-end mr-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                Active Farmer
              </span>
              <span className="text-lg font-bold text-[#2d5a27] leading-none">
                {user.firstName || user.name?.split(' ')[0] || 'Farmer'}
              </span>
            </div>
          )}

          {/* Avatar - Styled like screenshot (Grayish blue/slate) */}
          <div className="w-10 h-10 rounded-full bg-[#78909c] flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-green-50 group-hover:scale-105 transition-transform">
            {initial}
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-md border border-gray-100 rounded-[24px] shadow-2xl py-3 z-50 overflow-hidden"
          >
            <div className="px-5 py-3 mb-2 border-b border-gray-100 bg-gray-50/50">
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest truncate">{user.email}</p>
            </div>

            <Link 
              to="/profile" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-green-50 text-gray-700 font-bold text-sm transition-colors mx-2 rounded-xl"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700">👤</div>
              My Profile
            </Link>
            <Link 
              to="/detect" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-green-50 text-gray-700 font-bold text-sm transition-colors mx-2 rounded-xl"
            >
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700">🌿</div>
              Current Scans
            </Link>
            
            <div className="h-px bg-gray-100 my-2 mx-4"></div>
            
            <button 
              onClick={handleLogout}
              className="w-[calc(100%-16px)] flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 font-bold text-sm transition-colors mx-2 rounded-xl text-left"
            >
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-700">🚪</div>
              Logout Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
