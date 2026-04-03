import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

import { en } from '../locales/en';
import { hi } from '../locales/hi';
import { gu } from '../locales/gu';

export const translations = {
  EN: {
    ...en,
    lang_en: 'English',
    lang_hi: 'हिन्दी (Hindi)',
    lang_guj: 'ગુજરાતી (Gujarati)',
    'nav.weather': 'Weather',
    'nav.soil_report': 'Soil Report',
    'nav.store': 'AgriStore',
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
    ...hi,
    lang_en: 'English',
    lang_hi: 'हिन्दी (Hindi)',
    lang_guj: 'ગુજરાતી (Gujarati)',
    'nav.weather': 'मौसम',
    'nav.soil_report': 'मृदा रिपोर्ट',
    'nav.store': 'कृषि स्टोर',
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
    ...gu,
    lang_en: 'English',
    lang_hi: 'हिन्दी (Hindi)',
    lang_guj: 'ગુજરાતી (Gujarati)',
    'nav.weather': 'હવામાન',
    'nav.soil_report': 'જમીન રિપોર્ટ',
    'nav.store': 'કૃષિ સ્ટોર',
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
