import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
    },
    home: {
      title: 'Creative Developer',
      subtitle: 'Building digital experiences',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über mich',
      projects: 'Projekte',
      contact: 'Kontakt',
    },
    home: {
      title: 'Kreativer Entwickler',
      subtitle: 'Digitale Erlebnisse gestalten',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const value = {
    language,
    setLanguage,
    t: (key) => {
      const keys = key.split('.');
      let result = translations[language];
      for (const k of keys) {
        result = result?.[k];
      }
      return result || key;
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 