import React, { useContext } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';

const ContactSection = () => {
  const { t } = useContext(LanguageContext);

  return (
    <section id="contact" className="py-24 bg-[#E0F2E9]">
      <div className="container mx-auto px-4 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-nunito font-black text-[#1B4D2B] tracking-tighter">
            {t('contact_title')}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Info Cards */}
          <div className="flex-1 w-full space-y-6">
            {[
              { icon: Phone, title: t('footer.contact'), info: '+91 12345 67890' },
              { icon: Mail, title: t('footer.emailUs'), info: 'info@rupaya.com' },
              { icon: MapPin, title: t('footer.headOffice'), info: 'Surat, India' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-[#E0F2E9] p-4 rounded-2xl mb-4 group-hover:bg-[#1B4D2B] transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[#1B4D2B] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-nunito font-black text-slate-400 uppercase tracking-widest text-xs mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-bold text-lg">{item.info}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-[2] w-full bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-slate-200"
          >
            <form className="space-y-8">
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder={t('contact_name')}
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D2B] transition-all font-bold text-lg"
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder={t('contact_email')}
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D2B] transition-all font-bold text-lg"
                />
              </div>
              <div className="space-y-2">
                <textarea 
                  placeholder={t('contact_msg')}
                  rows="5"
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4D2B] transition-all font-bold text-lg resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#1B4D2B] text-white font-nunito font-black py-5 rounded-2xl shadow-xl shadow-[#1B4D2B]/20 hover:shadow-2xl hover:bg-[#163d22] transition-all text-xl"
              >
                {t('contact_send')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
