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

const GermanArtSchools = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const isLight = !isDarkMode;

  const experimentData = {
    title: "German Art Schools",
    tech: "Interactive Web",
    year: "2023",
    url: "http://parsaa74.github.io/german-art-schools",
    description: "during my journey to find the suitable program that would suit my set of experiences in new media, I was forced upon to view and scrape much data from different sources of information online. Through this search, I found many different projects, many of which were done by students themselves such as \"these URLs will save the IRL\" by Nilya Musaeva which is an interesting research on german art schools website and their UX shortcoming and probable deficiencies and \"Masters for Designers\" by Stephanie Brenner which is an informative site on the current programs that is offered in the field of media and design for higher education level of studies.",
    extendedDescription: "My attempt was to create a visual experience of the art schools that are active at the time of developing the project. This visualization was initially developed only in 3D (three.js) but evolved into a two dimensional project that tries to be both a 3D and flat D3 visualization. In each mode the user can interact with the nodes (schools) different and extract different information. The schools can be filtered through several factors: the State which they are located at, the programs that they offer, the semester that they are presented (winter and summer) and whether they are NC-Frei or not. In 3D mode, By selecting any of the schools, the nodes form pose that offer the user the relation that each node has with the other nodes. The proximity of nodes with one another in 3d mode, showcase the similarity between them. User can switch to D3 mode by selecting the icon on the lower left side of the screen. In D3 mode, user can see the connections lines more clearly. The connection lines are also based on the facts and factors which are present at the upper left side of the screen (filter panel). User can access the information for function of different keys on the keyboard and also access the source code for better understanding and hopefully, improving the faulty aspects of this project by pulling request or forking the project for themselves and building it differently. this Project is rather new and lacks a solid amount response from future applicants who would want study any design/art/media related programs. I Used a combination of react with javascript libraries, html, css and typescript to build this project. D3.js and three.js was used for the D3 visualization and 3D visualization.",
    images: [
      {
        src: `${process.env.PUBLIC_URL}/images/german-art/4.png`,
        alt: "German Art Schools Interface",
        title: "Interactive Web Interface",
        description: "Exploring German art institutions through interactive design",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/german-art/3.png`,
        alt: "Educational Visualization",
        title: "Data Visualization",
        description: "Mapping connections between art schools and movements",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/german-art/2.png`,
        alt: "Art Academy Research",
        title: "Research Documentation",
        description: "Historical analysis of German art education systems",
        height: "350px"
      },
      {
        src: `${process.env.PUBLIC_URL}/images/german-art/1.png`,
        alt: "3D Visualization Mode",
        title: "Three.js Implementation",
        description: "3D mode showing school relationships and proximity",
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

export default GermanArtSchools; 