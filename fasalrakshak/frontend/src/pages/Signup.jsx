import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

/* ── Toast ─────────────────── */
const Toast = ({ msg, type }) => {
  const bg = type === 'error' ? '#ef4444' : type === 'success' ? '#16a34a' : '#f59e0b';
  return (
    <motion.div initial={{ opacity: 0, y: -24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl max-w-sm text-white text-[13px] font-jakarta font-semibold"
      style={{ background: bg, border: '1px solid rgba(255,255,255,0.2)' }}>
      <span className="text-base">{type === 'error' ? '⛔' : type === 'success' ? '✓' : '⚠'}</span> {msg}
    </motion.div>
  );
};

/* ── Farm Landscape SVG ─────── */
const FarmScene = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="skyS" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#022c22" />
          <stop offset="50%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <radialGradient id="glowS" cx="50%" cy="38%" r="45%">
          <stop offset="0%" stopColor="rgba(74,222,128,0.28)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="sunS" cx="50%" cy="32%" r="18%">
          <stop offset="0%" stopColor="rgba(187,247,208,0.55)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="800" height="900" fill="url(#skyS)" />
      <ellipse cx="400" cy="260" rx="340" ry="260" fill="url(#glowS)" />
      <ellipse cx="400" cy="280" rx="90" ry="70" fill="url(#sunS)" />
      {[-60,-40,-22,-8,8,22,40,60].map((a, i) => (
        <line key={i} x1="400" y1="280" x2={400 + Math.sin((a * Math.PI) / 180) * 600}
          y2={280 + Math.cos((a * Math.PI) / 180) * 600}
          stroke="rgba(134,239,172,0.05)" strokeWidth={i % 2 === 0 ? 18 : 9} />
      ))}
      <path d="M0 560 Q120 470 240 510 Q340 460 460 500 Q580 455 700 490 L800 504 L800 900 L0 900Z" fill="#166534" opacity="0.55" />
      <path d="M0 620 Q100 550 220 585 Q360 535 500 570 Q650 535 800 570 L800 900 L0 900Z" fill="#15803d" opacity="0.65" />
      <path d="M0 700 Q200 660 400 680 Q600 650 800 675 L800 900 L0 900Z" fill="#14532d" />
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 30 + i * 54;
        return (
          <g key={i} opacity="0.35">
            <line x1={x} y1="700" x2={x} y2="900" stroke="#4ade80" strokeWidth="1.5" />
            {[730, 760, 790, 820].map(y => (
              <g key={y}>
                <ellipse cx={x - 6} cy={y} rx="5" ry="10" fill="#22c55e" transform={`rotate(-25 ${x - 6} ${y})`} />
                <ellipse cx={x + 6} cy={y + 6} rx="5" ry="10" fill="#16a34a" transform={`rotate(25 ${x + 6} ${y + 6})`} />
              </g>
            ))}
          </g>
        );
      })}
      <rect x="90" y="580" width="10" height="120" fill="#052e16" rx="2" />
      <ellipse cx="95" cy="555" rx="42" ry="55" fill="#052e16" />
      <ellipse cx="72" cy="585" rx="26" ry="36" fill="#052e16" />
      <ellipse cx="118" cy="580" rx="28" ry="32" fill="#052e16" />
      {Array.from({ length: 30 }).map((_, i) => (
        <circle key={i} cx={30 + (i * 73) % 760} cy={20 + (i * 37) % 200}
          r={0.8 + (i % 3) * 0.5} fill="rgba(187,247,208,0.6)" />
      ))}
    </svg>
  </div>
);

/* ── Glass stat badge ─────── */
const StatBadge = ({ icon, val, label, style, delay }) => (
  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, type: 'spring', bounce: 0.3 }}
    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl absolute"
    style={{ background: 'rgba(5,46,22,0.6)', border: '1px solid rgba(74,222,128,0.25)', backdropFilter: 'blur(16px)', ...style }}>
    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(74,222,128,0.3)' }}>
      <span className="text-sm">{icon}</span>
    </div>
    <div>
      <p className="text-white font-syne font-black text-[15px] leading-none">{val}</p>
      <p className="text-green-300/60 font-jakarta text-[10px] mt-0.5">{label}</p>
    </div>
  </motion.div>
);

/* ── Text input ─────────── */
const TextInput = ({ label, icon, children, note }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <label className="font-jakarta font-semibold text-[11px] text-slate-400 uppercase tracking-[0.14em] flex items-center gap-1.5">
        <span>{icon}</span>{label}
      </label>
      {note && <span className="font-jakarta text-[10px] text-slate-300">{note}</span>}
    </div>
    {children}
  </div>
);

/* ── PIN dots ─────────── */
const PinDots = ({ pin, shake }) => (
  <div className="flex gap-2.5">
    {[0, 1, 2, 3].map(i => (
      <motion.div key={i} className="flex-1 h-14 rounded-xl flex items-center justify-center"
        animate={{ x: shake && i < pin.length ? [-4, 4, -4, 4, 0] : 0 }}
        transition={{ duration: 0.28 }}
        style={{
          background: i < pin.length ? '#f0fdf4' : '#f8fafc',
          border: `1.5px solid ${i < pin.length ? (shake ? '#fca5a5' : '#86efac') : '#e2e8f0'}`,
          boxShadow: i < pin.length && !shake ? '0 0 0 3px rgba(134,239,172,0.14)' : 'none',
        }}
      >
        {i < pin.length && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, duration: 0.3 }}
            className="w-3 h-3 rounded-full"
            style={{ background: shake ? '#ef4444' : '#16a34a' }} />
        )}
      </motion.div>
    ))}
  </div>
);

/* ── Chip ─────── */
const Chip = ({ active, children, onClick }) => (
  <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.94 }}
    className="px-3.5 py-1.5 rounded-lg text-[12px] font-jakarta font-semibold transition-all"
    style={{
      background: active ? '#dcfce7' : '#f8fafc',
      border: `1.5px solid ${active ? '#4ade80' : '#e2e8f0'}`,
      color: active ? '#15803d' : '#94a3b8',
    }}>
    {children}
  </motion.button>
);

/* ── Segmented step bar ─── */
const StepBar = ({ step }) => (
  <div className="flex items-center gap-2 mb-6">
    {[{ n: 1, label: 'Personal Info' }, { n: 2, label: 'Your Farm' }].map(({ n, label }, idx) => (
      <React.Fragment key={n}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center font-syne font-black text-[11px] flex-shrink-0"
            style={{
              background: step >= n ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#f0fdf4',
              color: step >= n ? '#fff' : '#86efac',
              border: step >= n ? 'none' : '1.5px solid #bbf7d0',
            }}>
            {step > n ? '✓' : n}
          </div>
          <span className="font-jakarta text-[12px] font-semibold" style={{ color: step >= n ? '#16a34a' : '#cbd5e1' }}>
            {label}
          </span>
        </div>
        {idx < 1 && <div className="flex-1 h-px" style={{ background: step === 2 ? '#4ade80' : '#e2e8f0' }} />}
      </React.Fragment>
    ))}
  </div>
);

const CROPS = [
  { id: 'wheat', e: '🌾', l: 'Wheat' }, { id: 'cotton', e: '🫘', l: 'Cotton' },
  { id: 'rice', e: '🍚', l: 'Rice' }, { id: 'corn', e: '🌽', l: 'Corn' },
  { id: 'groundnut', e: '🥜', l: 'Groundnut' }, { id: 'tomato', e: '🍅', l: 'Tomato' },
  { id: 'onion', e: '🧅', l: 'Onion' }, { id: 'potato', e: '🥔', l: 'Potato' },
];

/* ═══════════════════════════════════════════════
   S I G N U P
═══════════════════════════════════════════════ */
const Signup = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pFocus, setPFocus] = useState(false);
  const [cFocus, setCFocus] = useState(false);
  const [form, setForm] = useState({ name: '', gender: '', mobile: '', village: '', district: '', state: 'Gujarat', cropTypes: [], landSize: '' });

  useEffect(() => { if (user) navigate('/detect'); }, [user, navigate]);
  const showToast = (msg, type = 'error') => { setToast({ msg, type }); setTimeout(() => setToast(null), 4000); };
  const setF = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const mFocusRef = React.useRef(false);
  const [mFocus, setMFocus] = useState(false);

  const goNext = () => {
    if (!form.name.trim() || form.name.trim().length < 2) return showToast('Please enter your full name', 'warn');
    if (!form.gender) return showToast('Please select your gender', 'warn');
    if (!/^[6-9]\d{9}$/.test(form.mobile)) return showToast('Enter a valid 10-digit mobile number', 'warn');
    if (pin.length !== 4) return showToast('Create a 4-digit security PIN', 'warn');
    if (pin !== confirmPin) return showToast('PINs do not match. Try again', 'error');
    setStep(2);
  };

  const submit = async () => {
    if (!form.village.trim()) return showToast('Village / Town is required', 'warn');
    if (!form.district.trim()) return showToast('District is required', 'warn');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, pin }) });
      const text = await res.text(); let data = {}; try { data = JSON.parse(text); } catch {}
      if (!res.ok) throw new Error(data.message || 'Registration failed. Please try again.');
      setSuccess(true); showToast('Account created successfully!', 'success');
      setTimeout(() => { login(data.user); navigate('/detect'); }, 2000);
    } catch (err) { showToast(err.message); } finally { setLoading(false); }
  };

  /* shared input style */
  const inp = (focused) => ({
    background: '#f8fafc',
    border: focused ? '2px solid #16a34a' : '1.5px solid #e2e8f0',
    boxShadow: focused ? '0 0 0 4px rgba(22,163,74,0.08)' : 'none',
  });

  return (
    <div className="min-h-screen flex overflow-hidden bg-slate-50">
      <AnimatePresence>{toast && <Toast key="t" {...toast} />}</AnimatePresence>

      {/* ══ LEFT ══ */}
      <motion.div className="hidden lg:flex flex-col relative overflow-hidden"
        style={{ width: '44%' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <FarmScene />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(2,44,34,0.55) 0%, rgba(5,46,22,0.25) 50%, rgba(2,44,34,0.8) 100%)' }} />

        <div className="relative z-10 p-9 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="text-xl">🌾</span>
          </div>
          <div>
            <p className="text-white font-syne font-black text-[16px] tracking-[0.08em]">FasalRakshak</p>
            <p className="text-green-300/55 font-jakarta text-[10px] tracking-[0.15em] uppercase mt-0.5">Smart Farming Platform</p>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-9">
          <div className="mb-2">
            <span className="font-jakarta text-[10px] font-bold text-green-400/80 tracking-[0.2em] uppercase">100% Free · Works Offline</span>
          </div>
          <h1 className="text-white font-syne font-black leading-[1.12] tracking-[-0.03em] mb-5"
            style={{ fontSize: 'clamp(28px, 3.2vw, 40px)' }}>
            Your Farm,<br />
            <span style={{ color: '#4ade80' }}>Smarter Every Day</span>
          </h1>
          <p className="text-green-100/60 font-jakarta font-medium text-[13px] leading-relaxed max-w-[280px] mb-8">
            Join 5 lakh+ farmers already using FasalRakshak to grow more, lose less.
          </p>

          <div className="space-y-3">
            {['🔬 AI Disease Detection in under 2 seconds', '📊 Live mandi price updates', '🌤️ Hyper-local weather forecast', '👨‍🌾 Expert agronomist on-demand'].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.08 }}
                className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(74,222,128,0.35)' }}>
                  <span className="text-green-400 text-[9px] font-black">✓</span>
                </div>
                <span className="text-green-100/65 font-jakarta text-[12px] font-medium">{f}</span>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-8 h-28">
            <StatBadge icon="🆓" val="Free Forever" label="No credit card needed" style={{ top: 0, left: 0 }} delay={0.5} />
            <StatBadge icon="🌱" val="5 Lakh+" label="Farmers registered" style={{ top: '52%', left: '28%' }} delay={0.65} />
          </div>
        </div>

        <div className="relative z-10 px-9 pb-9">
          <div className="h-px bg-white/10 mb-5" />
          <div className="flex items-center gap-4">
            {['🔒 256-bit SSL', '📶 Works Offline', '🌐 3 Languages'].map(f => (
              <span key={f} className="font-jakarta text-[10px] text-green-300/50 font-medium">{f}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ══ RIGHT ══ */}
      <motion.div className="flex-1 flex flex-col overflow-y-auto"
        style={{ background: '#ffffff' }}
        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>

        {/* Nav */}
        <div className="flex items-center justify-between px-10 py-6 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 font-jakarta font-semibold text-[13px] text-slate-400 hover:text-slate-600 transition-colors">
            <span>←</span> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-jakarta text-[12px] text-slate-400">Have an account?</span>
            <Link to="/login">
              <span className="font-jakarta font-bold text-[13px] text-green-600 hover:text-green-700 transition-colors">Sign in →</span>
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-10 py-6">
          <div className="w-full max-w-[380px]">

            {/* Header */}
            <div className="mb-6">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', border: '1px solid rgba(22,163,74,0.15)' }}>
                <span className="text-2xl">🌱</span>
              </div>
              <h2 className="font-syne font-black text-slate-900 tracking-tight mb-1.5" style={{ fontSize: 26, letterSpacing: '-0.03em' }}>
                Create your account
              </h2>
              <p className="font-jakarta text-slate-400 text-[13px] font-medium">
                Free forever · Set up in under 2 minutes
              </p>
            </div>

            <StepBar step={step} />

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-8 text-center">
                  <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                    className="w-20 h-20 rounded-3xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' }}>
                    <span style={{ fontSize: 44 }}>🌳</span>
                  </motion.div>
                  <div>
                    <h3 className="font-syne font-black text-xl text-slate-900 mb-1">Account Created!</h3>
                    <p className="font-jakarta text-slate-400 text-sm font-medium">Setting up your dashboard…</p>
                  </div>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-green-400"
                        animate={{ scale: [0.6, 1.2, 0.6] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }} />
                    ))}
                  </div>
                </motion.div>

              ) : step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                  {/* Name */}
                  <TextInput label="Full Name" icon="👤">
                    <div className="flex items-center gap-3 h-[50px] px-4 rounded-xl transition-all duration-200"
                      style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
                      <input type="text" value={form.name} onChange={e => setF('name', e.target.value)}
                        className="flex-1 bg-transparent outline-none font-jakarta font-semibold text-[14px] text-slate-800"
                        placeholder="e.g. Ramesh Patel" />
                    </div>
                  </TextInput>

                  {/* Gender */}
                  <TextInput label="Gender" icon="👤">
                    <div className="grid grid-cols-3 gap-2">
                      {[['male', '👨', 'Male'], ['female', '👩', 'Female'], ['other', '🧑', 'Other']].map(([v, e, l]) => (
                        <button key={v} type="button" onClick={() => setF('gender', v)}
                          className="h-[44px] rounded-xl font-jakarta font-semibold text-[12px] transition-all"
                          style={form.gender === v
                            ? { background: '#dcfce7', border: '1.5px solid #4ade80', color: '#15803d' }
                            : { background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#94a3b8' }}>
                          {e} {l}
                        </button>
                      ))}
                    </div>
                  </TextInput>

                  {/* Mobile */}
                  <TextInput label="Mobile Number" icon="📱">
                    <div className="flex items-center gap-3 h-[50px] px-4 rounded-xl transition-all duration-200"
                      style={{ background: '#f8fafc', border: mFocus ? '2px solid #16a34a' : '1.5px solid #e2e8f0', boxShadow: mFocus ? '0 0 0 4px rgba(22,163,74,0.08)' : 'none' }}>
                      <span className="font-jakarta text-slate-400 font-semibold text-[13px] border-r border-slate-200 pr-3 flex-shrink-0">+91</span>
                      <input type="tel" inputMode="numeric" maxLength={10} value={form.mobile}
                        onChange={e => setF('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        onFocus={() => setMFocus(true)} onBlur={() => setMFocus(false)}
                        className="flex-1 bg-transparent outline-none font-jakarta font-semibold text-[14px] text-slate-800"
                        placeholder="98765 43210" />
                    </div>
                  </TextInput>

                  {/* PIN */}
                  <TextInput label="Create PIN" icon="🔐" note="4-digit security code">
                    <PinDots pin={pin} shake={false} />
                    <input type="password" inputMode="numeric" maxLength={4} value={pin}
                      onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      onFocus={() => setPFocus(true)} onBlur={() => setPFocus(false)}
                      className="w-full h-[50px] rounded-xl outline-none font-black text-[22px] tracking-[1.2em] text-center mt-2.5 transition-all"
                      style={{ ...inp(pFocus), color: '#16a34a' }}
                      placeholder="·  ·  ·  ·" />
                  </TextInput>

                  {/* Confirm PIN */}
                  <TextInput label="Confirm PIN" icon="🔐" note={confirmPin.length === 4 ? (confirmPin === pin ? '✓ Match' : '✗ Mismatch') : ''}>
                    <input type="password" inputMode="numeric" maxLength={4} value={confirmPin}
                      onChange={e => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      onFocus={() => setCFocus(true)} onBlur={() => setCFocus(false)}
                      className="w-full h-[50px] rounded-xl outline-none font-black text-[22px] tracking-[1.2em] text-center transition-all"
                      style={{
                        background: '#f8fafc', color: '#16a34a',
                        border: cFocus ? '2px solid #16a34a' : confirmPin.length === 4 && confirmPin === pin ? '1.5px solid #4ade80' : '1.5px solid #e2e8f0',
                        boxShadow: cFocus ? '0 0 0 4px rgba(22,163,74,0.08)' : 'none',
                      }}
                      placeholder="·  ·  ·  ·" />
                  </TextInput>

                  <motion.button type="button" onClick={goNext}
                    whileHover={{ y: -1.5, boxShadow: '0 16px 40px rgba(22,163,74,0.38)' }} whileTap={{ scale: 0.99 }}
                    className="w-full h-[52px] rounded-xl font-syne font-black text-white text-[15px] flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', boxShadow: '0 8px 24px rgba(22,163,74,0.28)' }}>
                    Continue to Farm Details →
                  </motion.button>
                </motion.div>

              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} className="space-y-4">
                  {/* Village + District */}
                  <div className="grid grid-cols-2 gap-3">
                    <TextInput label="Village / Town" icon="📍">
                      <input type="text" value={form.village} onChange={e => setF('village', e.target.value)}
                        className="w-full h-[50px] rounded-xl px-4 outline-none font-jakarta font-semibold text-[14px] text-slate-800 transition-all"
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                        placeholder="e.g. Anand" />
                    </TextInput>
                    <TextInput label="District" icon="🗺️">
                      <input type="text" value={form.district} onChange={e => setF('district', e.target.value)}
                        className="w-full h-[50px] rounded-xl px-4 outline-none font-jakarta font-semibold text-[14px] text-slate-800 transition-all"
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                        placeholder="e.g. Vadodara" />
                    </TextInput>
                  </div>

                  {/* State */}
                  <TextInput label="State" icon="🏛️">
                    <input type="text" value={form.state} onChange={e => setF('state', e.target.value)}
                      className="w-full h-[50px] rounded-xl px-4 outline-none font-jakarta font-semibold text-[14px] text-slate-800 transition-all"
                      style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                      placeholder="Gujarat" />
                  </TextInput>

                  {/* Crops */}
                  <TextInput label="Primary Crops (optional)" icon="🌾">
                    <div className="flex flex-wrap gap-2 pt-1">
                      {CROPS.map(c => (
                        <Chip key={c.id} active={form.cropTypes.includes(c.id)}
                          onClick={() => setF('cropTypes', form.cropTypes.includes(c.id)
                            ? form.cropTypes.filter(x => x !== c.id)
                            : [...form.cropTypes, c.id])}>
                          {c.e} {c.l}
                        </Chip>
                      ))}
                    </div>
                  </TextInput>

                  {/* Land */}
                  <TextInput label="Farm Size (optional)" icon="📐">
                    <input type="text" value={form.landSize} onChange={e => setF('landSize', e.target.value)}
                      className="w-full h-[50px] rounded-xl px-4 outline-none font-jakarta font-semibold text-[14px] text-slate-800 transition-all"
                      style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                      placeholder="e.g. 5 acres" />
                  </TextInput>

                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setStep(1)}
                      className="h-[52px] px-5 rounded-xl font-jakarta font-semibold text-[13px] text-slate-400 hover:bg-slate-50 transition-all flex-shrink-0"
                      style={{ border: '1.5px solid #e2e8f0', background: 'transparent' }}>
                      ← Back
                    </button>
                    <motion.button type="button" onClick={submit} disabled={loading}
                      whileHover={{ y: -1.5, boxShadow: '0 16px 40px rgba(22,163,74,0.38)' }} whileTap={{ scale: 0.99 }}
                      className="flex-1 h-[52px] rounded-xl font-syne font-black text-white text-[15px] flex items-center justify-center gap-2"
                      style={{ background: loading ? '#86efac' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', boxShadow: '0 8px 24px rgba(22,163,74,0.28)' }}>
                      {loading
                        ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} className="inline-block">⟳</motion.span> Creating…</>
                        : <><span>🌱</span> Create Account</>}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="px-10 py-5 flex-shrink-0 border-t border-slate-50">
          <p className="font-jakarta text-[11px] text-slate-300 text-center font-medium">
            Protected by end-to-end encryption · FasalRakshak © 2025
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
