import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import p5 from 'p5';

const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const InteractiveText = styled(motion.h1)`
  font-size: 8vw;
  font-family: 'Space Mono', monospace;
  mix-blend-mode: difference;
`;

const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Home = ({ mousePosition }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(0);
      };

      p.draw = () => {
        p.background(0, 10);
        p.stroke(255, 50);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      };
    };

    const p5Instance = new p5(sketch, canvasRef.current);
    return () => p5Instance.remove();
  }, []);

  return (
    <HomeContainer>
      <CanvasWrapper ref={canvasRef} />
      <InteractiveText
        animate={{
          x: (mousePosition.x - window.innerWidth / 2) * 0.05,
          y: (mousePosition.y - window.innerHeight / 2) * 0.05,
        }}
      >
        CREATIVE DEVELOPER
      </InteractiveText>
    </HomeContainer>
  );
};

export default Home; 