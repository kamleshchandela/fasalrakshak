import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Lock, Eye, EyeOff, Leaf, AlertTriangle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

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
    <div className="min-h-screen bg-white font-nunito flex flex-col pt-16 lg:pt-20">
      
      {/* SECTION 1 — PAGE HEADER */}
      <section className="relative bg-primary-lightGreen py-16 md:py-24 flex items-center justify-center">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200")' }}
        ></div>
        <div className="absolute inset-0 bg-primary-darkGreen/65 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-primary-lightGreen/90 text-primary-green px-4 py-1.5 rounded-full font-bold text-sm mb-6 uppercase tracking-wider">
            <Leaf className="w-4 h-4" />
            FasalRakshak — Smart Kheti
          </div>
          
          <h1 className="font-playfair font-bold text-3xl md:text-5xl text-white mb-4 leading-tight">
            Welcome Back, Kisan
          </h1>
          
          <p className="text-white/90 font-nunito text-lg mb-8 max-w-lg mx-auto">
            Log in to track your crops and scan diseases
          </p>
          
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex -space-x-3">
              {['👨', '👩', '👨'].map((emoji, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl border-2 border-primary-green shadow-sm">
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-white/80 text-sm font-semibold">
              50,000+ farmers trust FasalRakshak
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — LOGIN CARD */}
      <section className="flex-grow flex flex-col items-center justify-start px-4 -mt-12 md:-mt-16 relative z-30 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-3xl w-full max-w-[480px] p-6 md:p-10 shadow-[0_8px_40px_rgba(26,107,47,0.10)] border-2 border-primary-sage mx-auto"
        >
          {/* Card Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary-lightGreen rounded-full flex items-center justify-center mb-4">
              <Leaf className="w-8 h-8 text-primary-green" />
            </div>
            <h2 className="font-playfair font-bold text-2xl text-primary-green text-center">
              Login to Your Account
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start text-red-700 text-sm font-semibold"
                >
                  <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Column */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="mobile" className="text-sm font-semibold text-text-charcoal pl-1">
                Mobile Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                </div>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full h-[52px] pl-11 pr-4 rounded-xl border-1.5 border-primary-sage text-base 
                             outline-none transition-all duration-300 bg-white
                             focus:border-primary-green focus:shadow-[0_0_0_4px_rgba(26,107,47,0.1)]"
                  placeholder="Enter 10-digit mobile number"
                  inputMode="numeric"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* PIN Column */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="pin" className="text-sm font-semibold text-text-charcoal pl-1">
                Your PIN (4 digits)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                </div>
                <input
                  type={showPin ? 'text' : 'password'}
                  id="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full h-[52px] pl-11 pr-12 rounded-xl border-1.5 border-primary-sage text-base 
                             outline-none transition-all duration-300 bg-white
                             focus:border-primary-green focus:shadow-[0_0_0_4px_rgba(26,107,47,0.1)] tracking-widest"
                  placeholder="••••"
                  inputMode="numeric"
                  maxLength={4}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary-green focus:outline-none transition-colors"
                >
                  {showPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center pt-1 pb-3 pl-1">
              <label className="flex items-center cursor-pointer select-none">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="appearance-none w-5 h-5 border-2 border-primary-sage rounded-md checked:bg-primary-green checked:border-primary-green transition-colors cursor-pointer"
                  />
                  {rememberMe && (
                    <svg className="absolute w-3.5 h-3.5 pointer-events-none text-white left-[3px] top-[3px]" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-600 font-semibold">Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.97 }}
              className={`w-full h-[52px] flex items-center justify-center bg-primary-green text-white font-bold text-lg rounded-xl transition-colors
                          ${isLoading ? 'opacity-80 cursor-wait' : 'hover:bg-primary-darkGreen hover:shadow-lg'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login to FasalRakshak'
              )}
            </motion.button>
          </form>

          {/* Links Below Form */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-text-charcoal font-semibold text-[15px]">
              New farmer?{' '}
              <Link to="/signup" className="text-primary-green hover:underline decoration-2 underline-offset-4">
                Create Account
              </Link>
            </p>
            <p className="text-gray-500 font-semibold text-[13px] mt-1">
              Forgot PIN?{' '}
              <a href="#" className="hover:text-primary-green transition-colors">
                Reset via SMS
              </a>
            </p>
          </div>
        </motion.div>

        {/* SECTION 3 — QUICK LOGIN BENEFITS */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 w-full max-w-[480px]">
          {['🔒 Secure', '📱 Mobile-First', '🌿 Free Forever'].map((chip, idx) => (
            <div key={idx} className="bg-primary-lightGreen border border-primary-sage text-primary-green font-bold text-[13px] px-4 py-1.5 rounded-full shadow-sm">
              {chip}
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default Login;
