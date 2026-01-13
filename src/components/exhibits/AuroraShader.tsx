import React, { useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const VERTEX_SHADER = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float iTime;
  uniform vec2 iResolution;

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    float res = mix(
      mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
      mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.y;
    vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
    vec4 o = vec4(0.0);

    float f = 2.0 + noise(p + vec2(iTime * 1.5, 0.0)) * 0.5;

    for (float i = 0.0; i < 15.0; i++) {
      float wave = sin(iTime * 1.2 + i * 0.4) * 0.3;
      vec2 v = p + cos(i * i + (iTime * 0.5 + p.x * 0.1) * 0.1 + i * vec2(13.0, 11.0)) * (3.2 + wave);
      
      vec4 auroraColors = vec4(
        0.1 + 0.3 * sin(i * 0.3 + iTime * 0.5),
        0.3 + 0.5 * cos(i * 0.4 + iTime * 0.7),
        0.6 + 0.3 * sin(i * 0.5 + iTime * 0.4),
        1.0
      );
      
      vec4 contrib = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.02, v.y * 1.4)));
      o += contrib * smoothstep(0.0, 1.0, i / 15.0) * 0.5;
    }

    o = tanh(pow(o / 40.0, vec4(1.5)));
    gl_FragColor = vec4(o.rgb * 1.4, 0.6);
  }
`;

export const AuroraShader: React.FC = () => {
    const { size, viewport } = useThree();

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector2() }
            },
            vertexShader: VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
    }, []);

    useFrame((state) => {
        if (material) {
            material.uniforms.iTime.value = state.clock.elapsedTime;
        }
    });

    useEffect(() => {
        material.uniforms.iResolution.value.set(
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
