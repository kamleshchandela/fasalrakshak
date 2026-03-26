import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const StorySection = () => {
  const { scrollYProgress } = useScroll();
  // Parallax effect: moves Image slightly slower than scroll
  const yPos = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section className="relative py-24 bg-background-cream overflow-hidden">
      {/* Top and Bottom Decorative Borders (Patola inspired) */}
      <div className="absolute top-0 left-0 w-full h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGwyMCAyMEgweiIgZmlsbD0iI0UxRURENSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48L3N2Zz4=')] opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGwyMCAyMEgweiIgZmlsbD0iI0UxRURENSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48L3N2Zz4=')] opacity-60"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Parallax Image */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <motion.img 
                style={{ y: yPos }}
                src="https://images.unsplash.com/photo-1595804300302-3cabece2fbaf?q=80&w=800&auto=format&fit=crop" 
                alt="Gujarati Farmer using smartphone in green field" 
                className="absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-yellow/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-green/20 rounded-full blur-2xl -z-10"></div>
          </div>

          {/* Right Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 relative flex items-center justify-center">
                {/* Rangoli inspired simple shape */}
                <div className="absolute w-full h-full border-4 border-primary-yellow/30 rounded-full rotate-45"></div>
                <div className="absolute w-full h-full border-4 border-primary-green/30 rounded-full"></div>
                <div className="w-4 h-4 bg-primary-yellow rounded-full"></div>
              </div>
              <span className="font-laila font-bold text-primary-green tracking-wider uppercase">Humari Pehel</span>
            </div>

            <h2 className="font-playfair text-4xl leading-tight md:text-5xl lg:text-6xl font-bold text-text-charcoal mb-8">
              Kheduto Mate, <br />
              <span className="text-primary-green border-b-4 border-primary-yellow inline-block mt-2 pb-1">Kheduto Dwara</span>
            </h2>

            <p className="font-nunito text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
              Gujarat ke kheduto ki zaroorat ko samjhte hue, humne banaya FasalRakshak — ek aisa tool jo fast, accurate aur bilkul free hai. Chahe aap kankrej ke khet mein ho ya kutch ki dharti par, hum aapki fasal ki raksha ke liye taiyaar hain.
            </p>

            <a href="#story" className="inline-flex items-center gap-2 group text-primary-green font-bold text-lg hover:text-primary-darkGreen transition-colors">
              <span className="border-b-2 border-transparent group-hover:border-primary-green pb-1 transition-all">Hamari Story Pado</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StorySection;
