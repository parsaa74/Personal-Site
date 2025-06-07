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

const PhilosophicalToys = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const isLight = !isDarkMode;

  const experimentData = {
    title: "Philosophical Toys",
    tech: "WebGL, Three.js, P5.js",
    year: "2021",
    url: "https://parsaa74.github.io/Philosophical-Toys/",
    description: "as I was Preparing my masters thesis about the notion of stillness and motion at the turn of the century (Late 19th and Early 20th) I was intrigued to study a rather famous but under appreciated phenomenon called \"philosophical toys\". This interesting concept explains a set of 19th century inventions that were attempting to achieve motion in within still images.",
    extendedDescription: "This is of course the era of precinema so therefore anything prior to cinema would wrongly interpreted as an attempt to achieve cinema and much of this invention would not be identified as worthy object that has value of their own without being assigned to an institutionalized medium such as cinema. Alongside my research I developed sketches using WebGL, three.js and p5.js library to achieve a perspective over early film technology and also being able to do a visual presentation while I defended my thesis. This web project tries to repackage those sketches in one hub and also works as a historic overview of the precinema development of moving images. a recreation of this fashion can be faulty and imprecise at points but I developed this project to be a starting point for the enthusiast of early film and photography but perhaps the nature of digitalized version of philosophical toys would be considered a misservice to the physical nature of film and its history. Next.js, react.jsm CSS, HTML, Javascript, three.js, WebGL",
    images: [
      {
        src: `${process.env.PUBLIC_URL}/images/philosophical-toys/1.png`,
        alt: "Philosophical Toys Interface",
        title: "Pre-cinema Studies",
        description: "Digital recreation of 19th century motion experiments",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/philosophical-toys/2.png`,
        alt: "Motion Studies",
        title: "Motion in Still Images",
        description: "Exploring early animation principles",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/philosophical-toys/3.png`,
        alt: "WebGL Implementation",
        title: "Interactive Demonstrations",
        description: "WebGL visualizations of historical motion devices",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/philosophical-toys/4.png`,
        alt: "Historical Recreation",
        title: "Historical Analysis",
        description: "Academic research through digital recreation",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/philosophical-toys/5.png`,
        alt: "Early Film Technology",
        title: "Pre-cinema Technology",
        description: "Understanding the roots of moving images",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/philosophical-toys/6.png`,
        alt: "Thesis Research",
        title: "Academic Research",
        description: "Master's thesis on stillness and motion",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/philosophical-toys/7.png`,
        alt: "Digital Recreation",
        title: "Digital Interpretations",
        description: "Modern digital recreation of historical devices",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/philosophical-toys/8.png`,
        alt: "Visual Presentation",
        title: "Thesis Defense",
        description: "Visual presentation for thesis defense",
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

export default PhilosophicalToys; 