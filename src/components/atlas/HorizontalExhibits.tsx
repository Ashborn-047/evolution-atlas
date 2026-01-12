'use client';

import { useRef, useEffect, useState } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { EXHIBITS, Exhibit } from '@/lib/exhibits';

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
            className="min-w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24"
            style={{ scrollSnapAlign: 'start' }}
        >
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Visual / Number */}
                <div className="relative">
                    {/* Large number background */}
                    <div
                        className="absolute -left-4 -top-8 text-[12rem] md:text-[16rem] font-editorial font-bold opacity-10 select-none"
                        style={{ color }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Exhibit info card */}
                    <div className="relative z-10 glass-panel hud-border p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm" style={{ color }}>{exhibit.year}</span>
                            <span
                                className="text-xs px-3 py-1 border"
                                style={{ borderColor: color, color }}
                            >
                                {exhibit.category}
                            </span>
                        </div>

                        <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl mb-4">
                            {exhibit.title}
                        </h2>

                        <p className="text-lg text-[#999999] mb-8">
                            {exhibit.tagline}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {exhibit.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-3 py-1.5 bg-[#1A1A1A] border border-[rgba(224,224,224,0.1)]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-4">
                            {exhibit.liveUrl && (
                                <a
                                    href={exhibit.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 text-[#050505] font-medium transition-all hover:scale-105"
                                    style={{ backgroundColor: color }}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                            {exhibit.githubUrl && (
                                <a
                                    href={exhibit.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 border transition-all hover:scale-105"
                                    style={{ borderColor: color, color }}
                                >
                                    <Github className="w-4 h-4" />
                                    Source Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Description */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm text-[#999999] mb-3 tracking-widest">THE HYPOTHESIS</h3>
                        <p className="text-lg text-[#E0E0E0] leading-relaxed">
                            {exhibit.hypothesis}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm text-[#999999] mb-3 tracking-widest">THE ARCHITECTURE</h3>
                        <p className="text-[#999999] leading-relaxed">
                            {exhibit.architecture}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm text-[#999999] mb-3 tracking-widest">FUTURE IMPLICATIONS</h3>
                        <p className="text-[#999999] leading-relaxed">
                            {exhibit.implications}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function HorizontalExhibits() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Handle scroll to update active index
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const slideWidth = container.clientWidth;
            const newIndex = Math.round(scrollLeft / slideWidth);
            setActiveIndex(Math.min(newIndex, EXHIBITS.length - 1));
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSlide = (index: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const slideWidth = container.clientWidth;
        container.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth',
        });
    };

    const goToPrevious = () => {
        if (activeIndex > 0) {
            scrollToSlide(activeIndex - 1);
        }
    };

    const goToNext = () => {
        if (activeIndex < EXHIBITS.length - 1) {
            scrollToSlide(activeIndex + 1);
        }
    };

    return (
        <section className="relative">
            {/* Section header */}
            <div className="absolute top-8 left-8 z-20">
                <h3 className="font-editorial text-2xl mb-2">The Exhibits</h3>
                <p className="text-sm text-[#999999]">
                    {activeIndex + 1} / {EXHIBITS.length} — Scroll horizontally or use arrows
                </p>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={goToPrevious}
                disabled={activeIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 glass-panel hud-border disabled:opacity-30 hover:border-[#00F0FF] transition-colors"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={goToNext}
                disabled={activeIndex === EXHIBITS.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 glass-panel hud-border disabled:opacity-30 hover:border-[#00F0FF] transition-colors"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Horizontal scroll container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto h-screen snap-x snap-mandatory scrollbar-hide"
                style={{
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {EXHIBITS.map((exhibit, index) => (
                    <ExhibitSlide
                        key={exhibit.id}
                        exhibit={exhibit}
                        index={index}
                    />
                ))}
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {EXHIBITS.map((exhibit, index) => (
                    <button
                        key={exhibit.id}
                        onClick={() => scrollToSlide(index)}
                        className="group relative"
                    >
                        <div
                            className={`w-3 h-3 rounded-full transition-all ${index === activeIndex
                                ? 'scale-125'
                                : 'opacity-50 hover:opacity-100'
                                }`}
                            style={{
                                backgroundColor: EXHIBIT_COLORS[exhibit.id] || '#00F0FF',
                                boxShadow: index === activeIndex
                                    ? `0 0 20px ${EXHIBIT_COLORS[exhibit.id] || '#00F0FF'}`
                                    : 'none',
                            }}
                        />
                        {/* Tooltip */}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            {exhibit.title}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}
