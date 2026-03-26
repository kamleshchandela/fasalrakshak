import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Rameshbhai Patel",
    location: "Anand, Gujarat",
    quote: "Mere tamatar ki fasal barbaad ho rahi thi. FasalRakshak ne 2 second mein bata diya Late Blight hai. Ab meri fasal saved hai!",
    image: "https://images.unsplash.com/photo-1542384762-09405df62057?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Suresh Chauhan",
    location: "Rajkot, Gujarat",
    quote: "Gujarati mein results milte hain, bilkul simple samajh aata hai. Dawai ka naam aur matra bhi app batata hai. Shukriya FasalRakshak!",
    image: "https://images.unsplash.com/photo-1620002094285-06ec14eb798c?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Dineshbhai Desai",
    location: "Surat, Gujarat",
    quote: "Pehle kheti kendra jana padta tha bimari puchne. Ab mera phone hi mera krishi expert ban gaya hai. Bahut badhiya app hai.",
    image: "https://images.unsplash.com/photo-1605809278786-fb1c808f2e22?q=80&w=200&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-charcoal inline-flex items-center gap-4">
            <span className="w-12 h-px bg-primary-sage"></span>
            Kisaanon Ki Zubaan Se
            <span className="w-12 h-px bg-primary-sage"></span>
          </h2>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 scrollbar-hide snap-x">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 border-l-4 border-l-primary-green min-w-[300px] w-full shrink-0 snap-center hover:-translate-y-1 hover:shadow-lg transition-transform"
            >
              <div className="flex text-primary-yellow mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="font-nunito text-gray-700 italic leading-relaxed mb-8 text-lg">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-14 h-14 rounded-full p-1 border-2 border-primary-green">
                  <img 
                    src={t.image} 
                    alt={t.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-lg text-text-charcoal">{t.name}</h4>
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-0.5">
                      <div className="w-2 h-2.5 bg-[#FF9933] rounded-sm"></div>
                      <div className="w-2 h-2.5 bg-white border border-gray-200 rounded-sm text-[0px]"></div>
                      <div className="w-2 h-2.5 bg-[#138808] rounded-sm"></div>
                    </div>
                    <span className="font-nunito text-sm text-gray-500 font-semibold">{t.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
