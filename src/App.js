import React, { useRef, useState, createContext } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
// import SmokeSlideshow from './components/SmokeSlideshow'; // Comment out SmokeSlideshow
import TVirusBackground from './components/TVirusBackground'; // Import new background
// import BrutalistNavigation from './components/BrutalistNavigation';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Experiments from './pages/Experiments';
import SoloPerformances from './pages/SoloPerformances';
import GroupPerformances from './pages/GroupPerformances';
import FilmPractices from './pages/FilmPractices';
import GermanArtSchools from './pages/GermanArtSchools';
import ThreeDPortfolio from './pages/ThreeDPortfolio';
import styled from 'styled-components';

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
          </Routes>
        </ContentWrapper>
        {/* Removed BrutalistNavigation */}
      </AppContainer>
    </AppContext.Provider>
  );
};

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AppContent />
      </DarkModeProvider>
    </Router>
  );
}

export default App; 