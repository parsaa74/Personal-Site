import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
  display: flex;
`;

const TransitionPanel = styled(motion.div)`
  flex: 1;
  background: ${props => props.color || '#1a1a1a'};
  transform-origin: ${props => props.origin};
`;

const ProjectTransition = ({ isAnimating, onComplete }) => {
  const panels = [
    { color: '#1a1a1a', origin: 'left' },
    { color: '#2a2a2a', origin: 'right' },
    { color: '#3a3a3a', origin: 'left' }
  ];

  return (
    <AnimatePresence>
      {isAnimating && (
        <TransitionContainer>
          {panels.map((panel, i) => (
            <TransitionPanel
              key={i}
              color={panel.color}
              origin={panel.origin}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.645, 0.045, 0.355, 1.000]
              }}
              onAnimationComplete={i === panels.length - 1 ? onComplete : undefined}
            />
          ))}
        </TransitionContainer>
      )}
    </AnimatePresence>
  );
};

export default ProjectTransition; 