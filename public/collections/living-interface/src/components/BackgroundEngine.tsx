import React from 'react';
import '../styles/background.css';
import type { StageType } from './Artifact';

interface BackgroundEngineProps {
    stage: StageType;
    mousePos: { x: number; y: number };
}

export const BackgroundEngine: React.FC<BackgroundEngineProps> = ({ stage, mousePos }) => {
    // Stage-specific orbs for mesh gradient
    const getOrbs = () => {
        switch (stage) {
            case 'hero':
                return [
                    { color: '#3b82f6', top: '20%', left: '20%', size: '40vw' },
                    { color: '#6366f1', bottom: '20%', right: '20%', size: '35vw' }
                ];
            case 'origins':
                return [
                    { color: '#10b981', top: '10%', left: '70%', size: '30vw' },
                    { color: '#064e3b', bottom: '30%', right: '10%', size: '40vw' }
                ];
            case 'feedback':
                return [
                    { color: '#2563eb', top: '50%', left: '10%', size: '45vw' },
                    { color: '#1e3a8a', bottom: '10%', right: '60%', size: '30vw' }
                ];
            case 'environment':
                return [
                    { color: '#10b981', top: '20%', left: '30%', size: '50vw' },
                    { color: '#064e3b', bottom: '20%', right: '20%', size: '45vw' }
                ];
            case 'footer':
                return [
                    { color: '#1e293b', top: '40%', left: '40%', size: '40vw' },
                    { color: '#0f172a', bottom: '10%', right: '10%', size: '50vw' }
                ];
            default:
                return [
                    { color: '#1e1e2e', top: '30%', left: '30%', size: '50vw' },
                    { color: '#000000', bottom: '30%', right: '30%', size: '50vw' }
                ];
        }
    };

    const orbs = getOrbs();

    return (
        <div className={`bg-engine bg-engine--${stage}`}>
            <div className="bg-grid"></div>

            {/* LIGHT BEAMS FOR HERO */}
            <div className="bg-beams">
                <div className="bg-beam"></div>
                <div className="bg-beam"></div>
                <div className="bg-beam"></div>
            </div>

            <div className="bg-mesh">
                {orbs.map((orb, i) => (
                    <div
                        key={i}
                        className="bg-mesh__orb"
                        style={{
                            background: orb.color,
                            top: orb.top,
                            left: orb.left,
                            right: orb.right,
                            bottom: orb.bottom,
                            width: orb.size,
                            height: orb.size,
                            transform: `translate(${(i % 2 === 0 ? 1 : -1) * (mousePos.x - window.innerWidth / 2) * 0.05}px, ${(i % 2 === 0 ? -1 : 1) * (mousePos.y - window.innerHeight / 2) * 0.05}px)`,
                            opacity: 0.4
                        }}
                    />
                ))}
            </div>
            <div className="bg-grain"></div>
        </div>
    );
};
