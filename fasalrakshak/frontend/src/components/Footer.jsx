import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Send, Leaf, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const solutionRoutes = [
  { key: 0, to: '/detect' },
  { key: 1, to: '/weather' },
  { key: 2, to: '/ecosystem' },
  { key: 3, to: '/soil-report' },
];

const Footer = () => {
  const { t } = useLanguage();
  const solutionLabels = t('footer.solutionLinks');



  return (
    <footer className="relative bg-[#020617] text-gray-300 pt-14 pb-6 overflow-hidden border-t border-white/5">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#166534] opacity-15 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Subtle Grass Detail */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-[#166534]">
          <path d="M0,120 C100,80 200,100 300,60 C400,20 500,40 600,80 C700,120 800,80 900,100 C1000,120 1100,50 1200,90 L1200,120 L0,120 Z" />
          <path d="M0,120 C150,100 250,50 350,90 C450,130 550,70 650,100 C750,130 850,90 950,110 C1050,130 1150,60 1200,100 L1200,120 L0,120 Z" />
          <path d="M50,120 Q70,70 60,40 Q75,80 70,120 Z" />
          <path d="M180,120 Q200,60 210,30 Q190,90 190,120 Z" />
          <path d="M380,120 Q370,80 350,50 Q390,90 395,120 Z" />
          <path d="M550,120 Q570,70 580,30 Q560,80 560,120 Z" />
          <path d="M750,120 Q730,60 710,20 Q740,90 760,120 Z" />
          <path d="M980,120 Q990,70 970,30 Q1000,80 995,120 Z" />
          <path d="M1150,120 Q1160,80 1180,40 Q1140,90 1165,120 Z" />
        </svg>
      </div>      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Newsletter — compact */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 backdrop-blur-md shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#166534]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="max-w-md relative shrink-0">
            <h3 className="font-playfair text-2xl font-bold text-white mb-1.5 tracking-tight">{t('footer.subscribeTitle1')}<span className="text-[#10b981]">{t('footer.subscribeTitle2')}</span></h3>
            <p className="font-nunito text-gray-400 text-sm leading-relaxed">{t('footer.subscribeDesc')}</p>
          </div>
          
          <div className="flex w-full lg:w-auto mt-4 lg:mt-0 shrink-0 relative">
            <span className="absolute inset-0 rounded-2xl bg-[#25D366]/30 animate-ping opacity-30" />
            <span className="absolute inset-0 rounded-2xl bg-[#25D366]/20 animate-ping opacity-20 animation-delay-500" />
            <a
              href="https://chat.whatsapp.com/HAoHvNFmiYK0fhVYOeHGO1"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-nunito font-black text-sm md:text-base px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] shadow-[0_8px_30px_rgba(37,211,102,0.35)] z-10 w-full lg:w-auto justify-center"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join WhatsApp Group
            </a>
          </div>
        </div>

        {/* Main Footer Content — tighter grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-8">
          
          {/* Column 1 - Brand */}
          <div className="lg:col-span-4 flex flex-col gap-4 pr-4">
            <Link to="/" className="flex items-center gap-2.5 cursor-pointer select-none group">
              <div className="bg-[#2d5a27] w-9 h-9 rounded-[10px] flex justify-center items-center group-hover:rotate-6 transition-transform shadow-md overflow-hidden">
                <Leaf className="text-white w-4.5 h-4.5" />
              </div>
              <span className="font-sans text-[22px] font-bold tracking-tight text-white flex gap-0">
                Fasal<span className="text-[#10b981]">Rakshak</span>
              </span>
            </Link>
            
            <p className="font-nunito text-gray-400 leading-relaxed text-sm">
              {t('footer.brandDesc')}
            </p>
          </div>

          {/* Column 2 - Company Links */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:ml-4">
            <h4 className="font-sans font-black tracking-widest uppercase text-[11px] text-white/90">{t('footer.company')}</h4>
            <ul className="flex flex-col gap-2.5 font-nunito text-sm">
              {t('footer.companyLinks').map(link => (
                <li key={link}><a href="#" className="flex items-center text-gray-400 gap-2 hover:text-white group transition-colors"><ArrowRight className="w-3 h-3 text-[#10b981] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Solutions (linked to pages) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-sans font-black tracking-widest uppercase text-[11px] text-white/90">{t('footer.solutions')}</h4>
            <ul className="flex flex-col gap-2.5 font-nunito text-sm">
              {solutionRoutes.map(({ key, to }) => (
                <li key={key}>
                  <Link to={to} className="flex items-center text-gray-400 gap-2 hover:text-white group transition-colors">
                    <ArrowRight className="w-3 h-3 text-[#f97316] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {solutionLabels[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-sans font-black tracking-widest uppercase text-[11px] text-white/90">{t('footer.contact')}</h4>
            <ul className="flex flex-col gap-3.5 font-nunito text-[13px]">
              <li className="flex items-start gap-3 group">
                <div className="bg-white/5 p-1.5 rounded-lg text-gray-400 group-hover:text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors"><Mail className="w-3.5 h-3.5" /></div>
                <div className="flex flex-col"><span className="text-white/80 font-bold text-[10px] uppercase tracking-wider mb-0.5">{t('footer.emailUs')}</span><a href="mailto:help@fasalrakshak.in" className="hover:text-white transition-colors text-sm">help@fasalrakshak.in</a></div>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="bg-white/5 p-1.5 rounded-lg text-gray-400 group-hover:text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors"><Phone className="w-3.5 h-3.5" /></div>
                <div className="flex flex-col"><span className="text-white/80 font-bold text-[10px] uppercase tracking-wider mb-0.5 flex items-center gap-1.5">{t('footer.helpline')} <span className="bg-[#f97316]/20 text-[#f97316] text-[7px] px-1 py-0.5 rounded font-black tracking-widest">{t('footer.tollFree')}</span></span><a href="tel:+919979265140" className="text-lg font-bold text-white tracking-tight group-hover:text-[#10b981] transition-colors">+91 99792 65140</a></div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="bg-white/5 p-1.5 rounded-lg text-gray-400 group-hover:text-[#10b981] group-hover:bg-[#10b981]/10 transition-colors"><MapPin className="w-3.5 h-3.5" /></div>
                <div className="flex flex-col"><span className="text-white/80 font-bold text-[10px] uppercase tracking-wider mb-0.5">{t('footer.headOffice')}</span><span className="leading-relaxed text-gray-400 text-[13px]" dangerouslySetInnerHTML={{__html: t('footer.address')}}></span></div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-nunito font-semibold">
          <div className="flex flex-wrap gap-3 text-center justify-center md:justify-start text-gray-500">
            <span>{t('footer.copyright').replace('{year}', new Date().getFullYear())}</span>
            <span className="hidden md:inline text-gray-700">|</span>
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <span className="hidden md:inline text-gray-700">|</span>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 shadow-inner">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10b981]"></span>
            </span>
            <span className="text-[9px] font-black text-gray-300 tracking-widest uppercase">{t('footer.systemOp')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
