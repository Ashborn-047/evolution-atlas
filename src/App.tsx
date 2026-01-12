'use client';

import { useState, useEffect } from 'react';
import { GlobalCanvas } from './components/canvas/GlobalCanvas';
import { HorizontalExhibits } from './components/atlas/HorizontalExhibits';
import { DocumentaryScroll } from './components/documentary/DocumentaryScroll';
import { ShaderVault } from './components/library/ShaderVault';
import { ShaderControls } from './components/library/ShaderControls';
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
                {/* Header HUD */}
                <header className="fixed top-0 left-0 right-0 z-50 hud-border border-b glass-panel">
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
                        <section className="h-screen flex items-center justify-center pt-20 relative overflow-hidden">
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />

                            <div className="text-center max-w-5xl px-6 relative z-10">
                                <p className="text-sm text-[#00F0FF] tracking-[0.3em] mb-6 uppercase">
                                    UI/UX Research • Web Design Evolution • 2024-2025
                                </p>
                                <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1]">
                                    Where Code Becomes
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#00FF88]">
                                        Experience
                                    </span>
                                </h2>
                                <p className="text-lg md:text-xl text-[#999999] max-w-3xl mx-auto mb-12 leading-relaxed">
                                    Seven experiments in computational aesthetics. Each a thesis on the future
                                    of digital interaction — from kinetic typography to ambient computing.
                                </p>

                                {/* Scroll indicator */}
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-xs text-[#999999] tracking-widest">SCROLL TO EXPLORE</span>
                                    <div className="relative">
                                        <div className="w-px h-16 bg-gradient-to-b from-[#00F0FF] to-transparent" />
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#00F0FF] rounded-full animate-ping" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Era Timeline Section */}
                        <section className="py-16 border-t border-b border-[rgba(224,224,224,0.1)]">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-12">
                                    <h3 className="font-editorial text-3xl mb-3">The Evolution of Interface Design</h3>
                                    <p className="text-[#999999]">Four decades of transformation</p>
                                </div>

                                {/* Timeline */}
                                <div className="relative">
                                    <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent" />
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                        {ERAS.map((era) => (
                                            <div key={era.year} className="relative group cursor-pointer">
                                                <div
                                                    className="w-4 h-4 rounded-full mx-auto mb-4 relative z-10 transition-transform group-hover:scale-150"
                                                    style={{ backgroundColor: era.color, boxShadow: `0 0 20px ${era.color}50` }}
                                                />
                                                <div className="text-center p-4 hud-border glass-panel transition-all group-hover:border-[#00F0FF]">
                                                    <span className="text-xl md:text-2xl font-bold" style={{ color: era.color }}>
                                                        {era.year}
                                                    </span>
                                                    <h4 className="font-editorial text-base md:text-lg mt-2 mb-1">{era.name}</h4>
                                                    <p className="text-xs text-[#999999] hidden md:block">{era.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Horizontal Scroll Exhibits */}
                        <HorizontalExhibits />

                        {/* Interactive Footer */}
                        <footer className="relative border-t border-[rgba(224,224,224,0.1)]">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00F0FF]/5 via-transparent to-transparent pointer-events-none" />

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
