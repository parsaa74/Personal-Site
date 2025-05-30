import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Particle animation keyframes
const particleFloat = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-40px) rotate(360deg);
    opacity: 0;
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  animation: ${particleFloat} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0;
`;

// Branch-like particle trails
const BranchParticle = styled.div`
  position: absolute;
  width: 2px;
  height: ${props => props.length}px;
  background: linear-gradient(
    to bottom,
    ${props => props.color},
    transparent
  );
  transform-origin: top center;
  animation: ${keyframes`
    0% {
      transform: rotate(${props => props.angle}deg) scaleY(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotate(${props => props.angle}deg) scaleY(1);
      opacity: 0;
    }
  `} ${props => props.duration}s ease-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const ParticleImageEffect = ({ 
  isActive = false, 
  isLight = false, 
  intensity = 0.5,
  particleCount = 20,
  className 
}) => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [branchParticles, setBranchParticles] = useState([]);

  // Generate particles
  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      setBranchParticles([]);
      return;
    }

    const newParticles = [];
    const newBranchParticles = [];
    
    // Create floating particles
    for (let i = 0; i < particleCount * intensity; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: 100 + Math.random() * 20, // Start below container
        size: Math.random() * 3 + 1,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 2,
        color: isLight 
          ? `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`
          : `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
      });
    }

    // Create branch-like particles
    for (let i = 0; i < particleCount * intensity * 0.5; i++) {
      newBranchParticles.push({
        id: i + 1000,
        x: Math.random() * 100,
        y: Math.random() * 100,
        length: Math.random() * 30 + 10,
        angle: Math.random() * 360,
        duration: Math.random() * 3 + 1,
        delay: Math.random() * 1.5,
        color: isLight 
          ? `rgba(0, 0, 0, ${Math.random() * 0.2 + 0.05})`
          : `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`
      });
    }

    setParticles(newParticles);
    setBranchParticles(newBranchParticles);
  }, [isActive, intensity, particleCount, isLight]);

  if (!isActive) {
    return null;
  }

  return (
    <ParticleContainer ref={containerRef} className={className}>
      {/* Floating particles */}
      {particles.map(particle => (
        <Particle
          key={particle.id}
          size={particle.size}
          color={particle.color}
          duration={particle.duration}
          delay={particle.delay}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        />
      ))}
      
      {/* Branch-like particles */}
      {branchParticles.map(particle => (
        <BranchParticle
          key={particle.id}
          length={particle.length}
          angle={particle.angle}
          color={particle.color}
          duration={particle.duration}
          delay={particle.delay}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        />
      ))}
    </ParticleContainer>
  );
};

export default ParticleImageEffect; 