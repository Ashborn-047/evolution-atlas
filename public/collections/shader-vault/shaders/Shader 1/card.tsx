import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// ============================================
// NEURAL RIPPLE SHADER BACKGROUND
// ============================================

function ShaderAnimation() {
    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<{
        camera: THREE.Camera
        scene: THREE.Scene
        renderer: THREE.WebGLRenderer
        uniforms: {
            time: { type: string; value: number }
            resolution: { type: string; value: THREE.Vector2 }
            u_mouse: { type: string; value: THREE.Vector2 }
        }
        animationId: number
    } | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current

        const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

        const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 u_mouse;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        vec2 mouse = (u_mouse.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        float t = time * 0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            color[j] += lineWidth * float(i*i) / abs(fract(t - 0.01*float(j) + float(i)*0.01) * 5.0 - length(uv - mouse) + mod(uv.x + uv.y, 0.2));
          }
        }
        
        gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
      }
    `

        const camera = new THREE.Camera()
        camera.position.z = 1

        const scene = new THREE.Scene()
        const geometry = new THREE.PlaneGeometry(2, 2)

        const uniforms = {
            time: { type: 'f', value: 1.0 },
            resolution: { type: 'v2', value: new THREE.Vector2() },
            u_mouse: { type: 'v2', value: new THREE.Vector2() },
        }

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        })

        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(window.devicePixelRatio)

        container.appendChild(renderer.domElement)

        const onWindowResize = () => {
            if (!container) return
            const width = container.clientWidth
            const height = container.clientHeight
            renderer.setSize(width, height)
            uniforms.resolution.value.x = renderer.domElement.width
            uniforms.resolution.value.y = renderer.domElement.height

            if (uniforms.u_mouse.value.x === 0 && uniforms.u_mouse.value.y === 0) {
                uniforms.u_mouse.value.x = renderer.domElement.width / 2
                uniforms.u_mouse.value.y = renderer.domElement.height / 2
            }
        }

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = rect.height - (e.clientY - rect.top)
            uniforms.u_mouse.value.set(x, y)
        }

        onWindowResize()
        uniforms.u_mouse.value.set(container.clientWidth / 2, container.clientHeight / 2)

        window.addEventListener('resize', onWindowResize, false)
        container.addEventListener('mousemove', onMouseMove)

        const animate = () => {
            const animationId = requestAnimationFrame(animate)
            uniforms.time.value += 0.05
            renderer.render(scene, camera)
            if (sceneRef.current) sceneRef.current.animationId = animationId
        }

        sceneRef.current = { camera, scene, renderer, uniforms, animationId: 0 }
        animate()

        return () => {
            window.removeEventListener('resize', onWindowResize)
            container.removeEventListener('mousemove', onMouseMove)
            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId)
                if (container && sceneRef.current.renderer.domElement && container.contains(sceneRef.current.renderer.domElement)) {
                    container.removeChild(sceneRef.current.renderer.domElement)
                }
                sceneRef.current.renderer.dispose()
                geometry.dispose()
                material.dispose()
            }
        }
    }, [])

    return (
        <div
            ref={containerRef}
            style={{ width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}
        />
    )
}

// ============================================
// ICONS (Simple SVG replacements for lucide-react)
// ============================================

const SparklesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
        <path d="M19 12l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
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

export function NeuralInterfaceCard() {
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
                    boxShadow: isHovered ? '0 25px 50px -12px rgba(34, 211, 238, 0.25)' : 'none'
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
                    <ShaderAnimation />
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
                            color: '#67e8f9'
                        }}>
                            <SparklesIcon />
                        </div>
                        <span style={{
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            color: 'rgba(103, 232, 249, 0.8)',
                            background: 'rgba(8, 145, 178, 0.2)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            border: '1px solid rgba(6, 182, 212, 0.3)'
                        }}>
                            SYS.01
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
                                Neural Interface
                            </h2>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#d4d4d4',
                                lineHeight: 1.6,
                                fontWeight: 300
                            }}>
                                Direct neural link established. The shader field responds to kinetic input.
                                Synchronization rate at 98%.
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
                                    <span>Initialize Link</span>
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
                    border: `2px solid ${isHovered ? 'rgba(34, 211, 238, 0.3)' : 'transparent'}`,
                    borderRadius: '1rem',
                    transition: 'all 0.5s ease'
                }} />
            </div>
        </div>
    )
}

export default NeuralInterfaceCard
