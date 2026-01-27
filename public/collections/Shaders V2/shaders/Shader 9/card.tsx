'use client'

import { useEffect, useRef, useState } from 'react'

// --- SILK BACKGROUND COMPONENT ---
function SilkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number>(0)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let time = 0
        const speed = 0.03
        const scale = 3
        const noiseIntensity = 0.6

        const resizeCanvas = () => {
            canvas.width = container.clientWidth
            canvas.height = container.clientHeight
        }

        resizeCanvas()

        const resizeObserver = new ResizeObserver(resizeCanvas)
        resizeObserver.observe(container)

        const noise = (x: number, y: number) => {
            const G = 2.71828
            const rx = G * Math.sin(G * x)
            const ry = G * Math.sin(G * y)
            return (rx * ry * (1 + x)) % 1
        }

        const animate = () => {
            const { width, height } = canvas

            ctx.clearRect(0, 0, width, height)

            const gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, '#0f172a')
            gradient.addColorStop(0.5, '#1e1b4b')
            gradient.addColorStop(1, '#0f172a')

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            const imageData = ctx.createImageData(width, height)
            const data = imageData.data
            const step = 2

            for (let x = 0; x < width; x += step) {
                for (let y = 0; y < height; y += step) {
                    const u = (x / width) * scale
                    const v = (y / height) * scale

                    const tOffset = speed * time
                    const tex_x = u
                    const tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset)

                    const pattern = 0.6 + 0.4 * Math.sin(
                        5.0 * (tex_x + tex_y +
                            Math.cos(3.0 * tex_x + 5.0 * tex_y) +
                            0.02 * tOffset) +
                        Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
                    )

                    const rnd = noise(x, y)
                    const intensity = Math.max(0, pattern - rnd / 15.0 * noiseIntensity)

                    const r = Math.floor(130 * intensity)
                    const g = Math.floor(120 * intensity)
                    const b = Math.floor(220 * intensity)
                    const a = 255

                    for (let dx = 0; dx < step; dx++) {
                        for (let dy = 0; dy < step; dy++) {
                            if (x + dx < width && y + dy < height) {
                                const index = ((y + dy) * width + (x + dx)) * 4
                                data[index] = r
                                data[index + 1] = g
                                data[index + 2] = b
                                data[index + 3] = a
                            }
                        }
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0)

            const overlayGradient = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, Math.max(width, height) * 0.8
            )
            overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
            overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)')

            ctx.fillStyle = overlayGradient
            ctx.fillRect(0, 0, width, height)

            time += 1
            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            resizeObserver.disconnect()
            cancelAnimationFrame(animationRef.current)
        }
    }, [])

    return (
        <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
    )
}

// --- PROFILE CARD COMPONENT ---
interface ProfileCardProps {
    name: string
    role: string
    location: string
    avatarUrl?: string
}

function ProfileCard({ name, role, location, avatarUrl }: ProfileCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                width: '20rem',
                height: '450px',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: isHovered
                    ? '0 25px 50px -12px rgba(99, 102, 241, 0.2)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
            }}
        >
            {/* Background Layer */}
            <SilkBackground />

            {/* Overlay Gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4) 50%, transparent)',
                opacity: 0.9
            }} />

            {/* Content Container */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem'
            }}>
                {/* Top Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(-1rem)',
                    transition: 'all 0.5s ease-out'
                }}>
                    <span style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        color: '#c7d2fe',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '9999px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        AVAILABLE
                    </span>
                    <button style={{
                        padding: '0.5rem',
                        color: 'rgba(255,255,255,0.7)',
                        background: 'rgba(255,255,255,0.05)',
                        border: 'none',
                        borderRadius: '50%',
                        backdropFilter: 'blur(12px)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}>
                        <ExternalLinkIcon size={16} />
                    </button>
                </div>

                {/* Spacer */}
                <div style={{ flexGrow: 1 }} />

                {/* Bottom Section */}
                <div style={{
                    transform: isHovered ? 'translateY(0)' : 'translateY(0.5rem)',
                    transition: 'transform 0.5s ease'
                }}>
                    {/* Avatar */}
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <div style={{
                            width: '5rem',
                            height: '5rem',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            border: isHovered ? '2px solid rgba(129, 140, 248, 0.5)' : '2px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                            transition: 'border-color 0.5s ease'
                        }}>
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    color: 'white',
                                    fontWeight: 300
                                }}>
                                    {name.charAt(0)}
                                </div>
                            )}
                        </div>
                        {/* Glow */}
                        <div style={{
                            position: 'absolute',
                            inset: '-1rem',
                            background: 'rgba(99, 102, 241, 0.3)',
                            filter: 'blur(24px)',
                            borderRadius: '50%',
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.7s ease',
                            zIndex: -1
                        }} />
                    </div>

                    {/* Text */}
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem', letterSpacing: '-0.025em' }}>
                        {name}
                    </h2>
                    <p style={{ color: '#c7d2fe', fontWeight: 500, marginBottom: '1rem' }}>
                        {role}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
                        <MapPinIcon size={14} style={{ marginRight: '0.5rem', color: '#818cf8' }} />
                        {location}
                    </div>

                    {/* Actions */}
                    <div style={{
                        height: isHovered ? '3.5rem' : '0',
                        overflow: 'hidden',
                        opacity: isHovered ? 1 : 0,
                        transition: 'all 0.5s ease'
                    }}>
                        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                            <SocialButton icon={<GithubIcon size={18} />} />
                            <SocialButton icon={<TwitterIcon size={18} />} />
                            <button style={{
                                flex: 1,
                                background: 'white',
                                color: 'black',
                                fontWeight: 600,
                                borderRadius: '0.75rem',
                                border: 'none',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}>
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Border Effect */}
            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '1.5rem',
                border: isHovered ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                pointerEvents: 'none',
                transition: 'border-color 0.5s ease'
            }} />
        </div>
    )
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
    return (
        <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: '0.75rem',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }}>
            {icon}
        </button>
    )
}

// --- ICONS ---
function MapPinIcon({ size = 24, style }: { size?: number; style?: React.CSSProperties }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}

function GithubIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    )
}

function TwitterIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    )
}

function ExternalLinkIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    )
}

// --- DEMO ---
export default function SilkCardDemo() {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            gap: '3rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 300, color: 'white', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    Profile Card
                </h1>
                <p style={{ color: '#6b7280' }}>Generative silk canvas integration</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                <ProfileCard
                    name="Alex Morgan"
                    role="Digital Artist"
                    location="Tokyo, Japan"
                    avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                />
                <ProfileCard
                    name="Sarah Chen"
                    role="UX Engineer"
                    location="San Francisco, CA"
                    avatarUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
                />
            </div>
        </div>
    )
}
