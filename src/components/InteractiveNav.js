import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as THREE from 'three';

const InteractiveNav = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    let camera, scene, renderer, raycaster;
    let navigationMeshes = [];
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    raycaster = new THREE.Raycaster();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    camera.position.z = 5;
    
    // Create navigation elements
    const sections = [
      { path: '/', label: 'HOME', position: new THREE.Vector3(-3, 2, 0) },
      { path: '/projects', label: 'PROJECTS', position: new THREE.Vector3(1, 2, 0) },
      { path: '/about', label: 'ABOUT', position: new THREE.Vector3(-3, -1, 0) },
      { path: '/contact', label: 'CONTACT', position: new THREE.Vector3(1, -1, 0) }
    ];
    
    sections.forEach(section => {
      const geometry = new THREE.RingGeometry(0.5, 0.7, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: location.pathname === section.path ? 0.9 : 0.3
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(section.position);
      mesh.userData = { path: section.path };
      
      // Add text label
      const textGeometry = new THREE.PlaneGeometry(1, 0.3);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 64;
      context.fillStyle = '#ffffff';
      context.font = '32px Inter';
      context.textAlign = 'center';
      context.fillText(section.label, 128, 40);
      
      const texture = new THREE.CanvasTexture(canvas);
      const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: location.pathname === section.path ? 1 : 0.5
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.copy(section.position);
      textMesh.position.y -= 1;
      
      scene.add(mesh);
      scene.add(textMesh);
      navigationMeshes.push(mesh);
    });
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(ambientLight);
    scene.add(pointLight);
    
    // Handle interaction
    const mouse = new THREE.Vector2();
    
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(navigationMeshes);
      
      navigationMeshes.forEach(mesh => {
        mesh.material.opacity = 0.3;
        if (mesh.userData.path === location.pathname) {
          mesh.material.opacity = 0.9;
        }
      });
      
      if (intersects.length > 0) {
        intersects[0].object.material.opacity = 0.8;
      }
    };
    
    const onClick = (event) => {
      if (isTransitioning) return;
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(navigationMeshes);
      
      if (intersects.length > 0) {
        setIsTransitioning(true);
        const path = intersects[0].object.userData.path;
        navigate(path);
        setTimeout(() => setIsTransitioning(false), 800);
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      navigationMeshes.forEach(mesh => {
        mesh.rotation.z += 0.001;
      });
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.dispose();
      renderer.dispose();
    };
  }, [location, navigate, isTransitioning]);
  
  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default InteractiveNav; 