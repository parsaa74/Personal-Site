import React, { useEffect, useRef } from 'react';

const TouchHandler = ({ onTouch, children, className }) => {
  const elementRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchTimeRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      touchTimeRef.current = Date.now();
    };

    const handleTouchEnd = (e) => {
      if (!touchStartRef.current || !touchTimeRef.current) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const touchDuration = Date.now() - touchTimeRef.current;
      const touchDistance = Math.sqrt(
        Math.pow(touchEnd.x - touchStartRef.current.x, 2) +
        Math.pow(touchEnd.y - touchStartRef.current.y, 2)
      );

      // Consider it a tap if it's quick and doesn't move much
      if (touchDuration < 300 && touchDistance < 10) {
        if (onTouch) {
          onTouch({
            x: touchEnd.x,
            y: touchEnd.y,
            originalEvent: e,
          });
        }
      }

      touchStartRef.current = null;
      touchTimeRef.current = null;
    };

    const handleTouchMove = (e) => {
      // Prevent scrolling when touching the interactive area
      if (e.touches.length === 1) {
        e.preventDefault();
      }
    };

    // Add passive: false to allow preventDefault
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onTouch]);

  return (
    <div ref={elementRef} className={className} style={{ touchAction: 'none' }}>
      {children}
    </div>
  );
};

export default TouchHandler; 