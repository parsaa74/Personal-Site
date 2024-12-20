import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoaderContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ProgressBar = styled(motion.div)`
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  overflow: hidden;
  position: relative;
`;

const Progress = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: white;
  width: 100%;
`;

const LoadingText = styled(motion.span)`
  color: white;
  font-size: 1rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const AdvancedLoader = ({ progress = 0, text = "Loading" }) => {
  return (
    <LoaderContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoaderContent>
        <ProgressBar>
          <Progress
            initial={{ x: '-100%' }}
            animate={{ x: `${progress - 100}%` }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </ProgressBar>
        <LoadingText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </LoadingText>
      </LoaderContent>
    </LoaderContainer>
  );
};

export default AdvancedLoader; 