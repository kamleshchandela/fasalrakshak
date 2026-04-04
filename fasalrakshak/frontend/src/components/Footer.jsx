import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, Send, Leaf } from 'lucide-react';
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
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f97316] opacity-8 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Newsletter — compact */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 backdrop-blur-md shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#166534]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="max-w-md relative shrink-0">
            <h3 className="font-playfair text-2xl font-bold text-white mb-1.5 tracking-tight">{t('footer.subscribeTitle1')}<span className="text-[#10b981]">{t('footer.subscribeTitle2')}</span></h3>
            <p className="font-nunito text-gray-400 text-sm leading-relaxed">{t('footer.subscribeDesc')}</p>
          </div>
          
          <div className="flex w-full lg:w-auto min-w-[280px] max-w-md bg-white/5 p-1 rounded-full border border-white/10 ring-1 ring-white/5 focus-within:ring-[#10b981]/50 focus-within:border-[#10b981]/50 focus-within:bg-white/10 transition-all relative">
            <input 
              type="email" 
              placeholder={t('footer.emailPlaceholder')} 
              className="bg-transparent text-white px-4 py-2.5 w-full outline-none font-nunito placeholder-gray-500 text-sm"
            />
            <button className="bg-[#10b981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-lg shrink-0 text-sm">
              {t('footer.subscribeBtn')} <Send className="w-3.5 h-3.5" />
            </button>
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
