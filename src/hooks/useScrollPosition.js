import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState('down');
  const [lastPosition, setLastPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setDirection(position > lastPosition ? 'down' : 'up');
      setLastPosition(position);
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastPosition]);

  return { scrollPosition, direction };
}; 