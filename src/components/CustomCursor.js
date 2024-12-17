import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorWrapper = styled(motion.div)`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
`;

const CursorDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
`;

const CursorRing = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  position: absolute;
  top: -16px;
  left: -16px;
`;

const CustomCursor = ({ mousePosition }) => {
  return (
    <CursorWrapper
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
    >
      <CursorDot />
      <CursorRing
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
    </CursorWrapper>
  );
};

export default CustomCursor; 