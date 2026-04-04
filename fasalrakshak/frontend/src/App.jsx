import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

import Detect from './pages/Detect';
import DiseaseLibrary from './pages/DiseaseLibrary';
import DiseaseDetail from './pages/DiseaseDetail';
import AgriStore from './pages/Store';

import Weather from './pages/Weather';
import Ecosystem from './pages/Ecosystem';
import SoilReport from './pages/SoilReport';
import LandingPage from './pages/LandingPage';
import OrganicToggle from './components/organic/OrganicToggle';

import { AuthContext } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import AISahayikBot from './components/chatbot/AISahayikBot';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const { isLoading, isLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(scrollPx / winHeightPx * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Premium Loader while Auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0f9f1] flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 relative">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="w-full h-full border-4 border-green-100 border-t-[#2d5a27] rounded-full"
          />
          <Leaf className="absolute inset-0 m-auto text-[#2d5a27] w-8 h-8 animate-pulse" />
        </div>
        <div className="text-center font-playfair">
          <h2 className="text-3xl font-black text-gray-800">Fasal<span className="text-green-700">Rakshak</span></h2>
          <p className="text-green-600/60 font-nunito font-black uppercase tracking-[0.3em] text-[10px] mt-2">Restoring Your Session</p>
        </div>
      </div>
    );
  }

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full h-1 z-[1000] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }}
        ></div>
      </div>

      {!isAuthPage && <Navbar />}

      <div className={`flex-grow flex flex-col ${isAuthPage ? '' : 'pt-16 lg:pt-20'}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/detect" replace /> : <Login />}
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/detect" replace /> : <Signup />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detect"
              element={
                <ProtectedRoute>
                  <Detect />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <DiseaseLibrary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library/:id"
              element={
                <ProtectedRoute>
                  <DiseaseDetail />
                </ProtectedRoute>
              }
            />
            {/* Added fallback routes from Rishikesh merge */}
            <Route
              path="/diseases"
              element={
                <ProtectedRoute>
                  <DiseaseLibrary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/diseases/:id"
              element={
                <ProtectedRoute>
                  <DiseaseDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/weather"
              element={
                <ProtectedRoute>
                  <Weather />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ecosystem"
              element={
                <ProtectedRoute>
                  <Ecosystem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soil-report"
              element={
                <ProtectedRoute>
                  <SoilReport />
                </ProtectedRoute>
              }
            />
            {/* New Store Feature from Rishikesh */}
            <Route
              path="/store"
              element={
                <ProtectedRoute>
                  <AgriStore />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/organic" 
              element={
                <ProtectedRoute>
                  <LandingPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>

      {!isAuthPage && <Footer />}

      {/* Global Organic Farming Switch Toggle */}
      <OrganicToggle />

      {/* Global AI Chatbot Floating Trigger */}
      <div className="fixed bottom-6 right-6 z-[600]">
        {!isChatOpen && (
          <motion.button
            drag
            dragMomentum={false}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, cursor: "grabbing" }}
            onClick={() => setIsChatOpen(true)}
            className="bg-[#4D9D53] text-white px-3 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 whitespace-nowrap hover:bg-[#3d8343] transition-colors cursor-grab active:cursor-grabbing"
          >
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-green-100" />
            </div>
            <div className="flex flex-col items-start pr-1">
              <span className="text-[8px] font-black uppercase tracking-tighter opacity-80 leading-none">KisanDost AI</span>
              <span className="text-[12px] font-bold leading-tight">Sahayak</span>
            </div>
          </motion.button>
        )}
      </div>
      
      {/* The actual Chatbot Component */}
      <AISahayikBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;
