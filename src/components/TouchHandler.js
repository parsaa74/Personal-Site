import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';

const TouchArea = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  touch-action: none;
  pointer-events: ${props => props.active ? 'auto' : 'none'};
`;

const TouchHandler = ({ onSwipe, children }) => {
  const controls = useAnimation();
  const touchRef = useRef({ startX: 0, startY: 0 });
  const thresholdDistance = 50; // minimum distance for swipe

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      timestamp: Date.now()
    };
  };

  const handleTouchMove = (e) => {
    if (!touchRef.current.startX) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;
    const deltaTime = Date.now() - touchRef.current.timestamp;

    // Calculate velocity
    const velocity = Math.abs(deltaX) / deltaTime;

    if (Math.abs(deltaX) > thresholdDistance && velocity > 0.5) {
      const direction = deltaX > 0 ? 'right' : 'left';
      onSwipe?.(direction, { deltaX, deltaY, velocity });
      touchRef.current = { startX: 0, startY: 0 };
    }
  };

  const handleTouchEnd = () => {
    touchRef.current = { startX: 0, startY: 0 };
  };

  return (
    <TouchArea
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </TouchArea>
  );
};

export default TouchHandler; 