import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeScene = ({ mousePosition }) => {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    // Use scene and camera
    scene.background = new THREE.Color(0x000000);
    camera.position.z = 5;
    
    // ... rest of the effect code ...
    
    return () => {
      // Cleanup
    };
  }, [isMobile]);
  
  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default ThreeScene; 