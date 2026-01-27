import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ============================================
// NEURAL RIPPLE SHADER - Mouse-reactive rings
// ============================================

export default function ShaderAnimation() {
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

        // Vertex shader
        const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

        // Fragment shader - colorful ripple effect
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

        // Initialize Three.js scene
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

        // Handle window resize
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

        // Handle mouse move
        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = rect.height - (e.clientY - rect.top) // Flip Y for WebGL
            uniforms.u_mouse.value.set(x, y)
        }

        // Initial resize
        onWindowResize()

        // Set initial mouse to center
        uniforms.u_mouse.value.set(container.clientWidth / 2, container.clientHeight / 2)

        window.addEventListener('resize', onWindowResize, false)
        container.addEventListener('mousemove', onMouseMove)

        // Animation loop
        const animate = () => {
            const animationId = requestAnimationFrame(animate)
            uniforms.time.value += 0.05
            renderer.render(scene, camera)

            if (sceneRef.current) {
                sceneRef.current.animationId = animationId
            }
        }

        // Store scene references for cleanup
        sceneRef.current = {
            camera,
            scene,
            renderer,
            uniforms,
            animationId: 0,
        }

        // Start animation
        animate()

        // Cleanup function
        return () => {
            window.removeEventListener('resize', onWindowResize)
            container.removeEventListener('mousemove', onMouseMove)

            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId)

                if (container && sceneRef.current.renderer.domElement) {
                    if (container.contains(sceneRef.current.renderer.domElement)) {
                        container.removeChild(sceneRef.current.renderer.domElement)
                    }
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
            style={{
                width: '100%',
                height: '100%',
                minHeight: '400px',
                background: '#000',
                overflow: 'hidden',
            }}
        />
    )
}

export { ShaderAnimation as NeuralRippleShader }
