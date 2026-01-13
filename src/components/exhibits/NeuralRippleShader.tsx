'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function NeuralRippleShader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef(new THREE.Vector2(0, 0));

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
            u_mouse: { value: new THREE.Vector2(0, 0) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                precision highp float;
                uniform float u_time;
                uniform vec2 u_resolution;
                uniform vec2 u_mouse;

                void main() {
                    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
                    vec2 mouse = (u_mouse.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
                    
                    float t = u_time * 0.2;
                    float lineWidth = 0.0025;

                    vec3 color = vec3(0.0);
                    for(int j = 0; j < 3; j++) {
                        for(int i = 0; i < 6; i++) {
                            float factor = float(i * i) * 0.08;
                            float dist = length(uv - mouse);
                            float wav = fract(t - 0.02 * float(j) + float(i) * 0.015) * 6.0;
                            color[j] += lineWidth / abs(wav - dist + mod(uv.x + uv.y, 0.15) * 0.1);
                        }
                    }
                    
                    gl_FragColor = vec4(color, 0.7);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const handleResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            uniforms.u_resolution.value.set(w, h);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.set(
                e.clientX - rect.left,
                rect.height - (e.clientY - rect.top)
            );
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        const animate = (time: number) => {
            uniforms.u_time.value = time * 0.001;
            uniforms.u_mouse.value.lerp(mouseRef.current, 0.1);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
}
