import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 8vw, 8rem);
  text-align: center;
  line-height: 1.2;
  font-weight: 700;
  margin: 0;
`;

const Home = ({ mousePosition }) => {
  return (
    <HomeContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          x: mousePosition ? (mousePosition.x - window.innerWidth / 2) * 0.05 : 0,
          y: mousePosition ? (mousePosition.y - window.innerHeight / 2) * 0.05 : 0,
        }}
      >
        CREATIVE
        <br />
        DEVELOPER
      </Title>
    </HomeContainer>
  );
};

export default Home; 