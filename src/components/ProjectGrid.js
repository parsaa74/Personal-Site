import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useTranslation } from '../hooks/useTranslation';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: 1px solid white;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? 'black' : 'white'};
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    background: white;
    color: black;
  }
`;

const ProjectGrid = ({ projects }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['all', 'creative', 'ux', 'motion', 'film', 'performance', 'graphic'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <>
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={filter === category}
            onClick={() => setFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t(`projects.categories.${category}`)}
          </FilterButton>
        ))}
      </FilterContainer>
      
      <Grid>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </AnimatePresence>
      </Grid>
    </>
  );
};

export default ProjectGrid; 