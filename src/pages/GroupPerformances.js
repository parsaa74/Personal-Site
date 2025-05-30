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

// Replace OrganicPlaceholder with ExperimentItem-style component
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

const PlaceholderContent = styled.div`
  text-align: center;
  color: ${props => props.isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'};
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 0.5px;
  line-height: 1.5;
  
  .title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: ${props => props.isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'};
  }
  
  .subtitle {
    font-size: 0.75rem;
    opacity: 0.7;
  }
`;

const GroupPerformances = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const isLight = !isDarkMode;

  const works = [
    {
      title: "Tree of Wishes",
      collaboration: "Beta Performance Group",
      medium: "Performance Art",
      year: "2015",
      description: "A collaborative performance piece created with Beta Performance Group that explores collective desire and shared aspirations. Participants were invited to contribute their wishes through various performative acts, creating a living installation that grew throughout the duration of the piece. The work examined the tension between individual desires and communal needs in contemporary urban spaces.",
      hasImages: false
    },
    {
      title: "Nafashay e Shahrvand",
      collaboration: "Collective Work",
      medium: "Performance Art",
      year: "2017",
      description: "A multidisciplinary performance addressing urban citizenship and belonging in Tehran. The title, translating to 'Citizen's Breath,' explores the relationship between individual agency and civic responsibility. Through movement, sound, and spatial intervention, the performance created temporary communities while questioning the boundaries of public and private space in the city.",
      hasImages: false
    },
    {
      title: "Beta's Trajectory",
      collaboration: "Beta Performance Group",
      medium: "Performance Art",
      year: "2018",
      description: "The culminating work of Beta Performance Group's collaborative practice, tracing the group's evolution and artistic trajectory. This meta-performance reflected on the process of collective creation, documenting and performing the history of the group while simultaneously creating new material. The piece served as both retrospective and prospective statement about collaborative art-making.",
      hasImages: false
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
        <PageTitle isLight={isLight}>Group Performances</PageTitle>
        
        {works.map((work, index) => (
          <WorkSection key={index} isLight={isLight}>
            <WorkHeader>
              <WorkTitle isLight={isLight}>{work.title}</WorkTitle>
              <WorkMeta>{work.collaboration} • {work.medium} • {work.year}</WorkMeta>
              <WorkDescription>{work.description}</WorkDescription>
            </WorkHeader>
            
            {/* Organic placeholder for now since no images are available */}
            <WorkItemContainer isLight={isLight}>
              <PlaceholderContent isLight={isLight}>
                <div className="title">{work.title}</div>
                <div className="subtitle">Documentation Archive</div>
              </PlaceholderContent>
            </WorkItemContainer>
          </WorkSection>
        ))}
      </ContentWrapper>
    </PageContainer>
  );
};

export default GroupPerformances; 