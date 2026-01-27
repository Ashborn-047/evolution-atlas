import { useState, useMemo } from 'react'

// ============================================
// METEORS COMPONENT
// ============================================

interface MeteorsProps {
    number?: number
    color?: string
}

function Meteors({ number = 20, color = '#64748b' }: MeteorsProps) {
    const meteors = useMemo(() => {
        return Array.from({ length: number }, (_, idx) => ({
            id: idx,
            left: Math.floor(Math.random() * 800 - 400),
            delay: Math.random() * 0.6 + 0.2,
            duration: Math.floor(Math.random() * 8 + 2),
        }))
    }, [number])

    return (
        <>
            <style>{`
                @keyframes meteor {
                    0% { transform: rotate(215deg) translateX(0); opacity: 1; }
                    70% { opacity: 1; }
                    100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
                }
            `}</style>

            {meteors.map((meteor) => (
                <span
                    key={`meteor-${meteor.id}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: `${meteor.left}px`,
                        width: '2px',
                        height: '2px',
                        borderRadius: '9999px',
                        backgroundColor: color,
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
                        transform: 'rotate(215deg)',
                        animation: `meteor ${meteor.duration}s linear infinite`,
                        animationDelay: `${meteor.delay}s`,
                    }}
                >
                    <span
                        style={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '1px',
                            background: `linear-gradient(to right, ${color}, transparent)`,
                        }}
                    />
                </span>
            ))}
        </>
    )
}

// ============================================
// ICONS
// ============================================

const StarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

const ArrowRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

// ============================================
// METEOR SHOWER CARD (with Glow Effect)
// ============================================

export function MeteorShowerCard() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div style={{
            minHeight: '100vh',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Wrapper for glow effect */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '24rem' }}>

                {/* Background Blur Gradient Glow */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    width: '100%',
                    background: 'linear-gradient(to right, #3b82f6, #14b8a6)',
                    transform: 'scale(0.85)',
                    borderRadius: '9999px',
                    filter: 'blur(60px)',
                    opacity: 0.5,
                    pointerEvents: 'none'
                }} />

                {/* Card Container */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '1rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: '#0f172a',
                        transition: 'all 0.3s ease',
                        boxShadow: isHovered ? '0 25px 50px -12px rgba(20, 184, 166, 0.3)' : 'none'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Background Layer */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        height: '400px',
                        background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
                    }}>
                        {/* Meteor Effect */}
                        <Meteors number={30} color="#94a3b8" />

                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(15,23,42,0.95) 100%)',
                            pointerEvents: 'none'
                        }} />
                    </div>

                    {/* Content Layer */}
                    <div style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '400px',
                        padding: '1.5rem'
                    }}>
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                transition: 'transform 0.5s ease',
                                transform: isHovered ? 'scale(1.1) rotate(3deg)' : 'none',
                                color: '#94a3b8'
                            }}>
                                <StarIcon />
                            </div>
                            <span style={{
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                color: 'rgba(148, 163, 184, 0.8)',
                                background: 'rgba(71, 85, 105, 0.2)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                border: '1px solid rgba(100, 116, 139, 0.3)'
                            }}>
                                SYS.03
                            </span>
                        </div>

                        {/* Body */}
                        <div>
                            <div style={{ marginBottom: '1rem' }}>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    letterSpacing: '-0.025em',
                                    color: 'white',
                                    marginBottom: '0.5rem',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                }}>
                                    Meteor Shower
                                </h2>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: '#cbd5e1',
                                    lineHeight: 1.6,
                                    fontWeight: 300
                                }}>
                                    Celestial debris entering the atmosphere. Each particle traces
                                    a luminous path through the void. Impact estimated: imminent.
                                </p>
                            </div>

                            {/* Action Button */}
                            <div style={{ paddingTop: '1rem' }}>
                                <button style={{
                                    position: 'relative',
                                    width: '100%',
                                    overflow: 'hidden',
                                    borderRadius: '0.75rem',
                                    background: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                                    padding: '1px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        borderRadius: '0.75rem',
                                        background: 'rgba(15,23,42,0.5)',
                                        padding: '0.75rem 1rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: 'white',
                                        backdropFilter: 'blur(4px)'
                                    }}>
                                        <span>Watch the Sky</span>
                                        <span style={{
                                            transition: 'transform 0.3s ease',
                                            transform: isHovered ? 'translateX(4px)' : 'none'
                                        }}>
                                            <ArrowRightIcon />
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Border Glow */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        border: `2px solid ${isHovered ? 'rgba(20, 184, 166, 0.3)' : 'transparent'}`,
                        borderRadius: '1rem',
                        transition: 'all 0.5s ease'
                    }} />
                </div>
            </div>
        </div>
    )
}

export default MeteorShowerCard
