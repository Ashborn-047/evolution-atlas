'use client';

import { useRef, useLayoutEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { EXHIBITS, Exhibit } from '@/lib/exhibits';
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

interface ExhibitSlideProps {
    exhibit: Exhibit;
    index: number;
}

function ExhibitSlide({ exhibit, index }: ExhibitSlideProps) {
    const color = EXHIBIT_COLORS[exhibit.id] || '#00F0FF';

    return (
        <div
            className="exhibit-slide min-w-[100vw] h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 pt-16"
        >
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
                {/* Left: Visual / Number */}
                <div className="relative">
                    {/* Large number background */}
                    <div
                        className="absolute -left-2 -top-12 text-[8rem] md:text-[10rem] font-editorial font-bold opacity-10 select-none pointer-events-none"
                        style={{ color }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Exhibit info card */}
                    <div className="relative z-10 glass-panel hud-border p-5 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-medium" style={{ color }}>{exhibit.year}</span>
                            <span
                                className="text-[10px] px-2 py-0.5 border font-medium"
                                style={{ borderColor: color, color }}
                            >
                                {exhibit.category}
                            </span>
                        </div>

                        <h2 className="font-editorial text-3xl md:text-4xl mb-2 leading-tight">
                            {exhibit.title}
                        </h2>

                        <p className="text-sm text-[#999999] mb-5">
                            {exhibit.tagline}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            {exhibit.tech.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="text-[10px] px-2 py-1 bg-[#1A1A1A] border border-[rgba(224,224,224,0.1)]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3">
                            {exhibit.liveUrl && (
                                <a
                                    href={exhibit.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 text-[#050505] text-sm font-medium transition-all hover:scale-105"
                                    style={{ backgroundColor: color }}
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    Live Demo
                                </a>
                            )}
                            {exhibit.githubUrl && (
                                <a
                                    href={exhibit.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 border text-sm transition-all hover:scale-105"
                                    style={{ borderColor: color, color }}
                                >
                                    <Github className="w-3 h-3" />
                                    Source
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Description */}
                <div className="space-y-4 overflow-hidden">
                    <div>
                        <h3 className="text-[10px] text-[#00F0FF] mb-2 tracking-[0.2em] uppercase">The Hypothesis</h3>
                        <p className="text-sm text-[#E0E0E0] leading-relaxed line-clamp-4">
                            {exhibit.hypothesis}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-[10px] text-[#999999] mb-2 tracking-[0.2em] uppercase">The Architecture</h3>
                        <p className="text-xs text-[#999999] leading-relaxed line-clamp-4">
                            {exhibit.architecture}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-[10px] text-[#999999] mb-2 tracking-[0.2em] uppercase">Future Implications</h3>
                        <p className="text-xs text-[#999999] leading-relaxed line-clamp-3">
                            {exhibit.implications}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function HorizontalExhibits() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const progress = progressRef.current;

        if (!section || !container) return;

        // Calculate the scroll distance
        const scrollWidth = container.scrollWidth - window.innerWidth;

        // Create the horizontal scroll animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${scrollWidth}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Update progress bar
                    if (progress) {
                        progress.style.width = `${self.progress * 100}%`;
                    }
                },
            },
        });

        // Animate the container horizontally
        tl.to(container, {
            x: -scrollWidth,
            ease: 'none',
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-[#050505]">
            {/* Section header - fixed during scroll */}
            <div className="absolute top-6 left-8 z-20">
                <h3 className="font-editorial text-2xl mb-1">The Exhibits</h3>
                <p className="text-sm text-[#999999]">
                    Scroll to explore all {EXHIBITS.length} experiments
                </p>
            </div>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A1A1A] z-30">
                <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-[#00F0FF] via-[#FF00FF] to-[#00FF88] transition-all duration-100"
                    style={{ width: '0%' }}
                />
            </div>

            {/* Horizontal scroll container */}
            <div
                ref={containerRef}
                className="flex"
                style={{ width: `${EXHIBITS.length * 100}vw` }}
            >
                {EXHIBITS.map((exhibit, index) => (
                    <ExhibitSlide
                        key={exhibit.id}
                        exhibit={exhibit}
                        index={index}
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
    );
}
