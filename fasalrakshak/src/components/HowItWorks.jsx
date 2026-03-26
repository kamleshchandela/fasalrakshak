import React from 'react';
import { Camera, Search, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

import mumfali from '../images/mumfali.png';
import gehu    from '../images/gehu.png';
import kapas   from '../images/kapas.png';
import photo1   from '../images/photo1.png';
import photo2   from '../images/photo2.png';
import photo3   from '../images/photo3.png';

const steps = [
  {
    number: '1', emoji: '📷',
    title: 'Take a Photo',
    desc: 'Click a clear photo of the diseased leaf using your mobile camera, or choose from your gallery.',
    img: photo1, imgAlt: 'Groundnut (Mungfali) field in Gujarat'
  },
  {
    number: '2', emoji: '🤖',
    title: 'AI Analyzes Instantly',
    desc: 'Our AI model identifies the crop disease in just 2 seconds with 94% accuracy.',
    img: photo3, imgAlt: 'Wheat (Gehu) field in Gujarat'
  },
  {
    number: '3', emoji: '💊',
    title: 'Get Treatment Advice',
    desc: 'Disease name, severity, medicine & dosage — shown in English, Hindi or Gujarati.',
    img: photo2 , imgAlt: 'Cotton (Kapas) field in Gujarat'
  }
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <div className="text-center mb-14">
          <span className="inline-block bg-[#F0F7EC] text-[#1A6B2F] font-nunito font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-4">
            Simple & Easy
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-extrabold text-gray-900">
            How It Works — Just 3 Steps
          </h2>
          <p className="mt-3 font-nunito text-gray-500 font-semibold text-lg">Take a photo. We do the rest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={step.img} alt={step.imgAlt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4 w-10 h-10 bg-[#F5A623] rounded-full flex items-center justify-center font-playfair font-extrabold text-white text-lg shadow-md">
                  {step.number}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{step.emoji}</span>
                  <h3 className="font-playfair font-bold text-gray-900 text-xl">{step.title}</h3>
                </div>
                <p className="font-nunito text-gray-600 font-semibold leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gujarat Crop Info Cards */}
        <div className="mt-14 bg-[#F0F7EC] rounded-3xl p-8 border border-[#c8e0bc]">
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6 text-center">
            Gujarat's 3 Major Crops We Support
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: mumfali, name: '🥜 Groundnut (Mungfali)',
                desc: "Gujarat produces over 40% of India's groundnut. Common diseases: Tikka Leaf Spot, Collar Rot, Stem Rot. FasalRakshak detects all of them instantly."
              },
              {
                img: gehu, name: '🌾 Wheat (Gehu)',
                desc: "Wheat is a major winter crop in North Gujarat. Major threats include Rust diseases & Powdery Mildew. Our AI identifies them in seconds."
              },
              {
                img: kapas, name: '☁️ Cotton (Kapas)',
                desc: "Saurashtra & North Gujarat are major cotton regions. Detect Bollworm damage, Leaf Curl Virus & Bacterial Blight early and save your crop."
              }
            ].map((crop, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img src={crop.img} alt={crop.name} className="w-full h-36 object-cover" />
                <div className="p-5">
                  <h4 className="font-playfair font-bold text-gray-900 text-lg mb-2">{crop.name}</h4>
                  <p className="font-nunito text-gray-600 text-sm font-semibold leading-relaxed">{crop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
