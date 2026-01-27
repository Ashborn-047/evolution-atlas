import React, { useState, useEffect, useRef } from 'react';
import { Artifact } from './Artifact';
import { BackgroundEngine } from './BackgroundEngine';
import type { StageType } from './Artifact';
import '../styles/layout.css';
import '../styles/footer.css';

/**
 * CAPSTONE: From Static Interfaces to Living Web Environments
 * ARCHITECTURE RESTORED: Single Persistent Artifact for Morphing
 * LAYOUT: Split-Screen Safe Zones for Text
 */

// --- UTILS ---

const useMousePosition = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return mousePos;
};

// --- COMPONENTS ---

interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string; // For extra padding or background overrides
}

const Section: React.FC<SectionProps> = ({ id, children, className = "" }) => {
    return (
        <section id={id} className={`section ${className}`}>
            {children}
        </section>
    );
};

export default function CapstonePage() {
    const [activeStage, setActiveStage] = useState<StageType>('hero');
    const mousePos = useMousePosition();

    const ratios = useRef<Record<string, number>>({});

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#standalone-')) {
                const stage = hash.split('-')[1] as StageType;
                // List of valid stages from StageType (excluding 'hero' which is default)
                const validStages: StageType[] = ['origins', 'feedback', 'intent', 'non-blocking', 'probabilistic', 'environment', 'footer'];
                if (validStages.includes(stage)) {
                    setActiveStage(stage);
                    // Also scroll there if needed, though 'is-standalone' might hide other sections
                }
            }
        };
        handleHash();

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                ratios.current[(entry.target as HTMLElement).id] = entry.intersectionRatio;
            });

            // Find the section with the HIGHEST visibility
            let dominantId: StageType = activeStage;
            let maxScore = 0;

            (Object.entries(ratios.current) as [string, number][]).forEach(([id, ratio]) => {
                // Priority sections get 15x weight to trigger background morph early
                const weight = ['environment', 'footer'].includes(id) ? 15 : 1;
                const hysteresis = (id === activeStage) ? 1.2 : 1.0;
                const score = ratio * weight * hysteresis;

                if (score > maxScore) {
                    maxScore = score;
                    dominantId = id as StageType;
                }
            });

            // Only change if the new section has meaningful visibility
            if (dominantId !== activeStage && (maxScore > 0.05)) {
                setActiveStage(dominantId);
            }
        };

        // Main observer for most sections - tight focal point
        const focalObserver = new IntersectionObserver(handleIntersection, {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            rootMargin: "-40% 0px -40% 0px"
        });

        // VERY early observer for climax - trigger as soon as section approaches
        const earlyObserver = new IntersectionObserver(handleIntersection, {
            threshold: [0, 0.05, 0.1, 0.15, 0.2],
            rootMargin: "100px 0px 100px 0px" // Detect 100px BEFORE entering viewport
        });

        document.querySelectorAll('section').forEach((section) => {
            if (['environment', 'footer'].includes(section.id)) {
                earlyObserver.observe(section);
            } else {
                focalObserver.observe(section);
            }
        });

        return () => {
            focalObserver.disconnect();
            earlyObserver.disconnect();
        };
    }, [activeStage]);

    const getBgStyle = (): string => {
        const styles: Record<StageType, string> = {
            hero: 'theme-hero',
            origins: 'theme-origins',
            feedback: 'theme-feedback',
            intent: 'theme-intent',
            'non-blocking': 'theme-fluid',
            probabilistic: 'theme-probabilistic',
            environment: 'theme-environment',
            footer: 'theme-footer'
        };
        return styles[activeStage] || 'theme-hero';
    };

    const isStandalone = typeof window !== 'undefined' && window.location.hash.includes('standalone');

    return (
        <div className={`capstone ${getBgStyle()} ${isStandalone ? 'is-standalone' : ''}`}>

            {/* DYNAMIC BACKGROUND ENGINE */}
            <BackgroundEngine stage={activeStage} mousePos={mousePos} />

            {/* 
              SINGLE PERSISTENT ARTIFACT 
              It floats Fixed above the content, handled by CSS transitions.
              It changes 'stage' prop to morph.
            */}
            <Artifact stage={activeStage} mousePos={mousePos} />

            {!isStandalone && (
                <main className="capstone-main">

                    {/* 1. HERO SECTION (Centered) */}
                    <Section id="hero">
                        <div className="section-content-centered hero-full-composition">
                            {/* STANDALONE HEART CORE */}
                            <div className="hero-vital-heart">
                                <div className="heart-core animate-heartbeat"></div>
                                <div className="heart-aura animate-heartbeat"></div>
                                {/* SINGLE ORGANIC PULSE (Peak Triggered) */}
                                <div className="hero-organic-pulse animate-purple-pulse"></div>
                                <div className="artifact-core--liquid hero-core-fill"></div>
                            </div>

                            <div className="hero-content standalone-hero">
                                <h1 className="hero-title">
                                    <span className="kinetic-word stagger-1">THE LIVING</span><br />
                                    <span className="kinetic-word stagger-2">INTERFACE</span><br />
                                    <span className="kinetic-word stagger-3">ECOSYSTEM</span>
                                </h1>
                                <div className="hero-divider stagger-3"></div>
                                <div className="hero-description-group">
                                    <p className="hero-tagline">Living Interface Ecosystem</p>
                                    <p className="text-muted text-sm opacity-50 tracking-widest mt-2 uppercase">
                                        Adaptive • Non-Blocking • Intent-Driven
                                    </p>
                                </div>
                            </div>

                            {/* Scroll Prompt */}
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                                <span className="text-[10px] tracking-[0.5em] uppercase">Begin Descent</span>
                                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                            </div>
                        </div>
                    </Section>

                    {/* THE ASCENT SPACER */}
                    <div className="phase-spacer"></div>

                    {/* 2. ORIGINS (Text LEFT 50%) - Artifact will float RIGHT */}
                    <Section id="origins">
                        <div className="section-content-left">
                            <div className="glass-container origins-box font-mono">
                                <h3>Phase 01</h3>
                                <h2 className="origins-title">Origins</h2>
                                <p className="origins-text text-highlight">
                                    In the beginning, the interface was explicit. <br />
                                    A box. A border. A command.
                                </p>
                                <div className="origins-divider"></div>
                                <p className="origins-subtext">
                                    Deterministic inputs yielding immediate outputs. <br />
                                    The system waited for us.
                                </p>
                            </div>
                        </div>
                    </Section>

                    <div className="phase-spacer"></div>

                    {/* 3. FEEDBACK (Text RIGHT 50%) - Artifact will float LEFT */}
                    <Section id="feedback">
                        <div className="section-content-right">
                            <div className="glass-container feedback-content text-left">
                                <h3>Phase 02</h3>
                                <h2 className="feedback-title">Feedback</h2>
                                <div className="feedback-card">
                                    <p className="text-highlight">Then, the screen learned to acknowledge us.</p>
                                    <p className="feedback-sub">
                                        Hover states. Clicks. Active confirmations. <br />
                                        Motion appeared, but only to explain what just happened.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <div className="phase-spacer"></div>

                    {/* 4. INTENT (Text LEFT 50%) - Artifact float RIGHT */}
                    <Section id="intent">
                        <div className="section-content-left">
                            <div className="glass-container intent-box">
                                <h3>Phase 03</h3>
                                <h2 className="intent-title">Intent</h2>
                                <p className="intent-highlight text-highlight">Motion began to anticipate.</p>
                                <p className="intent-text">
                                    We stopped clicking and started swiping. The interface guided the eye,
                                    revealing content before the action was complete.
                                    <br /><br />
                                    Transitions became a language of direction.
                                </p>
                            </div>
                        </div>
                    </Section>

                    <div className="phase-spacer"></div>

                    {/* 5. FLUIDITY (Text RIGHT 50%) - Artifact float LEFT */}
                    <Section id="non-blocking">
                        <div className="section-content-right">
                            <div className="glass-container fluid-box text-left">
                                <h3>Phase 04</h3>
                                <h2 className="fluid-title">Fluidity</h2>
                                <p className="fluid-highlight text-highlight">The pause disappeared.</p>
                                <p className="fluid-text">
                                    Loading screens dissolved into optimistic states.
                                    The application ceased to be a series of stops and starts.
                                    <br /><br />
                                    Continuity became more important than raw speed.
                                </p>
                            </div>
                        </div>
                    </Section>

                    <div className="phase-spacer"></div>

                    {/* 6. PROBABILISTIC (Text LEFT 50%) - Artifact float RIGHT */}
                    <Section id="probabilistic">
                        <div className="section-content-left">
                            <div className="glass-container prob-content">
                                <h3>Phase 05</h3>
                                <h2 className="prob-title">Probabilistic</h2>
                                <div className="prob-card">
                                    <p className="prob-highlight text-highlight">The interface became a participant.</p>
                                    <p className="prob-text">
                                        It stopped waiting for explicit commands. It began inferring intent.
                                        Autofill, suggestions, context-awareness.
                                        <br /><br />
                                        It acts alongside us, adapting to unseen patterns.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <div className="phase-spacer" style={{ height: '30vh' }}></div>

                    {/* 7. ENVIRONMENT (Centered Content) - Artifact is Fullscreen Background */}
                    <Section id="environment">
                        <div className="section-content-centered">
                            <div className="env-content" style={{ position: 'relative', zIndex: 10 }}>
                                <h4 className="env-label text-muted uppercase text-xs opacity-70">Phase 06</h4>
                                <h1 className="env-title">Environment</h1>
                                <h2 className="env-highlight">From static tools to lived-in spaces.</h2>
                                <div className="env-card glass-container">
                                    <p className="env-text">
                                        The modern interface breathes. It has gravity. It simulates presence.
                                    </p>
                                    <div className="env-cta-wrap">
                                        <span className="env-cta">
                                            The web is no longer something we look at. <br />
                                            It is something we walk through.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* THE DESCENT SPACER */}
                    <div className="phase-spacer" style={{ height: '40vh' }}></div>

                    {/* 8. FOOTER (Centered) */}
                    <Section id="footer">
                        <div className="section-content-centered">
                            <footer className="glass-container footer-overhaul">
                                <div className="footer-top">
                                    <p className="footer-tagline">Living Interface Ecosystem</p>
                                </div>

                                <div className="footer-metrics">
                                    <div className="metric">
                                        <span className="metric-label">System Health</span>
                                        <span className="metric-value animate-icu">Nominal</span>
                                    </div>
                                    <div className="metric">
                                        <span className="metric-label">Interface Continuity</span>
                                        <span className="metric-value">Active</span>
                                    </div>
                                    <div className="metric">
                                        <span className="metric-label">Local Time</span>
                                        <span className="metric-value">{new Date().toLocaleTimeString()}</span>
                                    </div>
                                </div>

                                <div className="footer-links">
                                    <a href="https://github.com/Ashborn-047/Living-Interface-Ecosystem" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                                </div>

                                <div className="footer-bottom">
                                    <p className="footer-copy">© 2026 Ashborn. The interface is no longer waiting.</p>
                                </div>
                            </footer>
                        </div>
                    </Section>
                </main>
            )}
        </div>
    );
}
