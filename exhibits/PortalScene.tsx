'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

/**
 * Portal Scene Component
 * 
 * A simple animated 3D preview for each exhibit card.
 * Rotates slowly to create a "window" into the 3D world.
 */
interface PortalSceneProps {
  color: string;
  variant: 'cube' | 'sphere' | 'torus';
}

export function PortalScene({ color, variant }: PortalSceneProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    
    // Subtle floating
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group>
      {/* Rim light */}
      <pointLight position={[2, 2, 2]} intensity={1} color={color} />
      <pointLight position={[-2, -2, -2]} intensity={0.5} color="#00F0FF" />
      
      {/* Geometry based on variant */}
      <mesh ref={meshRef}>
        {variant === 'cube' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {variant === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        {variant === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
        
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Wireframe overlay for cyber aesthetic */}
      <mesh>
        {variant === 'cube' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {variant === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        {variant === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
        
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
