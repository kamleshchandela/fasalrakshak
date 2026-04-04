// Weather utility using Open-Meteo (no API key needed!)
// WMO Weather code mapping: https://open-meteo.com/en/docs

export const getWeatherTheme = (code, isNight) => {
  if (isNight) {
    return {
      type: 'night',
      label: 'Night Mode 🌙',
      gradient: 'from-[#0f0c29] via-[#1a1a4e] to-[#24243e]',
      cardBg: 'rgba(15,12,41,0.6)',
      textColor: 'text-indigo-200',
      accentColor: '#a78bfa',
      glowColor: 'rgba(167,139,250,0.3)',
      particleColor: '#fbbf24',
      borderColor: 'rgba(167,139,250,0.2)',
      inputBg: 'rgba(30,27,75,0.8)',
      buttonGradient: 'from-violet-600 to-indigo-600',
      plantGlow: '#a78bfa',
    };
  }

  // Rain codes: 51-67, 80-82, 95-99
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 99)) {
    return {
      type: 'rainy',
      label: 'Rainy Season 🌧️',
      gradient: 'from-[#1e3a5f] via-[#2d5a87] to-[#3b82c4]',
      cardBg: 'rgba(30,58,95,0.55)',
      textColor: 'text-blue-100',
      accentColor: '#60a5fa',
      glowColor: 'rgba(96,165,250,0.4)',
      particleColor: '#93c5fd',
      borderColor: 'rgba(96,165,250,0.25)',
      inputBg: 'rgba(30,58,95,0.7)',
      buttonGradient: 'from-blue-500 to-cyan-600',
      plantGlow: '#60a5fa',
      animationSpeed: 'fast',
    };
  }

  // Fog / cloudy codes: 1-48
  if (code >= 1 && code <= 48) {
    return {
      type: 'cloudy',
      label: 'Overcast Sky ☁️',
      gradient: 'from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8]',
      cardBg: 'rgba(226,232,240,0.65)',
      textColor: 'text-slate-700',
      accentColor: '#475569',
      glowColor: 'rgba(71,85,105,0.2)',
      particleColor: '#94a3b8',
      borderColor: 'rgba(71,85,105,0.15)',
      inputBg: 'rgba(248,249,250,0.85)',
      buttonGradient: 'from-slate-600 to-slate-700',
      plantGlow: '#64748b',
    };
  }

  // Clear / Sunny (code 0)
  return {
    type: 'sunny',
    label: 'Clear Sunny Day ☀️',
    gradient: 'from-[#fef3c7] via-[#fdd835] to-[#f59e0b]',
    cardBg: 'rgba(255,255,255,0.65)',
    textColor: 'text-amber-900',
    accentColor: '#d97706',
    glowColor: 'rgba(251,191,36,0.4)',
    particleColor: '#fbbf24',
    borderColor: 'rgba(217,119,6,0.2)',
    inputBg: 'rgba(255,255,255,0.9)',
    buttonGradient: 'from-[#276738] to-[#1B4D2B]',
    plantGlow: '#fbbf24',
  };
};

export const fetchWeatherForLocation = async (lat, lon) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`
  );
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  const { temperature_2m, weather_code, is_day } = data.current;
  return { temp: Math.round(temperature_2m), code: weather_code, isNight: is_day === 0 };
};

export const getUserLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject(new Error('Geolocation not supported'));
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => reject(new Error('Location denied'))
    );
  });
