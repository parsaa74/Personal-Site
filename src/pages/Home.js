import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  position: relative;
  z-index: 50;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Moderat';
  text-align: center;
  pointer-events: none; // Let clicks pass through to TVirusBackground
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    height: 100vh;
    min-height: -webkit-fill-available; /* Better mobile viewport handling */
  }
`;

const ContentBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem 3rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
  margin: 0 auto;
  pointer-events: auto; // Content box can receive clicks
  
  opacity: ${props => props.showContent ? 1 : 0};
  transform: ${props => props.showContent ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    max-width: 90%;
    margin: 0 auto;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
    max-width: 95%;
    border-radius: 10px;
  }
`;

const Title = styled.h1`
  font-size: ${props => props.isSubpage ? '3rem' : '4rem'};
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  letter-spacing: 2px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: ${props => props.isSubpage ? '2rem' : '2.5rem'};
    letter-spacing: 1px;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.isSubpage ? '1.8rem' : '2rem'};
    letter-spacing: 0.5px;
    margin-bottom: 0.6rem;
    line-height: 1.3;
  }
`;

const Subtitle = styled.p`
  font-size: ${props => props.isSubpage ? '1.2rem' : '1.5rem'};
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.8;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: ${props => props.isSubpage ? '1rem' : '1.2rem'};
    line-height: 1.5;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.isSubpage ? '0.9rem' : '1rem'};
    line-height: 1.4;
    max-width: 95%;
  }
`;

const SectionIndicator = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  pointer-events: auto;
`;

const TestNavigationSection = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 100;
  
  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    padding: 0.8rem;
    border-radius: 6px;
    max-width: 200px;
  }
  
  @media (max-width: 480px) {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.6rem;
    max-width: 180px;
  }
  
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    color: white;
    opacity: 0.8;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.7rem;
    }
  }
  
  button {
    display: block;
    width: 100%;
    margin: 0.25rem 0;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.3s ease;
    -webkit-tap-highlight-color: transparent;
    
    @media (max-width: 768px) {
      padding: 0.4rem;
      font-size: 0.7rem;
      margin: 0.2rem 0;
    }
    
    @media (max-width: 480px) {
      padding: 0.3rem;
      font-size: 0.6rem;
    }
    
    &:hover, &:active {
      background: rgba(255, 255, 255, 0.2);
    }
    
    @media (hover: none) and (pointer: coarse) {
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      &:active {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0.98);
      }
    }
  }
`;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine what content to show based on current route
  const getSectionContent = () => {
    switch(location.pathname) {
      case '/about':
        return {
          title: "About",
          subtitle: "Designer turned developer exploring the intersection of film theory, media studies, and interaction design through computational art and creative coding.",
          showContent: true
        };
      case '/work':
        return {
          title: "Work",
          subtitle: "Navigate through the branches to explore performance art, film practices, and collaborative projects spanning cinema, digital media, and live performance.",
          showContent: true
        };
      case '/contact':
        return {
          title: "Contact",
          subtitle: "Connect through various platforms and channels. Available for collaboration, discussions about media art, and project inquiries.",
          showContent: true
        };
      case '/experiments':
        return {
          title: "Experiments",
          subtitle: "Computational explorations in interactive design, particle systems, and generative art investigating the boundaries between code and creativity.",
          showContent: true
        };
      default:
        return {
          title: "Parsa Azari",
          subtitle: "Navigate through the organic branches to explore different sections. Each branch leads to a different aspect of practice in cinema, performance, and digital media.",
          showContent: false // Main home doesn't show content box, just integrates with background
        };
    }
  };

  const content = getSectionContent();
  const isSubpage = location.pathname !== '/';

  return (
    <HomeContainer>
      {/* Test Navigation - Remove in production */}
      <TestNavigationSection>
        <h4>Navigation</h4>
        <button onClick={() => navigate('/work/solo-performances')}>
          Solo Performances
        </button>
        <button onClick={() => navigate('/work/group-performances')}>
          Group Performances
        </button>
        <button onClick={() => navigate('/work/film-practices')}>
          Film Practices
        </button>
        <button onClick={() => navigate('/work')}>
          Back to Work
        </button>
        <button onClick={() => navigate('/')}>
          Home
        </button>
      </TestNavigationSection>
      
      {isSubpage && (
        <SectionIndicator>
          {location.pathname.substring(1).toUpperCase()}
        </SectionIndicator>
      )}
      
      <ContentBox showContent={content.showContent}>
        <Title isSubpage={isSubpage}>{content.title}</Title>
        <Subtitle isSubpage={isSubpage}>
          {content.subtitle}
        </Subtitle>
      </ContentBox>
    </HomeContainer>
  );
};

export default Home; 