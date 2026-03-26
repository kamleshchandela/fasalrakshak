import React from 'react';
import { WifiOff, Languages, Zap, Heart as FileHeart, History, Cloud as CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: WifiOff,
    title: 'Offline Mode',
    desc: 'Internet nahi? Koi baat nahi. App offline bhi kaam karta hai'
  },
  {
    icon: Languages,
    title: 'Gujarati & Hindi Support',
    desc: 'Apni bhasha mein results pao'
  },
  {
    icon: Zap,
    title: '2-Second Detection',
    desc: 'MobileNet AI se ultra-fast disease classification'
  },
  {
    icon: FileHeart,
    title: 'Treatment Guide',
    desc: 'Organic aur chemical dono solutions'
  },
  {
    icon: History,
    title: 'History Log',
    desc: 'Apni saari previous scans save rahegi'
  },
  {
    icon: CloudRain,
    title: 'Weather Alert',
    desc: 'Mausam ke hisaab se disease risk alert'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Features = () => {
  return (
    <section className="py-24 bg-background-cream">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block text-primary-green font-laila font-bold tracking-widest uppercase text-sm mb-3">
            Kyun Chunein FasalRakshak?
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-charcoal">
            Kisaano Ke Liye Bani Features
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-3xl p-8 border border-primary-sage/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-green/10 hover:border-primary-green group"
              >
                <div className="w-14 h-14 bg-primary-lightGreen rounded-2xl flex items-center justify-center text-primary-green mb-6 group-hover:bg-primary-green group-hover:text-white transition-colors duration-300">
                  <div className="group-hover:-translate-y-1 transition-transform duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                <h3 className="font-playfair text-2xl font-bold text-text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
