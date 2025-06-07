import React, { useRef, useState, createContext, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingState from './components/LoadingState';
// import SmokeSlideshow from './components/SmokeSlideshow'; // Comment out SmokeSlideshow
import TVirusBackground from './components/TVirusBackground'; // Import new background
// import BrutalistNavigation from './components/BrutalistNavigation';
import styled from 'styled-components';

// Helper function to handle dynamic import errors
const retryImport = (fn, retries = 3, delay = 1000) => {
  return fn().catch((error) => {
    if (retries <= 0) {
      throw error;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(retryImport(fn, retries - 1, delay));
      }, delay);
    });
  });
};

// Lazy load components for better performance with retry functionality
const Home = lazy(() => retryImport(() => import('./pages/Home')));
const About = lazy(() => retryImport(() => import('./pages/About')));
const Work = lazy(() => retryImport(() => import('./pages/Work')));
const Contact = lazy(() => retryImport(() => import('./pages/Contact')));
const Experiments = lazy(() => retryImport(() => import('./pages/Experiments')));
const SoloPerformances = lazy(() => retryImport(() => import('./pages/SoloPerformances')));
const GroupPerformances = lazy(() => retryImport(() => import('./pages/GroupPerformances')));
const FilmPractices = lazy(() => retryImport(() => import('./pages/FilmPractices')));
const GermanArtSchools = lazy(() => retryImport(() => import('./pages/GermanArtSchools')));
const ThreeDPortfolio = lazy(() => retryImport(() => import('./pages/ThreeDPortfolio')));
const SemanticBiome = lazy(() => retryImport(() => import('./pages/SemanticBiome')));
const PhilosophicalToys = lazy(() => retryImport(() => import('./pages/PhilosophicalToys')));

// Create a context to share state between components
export const AppContext = createContext();

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: #000000;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: ${props => props.showContent ? 20 : 5}; // Higher z-index when showing content
  width: 100%;
  min-height: 100vh;
  pointer-events: ${props => props.showContent ? 'auto' : 'none'};
  
  & > * {
    pointer-events: auto;
  }
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: ${props => props.showBackground ? 'auto' : 'none'};
  opacity: ${props => props.showBackground ? 1 : 0};
  transition: opacity 0.5s ease;
`;

// AppContent component to use useNavigate hook
const AppContent = () => {
  const tvirusRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we should show the background or content
  const isMainSection = ['/', '/work', '/about', '/contact', '/experiments'].includes(location.pathname);
  const isWorkSubpage = location.pathname.startsWith('/work/') && location.pathname !== '/work';
  const isExperimentSubpage = location.pathname.startsWith('/experiments/') && location.pathname !== '/experiments';
  
  const showBackground = isMainSection;
  const showContent = isWorkSubpage || isExperimentSubpage;

  const handleNavigation = (sectionId) => {
    console.log("App: handleNavigation called for", sectionId);
    setActiveSection(sectionId);
    
    // Navigate to the appropriate route
    if (sectionId === 'work' || sectionId === 'about' || sectionId === 'contact' || sectionId === 'experiments') {
      navigate(`/${sectionId}`);
    } else if (sectionId === 'home') {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <AppContext.Provider value={{ activeSection, setActiveSection, tvirusRef }}>
      <AppContainer>
        {/* TVirusBackground - shown for main sections */}
        <BackgroundWrapper showBackground={showBackground}>
          <TVirusBackground ref={tvirusRef} onSectionClick={handleNavigation} />
        </BackgroundWrapper>
        
        {/* Content - shown for work subpages */}
        <ContentWrapper showContent={showContent}>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/experiments" element={<Experiments />} />
              <Route path="/work/solo-performances" element={<SoloPerformances />} />
              <Route path="/work/group-performances" element={<GroupPerformances />} />
              <Route path="/work/film-practices" element={<FilmPractices />} />
              <Route path="/experiments/german-art-schools" element={<GermanArtSchools />} />
              <Route path="/experiments/three-d-portfolio" element={<ThreeDPortfolio />} />
              <Route path="/experiments/semantic-biome" element={<SemanticBiome />} />
              <Route path="/experiments/philosophical-toys" element={<PhilosophicalToys />} />
            </Routes>
          </Suspense>
        </ContentWrapper>
        {/* Removed BrutalistNavigation */}
      </AppContainer>
    </AppContext.Provider>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <DarkModeProvider>
          <AppContent />
        </DarkModeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App; 