import React from 'react';
import { MousePointer2, ChevronRight, Activity, Zap, Circle } from 'lucide-react';
import '../styles/animations.css';
import '../styles/components.css';

export type StageType =
    | 'hero'
    | 'origins'
    | 'feedback'
    | 'intent'
    | 'non-blocking'
    | 'probabilistic'
    | 'environment'
    | 'footer';

interface ArtifactProps {
    stage: StageType;
    mousePos: { x: number; y: number };
}

export const Artifact: React.FC<ArtifactProps> = ({ stage, mousePos }) => {
    // Parallax for magnetic follow effect
    const magnetX = (mousePos.x - window.innerWidth / 2) * 0.05;
    const magnetY = (mousePos.y - window.innerHeight / 2) * 0.05;

    // Elastic Surface Logic for Feedback
    const [elasticStyle, setElasticStyle] = React.useState<React.CSSProperties>({});
    const [isHovered, setIsHovered] = React.useState(false);

    const handleElasticMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const normalizedX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const normalizedY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setElasticStyle({
            transform: `perspective(1000px) rotateY(${normalizedX * 20}deg) rotateX(${-normalizedY * 20}deg) scale(1.05)`,
            transition: 'transform 0.1s ease-out'
        });
        setIsHovered(true);
    };

    const handleElasticLeave = () => {
        setElasticStyle({
            transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });
        setIsHovered(false);
    };

    // Button squish state
    const [isPressed, setIsPressed] = React.useState(false);

    // Typing Effect for Origins
    const [typedText, setTypedText] = React.useState('');
    const fullText = "> INITIALIZING SYSTEM...\n> ESTABLISHING CONNECTION...\n> READY_";

    React.useEffect(() => {
        if (stage === 'origins') {
            setTypedText('');
            let index = 0;
            const interval = setInterval(() => {
                setTypedText(fullText.slice(0, index));
                index++;
                if (index > fullText.length) {
                    clearInterval(interval);
                }
            }, 45);
            return () => clearInterval(interval);
        }
    }, [stage]);

    // Render Content based on stage
    const renderContent = (): React.ReactNode => {
        switch (stage) {
            case 'hero':
                return null;

            case 'origins':
                return (
                    <div className="artifact-origins">
                        <div className="artifact-origins__header">
                            <span className="artifact-origins__status"></span>
                            SYS_ROOT
                        </div>
                        <div className="artifact-origins__terminal">
                            <pre>{typedText}<span className="cursor-blink">|</span></pre>
                        </div>
                    </div>
                );

            case 'feedback':
                // Interactive cursor with squish button
                return (
                    <div className="artifact-feedback">
                        <div className="artifact-feedback__cursor-zone">
                            <MousePointer2
                                size={48}
                                className={`artifact-feedback__cursor ${isHovered ? 'active' : ''}`}
                            />
                        </div>
                        <button
                            className={`artifact-feedback__button ${isPressed ? 'squish' : ''}`}
                            onMouseDown={() => setIsPressed(true)}
                            onMouseUp={() => setIsPressed(false)}
                            onMouseLeave={() => setIsPressed(false)}
                        >
                            <Zap size={18} />
                            Confirm
                        </button>
                    </div>
                );

            case 'intent':
                // Hover-to-slide animation (CSS handles the animation on hover)
                return (
                    <div className="artifact-intent">
                        <div className="artifact-intent__track">
                            <div className="artifact-intent__thumb">
                                <ChevronRight size={28} />
                            </div>
                            <div className="artifact-intent__fill"></div>
                        </div>
                        <div className="artifact-intent__hint">
                            Hover to slide →
                        </div>
                    </div>
                );

            case 'non-blocking':
                // Centered content with visible blobs
                return (
                    <div className="artifact-fluid">
                        <div className="artifact-fluid__blobs">
                            <div className="artifact-fluid__blob artifact-fluid__blob--1"></div>
                            <div className="artifact-fluid__blob artifact-fluid__blob--2"></div>
                            <div className="artifact-fluid__blob artifact-fluid__blob--3"></div>
                        </div>
                        <div className="artifact-fluid__center">
                            <Activity className="artifact-fluid__icon animate-icu" size={40} />
                            <div className="artifact-fluid__dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                );

            case 'probabilistic':
                // Full circle with magnetic parallax on entire element
                return (
                    <div
                        className="artifact-probabilistic"
                        style={{ transform: `translate(${magnetX}px, ${magnetY}px)` }}
                    >
                        <div className="artifact-probabilistic__ring artifact-probabilistic__ring--outer"></div>
                        <div className="artifact-probabilistic__ring artifact-probabilistic__ring--inner"></div>
                        <div className="artifact-probabilistic__core">
                            <Circle size={12} className="artifact-probabilistic__dot" />
                        </div>
                    </div>
                );

            case 'environment':
                return (
                    <div className="artifact-environment">
                        <div className="artifact-environment__gradient"></div>
                    </div>
                );

            case 'footer':
                return (
                    <div className="artifact-footer">
                        <div className="artifact-footer__fade"></div>
                    </div>
                );

            default:
                return null;
        }
    };

    const getPositionClass = (): string => {
        const map: Record<StageType, string> = {
            hero: 'artifact--center',
            origins: 'artifact--right-side',
            feedback: 'artifact--left-side',
            intent: 'artifact--right-side',
            'non-blocking': 'artifact--left-side',
            probabilistic: 'artifact--right-side',
            environment: 'artifact--center',
            footer: 'artifact--center',
        };
        return map[stage] || 'artifact--center';
    };

    const getContainerClass = (): string => {
        const classes: Record<StageType, string> = {
            hero: 'artifact-container--hero animate-heartbeat',
            origins: 'artifact-container--origins',
            feedback: 'artifact-container--feedback',
            intent: 'artifact-container--intent',
            'non-blocking': 'artifact-container--fluid',
            probabilistic: 'artifact-container--probabilistic animate-neon',
            environment: 'artifact-container--environment',
            footer: 'artifact-container--footer',
        };
        return classes[stage] || '';
    };

    const getSize = () => {
        if (stage === 'environment' || stage === 'footer') {
            return { width: '200vmax', height: '200vmax' };
        }
        if (stage === 'hero') {
            return { width: '26rem', height: '26rem' };
        }
        if (stage === 'probabilistic') {
            return { width: '20rem', height: '20rem' };
        }
        return { width: '18rem', height: '18rem' };
    };

    const size = getSize();
    const shouldApply3D = !['environment', 'footer', 'hero', 'probabilistic'].includes(stage);
    const x = (mousePos.x - window.innerWidth / 2) * 0.02;
    const y = (mousePos.y - window.innerHeight / 2) * 0.02;

    return (
        <div className={`artifact ${getPositionClass()}`} style={{
            zIndex: (stage === 'environment' || stage === 'footer') ? 5 : 50
        }}>
            {/* SVG FILTERS FOR LIQUID CORE */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="liquid-core">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="1" seed="1">
                            <animate attributeName="baseFrequency" dur="30s" values="0.015;0.025;0.015" repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" scale="40" />
                        <feGaussianBlur stdDeviation="2" />
                    </filter>

                    <filter id="purple-surge">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="1" seed="2">
                            <animate attributeName="baseFrequency" dur="30s" values="0.015;0.025;0.015" repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" scale="50" result="shifted" />
                        <feMorphology operator="dilate" radius="4" in="shifted" result="expanded" />
                        <feGaussianBlur stdDeviation="15" in="expanded" result="blurred" />
                        <feFlood floodColor="#a855f7" floodOpacity="0.8" result="purple" />
                        <feComposite in="purple" in2="blurred" operator="in" />
                    </filter>
                </defs>
            </svg>
            <div
                className={`artifact__inner ${getContainerClass()}`}
                onMouseMove={stage === 'feedback' ? handleElasticMove : undefined}
                onMouseLeave={stage === 'feedback' ? handleElasticLeave : undefined}
                style={{
                    width: size.width,
                    height: size.height,
                    opacity: stage === 'hero' ? 0 : 1,
                    pointerEvents: stage === 'hero' ? 'none' : 'auto',
                    ...((stage === 'feedback') ? elasticStyle : {
                        transform: shouldApply3D
                            ? `perspective(1000px) rotateX(${y * 0.5}deg) rotateY(${x * 0.5}deg)`
                            : 'none'
                    }),
                    transition: (stage === 'feedback')
                        ? (elasticStyle as React.CSSProperties).transition || 'all 1.2s'
                        : 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
            >
                <div className="artifact__content-wrap" style={{
                    opacity: 1,
                    transition: 'opacity 0.6s ease-in-out',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
