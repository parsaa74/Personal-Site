import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

const AppContainer = styled(motion.div)`
  background: #000;
  color: #fff;
  min-height: 100vh;
  cursor: none;
`;

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AppContainer>
      <CustomCursor mousePosition={mousePosition} />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home mousePosition={mousePosition} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AppContainer>
  );
}

export default App; 