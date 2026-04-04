import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsStrip from '../components/StatsStrip';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import StorySection from '../components/StorySection';
import WhatsAppCommunity from '../components/WhatsAppCommunity';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';

function Home() {
  return (
    <main>
      <HeroSection />
      <StatsStrip />
      <HowItWorks />
      <Features />
      <StorySection />
      <WhatsAppCommunity />
      <Testimonials />
      <CTABanner />
    </main>
  );
}

export default Home;

