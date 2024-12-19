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

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 8vw, 8rem);
  line-height: 1.1;
  margin: 0;
  font-weight: 700;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  opacity: 0.7;
  margin-top: 1rem;
`;

const Home = ({ mousePosition }) => {
  return (
    <HomeContainer>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            x: (mousePosition.x - window.innerWidth / 2) * 0.05,
            y: (mousePosition.y - window.innerHeight / 2) * 0.05,
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
    </HomeContainer>
  );
};

export default Home; 