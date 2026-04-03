import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Lock, User, MapPin, Map as MapIcon, Leaf, AlertTriangle, CheckCircle, EyeOff, Eye } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import heroScan from '../images/hero_scan.png';

const CROP_OPTIONS = [
  { id: 'wheat', label: '🌾 Wheat' },
  { id: 'cotton', label: '🫘 Cotton' },
  { id: 'groundnut', label: '🥜 Groundnut' },
  { id: 'corn', label: '🌽 Corn' },
  { id: 'rice', label: '🍚 Rice' },
  { id: 'onion', label: '🧅 Onion' },
  { id: 'tomato', label: '🍅 Tomato' },
  { id: 'vegetABLES', label: '🌿 Vegetables' },
  { id: 'other', label: '🌱 Other' },
];

const Signup = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    mobile: '',
    pin: '',
    confirmPin: '',
    village: '',
    district: '',
    state: 'Gujarat',
    cropTypes: [],
    landSize: '',
  });

  // Redirect if logged in
  useEffect(() => {
    if (user) navigate('/detect');
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCrop = (cropId) => {
    setFormData((prev) => {
      const currentCrops = prev.cropTypes;
      if (currentCrops.includes(cropId)) {
        return { ...prev, cropTypes: currentCrops.filter(id => id !== cropId) };
      } else {
        return { ...prev, cropTypes: [...currentCrops, cropId] };
      }
    });
  };

  const handleNextStep = () => {
    setError(null);
    const { name, gender, mobile, pin, confirmPin } = formData;
    
    if (!name || name.length < 2) {
      setError('Please enter a valid full name.');
      return;
    }
    if (!gender) {
      setError('Please select your gender.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (pin.length !== 4) {
      setError('PIN must be exactly 4 digits.');
      return;
    }
    if (pin !== confirmPin) {
      setError('PINs do not match.');
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { village, district } = formData;
    if (!village || !district) {
      setError('Village and District are required to complete setup.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          pin: formData.pin,
          gender: formData.gender,
          village: formData.village,
          district: formData.district,
          state: formData.state,
          cropTypes: formData.cropTypes,
          landSize: formData.landSize
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error occurred during signup.');
      }

      setSuccess(true);
      // Wait for 2 seconds to show success animation
      setTimeout(() => {
        login(data.user);
        navigate('/detect');
      }, 2000);

    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Shared generic input style
  const inputStyle = `w-full h-[52px] pl-11 pr-4 rounded-[16px] border border-gray-200 text-base font-semibold text-text-charcoal 
                      outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white
                      focus:bg-white focus:border-primary-green focus:shadow-[0_0_0_4px_rgba(34,197,94,0.1)]`;

  return (
    <div className="min-h-screen bg-background-cream font-nunito flex">
      
      {/* LEFT SECTION — SPLIT SCREEN BACKGROUND */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-darkGreen">
        <img 
          src={heroScan} 
          alt="Hands holding green sapling" 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[20s] ease-out object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-darkGreen via-primary-darkGreen/50 to-transparent"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="absolute bottom-0 left-0 p-16 z-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-yellow/20 backdrop-blur-md text-primary-yellow px-4 py-2 rounded-full font-bold text-xs mb-6 uppercase tracking-widest border border-primary-yellow/30">
              <Leaf className="w-4 h-4" />
              Empowering India's Farmers
            </div>
            <h1 className="font-playfair font-black text-5xl text-white mb-6 leading-tight drop-shadow-md">
              Join FasalRakshak<br />Today
            </h1>
            <p className="text-white/90 font-nunito text-xl font-medium max-w-md leading-relaxed">
              Create your free account to track your crops, scan for diseases, and get local language advice.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SECTION — SIGNUP FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 relative lg:pt-20 pt-28">
        
        {/* Mobile Background Fallback */}
        <div 
          className="lg:hidden absolute inset-0 z-0 bg-cover bg-center opacity-20 filter blur-sm"
          style={{ backgroundImage: `url(${heroScan})` }}
        ></div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white/95 backdrop-blur-xl rounded-[32px] w-full max-w-[500px] p-8 md:p-10 shadow-organic border border-white relative z-10 overflow-hidden"
        >
          {/* Success Overlay */}
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1.2, 1], opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-24 h-24 bg-primary-lightGreen rounded-full flex items-center justify-center mb-6 border-2 border-primary-sage shadow-organic"
                >
                  <CheckCircle className="w-12 h-12 text-primary-green" />
                </motion.div>
                <h3 className="font-playfair font-black text-3xl text-text-charcoal mb-2">
                  Account Created!
                </h3>
                <p className="text-gray-500 font-semibold text-lg">
                  Welcome to FasalRakshak 🎉
                </p>
                <div className="mt-8 flex gap-2 justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-green animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-green animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-green animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="mb-8 flex flex-col items-center">
            <div className="flex items-center gap-3">
              <span className={`text-[13px] uppercase tracking-wider font-bold ${step === 1 ? 'text-primary-green' : 'text-gray-400'}`}>Step 1</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                <div className={`h-[3px] w-10 ${step === 2 ? 'bg-primary-green' : 'bg-gray-200'} transition-colors duration-500 rounded-full`}></div>
                <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-primary-green' : 'bg-gray-200'} transition-colors duration-500`}></div>
              </div>
              <span className={`text-[13px] uppercase tracking-wider font-bold ${step === 2 ? 'text-primary-green' : 'text-gray-400'}`}>Step 2</span>
            </div>
            <h2 className="font-playfair text-2xl font-black text-text-charcoal mt-4 mb-1">
              {step === 1 ? 'Personal Details' : 'Farm Details'}
            </h2>
            <p className="text-sm font-semibold text-gray-500 text-center">
              {step === 1 ? "Let's start with the basics" : "Tell us about what you grow"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="errorMsg"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border-1.5 border-red-200 p-4 rounded-[16px] flex items-start text-red-700 text-sm font-semibold mb-6 overflow-hidden"
              >
                <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait" custom={step}>
            {step === 1 ? (
              // STEP 1 FORMS
              <motion.div
                key="step1"
                custom={1}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-4"
              >
                {/* Full Name */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[13px] uppercase tracking-wider font-bold text-gray-700 pl-1">Your Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-[15px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                    <input name="name" type="text" value={formData.name} onChange={handleInputChange} className={inputStyle} placeholder="e.g. Ramesh Patel" />
                  </div>
                </div>

                {/* Gender */}
                <div className="flex flex-col space-y-2 pb-1">
                  <label className="text-[13px] uppercase tracking-wider font-bold text-gray-700 pl-1">Gender</label>
                  <div className="flex gap-3">
                    {['male', 'female', 'other'].map(g => (
                      <button
                        key={g} type="button" onClick={() => setFormData(p => ({ ...p, gender: g }))}
                        className={`flex-1 h-[52px] rounded-[16px] border font-bold text-[14px] tracking-wide capitalize transition-all duration-300
                          ${formData.gender === g 
                            ? 'bg-primary-green border-primary-green text-white shadow-organic' 
                            : 'bg-gray-50/50 border-gray-200 text-gray-600 hover:bg-white hover:border-primary-green/50'}`}
                      >
                        {g === 'male' ? '👨 Male' : g === 'female' ? '👩 Female' : '🧑 Other'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[13px] uppercase tracking-wider font-bold text-gray-700 pl-1">Mobile Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-[15px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                    <input name="mobile" type="tel" value={formData.mobile} 
                           onChange={(e) => setFormData(p => ({ ...p, mobile: e.target.value.replace(/\D/g, '').slice(0, 10)}))} 
                           className={inputStyle} placeholder="Enter 10-digit number" inputMode="numeric" />
                  </div>
                </div>

                {/* PIN Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Create PIN */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-700 pl-1">Create PIN</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-[15px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                      <input name="pin" type={showPin ? 'text' : 'password'} value={formData.pin} 
                             onChange={(e) => setFormData(p => ({ ...p, pin: e.target.value.replace(/\D/g, '').slice(0, 4)}))}
                             className={`${inputStyle} tracking-[0.2em] pr-10`} placeholder="••••" inputMode="numeric" />
                      <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-[15px] text-gray-400 hover:text-primary-green">
                        {showPin ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                      </button>
                    </div>
                  </div>

                  {/* Confirm PIN */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-700 pl-1">Confirm</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-[15px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                      <input name="confirmPin" type={showPin ? 'text' : 'password'} value={formData.confirmPin} 
                             onChange={(e) => setFormData(p => ({ ...p, confirmPin: e.target.value.replace(/\D/g, '').slice(0, 4)}))}
                             className={`${inputStyle} tracking-[0.2em]`} placeholder="••••" inputMode="numeric" />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextStep}
                  className="w-full h-[56px] mt-6 flex items-center justify-center bg-primary-green text-white font-bold text-lg rounded-[16px] shadow-organic hover:bg-primary-darkGreen hover:shadow-organic-hover transition-all duration-300"
                >
                  Continue Setup →
                </motion.button>
              </motion.div>
            ) : (
              // STEP 2 FORMS
              <motion.div
                key="step2"
                custom={2}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Village */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-700 pl-1">Village/Town</label>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-[15px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                      <input name="village" type="text" value={formData.village} onChange={handleInputChange} className={`${inputStyle} pl-10`} placeholder="Anand" />
                    </div>
                  </div>

                  {/* District */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-700 pl-1">District</label>
                    <div className="relative group">
                      <MapIcon className="absolute left-3 top-[15px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                      <input name="district" type="text" value={formData.district} onChange={handleInputChange} className={`${inputStyle} pl-10`} placeholder="Vadodara" />
                    </div>
                  </div>
                </div>

                {/* Crop Types */}
                <div className="flex flex-col space-y-3 pb-2 pt-2">
                  <label className="text-[13px] uppercase tracking-wider font-bold text-gray-700 pl-1">What do you grow? (Select all)</label>
                  <div className="flex flex-wrap gap-2.5">
                    {CROP_OPTIONS.map(crop => {
                      const isActive = formData.cropTypes.includes(crop.id);
                      return (
                        <motion.button
                          key={crop.id}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => toggleCrop(crop.id)}
                          className={`px-4 py-2 rounded-full border-1.5 font-bold text-sm transition-colors duration-300
                            ${isActive 
                              ? 'bg-primary-green border-primary-green text-white shadow-sm' 
                              : 'bg-gray-50/50 border-gray-200 text-gray-600 hover:bg-white hover:border-primary-green/50'}`}
                        >
                          {crop.label}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Land Size */}
                <div className="flex flex-col space-y-1.5 pt-2">
                  <label className="text-[13px] uppercase tracking-wider font-bold text-gray-700 pl-1">Total Farm Land (Optional)</label>
                  <div className="relative group">
                    <input name="landSize" type="text" value={formData.landSize} onChange={handleInputChange} className={`${inputStyle} pl-4`} placeholder="e.g. 5 acres or 10 bigha" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    type="button"
                    className="flex-1 h-[56px] flex items-center justify-center bg-white border-2 border-primary-sage text-gray-600 font-bold text-lg rounded-[16px] hover:border-primary-green hover:text-primary-green transition-colors"
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    type="button"
                    className={`flex-[2] h-[56px] flex items-center justify-center bg-primary-green text-white font-bold text-lg rounded-[16px] shadow-organic transition-all duration-300
                                ${isLoading ? 'opacity-80 cursor-wait' : 'hover:bg-primary-darkGreen hover:shadow-organic-hover hover:-translate-y-0.5'}`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Finish Setup ✨'
                    )}
                  </motion.button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Link Below Form */}
          {step === 1 && (
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-gray-500 font-medium text-[15px]">
                Already registered?{' '}
                <Link to="/login" className="text-primary-green font-bold hover:underline decoration-2 underline-offset-4">
                  Log in here
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default Signup;
