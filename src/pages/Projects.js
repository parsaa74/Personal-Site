import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  aspect-ratio: 16/9;
  background: #111;
  overflow: hidden;
`;

const ProjectInfo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(100%);
`;

const Projects = () => {
  const projects = [
    { id: 1, title: 'Project 1', description: 'Description 1' },
    { id: 2, title: 'Project 2', description: 'Description 2' },
    { id: 3, title: 'Project 3', description: 'Description 3' },
  ];

  return (
    <ProjectsGrid>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ProjectInfo
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            transition={{ type: 'tween' }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </ProjectInfo>
        </ProjectCard>
      ))}
    </ProjectsGrid>
  );
};

export default Projects; 