import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StaggerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const slideVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const StaggerAnimation = ({ children, delay = 0.2 }) => {
  return (
    <StaggerContainer
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={slideVariants}
          transition={{ duration: 0.5 }}
        >
          {child}
        </motion.div>
      ))}
    </StaggerContainer>
  );
};

export const SlideIn = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideVariants}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}; 