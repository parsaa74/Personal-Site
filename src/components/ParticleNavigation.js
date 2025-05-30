import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Define navigation zones
const zones = [
  { position: [-2, 2, -2], label: 'nav.about', path: '/about' },
  { position: [2, -2, -2], label: 'nav.projects', path: '/projects' },
  { position: [-2, -2, 2], label: 'nav.contact', path: '/contact' },
];

const PARTICLE_COUNT = 1500; // Reduced for better performance
const HOVER_INTENSITY = 0.05;
const BASE_PARTICLE_SIZE = 0.06;

const COLOR_SCHEMES = {
  cyber: [
    new THREE.Color('#4444ff').multiplyScalar(0.8), // Softer blue
    new THREE.Color('#44ffff').multiplyScalar(0.8), // Softer cyan
    new THREE.Color('#4444aa').multiplyScalar(0.8), // Softer dark blue
  ]
};

function Particles() {
  const { camera } = useThree();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const groupRef = useRef();
  const particlesRef = useRef();
  const mousePosition = useMemo(() => new THREE.Vector3(), []);
  const [activeZone, setActiveZone] = useState(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      const velocity = new THREE.Vector3(
        Math.random() * 0.01 - 0.005,
        Math.random() * 0.01 - 0.005,
        Math.random() * 0.01 - 0.005
      );
      temp.push({
        position,
        velocity,
        initialPosition: position.clone(),
        size: BASE_PARTICLE_SIZE * (0.5 + Math.random() * 0.5),
        color: COLOR_SCHEMES.cyber[Math.floor(Math.random() * COLOR_SCHEMES.cyber.length)]
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array;
    const sizes = particlesRef.current.geometry.attributes.size.array;

    particles.forEach((particle, i) => {
      // Gentle floating motion
      particle.position.y += Math.sin(time * 0.5 + i) * 0.002;
      particle.position.x += Math.cos(time * 0.5 + i) * 0.002;

      // Zone attraction
      if (activeZone !== null) {
        const zonePos = new THREE.Vector3(...zones[activeZone].position);
        const distanceToZone = particle.position.distanceTo(zonePos);
        if (distanceToZone < 5) {
          const force = zonePos.clone().sub(particle.position);
          const strength = (1 - distanceToZone / 5) * HOVER_INTENSITY;
          force.normalize().multiplyScalar(strength);
          particle.velocity.add(force);
        }
      }

      // Update position
      particle.position.add(particle.velocity);
      particle.velocity.multiplyScalar(0.98); // Damping

      // Return to original position
      const distanceToOrigin = particle.position.distanceTo(particle.initialPosition);
      if (distanceToOrigin > 0.1) {
        const returnForce = particle.initialPosition.clone()
          .sub(particle.position)
          .normalize()
          .multiplyScalar(0.001);
        particle.velocity.add(returnForce);
      }

      // Update arrays
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
      sizes[i] = particle.size * (1 + Math.sin(time * 2 + i) * 0.2); // Pulsing size
    });

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={new Float32Array(particles.length * 3)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particles.length}
            array={new Float32Array(particles.length)}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={BASE_PARTICLE_SIZE}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>
      {zones.map((zone, i) => (
        <Text
          key={i}
          position={zone.position}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          onClick={() => navigate(zone.path)}
          onPointerOver={() => setActiveZone(i)}
          onPointerOut={() => setActiveZone(null)}
        >
          {t(zone.label)}
        </Text>
      ))}
    </group>
  );
}

const ParticleNavigation = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'transparent',
      pointerEvents: 'auto'
    }}>
      <Canvas
        camera={{
          position: [0, 0, 12],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.3}
          dampingFactor={0.2}
        />
      </Canvas>
    </div>
  );
};

export default ParticleNavigation; 