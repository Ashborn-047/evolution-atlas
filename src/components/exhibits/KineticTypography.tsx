'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { ShaderMaterial, Vector2 } from 'three';
import { useAtlasStore } from '@/lib/store';
import { SHADERS } from '@/lib/shaders';

/**
 * Kinetic Typography Exhibit
 * 
 * Text with vertex displacement responding to mouse proximity.
 * Creates a repulsion field that distorts letterforms organically.
 */
export function KineticTypography() {
  const groupRef = useRef<any>(null);
  const { shaderUniforms, updateUniform } = useAtlasStore();
  const { pointer } = useThree();

  // Create shader material for text
  const material = useMemo(() => {
    const shader = SHADERS.kineticType;
    return new ShaderMaterial({
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new Vector2(0, 0) },
        uIntensity: { value: shaderUniforms.uIntensity },
        uColor: { value: shaderUniforms.uColor },
      },
    });
  }, []);

  useFrame((state) => {
    if (!material.uniforms) return;

    // Update uniforms
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value.set(pointer.x * 2, pointer.y * 2);
    material.uniforms.uIntensity.value = shaderUniforms.uIntensity;
    material.uniforms.uColor.value = shaderUniforms.uColor;

    updateUniform('uTime', state.clock.elapsedTime);

    // Gentle group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main headline */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.8}
        maxWidth={10}
        textAlign="center"
        font="/fonts/JetBrainsMono-Bold.woff"
        material={material}
      >
        KINETIC
      </Text>
      
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.8}
        maxWidth={10}
        textAlign="center"
        font="/fonts/JetBrainsMono-Bold.woff"
        material={material}
      >
        TYPOGRAPHY
      </Text>

      {/* Subtitle with standard material */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        maxWidth={10}
        textAlign="center"
        color="#999999"
      >
        Move your cursor to interact
      </Text>
    </group>
  );
}
