import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTheme, ThemeProvider } from 'next-themes'
import * as THREE from 'three'

// ============================================
// DOT SCREEN SHADER COMPONENT (2D Background)
// ============================================

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

    vec2 gridUv = fract(rotatedUv * gridSize);
    
    float baseDot = sdfCircle(gridUv, 0.25);
    float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y);
    vec2 centerDisplace = vec2(0.7, 1.1);
    float circleMaskCenter = length(uv - centerDisplace);
    float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);
    
    float combinedMask = screenMask * circleMaskFromCenter;
    float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

    float distToMouse = length(uv - uMouse);
    float mouseInfluence = smoothstep(0.4, 0.0, distToMouse); // Larger radius
    
    float scaleInfluence = max(mouseInfluence * 1.5, circleAnimatedMask * 0.3); // Stronger scale
    float dotSize = min(pow(circleMaskCenter, 2.0) * 0.35, 0.35); // Slightly larger base
    float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 1.2)); // More growth
    float smoothDot = smoothstep(0.05, 0.0, sdfDot);
    float opacityInfluence = max(mouseInfluence * 3.0, circleAnimatedMask * 0.5); // Brighter near mouse

    vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));
    gl_FragColor = vec4(composition, 1.0);
  }
`

function ShaderScene() {
    const size = useThree((s) => s.size)
    const viewport = useThree((s) => s.viewport)

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                resolution: { value: new THREE.Vector2() },
                dotColor: { value: new THREE.Color('#c084fc') }, // Brighter purple-violet
                bgColor: { value: new THREE.Color('#030303') },  // Darker background
                uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                rotation: { value: 0 },
                gridSize: { value: 60 },  // Slightly fewer, larger dots
                dotOpacity: { value: 0.6 } // Much more visible
            },
            vertexShader: VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            transparent: true
        })
    }, [])

    useFrame((state) => {
        if (material) {
            material.uniforms.time.value = state.clock.elapsedTime
            const u = (state.pointer.x + 1) / 2
            const v = (state.pointer.y + 1) / 2
            material.uniforms.uMouse.value.x += (u - material.uniforms.uMouse.value.x) * 0.1
            material.uniforms.uMouse.value.y += (v - material.uniforms.uMouse.value.y) * 0.1
        }
    })

    useEffect(() => {
        material.uniforms.resolution.value.set(
            size.width * viewport.dpr,
            size.height * viewport.dpr
        )
    }, [size, viewport, material])

    const scale = Math.max(viewport.width, viewport.height) / 2

    return (
        <mesh scale={[scale, scale, 1]}>
            <planeGeometry args={[2, 2]} />
            <primitive object={material} attach="material" />
        </mesh>
    )
}

function DotShaderBackground() {
    return (
        <Canvas flat style={{ width: '100%', height: '100%' }}>
            <ShaderScene />
        </Canvas>
    )
}

// ============================================
// ICONS (Simple SVG replacements for lucide-react)
// ============================================

const GridIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
)

const ArrowRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

// ============================================
// INTERACTIVE CARD COMPONENT
// ============================================

export function DotScreenCard() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Card Container */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '24rem',
                    overflow: 'hidden',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: '#171717',
                    transition: 'all 0.3s ease',
                    boxShadow: isHovered ? '0 25px 50px -12px rgba(168, 85, 247, 0.25)' : 'none'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background Shader Layer */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    height: '400px'
                }}>
                    <DotShaderBackground />
                    {/* Gradient overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(23,23,23,0.9) 100%)',
                        pointerEvents: 'none'
                    }} />
                </div>

                {/* Content Layer */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '400px',
                    padding: '1.5rem'
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <div style={{
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            transition: 'transform 0.5s ease',
                            transform: isHovered ? 'scale(1.1) rotate(3deg)' : 'none',
                            color: '#c084fc'
                        }}>
                            <GridIcon />
                        </div>
                        <span style={{
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            color: 'rgba(192, 132, 252, 0.8)',
                            background: 'rgba(147, 51, 234, 0.2)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            border: '1px solid rgba(147, 51, 234, 0.3)'
                        }}>
                            SYS.02
                        </span>
                    </div>

                    {/* Body */}
                    <div>
                        <div style={{ marginBottom: '1rem' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                letterSpacing: '-0.025em',
                                color: 'white',
                                marginBottom: '0.5rem',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                            }}>
                                Dot Matrix Field
                            </h2>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#d4d4d4',
                                lineHeight: 1.6,
                                fontWeight: 300
                            }}>
                                Reactive particle grid with mouse-tracking interpolation.
                                Each node pulses in harmonic resonance. Field density: 80×80.
                            </p>
                        </div>

                        {/* Action Button */}
                        <div style={{ paddingTop: '1rem' }}>
                            <button style={{
                                position: 'relative',
                                width: '100%',
                                overflow: 'hidden',
                                borderRadius: '0.75rem',
                                background: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                                padding: '1px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    borderRadius: '0.75rem',
                                    background: 'rgba(23,23,23,0.5)',
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: 'white',
                                    backdropFilter: 'blur(4px)'
                                }}>
                                    <span>Activate Grid</span>
                                    <span style={{
                                        transition: 'transform 0.3s ease',
                                        transform: isHovered ? 'translateX(4px)' : 'none'
                                    }}>
                                        <ArrowRightIcon />
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Interactive Border Glow */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    border: `2px solid ${isHovered ? 'rgba(168, 85, 247, 0.3)' : 'transparent'}`,
                    borderRadius: '1rem',
                    transition: 'all 0.5s ease'
                }} />
            </div>
        </div>
    )
}

export default DotScreenCard
