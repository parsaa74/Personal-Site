import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingText = styled(motion.h1)`
  font-size: 2rem;
  color: white;
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoadingText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen; 