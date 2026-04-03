import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, AlertTriangle, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import heroFarmer from '../images/hero_farmer.png';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      navigate('/detect');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError('PIN must be exactly 4 digits.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Incorrect mobile or PIN. Please try again.');
      }

      // Success
      login(data.user);
      navigate('/detect');
    } catch (err) {
      setError(err.message);
      // Auto-dismiss error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-cream font-nunito flex">
      
      {/* LEFT SECTION — SPLIT SCREEN BACKGROUND */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-darkGreen">
        <img 
          src={heroFarmer} 
          alt="Farmer looking at crops" 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[20s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-darkGreen via-primary-darkGreen/60 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="absolute bottom-0 left-0 p-16 z-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-yellow/20 backdrop-blur-md text-primary-yellow px-4 py-2 rounded-full font-bold text-xs mb-6 uppercase tracking-widest border border-primary-yellow/30">
              <Leaf className="w-4 h-4" />
              Trusted by 50,000+ Farmers
            </div>
            <h1 className="font-playfair font-black text-5xl text-white mb-6 leading-tight drop-shadow-md">
              Your Farm's<br />Digital Guardian
            </h1>
            <p className="text-white/90 font-nunito text-xl font-medium max-w-md leading-relaxed">
              Detect diseases instantly, get expert treatment plans, and secure your livelihood — all from your phone.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SECTION — LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 relative lg:pt-20 pt-28">
        {/* Mobile Background Fallback */}
        <div 
          className="lg:hidden absolute inset-0 z-0 bg-cover bg-center opacity-20 filter blur-sm"
          style={{ backgroundImage: `url(${heroFarmer})` }}
        ></div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white/95 backdrop-blur-xl rounded-[32px] w-full max-w-[480px] p-8 md:p-10 shadow-organic border border-white relative z-10"
        >
          {/* Card Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-primary-lightGreen rounded-[20px] flex items-center justify-center mb-6 shadow-inner border border-primary-sage group">
              <Leaf className="w-8 h-8 text-primary-green group-hover:rotate-12 transition-transform" />
            </div>
            <h2 className="font-playfair text-3xl font-black text-text-charcoal text-center mb-2">
              Welcome Back
            </h2>
            <p className="font-nunito text-gray-500 font-medium text-center">
              Enter your credentials to access your farm
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="bg-red-50 border-1.5 border-red-200 p-4 rounded-[16px] flex items-start text-red-700 text-sm font-semibold overflow-hidden"
                >
                  <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Column */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="mobile" className="text-[13px] font-bold text-gray-700 pl-1 uppercase tracking-wider">
                Mobile Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                </div>
                <input
                  type="tel" id="mobile" value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full h-[56px] pl-12 pr-4 rounded-[16px] border border-gray-200 text-base font-semibold text-text-charcoal
                             outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white
                             focus:bg-white focus:border-primary-green focus:shadow-[0_0_0_4px_rgba(34,197,94,0.1)]"
                  placeholder="Enter 10-digit number"
                  inputMode="numeric" maxLength={10} required
                />
              </div>
            </div>

            {/* PIN Column */}
            <div className="flex flex-col space-y-1.5 pt-2">
              <label htmlFor="pin" className="text-[13px] font-bold text-gray-700 pl-1 uppercase tracking-wider">
                Your 4-Digit PIN
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                </div>
                <input
                  type={showPin ? 'text' : 'password'} id="pin" value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full h-[56px] pl-12 pr-12 rounded-[16px] border border-gray-200 text-lg font-bold text-text-charcoal
                             outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white tracking-[0.25em]
                             focus:bg-white focus:border-primary-green focus:shadow-[0_0_0_4px_rgba(34,197,94,0.1)]"
                  placeholder="••••"
                  inputMode="numeric" maxLength={4} required
                />
                <button
                  type="button" onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary-green focus:outline-none transition-colors"
                >
                  {showPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex justify-between items-center pt-2 pb-4 px-1">
              <label className="flex items-center cursor-pointer select-none group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                    className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-[6px] checked:bg-primary-green checked:border-primary-green transition-colors cursor-pointer group-hover:border-primary-green"
                  />
                  {rememberMe && (
                    <svg className="absolute w-3 h-3 pointer-events-none text-white left-[4px] top-[4px]" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8L6 11L11 3.5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
                    </svg>
                  )}
                </div>
                <span className="ml-2.5 text-[14px] text-gray-600 font-semibold transition-colors group-hover:text-text-charcoal">Remember me</span>
              </label>
              <a href="#" className="text-[13px] text-primary-green font-bold hover:text-primary-darkGreen transition-colors">Forgot PIN?</a>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit" disabled={isLoading} whileTap={{ scale: 0.98 }}
              className={`w-full h-[56px] flex items-center justify-center bg-primary-green text-white font-bold text-lg rounded-[16px] shadow-organic transition-all duration-300
                          ${isLoading ? 'opacity-80 cursor-wait' : 'hover:bg-primary-darkGreen hover:shadow-organic-hover hover:-translate-y-0.5'}`}
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Log in securely'
              )}
            </motion.button>
          </form>

          {/* Create Account */}
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-500 font-medium text-[15px]">
              New to FasalRakshak?{' '}
              <Link to="/signup" className="text-primary-green font-bold hover:underline decoration-2 underline-offset-4">
                Create free account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Login;
