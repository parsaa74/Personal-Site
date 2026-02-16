import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      blog: 'Blog',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Thoughts and writings',
    },
  },
  de: {
    nav: {
      blog: 'Blog',
      about: 'Über mich',
      projects: 'Projekte',
      contact: 'Kontakt',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Gedanken und Schriften',
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