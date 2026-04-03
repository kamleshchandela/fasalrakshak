import React, { createContext, useState, useEffect, useContext } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('EN'); // Default: EN

  // Persist language choice
  useEffect(() => {
    const savedLang = localStorage.getItem('fasalrakshak_lang');
    if (savedLang) setLang(savedLang);
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('fasalrakshak_lang', newLang);
  };

  const t = (key) => {
    const val = translations[lang]?.[key];
    if (val !== undefined) return val;
    // fallback to EN
    return translations['EN']?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ── useLanguage hook — used by Navbar and other components ──
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Central Database for App Content
export const translations = {
  EN: {
    // Navbar
    nav_smart_farming: 'Smart Farming',
    nav_carbon_credit: 'Carbon Credit',
    nav_products: 'Products',
    nav_weather: 'Weather',
    nav_wallet: 'Digital Wallet',
    nav_resources: 'Resources',
    nav_login: 'Login',

    // Hero - BRAND HEADING ALWAYS IN HINDI SCRIPT AS REQUESTED
    hero_hindi_1: 'किसान की हर ज़रूरत',
    hero_hindi_2: 'का Digital साथी!',
    'hero.title1': 'किसान की हर ज़रूरत',
    'hero.title2': 'का Digital साथी!',
    'hero.subtitle': 'Empowering Farmers',
    'hero.desc': 'From your fields to your future, fasalrakshak.app stands with the hands that feed the nation.',
    'hero.downloadBtn': 'Download Now',
    'hero.scanningActive': 'Scanning Active',
    'hero.districts': 'In 200+ Districts',
    hero_english: 'Empowering Farmers',
    hero_desc: 'From your fields to your future, fasalrakshak.app stands with the hands that feed the nation.',
    hero_download: 'Download Now',

    // Stats
    stat_farmers: 'Active Farmers',
    stat_crops: 'Crops Covered',
    stat_accuracy: 'Model Accuracy',
    stat_speed: 'Processing Speed',

    // How it works
    how_title: 'How it Works?',
    how_step_1: 'Capture Image',
    how_step_1_desc: 'Take a clear photo of your crop or soil using the mobile camera.',
    how_step_2: 'AI Identification',
    how_step_2_desc: 'Our advanced AI analyzes the health in under 2.5 seconds.',
    how_step_3: 'Expert Solution',
    how_step_3_desc: 'Get expert-vetted medicine names and local bio-fertilizer advice.',

    // Contact
    contact_title: 'Contact Us',
    contact_name: 'Your Name',
    contact_email: 'Your Email',
    contact_msg: 'Your Message',
    contact_send: 'Send Message',

    // Footer
    'footer.subscribeTitle1': 'Stay Ahead of ',
    'footer.subscribeTitle2': 'Every Season',
    'footer.subscribeDesc': 'Get crop advisories, weather alerts and market price updates directly in your inbox.',
    'footer.emailPlaceholder': 'Enter your email address',
    'footer.subscribeBtn': 'Subscribe',
    'footer.brandDesc': 'Empowering Indian farmers with AI-powered disease detection, real-time weather, and market insights. Growing together, sustainably.',
    'footer.company': 'Company',
    'footer.companyLinks': ['About Us', 'Careers', 'Press Kit', 'Blog', 'Partners'],
    'footer.solutions': 'Solutions',
    'footer.solutionLinks': ['Disease Detection', 'Weather AI', 'Market Prices', 'Crop Insurance', 'Expert Advice', 'Soil Analysis'],
    'footer.contact': 'Contact',
    'footer.emailUs': 'Email Us',
    'footer.helpline': 'Helpline',
    'footer.tollFree': 'Toll Free',
    'footer.headOffice': 'Head Office',
    'footer.address': 'Ahmedabad, Gujarat<br/>India - 380001',
    'footer.copyright': '© {year} FasalRakshak. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.systemOp': 'All Systems Operational',
  },
  HI: {
    nav_smart_farming: 'स्मार्ट खेती',
    nav_carbon_credit: 'कार्बन क्रेडिट',
    nav_products: 'उत्पाद',
    nav_weather: 'मौसम',
    nav_wallet: 'डिजिटल वॉलेट',
    nav_resources: 'संसाधन',
    nav_login: 'लॉगिन',
    hero_hindi_1: 'किसान की हर ज़रूरत',
    hero_hindi_2: 'का Digital साथी!',
    'hero.title1': 'किसान की हर ज़रूरत',
    'hero.title2': 'का Digital साथी!',
    'hero.subtitle': 'सशक्त किसान',
    'hero.desc': 'आपके खेतों से आपके भविष्य तक, fasalrakshak.app उन हाथों के साथ खड़ा है जो देश का पेट भरते हैं।',
    'hero.downloadBtn': 'अभी डाउनलोड करें',
    'hero.scanningActive': 'स्कैनिंग सक्रिय',
    'hero.districts': '200+ जिलों में',
    hero_english: 'सशक्त किसान',
    hero_desc: 'आपके खेतों से आपके भविष्य तक, fasalrakshak.app उन हाथों के साथ खड़ा है जो देश का पेट भरते हैं।',
    hero_download: 'अभी डाउनलोड करें',
    stat_farmers: 'सक्रिय किसान',
    stat_crops: 'कवर की गई फसलें',
    stat_accuracy: 'मॉडल सटीकता',
    stat_speed: 'प्रोसेसिंग गति',
    how_title: 'यह कैसे काम करता है?',
    how_step_1: 'फोटो लें',
    how_step_1_desc: 'मोबाइल कैमरे का उपयोग करके अपनी फसल या मिट्टी की स्पष्ट फोटो लें।',
    how_step_2: 'एआई पहचान',
    how_step_2_desc: 'हमारा उन्नत एआई 2.5 सेकंड से कम समय में स्वास्थ्य का विश्लेषण करता है।',
    how_step_3: 'विशेषज्ञ समाधान',
    how_step_3_desc: 'विशेषज्ञों द्वारा जांची गई दवाओं के नाम और स्थानीय सलाह प्राप्त करें।',
    contact_title: 'संपर्क करें',
    contact_name: 'आपका नाम',
    contact_email: 'आपका ईमेल',
    contact_msg: 'आपका संदेश',
    contact_send: 'संदेश भेजें',
    'footer.subscribeTitle1': 'हर मौसम से ',
    'footer.subscribeTitle2': 'एक कदम आगे',
    'footer.subscribeDesc': 'फसल सलाह, मौसम अलर्ट और बाजार भाव सीधे आपके इनबॉक्स में पाएं।',
    'footer.emailPlaceholder': 'अपना ईमेल दर्ज करें',
    'footer.subscribeBtn': 'सब्सक्राइब करें',
    'footer.brandDesc': 'AI-संचालित रोग पहचान, रियल-टाइम मौसम और बाजार अंतर्दृष्टि के साथ भारतीय किसानों को सशक्त बनाना।',
    'footer.company': 'कंपनी',
    'footer.companyLinks': ['हमारे बारे में', 'करियर', 'प्रेस किट', 'ब्लॉग', 'पार्टनर'],
    'footer.solutions': 'समाधान',
    'footer.solutionLinks': ['रोग पहचान', 'मौसम AI', 'बाजार भाव', 'फसल बीमा', 'विशेषज्ञ सलाह', 'मिट्टी विश्लेषण'],
    'footer.contact': 'संपर्क',
    'footer.emailUs': 'ईमेल करें',
    'footer.helpline': 'हेल्पलाइन',
    'footer.tollFree': 'टोल फ्री',
    'footer.headOffice': 'मुख्य कार्यालय',
    'footer.address': 'अहमदाबाद, गुजरात<br/>भारत - 380001',
    'footer.copyright': '© {year} FasalRakshak. सर्वाधिकार सुरक्षित।',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    'footer.systemOp': 'सभी सिस्टम सक्रिय',
  },
  GUJ: {
    nav_smart_farming: 'સ્માર્ટ ખેતી',
    nav_carbon_credit: 'કાર્બન ક્રેડિટ',
    nav_products: 'ઉત્પાદનો',
    nav_weather: 'હવામાન',
    nav_wallet: 'ડિજિટલ વૉલેટ',
    nav_resources: 'સંસાધનો',
    nav_login: 'લોગિન',
    hero_hindi_1: 'किसान की हर ज़रूरत',
    hero_hindi_2: 'का Digital साथी!',
    'hero.title1': 'किसान की हर ज़रूरत',
    'hero.title2': 'का Digital साथी!',
    'hero.subtitle': 'ખેડૂત સશક્તિકરણ',
    'hero.desc': 'તમારા ખેતરોથી તમારા ભવિષ્ય સુધી, fasalrakshak.app એ હાથો સાથે ઊભું છે જે દેશને ખવડાવે છે.',
    'hero.downloadBtn': 'હમણાં ડાઉનલોડ કરો',
    'hero.scanningActive': 'સ્કેનિંગ સક્રિય',
    'hero.districts': '200+ જિલ્લાઓમાં',
    hero_english: 'ખેડૂત સશક્તિકરણ',
    hero_desc: 'તમારા ખેતરોથી તમારા ભવિષ્ય સુધી, fasalrakshak.app એ હાથો સાથે ઊભું છે.',
    hero_download: 'હમણાં ડાઉનલોડ કરો',
    stat_farmers: 'સક્રિય ખેડૂતો',
    stat_crops: 'આવરી લેવામાં આવેલ પાક',
    stat_accuracy: 'મોડેલ ચોકસાઈ',
    stat_speed: 'પ્રોસેસિંગ ઝડપ',
    how_title: 'તે કેવી રીતે કામ કરે છે?',
    how_step_1: 'ફોટો લો',
    how_step_1_desc: 'મોબાઇલ કેમેરાનો ઉપયોગ કરીને તમારા પાક અથવા માટીનો સ્પષ્ટ ફોટો લો.',
    how_step_2: 'AI ઓળખ',
    how_step_2_desc: 'અમારું અદ્યતન AI 2.5 સેકન્ડથી ઓછા સમયમાં સ્વાસ્થ્યનું વિશ્લેષણ કરે છે.',
    how_step_3: 'નિષ્ણાત ઉકેલ',
    how_step_3_desc: 'નિષ્ણાત દ્વારા તપાસેલ દવાઓના નામ અને સ્થાનિક સલાહ મેળવો.',
    contact_title: 'અમારો સંપર્ક કરો',
    contact_name: 'તમારું નામ',
    contact_email: 'તમારું ઇમેઇલ',
    contact_msg: 'તમારો સંદેશ',
    contact_send: 'સંદેશ મોકલો',
    'footer.subscribeTitle1': 'દરેક સિઝનથી ',
    'footer.subscribeTitle2': 'એક કદમ આગળ',
    'footer.subscribeDesc': 'પાક સલાહ, હવામાન ચેતવણી અને બજાર ભાવ સીધા તમારા ઇનબૉક્સમાં મેળવો.',
    'footer.emailPlaceholder': 'તમારો ઇમેઇલ દાખલ કરો',
    'footer.subscribeBtn': 'સબ્સ્ક્રાઇબ કરો',
    'footer.brandDesc': 'AI-સંચાલિત રોગ ઓળખ, રીઅલ-ટાઇમ હવામાન અને બજાર આંતરદૃષ્ટિ સાથે ભારતીય ખેડૂતોને સશક્ત બનાવવું.',
    'footer.company': 'કંપની',
    'footer.companyLinks': ['અમારા વિશે', 'કારકિર્દી', 'પ્રેસ કિટ', 'બ્લૉગ', 'ભાગીદારો'],
    'footer.solutions': 'સમાધાન',
    'footer.solutionLinks': ['રોગ ઓળખ', 'હવામાન AI', 'બજાર ભાવ', 'પાક વીમો', 'નિષ્ણાત સલાહ', 'માટી વિશ્લેષણ'],
    'footer.contact': 'સંપર્ક',
    'footer.emailUs': 'ઇમેઇલ કરો',
    'footer.helpline': 'હેલ્પલાઇન',
    'footer.tollFree': 'ટોલ ફ્રી',
    'footer.headOffice': 'મુખ્ય કાર્યાલય',
    'footer.address': 'અમદાવાદ, ગુજરાત<br/>ભારત - 380001',
    'footer.copyright': '© {year} FasalRakshak. સર્વ હક્કો સુરક્ષિત.',
    'footer.privacy': 'ગોપનીયતા નીતિ',
    'footer.terms': 'સેવાની શરતો',
    'footer.systemOp': 'તમામ સિસ્ટમ સક્રિય',
  }
};
