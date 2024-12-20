import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
  display: flex;
`;

const TransitionPanel = styled(motion.div)`
  flex: 1;
  background: ${props => props.color};
  transform-origin: ${props => props.origin};
`;

const pageTransition = {
  initial: {
    scaleY: 1
  },
  animate: {
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

const PageTransition = ({ isPresent }) => {
  return (
    <AnimatePresence>
      {!isPresent && (
        <TransitionWrapper>
          {['#1a1a1a', '#2a2a2a', '#3a3a3a'].map((color, i) => (
            <TransitionPanel
              key={i}
              color={color}
              origin={i % 2 ? 'bottom' : 'top'}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                delay: i * 0.1
              }}
            />
          ))}
        </TransitionWrapper>
      )}
    </AnimatePresence>
  );
};

export default PageTransition; 