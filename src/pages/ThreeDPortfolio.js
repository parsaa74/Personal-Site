import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import OrganicImageGallery from '../components/ui/OrganicImageGallery';
import { useDarkMode } from '../context/DarkModeContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.isLight ? '#FFFFFF' : '#000000'};
  color: ${props => props.isLight ? '#000000' : '#FFFFFF'};
  padding: 2rem;
  font-family: 'Moderat';
  position: relative;
  z-index: 15;
`;

const BackButton = styled.button`
  position: fixed;
  top: 30px;
  left: 30px;
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
  z-index: 300;
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
  }
  
  ${props => props.isLight && `
    background: rgba(255, 255, 255, 0.3);
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `}
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  font-weight: 300;
  text-shadow: ${props => props.isLight ? 'none' : '0 0 10px rgba(255,255,255,0.08)'};
`;

const ExperimentSection = styled.section`
  margin-bottom: 3rem;
  padding: 1.5rem 0;
`;

const ExperimentHeader = styled.div`
  margin-bottom: 2rem;
`;

const ExperimentTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  font-weight: 500;
  text-shadow: ${props => props.isLight ? 'none' : '0 0 8px rgba(255,255,255,0.06)'};
`;

const ExperimentMeta = styled.div`
  margin-bottom: 1rem;
  opacity: 0.7;
  font-size: 0.8rem;
  letter-spacing: 0.3px;
`;

const ExperimentDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  max-width: 700px;
`;

const ExperimentItemContainer = styled.div`
  background: ${props => props.isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)'};
  padding: 1.2rem 1.4rem;
  border-radius: 15px;
  backdrop-filter: blur(15px);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Moderat';
  border: 1px solid ${props => props.isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'};
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      ${props => props.isLight ? 'rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 80%' : 'rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 80%'}, 
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
      ${props => props.isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'} 50%, 
      transparent 100%);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-6px) scale(1.02);
    background: ${props => props.isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.15)'};
    box-shadow: ${props => props.isLight 
      ? '0 15px 30px rgba(0,0,0,0.15), 0 0 15px rgba(0,0,0,0.05)'
      : '0 15px 30px rgba(0,0,0,0.3), 0 0 15px rgba(255,255,255,0.08)'};
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-4px) scale(1.01);
  }
`;

const LaunchButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isLight ? '#000' : '#fff'};
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
  margin-top: 1rem;
  opacity: 0.6;
  cursor: not-allowed;
  
  &:hover {
    background: ${props => props.isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)'};
    transform: none;
    box-shadow: none;
  }
`;

const StatusNote = styled.div`
  background: ${props => props.isLight ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 193, 7, 0.1)'};
  border: 1px solid ${props => props.isLight ? 'rgba(255, 193, 7, 0.3)' : 'rgba(255, 193, 7, 0.3)'};
  color: ${props => props.isLight ? '#856404' : '#fff3cd'};
  padding: 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ThreeDPortfolio = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const isLight = !isDarkMode;

  const experimentData = {
    title: "3D Portfolio",
    tech: "Three.js, WebGL",
    year: "2024",
    url: "#",
    description: "An interactive three-dimensional portfolio showcase with immersive navigation that reimagines how creative work can be presented in virtual space. This experiment explores spatial storytelling and non-linear navigation paradigms, allowing visitors to experience projects through 3D environments that reflect their conceptual and aesthetic qualities. Each project exists within its own dimensional space, connected through a coherent navigational system that makes portfolio browsing an exploratory journey.",
    extendedDescription: "The 3D Portfolio project challenges the conventional flat-web approach to showcasing creative work by creating immersive environments for each project. Using Three.js and WebGL, the platform generates procedural 3D spaces that respond to the content they contain - performance art pieces might exist in fluid, organic environments while web projects are housed in geometric, structured spaces. The navigation system draws inspiration from architectural walkthroughs and game design, emphasizing discovery and spatial memory. This approach transforms portfolio browsing from passive consumption to active exploration, where the presentation medium becomes an integral part of the artistic experience.",
    images: [
      {
        src: "/images/performance/solo performances/circle of confusion/photo_2025-05-01_17-29-40.jpg",
        alt: "3D Portfolio Interface Concept",
        title: "Three-Dimensional Navigation",
        description: "Exploring portfolio content through immersive 3D spaces",
        height: "350px"
      },
      {
        src: "/images/performance/solo performances/friends/photo_2025-05-01_17-29-01.jpg",
        alt: "Spatial Portfolio Design",
        title: "Spatial Storytelling",
        description: "Projects existing within their own dimensional environments",
        height: "350px"
      },
      {
        src: "/images/performance/solo performances/dissolve/photo_2024-12-26_15-14-58.jpg",
        alt: "WebGL Implementation",
        title: "Technical Implementation",
        description: "Three.js and WebGL powering immersive experiences",
        height: "350px"
      }
    ]
  };

  return (
    <PageContainer isLight={isLight}>
      <BackButton 
        isLight={isLight}
        onClick={() => navigate('/')}
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
      </BackButton>
      
      <ContentWrapper>
        <PageTitle isLight={isLight}>Experiments</PageTitle>
        
        <ExperimentSection>
          <ExperimentHeader>
            <ExperimentTitle isLight={isLight}>{experimentData.title}</ExperimentTitle>
            <ExperimentMeta>
              {experimentData.tech} • {experimentData.year}
            </ExperimentMeta>
            <ExperimentDescription>
              {experimentData.description}
            </ExperimentDescription>
            <ExperimentDescription>
              {experimentData.extendedDescription}
            </ExperimentDescription>
            
            <StatusNote isLight={isLight}>
              ⚠️ This project is currently in development and not yet available for public viewing.
            </StatusNote>
            
            <LaunchButton 
              href={experimentData.url}
              onClick={(e) => e.preventDefault()}
              isLight={isLight}
              title="Project in development"
            >
              <ExternalLink size={16} />
              Coming Soon
            </LaunchButton>
          </ExperimentHeader>
          
          <ExperimentItemContainer isLight={isLight}>
            <OrganicImageGallery images={experimentData.images} />
          </ExperimentItemContainer>
        </ExperimentSection>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ThreeDPortfolio; 