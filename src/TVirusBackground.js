import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import p5 from 'p5';
import { useNavigate, useLocation } from 'react-router-dom';
import { navSectionsWithAngles, navSections } from './navSections'; // Import shared nav sections
import styled, { keyframes } from 'styled-components';

// Animation for text fade-in
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Subtle glow animation
const glow = keyframes`
  0% { text-shadow: 0 0 5px rgba(255,255,255,0.1); }
  50% { text-shadow: 0 0 15px rgba(255,255,255,0.3); }
  100% { text-shadow: 0 0 5px rgba(255,255,255,0.1); }
`;

// Styled components for About content
const AboutContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  z-index: 15;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 1.0s ease-in-out;
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
`;

const Bio = styled.div`
  font-family: 'Moderat';
  color: white;
  line-height: 1.8;
`;

const BioParagraph = styled.p`
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards;
  animation-delay: ${props => props.$delay}s;
`;

const BioTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards, ${glow} 4s infinite;
  animation-delay: 0.2s;
  letter-spacing: 2px;
`;

const WorkContainer = styled.div`
  color: white;
  min-width: 320px;
  max-width: 420px;
  width: 100%;
  padding: 2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Moderat';
`;

const TVirusBackground = forwardRef((props, ref) => {
  const { onSectionClick } = props; // Extract the onSectionClick prop
  const canvasRef = useRef(null);
  const p5Instance = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [debug, setDebug] = React.useState(false);
  const debugRef = useRef(debug);
  debugRef.current = debug;
  const [isInitialized, setIsInitialized] = React.useState(false); // Track initialization
  const [showAboutContent, setShowAboutContent] = React.useState(false);
  
  // Ref to store active section info for external access
  const activeSectionRef = useRef(null);

  // About content
  const bioText = [
    "Parsa Azari is a designer turned developer based in Tehran.",
    "His practice spans film, motion graphics, and interaction design, evolving from traditional visual media to digital interfaces and creative coding that explore both aesthetic and functional dimensions of human-computer interaction.",
    "His work is informed by film theory, media studies, and art research, drawing connections between early cinema history and contemporary digital experiences to examine how technologies shape human perception and engagement.",
    "Azari was part of New Media Group, a research collective at Tehran Museum of Contemporary Art (TMoCA), and Beta performance art group. He holds a BA in Cinema from Soore University and an MA in Art Research from Iran University of Art."
  ];

  // Check if we're on the About page
  useEffect(() => {
    const isAboutPage = location.pathname === '/about';
    setShowAboutContent(isAboutPage);
    
    // If we're on the about page, zoom to the about section
    if (isAboutPage && isInitialized && p5Instance.current) {
      console.log("TVirusBackground: Zooming to 'about' section");
      if (typeof p5Instance.current.zoomToSection === 'function') {
        p5Instance.current.zoomToSection('about');
      }
    }
  }, [location.pathname, isInitialized]);

  // Function to directly handle section clicks from inside or outside the component
  const handleSectionClick = (sectionId) => {
    console.log("TVirusBackground: handleSectionClick", sectionId);
    // Find the nav point
    const navPoint = activeSectionRef.current?.navPoints?.find(p => p.id === sectionId);
    
    if (navPoint) {
      // Set debug mode
      setDebug(true);
      
      // Zoom to the section
      if (p5Instance.current && typeof p5Instance.current.zoomToSection === 'function') {
        p5Instance.current.zoomToSection(sectionId);
      }
      
      // Call the onSectionClick prop if provided
      if (onSectionClick && typeof onSectionClick === 'function') {
        onSectionClick(sectionId);
      }
    }
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    // Method to programmatically zoom to a section
    zoomToSection: (sectionId) => {
      console.log("Ref.zoomToSection called for", sectionId);
      handleSectionClick(sectionId);
    },
    // Reset zoom
    resetZoom: () => {
      console.log("Ref.resetZoom called");
      if (p5Instance.current && typeof p5Instance.current.resetZoom === 'function') {
        p5Instance.current.resetZoom();
      } else {
        console.error("resetZoom not available on p5Instance");
      }
    },
    // Get all the current navigation points
    getNavPoints: () => {
      return activeSectionRef.current?.navPoints || [];
    }
  }), [p5Instance.current, activeSectionRef.current]);

  useEffect(() => {
    // --- Customizable Parameters with Defaults ---
    // ... existing code ...
  }, []);

  return (
    <div ref={canvasRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Rest of the component code remains unchanged */}
    </div>
  );
});

export default TVirusBackground; 