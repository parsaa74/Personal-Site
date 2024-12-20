import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ShowcaseContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectItem = styled(motion.div)`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    padding-top: 75%;
  }
`;

const ProjectContent = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const ProjectShowcase = ({ projects }) => {
  const controls = useAnimation();
  const [selectedProject, setSelectedProject] = useState(null);
  
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  return (
    <ShowcaseContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {projects.map((project, index) => (
        <ProjectItem
          key={project.id}
          layoutId={`project-${project.id}`}
          onClick={() => handleProjectClick(project)}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ProjectContent>
            <motion.h3>{project.title}</motion.h3>
            <motion.p>{project.description}</motion.p>
          </ProjectContent>
        </ProjectItem>
      ))}
    </ShowcaseContainer>
  );
};

export default ProjectShowcase; 