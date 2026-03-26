import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

import kisan1  from '../images/kisan1.png';
import kisan2  from '../images/kisan2.png';
import kisan3  from '../images/kisan3.png';
import mumfali from '../images/mumfali.png';
import gehu    from '../images/gehu.png';
import kapas   from '../images/kapas.png';

const testimonials = [
  {
    name: "Rameshbhai Patel", location: "Anand, Gujarat",
    quote: "My groundnut crop was getting destroyed. FasalRakshak identified the disease in just 2 seconds. My crop is saved and I saved a lot of money!",
    image: kisan1, cropImg: mumfali, cropLabel: "🥜 Groundnut (Mungfali) Farmer"
  },
  {
    name: "Sureshbhai Chauhan", location: "Rajkot, Gujarat",
    quote: "Results in Gujarati — very easy to understand. Medicine name and dosage are all written in the app. Thank you FasalRakshak!",
    image: kisan2, cropImg: kapas, cropLabel: "☁️ Cotton (Kapas) Farmer"
  },
  {
    name: "Dineshbhai Desai", location: "Saurashtra, Gujarat",
    quote: "Earlier I had to visit the agriculture center. Now my phone is my crop expert. Very fast and useful app for wheat farmers!",
    image: kisan3, cropImg: gehu, cropLabel: "🌾 Wheat (Gehu) Farmer"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#F0F7EC] text-[#1A6B2F] font-nunito font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-4">
            Farmer Reviews
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-extrabold text-gray-900">Heard From Our Farmers</h2>
          <p className="mt-3 font-nunito text-gray-500 font-semibold text-lg">Real stories from real Gujarat farmers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={t.cropImg} alt={t.cropLabel} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <span className="absolute bottom-3 left-4 text-white text-xs font-nunito font-bold">{t.cropLabel}</span>
              </div>
              <div className="p-6">
                <div className="flex text-[#F5A623] mb-3">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="font-nunito text-gray-700 italic leading-relaxed mb-6 min-h-[80px]">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img src={t.image} alt={t.name} className="w-12 h-12 object-cover rounded-full border-2 border-[#1A6B2F]" />
                  <div>
                    <h4 className="font-playfair font-bold text-gray-900">{t.name}</h4>
                    <p className="font-nunito text-sm text-gray-500 font-semibold">{t.location} 🇮🇳</p>
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
