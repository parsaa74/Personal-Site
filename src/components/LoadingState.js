import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a1a;
`;

const LoadingDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  margin: 0 4px;
`;

const loadingVariants = {
  initial: {
    y: 0
  },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

const LoadingState = () => {
  return (
    <LoadingContainer>
      {[0, 1, 2].map((i) => (
        <LoadingDot
          key={i}
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: i * 0.15
          }}
        />
      ))}
    </LoadingContainer>
  );
};

export default LoadingState; 