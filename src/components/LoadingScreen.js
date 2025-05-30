import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingText = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 4rem);
  color: #fff;
  font-family: 'Moderat';
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingText
        animate={{
          opacity: [1, 0.5, 1],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        LOADING
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen; 