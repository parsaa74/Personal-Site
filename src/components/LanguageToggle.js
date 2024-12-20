import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';

const ToggleContainer = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
`;

const ToggleButton = styled(motion.button)`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }
`;

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <ToggleContainer>
      <ToggleButton onClick={toggleLanguage}>
        {language === 'en' ? 'DE' : 'EN'}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default LanguageToggle; 