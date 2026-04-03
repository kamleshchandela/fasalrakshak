import React from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const CTABanner = () => {
  return (
    <section className="relative py-32 bg-[#276738] overflow-hidden">
      {/* Subtle organic background overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-[20s]">
         <div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-white rounded-full blur-[100px]" />
         <div className="absolute -bottom-40 -right-20 w-[800px] h-[800px] bg-white rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-black tracking-[0.3em] text-white/60 uppercase bg-white/10 px-6 py-2 rounded-full mb-8 inline-block">
              Immediate Impact
            </span>
            <h2 className="text-5xl md:text-7xl font-nunito font-black text-white tracking-tighter leading-none mb-10">
              Ready to Save Your <br/> <span className="text-[#FF9F43]">Fasal?</span>
            </h2>
            <p className="text-white/70 font-bold text-xl md:text-2xl max-w-2xl mx-auto mb-14 leading-relaxed">
              Join 500,000+ farmers across India who use <span className="text-white underline decoration-white/30">fasalrakshak.app</span> to protect their livelihood from crop disease.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <MotionLink
                to="/detect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#276738] font-nunito font-black text-lg px-12 py-5 rounded-full shadow-2xl shadow-black/10 hover:shadow-white/20 transition-all group flex items-center gap-3"
              >
                <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Start My Scan Now
              </MotionLink>
              
              <div className="flex items-center gap-4">
                 <div className="w-[1px] h-10 bg-white/20 hidden sm:block mx-2" />
                 <div className="flex -space-x-3 mb-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#276738] bg-slate-100 flex items-center justify-center text-xs overflow-hidden shadow-lg">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                 </div>
                 <div className="text-left">
                    <p className="text-white font-black text-sm leading-none">500k+ Users</p>
                    <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest mt-1">Increasing Daily</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
