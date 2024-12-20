import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

export const useAnimations = () => {
  const controls = useAnimation();

  const slideIn = async (direction = 'left') => {
    await controls.start({
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    });
  };

  const fadeIn = async () => {
    await controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    });
  };

  const stagger = async (delay = 0.1) => {
    await controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * delay,
        duration: 0.5
      }
    }));
  };

  return { controls, slideIn, fadeIn, stagger };
}; 