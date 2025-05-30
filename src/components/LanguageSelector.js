import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div 
      style={{ 
        position: 'relative',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div style={{
        padding: '8px 12px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '4px',
        fontSize: '14px',
        color: '#333',
      }}>
        {language.toUpperCase()}
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '4px',
          marginTop: '4px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}>
          <div
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              color: '#333',
              fontSize: '14px',
              ':hover': {
                backgroundColor: 'rgba(0,0,0,0.05)',
              }
            }}
            onClick={() => handleLanguageSelect('en')}
          >
            English
          </div>
          <div
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              color: '#333',
              fontSize: '14px',
              ':hover': {
                backgroundColor: 'rgba(0,0,0,0.05)',
              }
            }}
            onClick={() => handleLanguageSelect('de')}
          >
            Deutsch
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 