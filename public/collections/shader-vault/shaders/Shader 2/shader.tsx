'use client'

import { useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

// 1. Define the shader code as constant strings
const VERTEX_SHADER = `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec3 dotColor;
  uniform vec3 bgColor;
  uniform vec2 uMouse;
  uniform float rotation;
  uniform float gridSize;
  uniform float dotOpacity;

  vec2 rotate(vec2 uv, float angle) {
      float s = sin(angle);
      float c = cos(angle);
      mat2 rotationMatrix = mat2(c, -s, s, c);
      return rotationMatrix * (uv - 0.5) + 0.5;
  }

  vec2 coverUv(vec2 uv) {
    vec2 s = resolution.xy / max(resolution.x, resolution.y);
    vec2 newUv = (uv - 0.5) * s + 0.5;
    return clamp(newUv, 0.0, 1.0);
  }

  float sdfCircle(vec2 p, float r) {
      return length(p - 0.5) - r;
  }

  void main() {
    vec2 screenUv = gl_FragCoord.xy / resolution;
    vec2 uv = coverUv(screenUv);

    vec2 rotatedUv = rotate(uv, rotation);

    // Create a grid
    vec2 gridUv = fract(rotatedUv * gridSize);
    vec2 gridUvCenterInScreenCoords = rotate((floor(rotatedUv * gridSize) + 0.5) / gridSize, -rotation);

    // Calculate distance from the center of each cell
    float baseDot = sdfCircle(gridUv, 0.25);

    // Screen mask
    float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y); // 0 at the top, 1 at the bottom
    vec2 centerDisplace = vec2(0.7, 1.1);
    float circleMaskCenter = length(uv - centerDisplace);
    float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);
    
    float combinedMask = screenMask * circleMaskFromCenter;
    float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

    // Mouse influence (simple distance check instead of texture trail)
    // We calculate distance in the 'covered' UV space to match the grid distortion
    // This replaces the texture lookup from the 'drei' dependency
    float distToMouse = length(uv - uMouse);
    float mouseInfluence = smoothstep(0.4, 0.0, distToMouse); // Larger radius
    
    float scaleInfluence = max(mouseInfluence * 1.5, circleAnimatedMask * 0.3); // Stronger scale

    // Create dots with animated scale, influenced by mouse
    float dotSize = min(pow(circleMaskCenter, 2.0) * 0.35, 0.35); // Slightly larger base

    float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 1.2)); // More growth

    float smoothDot = smoothstep(0.05, 0.0, sdfDot);

    float opacityInfluence = max(mouseInfluence * 3.0, circleAnimatedMask * 0.5); // Brighter near mouse

    // Mix background color with dot color, using animated opacity to increase visibility
    vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));

    gl_FragColor = vec4(composition, 1.0);
  }
`

function Scene() {
    const size = useThree((s) => s.size)
    const viewport = useThree((s) => s.viewport)

    // Defensive hook usage in case Provider is missing
    const themeCtx = useTheme()
    const theme = themeCtx?.theme || 'dark'

    const rotation = 0
    const gridSize = 60 // Fewer, larger dots

    // Theme logic - enhanced contrast
    const getThemeColors = () => {
        switch (theme) {
            case 'dark':
                return { dotColor: '#c084fc', bgColor: '#030303', dotOpacity: 0.6 }
            case 'light':
                return { dotColor: '#7c3aed', bgColor: '#fafafa', dotOpacity: 0.4 }
            default:
                return { dotColor: '#c084fc', bgColor: '#030303', dotOpacity: 0.6 }
        }
    }

    const themeColors = getThemeColors()

    // 2. Instantiate ShaderMaterial directly using useMemo
    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                resolution: { value: new THREE.Vector2() },
                dotColor: { value: new THREE.Color('#FFFFFF') },
                bgColor: { value: new THREE.Color('#121212') },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) }, // Center by default
                rotation: { value: rotation },
                gridSize: { value: gridSize },
                dotOpacity: { value: 0.05 }
            },
            vertexShader: VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            transparent: true
        })
    }, [])

    // Update uniforms that change frequently (time, mouse)
    useFrame((state) => {
        if (material) {
            material.uniforms.time.value = state.clock.elapsedTime

            // Map pointer (-1 to 1) to UV space (0 to 1)
            const u = (state.pointer.x + 1) / 2
            const v = (state.pointer.y + 1) / 2

            // Lerp for smoothness (optional, but nice)
            material.uniforms.uMouse.value.x += (u - material.uniforms.uMouse.value.x) * 0.1
            material.uniforms.uMouse.value.y += (v - material.uniforms.uMouse.value.y) * 0.1
        }
    })

    // Update uniforms that change on theme change or resize
    useEffect(() => {
        material.uniforms.dotColor.value.set(themeColors.dotColor)
        material.uniforms.bgColor.value.set(themeColors.bgColor)
        material.uniforms.dotOpacity.value = themeColors.dotOpacity

        // Update resolution
        material.uniforms.resolution.value.set(
            size.width * viewport.dpr,
            size.height * viewport.dpr
        )
    }, [themeColors, size, viewport, material])

    const scale = Math.max(viewport.width, viewport.height) / 2

    return (
        <mesh scale={[scale, scale, 1]}>
            <planeGeometry args={[2, 2]} />
            {/* 3. Use primitive to attach the material instance safely */}
            <primitive object={material} attach="material" />
        </mesh>
    )
}

export const DotScreenShader = () => {
    return (
        <Canvas
            // 'flat' mode bypasses complex color management (toneMapping/encoding)
            flat
            style={{ width: '100%', height: '100%' }}
        >
            <Scene />
        </Canvas>
    )
}
