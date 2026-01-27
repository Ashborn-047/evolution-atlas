'use client'

import { useEffect, useRef, useState } from 'react'

// --- NOISE GENERATOR ---
const createNoise3D = () => {
    const grad3 = [
        [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
        [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
        [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ]
    const p = new Uint8Array(256)
    const perm = new Uint8Array(512)
    const permMod12 = new Uint8Array(512)
    for (let i = 0; i < 256; i++) p[i] = i
    for (let i = 0; i < 256; i++) {
        const r = Math.floor(Math.random() * (256 - i)) + i
        const t = p[i]; p[i] = p[r]; p[r] = t
    }
    for (let i = 0; i < 512; i++) {
        perm[i] = p[i & 255]
        permMod12[i] = perm[i] % 12
    }
    const F3 = 1.0 / 3.0
    const G3 = 1.0 / 6.0
    return (xin: number, yin: number, zin: number) => {
        let n0, n1, n2, n3
        const s = (xin + yin + zin) * F3
        const i = Math.floor(xin + s)
        const j = Math.floor(yin + s)
        const k = Math.floor(zin + s)
        const t = (i + j + k) * G3
        const X0 = i - t, Y0 = j - t, Z0 = k - t
        const x0 = xin - X0, y0 = yin - Y0, z0 = zin - Z0
        let i1, j1, k1, i2, j2, k2
        if (x0 >= y0) {
            if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
            else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1 }
            else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1 }
        } else {
            if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1 }
            else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1 }
            else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
        }
        const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3
        const x2 = x0 - i2 + 2.0 * G3, y2 = y0 - j2 + 2.0 * G3, z2 = z0 - k2 + 2.0 * G3
        const x3 = x0 - 1.0 + 3.0 * G3, y3 = y0 - 1.0 + 3.0 * G3, z3 = z0 - 1.0 + 3.0 * G3
        const ii = i & 255, jj = j & 255, kk = k & 255
        const gi0 = permMod12[ii + perm[jj + perm[kk]]]
        const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]]
        const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]]
        const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]]
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0
        if (t0 < 0) n0 = 0.0
        else { t0 *= t0; n0 = t0 * t0 * (grad3[gi0][0] * x0 + grad3[gi0][1] * y0 + grad3[gi0][2] * z0) }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
        if (t1 < 0) n1 = 0.0
        else { t1 *= t1; n1 = t1 * t1 * (grad3[gi1][0] * x1 + grad3[gi1][1] * y1 + grad3[gi1][2] * z1) }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
        if (t2 < 0) n2 = 0.0
        else { t2 *= t2; n2 = t2 * t2 * (grad3[gi2][0] * x2 + grad3[gi2][1] * y2 + grad3[gi2][2] * z2) }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
        if (t3 < 0) n3 = 0.0
        else { t3 *= t3; n3 = t3 * t3 * (grad3[gi3][0] * x3 + grad3[gi3][1] * y3 + grad3[gi3][2] * z3) }
        return 32.0 * (n0 + n1 + n2 + n3)
    }
}

// --- VORTEX COMPONENT ---
interface VortexProps {
    particleCount?: number
    rangeY?: number
    baseHue?: number
    baseSpeed?: number
    rangeSpeed?: number
    baseRadius?: number
    rangeRadius?: number
    backgroundColor?: string
}

function Vortex({
    particleCount = 200,
    rangeY = 600,
    baseHue = 260,
    baseSpeed = 0.5,
    rangeSpeed = 1,
    baseRadius = 1.5,
    rangeRadius = 2,
    backgroundColor = '#000000'
}: VortexProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number>(0)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const particlePropCount = 9
        const particlePropsLength = particleCount * particlePropCount
        const baseTTL = 50, rangeTTL = 150, rangeHue = 100
        const noiseSteps = 3, xOff = 0.00125, yOff = 0.00125, zOff = 0.0005
        const TAU = 2 * Math.PI

        let tick = 0
        const noise3D = createNoise3D()
        let particleProps = new Float32Array(particlePropsLength)
        let center: [number, number] = [0, 0]

        const rand = (n: number) => n * Math.random()
        const randRange = (n: number) => n - rand(2 * n)
        const fadeInOut = (t: number, m: number) => {
            const hm = 0.5 * m
            return Math.abs(((t + hm) % m) - hm) / hm
        }
        const lerp = (n1: number, n2: number, speed: number) => (1 - speed) * n1 + speed * n2

        const resize = () => {
            canvas.width = container.clientWidth
            canvas.height = container.clientHeight
            center[0] = 0.5 * canvas.width
            center[1] = 0.5 * canvas.height
        }

        const initParticle = (i: number) => {
            particleProps.set([
                rand(canvas.width),
                center[1] + randRange(rangeY),
                0, 0, 0,
                baseTTL + rand(rangeTTL),
                baseSpeed + rand(rangeSpeed),
                baseRadius + rand(rangeRadius),
                baseHue + rand(rangeHue)
            ], i)
        }

        const initParticles = () => {
            tick = 0
            particleProps = new Float32Array(particlePropsLength)
            for (let i = 0; i < particlePropsLength; i += particlePropCount) initParticle(i)
        }

        const checkBounds = (x: number, y: number) => x > canvas.width || x < 0 || y > canvas.height || y < 0

        const drawParticle = (x: number, y: number, x2: number, y2: number, life: number, ttl: number, radius: number, hue: number) => {
            ctx.save()
            ctx.lineCap = 'round'
            ctx.lineWidth = radius
            ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x2, y2)
            ctx.stroke()
            ctx.restore()
        }

        const updateParticle = (i: number) => {
            const i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i
            const x = particleProps[i], y = particleProps[i2]
            const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU
            const vx = lerp(particleProps[i3], Math.cos(n), 0.5)
            const vy = lerp(particleProps[i4], Math.sin(n), 0.5)
            let life = particleProps[i5]
            const ttl = particleProps[i6], speed = particleProps[i7]
            const x2 = x + vx * speed, y2 = y + vy * speed
            const radius = particleProps[i8], hue = particleProps[i9]
            drawParticle(x, y, x2, y2, life, ttl, radius, hue)
            life++
            particleProps[i] = x2; particleProps[i2] = y2; particleProps[i3] = vx; particleProps[i4] = vy; particleProps[i5] = life
            if (checkBounds(x, y) || life > ttl) initParticle(i)
        }

        const renderGlow = () => {
            ctx.save()
            ctx.filter = 'blur(8px) brightness(200%)'
            ctx.globalCompositeOperation = 'lighter'
            ctx.drawImage(canvas, 0, 0)
            ctx.restore()
            ctx.save()
            ctx.filter = 'blur(4px) brightness(200%)'
            ctx.globalCompositeOperation = 'lighter'
            ctx.drawImage(canvas, 0, 0)
            ctx.restore()
        }

        const draw = () => {
            tick++
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = backgroundColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < particlePropsLength; i += particlePropCount) updateParticle(i)
            renderGlow()
            ctx.save()
            ctx.globalCompositeOperation = 'lighter'
            ctx.drawImage(canvas, 0, 0)
            ctx.restore()
            animationRef.current = requestAnimationFrame(draw)
        }

        resize()
        initParticles()
        draw()

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(container)

        return () => {
            cancelAnimationFrame(animationRef.current)
            resizeObserver.disconnect()
        }
    }, [particleCount, rangeY, baseHue, baseSpeed, rangeSpeed, baseRadius, rangeRadius, backgroundColor])

    return (
        <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    )
}

// --- PROFILE CARD COMPONENT (User's Design - Inline Styles) ---
function ProfileCard() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                maxWidth: '24rem',
                width: '100%',
                height: '500px',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: '#000'
            }}
        >
            {/* Vortex Background */}
            <Vortex
                backgroundColor="#000000"
                rangeY={600}
                particleCount={200}
                baseHue={260}
                baseSpeed={0.5}
                rangeSpeed={1}
                baseRadius={1.5}
            />

            {/* Content Overlay */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                background: 'linear-gradient(to bottom, transparent, transparent 40%, rgba(0,0,0,0.9))'
            }}>
                {/* Top Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: 'white'
                    }}>
                        Open to work
                    </div>
                    <button style={{
                        padding: '0.5rem',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(12px)'
                    }}>
                        <LinkIcon size={16} />
                    </button>
                </div>

                {/* Profile Info */}
                <div style={{ textAlign: 'center' }}>
                    {/* Avatar with Glow */}
                    <div style={{
                        position: 'relative',
                        width: '6rem',
                        height: '6rem',
                        margin: '0 auto 1rem',
                        transition: 'transform 0.5s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: '#a855f7',
                            borderRadius: '50%',
                            filter: 'blur(20px)',
                            opacity: isHovered ? 0.75 : 0.5,
                            transition: 'opacity 0.3s ease'
                        }} />
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                            alt="Profile"
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '2px solid rgba(255,255,255,0.2)'
                            }}
                        />
                    </div>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', letterSpacing: '-0.025em', marginBottom: '0.25rem' }}>
                        Sarah Connor
                    </h2>
                    <p style={{ color: '#c4b5fd', fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        Creative Technologist
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', color: '#9ca3af', fontSize: '0.75rem' }}>
                        <MapPinIcon size={12} />
                        <span>San Francisco, CA</span>
                    </div>

                    <p style={{ color: '#d4d4d4', fontSize: '0.875rem', lineHeight: 1.6, marginTop: '1rem' }}>
                        Crafting immersive digital experiences at the intersection of design and code.
                    </p>

                    {/* Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1.5rem' }}>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'white',
                            color: 'black',
                            borderRadius: '0.75rem',
                            border: 'none',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'background 0.2s ease'
                        }}>
                            <TwitterIcon size={16} />
                            <span>Follow</span>
                        </button>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: '#171717',
                            color: 'white',
                            borderRadius: '0.75rem',
                            border: '1px solid #404040',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'background 0.2s ease'
                        }}>
                            <GithubIcon size={16} />
                            <span>GitHub</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- ICONS ---
function LinkIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    )
}

function MapPinIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
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

function GithubIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    )
}

// --- MAIN APP (Renamed for Landing Page) ---
export default function VortexProfileCard() {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <ProfileCard />
        </div>
    )
}
