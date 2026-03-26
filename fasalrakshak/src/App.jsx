import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsStrip from './components/StatsStrip';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import StorySection from './components/StorySection';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

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
    <div className="relative font-nunito text-text-charcoal bg-white min-h-screen">
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[100]">
        <div 
          className="h-full bg-primary-green" 
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }}
        ></div>
      </div>

      <Navbar />

      <main>
        <HeroSection />
        <StatsStrip />
        <HowItWorks />
        <Features />
        <StorySection />
        <Testimonials />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}

export default App;
