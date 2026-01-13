'use client';

import { useEffect, useRef } from 'react';
import { Scene, OrthographicCamera, WebGLRenderer, Clock, ShaderMaterial, PlaneGeometry, Mesh, Vector2 } from 'three';

export function SingularityWaveShader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const materialRef = useRef<ShaderMaterial>();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1) Renderer + Scene + Camera + Clock
        let renderer: WebGLRenderer;
        try {
            renderer = new WebGLRenderer({ antialias: true, alpha: false });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);
        } catch (err) {
            console.error('WebGL not supported', err);
            container.innerHTML = '<p style="color:white;text-align:center;">Sorry, WebGL isn’t available.</p>';
            return;
        }

        const scene = new Scene();
        const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const clock = new Clock();

        // 2) Shaders
        const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

        const fragmentShader = `
      precision mediump float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      void main() {
          vec2 uv = (vUv - 0.5) * 2.0;
          float aspect = u_resolution.x / u_resolution.y;
          uv.x *= aspect;

          vec3 color = vec3(0.0);
          float t = u_time * 0.1;
          float d = length(uv) * 0.8;
          float noise = snoise(vec3(uv * 1.5, t));
          float waves = sin(d * 10.0 - t * 5.0 + noise * 2.0) * 0.5 + 0.5;
          float singularity = 1.0 / (d + 0.1);
          float final_pattern = pow(waves * singularity, 2.0);

          vec3 color1 = vec3(0.02, 0.0, 0.05); // Darker base
          vec3 color2 = vec3(0.4, 0.05, 0.2); // Mid purple
          vec3 color3 = vec3(0.0, 0.9, 1.0); // Cyan highlights for our theme
          
          color = mix(color1, color2, smoothstep(0.0, 1.5, final_pattern));
          color = mix(color, color3, smoothstep(1.0, 1.3, final_pattern));
          color *= (1.0 - length(uv) * 0.7);

          gl_FragColor = vec4(color, 1.0);
      }
    `;

        // 3) Material, Geometry, Mesh
        const uniforms = {
            u_time: { value: 0 },
            u_resolution: { value: new Vector2(container.clientWidth, container.clientHeight) }
        };
        const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms });
        materialRef.current = material;
        const geometry = new PlaneGeometry(2, 2);
        const mesh = new Mesh(geometry, material);
        scene.add(mesh);

        // 4) Resize Handler
        const onResize = () => {
            if (!container || !renderer) return;

            const w = container.clientWidth;
            const h = container.clientHeight;

            renderer.setSize(w, h);

            if (uniforms.u_resolution) {
                uniforms.u_resolution.value.set(w, h);
            }
        };

        window.addEventListener('resize', onResize);
        onResize();

        // 5) Animation Loop
        renderer.setAnimationLoop(() => {
            if (uniforms.u_time) {
                uniforms.u_time.value = clock.getElapsedTime();
            }
            renderer.render(scene, camera);
        });

        // 6) Cleanup
        return () => {
            window.removeEventListener('resize', onResize);
            renderer.setAnimationLoop(null);
            const canvas = renderer.domElement;
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            material.dispose();
            geometry.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full -z-10 bg-[#050505]"
            aria-label="Animated singularity wave background"
        />
    );
}
