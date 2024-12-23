import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import OptimizedImage from '../components/OptimizedImage';
import { useScrollPosition } from '../hooks/useScrollPosition';

const ProjectsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  height: 400px;
`;

const ProjectInfo = styled.div`
  padding: 1rem;
  color: white;
`;

const Projects = () => {
  const { scrollPosition } = useScrollPosition();

  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "Description for project one",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 2,
      title: "Project Two",
      description: "Description for project two",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 3,
      title: "Project Three",
      description: "Description for project three",
      image: "https://via.placeholder.com/400x300"
    }
  ];

  return (
    <ProjectsContainer>
      <ParallaxSection offset={100}>
        <motion.h1
          style={{
            color: 'white',
            fontSize: '2.5rem',
            marginBottom: '2rem',
            opacity: 1 - (scrollPosition * 0.001)
          }}
        >
          My Projects
        </motion.h1>
      </ParallaxSection>
      
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <OptimizedImage
              src={project.image}
              alt={project.title}
              style={{ height: '200px' }}
            />
            <ProjectInfo>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectsContainer>
  );
};

export default Projects; 