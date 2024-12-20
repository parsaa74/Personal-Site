import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  overflow: hidden;
  border-radius: 12px;
  background: ${props => props.background || '#1a1a1a'};
  cursor: pointer;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Content = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
`;

const Category = styled.span`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const ProjectCard = ({ project, onClick }) => {
  const { t } = useTranslation();

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Image src={project.image} alt={project.title} />
      <Content>
        <Title>{project.title}</Title>
        <Category>{t(`projects.categories.${project.category}`)}</Category>
      </Content>
    </Card>
  );
};

export default ProjectCard; 