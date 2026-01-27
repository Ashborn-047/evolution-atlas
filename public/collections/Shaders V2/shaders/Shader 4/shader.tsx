import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ============================================
// AURORA SHADER - Northern lights with stars
// ============================================

export function AuroraShader() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Scene Setup
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

        // Shader Material
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

        // Animation Loop
        let frameId: number
        const animate = () => {
            material.uniforms.iTime.value += 0.02
            renderer.render(scene, camera)
            frameId = requestAnimationFrame(animate)
        }
        animate()

        // Resize Handler
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

// Full-screen standalone component
export default function AuroraShaderDemo() {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            background: '#000'
        }}>
            <AuroraShader />
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
            }}>
                <span style={{
                    color: '#94a3b8',
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem'
                }}>
                    Aurora Borealis
                </span>
            </div>
        </div>
    )
}
