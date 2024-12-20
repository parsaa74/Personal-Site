import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import SocialLinks from './components/SocialLinks';
import LanguageToggle from './components/LanguageToggle';
import CustomCursor from './components/CustomCursor';
import InteractiveNav from './components/InteractiveNav';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Projects = React.lazy(() => import('./pages/Projects'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));

const AppContainer = styled(motion.div)`
  background: #000;
  color: #fff;
  min-height: 100vh;
  cursor: none;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
};

function App() {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate loading time for assets
    setTimeout(() => setIsLoading(false), 2000);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <LanguageProvider>
      <AppContainer>
        <CustomCursor mousePosition={mousePosition} />
        <Navigation />
        <SocialLinks />
        <LanguageToggle />
        <InteractiveNav />
        <AnimatePresence mode="wait">
          <ContentWrapper
            key={location.pathname}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<LoadingScreen />}>
              <Routes location={location}>
                <Route path="/" element={<Home mousePosition={mousePosition} />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </ContentWrapper>
        </AnimatePresence>
      </AppContainer>
    </LanguageProvider>
  );
}

export default App; 