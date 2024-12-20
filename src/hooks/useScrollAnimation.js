import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (threshold = 0.2) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  return { ref, controls, variants };
};

export const useParallaxScroll = (speed = 0.5) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    margin: "-100px 0px"
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 30
        }
      });
    }
  }, [controls, inView]);

  return { ref, controls, y: inView ? 0 : speed * 100 };
}; 