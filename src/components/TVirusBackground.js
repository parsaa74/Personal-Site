import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import p5 from 'p5';
import { useNavigate, useLocation } from 'react-router-dom';
import { navSectionsWithAngles, navSections } from './navSections'; // Import shared nav sections
import styled, { keyframes, css } from 'styled-components';
import { Mail, Github, Twitter, Linkedin, Globe, Dribbble, Sun, Moon, Cloud } from 'lucide-react';
import { SiVimeo, SiMastodon, SiBluesky, SiX } from '@icons-pack/react-simple-icons';
import ArenaLogoIcon from '@aredotna/icons/ArenaLogoIcon';
import { useDarkMode } from '../context/DarkModeContext'; // Add this import

// Animation for text fade-in
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Subtle glow animation
const glow = keyframes`
  0% { text-shadow: 0 0 10px rgba(255,255,255,0.1); }
  50% { text-shadow: 0 0 25px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2); }
  100% { text-shadow: 0 0 10px rgba(255,255,255,0.1); }
`;

// Enhanced panel entrance animation
const panelSlideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95);
    filter: blur(8px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
`;

// Floating animation for panels
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

// Shimmer effect for highlights
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// Animation for about text fade/slide in
const aboutFadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

// Styled components for About content
const AboutContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 900px;
  width: 85%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 0 40px rgba(0, 0, 0, 0.6), 
    0 0 80px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  z-index: 100;
  font-family: 'Moderat';
  color: white;
  line-height: 1.8;
  pointer-events: auto;
  animation: ${panelSlideIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const AboutTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 2.5rem;
  text-shadow: 0 0 20px rgba(255,255,255,0.4);
  letter-spacing: 3px;
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards, ${glow} 6s infinite;
  animation-delay: 0.2s;
  font-family: 'Moderat';
  font-weight: 300;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AboutParagraph = styled.p`
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards;
  animation-delay: ${props => 0.5 + props.index * 0.3}s;
  font-family: 'Moderat';
  font-size: 1.05rem;
  line-height: 1.9;
`;

const FloatingAboutBox = styled.div`
  position: fixed;
  width: clamp(160px, 28vw, 320px);
  background: ${props => props.isLight 
    ? 'rgba(255,255,255,0.95)' 
    : 'rgba(0,0,0,0.88)'};
  color: ${props => props.isLight ? '#000' : '#fff'};
  border-radius: 18px;
  box-shadow: ${props => props.isLight
    ? '0 8px 32px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)'
    : '0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'};
  padding: 1.2rem 1.5rem;
  z-index: 200;
  pointer-events: auto;
  font-family: 'Moderat';
  line-height: 1.5;
  font-size: 0.8rem;
  animation: ${panelSlideIn} 0.7s cubic-bezier(0.4,0,0.2,1);
  border: 1px solid ${props => props.isLight 
    ? 'rgba(0,0,0,0.08)' 
    : 'rgba(255,255,255,0.1)'};
  backdrop-filter: blur(20px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      ${props => props.isLight 
        ? 'rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 80%'
        : 'rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 80%'}, 
      transparent 100%);
    border-radius: 18px 18px 0 0;
  }
  
  &:hover {
    animation: ${float} 3s ease-in-out infinite;
    box-shadow: ${props => props.isLight
      ? '0 12px 48px rgba(0,0,0,0.2), 0 0 2px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.95)'
      : '0 12px 48px rgba(0,0,0,0.5), 0 0 2px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'};
  }
`;

const FloatingAboutTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.8px;
  text-shadow: 0 0 8px rgba(255,255,255,0.2);
  font-family: 'Moderat';
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// --- Creative, Sequential GlitchText ---
const LineReveal = styled.div`
  opacity: 0;
  transform: translateY(32px) scale(0.96);
  filter: blur(6px);
  animation: lineRevealAnim 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
  animation-delay: ${props => props.delay || 0}ms;
  margin-bottom: 0.6rem;
  
  @keyframes lineRevealAnim {
    0% {
      opacity: 0;
      transform: translateY(32px) scale(0.96);
      filter: blur(6px);
    }
    60% {
      filter: blur(0.5px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }
`;

// GlitchText now just renders the text, for compatibility
const GlitchText = ({ text, className }) => (
  <span 
    className={className} 
    style={{ 
      fontFamily: 'Moderat', 
      whiteSpace: 'pre-line', 
      display: 'block',
      fontSize: '0.8rem',
      lineHeight: '1.4'
    }}
  >
    {text}
  </span>
);

// SequentialReveal: animates paragraphs one after another, top-to-bottom
const SequentialReveal = ({ paragraphs }) => {
  const [current, setCurrent] = React.useState(0);
  return (
    <>
      {paragraphs.map((p, i) => (
        <LineReveal
          key={i}
          delay={i * 180}
          onAnimationEnd={() => { if (i === current) setCurrent(c => c + 1); }}
        >
          <GlitchText text={p} />
        </LineReveal>
      ))}
    </>
  );
};

// --- Experiments Floating Box Styles ---
const ExperimentsContainer = styled.div`
  position: relative;
  z-index: 2;
  color: ${props => props.isLight ? '#000' : '#fff'};
  padding: 1.2rem 1.5rem 1.8rem 1.5rem;
  min-width: 220px;
  max-width: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Moderat';
  
  h2 {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    font-weight: 500;
    letter-spacing: 0.8px;
    background: linear-gradient(135deg, 
      ${props => props.isLight ? '#000' : '#fff'} 0%, 
      ${props => props.isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 8px ${props => props.isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'};
    align-self: flex-start;
  }
`;

const ExperimentGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: -20px;
  gap: 0.8rem;
  width: 100%;
  font-family: 'Moderat';
`;

const ExperimentItem = styled.div`
  background: rgba(255, 255, 255, 0.06);
  padding: 0.8rem 1rem;
  border-radius: 15px;
  backdrop-filter: blur(15px);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Moderat';
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 200px !important;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255,255,255,0.4) 20%, 
      rgba(255,255,255,0.7) 50%, 
      rgba(255,255,255,0.4) 80%, 
      transparent 100%);
    border-radius: 15px 15px 0 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255,255,255,0.02) 50%, 
      transparent 100%);
    transition: left 0.6s ease;
  }
  
  h3 {
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
  }
  
  p {
    margin-bottom: 0.8rem;
    line-height: 1.5;
    font-size: 0.75rem;
    transition: color 0.3s ease;
  }
  
  small {
    opacity: 0.7;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px) scale(1.02);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 15px 30px rgba(0,0,0,0.3),
      0 0 15px rgba(255,255,255,0.08);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      left: 100%;
    }
    
    h3 {
      /* Removed hardcoded hover color - using inline styles for theme support */
    }
    
    p {
      /* Removed hardcoded hover color - using inline styles for theme support */
    }
    
    small {
      /* Removed hardcoded hover color - using inline styles for theme support */
    }
  }
  
  &:active {
    transform: translateY(-4px) scale(1.01);
  }
`;

// --- Contact Floating Box Styles ---
const ContactContainer = styled.div`
  color: ${props => props.isLight ? '#000' : '#fff'};
  min-width: 240px;
  max-width: 300px;
  width: 100%;
  padding: 1rem 1.2rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Moderat';
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 500;
    letter-spacing: 0.8px;
    background: linear-gradient(135deg, 
      ${props => props.isLight ? '#000' : '#fff'} 0%, 
      ${props => props.isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 8px ${props => props.isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'};
  }
`;

const EmailSection = styled.div`
  margin: 0.4rem 0 1.2rem 0;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: 'Moderat';
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 3px 15px rgba(0,0,0,0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255,255,255,0.3) 50%, 
      transparent 100%);
    border-radius: 12px 12px 0 0;
  }
`;

const EmailLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'Moderat';
  font-weight: 400;
  transition: all 0.3s ease;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    color: rgba(255,255,255,0.9);
    text-shadow: 0 0 8px rgba(255,255,255,0.3);
  }
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-top: 0.4rem;
  width: 100%;
  font-family: 'Moderat';
`;

const SocialCard = styled.a`
  background: rgba(255, 255, 255, 0.06);
  padding: 0.8rem 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.7rem;
  font-family: 'Moderat';
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255,255,255,0.1) 50%, 
      transparent 100%);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    color: rgba(255,255,255,0.95);
    
    &::before {
      left: 100%;
    }
  }
  
  span {
    font-weight: 500;
    letter-spacing: 0.2px;
  }
  
  svg {
    transition: transform 0.3s ease;
    width: 16px;
    height: 16px;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;

// --- Work Floating Box Styles ---
const WorkContainer = styled.div`
  color: ${props => props.isLight ? '#000' : '#fff'};
  min-width: 280px;
  max-width: 360px;
  width: 100%;
  padding: 1.2rem 1.5rem 1.6rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Moderat';
  
  h2 {
    font-size: 1rem;
    margin-bottom: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.6px;
    background: linear-gradient(135deg, 
      ${props => props.isLight ? '#000' : '#fff'} 0%, 
      ${props => props.isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 6px ${props => props.isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'};
  }
`;

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  width: 100%;
  font-family: 'Moderat';
`;

const WorkItem = styled.div`
  background: rgba(255, 255, 255, 0.06);
  padding: 1rem 1.2rem;
  border-radius: 12px;
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: 'Moderat';
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255,255,255,0.5) 20%, 
      rgba(255,255,255,0.8) 50%, 
      rgba(255,255,255,0.5) 80%, 
      transparent 100%);
    border-radius: 12px 12px 0 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255,255,255,0.03) 50%, 
      transparent 100%);
    transition: left 0.6s ease;
  }
  
  h3 {
    margin-bottom: 0.6rem;
    font-family: 'Moderat';
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.4px;
    transition: all 0.3s ease;
  }
  
  p {
    margin-bottom: 0.6rem;
    font-family: 'Moderat';
    line-height: 1.4;
    font-size: 0.7rem;
    transition: color 0.3s ease;
  }
  
  small {
    font-family: 'Moderat';
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 12px 25px rgba(0,0,0,0.4),
      0 0 12px rgba(255,255,255,0.1);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      left: 100%;
    }
    
    h3 {
      /* Removed hardcoded hover color - using inline styles for theme support */
    }
    
    p {
      /* Removed hardcoded hover color - using inline styles for theme support */
    }
    
    small {
      /* Removed hardcoded hover color - using inline styles for theme support */
    }
  }
  
  &:active {
    transform: translateY(-3px) scale(1.01);
  }
`;

// Add a styled component for the name badge
const NameBadge = styled.div`
  position: fixed;
  top: 26px;
  left: 37px;
  z-index: 300;
  font-family: 'Fleya', sans-serif;
  font-size: 1.35rem;
  color: #fff;
  letter-spacing: 1.2px;
  font-weight: 300;
  text-shadow: 0 2px 12px rgba(0,0,0,0.18), 0 0 2px #fff;
  pointer-events: none;
  user-select: none;
`;

// Add a styled component for the theme toggle button
const ThemeToggle = styled.button`
  position: fixed;
  bottom: 26px;
  right: 37px;
  z-index: 300;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
  }
  
  /* Light theme styles */
  ${props => props.isLight && css`
    background: rgba(255, 255, 255, 0.3);
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `}
`;

// Add a styled component for the rain toggle button after ThemeToggle
const RainToggle = styled.button`
  position: fixed;
  bottom: 26px;
  right: 89px; // Positioned to the left of the theme toggle
  z-index: 300;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
  }
  
  /* Light theme styles */
  ${props => props.isLight && css`
    background: rgba(255, 255, 255, 0.3);
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `}
  
  /* Active styles */
  ${props => props.isActive && css`
    background: ${props => props.isLight ? 'rgba(0, 120, 255, 0.2)' : 'rgba(0, 120, 255, 0.3)'};
    border: 1px solid ${props => props.isLight ? 'rgba(0, 80, 255, 0.4)' : 'rgba(0, 120, 255, 0.5)'};
    box-shadow: 0 0 10px rgba(0, 120, 255, 0.3);
  `}
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
  const isInitializedRef = useRef(isInitialized); // ADDED: Ref for isInitialized
  const [showAboutContent, setShowAboutContent] = React.useState(false);
  const [showExperimentsContent, setShowExperimentsContent] = React.useState(false);
  const [showContactContent, setShowContactContent] = React.useState(false);
  const [showWorkContent, setShowWorkContent] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState(location.pathname.substring(1)); // Track active section, initialized to route
  
  // Use global dark mode context instead of local state
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const isLightTheme = !isDarkMode;
  const isLightThemeRef = useRef(isLightTheme);
  
  // Update the ref when theme changes
  useEffect(() => {
    isLightThemeRef.current = isLightTheme;
  }, [isLightTheme]);
  
  // Function to toggle theme using global context
  const toggleTheme = () => {
    toggleDarkMode();
  };
  
  // Add rain state
  const [isRaining, setIsRaining] = useState(false);
  const isRainingRef = useRef(isRaining);
  
  // Update the ref when rain state changes
  useEffect(() => {
    isRainingRef.current = isRaining;
  }, [isRaining]);
  
  // Function to toggle rain
  const toggleRain = () => {
    setIsRaining(prev => !prev);
  };
  
  // Ref to store active section info for external access
  const activeSectionRef = useRef(null);
  // Initialize activeSectionRef to match the initial route
  useEffect(() => {
    activeSectionRef.current = location.pathname.substring(1);
  }, []);

  // Ref to track if the sketch instance is considered "alive"
  const isSketchInstanceAliveRef = useRef(true);
  
  // NEW: Ref for the wrapper div to attach manual click handler
  const wrapperDivRef = useRef(null);

  // About content
  const bioText = [
    "Parsa Azari is a designer turned developer based in Tehran.",
    "His practice spans film, motion graphics, and interaction design, evolving from traditional visual media to digital interfaces and creative coding that explore both aesthetic and functional dimensions of human-computer interaction.",
    "His work is informed by film theory, media studies, and art research, drawing connections between early cinema history and contemporary digital experiences to examine how technologies shape human perception and engagement.",
    "Azari was part of New Media Group, a research collective at Tehran Museum of Contemporary Art (TMoCA), and Beta performance art group. He holds a BA in Cinema from Soore University and an MA in Art Research from Iran University of Art."
  ];

  // Experiments content
  const experiments = [
    {
      title: "German Art Schools",
      description: "Exploration of German art education institutions and their influence",
      tech: "Interactive Web",
      url: "http://parsaa74.github.io/german-art-schools"
    },
    {
      title: "Semantic Biome",
      description: "Three-dimensional typographic ecosystem with autonomous entities",
      tech: "WebGL, 3D Canvas",
      url: "https://parsaa74.github.io/Semantic-Biome/index-3d.html"
    },
    {
      title: "3D Portfolio",
      description: "Interactive three-dimensional portfolio showcase with immersive navigation",
      tech: "Three.js, WebGL",
      url: "#"
    },
    // Add more experiments as needed
  ];

  // Contact content
  const contactEmail = 'parsaazari28@proton.me';
  const socialLinks = [
    {
      name: 'Email',
      url: 'mailto:parsaazari28@proton.me',
      icon: <Mail size={22} />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/parsaa74',
      icon: <Github size={22} />,
    },
    {
      name: 'X',
      url: 'https://x.com/sighpaaa',
      icon: <SiX size={22} />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/parsaazari/',
      icon: <Linkedin size={22} />,
    },
    {
      name: 'Vimeo',
      url: 'https://vimeo.com/parsaazari',
      icon: <SiVimeo size={22} />,
    },
    {
      name: 'Bluesky',
      url: 'https://bsky.app/profile/sighpaa.bsky.social',
      icon: <SiBluesky size={22} />,
    },
    {
      name: 'Mastodon',
      url: 'https://mastodon.social/@parsaaz',
      icon: <SiMastodon size={22} />,
    },
    {
      name: 'Are.na',
      url: 'https://www.are.na/parsa-azari/',
      icon: <div style={{ width: 22, height: 22, position: 'relative' }}><ArenaLogoIcon /></div>,
    },
  ];

  // Work content
  const projects = [
    {
      title: "Solo Performances",
      description: "Individual performance art pieces exploring themes of identity and perception",
      year: "2016-2018",
      route: "/work/solo-performances"
    },
    {
      title: "Group Performances",
      description: "Collaborative performance art with Beta Performance Group and other collectives",
      year: "2015-2018",
      route: "/work/group-performances"
    },
    {
      title: "Film Practices",
      description: "Work in cinema as actor and cinematographer",
      year: "2017-2019",
      route: "/work/film-practices"
    }
  ];

  // Function to hide all floating boxes
  const hideAllFloatingBoxes = () => {
    setShowAboutContent(false);
    setShowExperimentsContent(false);
    setShowWorkContent(false);
    setShowContactContent(false);
  };

  // Custom click handler for the wrapper div
  const handleClick = (e) => {
    if (!isInitializedRef.current || !activeSectionRef.current || !activeSectionRef.current.navPoints) {
      console.warn("Click handler: component not fully initialized yet");
      return;
    }
    // Get the relative position within the component
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Translate to p5's coordinate system (centered)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const relX = x - centerX;
    const relY = y - centerY;
    // Check if click is on any nav point
    const navPoints = activeSectionRef.current.navPoints;
    let clickedNav = false;
    for (const point of navPoints) {
      const distance = Math.sqrt(
        Math.pow(relX - point.x, 2) + 
        Math.pow(relY - point.y, 2)
      );
      if (distance < 60 * 1.5) { // navItemSize * 1.5
        console.log("Clicked on nav point:", point.id);
        handleSectionClick(point.id);
        clickedNav = true;
        return;
      }
    }
    // If not clicked on any nav point, just hide floating boxes
    if (!clickedNav && isInitializedRef.current) {
      hideAllFloatingBoxes();
    }
  };

  // Check if we're on the About page
  useEffect(() => {
    const isAboutPage = location.pathname === '/about';
    setShowAboutContent(isAboutPage);
    
    // Remove zoom logic - just show content based on page
    if (isAboutPage && isInitialized) {
      console.log("TVirusBackground: Showing 'about' section");
    }
  }, [location.pathname, isInitialized]);

  // ADDED: Effect to keep isInitializedRef in sync
  useEffect(() => {
    isInitializedRef.current = isInitialized;
  }, [isInitialized]);

  // Keep activeSectionRef in sync with activeSection
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Function to directly handle section clicks from inside or outside the component
  const handleSectionClick = (sectionId) => {
    console.log("TVirusBackground: handleSectionClick", sectionId);
    
    // Set debug mode
    setDebug(true);
    
    // Set the active section
    setActiveSection(sectionId);
    
    // Show appropriate content based on section
    if (sectionId === 'about') {
      setShowAboutContent(true);
      setShowExperimentsContent(false);
      setShowWorkContent(false);
      setShowContactContent(false);
    } else if (sectionId === 'experiments') {
      setShowAboutContent(false);
      setShowExperimentsContent(true);
      setShowWorkContent(false);
      setShowContactContent(false);
    } else if (sectionId === 'work') {
      setShowAboutContent(false);
      setShowExperimentsContent(false);
      setShowWorkContent(true);
      setShowContactContent(false);
    } else if (sectionId === 'contact') {
      setShowAboutContent(false);
      setShowExperimentsContent(false);
      setShowWorkContent(false);
      setShowContactContent(true);
    } else if (sectionId === 'home') {
      // Home resets everything
      setShowAboutContent(false);
      setShowExperimentsContent(false);
      setShowWorkContent(false);
      setShowContactContent(false);
      setDebug(false);
    } else {
      // For any other section, hide all content
      setShowAboutContent(false);
      setShowExperimentsContent(false);
      setShowWorkContent(false);
      setShowContactContent(false);
    }
    
    // Call the onSectionClick prop if provided
    if (onSectionClick && typeof onSectionClick === 'function') {
      console.log("Calling onSectionClick with:", sectionId);
      onSectionClick(sectionId);
    }
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    // Method to programmatically handle section clicks
    goToSection: (sectionId) => {
      console.log("Ref.goToSection called for", sectionId);
      handleSectionClick(sectionId);
    },
    // Get all the current navigation points
    getNavPoints: () => {
      return activeSectionRef.current?.navPoints || [];
    }
  }), []);

  // --- p5 setup effect: only run on mount ---
  useEffect(() => {
    // When this effect runs (or re-runs), the sketch instance is considered alive.
    isSketchInstanceAliveRef.current = true;
    // --- Customizable Parameters with Defaults ---
    // Define themes
    const darkTheme = {
      backgroundColor: '#000000',
      startColor: '#FFFFFF',
      endColor: '#323232',
      centralPointColor: '#E6E6E6',
      navActiveColor: '#FFFFFF',
      navInactiveColor: '#888888',
      navHoverColor: '#BBBBBB',
    };
    
    const lightTheme = {
      backgroundColor: '#FFFFFF',
      startColor: '#000000',
      endColor: '#CCCCCC',
      centralPointColor: '#333333',
      navActiveColor: '#000000',
      navInactiveColor: '#555555',
      navHoverColor: '#333333',
    };
    
    const {
      maxRecursionLevel = 4,
      rootBranchCount = 30,
      initialMinLength = 30,
      initialMaxLength = 100,
      childLengthMultiplierMin = 0.7,
      childLengthMultiplierMax = 0.85,
      springStrength = 0.5,
      windSpeedFactor = 0.005,
      windStrengthMultiplier = 0.1, // Adjusted default for more subtle wind
      dragFactor = 0.95,
      maxBendAngle = 45,
      mouseInfluenceRadius = 150,
      mouseForceStrength = 1.5,
      regenerateOnClick = true,
      showCentralPoint = false,
      centralPointSize = 25,
      initialDebugState = false,
      // Navigation parameters
      navItemSize = 60,  // Increased from 50 to 60 for better visibility and clickability
      navSelectedOpacity = 1.0,
      navUnselectedOpacity = 0.7,
      navTextSize = 18,  // Increased from 16 to 18 for better readability
      navInfluenceRadius = 120, // Radius around nav points that influences branches
      navForceStrength = 1.0, // Strength of force applied by nav points
      // Transition effects
      enableTransitionEffects = true,
      transitionDuration = 800,
    } = props;

    // Get current path
    const currentPath = location.pathname.substring(1); // Remove leading slash

    // List of nav section ids for debug mode
    const navSectionIds = navSections.map(section => section.id); // Use imported navSections here

    let R_start, G_start, B_start;
    let R_end, G_end, B_end;
    let R_central, G_central, B_central;
    let R_active, G_active, B_active;
    let R_inactive, G_inactive, B_inactive;
    let R_hover, G_hover, B_hover;

    // --- Sketch Code from sketch762695 ---
    // let maxLevel = 4; // Now maxRecursionLevel
    // let branchForce = 0.5; // Now springStrength
    let rootBranches = [];
    let navPoints = [];
    let navBranches = []; // Special branches for navigation
    
    // Safe cursor function to avoid "elt" errors
    function setCursorSafely(p, cursorType) {
      try {
        if (p && p.cursor) {
          if (p.canvas && p.canvas.elt) {
            // Add check for DOM connection
            if (typeof p.canvas.elt.isConnected === 'boolean' && !p.canvas.elt.isConnected) {
              console.warn(
                `setCursorSafely: Not attempting p.cursor(${cursorType}) because p.canvas.elt is not connected to the DOM.`
              );
              return; // Don't proceed if not connected
            }
            try {
              p.cursor(cursorType);
            } catch (innerE) {
              console.warn(
                `setCursorSafely: Inner error during p.cursor(${cursorType}). ` +
                `p.canvas: ${p.canvas}, p.canvas.elt: ${p.canvas ? String(p.canvas.elt) : 'p.canvas is null'}, isConnected: ${p.canvas && p.canvas.elt ? p.canvas.elt.isConnected : 'N/A'}. Error:`, innerE
              );
            }
          } else {
            console.warn(
              `setCursorSafely: Not attempting p.cursor(${cursorType}) because ` +
              `p.canvas is ${p.canvas} or p.canvas.elt is ${p.canvas ? String(p.canvas.elt) : 'p.canvas is null'}.`
            );
          }
        } else {
          console.warn(`setCursorSafely: p or p.cursor is not available.`);
        }
      } catch (e) {
        // This outer catch is a fallback, should ideally not be reached if inner checks are robust.
        console.error(
          `setCursorSafely: Outer error for p.cursor(${cursorType}). ` +
          `p.canvas: ${p.canvas}, p.canvas.elt: ${p.canvas ? String(p.canvas.elt) : 'p.canvas is null'}. Error:`, e
        );
      }
    }

    // State tracking for transitions
    let isTransitioning = false;
    let transitionProgress = 0;
    let transitionStartTime = 0;
    let transitionFromPath = '';
    let transitionToPath = '';
    
    // State tracking for hover
    let hoveredNavId = null;
    
    // Branch.js.js content
    function Branch(length, angle, level, p) {
      this.p = p; 
      this.vel = 0;
      this.acc = 0;
      this.level = level;
      this.angle = angle;
      this.restAngle = angle;
      this.length = length;
      this.children = [];
      this.index = p.random(10000);
      this.isNavBranch = false;
      this.navId = null;
      this.navLabel = null;

      this.newBranch = function (angleVal, mult) {
        let newBranch = new Branch(this.length * mult, angleVal, this.level + 1, this.p);
        this.children.push(newBranch);
        return newBranch;
      };

      this.applyForce = function (forceVal) {
        this.acc += forceVal;
      };

      this.move = function () {
        let windMult = this.p.map(this.level, 0, maxRecursionLevel, windStrengthMultiplier, 1) * this.p.random(0.75, 1.25);
        // Reduce wind effect on navigation branches
        if (this.isNavBranch) {
          windMult *= 0.5;
        }
        let wind = this.p.noise((this.p.frameCount + this.index) * windSpeedFactor) * windMult;
        this.applyForce(wind);

        let angleThresh = 10;
        let spring = this.p.createVector(this.restAngle, 0);
        let distance = this.p.dist(this.angle, 0, this.restAngle, 0);
        let effectiveSpringForce = this.p.map(this.p.min(distance, angleThresh), 0, angleThresh, 0, springStrength);
        
        // Increase spring force for navigation branches to keep them more stable
        if (this.isNavBranch) {
          effectiveSpringForce *= 1.5;
        }

        spring.sub(this.p.createVector(this.angle, 0));
        spring.normalize();
        spring.mult(effectiveSpringForce);
        this.applyForce(spring.x);

        this.vel *= dragFactor;
        this.vel += this.acc;
        this.angle += this.vel;
        
        // Constrain angle more tightly for navigation branches
        const maxAngleDeviation = this.isNavBranch ? maxBendAngle * 0.5 : maxBendAngle;
        this.angle = this.p.constrain(this.angle, this.restAngle - maxAngleDeviation, this.restAngle + maxAngleDeviation);
        
        this.acc = 0;
      };
    }

    // Utils.js.js content
    function subDivide(branch, p) {
      let newBranches = [];
      let newBranchCount = p.int(p.random(1, 4)); // Keep this simple for now, could be prop
      
      if (newBranchCount === 2) {
        newBranches.push(branch.newBranch(p.random(-45.0, -10.0), p.random(childLengthMultiplierMin, childLengthMultiplierMax)));
        newBranches.push(branch.newBranch(p.random(10.0, 45.0), p.random(childLengthMultiplierMin, childLengthMultiplierMax)));
      } else if (newBranchCount === 3) {
        newBranches.push(branch.newBranch(p.random(-45.0, -15.0), p.random(childLengthMultiplierMin, childLengthMultiplierMax)));
        newBranches.push(branch.newBranch(p.random(-10.0, 10.0), p.random(childLengthMultiplierMin, childLengthMultiplierMax)));
        newBranches.push(branch.newBranch(p.random(15.0, 45.0), p.random(childLengthMultiplierMin, childLengthMultiplierMax)));
      } else {
        newBranches.push(branch.newBranch(p.random(-45.0, 45.0), p.random(childLengthMultiplierMin, childLengthMultiplierMax)));
      }

      for (let i = 0; i < newBranches.length; i++) {
        if (newBranches[i].level < maxRecursionLevel) {
          subDivide(newBranches[i], p);
        }
      }
    }

    function generateNewTree(p) {
      rootBranches = [];
      navPoints = [];
      navBranches = [];
      
      // First create navigation branches at specific angles
      navSectionsWithAngles.forEach(section => { // Use navSectionsWithAngles here
        // Create a longer branch for navigation items
        const navBranchLength = p.random(initialMaxLength * 1.5, initialMaxLength * 2.5);
        let navBranch = new Branch(navBranchLength, section.angle, 0, p);
        navBranch.isNavBranch = true;
        navBranch.navId = section.id;
        navBranch.navLabel = section.label;
        
        // Add to root branches
        rootBranches.push(navBranch);
      });
      
      // Then create regular branches to fill in the gaps
      const angleIncrement = 360 / (rootBranchCount - navSectionsWithAngles.length); // Use navSectionsWithAngles here
      for (let a = 0; a < 360; a += angleIncrement) {
        // Skip angles that are too close to navigation branches
        let tooClose = false;
        for (let i = 0; i < navSectionsWithAngles.length; i++) { // Use navSectionsWithAngles here
          const angleDiff = Math.abs(a - navSectionsWithAngles[i].angle); // Use navSectionsWithAngles here
          if (angleDiff < 15 || 360 - angleDiff < 15) {
            tooClose = true;
            break;
          }
        }
        
        if (!tooClose) {
          let newBranch = new Branch(p.random(initialMinLength, initialMaxLength), a, 0, p);
          rootBranches.push(newBranch);
          subDivide(newBranch, p);
        }
      }
    }

    function treeIterator(branch, worldX, worldY, worldA, p) {
      worldA += branch.angle;
      let vec = p.createVector(branch.length, 0);
      vec.rotate(p.radians(worldA));

      worldX += vec.x;
      worldY += vec.y;

      p.push();
      
      // Special styling for navigation branches
      if (branch.isNavBranch) {
        // Store the end position of this nav branch for later use
        if (branch.navId !== null) {
          // Use activeSectionRef.current for real-time active state
          const isActive = branch.navId === activeSectionRef.current;
          const isHovered = hoveredNavId === branch.navId;
          
          // Update or add to navPoints
          const existingPointIndex = navPoints.findIndex(p => p.id === branch.navId);
          if (existingPointIndex >= 0) {
            navPoints[existingPointIndex].x = worldX;
            navPoints[existingPointIndex].y = worldY;
            navPoints[existingPointIndex].isActive = isActive;
            navPoints[existingPointIndex].isHovered = isHovered;
          } else {
            navPoints.push({
              x: worldX,
              y: worldY,
              id: branch.navId,
              label: branch.navLabel,
              radius: navItemSize,
              isActive: isActive,
              isHovered: isHovered
            });
          }
          
          // Enhanced styling for active/hovered branches
          if (isActive) {
            // Active branch gets bright white with glow
            p.stroke(255, 255, 255);
            p.strokeWeight(4.5); // Thicker for active state
            // Add a subtle glow effect around active branches
            p.drawingContext.shadowColor = 'rgba(255, 255, 255, 0.6)';
            p.drawingContext.shadowBlur = 15;
          } else if (isHovered) {
            // Hovered branch gets enhanced visibility
            p.stroke(255, 255, 255, 200);
            p.strokeWeight(3.5);
            p.drawingContext.shadowColor = 'rgba(255, 255, 255, 0.4)';
            p.drawingContext.shadowBlur = 10;
          } else {
            // Regular nav branch
            p.stroke(255, 255, 255, 160);
            p.strokeWeight(2.5);
            p.drawingContext.shadowBlur = 0; // No shadow for inactive
          }
        }
      } else {
        // Regular branch coloring
        const lerpAmount = p.map(branch.level, 0, maxRecursionLevel, 0, 1);
        const currentR = p.lerp(R_start, R_end, lerpAmount);
        const currentG = p.lerp(G_start, G_end, lerpAmount);
        const currentB = p.lerp(B_start, B_end, lerpAmount);
        p.stroke(currentR, currentG, currentB);
        p.strokeWeight(p.map(branch.level, 0, maxRecursionLevel, 5, 1));
      }
      
      let interactionPointX = worldX + p.width / 2;
      let interactionPointY = worldY + p.height / 2;

      // Mouse influence
      let d = p.dist(p.mouseX, p.mouseY, interactionPointX, interactionPointY);
      
      // Reduce mouse influence on navigation branches
      const effectiveMouseRadius = branch.isNavBranch ? mouseInfluenceRadius * 0.6 : mouseInfluenceRadius;
      const effectiveMouseStrength = branch.isNavBranch ? mouseForceStrength * 0.5 : mouseForceStrength;
      
      if (d < effectiveMouseRadius) {
          let forceVal = p.map(d, 0, effectiveMouseRadius, effectiveMouseStrength, 0);
          if (p.mouseX > interactionPointX) { 
               forceVal *= -1;
          }
          forceVal *= p.map(branch.level, 0, maxRecursionLevel, 0.2, 1);
          branch.applyForce(forceVal);

          if (debugRef.current) {
              p.stroke(255, 0, 0); // Highlight color for debug
          }
      }
      
      // Navigation point influence - branches are attracted to active nav point
      for (let i = 0; i < navPoints.length; i++) {
        const navPoint = navPoints[i];
        if (navPoint.isActive || navPoint.isHovered) {
          const navX = navPoint.x + p.width / 2;
          const navY = navPoint.y + p.height / 2;
          const navDist = p.dist(interactionPointX, interactionPointY, navX, navY);
          
          if (navDist < navInfluenceRadius) {
            // Force direction depends on the difference between branch and nav point coordinates
            const forceX = navX - interactionPointX;
            const forceY = navY - interactionPointY;
            const angle = p.atan2(forceY, forceX);
            
            // Project onto branch's angle axis
            const angleDiff = angle - p.radians(worldA);
            
            // Apply force with strength inversely proportional to distance
            const navForce = p.map(navDist, 0, navInfluenceRadius, navForceStrength, 0);
            const mappedForce = navForce * p.cos(angleDiff) * p.map(branch.level, 0, maxRecursionLevel, 1, 0.3);
            
            branch.applyForce(mappedForce);
            
            if (debugRef.current) {
              p.stroke(0, 255, 0); // Green for nav influence in debug mode
            }
          }
        }
      }

      branch.move();
      p.rotate(p.radians(branch.angle));
      p.line(0, 0, branch.length, 0);
      
      // Reset shadow effect after drawing the line
      p.drawingContext.shadowBlur = 0;

      if (debugRef.current) {
        if (d < mouseInfluenceRadius) { 
             p.stroke(0, 255, 0);
             p.strokeWeight(5);
             p.point(0, 0);
        }
      }

      p.translate(branch.length, 0);
      
      // Draw navigation label at the end of nav branches
      if (branch.isNavBranch && branch.navLabel) {
        p.push();
        p.noStroke();
        // Draw background circle for nav point
        if (branch.navId === activeSectionRef.current) {
          // Active state with pulsing effect
          const pulseSize = p.map(p.sin(p.frameCount * 0.05), -1, 1, 0.9, 1.1);
          p.fill(R_active, G_active, B_active, navSelectedOpacity * 255);
          p.circle(0, 0, navItemSize * pulseSize);
          // Add a subtle glow effect for active state
          p.noFill();
          p.stroke(R_active, G_active, B_active, 100);
          p.strokeWeight(2);
          p.circle(0, 0, navItemSize * pulseSize * 1.2);
        } else if (hoveredNavId === branch.navId) {
          // Hover state
          p.fill(R_hover, G_hover, B_hover, 200);
          p.circle(0, 0, navItemSize * 1.1);
          // Add a subtle hover glow
          p.noFill();
          p.stroke(R_hover, G_hover, B_hover, 150);
          p.strokeWeight(2);
          p.circle(0, 0, navItemSize * 1.3);
        } else {
          // Inactive state
          p.fill(R_inactive, G_inactive, B_inactive, navUnselectedOpacity * 255);
          p.circle(0, 0, navItemSize);
        }
        // Draw text label with slight shadow for better contrast
        // Counter-rotate so text is always horizontal
        p.push();
        p.rotate(-p.radians(worldA));
        

        
        p.textSize(navTextSize);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('Moderat');
        // Add subtle text shadow for better contrast
        if (isLightThemeRef.current) {
          p.fill(255, 255, 255, 100); // White shadow in light mode
          p.text(branch.navLabel, 2, 2);
          p.fill(0); // Black text in light mode
        } else {
          p.fill(0, 0, 0, 100); // Black shadow in dark mode
          p.text(branch.navLabel, 2, 2);
          p.fill(255); // White text in dark mode
        }
        p.text(branch.navLabel, 0, 0);
        p.pop();
        p.pop();
      }
      
      for (let i = 0; i < branch.children.length; i++) {
        treeIterator(branch.children[i], worldX, worldY, worldA, p); 
      }
      p.pop();
    }

    // Make checkNavHover more defensive
    function checkNavHover(p) {
      // Return early if p5 instance or canvas isn't ready
      if (!p || !p.canvas || !p.canvas.elt) {
        return null; // Return null to indicate no hover detected
      }
      
      // Also return if navPoints isn't initialized
      if (!navPoints || !Array.isArray(navPoints) || navPoints.length === 0) {
        return null; // Return null to indicate no hover detected
      }
      
      let currentHoveredId = null;
      
      for (let i = 0; i < navPoints.length; i++) {
        const point = navPoints[i];
        const d = p.dist(p.mouseX - p.width / 2, p.mouseY - p.height / 2, point.x, point.y);
        
        // Increase the hover detection radius for better usability
        if (d < navItemSize * 1.5) {  // Increased from 1.2 to 1.5 for easier detection
          currentHoveredId = point.id;
          // Trigger a special effect when hovering
          p.push();
          p.translate(p.width / 2, p.height / 2);
          p.noFill();
          p.stroke(255, 255, 255, 150);
          p.strokeWeight(3);
          p.circle(point.x, point.y, navItemSize * 1.8);  // Increased from 1.5 to 1.8 for better visibility
          p.pop();
          
          // Change cursor to pointer when over a nav point
          setCursorSafely(p, p.HAND);
          
          break;
        }
      }
      
      // Reset cursor if not hovering over any nav point
      if (currentHoveredId === null) {
        setCursorSafely(p, p.ARROW);
      }
      
      // Update isHovered state for all points
      for (let i = 0; i < navPoints.length; i++) {
        navPoints[i].isHovered = (navPoints[i].id === currentHoveredId);
      }
      
      // Return the hovered ID for external use
      return currentHoveredId;
    }

    const sketch = (p) => {
      // Add zoom state variables
      let zoomTarget = null;
      let zoomLevel = 1;
      let zoomCenterX = 0;
      let zoomCenterY = 0;
      let targetZoomLevel = 1;
      let isZooming = false;
      
      // Add a variable to track last theme state
      let lastThemeState = isLightThemeRef.current;

      // Add rain system variables
      let raindrops = [];
      const maxRaindrops = 500;
      const defaultRainIntensity = 0.6; // Default rain intensity (0-1)
      let rainIntensity = defaultRainIntensity;
      
      // Helper function for creating raindrops
      function createRaindrop(vis_wx_min_arg, vis_wx_max_arg, vis_wy_min_arg) {
        const isLightTheme = isLightThemeRef.current;
        return {
          x: p.random(vis_wx_min_arg, vis_wx_max_arg),
          y: p.random(vis_wy_min_arg - 100, vis_wy_min_arg - 10),
          length: p.random(10, 30),
          speed: p.random(5, 15),
          thickness: p.random(0.5, 2),
          color: isLightTheme ? p.color(0, 0, 0, p.random(40, 100)) : p.color(255, 255, 255, p.random(40, 100))
        };
      }
      
      // Function to populate initial raindrops
      function initRain() {
        raindrops = [];
        // Calculate visible world boundaries (now just screen boundaries)
        const vis_wx_min = -p.width / 2;
        const vis_wx_max = p.width / 2;
        const vis_wy_min = -p.height / 2;
        const vis_wy_max = p.height / 2;

        // Add some initial raindrops throughout the canvas
        for (let i = 0; i < maxRaindrops * 0.3; i++) {
          const raindrop = createRaindrop(vis_wx_min, vis_wx_max, vis_wy_min);
          // Distribute initial raindrops throughout the visible canvas height
          raindrop.y = p.random(vis_wy_min, vis_wy_max);
          raindrops.push(raindrop);
        }
      }
      
      // Function to update and draw raindrops
      function updateAndDrawRain() {
        if (!isRainingRef.current) return;

        // Calculate visible world boundaries (now just screen boundaries)
        const vis_wx_min = -p.width / 2;
        const vis_wx_max = p.width / 2;
        const vis_wy_min = -p.height / 2;
        const vis_wy_max = p.height / 2;
        
        // Add new raindrops based on intensity
        if (raindrops.length < maxRaindrops * rainIntensity && p.random() < rainIntensity * 0.4) {
          raindrops.push(createRaindrop(vis_wx_min, vis_wx_max, vis_wy_min));
        }
        
        // Update and draw each raindrop
        for (let i = raindrops.length - 1; i >= 0; i--) {
          const drop = raindrops[i];
          
          // Update position
          drop.y += drop.speed;
          
          // Draw raindrop as a line
          p.push();
          p.stroke(drop.color);
          p.strokeWeight(drop.thickness);
          p.line(drop.x, drop.y, drop.x, drop.y - drop.length);
          
          // Optional: Add a small splash effect when the raindrop hits bottom
          if (drop.y > vis_wy_max) {
            if (p.random() < 0.3) { // Only some drops create a visible splash
              p.noStroke();
              p.fill(drop.color);
              p.circle(drop.x, vis_wy_max, p.random(1, 3)); 
            }
            
            // Remove the raindrop
            raindrops.splice(i, 1);
          }
          p.pop();
        }
      }
      
      // Define zoom methods explicitly before setup
      // This ensures they're available on the p5 instance
      p.zoomToPoint = (x, y) => {
        console.log("zoomToPoint called", { x, y });
        zoomTarget = { x, y };
        targetZoomLevel = 1.4; // Reduced from 3.5 to 1.4 for subtle zoom
        isZooming = true;
        
        // Add a visual indicator when zooming
        p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasRef.current);
      };
      
      p.resetZoom = () => {
        console.log("resetZoom called");
        zoomTarget = null;
        targetZoomLevel = 1;
        isZooming = true;
        
        // Re-create canvas to make sure all updates apply
        p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasRef.current);
      };

      // Wrapper for zoomToSection
      p.zoomToSection = (sectionId) => {
        console.log("zoomToSection called for", sectionId);
        const navPoint = navPoints.find(point => point.id === sectionId);
        if (navPoint) {
          console.log("Found navPoint:", navPoint);
          p.zoomToPoint(navPoint.x, navPoint.y);
        } else {
          console.error("No navPoint found for section ID:", sectionId);
          console.log("Available navPoints:", navPoints);
        }
      };

      // Add method to update theme colors
      p.updateThemeColors = () => {
        console.log("Updating theme colors to:", isLightThemeRef.current ? "light" : "dark");
        
        // Get current theme based on isLightThemeRef
        const currentTheme = isLightThemeRef.current ? lightTheme : darkTheme;
        
        // Update background color
        p.background(currentTheme.backgroundColor);
        
        // Parse colors to RGB components for lerping
        const startP5Color = p.color(currentTheme.startColor);
        R_start = p.red(startP5Color);
        G_start = p.green(startP5Color);
        B_start = p.blue(startP5Color);

        const endP5Color = p.color(currentTheme.endColor);
        R_end = p.red(endP5Color);
        G_end = p.green(endP5Color);
        B_end = p.blue(endP5Color);

        const centralP5Color = p.color(currentTheme.centralPointColor);
        R_central = p.red(centralP5Color);
        G_central = p.green(centralP5Color);
        B_central = p.blue(centralP5Color);
        
        // Parse navigation colors
        const activeNavColor = p.color(currentTheme.navActiveColor);
        R_active = p.red(activeNavColor);
        G_active = p.green(activeNavColor);
        B_active = p.blue(activeNavColor);
        
        const inactiveNavColor = p.color(currentTheme.navInactiveColor);
        R_inactive = p.red(inactiveNavColor);
        G_inactive = p.green(inactiveNavColor);
        B_inactive = p.blue(inactiveNavColor);
        
        const hoverNavColor = p.color(currentTheme.navHoverColor);
        R_hover = p.red(hoverNavColor);
        G_hover = p.green(hoverNavColor);
        B_hover = p.blue(hoverNavColor);
        
        // Regenerate tree with new colors
        generateNewTree(p);
        
        // Reset last theme state
        lastThemeState = isLightThemeRef.current;
      };

      p.setup = () => {
        // Create canvas and store the canvas element reference
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        
        // Ensure we have a valid reference to the container before setting parent
        if (canvasRef.current) {
          canvas.parent(canvasRef.current);
        } else {
          console.warn("Canvas container ref is not available");
        }
        
        // Load Moderat font for consistent text rendering
        p.textFont('Moderat');
        
        // Initialize cursor to ensure it's ready (and catch any error)
        setCursorSafely(p, p.ARROW);
        
        // Initialize theme colors
        p.updateThemeColors();
        
        // Initialize raindrops
        initRain();
        
        // Signal that initialization is complete after a delay to ensure everything is ready
        setTimeout(() => {
          setIsInitialized(true);
          console.log("TVirusBackground is fully initialized");
        }, 500);
      };

      p.draw = () => {
        // Check if theme has changed
        if (lastThemeState !== isLightThemeRef.current) {
          p.updateThemeColors();
        }
        
        // Get current theme
        const currentTheme = isLightThemeRef.current ? lightTheme : darkTheme;
        p.background(currentTheme.backgroundColor);
        
        // Check for navigation hover only if canvas is initialized
        if (p.canvas && p.canvas.elt && navPoints && Array.isArray(navPoints) && navPoints.length > 0) {
          hoveredNavId = checkNavHover(p);
        }
        
        p.push();
        // Apply basic transformation (center origin)
        p.translate(p.width / 2, p.height / 2);
        
        for (let i = 0; i < rootBranches.length; i++) {
          treeIterator(rootBranches[i], 0, 0, 0, p); 
        }
        
        if (showCentralPoint) {
            p.stroke(R_central, G_central, B_central);
            p.strokeWeight(centralPointSize);
            p.point(0,0);
        }
        
        // Draw transition effects
        drawTransitionEffect(p);
        
        // Draw rain
        updateAndDrawRain();
        
        p.pop();
        
        // Draw ripples (in screen coordinates)
        updateAndDrawRipples();
        
        // Update ref with current state for external access
        activeSectionRef.current = {
          navPoints,
          navSections: navSectionsWithAngles,
          debug,
          currentPath
        };
      };

      p.mousePressed = () => {
        // We'll now just use checkNavHover for hovering effects
        // and rely on our custom click handler for actual clicks
        if (!isSketchInstanceAliveRef.current || !isInitializedRef.current) {
          return;
        }
        if (!p.canvas || !p.canvas.elt) {
          console.warn("mousePressed: Canvas not available");
          return;
        }
        
        // Just update hover state, don't handle clicks
        checkNavHover(p);
      };
      
      p.mouseMoved = () => {
        if (!isSketchInstanceAliveRef.current || !isInitializedRef.current) {
          return;
        }
        if (!p.canvas || !p.canvas.elt) {
          return;
        }
        
        // Just update hover state
        hoveredNavId = checkNavHover(p);
      };
      
      // Helper function for creating ripple effect
      let ripples = [];
      
      function createRipple(p, x, y, color) {
        ripples.push({
          x,
          y,
          radius: 10,
          maxRadius: 300,
          color,
          alpha: 255
        });
      }
      
      // Animation loop will handle drawing and updating ripples
      function updateAndDrawRipples() {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const ripple = ripples[i];
          
          // Draw ripple
          p.push();
          p.noFill();
          
          p.stroke(p.red(ripple.color), p.green(ripple.color), p.blue(ripple.color), ripple.alpha);
          p.strokeWeight(2);
          p.circle(ripple.x, ripple.y, ripple.radius * 2);
          
          // Update ripple
          ripple.radius += 5;
          ripple.alpha *= 0.95;
          
          // Remove ripple if it's too large or transparent
          if (ripple.radius > ripple.maxRadius || ripple.alpha < 5) {
            ripples.splice(i, 1);
          }
          
          p.pop();
        }
      }
      
      // Helper function to trigger transition
      function startTransition(fromPath, toPath) {
        if (!enableTransitionEffects) return;
        
        isTransitioning = true;
        transitionProgress = 0;
        transitionStartTime = Date.now();
        transitionFromPath = fromPath;
        transitionToPath = toPath;
      }
      
      // Function to draw transition effects
      function drawTransitionEffect(p) {
        if (!isTransitioning) return;
        
        // Set font to Moderat for any text in transitions
        p.textFont('Moderat');
        
        const now = Date.now();
        transitionProgress = Math.min(1.0, (now - transitionStartTime) / transitionDuration);
        
        if (transitionProgress >= 1.0) {
          isTransitioning = false;
          return;
        }
        
        // Find the indices for from and to nav points
        const fromIndex = navPoints.findIndex(point => point.id === transitionFromPath);
        const toIndex = navPoints.findIndex(point => point.id === transitionToPath);
        
        if (fromIndex === -1 || toIndex === -1) {
          isTransitioning = false;
          return;
        }
        
        const fromPoint = navPoints[fromIndex];
        const toPoint = navPoints[toIndex];
        
        // Draw transition beam
        p.push();
        
        // Use a bezier curve to create an arcing path
        const bezierControl1X = fromPoint.x * 0.2;
        const bezierControl1Y = fromPoint.y * 0.2;
        const bezierControl2X = toPoint.x * 0.2;
        const bezierControl2Y = toPoint.y * 0.2;
        
        // Determine how far along the path to draw
        const progressSteps = Math.floor(transitionProgress * 30); // Number of segments
        
        // Gradient color from source to destination
        for (let i = 0; i < progressSteps; i++) {
          const t = i / progressSteps;
          const nextT = (i + 1) / progressSteps;
          
          // Calculate current and next points on bezier curve
          const x1 = p.bezierPoint(fromPoint.x, bezierControl1X, bezierControl2X, toPoint.x, t);
          const y1 = p.bezierPoint(fromPoint.y, bezierControl1Y, bezierControl2Y, toPoint.y, t);
          const x2 = p.bezierPoint(fromPoint.x, bezierControl1X, bezierControl2X, toPoint.x, nextT);
          const y2 = p.bezierPoint(fromPoint.y, bezierControl1Y, bezierControl2Y, toPoint.y, nextT);
          
          // Color interpolation
          const colorT = t * transitionProgress; // Fade color based on both position and overall progress
          const r = p.lerp(R_active, R_hover, colorT);
          const g = p.lerp(G_active, G_hover, colorT);
          const b = p.lerp(B_active, B_hover, colorT);
          const a = p.map(t, 0, 1, 255, 50); // Fade alpha along the path
          
          // Draw the segment
          p.stroke(r, g, b, a * (1 - t)); // Fade out towards the end
          p.strokeWeight(p.map(t, 0, 1, 4, 1)); // Thinner towards the end
          p.line(x1, y1, x2, y2);
          
          // Add particle effects
          if (i % 3 === 0 && p.random() > 0.7) {
            const particleSize = p.random(2, 5) * (1 - t);
            p.fill(r, g, b, a);
            p.noStroke();
            p.circle(x1, y1, particleSize);
          }
        }
        
        p.pop();
      }

      p.windowResized = () => {
        try {
          // Only resize if canvas exists
          if (p.canvas && p.canvas.elt) {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
            generateNewTree(p);
          } else {
            console.warn("Canvas not available during resize");
          }
        } catch (e) {
          console.error("Error in window resize:", e);
        }
      };
    };

    p5Instance.current = new p5(sketch);

    // Expose methods from p5Instance to the ref for external access
    if (p5Instance.current) {
      setTimeout(() => {
        if (p5Instance.current) {
          const p = p5Instance.current;
          console.log("p5Instance methods:", {
            hasZoomToPoint: typeof p.zoomToPoint === 'function',
            hasResetZoom: typeof p.resetZoom === 'function',
            hasZoomToSection: typeof p.zoomToSection === 'function',
            hasUpdateThemeColors: typeof p.updateThemeColors === 'function'
          });
        }
      }, 100);
    }

    return () => {
      // Before removing the p5 instance, mark it as not alive.
      isSketchInstanceAliveRef.current = false;
      if (p5Instance.current) {
        try {
          p5Instance.current.remove();
        } catch (e) {
          console.error("Error during p5Instance.current.remove():", e);
        }
        p5Instance.current = null; // Explicitly nullify our ref
      }
    };
  }, []); // Only run once on mount

  // --- Navigation/overlay effect: runs on location change ---
  useEffect(() => {
    const currentPath = location.pathname.substring(1);
    
    // Set active section based on current path
    setActiveSection(currentPath);
    
    // Show content based on path
    if (currentPath === 'about') {
      setShowAboutContent(true);
      setShowExperimentsContent(false);
      setShowWorkContent(false);
      setShowContactContent(false);
    } else if (currentPath === 'experiments') {
      setShowAboutContent(false);
      setShowExperimentsContent(true);
      setShowWorkContent(false);
      setShowContactContent(false);
    } else if (currentPath === 'work') {
      setShowAboutContent(false);
      setShowExperimentsContent(false);
      setShowWorkContent(true);
      setShowContactContent(false);
    } else if (currentPath === 'contact') {
      setShowAboutContent(false);
      setShowExperimentsContent(false);
      setShowWorkContent(false);
      setShowContactContent(true);
    } else if (currentPath === 'home') {
      // Home resets everything
      setShowAboutContent(false);
      setShowExperimentsContent(false);
      setShowWorkContent(false);
      setShowContactContent(false);
      setDebug(false);
    } else {
      // For any other section, hide all content
      setShowAboutContent(false);
      setShowExperimentsContent(false);
      setShowWorkContent(false);
      setShowContactContent(false);
    }
    
    // No automatic zooming - let visual feedback handle navigation
  }, [location.pathname, isInitialized]);

  // Turn off debug when navigating away from nav sections
  useEffect(() => {
    const currentPath = location.pathname.substring(1);
    // Use imported navSections here
    if (!navSections.map(s => s.id).includes(currentPath)) {
      setDebug(false);
    }
  }, [location.pathname]);

  // Add Escape key handler to reset zoom
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isInitializedRef.current && p5Instance.current && typeof p5Instance.current.resetZoom === 'function') {
        p5Instance.current.resetZoom();
        hideAllFloatingBoxes();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Add effect to update theme in p5 instance when isLightTheme changes
  useEffect(() => {
    if (isInitialized && p5Instance.current && typeof p5Instance.current.updateThemeColors === 'function') {
      p5Instance.current.updateThemeColors();
    }
  }, [isLightTheme, isInitialized]);

  // Update theme-dependent styles for floating boxes
  const getFloatingBoxStyle = () => {
    return {
      background: isLightTheme ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.88)',
      color: isLightTheme ? 'black' : 'white',
      borderColor: isLightTheme ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
      boxShadow: isLightTheme 
        ? '0 8px 32px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)' 
        : '0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
      backdropFilter: 'blur(20px)',
    };
  };

  // Return a loading indicator if not initialized
  return (
    <div 
      ref={wrapperDivRef}
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10, // Increased z-index to be above other elements
        pointerEvents: 'all', // Allow clicks on this component
        background: isLightTheme ? '#FFFFFF' : '#000000', // Immediate background to prevent flash
      }}
    >
      {/* Loading overlay to prevent flash of content */}
      {!isInitialized && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isLightTheme ? '#FFFFFF' : '#000000',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isLightTheme ? '#000' : '#fff',
          fontFamily: 'Moderat',
          fontSize: '1rem',
          letterSpacing: '2px'
        }}>
          Loading...
        </div>
      )}

      {/* Name badge - only show when initialized */}
      {isInitialized && (
        <NameBadge style={{ color: isLightTheme ? '#000' : '#fff', textShadow: isLightTheme ? '0 2px 12px rgba(255,255,255,0.18), 0 0 2px #000' : '0 2px 12px rgba(0,0,0,0.18), 0 0 2px #fff' }}>
          Parsa Azari
        </NameBadge>
      )}
      
      {/* Controls - only show when initialized */}
      {isInitialized && (
        <>
          {/* Rain toggle button */}
          <RainToggle 
            onClick={(e) => {
              e.stopPropagation(); // Prevent wrapper div click
              toggleRain();
            }}
            isLight={isLightTheme}
            isActive={isRaining}
            aria-label={isRaining ? "Turn off rain" : "Turn on rain"}
          >
            <Cloud size={18} />
          </RainToggle>
          
          {/* Theme toggle button */}
          <ThemeToggle 
            onClick={(e) => {
              e.stopPropagation(); // Prevent wrapper div click
              toggleTheme();
            }}
            isLight={isLightTheme}
            aria-label={isLightTheme ? "Switch to dark theme" : "Switch to light theme"}
          >
            {isLightTheme ? <Moon size={18} /> : <Sun size={18} />}
          </ThemeToggle>
        </>
      )}
      
      <div ref={canvasRef} style={{pointerEvents: 'all'}} />
      
      {/* Floating About text beside the about node */}
      {showAboutContent && isInitialized && (
        <FloatingAboutBox
          isLight={isLightTheme}
          style={{
            position: 'fixed',
            left: 60,
            top: 80,
            zIndex: 200,
            ...getFloatingBoxStyle()
          }}
        >
          <SequentialReveal paragraphs={bioText} />
        </FloatingAboutBox>
      )}
      
      {/* Floating Experiments box beside the experiments node */}
      {showExperimentsContent && (
        <FloatingAboutBox
          isLight={isLightTheme}
          style={{
            position: 'fixed',
            left: 60,
            top: 80,
            zIndex: 200,
            ...getFloatingBoxStyle()
          }}
        >
          <ExperimentsContainer isLight={isLightTheme}>
            <h2>Experiments</h2>
            <ExperimentGrid>
              {experiments.map((experiment, index) => (
                <ExperimentItem 
                  key={index} 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent wrapper div click
                    // Navigate to individual experiment pages
                    let route = '/experiments/';
                    if (experiment.title === 'German Art Schools') {
                      route += 'german-art-schools';
                    } else if (experiment.title === 'Semantic Biome') {
                      route += 'semantic-biome';
                    } else if (experiment.title === '3D Portfolio') {
                      route += 'three-d-portfolio';
                    }
                    navigate(route);
                  }}
                  style={{ 
                    background: isLightTheme ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)',
                    color: isLightTheme ? '#000' : '#fff',
                    borderColor: isLightTheme ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer'
                  }}
                >
                  <h3>{experiment.title}</h3>
                  <p>{experiment.description}</p>
                  <small>{experiment.tech}</small>
                </ExperimentItem>
              ))}
            </ExperimentGrid>
          </ExperimentsContainer>
        </FloatingAboutBox>
      )}
      
      {/* Floating Contact box beside the contact node */}
      {showContactContent && (
        <FloatingAboutBox
          style={{
            position: 'fixed',
            right: 60, // Moved to upper right
            top: 80,
            zIndex: 200,
            width: '320px', // Reduced from 480px to 320px
            maxHeight: 'auto', // Let it size naturally
            overflowY: 'visible',
            ...getFloatingBoxStyle()
          }}
        >
          <ContactContainer isLight={isLightTheme}>
            <h3>Get in Touch</h3>
            <SocialGrid>
              {socialLinks.map((link, index) => (
                <SocialCard
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    background: isLightTheme ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)',
                    color: isLightTheme ? '#000' : '#fff',
                    borderColor: isLightTheme ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {React.cloneElement(link.icon, { size: 20 })}
                  <span>{link.name}</span>
                </SocialCard>
              ))}
            </SocialGrid>
          </ContactContainer>
        </FloatingAboutBox>
      )}
      
      {/* Floating Work box beside the work node */}
      {showWorkContent && (
        <FloatingAboutBox
          style={{
            position: 'fixed',
            left: 60,
            top: 80,
            zIndex: 200,
            ...getFloatingBoxStyle()
          }}
        >
          <WorkContainer
            isLight={isLightTheme}
          >
            <h2>Selected Works</h2>
            <WorkGrid>
              {projects.map((project, index) => (
                <WorkItem 
                  key={index} 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent wrapper div click
                    navigate(project.route);
                  }}
                  style={{ 
                    background: isLightTheme ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.06)',
                    borderColor: isLightTheme ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)',
                    cursor: 'pointer'
                  }}
                >
                  <h3 style={{ color: isLightTheme ? '#000' : '#fff' }}>{project.title}</h3>
                  <p style={{ color: isLightTheme ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.85)' }}>{project.description}</p>
                  <small style={{ color: isLightTheme ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.65)' }}>{project.year}</small>
                </WorkItem>
              ))}
            </WorkGrid>
          </WorkContainer>
        </FloatingAboutBox>
      )}
      
      {/* Loading indicator for debugging */}
      {!isInitialized && (
        <div style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          background: isLightTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
          color: isLightTheme ? '#000' : '#fff',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 9999
        }}>
          Loading TVirusBackground...
        </div>
      )}
    </div>
  );
});

// Add displayName for React devtools and linting
TVirusBackground.displayName = 'TVirusBackground';

export default TVirusBackground; 