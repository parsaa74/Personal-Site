import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './components/Layout';
import AsciiBackground from './components/AsciiBackground';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: black;
`;

const LoadingFallback = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
`;

function App() {
  return (
    <LanguageProvider>
      <AppContainer>
        <AsciiBackground />
        <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/projects" element={<Layout><Projects /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
          </Routes>
        </Suspense>
      </AppContainer>
    </LanguageProvider>
  );
}

export default App; 