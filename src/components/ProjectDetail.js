import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideIn, StaggerAnimation } from './AnimatedElements';

const DetailOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;
`;

const DetailContainer = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const DetailHeader = styled.div`
  position: relative;
  height: 50vh;
  overflow: hidden;
`;

const HeaderImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailContent = styled.div`
  padding: 2rem;
  color: white;
`;

const TechStack = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const TechBadge = styled(motion.span)`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const GalleryItem = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`;

const ProjectDetail = ({ project, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <AnimatePresence>
      <DetailOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <DetailContainer
          onClick={e => e.stopPropagation()}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          <DetailHeader>
            <HeaderImage
              src={project.image}
              alt={project.title}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          </DetailHeader>

          <DetailContent>
            <StaggerAnimation>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              
              <TechStack>
                {project.technologies.map((tech, index) => (
                  <TechBadge
                    key={tech}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tech}
                  </TechBadge>
                ))}
              </TechStack>

              <Gallery>
                {project.gallery?.map((image, index) => (
                  <GalleryItem
                    key={index}
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    onClick={() => setSelectedImage(image)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </Gallery>
            </StaggerAnimation>
          </DetailContent>
        </DetailContainer>
      </DetailOverlay>
    </AnimatePresence>
  );
};

export default ProjectDetail; 