import React from 'react';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-darkGreen text-primary-sage border-t-4 border-primary-yellow pt-16 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary-lightGreen p-2 rounded-full">
                <Leaf className="w-8 h-8 text-primary-green" />
              </div>
              <div className="flex flex-col text-white">
                <span className="font-playfair font-bold text-2xl leading-none">
                  FasalRakshak
                </span>
                <span className="font-nunito text-xs text-primary-yellow font-semibold tracking-wide mt-1">
                  Smart Kheti, Healthy Crop
                </span>
              </div>
            </div>
            
            <p className="font-nunito text-sm">
              Made with <span className="text-primary-green text-lg bg-primary-lightGreen rounded-full px-1">💚</span> in Gujarat, India
            </p>

            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-yellow hover:text-primary-darkGreen transition-colors duration-300">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-yellow hover:text-primary-darkGreen transition-colors duration-300">
                 <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-yellow hover:text-primary-darkGreen transition-colors duration-300">
                 <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-playfair font-bold text-xl text-white mb-2">Quick Links</h4>
            <ul className="flex flex-col gap-3 font-nunito">
              <li><a href="#" className="hover:text-white hover:underline transition-all">Home</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Detect Disease</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Disease Library</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Blog</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">About Us</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Crops */}
          <div className="flex flex-col gap-4">
            <h4 className="font-playfair font-bold text-xl text-white mb-2">Disease Categories</h4>
            <ul className="flex flex-col gap-3 font-nunito">
              <li><a href="#" className="hover:text-white hover:underline transition-all">Tomato Diseases</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Cotton Diseases</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Wheat Diseases</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Groundnut Diseases</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-all">Onion Diseases</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-playfair font-bold text-xl text-white mb-2">Contact</h4>
            <ul className="flex flex-col gap-4 font-nunito">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5" />
                <span>help@fasalrakshak.in</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5" />
                <div className="flex flex-col">
                  <span>Kisaan Helpline:</span>
                  <span className="text-white font-bold text-lg">1800-XXX-XXXX</span>
                  <span className="text-[10px] opacity-80">(Toll Free)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>Ahmedabad, Gujarat</span>
              </li>
            </ul>
            <button className="mt-2 bg-[#25D366] text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-[#128C7E] transition-colors w-max">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
              WhatsApp Chat
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-primary-sage/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-nunito">
          <div className="flex flex-wrap gap-4 text-center justify-center md:justify-start opacity-80">
            <span>© 2025 FasalRakshak</span>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
          <div className="font-bold text-white flex items-center gap-2">
            Designed for the Kisaans of Bharat 🇮🇳
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
