import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  EN: {
    lang_en: 'English',
    lang_hi: 'हिन्दी (Hindi)',
    lang_guj: 'ગુજરાતી (Gujarati)',
    'nav.home': 'Home',
    'nav.detect': 'Detect',
    'nav.library': 'Library',
    'nav.weather': 'Weather',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Farmer Login',
    'nav.soil_report': 'Soil Report',
    'nav.store': 'AgriStore',

    'hero.title1': 'किसान की हर ज़रूरत',
    'hero.title2': 'का Digital साथी!',
    'hero.subtitle': 'Empowering Farmers',
    'hero.desc': 'Advanced AI to detect crop diseases in seconds. Reliable, simple, and works right in your palm.',
    'hero.downloadBtn': 'Download Now',
    'hero.scanningActive': 'SCANNING ACTIVE IN',
    'hero.districts': '200+ DISTRICTS',

    'stats.tag': 'Trust Metrics',
    'stats.title': 'Growing Together',
    'stats.items': [
      { number: '10K+', label: 'Active Farmers', value: '10,000+', sublabel: 'Across India' },
      { number: '50K+', label: 'Detections Done', value: '50,000+', sublabel: 'Successful scans' },
      { number: '98%',  label: 'AI Accuracy',     value: '98%',     sublabel: 'Clinically verified' },
      { number: '24/7', label: 'Farmer Support',  value: '24/7',    sublabel: 'Always with you' }
    ],

    'features.tag': 'Key Features',
    'features.title': 'Everything you need',
    'features.desc': 'FasalRakshak brings powerful agricultural AI technology directly to your hands.',
    'features.items': [
      { title: 'Offline Mode', desc: 'No internet? No problem. The app works offline in your fields!' },
      { title: 'Local Languages', desc: 'Get results in your language — Hindi, Gujarati, or English!' },
      { title: '2-Second AI', desc: 'Our AI model identifies diseases in just 2 seconds.' },
      { title: 'Treatment Guide', desc: 'Get clear medicine names, dosage, and application tips.' },
      { title: 'Scan History', desc: 'Review all your past scans and crop health records.' },
      { title: 'Weather Risk', desc: 'Stay updated with local weather risks to your crops.' }
    ],

    'how.tag': 'Simple Steps',
    'how.title': 'How to Use FasalRakshak',
    'how.steps': [
      { title: 'Open App', desc: 'Launch the FasalRakshak app on your smartphone.' },
      { title: 'Snap Photo', desc: 'Take a clear picture of the affected crop leaf.' },
      { title: 'Get Results', desc: 'Instantly view disease details and treatment guide.' }
    ],

    'cta.tag': 'Get Started Free',
    'cta.title': 'Protect Your Harvest Today',
    'cta.desc': 'Join 10,000+ farmers already using FasalRakshak. Free forever, works everywhere.',
    'cta.btn': 'Scan Your Crop Now',
    'cta.comingSoon': 'Coming Soon',

    'footer.subscribeTitle1': 'Join our ',
    'footer.subscribeTitle2': 'Community',
    'footer.subscribeDesc': 'Get weekly organic tips and weather alerts directly in your inbox.',
    'footer.emailPlaceholder': 'Enter your email address',
    'footer.subscribeBtn': 'Join Now',
    'footer.brandDesc': 'FasalRakshak is an AI-powered agriculture companion protecting crops and empowering farmers across India with organic disease detection.',
    'footer.company': 'Company',
    'footer.companyLinks': ['About Us', 'Contact', 'Blog', 'Ecosystem'],
    'footer.solutions': 'Solutions',
    'footer.solutionLinks': ['Disease Detection', 'Weather AI', 'Mandi Prices', 'Soil Health'],
    'footer.contact': 'Contact Us',
    'footer.emailUs': 'Email Support',
    'footer.helpline': 'Helpline Number',
    'footer.tollFree': 'TOLL FREE',
    'footer.headOffice': 'Head Office',
    'footer.address': 'AgriTech Hub, Sector 4, <br/>Gandhinagar, India',
    'footer.copyright': '© {year} FasalRakshak App.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.systemOp': 'SYSTEM ONLINE',

    'soil.manual': '✍️ Manual Entry',
    'soil.upload': '📄 Upload PDF',
    'soil.scan': '📸 Scan Image',

    'login.slogan': 'बेहतर खेती के लिए आपका Digital साथी।',
    'login.googleBtn': 'Google के साथ लॉगिन करें',
    'login.secure': 'SECURE LOGIN',
    'login.free': 'FREE ACCESS',
    'login.trusted': 'TRUSTED BY 10K+ FARMERS',
    'login.designed': 'Designed with ❤️ for the Indian Farmer',
    'login.back': 'Back to Home'
  },
  HI: {
    lang_en: 'English',
    lang_hi: 'हिन्दी (Hindi)',
    lang_guj: 'ગુજરાતી (Gujarati)',
    'nav.home': 'मुख्य',
    'nav.detect': 'पहचानें',
    'nav.library': 'लाइब्रेरी',
    'nav.weather': 'मौसम',
    'nav.blog': 'ब्लॉग',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'लॉगिन',
    'nav.soil_report': 'मृदा रिपोर्ट',
    'nav.store': 'कृषि स्टोर',

    'hero.title1': 'किसान की हर ज़रूरत',
    'hero.title2': 'का Digital साथी!',
    'hero.subtitle': 'Empowering Farmers',
    'hero.desc': 'सेकंडों में फसल की बीमारियों को पहचानने के लिए उन्नत एआई। भरोसेमंद और आपके हाथ में।',
    'hero.downloadBtn': 'Download Now',
    'hero.scanningActive': 'SCANNING ACTIVE IN',
    'hero.districts': '200+ जिलों में',

    'stats.tag': 'भरोसा',
    'stats.title': 'साथ मिलकर आगे बढ़ें',
    'stats.items': [
      { number: '10K+', label: 'सक्रिय किसान', value: '10K+', sublabel: 'पूरे भारत में' },
      { number: '50K+', label: 'सफल पहचान', value: '50K+', sublabel: 'सफल स्कैन' },
      { number: '98%',  label: 'एआई सटीकता', value: '98%',  sublabel: 'क्लिनिकली प्रमाणित' },
      { number: '24/7', label: 'किसान सहायता', value: '24/7', sublabel: 'हमेशा आपके साथ' }
    ],

    'features.tag': 'मुख्य विशेषताएं',
    'features.title': 'वह सब कुछ जो आपको चाहिए',
    'features.desc': 'फसलरक्षक सीधे आपके हाथों में शक्तिशाली कृषि एआई तकनीक लाता है।',
    'features.items': [
      { title: 'ऑफलाइन मोड', desc: 'इंटरनेट नहीं? कोई बात नहीं। ऐप खेत में भी काम करता है!' },
      { title: 'स्थानीय भाषाएं', desc: 'अपनी भाषा में परिणाम प्राप्त करें — हिन्दी, गुजराती या अंग्रेजी!' },
      { title: '2-सेकंड एआई', desc: 'हमारा एआई मॉडल सिर्फ 2 सेकंड में बीमारी पहचान लेता है।' },
      { title: 'उपचार गाइड', desc: 'दवाई का नाम, मात्रा और उपयोग के तरीके जानें।' },
      { title: 'स्कैन इतिहास', desc: 'अपने पुराने सभी स्कैन और फसल स्वास्थ्य रिकॉर्ड देखें।' },
      { title: 'मौसम जोखिम', desc: 'अपनी फसलों के लिए स्थानीय मौसम जोखिमों से अपडेट रहें।' }
    ],

    'how.tag': 'आसान चरण',
    'how.title': 'उपयोग कैसे करें',
    'how.steps': [
      { title: 'ऐप खोलें', desc: 'स्मार्टफोन पर फसलरक्षक ऐप लॉन्च करें।' },
      { title: 'फोटो लें', desc: 'प्रभावित फसल के पत्ते की साफ फोटो लें।' },
      { title: 'परिणाम पाएं', desc: 'बीमारी का विवरण और उपचार गाइड तुरंत देखें।' }
    ],

    'cta.tag': 'निशुल्क शुरू करें',
    'cta.title': 'आज ही अपनी फसल सुरक्षित करें',
    'cta.desc': 'फसलरक्षक का उपयोग करने वाले 10,000+ किसानों में शामिल हों। हमेशा के लिए मुक्त।',
    'cta.btn': 'अभी स्कैन करें',
    'cta.comingSoon': 'कमिंग सून',

    'footer.subscribeTitle1': 'हमारे ',
    'footer.subscribeTitle2': 'समुदाय से जुड़ें',
    'footer.subscribeDesc': 'साप्ताहिक जैविक सुझाव और मौसम अलर्ट सीधे अपने इनबॉक्स में प्राप्त करें।',
    'footer.emailPlaceholder': 'अपना ईमेल पता दर्ज करें',
    'footer.subscribeBtn': 'अभी जुड़ें',
    'footer.brandDesc': 'फसलरक्षक एक एआई-संचालित कृषि साथी है जो जैविक रोग पहचान के साथ पूरे भारत में फसलों की रक्षा और किसानों को सशक्त बनाता है।',
    'footer.company': 'कंपनी',
    'footer.companyLinks': ['हमारे बारे में', 'संपर्क करें', 'ब्लॉग', 'इकोसिस्टम'],
    'footer.solutions': 'समाधान',
    'footer.solutionLinks': ['बीमारी की पहचान', 'मौसम एआई', 'मंडी भाव', 'मिट्टी स्वास्थ्य'],
    'footer.contact': 'हमसे संपर्क करें',
    'footer.emailUs': 'ईमेल सहायता',
    'footer.helpline': 'हेल्पलाइन नंबर',
    'footer.tollFree': 'टोल फ्री',
    'footer.headOffice': 'मुख्य कार्यालय',
    'footer.address': 'एग्रीटेक हब, सेक्टर 4, <br/>गांधीनगर, भारत',
    'footer.copyright': '© {year} फसलरक्षक ऐप।',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'शर्तें एवं नियम',
    'footer.systemOp': 'सिस्टम ऑनलाइन है',

    'soil.manual': '✍️ मैनुअल एंट्री',
    'soil.upload': '📄 PDF अपलोड',
    'soil.scan': '📸 इमेज स्कैन',

    'login.slogan': 'बेहतर खेती के लिए आपका Digital साथी।',
    'login.googleBtn': 'Google के साथ लॉगिन करें',
    'login.secure': 'सुरक्षित लॉगिन',
    'login.free': 'मुफ्त एक्सेस',
    'login.trusted': '10,000+ किसानों का भरोसा',
    'login.designed': 'भारतीय किसानों के लिए ❤️ के साथ डिज़ाइन किया गया',
    'login.back': 'मुख्य पृष्ठ पर वापस'
  },
  GUJ: {
    lang_en: 'English',
    lang_hi: 'हिन्दी (Hindi)',
    lang_guj: 'ગુજરાતી (Gujarati)',
    'nav.home': 'મુખ્ય',
    'nav.detect': 'ઓળખો',
    'nav.library': 'લાઈબ્રેરી',
    'nav.weather': 'હવામાન',
    'nav.blog': 'બ્લોગ',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'લૉગિન',
    'nav.soil_report': 'જમીન રિપોર્ટ',
    'nav.store': 'કૃષિ સ્ટોર',

    'hero.title1': 'किसान की हर ज़रूरत',
    'hero.title2': 'का Digital साथी!',
    'hero.subtitle': 'Empowering Farmers',
    'hero.desc': 'સેકન્ડોમાં પાકના રોગોને ઓળખવા માટે અદ્યતન AI. વિશ્વાસપાત્ર અને તમારા હાથમાં.',
    'hero.downloadBtn': 'Download Now',
    'hero.scanningActive': 'SCANNING ACTIVE IN',
    'hero.districts': '200+ જિલ્લાઓમાં',

    'stats.tag': 'વિશ્વાસ',
    'stats.title': 'સાથે મળીને આગળ વધીએ',
    'stats.items': [
      { number: '10K+', label: 'સક્રિય ખેડૂતો', value: '10K+', sublabel: 'સમગ્ર ભારતમાં' },
      { number: '50K+', label: 'સફળ ઓળખ', value: '50K+', sublabel: 'સફળ સ્કેન' },
      { number: '98%',  label: 'AI ચોકસાઈ', value: '98%',  sublabel: 'ક્લિનિકલી પ્રમાણિત' },
      { number: '24/7', label: 'ખેડૂત સહાય', value: '24/7', sublabel: 'હંમેશા તમારી સાથે' }
    ],

    'features.tag': 'મુખ્ય લાક્ષણિકતાઓ',
    'features.title': 'તમને જોઈતી દરેક વસ્તુ',
    'features.desc': 'ફસલરક્ષક સીધી તમારા હાથમાં શક્તિશાળી કૃષિ AI ટેકનોલોજી લાવે છે.',
    'features.items': [
      { title: 'ઓફલાઇન મોડ', desc: 'ઇન્ટરનેટ નથી? કોઈ વાંધો નહીં. એપ ખેતરમાં પણ કામ કરે છે!' },
      { title: 'સ્થાનિક ભાષાઓ', desc: 'તમારી ભાષામાં પરિણામો મેળવો - ગુજરાતી, હિન્દી કે અંગ્રેજી!' },
      { title: '2-સેકન્ડ AI', desc: 'અમરું AI મોડેલ પાકનો રોગ ફક્ત 2 સેકન્ડમાં ઓળખી લે છે.' },
      { title: 'સારવાર માર્ગદર્શિકા', desc: 'દવાઓના નામ, માત્રા અને ઉપયોગની ટીપ્સ મેળવો.' },
      { title: 'સ્કેન હિસ્ટ્રી', desc: 'તમારા જૂના સ્કેન અને પાકના સ્વાસ્થ્યના રેકોર્ડ જુઓ.' },
      { title: 'હવામાન જોખમ', desc: 'પાક માટે સ્થાનિક હવામાન જોખમો સાથે અપડેટ રહો.' }
    ],

    'how.tag': 'સરળ પગલાં',
    'how.title': 'ઉપયોગ કેવી રીતે કરવો',
    'how.steps': [
      { title: 'એપ ખોલો', desc: 'તમારા સ્માર્ટફોન પર ફસલરક્ષક એપ લોન્ચ કરો.' },
      { title: 'ફોટો લો', desc: 'રોગગ્રસ્ત પાકના પાંદડાનો સાફ ફોટો લો.' },
      { title: 'પરિણામ મેળવો', desc: 'રોગની વિગત અને સારવાર માર્ગદર્શિકા તરત જ જુઓ.' }
    ],

    'cta.tag': 'નિઃશુલ્ક શરૂ કરો',
    'cta.title': 'આજે જ તમારા પાકને સુરક્ષિત કરો',
    'cta.desc': 'ફસલરક્ષકનો ઉપયોગ કરતા 10,000+ ખેડૂતોમાં જોડાઓ. હંમેશા મફત.',
    'cta.btn': 'અત્યારે સ્કેન કરો',
    'cta.comingSoon': 'કમિંગ સૂન',

    'footer.subscribeTitle1': 'અમારા ',
    'footer.subscribeTitle2': 'સમુદાયમાં જોડાઓ',
    'footer.subscribeDesc': 'તમારા ઇનબોક્સમાં સીધા સાપ્તાહિક જૈવિક ટિપ્સ અને હવામાન ચેતવણીઓ મેળવો.',
    'footer.emailPlaceholder': 'તમારું ઇમેઇલ સરનામું દાખલ કરો',
    'footer.subscribeBtn': 'અત્યારે જોડાઓ',
    'footer.brandDesc': 'ફસલરક્ષક એ AI-સંચાલિત કૃષિ સાથી છે જે જૈવિક રોગની ઓળખ સાથે સમગ્ર ભારતમાં પાકનું રક્ષણ કરે છે અને ખેડૂતોને સશક્ત બનાવે છે.',
    'footer.company': 'કંપની',
    'footer.companyLinks': ['અમારા વિશે', 'સંપર્ક કરો', 'બ્લોગ', 'ઇકોસિસ્ટમ'],
    'footer.solutions': 'ઉકેલો',
    'footer.solutionLinks': ['રોગની ઓળખ', 'હવામાન AI', 'મંડી ભાવ', 'જમીનનું સ્વાસ્થ્ય'],
    'footer.contact': 'અમારો સંપર્ક કરો',
    'footer.emailUs': 'ઇમેઇલ સહાય',
    'footer.helpline': 'હેલ્પલાઇન નંબર',
    'footer.tollFree': 'ટોલ ફ્રી',
    'footer.headOffice': 'મુખ્ય ઓફિસ',
    'footer.address': 'એગ્રીટેક હબ, સેક્ટર 4, <br/>ગાંધીનગર, ભારત',
    'footer.copyright': '© {year} ફસલરક્ષક એપ.',
    'footer.privacy': 'ગોપનીયતા નીતિ',
    'footer.terms': 'શરતો અને નિયમો',
    'footer.systemOp': 'સિસ્ટમ ઓનલાઇન છે',

    'soil.manual': '✍️ મેન્યુઅલ એન્ટ્રી',
    'soil.upload': '📄 PDF અપલોડ',
    'soil.scan': '📸 ઇમેજ સ્કેન',

    'login.slogan': 'बेहतर खेती के लिए आपका Digital साथी।',
    'login.googleBtn': 'Google के साथ लॉगिन करें',
    'login.secure': 'સુરક્ષિત લૉગિન',
    'login.free': 'મફત એક્સેસ',
    'login.trusted': '10,000+ ખેડૂતોનો વિશ્વાસ',
    'login.designed': 'ભારતીય ખેડૂતો માટે ❤️ સાથે ડિઝાઈન કરેલ',
    'login.back': 'મુખ્ય પૃષ્ઠ પર પાછા'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('fasalrakshak_lang') || 'HI');

  useEffect(() => {
    localStorage.setItem('fasalrakshak_lang', lang);
  }, [lang]);

  const t = (key) => {
    let result = translations[lang];
    
    // Check for flat keys first (as defined in our dictionary)
    if (result && result[key] !== undefined) {
      return result[key];
    }

    // Fallback for nested keys (just in case)
    const keys = key.split('.');
    let current = result;
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Return key name if not found to help debugging
        // But for arrays, we should return an empty array to prevent .map() crashes
        if (key.includes('Links') || key.includes('items') || key.includes('steps')) {
          return [];
        }
        return key; 
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
