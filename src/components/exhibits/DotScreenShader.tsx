import { useMemo, useEffect, FC } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const VERTEX_SHADER = `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec3 dotColor;
  uniform vec3 bgColor;
  uniform vec2 uMouse;
  uniform float gridSize;
  uniform float dotOpacity;

  vec2 coverUv(vec2 uv) {
    vec2 s = resolution.xy / max(resolution.x, resolution.y);
    return (uv - 0.5) * s + 0.5;
  }

  float sdfCircle(vec2 p, float r) {
    return length(p - 0.5) - r;
  }

  void main() {
    vec2 screenUv = gl_FragCoord.xy / resolution;
    vec2 uv = coverUv(screenUv);

    // Create a grid
    vec2 gridUv = fract(uv * gridSize);
    
    // Mouse influence
    float distToMouse = length(uv - uMouse);
    float mouseInfluence = smoothstep(0.4, 0.0, distToMouse);
    
    // Animated mask
    float circleMaskCenter = length(uv - 0.5);
    float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);
    
    float scaleInfluence = max(mouseInfluence * 1.5, circleAnimatedMask * 0.3);
    float dotSize = 0.25 * (1.0 + scaleInfluence * 1.2);

    float sdfDot = sdfCircle(gridUv, dotSize);
    float smoothDot = smoothstep(0.05, 0.0, sdfDot);

    float opacityInfluence = max(mouseInfluence * 3.0, circleAnimatedMask * 0.5);
    vec3 composition = mix(bgColor, dotColor, smoothDot * dotOpacity * (1.0 + opacityInfluence));

    gl_FragColor = vec4(composition, 1.0);
  }
`;

export const DotScreenShader: FC = () => {
  const { size, viewport } = useThree();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() },
        dotColor: { value: new THREE.Color('#00F0FF') },
        bgColor: { value: new THREE.Color('#050505') },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        gridSize: { value: 60 },
        dotOpacity: { value: 0.6 }
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true
    });
  }, []);

  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.elapsedTime;
      const u = (state.pointer.x + 1) / 2;
      const v = (state.pointer.y + 1) / 2;
      material.uniforms.uMouse.value.x += (u - material.uniforms.uMouse.value.x) * 0.1;
      material.uniforms.uMouse.value.y += (v - material.uniforms.uMouse.value.y) * 0.1;
    }
  });

  useEffect(() => {
    material.uniforms.resolution.value.set(
      size.width * viewport.dpr,
      size.height * viewport.dpr
    );
  }, [size, viewport, material]);

  return (
    <mesh scale={[size.width, size.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};
