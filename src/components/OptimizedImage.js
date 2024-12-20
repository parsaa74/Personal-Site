import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: ${props => props.height || 'auto'};
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  border-radius: ${props => props.borderRadius || '0'};
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  opacity: ${props => props.isLoaded ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const Placeholder = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const OptimizedImage = ({
  src,
  alt,
  height,
  borderRadius,
  objectFit,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setError(true);

  return (
    <ImageContainer
      height={height}
      borderRadius={borderRadius}
      {...props}
    >
      <AnimatePresence>
        {!isLoaded && !error && (
          <Placeholder
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      
      {!error && (
        <StyledImage
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          isLoaded={isLoaded}
          objectFit={objectFit}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </ImageContainer>
  );
};

export default OptimizedImage; 