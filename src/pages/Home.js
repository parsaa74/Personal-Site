import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ThreeScene from '../components/ThreeScene';

const HomeContainer = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  touch-action: none;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin-top: -20vh;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 8vw, 8rem);
  line-height: 1.1;
  margin: 0;
  font-weight: 700;
  mix-blend-mode: difference;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 12vw, 4rem);
    letter-spacing: -0.02em;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  opacity: 0.7;
  margin-top: 1rem;
  mix-blend-mode: difference;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
`;

const TouchIndicator = styled(motion.div)`
  display: none;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Home = ({ mousePosition }) => {
  return (
    <HomeContainer>
      <ThreeScene mousePosition={mousePosition} />
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            x: (mousePosition.x - window.innerWidth / 2) * 0.02,
            y: (mousePosition.y - window.innerHeight / 2) * 0.02,
          }}
        >
          CREATIVE
          <br />
          DEVELOPER
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Design / Motion / Performance
        </Subtitle>
      </ContentWrapper>
      <TouchIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Swipe to explore
      </TouchIndicator>
    </HomeContainer>
  );
};

export default Home; 