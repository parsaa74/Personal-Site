import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const GestureArea = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  touch-action: none;
  pointer-events: none;
`;

const NavigationHint = styled(motion.div)`
  position: fixed;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: 20px' : 'right: 20px'};
  transform: translateY(-50%);
  color: white;
  opacity: 0.5;
  font-size: 2rem;
  pointer-events: none;
`;

const GestureNavigation = ({ routes }) => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const gestureRef = useRef({ startX: 0, startY: 0 });

  useEffect(() => {
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      gestureRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        timestamp: Date.now()
      };
    };

    const handleTouchMove = (e) => {
      if (!gestureRef.current.startX) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - gestureRef.current.startX;
      const deltaY = touch.clientY - gestureRef.current.startY;
      const deltaTime = Date.now() - gestureRef.current.timestamp;

      // Calculate velocity and angle
      const velocity = Math.abs(deltaX) / deltaTime;
      const angle = Math.abs(Math.atan2(deltaY, deltaX));

      // Check if gesture is horizontal enough
      if (angle < Math.PI / 4 && velocity > 0.5 && Math.abs(deltaX) > 50) {
        const direction = deltaX > 0 ? 'right' : 'left';
        const currentIndex = routes.findIndex(route => 
          window.location.pathname === route.path
        );

        if (direction === 'right' && currentIndex > 0) {
          navigate(routes[currentIndex - 1].path);
        } else if (direction === 'left' && currentIndex < routes.length - 1) {
          navigate(routes[currentIndex + 1].path);
        }

        gestureRef.current = { startX: 0, startY: 0 };
      }
    };

    const handleTouchEnd = () => {
      gestureRef.current = { startX: 0, startY: 0 };
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate, routes]);

  return (
    <>
      <GestureArea />
      <NavigationHint direction="left">→</NavigationHint>
      <NavigationHint direction="right">←</NavigationHint>
    </>
  );
};

export default GestureNavigation; 