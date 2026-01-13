'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { DOCUMENTARY_SECTIONS } from './DocumentaryScroll';

interface ChapterModalProps {
    isOpen: boolean;
    onClose: () => void;
    chapterIndex: number | null;
}

export function ChapterModal({ isOpen, onClose, chapterIndex }: ChapterModalProps) {
    if (chapterIndex === null) return null;
    const section = DOCUMENTARY_SECTIONS[chapterIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-5xl max-h-[90vh] bg-[#111111] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black/50"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Visual Side (LHS) */}
                        <div className="w-full md:w-2/5 relative overflow-hidden bg-black flex items-center justify-center p-12 lg:p-20">
                            <div
                                className="absolute inset-0 opacity-20 blur-3xl rounded-full scale-150"
                                style={{ background: `radial-gradient(circle, ${section.color}, transparent)` }}
                            />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <span className="text-8xl md:text-9xl font-editorial opacity-10 mb-4" style={{ color: section.color }}>
                                    0{chapterIndex + 1}
                                </span>
                                <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-2">Era Insight</p>
                                <h2 className="text-2xl md:text-3xl font-editorial text-white">{section.title}</h2>
                            </div>
                        </div>

                        {/* Text Side (RHS) */}
                        <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar bg-gradient-to-br from-white/[0.02] to-transparent">
                            <div className="max-w-xl">
                                <p className="text-xs uppercase tracking-[0.4em] font-mono mb-6" style={{ color: section.color }}>
                                    Extended Narrative
                                </p>
                                <h3 className="text-3xl md:text-4xl font-editorial mb-8 text-white leading-tight">
                                    {section.subtitle}
                                </h3>

                                <div className="space-y-6 text-[#999999] leading-relaxed text-lg font-light">
                                    <p>
                                        {section.content}
                                    </p>
                                    <p>
                                        This era represented a pivotal shift in how we perceived the boundary between human intent and digital execution.
                                        What started as a simple exploration of {section.title.toLowerCase()} eventually paved the way for the complex,
                                        multi-layered ecosystem we inhabit today.
                                    </p>

                                    {/* Thematic Deep Dive Content */}
                                    <div className="pt-8 border-t border-white/5 space-y-4">
                                        <h4 className="text-white font-mono text-xs uppercase tracking-[0.3em] opacity-60">Key Technological Markers</h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {section.markers.map((marker, i) => (
                                                <a
                                                    key={i}
                                                    href={marker.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group/marker flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300 no-underline cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: section.color }} />
                                                        <span className="text-sm font-medium text-white/80 group-hover/marker:text-white transition-colors">{marker.label}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover/marker:opacity-100 transition-opacity">
                                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">Visit</span>
                                                        <svg className="w-3 h-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            ))}
                                        </ul>
                                    </div>

                                    <p className="italic text-white/30 text-base py-6">
                                        "The transition from {section.title} to the next era wasn't just a technical upgrade; it was a fundamental reorganization of the digital psyche."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
