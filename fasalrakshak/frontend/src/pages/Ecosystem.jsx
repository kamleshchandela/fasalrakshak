import React from 'react';
import TreeScene from '../components/tree/TreeScene';

const Ecosystem = () => {
  return (
    <div style={{ background: '#060d08' }}>
      {/* ── 3D Cinematic Scroll Section ── */}
      <TreeScene />

      {/* ── Below-fold — CTA after full tree ── */}
      <div style={{
        background: 'linear-gradient(180deg, #060d08 0%, #0a1a0e 60%, #0f2d14 100%)',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        borderTop: '1px solid rgba(34,197,94,0.12)',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 560 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🌳</div>
          <h2 style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 42px)',
            color: '#ecfdf5',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            marginBottom: 16,
          }}>
            Your Digital Farm<br />
            <span style={{ color: '#22c55e' }}>Starts Here.</span>
          </h2>
          <p style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            color: 'rgba(167,243,208,0.65)',
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            Join 500,000+ farmers already using FasalRakshak to protect and grow their harvest with AI-powered insights.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/signup" style={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: 14,
              color: '#fff',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              padding: '14px 32px',
              borderRadius: 999,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
              border: '1px solid rgba(255,255,255,0.2)',
              letterSpacing: '0.02em',
            }}>
              🌱 Start For Free
            </a>
            <a href="/diseases" style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700,
              fontSize: 14,
              color: '#4ade80',
              background: 'transparent',
              padding: '14px 32px',
              borderRadius: 999,
              textDecoration: 'none',
              border: '1px solid rgba(34,197,94,0.3)',
              letterSpacing: '0.02em',
            }}>
              View Disease Library →
            </a>
          </div>
        </div>

        {/* Feature pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
          marginTop: 48,
          maxWidth: 560,
        }}>
          {['🔬 Disease AI', '🌤️ Weather Forecast', '💰 Market Rates', '🛡️ Crop Insurance', '👨‍🌾 Expert Chat', '🌱 Soil Health'].map(f => (
            <div key={f} style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(167,243,208,0.7)',
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.2)',
              padding: '6px 14px',
              borderRadius: 999,
            }}>
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ecosystem;
