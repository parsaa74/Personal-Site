import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const ParallaxSection = ({ children, offset = 50 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <ParallaxContainer style={{ y }}>
      {children}
    </ParallaxContainer>
  );
};

export default ParallaxSection; 