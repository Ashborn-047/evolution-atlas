'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, ShaderMaterial } from 'three';
import { useAtlasStore } from '@/lib/store';
import { SHADERS } from '@/lib/shaders';

/**
 * Aether Sync Exhibit
 * 
 * 5,000+ instanced particles following curl noise flow.
 * Simulates data streams with GPU-accelerated particle system.
 */

const PARTICLE_COUNT = 5000;

export function AetherSync() {
  const meshRef = useRef<InstancedMesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { shaderUniforms, updateUniform } = useAtlasStore();

  // Generate particle attributes
  const { offsets, phases } = useMemo(() => {
    const offsets = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Random position in sphere
      const radius = Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      offsets[i3] = radius * Math.sin(phi) * Math.cos(theta);
      offsets[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      offsets[i3 + 2] = radius * Math.cos(phi);

      phases[i] = Math.random() * Math.PI * 2;
    }

    return { offsets, phases };
  }, []);

  // Create shader material
  const material = useMemo(() => {
    const shader = SHADERS.aetherSync;
    return new ShaderMaterial({
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: shaderUniforms.uIntensity },
        uColor: { value: shaderUniforms.uColor },
      },
      transparent: true,
      depthWrite: false,
    });
  }, []);

  // Initialize instance positions
  useMemo(() => {
    if (!meshRef.current) return;

    const dummy = new Object3D();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      dummy.position.set(offsets[i3], offsets[i3 + 1], offsets[i3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [offsets]);

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;

    // Update uniforms
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uIntensity.value = shaderUniforms.uIntensity;
    materialRef.current.uniforms.uColor.value = shaderUniforms.uColor;

    updateUniform('uTime', state.clock.elapsedTime);

    // Rotate the entire particle system
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
      material={material}
    >
      <sphereGeometry args={[0.02, 8, 8]} />
      <primitive object={material} ref={materialRef} attach="material" />

      {/* Pass attributes to shader */}
      <instancedBufferAttribute
        attach="geometry-attributes-offset"
        args={[offsets, 3]}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-phase"
        args={[phases, 1]}
      />
    </instancedMesh>
  );
}
