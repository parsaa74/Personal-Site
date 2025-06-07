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

const VideoEmbed = styled.div`
  margin: 2rem 0;
  max-width: 800px;
  
  iframe {
    border-radius: 10px;
    box-shadow: ${props => props.isLight 
      ? '0 8px 25px rgba(0,0,0,0.15)'
      : '0 8px 25px rgba(0,0,0,0.4)'};
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

const SoloPerformances = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const isLight = !isDarkMode;

  const works = [
    {
      title: "InstaMeet (Friend)",
      medium: "Performance Art",
      year: "2016",
      location: "Tehran Museum of Contemporary Art (TMoCA)",
      event: "6th Annual 30 Performances 30 Artists 30 Days Festival",
      description: "InstaMeet/Friend, was a multi-media effort which was attempting to capture a real life virtualization of networking effects of social media on the nature of communication. this was done through a gamification of the relationship between the performer and the audience throughout the performance. each person would be given an ID card (containing their real life username on Instagram) and a mask to which they would wear in the gallery. the audience interacted with the performer via his instagram account which was livestreamed in the gallery for everyone to see where performer did posted various videos and photos of the event, replied to comments, took pictures of audience and himself and so on. performer handpicked and brought them out to a deserted corner of the gallery, and before taking their pictures, he unmasked the subjects to reveal their irl IDs in the photos with their username tagged. this sort of doxxing (a rather newer term that's more widely used these days) generated a reactionary affect in the audience and did encouraged them to interact more and more in the aforementioned website all awhile experiencing all this in the hollowed out space of gallery. this performance was part of the 5th annual festival of \"30 performances 30 artists 30 days\" in the Tehran Museum of Contemporary Arts, Curated by Amir Rad. Performer did a reperformance based on InstaMeet in the Radical Performance festival a year later in 2017.",
      images: [
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/friends/photo_2025-05-01_17-29-01.jpg`,
          alt: "Friends Performance - Documentation 1",
          title: "Performance Documentation",
          description: "Exploring friendship dynamics in public space",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/friends/M2RjNjJmMjZk.jpg`,
          alt: "Friends Performance - Documentation 2",
          title: "Interactive Elements",
          description: "Audience becomes part of the narrative",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/friends/NzIwYjJkZmQ1.jpg`,
          alt: "Friends Performance - Documentation 3",
          title: "Personal vs Public Personas",
          description: "Boundaries between authentic relationships",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/friends/ZTBjZDc1NzQ4.jpg`,
          alt: "Friends Performance - Documentation 4",
          title: "Social Dynamics",
          description: "Questioning authenticity in contemporary society",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/friends/ZTgyOGRjYjRj.jpg`,
          alt: "Friends Performance - Documentation 5",
          title: "Intimate Exploration",
          description: "Live performance investigating relationships",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/friends/MGE1ZjJiODcw.jpg`,
          alt: "Friends Performance - Documentation 6",
          title: "Performance Context",
          description: "Contemporary social interaction",
          height: "400px"
        }
      ]
    },
    {
      title: "Dissolve",
      medium: "Performance Art, Video Art",
      year: "2016",
      location: "Tehran Museum of Contemporary Art (TMoCA)",
      event: "6th Annual 30 Performances 30 Artists 30 Days Festival",
      description: "Dissolve, was initially conceived as a meditation on the ephemeral nature of the modern day lives and and an exploration of the challenging effects that the accelerated speed of our lives have had on the familial and on a bigger scale, societal roles that we've been burdened with. the Performance art piece that was accompanied by a video which portrayed the Performer in a rather performative situations, doing transient and mundane chores of everyday life; entering rooms, exiting them, going to sleep and waking from it. these short clips gets repeatedly dissolved into another, just as the different places and tasks get dissolve into one another in an absolute displacement; meanwhile the performer who was placed in the middle of gallery and with canvas behind him, had obtained the figure of a painter, who instead of brushing the canvas with paint was looking through multiple volumes of Persian dictionaries for words, hand picking a few and writing them on the canvas. the words were picked randomly in a dadaian fashion but maintained a coherent sense over (fabricated or not) definitions of roles and groundings of humans within societal norms and traditions within familial bonds. he gradually tried to interact with the audience in the room to give them the opportunity to rethink words, pick and write them. eventually the canvas got filled with words and their definitions that made it utterly unreadable and totally black.This performance piece was part of 6th Annual \"30 Performances, 30 Artists, 30 Days Festival\" which was annually held at Tehran Museum of Contemporary Art.",
      images: [
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/dissolve/سی پرفورمنس ،سی هنرمند، سی روز 3.jpg`,
          alt: "Dissolve Performance - Main Documentation",
          title: "Performance Documentation",
          description: "Identity dissolution in digital spaces",
          height: "450px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/dissolve/سی پرفورمنس ،سی هنرمند، سی روز 3 (1).jpg`,
          alt: "Dissolve Performance - Sequence 1",
          title: "Performance Sequence 1",
          description: "Exploring physical and virtual realities",
          height: "450px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/dissolve/سی پرفورمنس ،سی هنرمند، سی روز 3 (2).jpg`,
          alt: "Dissolve Performance - Sequence 2",
          title: "Performance Sequence 2",
          description: "Fragmentation of self in networked environments",
          height: "450px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/dissolve/سی پرفورمنس ،سی هنرمند، سی روز 3 (3).jpg`,
          alt: "Dissolve Performance - Sequence 3",
          title: "Performance Sequence 3",
          description: "Liminal space between presence and absence",
          height: "450px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/dissolve/سی پرفورمنس ،سی هنرمند، سی روز 3 (4).jpg`,
          alt: "Dissolve Performance - Sequence 4",
          title: "Performance Sequence 4",
          description: "Multimedia exploration of identity",
          height: "450px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/dissolve/سی پرفورمنس ،سی هنرمند، سی روز 3 (5).jpg`,
          alt: "Dissolve Performance - Sequence 5",
          title: "Performance Sequence 5",
          description: "Video projection and live action merge",
          height: "450px"
        }
      ]
    },
    {
      title: "Circle of Confusion",
      medium: "Performance Art, Video Art",
      year: "2018",
      location: "Tehran Museum of Contemporary Art (TMoCA)",
      event: "7th Annual 30 Performances 30 Artists 30 Days Festival",
      description: "Circle of Confusion, was a collaborative video-performance between Parsa Azari and Parsa Samadpour which came out of an idea a sense of discomfort that we go through both in terms of our identity forming and our bodily as we grow. this led to a video which was testament to our physical boundaries as two performers inside a studio and this video was projected in a rather vulnerable but transparent space to try to convey a shameful secret to the audience by showing it publicly. the video was of us both practicing rope jumping as much as we could. both were restricted by different types of barriers throughout the shoot and this clips of us trying and retrying was dissolved into one other to create an impossible image. audience was tested by the performers and went through trial to be able to move the secret part of the gallery. this performance was part of the 7th annual 30 Performances 30 Artists 30 Days Festival which were held in TMoCA (Tehran Museum of Contemporary Arts), curated by Amir Rad",
      images: [
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/circle of confusion/photo_2025-05-01_17-25-22.jpg`,
          alt: "Circle of Confusion - Main Documentation",
          title: "Performance Documentation",
          description: "Exploring perception and misrecognition",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/circle of confusion/photo_2025-05-01_17-25-22 (2).jpg`,
          alt: "Circle of Confusion - Circular Movements",
          title: "Circular Movements",
          description: "Disorienting visual experiences with light",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/circle of confusion/photo_2025-05-01_17-25-22 (3).jpg`,
          alt: "Circle of Confusion - Light and Video",
          title: "Light and Video Integration",
          description: "Challenging understanding of clarity and focus",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/circle of confusion/photo_2025-05-01_17-25-22 (4).jpg`,
          alt: "Circle of Confusion - Conceptual Navigation",
          title: "Navigating Uncertainty",
          description: "Visual and conceptual realms intertwine",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/circle of confusion/photo_2025-05-01_17-25-22 (5).jpg`,
          alt: "Circle of Confusion - Optical References",
          title: "Optical References",
          description: "Drawing from photographic terminology",
          height: "400px"
        },
        {
          src: `${process.env.PUBLIC_URL}/images/performance/solo performances/circle of confusion/photo_2025-05-01_17-25-22 (6).jpg`,
          alt: "Circle of Confusion - Performance Context",
          title: "Performance Environment",
          description: "Creating disorienting experiences",
          height: "400px"
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
        <PageTitle isLight={isLight}>Solo Performances</PageTitle>
        
        {works.map((work, index) => (
          <WorkSection key={index} isLight={isLight}>
            <WorkHeader>
              <WorkTitle isLight={isLight}>{work.title}</WorkTitle>
              <WorkMeta>{work.medium} • {work.year} • {work.location} • {work.event}</WorkMeta>
              <WorkDescription>{work.description}</WorkDescription>
              {work.title === "Circle of Confusion" && (
                <VideoEmbed isLight={isLight}>
                  <div style={{padding:"56.25% 0 0 0", position:"relative"}}>
                    <iframe 
                      src="https://player.vimeo.com/video/327524174?badge=0&autopause=0&player_id=0&app_id=58479" 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                      style={{position:"absolute", top:0, left:0, width:"100%", height:"100%"}} 
                      title="Circle of Confusion (2018)"
                    />
                  </div>
                  <script src="https://player.vimeo.com/api/player.js"></script>
                </VideoEmbed>
              )}
              {work.title === "Dissolve" && (
                <VideoEmbed isLight={isLight}>
                  <div style={{padding:"56.25% 0 0 0", position:"relative"}}>
                    <iframe 
                      src="https://player.vimeo.com/video/1088859298?badge=0&autopause=0&player_id=0&app_id=58479" 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                      style={{position:"absolute", top:0, left:0, width:"100%", height:"100%"}} 
                      title="Dissolve (Video, 2016)"
                    />
                  </div>
                  <script src="https://player.vimeo.com/api/player.js"></script>
                </VideoEmbed>
              )}
            </WorkHeader>
            
            <WorkItemContainer isLight={isLight}>
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

export default SoloPerformances; 