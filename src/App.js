import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import LoadingState from './components/LoadingState';

// Import your pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
`;

const ContentContainer = styled.main`
  padding-top: 80px; // Adjust based on your navigation height
`;

function App() {
  return (
    <AppContainer>
      <Navigation />
      <ContentContainer>
        <Suspense fallback={<LoadingState />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </ContentContainer>
    </AppContainer>
  );
}

export default App; 