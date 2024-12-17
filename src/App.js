import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';

const AppContainer = styled(motion.div)`
  background: #000;
  color: #fff;
  min-height: 100vh;
  cursor: none; // Hide default cursor
`;

function App() {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AppContainer>
        <AnimatePresence>
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <>
              <CustomCursor mousePosition={mousePosition} />
              <Navigation />
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={
                    <PageTransition>
                      <Home mousePosition={mousePosition} />
                    </PageTransition>
                  } />
                  <Route path="/projects" element={
                    <PageTransition>
                      <Projects />
                    </PageTransition>
                  } />
                  <Route path="/about" element={
                    <PageTransition>
                      <About />
                    </PageTransition>
                  } />
                  <Route path="/contact" element={
                    <PageTransition>
                      <Contact />
                    </PageTransition>
                  } />
                </Routes>
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </AppContainer>
    </Router>
  );
}

export default App; 