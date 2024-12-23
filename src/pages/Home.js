import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 4vw, 1.5rem);
  opacity: 0.8;
`;

const Home = () => {
  const { t } = useLanguage();

  return (
    <HomeContent>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {t('home.title')}
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {t('home.subtitle')}
      </Subtitle>
    </HomeContent>
  );
};

export default Home; 