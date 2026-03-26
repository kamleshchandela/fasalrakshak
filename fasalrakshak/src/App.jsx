import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

import Detect from './pages/Detect';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = `${scrollPx / winHeightPx * 100}%`;
      setScrollProgress(scrollPx / winHeightPx * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative font-nunito text-text-charcoal bg-white min-h-screen flex flex-col">
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[100]">
        <div 
          className="h-full bg-primary-green" 
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }}
        ></div>
      </div>

      <Navbar />

      <div className="flex-grow flex flex-col">
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
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
