'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { EXHIBITS, Exhibit } from '@/lib/exhibits';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Color mapping for exhibits
const EXHIBIT_COLORS: Record<string, string> = {
    'kinetic-typography': '#00F0FF',
    'liquid-shader-ui': '#FF00FF',
    'aether-sync': '#00FF88',
    'shader-vault': '#FFD700',
    'chroma-kinetics': '#FF3366',
    'ui-evolution-atlas': '#8b5cf6',
    'living-interface': '#6366f1',
};

import { View } from '@react-three/drei';
import { AnimatedText, TypographyEffect } from '../ui/AnimatedText';
import { DotScreenShader } from '../exhibits/DotScreenShader';
import { AuroraShader } from '../exhibits/AuroraShader';
import { FlickeringGrid } from '../exhibits/FlickeringGrid';
import { DottedSurface } from '../exhibits/DottedSurface';
import { LiquidShader } from '../exhibits/LiquidShader';
import { PortalScene } from '../exhibits/PortalScene';
import { ExhibitModal } from './ExhibitModal';

interface ExhibitSlideProps {
    exhibit: Exhibit;
    index: number;
    onExplore: () => void;
}

// Motion Era Mapping
const MOOTION_ERA_CONFIG: Record<string, { shader: React.ReactNode; typo: TypographyEffect; eraClass: string }> = {
    'kinetic-typography': { shader: <DotScreenShader />, typo: 'elastic', eraClass: 'era-solid' },
    'liquid-shader-ui': { shader: <LiquidShader />, typo: 'fluid', eraClass: 'era-organic' },
    'aether-sync': { shader: <DottedSurface />, typo: 'vapor', eraClass: 'era-hybrid' },
    'shader-vault': { shader: <AuroraShader />, typo: 'aura', eraClass: 'era-glass' },
    'chroma-kinetics': { shader: <LiquidShader />, typo: 'layers', eraClass: 'era-hybrid' },
    'ui-evolution-atlas': { shader: <FlickeringGrid />, typo: 'pixels', eraClass: 'era-solid' },
    'living-interface': { shader: <AuroraShader />, typo: 'glitch', eraClass: 'era-hybrid' },
};

function ExhibitSlide({ exhibit, index, onExplore }: ExhibitSlideProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const color = EXHIBIT_COLORS[exhibit.id] || '#00F0FF';

    const eraConfig = MOOTION_ERA_CONFIG[exhibit.id] || {
        shader: <PortalScene variant="cube" color={color} />,
        typo: 'breathe' as TypographyEffect,
        eraClass: 'era-solid'
    };

    useLayoutEffect(() => {
        const timer = setTimeout(() => setIsInView(true), index * 200);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className="exhibit-slide min-w-[100vw] h-screen relative flex items-center justify-center overflow-hidden">
            {/* Immersive 3D Background */}
            <div
                ref={containerRef}
                className="absolute inset-0 z-0 opacity-50"
                style={{ isolation: 'isolate' }}
            >
                {containerRef.current && (
                    <View track={containerRef as React.MutableRefObject<HTMLElement>}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        {eraConfig.shader}
                    </View>
                )}
            </div>

            {/* Gradient Overlay for Legibility */}
            <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]/80 pointer-events-none" />

            {/* Thematic Background Number */}
            <div
                className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-[16rem] md:text-[24rem] font-bold opacity-[0.03] select-none pointer-events-none tracking-tighter z-0"
                style={{ color }}
            >
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Minimal Content - Centered */}
            <div className="relative z-10 text-center max-w-3xl px-8">
                {/* Era Badge */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span
                        className="text-xs font-mono tracking-widest uppercase px-4 py-2 border"
                        style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
                    >
                        ERA_{exhibit.year}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                        {exhibit.category}
                    </span>
                </div>

                {/* Title */}
                <AnimatedText
                    text={exhibit.title}
                    effect="typewriter"
                    trigger={isInView}
                    stagger={0.07}
                    className={cn(
                        "text-6xl md:text-7xl lg:text-8xl mb-8 leading-[0.9] tracking-tighter",
                        eraConfig.eraClass
                    )}
                />

                {/* Tagline */}
                <p className="text-lg md:text-xl text-white/50 font-light max-w-xl mx-auto mb-12 leading-relaxed">
                    {exhibit.tagline}
                </p>

                {/* Explore Button */}
                <button
                    onClick={onExplore}
                    className="group relative px-12 py-4 transition-all hover:scale-105"
                >
                    <div
                        className="absolute inset-0 border-2 transition-all group-hover:bg-white/5"
                        style={{ borderColor: color }}
                    />
                    <span
                        className="relative text-sm tracking-[0.3em] uppercase font-bold"
                        style={{ color }}
                    >
                        Explore Project
                    </span>
                </button>
            </div>
        </div>
    );
}

export function HorizontalExhibits() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const progress = progressRef.current;

        if (!section || !container) return;

        // Calculate the scroll distance
        const scrollWidth = container.scrollWidth - window.innerWidth;
        // Add extra scroll distance for initial "pause" (user reads first exhibit)
        const pauseDistance = window.innerHeight * 0.5; // Half viewport for reading time
        const totalScrollDistance = scrollWidth + pauseDistance;

        // Create the horizontal scroll animation
        const tl = gsap.timeline({
            scrollTrigger: {
                id: 'horizontal-scroll',
                trigger: section,
                start: 'top top',
                end: () => `+=${totalScrollDistance}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Update progress bar (now at bottom)
                    if (progress) {
                        // Adjust progress to account for pause
                        const adjustedProgress = Math.max(0, (self.progress - (pauseDistance / totalScrollDistance)) / (1 - pauseDistance / totalScrollDistance));
                        progress.style.width = `${adjustedProgress * 100}%`;
                    }
                },
            },
        });

        // First phase: pause (no movement, user reads first exhibit)
        tl.to(container, {
            x: 0,
            duration: pauseDistance / totalScrollDistance,
            ease: 'none',
        });

        // Second phase: actual horizontal scroll
        tl.to(container, {
            x: -scrollWidth,
            duration: scrollWidth / totalScrollDistance,
            ease: 'none',
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <>
            {/* Section Header - Scrolls away before exhibits */}
            <div ref={headerRef} className="bg-[#050505] py-16 text-center border-b border-white/5">
                <p className="text-xs text-[#00F0FF] tracking-[0.3em] mb-4 uppercase font-mono">The Collection</p>
                <h2 className="font-editorial text-4xl md:text-5xl mb-4">Featured Exhibits</h2>
                <p className="text-[#999999] max-w-xl mx-auto text-sm">Scroll to explore each project in detail</p>
            </div>

            <section ref={sectionRef} className="relative z-40 overflow-hidden bg-[#050505]">
                {/* Progress bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1A1A1A] z-30">
                    <div
                        ref={progressRef}
                        className="h-full bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#00FF88] transition-all duration-100"
                        style={{ width: '0%' }}
                    />
                </div>

                <div
                    ref={containerRef}
                    className="flex relative"
                    style={{ width: `${EXHIBITS.length * 100}vw` }}
                >

                    {EXHIBITS.map((exhibit, index) => (
                        <ExhibitSlide
                            key={exhibit.id}
                            exhibit={exhibit}
                            index={index}
                            onExplore={() => setSelectedExhibit(exhibit)}
                        />
                    ))}
                </div>

                {/* Progress dots - fixed during scroll */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {EXHIBITS.map((exhibit) => (
                        <div
                            key={exhibit.id}
                            className="w-2 h-2 rounded-full opacity-50"
                            style={{
                                backgroundColor: EXHIBIT_COLORS[exhibit.id] || '#00F0FF',
                            }}
                        />
                    ))}
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2 text-xs text-[#999999]">
                    <span>Scroll down to navigate</span>
                    <div className="w-4 h-6 border border-[#999999] rounded-full flex items-start justify-center p-1">
                        <div className="w-1 h-2 bg-[#999999] rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Exhibit Modal */}
            {selectedExhibit && (
                <ExhibitModal
                    exhibit={selectedExhibit}
                    onClose={() => setSelectedExhibit(null)}
                    accentColor={EXHIBIT_COLORS[selectedExhibit.id] || '#00F0FF'}
                />
            )}
        </>
    );
}
