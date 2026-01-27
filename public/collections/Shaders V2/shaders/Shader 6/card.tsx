import { useState } from 'react'
import { SpiralAnimation } from './shader'

// ============================================
// SPIRAL INTERFACE CARD Component
// ============================================

export function SpiralInterfaceCard() {
    const [isHovered, setIsHovered] = useState(false)
    const [isDark, setIsDark] = useState(true)

    // Vibrant Purple/Blue/Cyan Gradient for Dark Mode
    // Vibrant Emerald/Blue/Purple for Light Mode
    const glowGradient = isDark
        ? 'linear-gradient(to right, #8b5cf6, #3b82f6, #06b6d4)'
        : 'linear-gradient(to right, #10b981, #3b82f6, #8b5cf6)'

    const cardBg = isDark ? '#050505' : '#f5efe6'
    const cardBorder = isDark ? 'rgba(255, 255, 255, 0.1)' : '#d1c7bc'
    const textColor = isDark ? '#f3f4f6' : '#111827'
    const subTextColor = isDark ? '#9ca3af' : '#4b5563'
    const accentColor = isDark ? '#a78bfa' : '#4f46e5'
    const accentBg = isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(79, 70, 229, 0.1)'
    const accentBorder = isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(79, 70, 229, 0.2)'

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: isDark ? '#000' : '#e8e0d5', // Warm light mode bg
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transition: 'background 0.3s ease'
        }}>
            {/* Theme Toggle */}
            <button
                onClick={() => setIsDark(!isDark)}
                style={{
                    marginBottom: '2rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    border: `1px solid ${isDark ? '#404040' : '#d1c7bc'}`,
                    background: isDark ? '#171717' : '#f5efe6',
                    color: isDark ? '#f3f4f6' : '#111827',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    zIndex: 20
                }}
            >
                {isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
            </button>

            {/* Wrapper for glow effect */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '24rem' }}>

                {/* Background Blur Gradient Glow */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    width: '100%',
                    background: glowGradient,
                    transform: 'scale(0.85)',
                    borderRadius: '9999px',
                    filter: 'blur(60px)',
                    opacity: isDark ? 0.35 : 0.65,
                    pointerEvents: 'none',
                    transition: 'all 0.4s ease'
                }} />

                {/* Main Card Container */}
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '1.25rem',
                        border: `1px solid ${cardBorder}`,
                        background: cardBg,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isHovered
                            ? `0 25px 50px -12px ${isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(16, 185, 129, 0.2)'}`
                            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                >
                    {/* Background Animation Layer */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        height: '440px',
                        background: isDark ? '#000' : '#ebe5db'
                    }}>
                        <SpiralAnimation
                            style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: isDark ? 1 : 0.8,
                                filter: isDark ? 'none' : 'invert(1) hue-rotate(180deg) contrast(1.1)'
                            }}
                        />
                        {/* Gradient overlay for text legibility */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: isDark
                                ? 'linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.4) 50%, #050505 100%)'
                                : 'linear-gradient(to bottom, transparent 0%, rgba(245,239,230,0.4) 50%, #f5efe6 100%)',
                            pointerEvents: 'none',
                            transition: 'background 0.3s ease'
                        }} />
                    </div>

                    {/* Content Layer */}
                    <div style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '440px',
                        padding: '1.5rem',
                        pointerEvents: 'none'
                    }}>
                        {/* Header: Icon & Tag */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{
                                padding: '0.6rem',
                                borderRadius: '0.75rem',
                                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                                backdropFilter: 'blur(8px)',
                                color: accentColor,
                                transform: isHovered ? 'scale(1.1) rotate(12deg)' : 'scale(1) rotate(0deg)',
                                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}>
                                <SpiralIcon size={20} />
                            </div>
                            <span style={{
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                color: accentColor,
                                background: accentBg,
                                padding: '0.25rem 0.6rem',
                                borderRadius: '2rem',
                                border: `1px solid ${accentBorder}`,
                                backdropFilter: 'blur(4px)'
                            }}>
                                SYS.06
                            </span>
                        </div>

                        {/* Footer: Title, Description & CTA */}
                        <div>
                            <div style={{ marginBottom: '1.5rem', pointerEvents: 'auto' }}>
                                <h2 style={{
                                    fontSize: '1.75rem',
                                    fontWeight: 800,
                                    letterSpacing: '-0.025em',
                                    color: isDark ? 'white' : '#111827',
                                    marginBottom: '0.5rem'
                                }}>
                                    Spiral Singularity
                                </h2>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: subTextColor,
                                    lineHeight: 1.6,
                                    maxWidth: '90%'
                                }}>
                                    A hyper-dynamic GSAP-driven particle field forming an infinite spiral path. Precision-engineered motion logic.
                                </p>
                            </div>

                            <button style={{
                                position: 'relative',
                                width: '100%',
                                outline: 'none',
                                border: 'none',
                                borderRadius: '0.75rem',
                                padding: '0.875rem 1rem',
                                background: accentColor,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                                boxShadow: isHovered
                                    ? `0 10px 15px -3px ${isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(79, 70, 229, 0.4)'}`
                                    : 'none',
                                pointerEvents: 'auto'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.6rem',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    fontWeight: 600
                                }}>
                                    <span>Engage Warp</span>
                                    <ArrowIcon size={16}
                                        style={{
                                            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ============================================
// ICONS
// ============================================

function SpiralIcon({ size = 24, style }: { size?: number, style?: React.CSSProperties }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={style}
        >
            <path d="M12 2a10 10 0 1 0 10 10" />
            <path d="M12 6a6 6 0 1 0 6 6" />
            <path d="M12 10a2 2 0 1 0 2 2" />
        </svg>
    )
}

function ArrowIcon({ size = 24, style }: { size?: number, style?: React.CSSProperties }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={style}
        >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    )
}
