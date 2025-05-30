import React, { useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const { tvirusRef } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    const isContactPage = location.pathname === '/contact';

    console.log("Contact.js useEffect", { isContactPage, tvirusRef: tvirusRef?.current });

    if (isContactPage && tvirusRef?.current) {
      console.log("Contact.js: Attempting zoom to 'contact' section");
      const zoomTimer = setTimeout(() => {
        if (tvirusRef.current) {
          try {
            tvirusRef.current.zoomToSection('contact');
          } catch (e) {
            console.error("Contact.js: Error zooming to section:", e);
          }
        }
      }, 100);
      return () => clearTimeout(zoomTimer);
    }
  }, [location.pathname, tvirusRef]);

  return null;
};

export default Contact; 