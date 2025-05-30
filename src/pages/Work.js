import React, { useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { useLocation } from 'react-router-dom';

const Work = () => {
  const { tvirusRef } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    const isWorkPage = location.pathname === '/work';

    console.log("Work.js useEffect", { isWorkPage, tvirusRef: tvirusRef?.current });

    if (isWorkPage && tvirusRef?.current) {
      console.log("Work.js: Attempting zoom to 'work' section");
      const zoomTimer = setTimeout(() => {
        if (tvirusRef.current) {
          try {
            tvirusRef.current.zoomToSection('work');
          } catch (e) {
            console.error("Work.js: Error zooming to section:", e);
          }
        }
      }, 100);
      return () => clearTimeout(zoomTimer);
    }
  }, [location.pathname, tvirusRef]);

  return null;
};

export default Work; 