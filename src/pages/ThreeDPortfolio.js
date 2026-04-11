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
  cursor: pointer;
  
  &:hover {
    background: ${props => props.isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.15)'};
    transform: translateY(-2px);
    box-shadow: ${props => props.isLight 
      ? '0 8px 20px rgba(0,0,0,0.1)'
      : '0 8px 20px rgba(255,255,255,0.08)'};
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
    url: "https://parsaa74.github.io/3D-Portfolio/",
    description: "this experiment is aiming to create overview of my work in different areas. This project is a 3D web-based portfolio that tries to bend the the traditional portfolio experience into an immersive, explorable environment. Drawing inspiration from my background in performance art and cinema, the work creates a spatial narrative where visitors can physically navigate through different rooms representing distinct aspects of my practice: performance art, film/cinema, interaction design, and development work.",
    extendedDescription: "The project emerges from a desire to break away from flat, scrollable portfolios and instead create an experience that mirrors how we encounter art in physical space. Each room becomes a curated gallery, containing documentation of performances like «Circle of Confusion», «Dissolve» and «Friends» alongside development projects and design work. The corridor system is an attempt or perhaps a nod off towards my cinephilic dreams. I tried to attain a rather unorthodox method to represent my previous works and my ongoing love for learning and discovering newer forms, although not radically fresh but yet I tried to follow my instinct and try to manifest creativity on my own terms. Javascript, HTML, CSS, Three.js, GLSL",
    images: [
      {
        src: `${process.env.PUBLIC_URL}/images/3d-portfolio/9.webp`,
        alt: "3D Portfolio Interface Concept",
        title: "Three-Dimensional Navigation",
        description: "Exploring portfolio content through immersive 3D spaces",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/3d-portfolio/8.webp`,
        alt: "Spatial Portfolio Design",
        title: "Spatial Storytelling",
        description: "Projects existing within their own dimensional environments",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/3d-portfolio/7.webp`,
        alt: "WebGL Implementation",
        title: "Technical Implementation",
        description: "Three.js and WebGL powering immersive experiences",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/3d-portfolio/6.webp`,
        alt: "3D Gallery Spaces",
        title: "Virtual Gallery System",
        description: "Immersive gallery spaces for different project categories",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/3d-portfolio/5.webp`,
        alt: "Performance Documentation Room",
        title: "Performance Art Gallery",
        description: "Dedicated space for performance art documentation",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/3d-portfolio/4.webp`,
        alt: "Cinema Corridor",
        title: "Cinematic Navigation",
        description: "Corridor system inspired by cinematic spatial design",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/3d-portfolio/3.webp`,
        alt: "Interactive Elements",
        title: "User Interaction Design",
        description: "Interactive elements and navigation mechanics",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/3d-portfolio/2.webp`,
        alt: "Technical Implementation",
        title: "Three.js Development",
        description: "Behind-the-scenes technical implementation details",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/3d-portfolio/1.webp`,
        alt: "Overall Architecture",
        title: "Project Architecture",
        description: "Complete overview of the 3D portfolio structure",
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
            
            <LaunchButton 
              href={experimentData.url}
              target="_blank"
              rel="noopener noreferrer"
              isLight={isLight}
              title="Launch 3D Portfolio"
            >
              <ExternalLink size={16} />
              Launch Project
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