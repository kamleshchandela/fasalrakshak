import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-[#020617] text-gray-300 pt-24 pb-8 overflow-hidden border-t border-white/5">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#166534] opacity-20 blur-[150px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f97316] opacity-10 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Newsletter Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 mb-20 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">
          {/* subtle moving gradient for newsletter card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#166534]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="max-w-xl relative shrink-0">
            <h3 className="font-playfair text-3xl font-bold text-white mb-3 tracking-tight">{t('footer.subscribeTitle1')}<span className="text-[#10b981]">{t('footer.subscribeTitle2')}</span></h3>
            <p className="font-nunito text-gray-400 text-sm md:text-base leading-relaxed">{t('footer.subscribeDesc')}</p>
          </div>
          <div className="flex w-full lg:w-auto min-w-[320px] max-w-lg bg-white/5 p-1.5 rounded-full border border-white/10 ring-1 ring-white/5 focus-within:ring-[#10b981]/50 focus-within:border-[#10b981]/50 focus-within:bg-white/10 transition-all relative">
            <input 
              type="email" 
              placeholder={t('footer.emailPlaceholder')} 
              className="bg-transparent text-white px-5 py-3 w-full outline-none font-nunito placeholder-gray-500 text-[15px]"
            />
            <button className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-lg shrink-0">
              {t('footer.subscribeBtn')} <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1 - Brand (Spans 4 cols on large) */}
          <div className="lg:col-span-4 flex flex-col gap-6 pr-4">
            <Link to="/" className="flex items-center gap-3 cursor-pointer select-none">
              <div className="bg-[#10b981] w-11 h-11 rounded-full flex justify-center items-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <span className="text-white font-serif font-black text-[28px] italic leading-none translate-y-[-2px] ml-1">f</span>
              </div>
              <span className="font-sans text-[28px] font-black tracking-tight text-white flex gap-0 mt-1">
                fasal<span className="text-[#10b981]">rakshak</span>
              </span>
            </Link>
            
            <p className="font-nunito text-gray-400 leading-relaxed text-[15px]">
              {t('footer.brandDesc')}
            </p>

            <div className="flex items-center gap-3.5 mt-2">
              {[
                { i: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, href: '#' },
                { i: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>, href: '#' },
                { i: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, href: '#' },
                { i: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>, href: '#' },
              ].map((social, idx) => (
                <a key={idx} href={social.href} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#10b981] hover:text-white hover:border-[#10b981] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                  {social.i}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Links (Spans 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:ml-6">
            <h4 className="font-sans font-black tracking-widest uppercase text-[13px] text-white/90">{t('footer.company')}</h4>
            <ul className="flex flex-col gap-4 font-nunito text-[15px]">
              {t('footer.companyLinks').map(link => (
                <li key={link}><a href="#" className="flex items-center text-gray-400 gap-2 hover:text-white group transition-colors"><ArrowRight className="w-3.5 h-3.5 text-[#10b981] opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Features (Spans 3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-sans font-black tracking-widest uppercase text-[13px] text-white/90">{t('footer.solutions')}</h4>
            <ul className="flex flex-col gap-4 font-nunito text-[15px]">
              {t('footer.solutionLinks').map(link => (
                <li key={link}><a href="#" className="flex items-center text-gray-400 gap-2 hover:text-white group transition-colors"><ArrowRight className="w-3.5 h-3.5 text-[#f97316] opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact (Spans 3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-sans font-black tracking-widest uppercase text-[13px] text-white/90">{t('footer.contact')}</h4>
            <ul className="flex flex-col gap-5 font-nunito text-[14px]">
              <li className="flex items-start gap-3.5 group">
                <div className="bg-white/5 p-2 rounded-lg text-gray-400 group-hover:text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors"><Mail className="w-4 h-4" /></div>
                <div className="flex flex-col pt-0.5"><span className="text-white/80 font-bold text-xs uppercase tracking-wider mb-0.5">{t('footer.emailUs')}</span><a href="mailto:help@fasalrakshak.in" className="hover:text-white transition-colors text-[15px]">help@fasalrakshak.in</a></div>
              </li>
              <li className="flex items-start gap-3.5 group cursor-pointer">
                <div className="bg-white/5 p-2 rounded-lg text-gray-400 group-hover:text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors"><Phone className="w-4 h-4" /></div>
                <div className="flex flex-col pt-0.5"><span className="text-white/80 font-bold text-xs uppercase tracking-wider mb-0.5 flex items-center gap-2">{t('footer.helpline')} <span className="bg-[#f97316]/20 text-[#f97316] text-[8px] px-1.5 py-0.5 rounded font-black tracking-widest">{t('footer.tollFree')}</span></span><span className="text-xl font-bold text-white mt-0.5 tracking-tight group-hover:text-[#10b981] transition-colors">1800-XXX-XXXX</span></div>
              </li>
              <li className="flex items-start gap-3.5 group">
                <div className="bg-white/5 p-2 rounded-lg text-gray-400 group-hover:text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors"><MapPin className="w-4 h-4" /></div>
                <div className="flex flex-col pt-0.5"><span className="text-white/80 font-bold text-xs uppercase tracking-wider mb-0.5">{t('footer.headOffice')}</span><span className="leading-relaxed mt-0.5 text-gray-400 text-[14px]" dangerouslySetInnerHTML={{__html: t('footer.address')}}></span></div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] font-nunito font-semibold">
          <div className="flex flex-wrap gap-4 text-center justify-center md:justify-start text-gray-500">
            <span>{t('footer.copyright').replace('{year}', new Date().getFullYear())}</span>
            <span className="hidden md:inline text-gray-700">|</span>
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <span className="hidden md:inline text-gray-700">|</span>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 rounded-full border border-white/5 shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <span className="text-[10px] font-black text-gray-300 tracking-widest uppercase mt-0.5">{t('footer.systemOp')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
