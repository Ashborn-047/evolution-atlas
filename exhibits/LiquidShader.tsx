'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial, Mesh, Vector2 } from 'three';
import { useAtlasStore } from '@/lib/store';
import { SHADERS } from '@/lib/shaders';

/**
 * Liquid Shader Exhibit
 * 
 * A fluid surface that responds to mouse position and time.
 * Implements viscosity simulation using Simplex noise distortion.
 */
export function LiquidShader() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { shaderUniforms, updateUniform } = useAtlasStore();
  const { pointer } = useThree();

  // Create shader material
  const material = useMemo(() => {
    const shader = SHADERS.liquidShader;
    return new ShaderMaterial({
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new Vector2(0, 0) },
        uViscosity: { value: shaderUniforms.uViscosity },
        uDistortion: { value: shaderUniforms.uDistortion },
        uColor: { value: shaderUniforms.uColor },
      },
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;

    // Update time uniform
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    updateUniform('uTime', state.clock.elapsedTime);

    // Update mouse position (normalized to -1 to 1, then mapped to 0-1 for UV space)
    const mouseX = (pointer.x + 1) * 0.5;
    const mouseY = (pointer.y + 1) * 0.5;
    materialRef.current.uniforms.uMouse.value.set(mouseX, mouseY);
    updateUniform('uMouse', [mouseX, mouseY]);

    // Sync with store uniforms
    materialRef.current.uniforms.uViscosity.value = shaderUniforms.uViscosity;
    materialRef.current.uniforms.uDistortion.value = shaderUniforms.uDistortion;
    materialRef.current.uniforms.uColor.value = shaderUniforms.uColor;

    // Gentle floating animation
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[4, 4, 64, 64]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}
