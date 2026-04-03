import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en';
import { hi } from '../locales/hi';
import { gu } from '../locales/gu';

const translations = {
  EN: en,
  HI: hi,
  GUJ: gu
};

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('app_lang') || 'EN';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const t = (key) => {
    let keys = key.split('.');
    let value = translations[lang];
    for (let k of keys) {
      if (value[k] === undefined) {
        return key; // fallback to key path itself if not found
      }
      value = value[k];
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
