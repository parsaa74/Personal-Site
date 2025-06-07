import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

const WorkSection = styled.section`
  margin-bottom: 3rem;
  padding: 1.5rem 0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const WorkHeader = styled.div`
  margin-bottom: 2rem;
`;

const WorkTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  font-weight: 500;
  text-shadow: ${props => props.isLight ? 'none' : '0 0 8px rgba(255,255,255,0.06)'};
`;

const WorkMeta = styled.div`
  margin-bottom: 1rem;
  opacity: 0.7;
  font-size: 0.8rem;
  letter-spacing: 0.3px;
`;

const WorkDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  max-width: 700px;
`;

// Add styled component for video container
const VideoContainer = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${props => props.isLight 
    ? '0 8px 25px rgba(0,0,0,0.15)'
    : '0 8px 25px rgba(0,0,0,0.4)'};
  
  iframe {
    width: 100%;
    height: 315px;
    border: none;
    
    @media (max-width: 768px) {
      height: 250px;
    }
    
    @media (max-width: 480px) {
      height: 200px;
    }
  }
`;

// Add WorkItemContainer similar to ExperimentItem style to wrap the gallery
const WorkItemContainer = styled.div`
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

const FilmPractices = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const isLight = !isDarkMode;

  const works = [
    {
      title: "38:01",
      type: "Short Film",
      role: "Leading Actor",
      year: "2017",
      director: "Salar Sharifi",
      description: "38:01 (in which I play the leading role) is a short film about a young man who's suffering from a weird condition where he can't bare any sound, so he chooses to live a recluse life. he works in his father's store after his passing and spends his time repairing watches in his store until one day he meets a mute man with whom he falls in love. this student film was an experiment with sound and visuals and barely had any dialogue. films relied on minimal performances and had various references to artworks of modernist painting period. young cast and crew of the films were met with critical acclaim at Tassvir -e Sal Film Festival and Nahal International Short Film Festival which in the former, the short film won the best picture and and myself won the Honorable Mention Award.",
      video: "https://player.vimeo.com/video/1089278485?h=53b0648d78",
      images: [
        {
          src: `${process.env.PUBLIC_URL}/images/film/38:01/film.jpg`,
          alt: "38:01 Film Still",
          title: "Film Still",
          description: "A moment of temporal suspension",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/film/38:01/poster1.jpg`,
          alt: "38:01 Poster",
          title: "Film Poster",
          description: "Visual identity exploring time and space",
          height: "400px"
        }
      ]
    },
    {
      title: "The One Who Dances on Your Grave",
      type: "Short Film",
      role: "Cinematographer",
      year: "2018",
      director: "Fatemeh Malekzadeh",
      description: "The One Who Dances on Your Grave is an Short Film from Fatemeh Malekzadeh and I served as the Cinematographer.",
      video: "https://www.youtube.com/embed/PuEuzuM9Mig?si=9YIaq2UEtk0fxqKR",
      images: [
        {
          src: `${process.env.PUBLIC_URL}/images/film/The One Who Dances on Your Grave/poster2(1).jpg`,
          alt: "The One Who Dances on Your Grave - Poster 1",
          title: "Film Poster - Version 1",
          description: "Exploring themes of memory and presence",
          height: "450px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/film/The One Who Dances on Your Grave/poster2(2).jpg`,
          alt: "The One Who Dances on Your Grave - Poster 2",
          title: "Film Poster - Version 2",
          description: "Visual meditation on loss and remembrance",
          height: "450px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/film/The One Who Dances on Your Grave/poster2(3).jpg`,
          alt: "The One Who Dances on Your Grave - Poster 3",
          title: "Film Poster - Version 3",
          description: "Light and shadow in liminal spaces",
          height: "450px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/film/The One Who Dances on Your Grave/poster2(4).jpg`,
          alt: "The One Who Dances on Your Grave - Poster 4",
          title: "Film Poster - Version 4",
          description: "The dance between life and death",
          height: "450px"
        }
      ]
    }
  ];

  return (
    <PageContainer isLight={isLight}>
      <BackButton 
        onClick={() => navigate('/work')}
        isLight={isLight}
        aria-label="Back to work overview"
      >
        <ArrowLeft size={18} />
      </BackButton>
      
      <ContentWrapper>
        <PageTitle isLight={isLight}>Film Practices</PageTitle>
        
        {works.map((work, index) => (
          <WorkSection key={index} isLight={isLight}>
            <WorkHeader>
              <WorkTitle isLight={isLight}>{work.title}</WorkTitle>
              <WorkMeta>{work.type} • {work.role} • {work.year}{work.director && ` • Directed by ${work.director}`}</WorkMeta>
              <WorkDescription>{work.description}</WorkDescription>
            </WorkHeader>
            
            <WorkItemContainer isLight={isLight}>
              {work.video && (
                <VideoContainer isLight={isLight}>
                  <iframe 
                    src={work.video}
                    title={`${work.title} - Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </VideoContainer>
              )}
              <OrganicImageGallery
                images={work.images}
                isLight={isLight}
                showInfo={true}
                enableLightbox={true}
                columns="auto-fit"
                minWidth="350px"
              />
            </WorkItemContainer>
          </WorkSection>
        ))}
      </ContentWrapper>
    </PageContainer>
  );
};

export default FilmPractices; 