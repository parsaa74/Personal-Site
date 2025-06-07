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
  
  &:hover {
    background: ${props => props.isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.15)'};
    transform: translateY(-2px);
    box-shadow: ${props => props.isLight 
      ? '0 5px 15px rgba(0,0,0,0.1)'
      : '0 5px 15px rgba(0,0,0,0.3)'};
  }
`;

const SemanticBiome = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const isLight = !isDarkMode;

  const experimentData = {
    title: "Semantic Biome",
    tech: "WebGL, 3D Canvas",
    year: "2022",
    url: "https://parsaa74.github.io/Semantic-Biome/",
    description: "Semantic Biome explores the evolving relationship between typography, digital ecology, and emergent intelligence. Within this three-dimensional space, autonomous entities from diverse writing systems coexist, interact, and form unexpected linguistic connections. Each character-based organism exists within a complex volumetric ecosystem, governed by algorithmic behaviors that simulate evolutionary patterns and emergent intelligence.",
    extendedDescription: "The visual language is built on the tension between order and chaos—mirroring how digital systems and human language share fundamental organizational principles yet embrace unpredictability. As you navigate and interact with this typographic landscape, the organisms respond to your presence, adapting their behaviors and creating new patterns of visual poetry across multiple writing systems. This digital meditation invites reflection on how meaning emerges from the seemingly random interactions of discrete elements within both computational and linguistic frameworks. Each language is represented with a color that is achieved through clicking the icon on the upper right side of the page or using the \"C\" key on the keyboard. this project was is a work in progress and has many shortcomings as any project that tries to sew different languages together might have. It was initially designed to put together set of languages that have vastly different typographic attributes, to create a sense of multilingual flavoured ecosystem that shows languages that are not widely acknowledged by the masses, but finding the proper web libraries to sew together this responsibility and manage different API turned out to be much more difficult than thought. So in the I decided to only use languages that are widely spoken in different parts of the world. Right now the project is struggling to generate legitimate words in all the offered languages and might hallucinate or fail recognize proper words. Javascript, CSS, HTML, P5.js and three.js",
    images: [
      {
        src: `${process.env.PUBLIC_URL}/images/semantic-biome/1.png`,
        alt: "Semantic Biome Interface",
        title: "Typographic Ecosystem",
        description: "Multilingual digital organisms in 3D space",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/semantic-biome/2.png`,
        alt: "Language Interactions",
        title: "Cross-linguistic Connections",
        description: "Different writing systems forming relationships",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/semantic-biome/3.png`,
        alt: "Emergent Intelligence",
        title: "Algorithmic Behaviors",
        description: "Characters evolving through computational processes",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/semantic-biome/4.png`,
        alt: "Visual Poetry",
        title: "Dynamic Text Patterns",
        description: "New patterns emerging from linguistic interactions",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/semantic-biome/5.png`,
        alt: "3D Typography",
        title: "Volumetric Text Environment",
        description: "Three-dimensional typographic landscape",
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

export default SemanticBiome; 