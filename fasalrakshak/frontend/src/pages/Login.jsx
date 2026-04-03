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
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#022c22" />
          <stop offset="50%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="38%" r="45%">
          <stop offset="0%" stopColor="rgba(74,222,128,0.28)" />
          <stop offset="70%" stopColor="rgba(34,197,94,0.06)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="sunGlow" cx="50%" cy="32%" r="18%">
          <stop offset="0%" stopColor="rgba(187,247,208,0.55)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="800" height="900" fill="url(#skyGrad)" />
      {/* Sun glow */}
      <ellipse cx="400" cy="260" rx="340" ry="260" fill="url(#glowGrad)" />
      <ellipse cx="400" cy="280" rx="90" ry="70" fill="url(#sunGlow)" />

      {/* Light rays */}
      {[-60,-40,-22,-8,8,22,40,60].map((angle, i) => (
        <line key={i} x1="400" y1="280" x2={400 + Math.sin((angle * Math.PI) / 180) * 600}
          y2={280 + Math.cos((angle * Math.PI) / 180) * 600}
          stroke="rgba(134,239,172,0.05)" strokeWidth={i % 2 === 0 ? 18 : 9} />
      ))}

      {/* Far hills */}
      <path d="M0 560 Q120 470 240 510 Q340 460 460 500 Q580 455 700 490 L800 504 L800 900 L0 900Z"
        fill="#166534" opacity="0.55" />
      {/* Mid hills */}
      <path d="M0 620 Q100 550 220 585 Q360 535 500 570 Q650 535 800 570 L800 900 L0 900Z"
        fill="#15803d" opacity="0.65" />
      {/* Near ground */}
      <path d="M0 700 Q200 660 400 680 Q600 650 800 675 L800 900 L0 900Z"
        fill="#14532d" />

      {/* Wheat rows */}
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

      {/* Tree silhouette */}
      <rect x="90" y="580" width="10" height="120" fill="#052e16" rx="2" />
      <ellipse cx="95" cy="555" rx="42" ry="55" fill="#052e16" />
      <ellipse cx="72" cy="585" rx="26" ry="36" fill="#052e16" />
      <ellipse cx="118" cy="580" rx="28" ry="32" fill="#052e16" />

      {/* Stars */}
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
    style={{
      background: 'rgba(5, 46, 22, 0.6)',
      border: '1px solid rgba(74,222,128,0.25)',
      backdropFilter: 'blur(16px)',
      ...style,
    }}>
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

/* ── Input field ─────────── */
const InputField = ({ label, icon, children }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-2 font-jakarta font-semibold text-[11px] text-slate-400 uppercase tracking-[0.14em]">
      <span className="text-[14px]">{icon}</span> {label}
    </label>
    {children}
  </div>
);

/* ── PIN display row ──────── */
const PinDots = ({ pin, shake }) => (
  <div className="flex gap-3">
    {[0, 1, 2, 3].map(i => (
      <motion.div key={i} className="flex-1 h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
        animate={{ x: shake ? [-5, 5, -5, 5, 0] : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: i < pin.length ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : '#f8fafc',
          border: `1.5px solid ${i < pin.length ? '#86efac' : '#e2e8f0'}`,
          boxShadow: i < pin.length ? '0 0 0 4px rgba(134,239,172,0.12)' : 'none',
        }}
      >
        {i < pin.length && (
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.35 }}
            className="w-3 h-3 rounded-full"
            style={{ background: shake ? '#ef4444' : '#16a34a' }} />
        )}
      </motion.div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════
   L O G I N
═══════════════════════════════════════════════ */
const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pinShake, setPinShake] = useState(false);
  const [mFocus, setMFocus] = useState(false);
  const [pFocus, setPFocus] = useState(false);

  useEffect(() => { if (user) navigate('/detect'); }, [user, navigate]);
  const showToast = (msg, type = 'error') => { setToast({ msg, type }); setTimeout(() => setToast(null), 4000); };

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) return showToast('Enter a valid 10-digit mobile number', 'warn');
    if (pin.length !== 4) return showToast('Enter your 4-digit security PIN', 'warn');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile, pin }) });
      const text = await res.text(); let data = {}; try { data = JSON.parse(text); } catch {}
      if (!res.ok) { setPinShake(true); setTimeout(() => setPinShake(false), 600); throw new Error(data.message || 'Incorrect PIN. Please try again.'); }
      showToast('Welcome back! Redirecting…', 'success'); login(data.user); setTimeout(() => navigate('/detect'), 1200);
    } catch (err) { showToast(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <AnimatePresence>{toast && <Toast key="t" {...toast} />}</AnimatePresence>

      {/* ══ LEFT: Farm scene ══ */}
      <motion.div className="hidden lg:flex flex-col relative overflow-hidden"
        style={{ width: '44%' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <FarmScene />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(2,44,34,0.55) 0%, rgba(5,46,22,0.25) 50%, rgba(2,44,34,0.8) 100%)' }} />

        {/* Brand top */}
        <div className="relative z-10 p-9 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="text-xl">🌾</span>
          </div>
          <div>
            <p className="text-white font-syne font-black text-[16px] tracking-[0.08em]">FasalRakshak</p>
            <p className="text-green-300/55 font-jakarta text-[10px] tracking-[0.15em] uppercase mt-0.5">Smart Farming Platform</p>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-9">
          <div className="mb-2">
            <span className="font-jakarta text-[10px] font-bold text-green-400/80 tracking-[0.2em] uppercase">Trusted by 5 lakh kisans</span>
          </div>
          <h1 className="text-white font-syne font-black leading-[1.12] tracking-[-0.03em] mb-5"
            style={{ fontSize: 'clamp(28px, 3.2vw, 42px)' }}>
            Protect Your Crops<br />
            <span style={{ color: '#4ade80' }}>with AI</span>
          </h1>
          <p className="text-green-100/60 font-jakarta font-medium text-[13px] leading-relaxed max-w-[280px]">
            Disease detection, weather alerts, market rates and expert advice — all in one place.
          </p>

          {/* Stat badges */}
          <div className="relative mt-8 h-32">
            <StatBadge icon="⚡" val="98.2%" label="AI Detection Accuracy" style={{ top: 0, left: 0 }} delay={0.4} />
            <StatBadge icon="🌱" val="220+" label="Crop Types Supported" style={{ top: '52%', left: '30%' }} delay={0.55} />
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="relative z-10 px-9 pb-9">
          <div className="h-px bg-white/10 mb-5" />
          <div className="flex items-center gap-4">
            {['🔒 256-bit SSL', '📶 Works Offline', '🆓 Free Forever'].map(f => (
              <span key={f} className="font-jakarta text-[10px] text-green-300/50 font-medium">{f}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ══ RIGHT: Form panel ══ */}
      <motion.div className="flex-1 flex flex-col overflow-y-auto"
        style={{ background: '#ffffff' }}
        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>

        {/* Top nav */}
        <div className="flex items-center justify-between px-10 py-6 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 font-jakarta font-semibold text-[13px] text-slate-400 hover:text-slate-600 transition-colors">
            <span>←</span> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-jakarta text-[12px] text-slate-400">New farmer?</span>
            <Link to="/signup">
              <span className="font-jakarta font-bold text-[13px] text-green-600 hover:text-green-700 transition-colors">Create account →</span>
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-10 py-8">
          <div className="w-full max-w-[360px]">

            {/* Header */}
            <div className="mb-8">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', border: '1px solid rgba(22,163,74,0.15)' }}>
                <span className="text-2xl">🌿</span>
              </div>
              <h2 className="font-syne font-black text-slate-900 tracking-tight mb-1.5" style={{ fontSize: 28, letterSpacing: '-0.03em' }}>
                Welcome back
              </h2>
              <p className="font-jakarta text-slate-400 text-[14px] font-medium leading-snug">
                Sign in to continue to your farm dashboard
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              {/* Mobile */}
              <InputField label="Mobile Number" icon="📱">
                <div className="flex items-center gap-3 h-[52px] px-4 rounded-xl transition-all duration-200"
                  style={{ background: '#f8fafc', border: mFocus ? '2px solid #16a34a' : '1.5px solid #e2e8f0', boxShadow: mFocus ? '0 0 0 4px rgba(22,163,74,0.08)' : 'none' }}>
                  <span className="font-jakarta text-slate-400 font-semibold text-[13px] border-r border-slate-200 pr-3 flex-shrink-0">+91</span>
                  <input type="tel" inputMode="numeric" maxLength={10} value={mobile}
                    onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    onFocus={() => setMFocus(true)} onBlur={() => setMFocus(false)}
                    className="flex-1 bg-transparent outline-none font-jakarta font-semibold text-[15px] text-slate-800"
                    placeholder="98765 43210" />
                  {mobile.length === 10 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#dcfce7', border: '1.5px solid #4ade80' }}>
                      <span className="text-green-600 text-[10px] font-black">✓</span>
                    </motion.div>
                  )}
                </div>
              </InputField>

              {/* PIN */}
              <InputField label="Security PIN" icon="🔐">
                <PinDots pin={pin} shake={pinShake} />
                <input type="password" inputMode="numeric" maxLength={4} value={pin}
                  onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  onFocus={() => setPFocus(true)} onBlur={() => setPFocus(false)}
                  className="w-full h-[52px] rounded-xl outline-none font-black text-[22px] tracking-[1.2em] text-center mt-2.5 transition-all duration-200"
                  style={{
                    background: '#f8fafc', color: '#16a34a',
                    border: pFocus ? '2px solid #16a34a' : '1.5px solid #e2e8f0',
                    boxShadow: pFocus ? '0 0 0 4px rgba(22,163,74,0.08)' : 'none',
                  }}
                  placeholder="·  ·  ·  ·" />
              </InputField>

              {/* CTA */}
              <div className="pt-1">
                <motion.button type="submit" disabled={loading}
                  whileHover={{ y: -1.5, boxShadow: '0 16px 40px rgba(22,163,74,0.38)' }}
                  whileTap={{ y: 0, scale: 0.99 }}
                  className="w-full h-[54px] rounded-xl font-syne font-black text-white text-[15px] flex items-center justify-center gap-2.5 transition-all"
                  style={{ background: loading ? '#86efac' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', boxShadow: '0 8px 24px rgba(22,163,74,0.28)' }}>
                  {loading
                    ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} className="inline-block">⟳</motion.span> Signing in…</>
                    : <><span>→</span> Sign In to Dashboard</>}
                </motion.button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="font-jakarta text-[11px] text-slate-300 font-medium">or</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Register CTA */}
            <Link to="/signup">
              <motion.div whileHover={{ background: '#f0fdf4', borderColor: '#86efac' }}
                className="w-full h-[50px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all font-jakarta font-semibold text-[14px] text-slate-500"
                style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                <span className="text-green-500">🌱</span> Create a free account
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Bottom auth note */}
        <div className="px-10 py-5 flex-shrink-0 border-t border-slate-50">
          <p className="font-jakarta text-[11px] text-slate-300 text-center font-medium">
            Protected by end-to-end encryption · FasalRakshak © 2025
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
