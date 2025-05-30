import React, { useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { useLocation } from 'react-router-dom';

const Experiments = () => {
  const { tvirusRef } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    const isExperimentsPage = location.pathname === '/experiments';

    console.log("Experiments.js useEffect", { isExperimentsPage, tvirusRef: tvirusRef?.current });

    if (isExperimentsPage && tvirusRef?.current) {
      console.log("Experiments.js: Attempting zoom to 'experiments' section");
      const zoomTimer = setTimeout(() => {
        if (tvirusRef.current) {
          try {
            tvirusRef.current.zoomToSection('experiments');
          } catch (e) {
            console.error("Experiments.js: Error zooming to section:", e);
          }
        }
      }, 100);
      return () => clearTimeout(zoomTimer);
    }
  }, [location.pathname, tvirusRef]);

  return null;
};

export default Experiments; 