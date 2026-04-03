import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsStrip from '../components/StatsStrip';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import CTABanner from '../components/CTABanner';
import ContactSection from '../components/ContactSection';
import TreeScene from '../components/tree/TreeScene';

function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <StatsStrip />
      <Features />

      {/* ── 3D Cinematic Ecosystem Section ── */}
      <section style={{ background: '#060d08' }}>
        {/* Section intro label — visible above the dark scene */}
        <div style={{
          textAlign: 'center',
          padding: '56px 24px 0',
          background: 'linear-gradient(180deg, #ecfdf5 0%, #060d08 100%)',
        }}>
          <p style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 11,
            fontWeight: 700,
            color: '#16a34a',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            🌱 The FasalRakshak Ecosystem
          </p>
          <h2 style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(22px, 4vw, 40px)',
            color: '#052e16',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            margin: '0 auto 12px',
            maxWidth: 520,
          }}>
            Scroll to Watch Your Farm Come Alive
          </h2>
          <p style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            color: '#6b7280',
            fontSize: 14,
            maxWidth: 420,
            margin: '0 auto 0',
            lineHeight: 1.7,
          }}>
            A seed transforms into a thriving ecosystem — just like your farm with FasalRakshak.
          </p>
        </div>

        {/* The 3D scroll-driven scene */}
        <TreeScene />

        {/* Section outro — smooth transition back to white */}
        <div style={{
          background: 'linear-gradient(180deg, #060d08 0%, #f0fdf4 100%)',
          height: 80,
        }} />
      </section>

      <HowItWorks />
      <CTABanner />
      <ContactSection />
    </main>
  );
}

export default Home;
