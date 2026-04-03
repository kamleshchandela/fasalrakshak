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
    
    'detect.tag': 'AI-Powered Intelligence',
    'detect.title1': 'Detect Crop Disease ',
    'detect.title2': 'Instantly',
    'detect.desc': 'Upload a clear photo of your affected plant. Our localized AI engine will instantly identify diseases and provide a personalized, actionable treatment plan.',
    'detect.stats': ['✅ High Precision Models', '🌿 Offline Capable Engine', '⚡ Lightning Fast Output'],

    'upload.drop': 'Drop crop photo here',
    'upload.or_select': 'or select using the buttons below',
    'upload.take_photo': 'Take a Photo',
    'upload.upload_gallery': 'Upload Gallery',
    'upload.supports': 'Supports JPG, PNG, WEBP · Max 10MB',
    'upload.tips_title': 'Tips for best results',
    'upload.tip1': 'Good lighting',
    'upload.tip2': 'Close-up of area',
    'upload.tip3': 'Keep camera steady',
    'upload.tip4': 'Include leaves clearly',
    'history.title': 'Your Recent Scans',
    'history.view_all': 'View All',
    'history.no_scans': 'No scans yet — scan your first crop above!',
    'history.healthy': 'Healthy Plant',
    'history.unknown_disease': 'Unknown Disease',
    'history.unknown_crop': 'Unknown Crop',

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

    'testimonials.tag': 'Farmer Stories',
    'testimonials.title': 'Loved by Farmers',
    'testimonials.desc': 'See how FasalRakshak is changing lives across India.',
    'testimonials.reviews': [
      {
        name: "Rameshbhai Patel", location: "Anand, Gujarat",
        quote: "My groundnut crop was getting destroyed. FasalRakshak identified the disease in just 2 seconds. My crop is saved and I saved a lot of money!",
        cropLabel: "🥜 Groundnut (Mungfali) Farmer"
      },
      {
        name: "Sureshbhai Chauhan", location: "Rajkot, Gujarat",
        quote: "Results in Gujarati — very easy to understand. Medicine name and dosage are all written in the app. Thank you FasalRakshak!",
        cropLabel: "🌿 Cotton (Kapas) Farmer"
      },
      {
        name: "Dineshbhai Desai", location: "Saurashtra, Gujarat",
        quote: "Earlier I had to visit the agriculture center. Now my phone is my crop expert. Very fast and useful app for wheat farmers!",
        cropLabel: "🌾 Wheat (Gehu) Farmer"
      }
    ],

    'how.tag': 'Simple Steps',
    'how.title': 'How to Use FasalRakshak',
    'how.steps': [
      { title: 'Open App', desc: 'Launch the FasalRakshak app on your smartphone.' },
      { title: 'Snap Photo', desc: 'Take a clear picture of the affected crop leaf.' },
      { title: 'Get Results', desc: 'Instantly view disease details and treatment guide.' }
    ],
    'how.supportTag': 'SUPPORTED CROPS',
    'how.supportTitle': 'Crops we currently support',
    'how.crops': [
      { name: '🥜 Groundnut', desc: 'Full lifecycle disease support' },
      { name: '🌾 Wheat', desc: 'Accurate pest & nutrient detection' },
      { name: '☁️ Cotton', desc: 'Early pest attack & disease alerts' }
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
    
    'detect.tag': 'एआई-संचालित बुद्धिमत्ता',
    'detect.title1': 'फसल की बीमारी का ',
    'detect.title2': 'तुरंत पता लगाएं',
    'detect.desc': 'अपने प्रभावित पौधे की एक साफ फोटो अपलोड करें। हमारा एआई इंजन तुरंत बीमारी की पहचान करेगा और एक सटीक उपचार योजना प्रदान करेगा।',
    'detect.stats': ['✅ उच्च सटीकता मॉडल', '🌿 ऑफलाइन सक्षम इंजन', '⚡ तेज़ परिणाम'],

    'upload.drop': 'फसल की फोटो यहाँ डालें',
    'upload.or_select': 'या नीचे दिए गए बटन का उपयोग करें',
    'upload.take_photo': 'तस्वीर खींचें',
    'upload.upload_gallery': 'गैलरी से अपलोड करें',
    'upload.supports': 'सपोर्ट: JPG, PNG, WEBP · अधिकतम 10MB',
    'upload.tips_title': 'बेहतर परिणाम के लिए टिप्स',
    'upload.tip1': 'अच्छी रोशनी',
    'upload.tip2': 'नज़दीक से फोटो लें',
    'upload.tip3': 'कैमरा स्थिर रखें',
    'upload.tip4': 'पत्ते साफ दिखने चाहिए',
    'history.title': 'आपके हालिया स्कैन',
    'history.view_all': 'सभी देखें',
    'history.no_scans': 'अभी तक कोई स्कैन नहीं — ऊपर अपनी पहली फसल स्कैन करें!',
    'history.healthy': 'स्वस्थ पौधा',
    'history.unknown_disease': 'अज्ञात बीमारी',
    'history.unknown_crop': 'अज्ञात फसल',

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

    'testimonials.tag': 'किसान की कहानियाँ',
    'testimonials.title': 'किसानों की पसंद',
    'testimonials.desc': 'देखें कैसे फसलरक्षक पूरे भारत में किसानों की ज़िंदगी बदल रहा है।',
    'testimonials.reviews': [
      {
        name: "रमेशभाई पटेल", location: "आणंद, गुजरात",
        quote: "मेरी मूंगफली की फसल खराब हो रही थी। फसलरक्षक ने सिर्फ 2 सेकंड में बीमारी पहचान ली। मेरी फसल भी बच गई और काफी पैसे भी बचे!",
        cropLabel: "🥜 मूंगफली किसान"
      },
      {
        name: "सुरेशभाई चौहान", location: "राजकोट, गुजरात",
        quote: "गुजराती में परिणाम — समझने में बहुत आसान। दवाई का नाम और मात्रा सब ऐप में लिखी होती है। फसलरक्षक का धन्यवाद!",
        cropLabel: "🌿 कपास किसान"
      },
      {
        name: "दिनेशभाई देसाई", location: "सौराष्ट्र, गुजरात",
        quote: "पहले मुझे कृषि केंद्र जाना पड़ता था। अब मेरा फोन ही मेरा फसल विशेषज्ञ है। गेहूं के किसानों के लिए बहुत तेज़ और उपयोगी ऐप!",
        cropLabel: "🌾 गेहूं किसान"
      }
    ],

    'how.tag': 'आसान चरण',
    'how.title': 'उपयोग कैसे करें',
    'how.steps': [
      { title: 'ऐप खोलें', desc: 'स्मार्टफोन पर फसलरक्षक ऐप लॉन्च करें।' },
      { title: 'फोटो लें', desc: 'प्रभावित फसल के पत्ते की साफ फोटो लें।' },
      { title: 'परिणाम पाएं', desc: 'बीमारी का विवरण और उपचार गाइड तुरंत देखें।' }
    ],
    'how.supportTag': 'समर्थित फसलें',
    'how.supportTitle': 'फसलें जिनका हम समर्थन करते हैं',
    'how.crops': [
      { name: '🥜 मूंगफली', desc: 'संपूर्ण जीवनचक्र बीमारी समर्थन' },
      { name: '🌾 गेहूं', desc: 'सटीक कीट और पोषक तत्वों की पहचान' },
      { name: '☁️ कपास', desc: 'कीट हमले और बीमारी की प्रारंभिक चेतावनी' }
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
    'nav.detect': 'ખોડ શોધો',
    'nav.library': 'લાઈબ્રેરી',
    'nav.weather': 'હવામાન',
    'nav.blog': 'બ્લોગ',
    'nav.about': 'અમારા વિશે',
    'nav.contact': 'સંપર્ક',
    'nav.login': 'લૉગિન',
    'nav.soil_report': 'જમીન રિપોર્ટ',
    'nav.store': 'કૃષિ દુકાન',
    
    'detect.tag': 'AI-સંચાલિત બુદ્ધિમત્તા',
    'detect.title1': 'પાકના રોગની ',
    'detect.title2': 'તરત જ તપાસ કરો',
    'detect.desc': 'તમારા રોગગ્રસ્ત છોડનો સ્પષ્ટ ફોટો અપલોડ કરો. અમારું AI એન્જિન તરત જ રોગની ઓળખ કરશે અને ચોક્કસ સારવાર યોજના આપશે.',
    'detect.stats': ['✅ ઉચ્ચ ચોકસાઈ મોડેલ્સ', '🌿 ઑફલાઇન સક્ષમ એન્જિન', '⚡ અતિ ઝડપી પરિણામ'],

    'upload.drop': 'પાકનો ફોટો અહીં છોડો',
    'upload.or_select': 'અથવા નીચેના બટનોનો ઉપયોગ કરો',
    'upload.take_photo': 'ફોટો પાડો',
    'upload.upload_gallery': 'ગેલેરીમાંથી અપલોડ કરો',
    'upload.supports': 'સપોર્ટ: JPG, PNG, WEBP · મહત્તમ 10MB',
    'upload.tips_title': 'સારા પરિણામો માટે ટિપ્સ',
    'upload.tip1': 'સારો પ્રકાશ',
    'upload.tip2': 'નજીકથી ફોટો લો',
    'upload.tip3': 'કેમેરો સ્થિર રાખો',
    'upload.tip4': 'પાંદડા ચોખ્ખા દેખાવા જોઈએ',
    'history.title': 'તમારા તાજેતરના સ્કેન',
    'history.view_all': 'બધા જુઓ',
    'history.no_scans': 'હજુ સુધી કોઈ સ્કેન નથી — ઉપર તમારો પહેલો પાક સ્કેન કરો!',
    'history.healthy': 'તંદુરસ્ત છોડ',
    'history.unknown_disease': 'અજ્ઞાત રોગ',
    'history.unknown_crop': 'અજ્ઞાત પાક',

    'hero.title1': 'ખેડૂતની દરેક જરૂરિયાતનો',
    'hero.title2': 'Digital સાથી!',
    'hero.subtitle': 'ખેડૂતોનું સશક્તિકરણ',
    'hero.desc': 'થોડી જ સેકન્ડોમાં પાકના રોગોને ઓળખવા માટે અત્યાધુનિક AI. વિશ્વાસપાત્ર, સરળ અને તમારા હાથમાં કામ કરે છે.',
    'hero.downloadBtn': 'હમણાં ડાઉનલોડ કરો',
    'hero.scanningActive': 'સ્કેનિંગ સક્રિય છે',
    'hero.districts': '200+ જિલ્લાઓમાં',

    'stats.tag': 'વિશ્વાસ',
    'stats.title': 'સાથે મળીને આગળ વધીએ',
    'stats.items': [
      { number: '10K+', label: 'સક્રિય ખેડૂતો', value: '10K+', sublabel: 'સમગ્ર ભારતમાં' },
      { number: '50K+', label: 'સફળ ઓળખ', value: '50K+', sublabel: 'સફળ સ્કેન' },
      { number: '98%',  label: 'AI ચોકસાઈ', value: '98%',  sublabel: 'ક્લિનિકલી પ્રમાણિત' },
      { number: '24/7', label: 'ખેડૂત સહાય', value: '24/7', sublabel: 'હંમેશા તમારી સાથે' }
    ],

    'features.tag': 'મુખ્ય વિશેષતાઓ',
    'features.title': 'તમારે જે બધું જોઈએ છે તે',
    'features.desc': 'ફસલરક્ષક સીધી તમારા હાથમાં શક્તિશાળી કૃષિ AI ટેકનોલોજી લાવે છે.',
    'features.items': [
      { title: 'ઓફલાઇન મોડ', desc: 'ઇન્ટરનેટ નથી? કોઈ વાંધો નહીં. એપ તમારા ખેતરમાં પણ કામ કરે છે!' },
      { title: 'સ્થાનિક ભાષાઓ', desc: 'તમારી ભાષામાં પરિણામો મેળવો - ગુજરાતી, હિન્દી કે અંગ્રેજી!' },
      { title: '2-સેકન્ડ AI', desc: 'અમારું AI મોડેલ પાકનો રોગ માત્ર 2 સેકન્ડમાં ઓળખી લે છે.' },
      { title: 'સારવાર માર્ગદર્શિકા', desc: 'દવાના નામ, માત્રા અને ઉપયોગની પદ્ધતિઓ વિશે જાણો.' },
      { title: 'સ્કેન હિસ્ટ્રી', desc: 'તમારા અગાઉના તમામ સ્કેન અને પાકના સ્વાસ્થ્યના રેકોર્ડ જુઓ.' },
      { title: 'હવામાન જોખમ', desc: 'તમારા પાક માટે સ્થાનિક હવામાનના જોખમો વિશે અપડેટ રહો.' }
    ],

    'testimonials.tag': 'ખેડૂતોની વાર્તાઓ',
    'testimonials.title': 'ખેડૂતોની પસંદ',
    'testimonials.desc': 'જુઓ ફસલરક્ષક સમગ્ર ભારતમાં ખેડૂતોનું જીવન કેવી રીતે બદલી રહ્યું છે.',
    'testimonials.reviews': [
      {
        name: "રમેશભાઈ પટેલ", location: "આણંદ, ગુજરાત",
        quote: "મારો મગફળીનો પાક બગડી રહ્યો હતો. ફસલરક્ષકે 2 સેકન્ડમાં રોગ ઓળખી કાઢ્યો. મારો પાક પણ બચી ગયો અને મારા ઘણા પૈસા પણ બચ્યા!",
        cropLabel: "🥜 મગફળીના ખેડૂત"
      },
      {
        name: "સુરેશભાઈ ચૌહાણ", location: "રાજકોટ, ગુજરાત",
        quote: "ગુજરાતીમાં પરિણામ — સમજવામાં ખૂબ જ સરળ. દવાનું નામ અને ડોઝ એપમાં જ લખેલું હોય છે. ફસલરક્ષકનો આભાર!",
        cropLabel: "🌿 કપાસના ખેડૂત"
      },
      {
        name: "દિનેશભાઈ દેસાઈ", location: "સૌરાષ્ટ્ર, ગુજરાત",
        quote: "પહેલા મારે કૃષિ કેન્દ્ર જવું પડતું હતું. હવે મારો ફોન જ મારો પાક નિષ્ણાત છે. ઘઉંના ખેડૂતો માટે ખૂબ જ ઝડપી અને ઉપયોગી એપ!",
        cropLabel: "🌾 ઘઉંના ખેડૂત"
      }
    ],

    'how.tag': 'સરળ પગલાં',
    'how.title': 'ફસલરક્ષકનો ઉપયોગ કેવી રીતે કરવો',
    'how.steps': [
      { title: 'એપ ખોલો', desc: 'તમારા સ્માર્ટફોન પર ફસલરક્ષક એપ ચાલુ કરો.' },
      { title: 'ફોટો લો', desc: 'રોગગ્રસ્ત પાકના પાંદડાનો સ્પષ્ટ ફોટો લો.' },
      { title: 'પરિણામ મેળવો', desc: 'રોગની વિગત અને સારવાર માર્ગદર્શિકા તરત જુઓ.' }
    ],
    'how.supportTag': 'સપોર્ટ કરાયેલા પાક',
    'how.supportTitle': 'અમે હાલમાં આ પાકોને સપોર્ટ કરીએ છીએ',
    'how.crops': [
      { name: '🥜 મગફળી', desc: 'સંપૂર્ણ જીવનચક્ર રોગ સપોર્ટ' },
      { name: '🌾 ઘઉં', desc: 'ચોક્કસ જીવાત અને પોષક તત્વોની ઓળખ' },
      { name: '☁️ કપાસ', desc: 'જીવાતોના હુમલા અને રોગની પ્રારંભિક ચેતવણી' }
    ],

    'cta.tag': 'નિઃશુલ્ક શરૂ કરો',
    'cta.title': 'આજે જ તમારા પાકને સુરક્ષિત કરો',
    'cta.desc': 'ફસલરક્ષકનો ઉપયોગ કરતા 10,000+ ખેડૂતોમાં જોડાઓ. હંમેશા માટે મફત.',
    'cta.btn': 'અત્યારે જ સ્કેન કરો',
    'cta.comingSoon': 'ટૂંક સમયમાં આવી રહ્યું છે',

    'footer.subscribeTitle1': 'અમારા ',
    'footer.subscribeTitle2': 'સમુદાયમાં જોડાઓ',
    'footer.subscribeDesc': 'તમારા ઇનબોક્સમાં સીધી સાપ્તાહિક જૈવિક ટિપ્સ અને હવામાન ચેતવણીઓ મેળવો.',
    'footer.emailPlaceholder': 'તમારું ઇમેઇલ સરનામું દાખલ કરો',
    'footer.subscribeBtn': 'હમણાં જોડાઓ',
    'footer.brandDesc': 'ફસલરક્ષક એ AI સંચાલિત કૃષિ સાથી છે જે જૈવિક રોગની ઓળખ સાથે સમગ્ર ભારતમાં પાકનું રક્ષણ કરે છે અને ખેડૂતોને સશક્ત બનાવે છે.',
    'footer.company': 'કંપની',
    'footer.companyLinks': ['અમારા વિશે', 'સંપર્ક કરો', 'બ્લોગ', 'ઇકોસિસ્ટમ'],
    'footer.solutions': 'ઉકેલો',
    'footer.solutionLinks': ['રોગની ઓળખ', 'હવામાન AI', 'મંડી ભાવ', 'જમીન સ્વાસ્થ્ય'],
    'footer.contact': 'અમારો સંપર્ક કરો',
    'footer.emailUs': 'ઇમેઇલ સહાય',
    'footer.helpline': 'હેલ્પલાઇન નંબર',
    'footer.tollFree': 'ટોલ ફ્રી',
    'footer.headOffice': 'મુખ્ય કાર્યાલય',
    'footer.address': 'એગ્રીટેક હબ, સેક્ટર 4, <br/>ગાંધીનગર, ભારત',
    'footer.copyright': '© {year} ફસલરક્ષક એપ.',
    'footer.privacy': 'ગોપનીયતા નીતિ',
    'footer.terms': 'નિયમો અને શરતો',
    'footer.systemOp': 'સિસ્ટમ ઓનલાઇન છે',

    'soil.manual': '✍️ મેન્યુઅલ એન્ટ્રી',
    'soil.upload': '📄 PDF અપલોડ',
    'soil.scan': '📸 ફોટો સ્કેન',

    'login.slogan': 'વધુ સારી ખેતી માટે તમારો Digital સાથી.',
    'login.googleBtn': 'Google સાથે લૉગિન કરો',
    'login.secure': 'સુરક્ષિત લૉગિન',
    'login.free': 'મફત ઉપયોગ',
    'login.trusted': '10,000+ ખેડૂતોનો વિશ્વાસ',
    'login.designed': 'ભારતીય ખેડૂતો માટે ❤️ સાથે ડિઝાઈન કરેલ',
    'login.back': 'મુખ્ય પૃષ્ઠ પર પાછા ફરો'
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
