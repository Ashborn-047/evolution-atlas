'use client';

import React, { useRef, useEffect, useState } from "react";

// --- Shader Logic ---
const createFragmentShader = (params: ShaderParams) => `#version 300 es
precision highp float;

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t) {
    vec3 a = vec3(${params.paletteA.join(", ")});
    vec3 b = vec3(${params.paletteB.join(", ")});
    vec3 c = vec3(${params.paletteC.join(", ")});
    vec3 d = vec3(${params.paletteD.join(", ")});
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    float angle = atan(uv.y, uv.x);
    float r = length(uv);

    angle += time * ${params.rotationSpeed.toFixed(2)};

    float bands = mod(r * ${params.bandFrequency.toFixed(1)} + time * ${params.bandSpeed.toFixed(2)}, 1.0);
    float glow = smoothstep(0.0, ${params.glowSoftness.toFixed(2)}, bands) * smoothstep(1.0, ${(1.0 - params.glowSoftness).toFixed(2)}, bands);

    float spokes = mod(angle * ${params.spokeCount.toFixed(1)}, 6.28318);
    float spoke_value = sin(spokes) * 0.5 + 0.5;

    float final_v = (glow * ${params.glowMix.toFixed(2)} + spoke_value * ${(1.0 - params.glowMix).toFixed(2)});
    final_v = pow(final_v, ${params.contrast.toFixed(2)});

    vec3 col = palette(final_v + time * ${params.colorCycleSpeed.toFixed(2)});
    
    // Depth shift
    col *= (0.5 + 0.5 * cos(r * ${params.depthFrequency.toFixed(1)} + time * 0.5 + vec3(0, 1, 2)));

    // Vignette
    float vig = 1.0 - pow(r, 2.0) * ${params.vignetteStrength.toFixed(2)};
    col *= vig;

    fragColor = vec4(col, 1.0);
}
`;

export interface ShaderParams {
    paletteA: [number, number, number];
    paletteB: [number, number, number];
    paletteC: [number, number, number];
    paletteD: [number, number, number];
    rotationSpeed: number;
    bandFrequency: number;
    bandSpeed: number;
    glowSoftness: number;
    spokeCount: number;
    glowMix: number;
    contrast: number;
    colorCycleSpeed: number;
    depthFrequency: number;
    vignetteStrength: number;
}

const DEFAULT_SHADER_PARAMS: ShaderParams = {
    paletteA: [0.5, 0.5, 0.5],
    paletteB: [0.5, 0.5, 0.5],
    paletteC: [1.0, 1.0, 1.0],
    paletteD: [0.0, 0.33, 0.67],
    rotationSpeed: 0.1,
    bandFrequency: 20.0,
    bandSpeed: 0.5,
    glowSoftness: 0.1,
    spokeCount: 10.0,
    glowMix: 0.6,
    contrast: 1.8,
    colorCycleSpeed: 0.1,
    depthFrequency: 4.0,
    vignetteStrength: 0.5,
};

class Renderer {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext | null;
    program: WebGLProgram | null = null;
    uTime: WebGLUniformLocation | null = null;
    uRes: WebGLUniformLocation | null = null;
    isReady: boolean = false;

    constructor(canvas: HTMLCanvasElement, fragmentSource: string) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2", {
            alpha: true,
            antialias: false,
            depth: false,
            stencil: false,
            preserveDrawingBuffer: false,
            powerPreference: "high-performance",
        });
        this._init(fragmentSource);
    }

    _compile(type: number, src: string): WebGLShader | null {
        const gl = this.gl;
        if (!gl) return null;
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    _init(fragmentSource: string): void {
        const gl = this.gl;
        if (!gl) return;
        const vertexSrc = `#version 300 es
    precision highp float;
    in vec4 position;
    void main() { gl_Position = position; }`;
        const vs = this._compile(gl.VERTEX_SHADER, vertexSrc);
        const fs = this._compile(gl.FRAGMENT_SHADER, fragmentSource);
        if (!vs || !fs) return;
        this.program = gl.createProgram();
        if (!this.program) return;
        gl.attachShader(this.program, vs);
        gl.attachShader(this.program, fs);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) return;
        const verts = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(this.program, "position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
        this.uTime = gl.getUniformLocation(this.program, "time");
        this.uRes = gl.getUniformLocation(this.program, "resolution");
        this.isReady = true;
    }

    resize(w: number, h: number): void {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = w * dpr;
        this.canvas.height = h * dpr;
        this.gl?.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    render(timeMs: number): void {
        const gl = this.gl;
        if (!this.program || !gl || !this.isReady) return;
        gl.useProgram(this.program);
        gl.uniform1f(this.uTime, timeMs * 0.001);
        gl.uniform2f(this.uRes, gl.canvas.width, gl.canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    dispose(): void {
        if (this.gl && this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;
        }
    }
}

export function PsychedelicVortex() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const fragmentShader = createFragmentShader(DEFAULT_SHADER_PARAMS);
        let renderer: Renderer | null = null;
        try {
            renderer = new Renderer(canvas, fragmentShader);
        } catch (e) { return; }

        if (!renderer.isReady) return;

        let rafId: number;
        function onResize() {
            if (renderer && containerRef.current) {
                renderer.resize(window.innerWidth, window.innerHeight);
            }
        }

        function animate(time: number) {
            if (renderer) {
                renderer.render(time);
                rafId = requestAnimationFrame(animate);
            }
        }

        window.addEventListener('resize', onResize);
        onResize();
        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onResize);
            renderer?.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: '#09090b',
            overflow: 'hidden'
        }}>
            <canvas ref={canvasRef} style={{
                width: '100%',
                height: '100%',
                display: 'block'
            }} />

            {/* Overlay Text */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 10,
                pointerEvents: 'none',
                mixBlendMode: 'difference'
            }}>
                <h1 style={{
                    fontSize: 'clamp(3rem, 15vw, 10rem)',
                    fontWeight: 900,
                    color: 'white',
                    letterSpacing: '-0.05em',
                    margin: 0,
                    textTransform: 'uppercase'
                }}>
                    Vortex
                </h1>
                <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    marginTop: '1rem'
                }}>
                    Procedural Simulation Engine
                </p>
            </div>
        </div>
    );
}

export default PsychedelicVortex;
