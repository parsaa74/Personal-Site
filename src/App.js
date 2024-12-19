import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
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

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

function App() {
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
    <AppContainer>
      <CustomCursor mousePosition={mousePosition} />
      <InteractiveNav />
      <ContentWrapper>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home mousePosition={mousePosition} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App; 