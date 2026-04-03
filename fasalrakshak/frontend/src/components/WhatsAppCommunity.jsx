import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_JOIN_LINK = 'https://chat.whatsapp.com/HAoHvNFmiYK0fhVYOeHGO1';

const stats = [
  { value: '10,000+', label: 'Farmers Joined', icon: '👨‍🌾' },
  { value: '50+',     label: 'Districts Active', icon: '🗺️' },
  { value: '24/7',    label: 'Expert Support', icon: '🌾' },
  { value: 'Free',    label: 'Always & Forever', icon: '💚' },
];

const WhatsAppCommunity = () => {
  const { lang } = useLanguage();

  const content = {
    EN: {
      tag: '🌱 Kisan Community',
      title1: 'Connect With',
      title2: 'Fellow Farmers',
      desc: 'Join thousands of farmers in your district. Share crop tips, get pest alerts, and support each other — all on WhatsApp.',
      btnLabel: 'Join the Kisan WhatsApp Group',
      trust: 'Free to join • No spam • Moderated by agricultural experts',
      districts: 'Farmer groups active across Gujarat, Rajasthan & more'
    },
    HI: {
      tag: '🌱 किसान समुदाय',
      title1: 'जुड़ें साथी',
      title2: 'किसानों से',
      desc: 'अपने जिले के हजारों किसानों से जुड़ें। फसल की टिप्स शेयर करें, कीट अलर्ट पाएं और एक दूसरे की मदद करें — सब WhatsApp पर।',
      btnLabel: 'किसान WhatsApp ग्रुप जॉइन करें',
      trust: 'जॉइन करना बिल्कुल मुफ़्त • कोई स्पैम नहीं • कृषि विशेषज्ञों द्वारा संचालित',
      districts: 'गुजरात, राजस्थान और अन्य राज्यों में किसान समूह सक्रिय'
    },
    GUJ: {
      tag: '🌱 ખેડૂત સમુદાય',
      title1: 'જોડાઓ સાથી',
      title2: 'ખેડૂતોથી',
      desc: 'તમારા જિલ્લાના હજારો ખેડૂતો સાથે જોડાઓ. ખેતી ટિપ્સ શેર કરો, જંતુ ચેતવણી મેળવો — WhatsApp પર.',
      btnLabel: 'ખેડૂત WhatsApp ગ્રૂપ જોઈન કરો',
      trust: 'જોઈન કરવું સંપૂર્ણ મફત • સ્પામ નહીં • કૃષિ નિષ્ણાતો દ્વારા સંચાલિત',
      districts: 'ગુજરાત, રાજસ્થાન અને અન્ય રાજ્યોમાં ખેડૂત જૂથો સક્રિય'
    }
  };

  const c = content[lang] || content.EN;

  return (
    <section className="py-20 relative overflow-hidden bg-[#0a2e1a]">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#10b981]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#25D366]/10 blur-[100px] pointer-events-none" />
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-[#25D366]/20 text-[#25D366] font-nunito font-bold px-5 py-2 rounded-full text-sm uppercase tracking-widest mb-5 border border-[#25D366]/30"
          >
            {c.tag}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
          >
            {c.title1}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#25D366] to-[#10b981]">
              {c.title2}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 font-nunito text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {c.desc}
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="font-playfair font-black text-white text-2xl">{s.value}</div>
              <div className="font-nunito text-white/60 text-[13px] font-semibold mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* WhatsApp CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, type: 'spring', bounce: 0.3 }}
          className="bg-gradient-to-br from-[#128C7E]/30 to-[#075E54]/30 border border-[#25D366]/30 rounded-[28px] p-8 md:p-12 text-center backdrop-blur-md relative overflow-hidden"
        >
          {/* Glow ring behind button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full bg-[#25D366]/5 blur-3xl" />
          </div>

          {/* WhatsApp logo */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-20 h-20 mx-auto mb-6 rounded-[22px] bg-[#25D366] flex items-center justify-center shadow-[0_0_40px_rgba(37,211,102,0.4)]"
          >
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.div>

          {/* Pulsing join button */}
          <div className="relative inline-block mb-6">
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-2xl bg-[#25D366]/30 animate-ping opacity-30" />
            <span className="absolute inset-0 rounded-2xl bg-[#25D366]/20 animate-ping opacity-20 animation-delay-500" />
            <motion.a
              href={WHATSAPP_JOIN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(37, 211, 102, 0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-nunito font-black text-lg md:text-xl px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_8px_30px_rgba(37,211,102,0.35)] z-10"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {c.btnLabel}
            </motion.a>
          </div>

          {/* Trust line */}
          <p className="font-nunito text-white/50 text-[13px] font-semibold mb-3">
            ✅ {c.trust}
          </p>
          <p className="font-nunito text-white/40 text-[12px] font-medium">
            🗺️ {c.districts}
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default WhatsAppCommunity;
