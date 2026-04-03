import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1B4D2B] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-12 max-w-7xl">
        
        {/* TOP ROW: BRAND, LINKS, SUBSCRIBE, SOCIAL */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-20 mb-24">
          
          {/* Brand & Tagline */}
          <div className="space-y-4 max-w-xs">
            <h2 className="text-4xl font-nunito font-black tracking-tighter">fasalrakshak</h2>
            <p className="text-white/70 font-bold text-lg leading-tight uppercase tracking-widest text-xs">
              Residue-Free Farming for a Better Tomorrow
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-nunito font-black text-xl tracking-tight">Quick Links</h4>
            <ul className="space-y-3 font-bold text-lg text-white/50">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vision</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Farmers</a></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="space-y-6 w-full lg:max-w-md">
            <h4 className="font-nunito font-black text-xl tracking-tight">Subscribe</h4>
            <p className="text-white/50 font-bold text-sm">Get the latest updates on residue-free farming</p>
            <form className="flex w-full gap-3">
              <input 
                type="email" 
                placeholder="Your Email"
                className="flex-1 bg-white px-6 py-3 rounded-md text-[#1B4D2B] font-bold focus:outline-none placeholder:text-slate-400"
              />
              <button 
                type="submit"
                className="bg-[#D1F2EB] text-[#1B4D2B] px-8 py-3 rounded-md font-nunito font-black hover:bg-white transition-all text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Socials - Native SVGs for reliability */}
          <div className="flex gap-4">
             <a href="#" className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
             </a>
             <a href="#" className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
             </a>
             <a href="#" className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
             </a>
             <a href="#" className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
             </a>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT */}
        <div className="pt-12 border-t border-white/10 text-center">
          <p className="text-white/50 font-bold text-sm uppercase tracking-widest">
            © 2025 fasalrakshak. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
