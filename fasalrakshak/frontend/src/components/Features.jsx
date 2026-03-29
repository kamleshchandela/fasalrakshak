import React from 'react';
import { WifiOff, Languages, Zap, Heart, History, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: WifiOff,
    emoji: '📶',
    title: 'Offline Mode',
    desc: 'Internet nahi? Koi baat nahi. App offline bhi kaam karta hai — khet mein bhi!',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Languages,
    emoji: '🗣️',
    title: 'Gujarati & Hindi',
    desc: 'Apni bhasha mein results pao — Gujarati, Hindi ya English, aap chunein!',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: Zap,
    emoji: '⚡',
    title: '2-Second Detection',
    desc: 'Hamara AI model sirf 2 second mein bimari pehchaan leta hai. Bahut fast!',
    color: 'text-primary-green',
    bg: 'bg-primary-lightGreen',
  },
  {
    icon: Heart,
    emoji: '💊',
    title: 'Treatment Guide',
    desc: 'Sahi dawai ka naam, matra, aur kab daalni hai sab kuch screen pe aa jayega.',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    icon: History,
    emoji: '📋',
    title: 'Scan History',
    desc: 'Aapki saari purani scans save rehti hain — kabhi bhi dekh sakte ho!',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: Cloud,
    emoji: '🌦️',
    title: 'Weather Alert',
    desc: 'Aaj ke mausam ke hisaab se bimari ka risk kya hai, app pehle hi bata deta hai.',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-[#F9F6EE]">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        <div className="text-center mb-14">
          <span className="inline-block bg-primary-lightGreen text-primary-green font-nunito font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-4">
            Kyun FasalRakshak?
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#1C1C1C', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Kisaano Ke Liye Bani Features
          </h2>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#555', marginTop: '0.75rem', fontSize: '1.05rem' }}>
            Sab kuch sochke banaya gaya hai — ek aam kisan ki zaroorat ke hisaab se
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-primary-sage hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className={`${f.bg} ${f.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform duration-200`}>
                  <span>{f.emoji}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#1C1C1C', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 500, color: '#555', lineHeight: 1.65, fontSize: '0.97rem' }}>
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
