'use client';

import React, { useRef, useEffect, useState } from "react";
import { Activity, Sparkles, MapPin, Link as LinkIcon } from "lucide-react";

// --- Types & Shader Creation ---
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

export const VORTEX_PRESETS: Record<string, ShaderParams> = {
    classic: DEFAULT_SHADER_PARAMS,
    intense: {
        ...DEFAULT_SHADER_PARAMS,
        rotationSpeed: 0.2,
        bandSpeed: 0.8,
        contrast: 2.5,
        colorCycleSpeed: 0.2,
    },
    calm: {
        ...DEFAULT_SHADER_PARAMS,
        rotationSpeed: 0.05,
        bandSpeed: 0.3,
        contrast: 1.4,
        glowSoftness: 0.15,
    },
    neon: {
        ...DEFAULT_SHADER_PARAMS,
        paletteA: [0.5, 0.5, 0.5],
        paletteB: [0.5, 0.5, 0.5],
        paletteC: [2.0, 1.0, 0.0],
        paletteD: [0.5, 0.2, 0.25],
        contrast: 2.2,
    },
    ocean: {
        ...DEFAULT_SHADER_PARAMS,
        paletteA: [0.5, 0.5, 0.5],
        paletteB: [0.5, 0.5, 0.5],
        paletteC: [1.0, 1.0, 0.5],
        paletteD: [0.8, 0.9, 0.3],
        rotationSpeed: 0.08,
        bandFrequency: 15.0,
    },
    fire: {
        ...DEFAULT_SHADER_PARAMS,
        paletteA: [0.5, 0.5, 0.5],
        paletteB: [0.5, 0.5, 0.5],
        paletteC: [1.0, 0.7, 0.4],
        paletteD: [0.0, 0.15, 0.2],
        rotationSpeed: 0.15,
        bandSpeed: 0.7,
    },
    matrix: {
        ...DEFAULT_SHADER_PARAMS,
        paletteA: [0.0, 0.0, 0.0],
        paletteB: [0.0, 1.0, 0.0],
        paletteC: [0.0, 1.0, 0.0],
        paletteD: [0.0, 0.3, 0.0],
        rotationSpeed: 0.0,
        bandFrequency: 50.0,
        bandSpeed: 1.0,
        contrast: 3.0,
        spokeCount: 40.0,
    }
};

// --- Renderer Class ---
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
            powerPreference: "low-power",
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

// --- Background Component ---
const PsychedelicVortexHero = ({ shaderParams, animated }: { shaderParams: ShaderParams, animated: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const fragmentShader = createFragmentShader(shaderParams);
        let renderer: Renderer | null = null;
        try {
            renderer = new Renderer(canvas, fragmentShader);
        } catch (e) { return; }

        if (!renderer.isReady) return;

        let rafId: number;
        const container = canvas.parentElement;

        function onResize() {
            if (container && renderer) {
                renderer.resize(container.clientWidth, container.clientHeight);
                if (!animated) renderer.render(0);
            }
        }

        function animate(time: number) {
            if (animated && renderer) {
                renderer.render(time);
                rafId = requestAnimationFrame(animate);
            }
        }

        onResize();
        if (animated) rafId = requestAnimationFrame(animate);
        else renderer.render(1000);

        const resizeObserver = new ResizeObserver(onResize);
        if (container) resizeObserver.observe(container);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            renderer?.dispose();
        };
    }, [shaderParams, animated]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#18181b' }}>
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        </div>
    );
};

// --- Preset Card Component ---
const PresetProfileCard = ({ name, params }: { name: string; params: ShaderParams; }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                maxWidth: '24rem',
                width: '100%',
                height: '500px',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: isHovered ? '0 25px 50px -12px rgba(24, 24, 27, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid #27272a',
                backgroundColor: 'black',
                transition: 'all 0.3s ease',
                cursor: 'default'
            }}
        >
            {/* Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    opacity: isHovered ? 1 : 0.5,
                    transition: 'opacity 0.7s ease-in-out'
                }}>
                    <PsychedelicVortexHero shaderParams={params} animated={isHovered} />
                </div>
            </div>

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.95) 90%)'
            }}>
                {/* Top Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        PRESET
                    </div>
                    <button style={{
                        padding: '0.5rem',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s ease',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <LinkIcon size={16} />
                    </button>
                </div>

                {/* Profile Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Avatar */}
                    <div style={{
                        position: 'relative',
                        width: '6rem',
                        height: '6rem',
                        margin: '0 auto',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.5s ease'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            filter: 'blur(12px)',
                            opacity: isHovered ? 0.75 : 0.5,
                            transition: 'opacity 0.5s ease'
                        }}></div>
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                            alt="Profile"
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '2px solid rgba(255,255,255,0.2)'
                            }}
                        />
                    </div>

                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', letterSpacing: '-0.025em', textTransform: 'capitalize', margin: 0 }}>
                            {name}
                        </h2>
                        <p style={{ color: '#d8b4fe', fontWeight: 500, fontSize: '0.875rem', margin: 0 }}>Visual Identity</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', color: '#a1a1aa', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                            <MapPin size={12} />
                            <span>WebGL Context</span>
                        </div>
                    </div>

                    <p style={{ color: '#d4d4d8', fontSize: '0.875rem', textAlign: 'center', lineHeight: 1.5, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        Procedural shader config with {params.spokeCount.toFixed(0)} radial spokes and {params.contrast.toFixed(1)}x contrast.
                    </p>

                    {/* Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', paddingTop: '1rem' }}>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '0.75rem',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'background-color 0.2s ease'
                        }}>
                            <Activity size={16} />
                            <span>Apply</span>
                        </button>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#18181b',
                            color: 'white',
                            borderRadius: '0.75rem',
                            fontWeight: 600,
                            border: '1px solid #3f3f46',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'background-color 0.2s ease'
                        }}>
                            <Sparkles size={16} />
                            <span>Remix</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Layout Component ---
export default function VortexGallery() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a855f7' }}>
                        <Activity size={20} />
                        <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Library</span>
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 8vw, 3rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.05em',
                        margin: 0,
                        color: 'white'
                    }}>
                        Vortex Persona.
                    </h1>
                </div>

                {/* Single Card */}
                <PresetProfileCard
                    name="Intense"
                    params={VORTEX_PRESETS.intense}
                />

                <p style={{ color: '#71717a', maxWidth: '32rem', fontSize: '1rem', lineHeight: 1.6, textAlign: 'center' }}>
                    A procedural mathematical identity. Hover to activate the WebGL simulation engine.
                </p>
            </div>
        </div>
    );
}
