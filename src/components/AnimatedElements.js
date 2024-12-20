import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StaggerContainer = styled(motion.div)`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
  gap: ${props => props.gap || '1rem'};
`;

const FadeInElement = styled(motion.div)`
  opacity: 0;
`;

const slideVariants = {
  hidden: direction => ({
    x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0
  }),
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, -0.01, 0.9]
    }
  }
};

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const StaggerAnimation = ({ children, direction, gap, delay = 0 }) => (
  <StaggerContainer
    direction={direction}
    gap={gap}
    variants={staggerContainerVariants}
    initial="hidden"
    animate="visible"
    transition={{ delay }}
  >
    {React.Children.map(children, child => (
      <FadeInElement variants={slideVariants('up')}>
        {child}
      </FadeInElement>
    ))}
  </StaggerContainer>
);

export const SlideIn = ({ children, direction = 'up', delay = 0 }) => (
  <motion.div
    variants={slideVariants}
    initial="hidden"
    animate="visible"
    custom={direction}
    transition={{ delay }}
  >
    {children}
  </motion.div>
); 