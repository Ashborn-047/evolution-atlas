'use client';

import React, { useState, Suspense, lazy } from 'react';
import { SilkAnimation } from '../shaders/Shader 9/shader';

// --- LAZY LOAD SHADER COMPONENTS ---
const ShaderComponents = {
    1: lazy(() => import('../shaders/Shader 1/shader')),
    2: lazy(() => import('../shaders/Shader 2/shader').then(m => ({ default: m.DotScreenShader }))),
    3: lazy(() => import('../shaders/Shader 3/shader')),
    4: lazy(() => import('../shaders/Shader 4/shader')),
    5: lazy(() => import('../shaders/Shader 5/shader')),
    6: lazy(() => import('../shaders/Shader 6/shader')),
    7: lazy(() => import('../shaders/Shader 7/shader')),
    8: lazy(() => import('../shaders/Shader 8/shader')),
    9: lazy(() => import('../shaders/Shader 9/shader')),
    10: lazy(() => import('../shaders/Shader 10/shader')),
    11: lazy(() => import('../shaders/Shader 11/shader')),
};

// --- SHADER DATA ---
const SHADERS = [
    { id: 1, name: 'Neural Ripple', desc: 'Three.js heatmap with wave propagation.', color: '#06b6d4' },
    { id: 2, name: 'Dot Screen', desc: 'Canvas 2D halftone pattern effect.', color: '#8b5cf6' },
    { id: 3, name: 'Meteor Shower', desc: 'Dynamic particle trails animation.', color: '#f97316' },
    { id: 4, name: 'Aurora', desc: 'Organic gradient flow simulation.', color: '#22c55e' },
    { id: 5, name: 'Flickering Grid', desc: 'Randomized cell-based animation.', color: '#eab308' },
    { id: 6, name: 'Spiral Singularity', desc: 'GSAP-powered spiral particle engine.', color: '#ec4899' },
    { id: 7, name: 'Dotted Surface', desc: 'Three.js neural plane with waves.', color: '#3b82f6' },
    { id: 8, name: 'Vortex Particles', desc: 'Simplex noise-driven particle flow.', color: '#14b8a6' },
    { id: 9, name: 'Silk Animation', desc: 'Generative flowing silk texture.', color: '#a855f7' },
    { id: 10, name: 'Raining Letters', desc: 'Matrix-style falling characters.', color: '#22c55e' },
    { id: 11, name: 'Vortex Profiles', desc: 'WebGL2 radial simulation engine.', color: '#f43f5e' },
];

// --- SHADER PREVIEW ---
function ShaderPreview({ shaderId, color }: { shaderId: number; color: string }) {
    const ShaderComponent = ShaderComponents[shaderId as keyof typeof ShaderComponents];

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            background: '#000'
        }}>
            <Suspense fallback={
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)`,
                }}>
                    <span style={{
                        fontSize: '4rem',
                        fontWeight: 900,
                        color: color,
                        opacity: 0.2,
                        fontFamily: 'monospace'
                    }}>
                        {String(shaderId).padStart(2, '0')}
                    </span>
                </div>
            }>
                <div style={{
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1)',
                    transformOrigin: 'center center',
                    pointerEvents: 'none'
                }}>
                    <ShaderComponent />
                </div>
            </Suspense>
        </div>
    );
}

// --- SHADER CARD ---
function ShaderCard({ shader }: { shader: typeof SHADERS[0] }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                backgroundColor: '#111',
                border: `1px solid ${isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'}`,
                transition: 'all 0.4s ease',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isHovered ? `0 20px 40px -15px ${shader.color}40` : '0 4px 20px rgba(0,0,0,0.3)',
            }}
        >
            {/* Live Shader Preview */}
            <div style={{
                height: '180px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <ShaderPreview shaderId={shader.id} color={shader.color} />
                {/* Overlay gradient for better text contrast */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(17,17,17,0.9) 100%)',
                    pointerEvents: 'none'
                }} />
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'white',
                    margin: 0,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em'
                }}>
                    {shader.name}
                </h3>
                <p style={{
                    fontSize: '0.875rem',
                    color: '#71717a',
                    margin: 0,
                    marginBottom: '1.25rem',
                    lineHeight: 1.5
                }}>
                    {shader.desc}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a
                        href={`/shader-vault/shaders/Shader ${shader.id}/shader.html`}
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/shader-vault/shaders/Shader ${shader.id}/shader.html`;
                        }}
                        style={{
                            flex: 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            padding: '0.625rem 0',
                            backgroundColor: isHovered ? shader.color : 'rgba(255,255,255,0.05)',
                            color: isHovered ? 'black' : 'white',
                            borderRadius: '0.75rem',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            border: 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Demo
                    </a>
                    <a
                        href={`/shader-vault/shaders/Shader ${shader.id}/card.html`}
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/shader-vault/shaders/Shader ${shader.id}/card.html`;
                        }}
                        style={{
                            flex: 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            borderRadius: '0.75rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            border: `1px solid ${isHovered ? 'rgba(255,255,255,0.2)' : 'transparent'}`,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Card
                    </a>
                </div>
            </div>
        </div>
    );
}

// --- LANDING PAGE ---
export default function LandingPage() {
    const [standaloneId, setStandaloneId] = useState<number | null>(null);

    React.useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#standalone-')) {
                const id = parseInt(hash.split('-')[1]);
                if (!isNaN(id)) setStandaloneId(id);
            }
        };
        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    if (standaloneId) {
        const shader = SHADERS.find(s => s.id === standaloneId);
        return (
            <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
                <ShaderPreview shaderId={standaloneId} color={shader?.color || '#00F0FF'} />
                {/* Minimal HUD for standalone */}
                <div style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    zIndex: 100,
                    fontFamily: 'monospace',
                    color: shader?.color || '#00F0FF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontSize: '0.8rem',
                    pointerEvents: 'none'
                }}>
                    {shader?.name || 'EXPERIMENTAL_CORE'} // STANDALONE_MODE
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#050505',
            color: 'white',
            fontFamily: '"Inter", "Outfit", system-ui, sans-serif',
            overflowX: 'hidden'
        }}>
            {/* Google Fonts */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Outfit:wght@100;300;400;700;900&display=swap');
                body { margin: 0; padding: 0; }
                * { box-sizing: border-box; }
            `}} />

            {/* HERO */}
            <header style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '4rem 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Silk Animation Background */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    opacity: 0.7
                }}>
                    <SilkAnimation />
                </div>

                {/* Gradient Overlay for text readability */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    background: 'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,1) 100%)',
                    pointerEvents: 'none'
                }} />
                {/* Nav */}
                <nav style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem 3rem',
                    zIndex: 10
                }}>
                    <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        letterSpacing: '-0.05em',
                        background: 'linear-gradient(to right, #fff, #888)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        VAULT.V2
                    </span>
                    <span style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                        SHADER LIBRARY
                    </span>
                </nav>

                {/* Hero Content */}
                <h1 style={{
                    fontSize: 'clamp(3rem, 12vw, 9rem)',
                    fontWeight: 100,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    margin: 0,
                    marginBottom: '1.5rem',
                    position: 'relative',
                    zIndex: 10
                }}>
                    The Shader<br />
                    <span style={{ fontWeight: 900, fontStyle: 'italic' }}>Vault</span>
                </h1>
                <p style={{
                    fontSize: '1.125rem',
                    color: '#9ca3af',
                    maxWidth: '500px',
                    lineHeight: 1.6,
                    margin: 0,
                    position: 'relative',
                    zIndex: 10
                }}>
                    A curated library of high-performance generative textures, WebGL interfaces, and Canvas experiments.
                </p>

                {/* Scroll Indicator */}
                <div style={{ marginTop: '4rem', opacity: 0.4, position: 'relative', zIndex: 10 }}>
                    <svg width="20" height="40" viewBox="0 0 20 40">
                        <path d="M10 0V38M10 38L2 30M10 38L18 30" stroke="white" strokeWidth="1" fill="none" />
                    </svg>
                </div>
            </header>

            {/* GRID SECTION */}
            <main style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <span style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: '#555'
                    }}>
                        Collection
                    </span>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        margin: 0,
                        marginTop: '0.5rem',
                        letterSpacing: '-0.03em'
                    }}>
                        11 Experiments
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem'
                }}>
                    {SHADERS.map(shader => (
                        <ShaderCard key={shader.id} shader={shader} />
                    ))}
                </div>
            </main>

            {/* FOOTER */}
            <footer style={{
                padding: '4rem 2rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center'
            }}>
                <p style={{ color: '#555', fontSize: '0.875rem', margin: 0 }}>
                    Crafted with React, Three.js & Canvas
                </p>
                <p style={{ color: '#333', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    © 2025 VAULT EXPERIMENTAL
                </p>
            </footer>
        </div>
    );
}
