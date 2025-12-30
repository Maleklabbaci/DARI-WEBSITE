
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    const savedLang = localStorage.getItem('dari_lang') as Language;
    if (savedLang && ['fr', 'ar', 'en'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('dari_lang', lang);
    // Update HTML attributes for global CSS/Accessibility
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    
    const getNestedValue = (obj: any, keyList: string[]) => {
      let current = obj;
      for (const key of keyList) {
        if (current && current[key]) {
          current = current[key];
        } else {
          return null;
        }
      }
      return current;
    };

    // 1. Try current language
    const value = getNestedValue(translations[language], keys);
    if (value && typeof value === 'string') return value;

    // 2. Fallback to French if missing
    if (language !== 'fr') {
      const fallbackValue = getNestedValue(translations['fr'], keys);
      if (fallbackValue && typeof fallbackValue === 'string') return fallbackValue;
    }

    // 3. Return the key itself as a last resort to debug
    return path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
