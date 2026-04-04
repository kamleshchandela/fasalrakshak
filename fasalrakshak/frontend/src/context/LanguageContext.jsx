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
    'login.back': 'Back to Home',

    'organic.hero.tag': 'AI-POWERED AGRICULTURAL INTELLIGENCE',
    'organic.hero.title1': 'Grow ',
    'organic.hero.title2': 'Smarter.',
    'organic.hero.title3': 'Grow ',
    'organic.hero.title4': 'Organic.',
    'organic.hero.desc': 'Transform your farm with a complete smart farming ecosystem. Combine deep AI insights, Indian government support, and futuristic greenhouse logic in one click.',
    'organic.hero.btn1': 'Make My Farm Organic',
    'organic.hero.btn2': 'Explore Organic HUB',

    'organic.greenhouse.tag': 'Next-Gen Farming',
    'organic.greenhouse.title': 'Smart Greenhouse Ecosystems',
    'organic.greenhouse.desc': 'Precision environment control simulated by AI to guarantee year-round high-quality yields in any climate.',
    'organic.greenhouse.console': 'Environment Console',
    'organic.greenhouse.intensity': 'Target Intensity (°C)',
    'organic.greenhouse.saturation': 'Relative Saturation (%)',
    'organic.greenhouse.efficiency': 'Biological Efficiency',
    'organic.greenhouse.correction': 'Correction Required',
    'organic.greenhouse.automation': 'Automation',
    'organic.greenhouse.drip': 'AI Drip Feed: ACTIVE',
    'organic.greenhouse.metabolic': 'Metabolic Drive',
    'organic.greenhouse.hyper': 'HYPER-DRIVE ⚡',
    'organic.greenhouse.dormant': 'DORMANT',
    'organic.greenhouse.hub': 'Ecosystem Hub',
    'organic.greenhouse.cultivars': 'Suggested Cultivars',
    'organic.greenhouse.harvest': 'Expected Harvest',
    'organic.greenhouse.sensor': 'Sensor Grade Accuracy',
    'organic.greenhouse.yield': 'YIELD',

    'organic.diff.title': 'The Conversion Differential',
    'organic.diff.desc': 'Precision Ecosystem Audit Impact',
    'organic.diff.organic': 'Organic Protocol',
    'organic.diff.chemical': 'Chemical Protocol',
    'organic.diff.sustainable': 'Sustainable Standard',
    'organic.diff.legacy': 'Industry Legacy',
    'organic.diff.validation': 'Clinical validation ensures 98.4% biological accuracy.',
    'organic.diff.soil': 'Soil Integrity index',
    'organic.diff.hydration': 'Hydration Recall',
    'organic.diff.viability': 'Long-term Viability',
    'organic.diff.nutrient': 'Nutrient Strip Vector',
    'organic.diff.dependency': 'Chemical Dependency',
    'organic.diff.toxicity': 'Biodiversity Loss',

    'organic.features.tag': 'Biological Intelligence',
    'organic.features.title': "Nature's Biological Shield",
    'organic.features.fert_title': 'Fertility Optimization',
    'organic.features.fert_desc': 'Analyzing soil deficiency vectors to suggest precise biological inputs.',
    'organic.features.analyze_btn': 'Analyze My Soil Needs',
    'organic.features.analyzing': 'Analyzing Cellular Data...',
    'organic.features.complete': 'Analysis Generated',
    'organic.features.pest_title': 'Natural Remedies',
    'organic.features.pest_desc': 'Eradicating invasive vectors via traditional bio-pharmacology.',
    'organic.features.rating': 'Bio-Security Rating',
    'organic.features.safe': '96% ORGANIC-SAFE',

    'organic.toggle.active': 'MODE ACTIVE',
    'organic.toggle.switch': 'SECURE SWITCH',
    'organic.toggle.standard': 'Standard View',
    'organic.toggle.hub': 'Organic Hub',

    'organic.schemes.tag': 'Institutional Support 🇮🇳',
    'organic.schemes.title': 'Empowering Your Organic Growth',
    'organic.schemes.desc': 'Comprehensive financial grants and logistical support frameworks curated for the next generation of sustainable Indian agriculture.',
    'organic.schemes.apply': 'Apply Now',
    'organic.schemes.learn': 'Learn More',
    'organic.schemes.grant': 'Grant Coverage',
    'organic.schemes.pkvy': 'Paramparagat Krishi Vikas Yojana (PKVY)',
    'organic.schemes.nmsa': 'Sustainable Agriculture Mission (NMSA)',
    'organic.schemes.shc': 'Soil Health Card Scheme',
    'organic.schemes.rkvy': 'Rashtriya Krishi Vikas Yojana (RKVY)',

    'organic.rotation.tag': 'Smart Rotation',
    'organic.rotation.title': 'Intelligent Crop Lifecycle Timeline',
    'organic.rotation.desc': 'Our AI analyzes soil exhaustion patterns to suggest a rotation path that restores natural microbiology while maximizing harvest value.',
    'organic.rotation.state': 'Current State',
    'organic.rotation.next': 'Next Rotation',
    'organic.rotation.why': 'Why rotate with',
    'organic.rotation.roi': 'ROI Estimate',

    'organic.roadmap.tag': 'Conversion Strategy',
    'organic.roadmap.title': 'Your 12-Week Organic Roadmap',
    'organic.roadmap.week': 'Week',
    'organic.roadmap.prec_tag': 'Conversion Tip',
    'organic.roadmap.prec_desc': 'Most soils take 3 years for certification, but chemical-free benefits start in 3 months.',
    'organic.roadmap.bio_title': 'Precision Bio-Seeding Intelligence',
    'organic.roadmap.bio_desc': 'Our AI maps your regional microbial signatures to suggest exactly which bio-fertilizers will colonize your soil the fastest.'
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
    'login.back': 'मुख्य पृष्ठ पर वापस',

    'organic.hero.tag': 'एआई-संचालित कृषि खुफिया',
    'organic.hero.title1': 'समझदारी से ',
    'organic.hero.title2': 'उगाएं।',
    'organic.hero.title3': 'जैविक ',
    'organic.hero.title4': 'अपनाएं।',
    'organic.hero.desc': 'एक संपूर्ण स्मार्ट कृषि पारिस्थितिकी तंत्र के साथ अपने खेत को बदलें। एक क्लिक में गहन एआई अंतर्दृष्टि, भारत सरकार की सहायता और भविष्य के ग्रीनहाउस लॉजिक को जोड़ें।',
    'organic.hero.btn1': 'खेती को जैविक बनाएं',
    'organic.hero.btn2': 'ऑर्गेनिक हब देखें',

    'organic.greenhouse.tag': 'अगली पीढ़ी की खेती',
    'organic.greenhouse.title': 'स्मार्ट ग्रीनहाउस पारिस्थितिकी तंत्र',
    'organic.greenhouse.desc': 'किसी भी जलवायु में साल भर उच्च गुणवत्ता वाली उपज की गारंटी के लिए एआई द्वारा सिम्युलेटेड सटीक वातावरण नियंत्रण।',
    'organic.greenhouse.console': 'पर्यावरण कंसोल',
    'organic.greenhouse.intensity': 'लक्षित तीव्रता (°C)',
    'organic.greenhouse.saturation': 'सापेक्ष संतृप्ति (%)',
    'organic.greenhouse.efficiency': 'जैविक दक्षता',
    'organic.greenhouse.correction': 'सुधार आवश्यक',
    'organic.greenhouse.automation': 'स्वचालन',
    'organic.greenhouse.drip': 'एआई ड्रिप फीड: सक्रिय',
    'organic.greenhouse.metabolic': 'मेटाबॉलिक ड्राइव',
    'organic.greenhouse.hyper': 'हाइपर-ड्राइव ⚡',
    'organic.greenhouse.dormant': 'सुप्त',
    'organic.greenhouse.hub': 'इकोसिस्टम हब',
    'organic.greenhouse.cultivars': 'सुझाए गए कल्टीवर्स',
    'organic.greenhouse.harvest': 'अपेक्षित उपज',
    'organic.greenhouse.sensor': 'सेंसर ग्रेड सटीकता',
    'organic.greenhouse.yield': 'उपज',

    'organic.diff.title': 'परिवर्तन का अंतर',
    'organic.diff.desc': 'सटीक इकोसिस्टम ऑडिट प्रभाव',
    'organic.diff.organic': 'जैविक प्रोटोकॉल',
    'organic.diff.chemical': 'रासायनिक प्रोटोकॉल',
    'organic.diff.sustainable': 'सतत मानक',
    'organic.diff.legacy': 'उद्योग विरासत',
    'organic.diff.validation': 'क्लिनिकल सत्यापन 98.4% जैविक सटीकता सुनिश्चित करता है।',
    'organic.diff.soil': 'मृदा अखंडता सूचकांक',
    'organic.diff.hydration': 'हाइड्रेशन रिकॉल',
    'organic.diff.viability': 'दीर्घकालिक व्यवहार्यता',
    'organic.diff.nutrient': 'पोषक तत्व स्ट्रिप वेक्टर',
    'organic.diff.dependency': 'रासायनिक निर्भरता',
    'organic.diff.toxicity': 'जैव विविधता हानि',

    'organic.features.tag': 'जैविक खुफिया',
    'organic.features.title': "प्रकृति की जैविक ढाल",
    'organic.features.fert_title': 'उर्वरता अनुकूलन',
    'organic.features.fert_desc': 'सटीक जैविक इनपुट का सुझाव देने के लिए मिट्टी की कमी के वेक्टरों का विश्लेषण।',
    'organic.features.analyze_btn': 'मिट्टी की जरूरत जांचें',
    'organic.features.analyzing': 'कोशिकीय डेटा का विश्लेषण...',
    'organic.features.complete': 'विश्लेषण तैयार',
    'organic.features.pest_title': 'प्राकृतिक उपचार',
    'organic.features.pest_desc': 'पारंपरिक बायो-फार्माकोलॉजी के माध्यम से कीट नियंत्रण।',
    'organic.features.rating': 'बायो-सिक्योरिटी रेटिंग',
    'organic.features.safe': '96% जैविक-सुरक्षित',

    'organic.toggle.active': 'मोड सक्रिय',
    'organic.toggle.switch': 'सुरक्षित स्विच',
    'organic.toggle.standard': 'मानक दृश्य',
    'organic.toggle.hub': 'जैविक हब',

    'organic.schemes.tag': 'संस्थागत सहायता 🇮🇳',
    'organic.schemes.title': 'आपकी जैविक प्रगति को सशक्त बनाना',
    'organic.schemes.desc': 'सतत भारतीय कृषि की अगली पीढ़ी के लिए क्यूरेट किए गए व्यापक वित्तीय अनुदान और रसद सहायता ढांचे।',
    'organic.schemes.apply': 'अभी आवेदन करें',
    'organic.schemes.learn': 'अधिक जानें',
    'organic.schemes.grant': 'अनुदान कवरेज',
    'organic.schemes.pkvy': 'परंपरागत कृषि विकास योजना (PKVY)',
    'organic.schemes.nmsa': 'सतत कृषि मिशन (NMSA)',
    'organic.schemes.shc': 'मृदा स्वास्थ्य कार्ड योजना',
    'organic.schemes.rkvy': 'राष्ट्रीय कृषि विकास योजना (RKVY)',

    'organic.rotation.tag': 'स्मार्ट रोटेशन',
    'organic.rotation.title': 'इंटेलिजेंट क्रॉप लाइफसाइकिल टाइमलाइन',
    'organic.rotation.desc': 'हमारा एआई मिट्टी की थकावट के पैटर्न का विश्लेषण करता है ताकि फसल चक्र का सुझाव दिया जा सके जो उपज मूल्य को अधिकतम करते हुए प्राकृतिक सूक्ष्म जीव विज्ञान को बहाल करता है।',
    'organic.rotation.state': 'वर्तमान स्थिति',
    'organic.rotation.next': 'अगला रोटेशन',
    'organic.rotation.why': 'रोटेशन क्यों जरूरी है',
    'organic.rotation.roi': 'अनुमानित आरओआई',

    'organic.roadmap.tag': 'रूपांतरण रणनीति',
    'organic.roadmap.title': 'आपका 12-सप्ताह का जैविक रोडमैप',
    'organic.roadmap.week': 'सप्ताह',
    'organic.roadmap.prec_tag': 'रूपांतरण टिप',
    'organic.roadmap.prec_desc': 'अधिकांश मिट्टी को प्रमाणीकरण के लिए 3 वर्ष लगते हैं, लेकिन रासायनिक मुक्त लाभ 3 महीनों में शुरू हो जाते हैं।',
    'organic.roadmap.bio_title': 'सटीक बायो-सीडिंग इंटेलिजेंस',
    'organic.roadmap.bio_desc': 'हमारा एआई आपके क्षेत्रीय सूक्ष्मजैविक हस्ताक्षरों का नक्शा बनाता है ताकि यह सुझाव दिया जा सके कि कौन से जैव-उर्वरक मिट्टी में सबसे तेजी से बसेंगे।'
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
    'login.back': 'મુખ્ય પૃષ્ઠ પર પાછા',

    'organic.hero.tag': 'એઆઈ-સંચાલિત કૃષિ બુદ્ધિ',
    'organic.hero.title1': 'સમજદારીથી ',
    'organic.hero.title2': 'ઉગાડો.',
    'organic.hero.title3': 'જૈવિક ',
    'organic.hero.title4': 'અપનાવો.',
    'organic.hero.desc': 'સંપૂર્ણ સ્માર્ટ ફાર્મિંગ ઇકોસિસ્ટમ સાથે તમારા ખેતરને બદલો. એક ક્લિકમાં ઊંડી AI આંતરદૃષ્ટિ, ભારત સરકારની સહાય અને ભવિષ્યવાદી ગ્રીનહાઉસ લોજિકને જોડો.',
    'organic.hero.btn1': 'ખેતીને જૈવિક બનાવો',
    'organic.hero.btn2': 'ઓર્ગેનિક હબ જુઓ',

    'organic.greenhouse.tag': 'આગામી પેઢીની ખેતી',
    'organic.greenhouse.title': 'સ્માર્ટ ગ્રીનહાઉસ ઇકોસિસ્ટમ',
    'organic.greenhouse.desc': 'કોઈપણ હવામાનમાં આખા વર્ષ દરમિયાન શ્રેષ્ઠ ગુણવત્તાના પાકની ખાતરી આપવા માટે એઆઈ દ્વારા સંચાલિત સચોટ વાતાવરણ નિયંત્રણ.',
    'organic.greenhouse.console': 'વાતાવરણ કન્સોલ',
    'organic.greenhouse.intensity': 'ટાર્ગેટ તીવ્રતા (°C)',
    'organic.greenhouse.saturation': 'સંબંધિત સંતૃપ્તિ (%)',
    'organic.greenhouse.efficiency': 'જૈવિક કાર્યક્ષમતા',
    'organic.greenhouse.correction': 'સુધારણા જરૂરી',
    'organic.greenhouse.automation': 'ઓટોમેશન',
    'organic.greenhouse.drip': 'એઆઈ ડ્રીપ ફીડ: સક્રિય',
    'organic.greenhouse.metabolic': 'મેટાબોલિક ડ્રાઇવ',
    'organic.greenhouse.hyper': 'હાઇપર-ડ્રાઇવ ⚡',
    'organic.greenhouse.dormant': 'સુષુપ્ત',
    'organic.greenhouse.hub': 'ઇકોસિસ્ટમ હબ',
    'organic.greenhouse.cultivars': 'સૂચવેલ કલ્ટીવર્સ',
    'organic.greenhouse.harvest': 'અપેક્ષિત લણણી',
    'organic.greenhouse.sensor': 'સેન્સર ગ્રેડ ચોકસાઈ',
    'organic.greenhouse.yield': 'ઉપજ',

    'organic.diff.title': 'પરિવર્તનનો તફાવત',
    'organic.diff.desc': 'ચોકસાઇ ઇકોસિસ્ટમ ઓડિટ અસર',
    'organic.diff.organic': 'જૈવિક પ્રોટોકોલ',
    'organic.diff.chemical': 'રાસાયણિક પ્રોટોકોલ',
    'organic.diff.sustainable': 'ટકાઉ ધોરણ',
    'organic.diff.legacy': 'ઉદ્યોગ વારસો',
    'organic.diff.validation': 'ક્લિનિકલ વેરિફિકેશન 98.4% જૈવિક ચોકસાઈની ખાતરી આપે છે.',
    'organic.diff.soil': 'જમીન અખંડિતતા ઇન્ડેક્સ',
    'organic.diff.hydration': 'હાઇડ્રેશન રિકોલ',
    'organic.diff.viability': 'લાંબા ગાળાની વ્યવહારક્ષમતા',
    'organic.diff.nutrient': 'પોષક તત્વોનો તફાવત',
    'organic.diff.dependency': 'રાસાયણિક નિર્ભરતા',
    'organic.diff.toxicity': 'જૈવવિવિધતા નુકસાન',

    'organic.features.tag': 'જૈવિક બુદ્ધિ',
    'organic.features.title': "કુદરતની જૈવિક ઢાલ",
    'organic.features.fert_title': 'ફળદ્રુપતા ઑપ્ટિમાઇઝેશન',
    'organic.features.fert_desc': 'સચોટ જૈવિક ઇનપુટ્સ સૂચવવા માટે જમીનની ઉણપનું વિશ્લેષણ.',
    'organic.features.analyze_btn': 'જમીનની જરૂરિયાત તપાસો',
    'organic.features.analyzing': 'સેલ્યુલર ડેટાનું વિશ્લેષણ...',
    'organic.features.complete': 'વિશ્લેષણ તૈયાર',
    'organic.features.pest_title': 'કુદરતી ઉપાયો',
    'organic.features.pest_desc': 'પરંપરાગત બાયો-ફાર્માકોલોજી દ્વારા જંતુ નિયંત્રણ.',
    'organic.features.rating': 'બાયો-સિક્યોરિટી રેટિંગ',
    'organic.features.safe': '96% જૈવિક-સુરક્ષિત',

    'organic.toggle.active': 'મોડ સક્રિય',
    'organic.toggle.switch': 'સુરક્ષિત સ્વીચ',
    'organic.toggle.standard': 'સ્ટાન્ડર્ડ વ્યૂ',
    'organic.toggle.hub': 'જૈવિક હબ',

    'organic.schemes.tag': 'સંસ્થાકીય સહાય 🇮🇳',
    'organic.schemes.title': 'તમારી જૈવિક વૃદ્ધિને સશક્ત બનાવવી',
    'organic.schemes.desc': 'ટકાઉ ભારતીય કૃષિની આગામી પેઢી માટે ક્યૂરેટ કરેલ વ્યાપક નાણાકીય અનુદાન અને લોજિસ્ટિક સપોર્ટ ફ્રેમવર્ક.',
    'organic.schemes.apply': 'અત્યારે જ અરજી કરો',
    'organic.schemes.learn': 'વધુ જાણો',
    'organic.schemes.grant': 'ગ્રાન્ટ કવરેજ',
    'organic.schemes.pkvy': 'પરંપરાગત કૃષિ વિકાસ યોજના (PKVY)',
    'organic.schemes.nmsa': 'ટકાઉ કૃષિ મિશન (NMSA)',
    'organic.schemes.shc': 'સોઈલ હેલ્થ કાર્ડ યોજના',
    'organic.schemes.rkvy': 'રાષ્ટ્રીય કૃષિ વિકાસ યોજના (RKVY)',

    'organic.rotation.tag': 'સ્માર્ટ રોટેશન',
    'organic.rotation.title': 'ઇન્ટેલિજન્ટ ક્રોપ લાઇફસાઇકલ ટાઇમલાઇન',
    'organic.rotation.desc': 'અમારું AI જમીનની થાક નમૂનાઓનું વિશ્લેષણ કરે છે જેથી પાક રોટેશન સૂચવી શકાય જે ઉપજ મૂલ્ય વધારતી વખતે કુદરતી સૂક્ષ્મ જીવવિજ્ઞાનને પુનઃસ્થાપિત કરે છે.',
    'organic.rotation.state': 'વર્તમાન સ્થિતિ',
    'organic.rotation.next': 'આગામી રોટેશન',
    'organic.rotation.why': 'રોટેશન શા માટે જરૂરી છે',
    'organic.rotation.roi': 'અંદાજિત ROI',

    'organic.roadmap.tag': 'રૂપાંતર વ્યૂહરચના',
    'organic.roadmap.title': 'તમારો 12-અઠવાડિયાનો જૈવિક રોડમેપ',
    'organic.roadmap.week': 'અઠવાડિયું',
    'organic.roadmap.prec_tag': 'રૂપાંતર ટિપ',
    'organic.roadmap.prec_desc': 'મોટાભાગની જમીનને પ્રમાણપત્ર માટે 3 વર્ષ લાગે છે, પરંતુ રાસાયણિક મુક્ત લાભ 3 મહિનામાં શરૂ થાય છે.',
    'organic.roadmap.bio_title': 'ચોકસાઇ બાયો-સીડિંગ ઇન્ટેલિજન્સ',
    'organic.roadmap.bio_desc': 'અમારું AI તમારા પ્રાદેશિક માઇક્રોબાયલ હસ્તાક્ષરોનો નકશો બનાવે છે તે સૂચવવા માટે કે કયા જૈવ-ખાતર તમારી જમીનમાં સૌથી ઝડપથી સ્થાન લેશે.'
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
