'use client';

import { useEffect, useRef } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import { Exhibit } from '@/lib/exhibits';
import { gsap } from 'gsap';

interface ExhibitModalProps {
    exhibit: Exhibit | null;
    onClose: () => void;
    accentColor?: string;
}

export function ExhibitModal({ exhibit, onClose, accentColor = '#00F0FF' }: ExhibitModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!exhibit) return;

        // Animate in
        gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, delay: 0.1, ease: 'back.out(1.2)' }
        );

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, [exhibit]);

    const handleClose = () => {
        // Animate out
        gsap.to(contentRef.current, { opacity: 0, y: 30, scale: 0.95, duration: 0.2, ease: 'power2.in' });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, delay: 0.1, onComplete: onClose });
    };

    if (!exhibit) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: 'rgba(5, 5, 5, 0.95)', backdropFilter: 'blur(20px)' }}
            onClick={(e) => e.target === overlayRef.current && handleClose()}
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg"
                style={{
                    background: 'linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(10,10,10,0.98) 100%)',
                    border: `1px solid ${accentColor}20`,
                    boxShadow: `0 0 60px ${accentColor}15`
                }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all hover:bg-white/10"
                    style={{ color: accentColor }}
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="p-8 md:p-12 border-b border-white/5">
                    <div className="flex items-center gap-4 mb-6">
                        <span
                            className="text-xs font-mono tracking-widest uppercase px-3 py-1 border"
                            style={{ color: accentColor, borderColor: `${accentColor}40` }}
                        >
                            ERA_{exhibit.year}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                            {exhibit.category}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: accentColor }}>
                        {exhibit.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl">
                        {exhibit.tagline}
                    </p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-10">
                    {/* Hypothesis */}
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.5em] mb-4 font-mono" style={{ color: accentColor }}>
                            Hypothesis / Core
                        </h3>
                        <p className="text-lg text-white/80 leading-relaxed font-light">
                            {exhibit.hypothesis}
                        </p>
                    </div>

                    {/* Architecture & Synthesis Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-[10px] uppercase tracking-[0.5em] mb-4 font-mono" style={{ color: accentColor }}>
                                Architecture
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                {exhibit.architecture}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[10px] uppercase tracking-[0.5em] mb-4 font-mono" style={{ color: accentColor }}>
                                Synthesis
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                {exhibit.implications}
                            </p>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.5em] mb-4 font-mono" style={{ color: accentColor }}>
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {exhibit.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-3 py-1.5 text-xs font-mono border rounded"
                                    style={{ borderColor: `${accentColor}30`, color: accentColor }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                        {exhibit.liveUrl && (
                            <a
                                href={exhibit.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all hover:scale-105"
                                style={{ backgroundColor: accentColor, color: '#050505' }}
                            >
                                <span>Live Demo</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                        {exhibit.githubUrl && (
                            <a
                                href={exhibit.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-3 text-sm tracking-wider uppercase border transition-all hover:bg-white/5"
                                style={{ borderColor: `${accentColor}50`, color: accentColor }}
                            >
                                <Github className="w-4 h-4" />
                                <span>Source Code</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
