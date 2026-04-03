import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

import Weather from './pages/Weather';
import Ecosystem from './pages/Ecosystem';

// Auth routes that use full-screen UI (no navbar/footer)
const AUTH_ROUTES = ['/login', '/signup', '/ecosystem'];

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isAuthRoute = AUTH_ROUTES.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(scrollPx / winHeightPx * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Full-screen auth pages — no navbar/footer
  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
      </Routes>
    );
  }

  return (
    <div className="relative font-nunito text-text-charcoal bg-white min-h-screen flex flex-col">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[100]">
        <div
          className="h-full bg-primary-green"
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }}
        ></div>
      </div>

      <Navbar />

      <div className="flex-grow flex flex-col pt-16 lg:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
          <Route path="/diseases" element={<DiseaseLibrary />} />
          <Route path="/diseases/:slug" element={<DiseaseDetail />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
