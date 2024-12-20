import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeScene = ({ mousePosition }) => {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    let mesh, particlesMesh;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" // Optimize for mobile
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for better performance
    mountRef.current.appendChild(renderer.domElement);
    
    camera.position.z = isMobile ? 7 : 5; // Adjust camera for mobile
    
    // Create main geometry with reduced complexity for mobile
    const geometry = new THREE.IcosahedronGeometry(2, isMobile ? 0 : 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Reduce particle count for mobile
    const particlesCount = isMobile ? 2000 : 5000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * (isMobile ? 8 : 10);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.008 : 0.005,
      transparent: true,
      color: 0xffffff,
      blending: THREE.AdditiveBlending
    });
    
    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(ambientLight);
    scene.add(pointLight);
    
    // Touch and mouse interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isInteracting = false;
    let lastX = 0;
    let lastY = 0;
    
    const handleInteractionStart = (x, y) => {
      isInteracting = true;
      lastX = x;
      lastY = y;
    };
    
    const handleInteractionMove = (x, y) => {
      if (!isInteracting) return;
      
      const deltaX = (x - lastX) * 0.01;
      const deltaY = (y - lastY) * 0.01;
      
      targetRotationY += deltaX;
      targetRotationX += deltaY;
      
      lastX = x;
      lastY = y;
    };
    
    const handleInteractionEnd = () => {
      isInteracting = false;
    };
    
    // Mouse events
    const handleMouseMove = (event) => {
      if (!isMobile) {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        targetRotationX = y * 0.5;
        targetRotationY = x * 0.5;
        
        particlesMesh.rotation.x = y * 0.2;
        particlesMesh.rotation.y = x * 0.2;
      }
    };
    
    // Touch events
    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      handleInteractionStart(touch.clientX, touch.clientY);
    };
    
    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      handleInteractionMove(touch.clientX, touch.clientY);
    };
    
    // Gyroscope handling for mobile
    let gyroscope = null;
    if (isMobile && window.DeviceOrientationEvent) {
      const handleOrientation = (event) => {
        if (!isInteracting) {
          const x = event.gamma * 0.02; // Left/Right tilt
          const y = event.beta * 0.02; // Front/Back tilt
          
          targetRotationY = x;
          targetRotationX = y;
        }
      };
      
      window.addEventListener('deviceorientation', handleOrientation);
    }
    
    // Animation with performance optimization
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Smooth rotation with damping
      mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.05;
      mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.05;
      
      // Reduced particle animation speed on mobile
      particlesMesh.rotation.x += isMobile ? 0.0002 : 0.0005;
      particlesMesh.rotation.y += isMobile ? 0.0002 : 0.0005;
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleInteractionEnd);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleInteractionEnd);
      if (gyroscope) window.removeEventListener('deviceorientation', handleOrientation);
      
      cancelAnimationFrame(frameId);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Dispose resources
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isMobile]);
  
  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default ThreeScene; 