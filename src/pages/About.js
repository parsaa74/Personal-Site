import React, { useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { useLocation } from 'react-router-dom';

const About = () => {
  const { tvirusRef } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    const isAboutPage = location.pathname === '/about';

    console.log("About.js useEffect", { isAboutPage, tvirusRef: tvirusRef?.current });

    if (isAboutPage && tvirusRef?.current) {
      // Content is now rendered directly in TVirusBackground
      // Just trigger the zoom functionality
      console.log("About.js: Attempting zoom to 'about' section");
      const zoomTimer = setTimeout(() => {
        if (tvirusRef.current) {
          try {
            tvirusRef.current.zoomToSection('about');
          } catch (e) {
            console.error("About.js: Error zooming to section:", e);
          }
        }
      }, 100);
      return () => clearTimeout(zoomTimer);
    }
  }, [location.pathname, tvirusRef]);

  // No need to render anything as content is now part of TVirusBackground
  return null;
};

export default About; 