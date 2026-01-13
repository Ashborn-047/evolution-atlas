'use client';

import { useState, useEffect } from 'react';
import { GlobalCanvas } from './components/canvas/GlobalCanvas';
import { HorizontalExhibits } from './components/atlas/HorizontalExhibits';
import { DocumentaryScroll } from './components/documentary/DocumentaryScroll';
import { ShaderVault } from './components/library/ShaderVault';
import { ShaderControls } from './components/library/ShaderControls';
import { CustomCursor } from './components/ui/CustomCursor';
import { DitheringShader } from './components/ui/DitheringShader';
import { Github, ExternalLink } from 'lucide-react';


type Mode = 'gallery' | 'documentary';

// Era data for timeline
const ERAS = [
    { year: '1995', name: 'Solid State', description: 'Binary interactions, terminal aesthetics', color: '#ff3333' },
    { year: '2010', name: 'Glass Age', description: 'Skeuomorphism meets transparency', color: '#06b6d4' },
    { year: '2020', name: 'Organic Flow', description: 'Living interfaces, elastic motion', color: '#22c55e' },
    { year: '2025', name: 'Hybrid', description: 'Spatial glass, ambient computing', color: '#8b5cf6' },
];

// Typewriter hook
function useTypewriter(text: string, speed = 50) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                setIsComplete(true);
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return { displayedText, isComplete };
}

export default function App() {
    const [mode, setMode] = useState<Mode>('gallery');
    const { displayedText, isComplete } = useTypewriter(
        '"The interface is no longer waiting."',
        60
    );

    return (
        <>
            {/* Global Custom Cursor */}
            <CustomCursor />

            {/* Global WebGL Canvas - renders behind everything */}
            <GlobalCanvas>
                {null}
            </GlobalCanvas>

            {/* Shader Vault - global slide-out panel */}
            <ShaderVault />

            {/* Shader Controls - HUD for uniform manipulation */}
            <ShaderControls />

            {/* Main content - renders above canvas */}
            <div className="relative">
                {/* Header HUD - Glassmorphic - Absolute so it scrolls away */}
                <header className="absolute top-0 left-0 right-0 z-50 border-b border-[rgba(224,224,224,0.08)]" style={{ background: 'rgba(5, 5, 5, 0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <div>
                            <h1 className="font-editorial text-2xl tracking-tight">
                                The Evolution Atlas
                            </h1>
                            <p className="text-xs text-[#999999] mt-1">
                                A Digital Museum of Interface Design
                            </p>
                        </div>

                        <nav className="flex items-center gap-6 text-sm">
                            <button
                                onClick={() => setMode('gallery')}
                                className={`hover:text-[#00F0FF] transition-colors ${mode === 'gallery' ? 'text-[#00F0FF]' : ''
                                    }`}
                            >
                                Gallery
                            </button>
                            <button
                                onClick={() => setMode('documentary')}
                                className={`hover:text-[#00F0FF] transition-colors ${mode === 'documentary' ? 'text-[#00F0FF]' : ''
                                    }`}
                            >
                                Documentary
                            </button>
                        </nav>
                    </div>
                </header>

                {/* Conditional rendering based on mode */}
                {mode === 'gallery' ? (
                    <>
                        {/* Hero Section */}
                        <section className="h-screen flex items-center justify-center pt-32 relative overflow-hidden">
                            {/* Dithering Shader Background */}
                            <div className="absolute inset-0 z-0">
                                <DitheringShader
                                    shape="swirl"
                                    type="4x4"
                                    colorBack="#050505"
                                    colorFront="#0a3040"
                                    pxSize={4}
                                    speed={0.6}
                                />
                            </div>

                            {/* Subtle gradient overlay for text legibility */}
                            <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#050505]/70 via-[#050505]/30 to-[#050505] pointer-events-none" />

                            <div className="text-center max-w-5xl px-6 relative z-10">
                                <p className="text-xs text-[#00F0FF] tracking-[0.4em] mb-10 uppercase font-mono opacity-80">
                                    UI/UX Research • Design Evolution • 2025-26
                                </p>
                                <h2 className="font-editorial text-5xl md:text-6xl lg:text-7xl mb-10 leading-[1.1] tracking-tight">
                                    Where Code Becomes
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#00FF88] mt-2">
                                        Experience
                                    </span>
                                </h2>
                                <p className="text-xl md:text-2xl text-[#E0E0E0]/60 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
                                    An immersive thesis on computational aesthetics. Explore the journey
                                    from kinetic typography to ambient, living interfaces.
                                </p>

                                {/* Improved Scroll indicator */}
                                <div className="flex flex-col items-center gap-4">
                                    <span className="text-[10px] text-[#999999] tracking-[0.5em] font-mono uppercase">SCROLL TO EXPLORE</span>
                                    <div className="relative">
                                        <div className="w-px h-20 bg-gradient-to-b from-[#00F0FF] via-[#00F0FF]/20 to-transparent" />
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#00F0FF] rounded-full blur-[2px] animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Era Timeline Section */}
                        <section className="py-24 border-t border-b border-[rgba(224,224,224,0.1)] overflow-hidden">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-16">
                                    <p className="text-xs text-[#00F0FF] tracking-[0.3em] mb-4 uppercase">The Journey</p>
                                    <h3 className="font-editorial text-4xl md:text-5xl mb-4">Evolution of Interface Design</h3>
                                    <p className="text-[#999999] max-w-xl mx-auto">Four decades of transformation — from command lines to ambient environments</p>
                                </div>

                                {/* Timeline */}
                                <div className="relative max-w-5xl mx-auto">
                                    {/* Connecting line */}
                                    <div className="absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#ff3333] via-[#06b6d4] via-[#22c55e] to-[#8b5cf6]" />

                                    <div className="grid grid-cols-4 gap-2 md:gap-4">
                                        {ERAS.map((era) => (
                                            <div key={era.year} className="relative group">
                                                {/* Dot with glow */}
                                                <div className="flex justify-center mb-6">
                                                    <div
                                                        className="w-6 h-6 rounded-full relative z-10 transition-all duration-300 group-hover:scale-125"
                                                        style={{
                                                            backgroundColor: era.color,
                                                            boxShadow: `0 0 30px ${era.color}, 0 0 60px ${era.color}50`,
                                                        }}
                                                    />
                                                </div>

                                                {/* Era card */}
                                                <div
                                                    className="relative p-4 md:p-6 text-center transition-all duration-300 group-hover:-translate-y-2"
                                                    style={{
                                                        background: `linear-gradient(180deg, ${era.color}10 0%, transparent 100%)`,
                                                        borderTop: `2px solid ${era.color}50`,
                                                    }}
                                                >
                                                    {/* Large year */}
                                                    <span
                                                        className="block text-3xl md:text-5xl font-bold mb-2 transition-all group-hover:scale-110"
                                                        style={{ color: era.color }}
                                                    >
                                                        {era.year}
                                                    </span>

                                                    {/* Era name */}
                                                    <h4 className="font-editorial text-sm md:text-xl mb-2 text-[#E0E0E0]">
                                                        {era.name}
                                                    </h4>

                                                    {/* Description */}
                                                    <p className="text-[10px] md:text-xs text-[#999999] leading-relaxed">
                                                        {era.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Horizontal Scroll Exhibits */}
                        <HorizontalExhibits />

                        {/* Interactive Footer - Higher z-index to prevent overlap */}
                        <footer className="relative z-50 border-t border-[rgba(224,224,224,0.1)] bg-[#050505] overflow-hidden">
                            {/* Dithering Shader Background */}
                            <div className="absolute inset-0 z-0">
                                <DitheringShader
                                    shape="wave"
                                    type="8x8"
                                    colorBack="#050505"
                                    colorFront="#1a1030"
                                    pxSize={3}
                                    speed={0.5}
                                />
                            </div>

                            {/* Gradient overlay for text legibility */}
                            <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#050505]/90 via-[#050505]/50 to-[#050505]/80 pointer-events-none" />

                            <div className="container mx-auto px-6 py-16 relative z-10">
                                {/* Typewriter Quote */}
                                <div className="text-center mb-12">
                                    <p className="font-editorial text-2xl md:text-3xl text-[#E0E0E0] min-h-[2.5em]">
                                        {displayedText}
                                        {!isComplete && <span className="animate-pulse">|</span>}
                                    </p>
                                    <p className="text-sm text-[#999999] mt-4">
                                        — Living Interface Ecosystem
                                    </p>
                                </div>

                                {/* Tech Stack Badges */}
                                <div className="flex flex-wrap justify-center gap-3 mb-12">
                                    {['React', 'Three.js', 'GSAP', 'WebGL', 'TypeScript', 'Vite', 'Tailwind CSS'].map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 text-sm border border-[rgba(224,224,224,0.1)] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* GitHub Links */}
                                <div className="flex flex-wrap justify-center gap-4 mb-8">
                                    <a
                                        href="https://github.com/Ashborn-047"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 border border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#050505] transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub Profile
                                    </a>
                                    <a
                                        href="https://github.com/Ashborn-047?tab=repositories"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 border border-[rgba(224,224,224,0.1)] hover:border-[#E0E0E0] transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        All Repositories
                                    </a>
                                </div>

                                {/* Copyright */}
                                <div className="text-center">
                                    <p className="text-sm text-[#999999]">
                                        Built with React Three Fiber, Vite, and GLSL
                                    </p>
                                    <p className="text-xs text-[#999999] mt-2">
                                        © 2025 The Evolution Atlas. All shaders open source.
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </>
                ) : (
                    <DocumentaryScroll />
                )}
            </div>
        </>
    );
}
