import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  backdrop-filter: blur(10px);
`;

const Content = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  background: #1a1a1a;
  border-radius: 12px;
  overflow-y: auto;
  color: white;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
`;

const Image = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const TechBadge = styled(motion.span)`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Link = styled(motion.a)`
  padding: 0.75rem 1.5rem;
  border: 1px solid white;
  border-radius: 25px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }
`;

const ProjectModal = ({ project, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Content
          onClick={e => e.stopPropagation()}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          <CloseButton
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </CloseButton>
          <Image src={project.image} alt={project.title} />
          <Details>
            <Title>{project.title}</Title>
            <Description>{project.description}</Description>
            <TechStack>
              {project.technologies.map(tech => (
                <TechBadge
                  key={tech}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </TechBadge>
              ))}
            </TechStack>
            <Links>
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('projects.viewLive')}
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('projects.viewCode')}
                </Link>
              )}
            </Links>
          </Details>
        </Content>
      </Overlay>
    </AnimatePresence>
  );
};

export default ProjectModal; 