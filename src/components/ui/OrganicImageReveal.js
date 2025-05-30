import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ParticleImageEffect from './ParticleImageEffect';

// Organic reveal animation inspired by branch growth
const organicReveal = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-2deg);
    filter: blur(8px);
    clip-path: polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%);
  }
  25% {
    filter: blur(4px);
    clip-path: polygon(30% 30%, 70% 30%, 70% 70%, 30% 70%);
  }
  50% {
    filter: blur(2px);
    clip-path: polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%);
  }
  75% {
    filter: blur(1px);
    clip-path: polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: blur(0px);
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
`;

// Particle glow effect
const particleGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255,255,255,0.1);
  }
  50% { 
    box-shadow: 0 0 40px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.1);
  }
`;

// Container for the image with organic styling
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || '300px'};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  background: ${props => props.isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &:hover {
    transform: ${props => props.clickable ? 'translateY(-2px)' : 'none'};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      ${props => props.isLight ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'} 50%,
      transparent 100%
    );
    z-index: 2;
    pointer-events: none;
  }
`;

// Main image element with organic animations
const OrganicImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  ${props => props.isVisible && css`
    animation: ${organicReveal} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  `}
  
  ${props => props.clickable && css`
    &:hover {
      transform: scale(1.05);
      animation: ${particleGlow} 2s infinite;
    }
  `}
`;

// Loading placeholder with branch-like pattern
const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Moderat';
  font-size: 0.9rem;
  color: ${props => props.isLight ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 40px;
    background: ${props => props.isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    animation: ${keyframes`
      0% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(45deg) scale(1.2); }
      50% { transform: rotate(90deg) scale(1); }
      75% { transform: rotate(135deg) scale(1.2); }
      100% { transform: rotate(180deg) scale(1); }
    `} 2s infinite linear;
  }
`;

// Error state with organic styling
const ErrorPlaceholder = styled(LoadingPlaceholder)`
  background: ${props => props.isLight ? 'rgba(200, 0, 0, 0.1)' : 'rgba(255, 100, 100, 0.1)'};
  color: ${props => props.isLight ? 'rgba(200, 0, 0, 0.7)' : 'rgba(255, 150, 150, 0.7)'};
  
  &::after {
    background: ${props => props.isLight ? 'rgba(200, 0, 0, 0.3)' : 'rgba(255, 150, 150, 0.3)'};
    animation: none;
  }
`;

const OrganicImageReveal = ({ 
  src, 
  alt, 
  height = '300px', 
  isLight = false, 
  delay = 0,
  onLoad,
  onError,
  onClick,
  className,
  style,
  enableParticles = true,
  particleIntensity = 0.3
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show particles shortly after image becomes visible
      if (enableParticles) {
        setTimeout(() => setShowParticles(true), 600);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, enableParticles]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError();
  };

  const handleClick = () => {
    if (onClick && !isLoading && !hasError) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <ImageContainer 
      height={height} 
      isLight={isLight} 
      className={className}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      clickable={!!onClick}
    >
      {isLoading && !hasError && (
        <LoadingPlaceholder isLight={isLight}>
          Loading...
        </LoadingPlaceholder>
      )}
      
      {hasError && (
        <ErrorPlaceholder isLight={isLight}>
          Image not found
        </ErrorPlaceholder>
      )}
      
      <OrganicImage
        ref={imageRef}
        src={src}
        alt={alt}
        isVisible={isVisible && !isLoading}
        clickable={!!onClick}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      
      {/* Particle effects that activate on hover or when image is revealed */}
      {enableParticles && (showParticles || isHovered) && !isLoading && !hasError && (
        <ParticleImageEffect
          isActive={true}
          isLight={isLight}
          intensity={isHovered ? particleIntensity * 2 : particleIntensity}
          particleCount={isHovered ? 15 : 8}
        />
      )}
    </ImageContainer>
  );
};

export default OrganicImageReveal; 