import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TouchHandler = ({ children }) => {
  const navigate = useNavigate();
  let touchStartX = 0;
  let touchEndX = 0;

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeDistance = touchEndX - touchStartX;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          navigate(-1); // Go back
        } else {
          navigate(1); // Go forward
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);

  return <>{children}</>;
};

export default TouchHandler; 