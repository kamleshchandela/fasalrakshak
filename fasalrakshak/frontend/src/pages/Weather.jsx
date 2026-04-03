import React, { useState, useEffect } from 'react';
import {
  Cloud, Sun, CloudRain, Wind, Droplets, MapPin, Search, AlertTriangle,
  Sprout, Droplet, Thermometer, Calendar, Navigation, RefreshCw, TrendingUp,
  Map as MapIcon, Eye
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [cityInput, setCityInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [isSearching, setIsSearching] = useState(false);
  const [showWindyMap, setShowWindyMap] = useState(true);
  const [mapMode, setMapMode] = useState('satellite'); // 'satellite' or 'windy'

  // WMO Weather Codes Mapping
  const interpretWeatherCode = (code) => {
    if (code === 0) return { label: "Clear sky", main: "Sunny", iconId: "01d" };
    if (code >= 1 && code <= 3) return { label: "Partly cloudy", main: "Cloudy", iconId: "03d" };
    if (code >= 45 && code <= 48) return { label: "Foggy", main: "Fog", iconId: "50d" };
    if (code >= 51 && code <= 67) return { label: "Rainy", main: "Rain", iconId: "10d" };
    if (code >= 80 && code <= 82) return { label: "Showers", main: "Showers", iconId: "09d" };
    if (code >= 95) return { label: "Thunderstorm", main: "Storm", iconId: "11d" };
    return { label: "Clear sky", main: "Sunny", iconId: "01d" };
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

      const processedForecast = data.daily.time.map((time, i) => {
        const date = new Date(time);
        const dayMain = interpretWeatherCode(data.daily.weather_code[i]);
        return {
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
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
      setIsSearching(false);
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
        data.display_name.split(',')[0] || "Location Verified";
      
      return name;
    } catch (err) {
      return "Current Selection";
    }
  };

  const MapInteractionHandler = () => {
    const map = useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        console.log("Map Clicked:", lat, lng);
        setLoading(true);
        // Instant visual feedback: Move the map to the click
        map.flyTo([lat, lng], map.getZoom(), { animate: true });
        
        try {
          const name = await fetchCityFromCoords(lat, lng);
          await fetchWeather(lat, lng, name);
        } catch (err) {
          console.error("Map Update Error:", err);
          setError("Failed to fetch weather for this location.");
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
          console.log("Browser Geolocation Successful:", latitude, longitude);
          await fetchWeather(latitude, longitude, "My Location");
        },
        async (err) => {
          console.warn("Browser Location Failed, switching to IP-API...");
          await fallbackToIPLocation();
        },
        { timeout: 5000 }
      );
    } else {
      await fallbackToIPLocation();
    }
  };

  // Method 2: Reliable IP-based Geolocation (No Key Required)
  const fallbackToIPLocation = async () => {
    try {
      const res = await fetch(IP_LOCATION_API);
      const data = await res.json();
      console.log("IP-based Location Detected:", data.city);
      if (data.latitude && data.longitude) {
        await fetchWeather(data.latitude, data.longitude, data.city || "My City");
      } else {
        await handleSearch("Ahmedabad");
      }
    } catch (err) {
      console.error("Critical Location Error:", err);
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

    if (humidity > 80) advice.push({ type: 'warning', text: "Very high humidity. Risk of Leaf Rust disease.", icon: <AlertTriangle className="w-5 h-5 text-red-500" /> });
    if (rain > 60) advice.push({ type: 'caution', text: "High rain probability. Do not apply solid fertilizers.", icon: <CloudRain className="w-5 h-5 text-blue-500" /> });
    if (temp > 38) advice.push({ type: 'danger', text: "Critical heatwave warning. Double irrigation immediately.", icon: <Thermometer className="w-5 h-5 text-red-600" /> });
    if (weather.wind.speed > 25) advice.push({ type: 'warning', text: "Strong winds detected. Secure tall plants.", icon: <Wind className="w-5 h-5 text-gray-400" /> });

    if (advice.length === 0) advice.push({ type: 'info', text: "Optimal agricultural conditions today.", icon: <Sprout className="w-5 h-5 text-green-500" /> });
    return advice;
  })();

  const chartData = forecast.map((f) => ({ name: f.day, temp: f.temp, rain: f.rain }));

  return (
    <div className="bg-[#fcfdfa] min-h-screen pb-12 pt-4">
      <div className="container mx-auto px-4 lg:px-12">

        {/* Modern Navbar Space Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pt-16 lg:pt-24 animate-in fade-in slide-in-from-top duration-700">
          <div>
            <h1 className="text-4xl font-playfair font-black text-[#0D3D1A] tracking-tight">
              Agri-Weather Center
            </h1>
            <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-white rounded-full shadow-sm border border-primary-sage/30 w-fit">
              <MapPin className="w-4 h-4 text-[#1A6B2F] animate-pulse" />
              <span className="text-sm font-semibold text-gray-600">
                {location ? `${location.name} (${location.lat.toFixed(2)}, ${location.lon.toFixed(2)})` : 'Locating field...'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-80">
              <input
                type="text"
                placeholder="Search village or city..."
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
              title="Detect Live Location"
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
            <p className="text-[#1A6B2F] font-bold text-2xl tracking-tighter animate-pulse uppercase">Syncing with Weather Satellites...</p>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Top Stat Cards - MOVED TO TOP OF PAGE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top duration-700">
              <WeatherCard 
                title="Current Temp" value={`${weather?.main.temp || '--'}°C`} 
                icon={<Sun className="w-8 h-8 text-orange-400" />} 
                label={weather?.weather[0].description} hero={true}
                loading={loading}
              />
              <WeatherCard 
                title="Soil Humidity" value={`${weather?.main.humidity || '--'}%`} 
                icon={<Droplets className="w-8 h-8 text-blue-400" />} label="Air-Soil Saturation"
                loading={loading}
              />
              <WeatherCard 
                title="Wind Speed" value={`${weather?.wind.speed || '--'} km/h`} 
                icon={<Wind className="w-8 h-8 text-emerald-400" />} label="Avg Current Speed"
                loading={loading}
              />
              <WeatherCard 
                title="Rain Probability" value={`${weather?.rain_prob || '0'}%`} 
                icon={<CloudRain className="w-8 h-8 text-indigo-400" />} label="Precipitation Risk"
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
                    {mapMode === 'satellite' ? 'Interactive Agricultural Radar' : 'Windy Global Visualization'}
                  </h3>
                </div>

                <div className="flex items-center bg-white p-1.5 rounded-[1.8rem] border border-gray-100 shadow-sm gap-1">
                  <button
                    onClick={() => setMapMode('satellite')}
                    className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${mapMode === 'satellite' ? 'bg-[#1A6B2F] text-white shadow-md' : 'text-gray-400 hover:text-[#1A6B2F]'}`}
                  >
                    Satellite (Interactive)
                  </button>
                  <button
                    onClick={() => setMapMode('windy')}
                    className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${mapMode === 'windy' ? 'bg-[#1A6B2F] text-white shadow-md' : 'text-gray-400 hover:text-[#1A6B2F]'}`}
                  >
                    Windy (Visuals)
                  </button>
                  <div className="w-[1px] h-6 bg-gray-100 mx-1"></div>
                  <button
                    onClick={() => setShowWindyMap(!showWindyMap)}
                    className="p-2.5 text-[#1A6B2F] hover:bg-[#F0F7EC] rounded-full transition-colors"
                    title={showWindyMap ? "Hide Map" : "Show Map"}
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
                                  <p className="text-[10px] font-bold text-gray-400 mt-2">Anywhere Clicked → Updated</p>
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
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Wind Animation Mode (Non-interactive)</span>
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
                    AI Intelligence Advice
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
                      Irrigation Log
                    </h4>
                    <p className="text-sm text-gray-700 font-bold leading-relaxed relative z-10 font-nunito">
                      {forecast[0]?.rain > 40 ? "⚠️ Heavy rain detected. Pause irrigation for next 24 hours to prevent soil erosion." : "✅ Clear skies. Proceed with standard irrigation cycles between 6:00 AM - 9:00 AM."}
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
                      Climate Trends (7-Day)
                    </h3>
                  </div>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
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
                        <Area type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#1A6B2F" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={4} />
                        <Area type="monotone" dataKey="rain" name="Rain Prob (%)" stroke="#2563EB" fillOpacity={1} fill="url(#colorRain)" strokeWidth={4} />
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
                        <span className="text-2xl font-black text-[#0D3D1A]">{day.temp}°C</span>
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


          </div>
        )}
      </div>
    </div>
  );
};

const WeatherCard = ({ title, value, icon, label, hero = false, loading = false }) => (
  <div className={`bg-white rounded-[2.5rem] p-7 shadow-xl shadow-gray-200/40 border border-gray-50 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${hero ? 'bg-gradient-to-br from-white to-[#F0F7EC]' : ''}`}>
    
    {/* Shimmer loading overlay */}
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
    <div>
      <h4 className={`font-black text-[#0D3D1A] leading-none tracking-tighter transition-all ${hero ? 'text-5xl' : 'text-4xl'} ${loading ? 'opacity-20 translate-y-2' : 'opacity-100'}`}>
        {value}
      </h4>
      <p className="text-sm text-gray-500 font-bold mt-3 font-nunito opacity-80 group-hover:opacity-100 transition-opacity">
        {label}
      </p>
    </div>
  </div>
);

export default Weather;
