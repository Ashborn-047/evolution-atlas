'use client'

import { useState } from 'react'
import { DottedSurface } from './shader'

/**
 * ------------------------------------------------------------------
 * COMPONENT: DottedSurfaceCard
 * Bento-style profile card featuring the Dotted Surface animation.
 * ------------------------------------------------------------------
 */

export function DottedSurfaceCard() {
    const [isHovered, setIsHovered] = useState(false)
    const [isDark, setIsDark] = useState(true)

    // Vibrant Indigo/Purple Gradient for Dark Mode
    // Vibrant Blue/Cyan for Light Mode
    const glowGradient = isDark
        ? 'linear-gradient(to right, #6366f1, #8b5cf6, #d946ef)'
        : 'linear-gradient(to right, #3b82f6, #06b6d4, #10b981)'

    const cardBg = isDark ? '#080808' : '#ffffff'
    const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
    const textColor = isDark ? '#f3f4f6' : '#111827'
    const subTextColor = isDark ? '#9ca3af' : '#4b5563'
    const accentColor = isDark ? '#818cf8' : '#2563eb'
    const accentBg = isDark ? 'rgba(129, 140, 248, 0.1)' : 'rgba(37, 99, 235, 0.05)'
    const accentBorder = isDark ? 'rgba(129, 140, 248, 0.2)' : 'rgba(37, 99, 235, 0.1)'

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: isDark ? '#000' : '#f0f2f5',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            {/* Theme Toggle Button */}
            <button
                onClick={() => setIsDark(!isDark)}
                style={{
                    marginBottom: '2.5rem',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '9999px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    background: isDark ? '#111' : '#fff',
                    color: textColor,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                {isDark ? <span>☀️ Light Mode</span> : <span>🌙 Dark Mode</span>}
            </button>

            {/* Card Wrapper with Glow */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '28rem' }}>

                {/* Dynamic Background Glow */}
                <div style={{
                    position: 'absolute',
                    inset: '-10%',
                    background: glowGradient,
                    borderRadius: '2rem',
                    filter: 'blur(80px)',
                    opacity: isDark ? 0.2 : 0.4,
                    transition: 'all 0.6s ease',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    pointerEvents: 'none'
                }} />

                {/* Main Card Container */}
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '480px',
                        overflow: 'hidden',
                        borderRadius: '1.5rem',
                        border: `1px solid ${cardBorder}`,
                        background: cardBg,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isHovered
                            ? '0 30px 60px -12px rgba(0, 0, 0, 0.4)'
                            : '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
                        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
                    }}
                >
                    {/* Background Shader Layer */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        opacity: isDark ? 0.8 : 1
                    }}>
                        <DottedSurface isDark={isDark} />

                        {/* Gradient Overlay for content protection */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: isDark
                                ? 'linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.2) 60%, #080808 100%)'
                                : 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.2) 60%, #ffffff 100%)',
                            pointerEvents: 'none'
                        }} />
                    </div>

                    {/* Content Construction */}
                    <div style={{
                        position: 'relative',
                        zIndex: 10,
                        height: '100%',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        pointerEvents: 'none'
                    }}>
                        {/* Header Area */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                borderRadius: '1rem',
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                                border: `1px solid ${cardBorder}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: accentColor,
                                backdropFilter: 'blur(10px)',
                                transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)',
                                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}>
                                <NetworkIcon size={24} />
                            </div>
                            <div style={{
                                background: accentBg,
                                color: accentColor,
                                border: `1px solid ${accentBorder}`,
                                padding: '0.3rem 0.8rem',
                                borderRadius: '2rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                letterSpacing: '0.05em'
                            }}>
                                SYS.07
                            </div>
                        </div>

                        {/* Text & Button Area */}
                        <div>
                            <div style={{ marginBottom: '2rem' }}>
                                <h2 style={{
                                    fontSize: '2.25rem',
                                    fontWeight: 900,
                                    letterSpacing: '-0.04em',
                                    color: textColor,
                                    marginBottom: '0.75rem',
                                    lineHeight: 1
                                }}>
                                    Neural Plane
                                </h2>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: subTextColor,
                                    lineHeight: 1.6,
                                    maxWidth: '90%'
                                }}>
                                    A mathematically precise Three.js particle wave oscillating in a neural-network formation. Synthetic fluidity.
                                </p>
                            </div>

                            <button style={{
                                width: '100%',
                                padding: '1.2rem',
                                borderRadius: '1rem',
                                border: 'none',
                                background: accentColor,
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                pointerEvents: 'auto',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                                boxShadow: isHovered
                                    ? `0 15px 30px -5px ${isDark ? 'rgba(99, 102, 241, 0.5)' : 'rgba(37, 99, 235, 0.4)'}`
                                    : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem'
                            }}>
                                Optimize Path
                                <svg
                                    width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2.5"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    style={{
                                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NetworkIcon({ size = 24 }: { size?: number }) {
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
        >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6" y2="6" />
            <line x1="6" y1="18" x2="6" y2="18" />
        </svg>
    )
}
