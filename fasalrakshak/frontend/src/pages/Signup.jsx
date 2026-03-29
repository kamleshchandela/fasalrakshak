import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Lock, User, MapPin, Map as MapIcon, Leaf, AlertTriangle, CheckCircle, EyeOff, Eye } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

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
  const inputStyle = `w-full h-[52px] pl-11 pr-4 rounded-xl border-1.5 border-primary-sage text-base 
                      outline-none transition-all duration-300 bg-white
                      focus:border-primary-green focus:shadow-[0_0_0_4px_rgba(26,107,47,0.1)]`;

  return (
    <div className="min-h-screen bg-white font-nunito flex flex-col pt-16 lg:pt-20 overflow-x-hidden">
      
      {/* SECTION 1 — PAGE HEADER */}
      <section className="relative bg-primary-lightGreen py-16 md:py-24 flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200")' }}
        ></div>
        <div className="absolute inset-0 bg-primary-darkGreen/65 z-10"></div>
        
        <div className="relative z-20 text-center px-4 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-primary-lightGreen/90 text-primary-green px-4 py-1.5 rounded-full font-bold text-sm mb-6 uppercase tracking-wider">
            <Leaf className="w-4 h-4" />
            FasalRakshak — Smart Kheti
          </div>
          <h1 className="font-playfair font-bold text-3xl md:text-5xl text-white mb-4 leading-tight">
            Join FasalRakshak Today
          </h1>
          <p className="text-white/90 font-nunito text-lg mb-8 max-w-lg mx-auto">
            Create your free account in 2 minutes
          </p>
        </div>
      </section>

      {/* SECTION 2 — SIGNUP CARD */}
      <section className="flex-grow flex flex-col items-center px-4 -mt-12 md:-mt-16 relative z-30 pb-20">
        <div className="bg-white rounded-3xl w-full max-w-[480px] p-6 md:p-10 shadow-[0_8px_40px_rgba(26,107,47,0.10)] border-2 border-primary-sage overflow-hidden mx-auto relative h-auto min-h-[500px]">
          
          {/* Success Overlay */}
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="absolute inset-0 z-50 bg-white/95 flex flex-col items-center justify-center p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1.2, 1], opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-24 h-24 bg-[#F0FFF4] rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-primary-green" />
                </motion.div>
                <h3 className="font-playfair font-bold text-2xl text-primary-green mb-2">
                  Account Created!
                </h3>
                <p className="text-text-charcoal font-semibold text-lg">
                  Welcome to FasalRakshak 🎉
                </p>
                <div className="mt-8 flex gap-1 justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-green animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary-green animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary-green animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="mb-8 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${step === 1 ? 'text-primary-green' : 'text-gray-400'}`}>Step 1</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary-green"></div>
                <div className={`h-[2px] w-8 ${step === 2 ? 'bg-primary-green' : 'bg-gray-200'} transition-colors duration-500`}></div>
                <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-primary-green' : 'bg-gray-200'} transition-colors duration-500`}></div>
              </div>
              <span className={`text-sm font-bold ${step === 2 ? 'text-primary-green' : 'text-gray-400'}`}>Step 2</span>
            </div>
            <p className="text-sm font-bold text-text-charcoal mt-2 tracking-wide">
              {step === 1 ? 'Your Details' : 'Your Farm'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="errorMsg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start text-red-700 text-sm font-semibold mb-6"
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
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-4"
              >
                {/* Full Name */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-bold text-text-charcoal pl-1">Your Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-[14px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                    <input name="name" type="text" value={formData.name} onChange={handleInputChange} className={inputStyle} placeholder="e.g. Ramesh Patel" />
                  </div>
                </div>

                {/* Gender */}
                <div className="flex flex-col space-y-2 pb-1">
                  <label className="text-sm font-bold text-text-charcoal pl-1">Gender</label>
                  <div className="flex gap-2">
                    {['male', 'female', 'other'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, gender: g }))}
                        className={`flex-1 h-12 rounded-xl border-1.5 font-bold text-sm tracking-wide capitalize transition-all
                          ${formData.gender === g 
                            ? 'bg-primary-green border-primary-green text-white shadow-md' 
                            : 'bg-white border-primary-sage text-primary-green'}`}
                      >
                        {g === 'male' ? '👨 Male' : g === 'female' ? '👩 Female' : '🧑 Other'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-bold text-text-charcoal pl-1">Mobile Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-[14px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                    <input name="mobile" type="tel" value={formData.mobile} 
                           onChange={(e) => setFormData(p => ({ ...p, mobile: e.target.value.replace(/\D/g, '').slice(0, 10)}))} 
                           className={inputStyle} placeholder="Enter 10-digit mobile number" inputMode="numeric" />
                  </div>
                </div>

                {/* Create PIN */}
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-end pl-1 pr-1">
                    <label className="text-sm font-bold text-text-charcoal">Create Your PIN</label>
                    {formData.pin.length === 4 && <span className="text-xs text-primary-green font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Good</span>}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-[14px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                    <input name="pin" type={showPin ? 'text' : 'password'} value={formData.pin} 
                           onChange={(e) => setFormData(p => ({ ...p, pin: e.target.value.replace(/\D/g, '').slice(0, 4)}))}
                           className={`${inputStyle} tracking-widest`} placeholder="•••• (4 digits)" inputMode="numeric" />
                    <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-4 top-[14px] text-gray-400 hover:text-primary-green">
                      {showPin ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                    </button>
                  </div>
                </div>

                {/* Confirm PIN */}
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-end pl-1 pr-1">
                    <label className="text-sm font-bold text-text-charcoal">Confirm PIN</label>
                    {formData.confirmPin && (
                       formData.confirmPin === formData.pin ? (
                         <span className="text-xs text-primary-green font-bold">✅ Match</span>
                       ) : (
                         <span className="text-xs text-red-500 font-bold">❌ Mismatch</span>
                       )
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-[14px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                    <input name="confirmPin" type={showPin ? 'text' : 'password'} value={formData.confirmPin} 
                           onChange={(e) => setFormData(p => ({ ...p, confirmPin: e.target.value.replace(/\D/g, '').slice(0, 4)}))}
                           className={`${inputStyle} tracking-widest`} placeholder="••••" inputMode="numeric" />
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextStep}
                  className="w-full h-[52px] mt-4 flex items-center justify-center bg-primary-green text-white font-bold text-lg rounded-xl hover:bg-primary-darkGreen hover:shadow-lg transition-colors"
                >
                  Next Step →
                </motion.button>
              </motion.div>
            ) : (
              // STEP 2 FORMS
              <motion.div
                key="step2"
                custom={2}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-4"
              >
                {/* Village */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-bold text-text-charcoal pl-1">Village or Town</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-[14px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                    <input name="village" type="text" value={formData.village} onChange={handleInputChange} className={inputStyle} placeholder="e.g. Anand, Kheda" />
                  </div>
                </div>

                {/* District */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-bold text-text-charcoal pl-1">District</label>
                  <div className="relative group">
                    <MapIcon className="absolute left-4 top-[14px] h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                    <input name="district" type="text" value={formData.district} onChange={handleInputChange} className={inputStyle} placeholder="e.g. Vadodara, Surat" />
                  </div>
                </div>

                {/* State */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-bold text-text-charcoal pl-1">State</label>
                  <div className="relative group">
                    <input name="state" type="text" value={formData.state} onChange={handleInputChange} className={`${inputStyle} pl-4`} placeholder="State" />
                  </div>
                </div>

                {/* Crop Types */}
                <div className="flex flex-col space-y-2 pb-2">
                  <label className="text-sm font-bold text-text-charcoal pl-1">Your Crops (select all that apply)</label>
                  <div className="flex flex-wrap gap-2">
                    {CROP_OPTIONS.map(crop => {
                      const isActive = formData.cropTypes.includes(crop.id);
                      return (
                        <motion.button
                          key={crop.id}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => toggleCrop(crop.id)}
                          className={`px-3 py-1.5 rounded-full border-1.5 font-bold text-sm transition-colors
                            ${isActive 
                              ? 'bg-primary-green border-primary-green text-white shadow-sm' 
                              : 'bg-white border-primary-sage text-primary-green'}`}
                        >
                          {crop.label}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Land Size */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-bold text-text-charcoal pl-1">Total Farm Land (Optional)</label>
                  <div className="relative group">
                    <input name="landSize" type="text" value={formData.landSize} onChange={handleInputChange} className={`${inputStyle} pl-4`} placeholder="e.g. 5 acres or 3 bigha" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStep(1)}
                    type="button"
                    className="flex-1 h-[52px] flex items-center justify-center bg-white border-2 border-primary-green text-primary-green font-bold text-lg rounded-xl hover:bg-primary-lightGreen transition-colors"
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    type="button"
                    className={`flex-1 h-[52px] flex items-center justify-center bg-primary-green text-white font-bold text-lg rounded-xl transition-colors
                                ${isLoading ? 'opacity-80 cursor-wait' : 'hover:bg-primary-darkGreen hover:shadow-lg'}`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      '🌿 Create Account'
                    )}
                  </motion.button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Link Below Form */}
          {step === 1 && (
            <div className="mt-8 flex flex-col items-center">
              <p className="text-text-charcoal font-semibold text-[15px]">
                Already registered?{' '}
                <Link to="/login" className="text-primary-green hover:underline decoration-2 underline-offset-4">
                  Login here
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Signup;
