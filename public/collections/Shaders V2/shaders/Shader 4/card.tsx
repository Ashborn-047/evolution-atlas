import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// ============================================
// AURORA SHADER BACKGROUND
// ============================================

function AuroraBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

        const width = container.clientWidth
        const height = container.clientHeight

        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.top = '0'
        renderer.domElement.style.left = '0'
        renderer.domElement.style.width = '100%'
        renderer.domElement.style.height = '100%'

        container.appendChild(renderer.domElement)

        const material = new THREE.ShaderMaterial({
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector2(width, height) }
            },
            vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES 2

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

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.4;
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = x * 2.0 + vec2(50.0);
            a *= 0.5;
          }
          return v;
        }

        void main() {
          // --- STAR FIELD (simplified - 2 layers) ---
          vec2 starUV = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
          vec3 starLayer = vec3(0.0);
          
          for(float k=1.0; k<=2.0; k++){
              vec2 s = starUV * (12.0 * k + 10.0);
              vec2 id = floor(s);
              vec2 q = fract(s) - 0.5;
              float r = rand(id + k * 50.0);
              
              if(r > 0.97){
                  vec2 pos = vec2(r - 0.5, fract(r * 34.0) - 0.5) * 0.7;
                  float d = length(q - pos);
                  float b = smoothstep(0.04 / k, 0.0, d); 
                  float t = 0.6 + 0.4 * sin(iTime * 2.0 * k + r * 50.0);
                  starLayer += vec3(b * t);
              }
          }

          // --- AURORA (optimized) ---
          vec2 shake = vec2(sin(iTime * 1.8) * 0.008, cos(iTime * 2.3) * 0.008);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec4 o = vec4(0.0);

          float f = 2.0 + noise(p + vec2(iTime * 3.0, 0.0)) * 0.5;

          for (float i = 0.0; i < 20.0; i++) {
            float wave = sin(iTime * 1.5 + i * 0.4) * 0.3;
            vec2 v = p + cos(i * i + (iTime * 0.8 + p.x * 0.1) * 0.1 + i * vec2(13.0, 11.0)) * (3.2 + wave);
            v += vec2(sin(iTime * 2.5 + i * 0.2) * 0.015, cos(iTime * 3.0 - i * 0.15) * 0.015);
            
            vec4 auroraColors = vec4(
              0.15 + 0.35 * sin(i * 0.3 + iTime * 0.8),
              0.35 + 0.45 * cos(i * 0.4 + iTime * 1.0),
              0.7 + 0.25 * sin(i * 0.5 + iTime * 0.7),
              1.0
            );
            
            vec4 contrib = auroraColors * exp(sin(i * i + iTime * 1.2)) / length(max(v, vec2(v.x * f * 0.02, v.y * 1.4)));
            float thin = smoothstep(0.0, 1.0, i / 20.0) * 0.7;
            o += contrib * thin;
          }

          o = tanh(pow(o / 60.0, vec4(1.5)));
          
          gl_FragColor = (o * 1.6) + vec4(starLayer * 0.7, 1.0);
        }
      `
        })

        const geometry = new THREE.PlaneGeometry(2, 2)
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        let frameId: number
        const animate = () => {
            material.uniforms.iTime.value += 0.02
            renderer.render(scene, camera)
            frameId = requestAnimationFrame(animate)
        }
        animate()

        const handleResize = () => {
            if (!container) return
            const newWidth = container.clientWidth
            const newHeight = container.clientHeight
            renderer.setSize(newWidth, newHeight)
            material.uniforms.iResolution.value.set(newWidth, newHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener('resize', handleResize)
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement)
            }
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                background: '#000'
            }}
        />
    )
}

// ============================================
// ICONS
// ============================================

const WavesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
)

const ArrowRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

// ============================================
// AURORA CARD
// ============================================

export function AuroraCard() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div style={{
            minHeight: '100vh',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Wrapper for glow effect */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '24rem' }}>

                {/* Background Blur Gradient Glow - Green/Cyan aurora colors */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    width: '100%',
                    background: 'linear-gradient(to right, #10b981, #06b6d4, #8b5cf6)',
                    transform: 'scale(0.85)',
                    borderRadius: '9999px',
                    filter: 'blur(60px)',
                    opacity: 0.4,
                    pointerEvents: 'none'
                }} />

                {/* Card Container */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '1rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: '#0a0a0a',
                        transition: 'all 0.3s ease',
                        boxShadow: isHovered ? '0 25px 50px -12px rgba(16, 185, 129, 0.3)' : 'none'
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
                        <AuroraBackground />
                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(10,10,10,0.95) 100%)',
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
                                color: '#34d399'
                            }}>
                                <WavesIcon />
                            </div>
                            <span style={{
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                color: 'rgba(52, 211, 153, 0.8)',
                                background: 'rgba(16, 185, 129, 0.2)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                border: '1px solid rgba(16, 185, 129, 0.3)'
                            }}>
                                SYS.04
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
                                    Aurora Borealis
                                </h2>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: '#d1d5db',
                                    lineHeight: 1.6,
                                    fontWeight: 300
                                }}>
                                    Solar winds collide with magnetosphere. Charged particles
                                    dance across the polar sky. Nature's light show in motion.
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
                                        background: 'rgba(10,10,10,0.5)',
                                        padding: '0.75rem 1rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: 'white',
                                        backdropFilter: 'blur(4px)'
                                    }}>
                                        <span>Enter the Sky</span>
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
                        border: `2px solid ${isHovered ? 'rgba(52, 211, 153, 0.3)' : 'transparent'}`,
                        borderRadius: '1rem',
                        transition: 'all 0.5s ease'
                    }} />
                </div>
            </div>
        </div>
    )
}

export default AuroraCard
