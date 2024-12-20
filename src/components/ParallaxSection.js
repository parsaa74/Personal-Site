import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxContainer = styled(motion.div)`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ParallaxLayer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
`;

const ParallaxSection = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <ParallaxContainer ref={ref}>
      <ParallaxLayer style={{ y, scale }}>
        {/* Add your background elements here */}
      </ParallaxLayer>
      <Content style={{ opacity }}>
        {children}
      </Content>
    </ParallaxContainer>
  );
};

export default ParallaxSection; 