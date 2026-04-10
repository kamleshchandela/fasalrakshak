import React, { useState, useEffect } from 'react';
import {
  Cloud, Sun, CloudRain, Wind, Droplets, MapPin, Search, AlertTriangle,
  Sprout, Droplet, Thermometer, Calendar, Navigation, RefreshCw, TrendingUp,
  Map as MapIcon, Eye, Wheat, Leaf, ArrowRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Reliable Open APIs (No Keys Required)
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const REVERSE_GEO_API = "https://nominatim.openstreetmap.org/reverse";
const IP_LOCATION_API = "https://ipapi.co/json/"; 

// Interactivity Libraries (Leaflet for real-time map clicks)
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet icons for Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const Weather = () => {
  const { t, lang } = useLanguage();
  const [cityInput, setCityInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);
  const [showWindyMap, setShowWindyMap] = useState(true);
  const [mapMode, setMapMode] = useState('satellite'); // 'satellite' or 'windy'

  // WMO Weather Codes Mapping
  const interpretWeatherCode = (code) => {
    if (code === 0) return { label: t('weather.clear'), main: t('weather.sunny'), iconId: "01d" };
    if (code >= 1 && code <= 3) return { label: t('weather.p_cloudy'), main: t('weather.cloudy'), iconId: "03d" };
    if (code >= 45 && code <= 48) return { label: t('weather.foggy'), main: t('weather.foggy'), iconId: "50d" };
    if (code >= 51 && code <= 67) return { label: t('weather.rainy'), main: t('weather.rainy'), iconId: "10d" };
    if (code >= 80 && code <= 82) return { label: t('weather.showers'), main: t('weather.showers'), iconId: "09d" };
    if (code >= 95) return { label: t('weather.storm'), main: t('weather.storm'), iconId: "11d" };
    return { label: t('weather.clear'), main: t('weather.sunny'), iconId: "01d" };
  };

  const fetchWeather = async (lat, lon, cityName) => {
    try {
      setLoading(true);
      setError("");
      
      // Force city name update immediately for high responsiveness
      setLocation(prev => ({ ...prev, name: cityName, lat, lon }));

      const response = await fetch(
        `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation_probability&daily=weather_code,temperature_2m_max,precipitation_probability_max&timezone=auto`
      );
      
      if (!response.ok) throw new Error("Weather satellite unreachable");

      const data = await response.json();
      console.log("Weather Data Received:", data);

      if (!data.current) throw new Error("Satellite sync error");

      const weatherMain = interpretWeatherCode(data.current.weather_code);

      // Batch state updates
      setWeather({
        main: { 
          temp: Math.round(data.current.temperature_2m), 
          humidity: data.current.relative_humidity_2m 
        },
        wind: { speed: Math.round(data.current.wind_speed_10m) },
        weather: [{ main: weatherMain.main, description: weatherMain.label, icon: weatherMain.iconId }],
        rain_prob: data.current.precipitation_probability || 0
      });

      const locale = lang === 'GUJ' ? 'gu-IN' : lang === 'HI' ? 'hi-IN' : 'en-US';

      const processedForecast = data.daily.time.map((time, i) => {
        const date = new Date(time);
        const dayMain = interpretWeatherCode(data.daily.weather_code[i]);
        return {
          day: date.toLocaleDateString(locale, { weekday: 'short' }),
          temp: Math.round(data.daily.temperature_2m_max[i]),
          rain: data.daily.precipitation_probability_max[i],
          condition: dayMain.main,
          icon: dayMain.iconId
        };
      });

      setForecast(processedForecast);
      setError("");
    } catch (err) {
      console.error("Critical Fetch Error:", err);
      setError(`Unable to sync data for ${cityName}. Please try again.`);
    } finally {
      setTimeout(() => setLoading(false), 300); // Small delay for visual continuity
    }
  };

  const handleSearch = async (targetCity = cityInput) => {
    if (!targetCity || targetCity.trim() === "") {
      setError("City name is required");
      return;
    }

    try {
      setLoading(true);
      const geoRes = await fetch(`${GEO_API}?name=${targetCity}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found in database");
      }

      const { latitude, longitude, name } = geoData.results[0];
      await fetchWeather(latitude, longitude, name);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Robust Reverse Geocoding
  const fetchCityFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(`${REVERSE_GEO_API}?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`, {
        headers: { 'Accept-Language': 'en' }
      });
      const data = await res.json();
      
      // Multi-level detection for agricultural precision
      const addr = data.address || {};
      const name = 
        addr.village || addr.hamlet || addr.suburb || addr.town || 
        addr.quarter || addr.city_district || addr.city || addr.district || 
        data.display_name.split(',')[0] || t('weather.location_verified');
      
      return name;
    } catch (err) {
      return t('weather.current_selection');
    }
  };

  const MapInteractionHandler = () => {
    const map = useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setLoading(true);
        map.flyTo([lat, lng], map.getZoom(), { animate: true });
        
        try {
          const name = await fetchCityFromCoords(lat, lng);
          await fetchWeather(lat, lng, name);
        } catch (err) {
          setError(t('weather.fetch_failed'));
        } finally {
          setLoading(false);
        }
      },
    });
    return null;
  };

  // ✅ Fix for Grey Map / Container Resize Issues
  const MapResizer = () => {
    const map = useMapEvents({});
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 500); // Wait for the motion.div animation to finish
    }, [showWindyMap, map]);
    return null;
  };

  const RecenterMap = ({ lat, lon }) => {
    const map = useMapEvents({});
    useEffect(() => {
      if (lat && lon) {
         map.setView([lat, lon]);
         map.invalidateSize();
      }
    }, [lat, lon, map]);
    return null;
  };

  // ✅ New Live Location Logic (Dual Protection)
  const detectLiveLocation = async () => {
    setLoading(true);

    // Method 1: Precise Browser Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeather(latitude, longitude, lang === 'HI' ? 'मेरा स्थान' : lang === 'GUJ' ? 'મારું સ્થાન' : "My Location");
        },
        async (err) => {
          await fallbackToIPLocation();
        },
        { timeout: 5000 }
      );
    } else {
      await fallbackToIPLocation();
    }
  };

  const fallbackToIPLocation = async () => {
    try {
      const res = await fetch(IP_LOCATION_API);
      const data = await res.json();
      if (data.latitude && data.longitude) {
        await fetchWeather(data.latitude, data.longitude, data.city || (lang === 'HI' ? 'मेरा शहर' : lang === 'GUJ' ? 'મારું શહેર' : "My City"));
      } else {
        await handleSearch("Ahmedabad");
      }
    } catch (err) {
      await handleSearch("Ahmedabad");
    }
  };

  useEffect(() => {
    detectLiveLocation();
  }, []);

  const farmerAdvice = (() => {
    if (!weather) return [];
    const advice = [];
    const { temp, humidity } = weather.main;
    const rain = forecast[0]?.rain || 0;

    if (humidity > 80) advice.push({ type: 'warning', text: t('weather.advice_humidity'), icon: <AlertTriangle className="w-5 h-5 text-red-500" /> });
    if (rain > 60) advice.push({ type: 'caution', text: t('weather.advice_rain'), icon: <CloudRain className="w-5 h-5 text-blue-500" /> });
    if (temp > 38) advice.push({ type: 'danger', text: t('weather.advice_heat'), icon: <Thermometer className="w-5 h-5 text-red-600" /> });
    if (weather.wind.speed > 25) advice.push({ type: 'warning', text: t('weather.advice_wind'), icon: <Wind className="w-5 h-5 text-gray-400" /> });

    if (advice.length === 0) advice.push({ type: 'info', text: t('weather.advice_optimal'), icon: <Sprout className="w-5 h-5 text-green-500" /> });
    return advice;
  })();

  // ── Crop Recommendation Engine ──
  const CROP_DATABASE = [
    { name: 'Rice (धान)', emoji: '🌾', season: 'Kharif', months: [5,6,7,8,9], tempMin: 20, tempMax: 42, humidityMin: 60, rainMin: 40, tip: 'Needs standing water; transplant when monsoon stabilizes' },
    { name: 'Wheat (गेहूँ)', emoji: '🌾', season: 'Rabi', months: [10,11,12,1,2], tempMin: 10, tempMax: 28, humidityMin: 30, rainMin: 0, tip: 'Sow after first cold spell; avoid waterlogging' },
    { name: 'Maize (मक्का)', emoji: '🌽', season: 'Kharif', months: [5,6,7,8], tempMin: 21, tempMax: 38, humidityMin: 50, rainMin: 30, tip: 'Well-drained soil; spacing 60cm between rows' },
    { name: 'Cotton (कपास)', emoji: '🏵️', season: 'Kharif', months: [4,5,6,7,8,9], tempMin: 25, tempMax: 42, humidityMin: 40, rainMin: 20, tip: 'Avoid heavy rain during boll opening stage' },
    { name: 'Soybean (सोयाबीन)', emoji: '🫘', season: 'Kharif', months: [6,7,8,9], tempMin: 20, tempMax: 35, humidityMin: 50, rainMin: 30, tip: 'Inoculate seeds with Rhizobium for better yield' },
    { name: 'Groundnut (मूंगफली)', emoji: '🥜', season: 'Kharif', months: [5,6,7,8], tempMin: 22, tempMax: 38, humidityMin: 40, rainMin: 20, tip: 'Sandy loam soil is ideal; calcium-rich soil preferred' },
    { name: 'Mustard (सरसों)', emoji: '🌼', season: 'Rabi', months: [10,11,12,1,2], tempMin: 10, tempMax: 25, humidityMin: 30, rainMin: 0, tip: 'Cool dry weather ideal; irrigate at flowering stage' },
    { name: 'Gram (चना)', emoji: '🫛', season: 'Rabi', months: [10,11,12,1], tempMin: 10, tempMax: 28, humidityMin: 25, rainMin: 0, tip: 'Drought tolerant; minimal irrigation needed' },
    { name: 'Sugarcane (गन्ना)', emoji: '🎋', season: 'Year-round', months: [1,2,3,10,11], tempMin: 20, tempMax: 40, humidityMin: 50, rainMin: 20, tip: 'Planting in spring gives best ratoon; needs heavy watering' },
    { name: 'Tomato (टमाटर)', emoji: '🍅', season: 'Rabi/Zaid', months: [1,2,3,8,9,10,11,12], tempMin: 15, tempMax: 30, humidityMin: 40, rainMin: 10, tip: 'Stake plants early; protect from late blight in humid weather' },
    { name: 'Onion (प्याज)', emoji: '🧅', season: 'Rabi', months: [10,11,12,1], tempMin: 13, tempMax: 28, humidityMin: 30, rainMin: 0, tip: 'Transplant seedlings at 6 weeks; stop irrigation before harvest' },
    { name: 'Potato (आलू)', emoji: '🥔', season: 'Rabi', months: [10,11,12], tempMin: 12, tempMax: 25, humidityMin: 60, rainMin: 0, tip: 'Avoid frost; earth up tubers to prevent greening' },
    { name: 'Watermelon (तरबूज)', emoji: '🍉', season: 'Zaid', months: [2,3,4,5], tempMin: 25, tempMax: 42, humidityMin: 30, rainMin: 0, tip: 'Sandy soil with drip irrigation; avoid excess moisture near harvest' },
    { name: 'Cucumber (खीरा)', emoji: '🥒', season: 'Zaid', months: [2,3,4,5,6], tempMin: 20, tempMax: 38, humidityMin: 40, rainMin: 10, tip: 'Trellis for vine support; pick fruits young for tenderness' },
    { name: 'Mung Bean (मूंग)', emoji: '🌱', season: 'Zaid', months: [3,4,5,6], tempMin: 25, tempMax: 40, humidityMin: 40, rainMin: 10, tip: 'Short duration crop; ideal between Rabi and Kharif seasons' },
    { name: 'Turmeric (हल्दी)', emoji: '🟡', season: 'Kharif', months: [5,6,7], tempMin: 20, tempMax: 35, humidityMin: 60, rainMin: 40, tip: 'Shade tolerant; harvest after 8-9 months when leaves dry' },
    { name: 'Chilli (मिर्च)', emoji: '🌶️', season: 'Year-round', months: [1,2,3,6,7,8,9], tempMin: 18, tempMax: 35, humidityMin: 40, rainMin: 10, tip: 'Transplant after 40 days; regular picking increases yield' },
    { name: 'Bajra (बाजरा)', emoji: '🌿', season: 'Kharif', months: [6,7,8], tempMin: 25, tempMax: 42, humidityMin: 30, rainMin: 15, tip: 'Drought resistant; thrives in arid sandy soil regions' },
    { name: 'Pea (मटर)', emoji: '🫛', season: 'Rabi', months: [10,11,12,1,2,3], tempMin: 5, tempMax: 22, humidityMin: 40, rainMin: 10, tip: 'Keep soil moist; provide trellis for tall varieties' },
    { name: 'Cabbage (पत्ता गोभी)', emoji: '🥬', season: 'Rabi', months: [8,9,10,11,12], tempMin: 10, tempMax: 24, humidityMin: 50, rainMin: 10, tip: 'Requires consistent moisture; watch for cabbage worms' },
    { name: 'Cauliflower (फूल गोभी)', emoji: '🥦', season: 'Rabi', months: [8,9,10,11], tempMin: 12, tempMax: 25, humidityMin: 50, rainMin: 10, tip: 'Tie inner leaves over the head to keep it white (blanching)' },
    { name: 'Spinach (पालक)', emoji: '🥬', season: 'Rabi', months: [9,10,11,12,1,2,3,4], tempMin: 5, tempMax: 24, humidityMin: 40, rainMin: 10, tip: 'Harvest outer leaves regularly to encourage new growth' },
    { name: 'Carrot (गाजर)', emoji: '🥕', season: 'Rabi', months: [8,9,10,11,12], tempMin: 7, tempMax: 24, humidityMin: 50, rainMin: 10, tip: 'Needs deep, loose sandy soil for straight roots' },
    { name: 'Radish (मूली)', emoji: '🌱', season: 'Year-round', months: [1,2,3,4,8,9,10,11,12], tempMin: 10, tempMax: 25, humidityMin: 50, rainMin: 10, tip: 'Quick growing; harvest before roots become woody' },
    { name: 'Apple (सेब)', emoji: '🍎', season: 'Year-round', months: [1,2,3,10,11,12], tempMin: -5, tempMax: 25, humidityMin: 50, rainMin: 30, tip: 'Needs chilling hours in winter; regular pruning essential' },
  ];

  const getCropRecommendations = () => {
    if (!weather) return [];
    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const rain = weather.rain_prob || 0;
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

    return CROP_DATABASE.map(crop => {
      let score = 0;

      // 1. Month suitability (+40 for correct sowing month, severe penalty for off-season)
      if (crop.months.includes(currentMonth)) {
        score += 40;
      } else if (crop.months.includes(nextMonth)) {
        score += 20;
      } else {
        score -= 40; // Heavy penalty for out-of-season
      }

      // 2. Temperature match (Most critical vector)
      if (temp >= crop.tempMin && temp <= crop.tempMax) {
        const mid = (crop.tempMin + crop.tempMax) / 2;
        const dist = Math.abs(temp - mid) / ((crop.tempMax - crop.tempMin) / 2);
        score += Math.round(30 * (1 - dist * 0.4)); // Up to +30 for perfect temp
      } else {
        // Punish severely if temperature is outside survivable limits
        const overshoot = temp < crop.tempMin ? crop.tempMin - temp : temp - crop.tempMax;
        score -= overshoot * 10; // -10 points per degree! A 3 deg difference = -30.
      }

      // 3. Humidity match
      if (humidity >= crop.humidityMin) {
        score += 15;
      } else {
        score -= (crop.humidityMin - humidity) * 0.5;
      }

      // 4. Rain match
      if (rain >= crop.rainMin) {
        score += 15;
      } else {
        score -= (crop.rainMin - rain) * 0.5;
      }

      const finalScore = Math.max(0, Math.min(100, Math.round(score)));
      return { ...crop, score: finalScore };
    })
    .filter(c => c.score > 0) // Hide completely unviable crops
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  };

  const recommendedCrops = getCropRecommendations();

  const chartData = forecast.map((f) => ({ name: f.day, temp: f.temp, rain: f.rain }));

  return (
    <div className="bg-[#fcfdfa] min-h-screen pb-12 pt-4">
      <div className="container mx-auto px-4 lg:px-12">

        {/* Modern Navbar Space Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pt-16 lg:pt-24 animate-in fade-in slide-in-from-top duration-700">
          <div>
            <h1 className="text-4xl font-playfair font-black text-[#0D3D1A] tracking-tight">
              {t('weather.title')}
            </h1>
            <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-white rounded-full shadow-sm border border-primary-sage/30 w-fit">
              <MapPin className="w-4 h-4 text-[#1A6B2F] animate-pulse" />
              <span className="text-sm font-semibold text-gray-600">
                {location ? `${location.name} (${location.lat.toFixed(2)}, ${location.lon.toFixed(2)})` : t('weather.locating')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-80">
              <input
                type="text"
                placeholder={t('weather.search_placeholder')}
                className="w-full pl-5 pr-12 py-3.5 bg-white border border-gray-200 rounded-3xl outline-none focus:ring-2 focus:ring-[#1A6B2F]/20 focus:border-[#1A6B2F] transition-all font-nunito text-gray-700 shadow-sm"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={() => handleSearch()}
                className="absolute right-2 top-1.5 p-2.5 bg-[#1A6B2F] text-white rounded-2xl hover:bg-[#0D3D1A] transition-all shadow-md active:scale-95"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => detectLiveLocation()}
              className="p-3.5 bg-white border border-gray-100 rounded-2xl text-[#1A6B2F] shadow-sm hover:bg-[#F0F7EC] active:rotate-12 transition-all flex items-center justify-center min-w-[50px]"
              title={t('weather.detect_location')}
            >
              <Navigation className="w-5 h-5" />
            </button>
          </div>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-xl flex items-center gap-4 shadow-sm">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <p className="font-bold text-sm tracking-wide">{error}</p>
          </motion.div>
        )}

        {loading && !weather ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <RefreshCw className="w-16 h-16 text-[#1A6B2F] animate-spin mb-6" />
              <Cloud className="absolute inset-0 m-auto w-6 h-6 text-[#1A6B2F]/40" />
            </div>
            <p className="text-[#1A6B2F] font-bold text-2xl tracking-tighter animate-pulse uppercase">{t('weather.syncing')}</p>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Top Stat Cards - MOVED TO TOP OF PAGE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top duration-700">
              <WeatherCard 
                title={t('weather.current_temp')} value={`${weather?.main.temp || '--'}°C`} 
                icon={<Sun className="w-8 h-8 text-orange-400" />} 
                label={weather?.weather[0].description} hero={true}
                loading={loading}
              />
              <WeatherCard 
                title={t('weather.soil_humidity')} value={`${weather?.main.humidity || '--'}%`} 
                icon={<Droplets className="w-8 h-8 text-blue-400" />} label={t('weather.air_soil_sat')}
                loading={loading}
              />
              <WeatherCard 
                title={t('weather.wind_speed')} value={`${weather?.wind.speed || '--'} km/h`} 
                icon={<Wind className="w-8 h-8 text-emerald-400" />} label={t('weather.avg_wind')}
                loading={loading}
              />
              <WeatherCard 
                title={t('weather.rain_prob')} value={`${weather?.rain_prob || '0'}%`} 
                icon={<CloudRain className="w-8 h-8 text-indigo-400" />} label={t('weather.precip_risk')}
                loading={loading}
              />
            </div>

            {/* ✅ PREMIUM DUAL-MODE MAP SECTION */}
            <div className="animate-in fade-in slide-in-from-bottom duration-1000 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1A6B2F] rounded-2xl shadow-lg shadow-[#1A6B2F]/20">
                    <MapIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-[#0D3D1A]">
                    {mapMode === 'satellite' ? t('weather.radar_title') : t('weather.windy_title')}
                  </h3>
                </div>

                <div className="flex items-center bg-white p-1.5 rounded-[1.8rem] border border-gray-100 shadow-sm gap-1">
                  <button
                    onClick={() => setMapMode('satellite')}
                    className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${mapMode === 'satellite' ? 'bg-[#1A6B2F] text-white shadow-md' : 'text-gray-400 hover:text-[#1A6B2F]'}`}
                  >
                    {t('weather.satellite_mode')}
                  </button>
                  <button
                    onClick={() => setMapMode('windy')}
                    className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${mapMode === 'windy' ? 'bg-[#1A6B2F] text-white shadow-md' : 'text-gray-400 hover:text-[#1A6B2F]'}`}
                  >
                    {t('weather.windy_mode')}
                  </button>
                  <div className="w-[1px] h-6 bg-gray-100 mx-1"></div>
                  <button
                    onClick={() => setShowWindyMap(!showWindyMap)}
                    className="p-2.5 text-[#1A6B2F] hover:bg-[#F0F7EC] rounded-full transition-colors"
                    title={showWindyMap ? t('weather.hide_map') : t('weather.view_full_map')}
                  >
                    {showWindyMap ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 opacity-30" />}
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {showWindyMap && (
                  <motion.div
                    key={mapMode}
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.98, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full rounded-[3.5rem] overflow-hidden shadow-2xl border-[6px] border-white relative z-0 group"
                  >
                    {mapMode === 'satellite' ? (
                      <MapContainer 
                        center={[location?.lat || 23.02, location?.lon || 72.57]} 
                        zoom={8} 
                        className="h-[500px] w-full"
                      >
                        {/* Premium High-Res Satellite Tiles */}
                        <TileLayer
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                          attribution='&copy; Esri'
                        />
                        {/* High-Precision Reference Layer (Adds Place Names & Labels) */}
                        <TileLayer
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                          opacity={0.8}
                        />
                        
                        <MapResizer />
                        <MapInteractionHandler />
                        <RecenterMap lat={location?.lat} lon={location?.lon} />
                        
                        {location && (
                          <Marker position={[location.lat, location.lon]}>
                            <Popup className="rounded-3xl">
                               <div className="p-3 text-center min-w-[120px]">
                                  <h4 className="font-bold text-[#1A6B2F] mb-1">{location.name}</h4>
                                  <div className="text-2xl font-black text-[#0D3D1A]">{weather?.main.temp}°C</div>
                                  <p className="text-[10px] font-bold text-gray-400 mt-2">{t('weather.view_full_map')} → {t('weather.syncing')}</p>
                               </div>
                            </Popup>
                          </Marker>
                        )}
                      </MapContainer>
                    ) : (
                      <div className="h-[500px] w-full bg-gray-900 flex items-center justify-center">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://embed.windy.com/embed2.html?lat=${location?.lat || 23.02}&lon=${location?.lon || 72.57}&detailLat=${location?.lat || 23.02}&detailLon=${location?.lon || 72.57}&width=1400&height=500&zoom=8&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
                          frameBorder="0"
                          title="Windy Weather Map"
                          className="relative z-0"
                        ></iframe>
                        <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 pointer-events-none">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{t('weather.wind_animation_note')}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Dashboard Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="lg:col-span-1 space-y-6">
                {/* Farmer Advice */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/40 border border-gray-50 h-full">
                  <h3 className="text-2xl font-playfair font-bold text-[#0D3D1A] mb-6 flex items-center gap-3">
                    <Sprout className="w-6 h-6 text-[#1A6B2F]" />
                    {t('weather.ai_advice_title')}
                  </h3>
                  <div className="space-y-4">
                    {farmerAdvice.map((advice, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-3xl bg-[#fcfdfa] border border-primary-sage/20 hover:border-[#1A6B2F]/30 transition-colors group">
                        <div className="p-2.5 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">{advice.icon}</div>
                        <p className="text-sm font-semibold text-gray-700 leading-snug">{advice.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-5 bg-[#F0F7EC] rounded-[2rem] border border-[#1A6B2F]/10 relative overflow-hidden">
                    <Droplet className="absolute -right-4 -bottom-4 w-24 h-24 text-[#1A6B2F]/5" />
                    <h4 className="text-sm font-black text-[#1A6B2F] uppercase tracking-widest mb-2 flex items-center gap-2">
                      {t('weather.irrigation_log')}
                    </h4>
                    <p className="text-sm text-gray-700 font-bold leading-relaxed relative z-10 font-nunito">
                      {forecast[0]?.rain > 40 ? t('weather.irrigation_heavy_rain') : t('weather.irrigation_clear')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Trends Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/40 border border-gray-50">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-playfair font-bold text-[#0D3D1A] flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-[#1A6B2F]" />
                      {t('weather.climate_trends')}
                    </h3>
                  </div>
                  <div className="h-72 w-full" style={{ minHeight: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1A6B2F" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#1A6B2F" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#666' }} dy={10} />
                        <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '15px' }} />
                        <Area type="monotone" dataKey="temp" name={t('weather.temp_unit')} stroke="#1A6B2F" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={4} />
                        <Area type="monotone" dataKey="rain" name={t('weather.rain_unit')} stroke="#2563EB" fillOpacity={1} fill="url(#colorRain)" strokeWidth={4} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 5-Day Forecast Strips */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {forecast.slice(1, 6).map((day, idx) => (
                    <div key={idx} className="min-w-[150px] bg-white border border-gray-100 rounded-[2rem] p-6 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all group">
                      <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">{day.day}</span>
                      <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} className="w-16 h-16 drop-shadow-lg group-hover:scale-110 transition-transform" alt="weather icon" />
                      <div className="text-center">
                        <span className="font-jakarta font-extrabold text-[#0D3D1A] text-2xl">{day.temp}°C</span>
                        <div className="flex items-center justify-center gap-1.5 mt-1">
                          <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                          <span className="text-xs font-black text-blue-600">{day.rain}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Crop Suitability Advisor ── */}
            {weather && recommendedCrops.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/40 border border-gray-50"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#1A6B2F] rounded-2xl shadow-lg shadow-[#1A6B2F]/20">
                      <Wheat className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-playfair font-bold text-[#0D3D1A]">Crop Suitability Advisor</h3>
                      <p className="text-sm text-gray-500 font-nunito mt-0.5">Based on current weather &amp; seasonal calendar</p>
                    </div>
                  </div>

                  {/* Weather snapshot used for scoring */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold">
                      <Thermometer className="w-3.5 h-3.5" />{weather.main.temp}°C
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold">
                      <Droplets className="w-3.5 h-3.5" />{weather.main.humidity}% RH
                    </div>
                    <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold">
                      <CloudRain className="w-3.5 h-3.5" />{weather.rain_prob}% Rain
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date().toLocaleString('default', { month: 'long' })}
                    </div>
                  </div>
                </div>

                {/* Crop Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {recommendedCrops.map((crop, idx) => {
                    const scoreColor =
                      crop.score >= 70 ? 'bg-green-500' :
                      crop.score >= 45 ? 'bg-amber-400' : 'bg-rose-400';
                    const scoreBg =
                      crop.score >= 70 ? 'bg-green-50 border-green-100' :
                      crop.score >= 45 ? 'bg-amber-50 border-amber-100' : 'bg-rose-50 border-rose-100';
                    const scoreText =
                      crop.score >= 70 ? 'text-green-700' :
                      crop.score >= 45 ? 'text-amber-700' : 'text-rose-600';
                    const seasonColor =
                      crop.season === 'Kharif' ? 'bg-blue-100 text-blue-700' :
                      crop.season === 'Rabi'   ? 'bg-yellow-100 text-yellow-700' :
                      crop.season === 'Zaid'   ? 'bg-purple-100 text-purple-700' :
                                                 'bg-gray-100 text-gray-600';

                    return (
                      <motion.div
                        key={crop.name}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.07 }}
                        className={`group relative rounded-3xl border p-5 hover:shadow-md transition-all cursor-default ${scoreBg}`}
                      >
                        {/* Top row */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-3xl">{crop.emoji}</span>
                            <div>
                              <p className="font-bold text-[#0D3D1A] text-sm leading-snug">{crop.name}</p>
                              <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${seasonColor}`}>
                                {crop.season}
                              </span>
                            </div>
                          </div>
                          {/* Rank badge for top 3 */}
                          {idx < 3 && (
                            <span className="text-lg">{['🥇','🥈','🥉'][idx]}</span>
                          )}
                        </div>

                        {/* Suitability score bar */}
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Suitability</span>
                            <span className={`text-xs font-black ${scoreText}`}>{crop.score}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/70 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${crop.score}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.07 + 0.3 }}
                              className={`h-full rounded-full ${scoreColor}`}
                            />
                          </div>
                        </div>

                        {/* Ideal conditions */}
                        <div className="flex gap-2 mb-3 flex-wrap">
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 bg-white/70 px-2 py-1 rounded-full">
                            <Thermometer className="w-3 h-3" />{crop.tempMin}–{crop.tempMax}°C
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 bg-white/70 px-2 py-1 rounded-full">
                            <Droplets className="w-3 h-3" />&gt;{crop.humidityMin}% RH
                          </span>
                        </div>

                        {/* Growing tip */}
                        <div className="flex items-start gap-1.5 bg-white/60 rounded-2xl px-3 py-2">
                          <Leaf className="w-3 h-3 text-[#1A6B2F] mt-0.5 shrink-0" />
                          <p className="text-[11px] text-gray-600 font-medium leading-snug">{crop.tip}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer note */}
                <p className="mt-5 text-center text-xs text-gray-400 font-nunito">
                  Recommendations are based on current temperature, humidity, rain probability &amp; planting calendar. Consult a local agronomist for final decisions.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const WeatherCard = ({ title, value, icon, label, hero = false, loading = false }) => {
  // Extract number and unit for high-end typography (e.g., "23°C" -> ["23", "°C"])
  const valueMatch = value.match(/(\d+)(.*)/);
  const number = valueMatch ? valueMatch[1] : value;
  const unit = valueMatch ? valueMatch[2] : "";

  return (
    <div className={`bg-white rounded-[2.5rem] p-7 shadow-xl shadow-gray-200/40 border border-gray-50 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${hero ? 'bg-gradient-to-br from-white to-[#F0F7EC]' : ''}`}>
      
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#1A6B2F] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div className="p-4 rounded-[1.8rem] bg-[#fcfdfa] shadow-inner group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</span>
          <div className="h-0.5 w-6 bg-[#1A6B2F]/20 mt-1 rounded-full ml-auto"></div>
        </div>
      </div>

      <div className="group-hover:translate-x-1 transition-transform duration-500">
        <h4 className={`font-jakarta font-extrabold leading-none tracking-tighter transition-all flex items-baseline gap-0.5 ${hero ? 'text-6xl' : 'text-5xl'} ${loading ? 'opacity-20 translate-y-2' : 'opacity-100'}`}>
          <span className="bg-gradient-to-b from-[#0D3D1A] to-[#2D6A4F] bg-clip-text text-transparent">
            {number}
          </span>
          <span className={`text-[#1A6B2F]/40 font-bold ${hero ? 'text-2xl' : 'text-xl'}`}>
            {unit}
          </span>
        </h4>
        <p className="text-sm text-gray-500 font-bold mt-3 font-nunito opacity-80 group-hover:opacity-100 transition-opacity">
          {label}
        </p>
      </div>

      {/* Modern subtle accent line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#1A6B2F]/10 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );
};

export default Weather;
