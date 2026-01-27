'use client'

import { useEffect, useRef, useState } from 'react'

// --- Simplex Noise Implementation (Inline) ---
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
        const X0 = i - t
        const Y0 = j - t
        const Z0 = k - t
        const x0 = xin - X0
        const y0 = yin - Y0
        const z0 = zin - Z0
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
        const x1 = x0 - i1 + G3
        const y1 = y0 - j1 + G3
        const z1 = z0 - k1 + G3
        const x2 = x0 - i2 + 2.0 * G3
        const y2 = y0 - j2 + 2.0 * G3
        const z2 = z0 - k2 + 2.0 * G3
        const x3 = x0 - 1.0 + 3.0 * G3
        const y3 = y0 - 1.0 + 3.0 * G3
        const z3 = z0 - 1.0 + 3.0 * G3
        const ii = i & 255
        const jj = j & 255
        const kk = k & 255
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

export function Vortex({
    particleCount = 700,
    rangeY = 100,
    baseHue = 220,
    baseSpeed = 0.0,
    rangeSpeed = 1.5,
    baseRadius = 1,
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
        const baseTTL = 50
        const rangeTTL = 150
        const rangeHue = 100
        const noiseSteps = 3
        const xOff = 0.00125
        const yOff = 0.00125
        const zOff = 0.0005
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
            const x = rand(canvas.width)
            const y = center[1] + randRange(rangeY)
            const vx = 0
            const vy = 0
            const life = 0
            const ttl = baseTTL + rand(rangeTTL)
            const speed = baseSpeed + rand(rangeSpeed)
            const radius = baseRadius + rand(rangeRadius)
            const hue = baseHue + rand(rangeHue)
            particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i)
        }

        const initParticles = () => {
            tick = 0
            particleProps = new Float32Array(particlePropsLength)
            for (let i = 0; i < particlePropsLength; i += particlePropCount) {
                initParticle(i)
            }
        }

        const checkBounds = (x: number, y: number) => {
            return x > canvas.width || x < 0 || y > canvas.height || y < 0
        }

        const drawParticle = (x: number, y: number, x2: number, y2: number, life: number, ttl: number, radius: number, hue: number) => {
            ctx.save()
            ctx.lineCap = 'round'
            ctx.lineWidth = radius
            ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x2, y2)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
        }

        const updateParticle = (i: number) => {
            const i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i

            const x = particleProps[i]
            const y = particleProps[i2]
            const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU
            const vx = lerp(particleProps[i3], Math.cos(n), 0.5)
            const vy = lerp(particleProps[i4], Math.sin(n), 0.5)
            let life = particleProps[i5]
            const ttl = particleProps[i6]
            const speed = particleProps[i7]
            const x2 = x + vx * speed
            const y2 = y + vy * speed
            const radius = particleProps[i8]
            const hue = particleProps[i9]

            drawParticle(x, y, x2, y2, life, ttl, radius, hue)

            life++

            particleProps[i] = x2
            particleProps[i2] = y2
            particleProps[i3] = vx
            particleProps[i4] = vy
            particleProps[i5] = life

            if (checkBounds(x, y) || life > ttl) initParticle(i)
        }

        const drawParticles = () => {
            for (let i = 0; i < particlePropsLength; i += particlePropCount) {
                updateParticle(i)
            }
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

        const renderToScreen = () => {
            ctx.save()
            ctx.globalCompositeOperation = 'lighter'
            ctx.drawImage(canvas, 0, 0)
            ctx.restore()
        }

        const draw = () => {
            tick++
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = backgroundColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            drawParticles()
            renderGlow()
            renderToScreen()
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
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    )
}

// --- DEMO COMPONENT (Dark Mode Only) ---
export default function VortexDemo() {
    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Vortex
                    backgroundColor="#000000"
                    baseHue={220}
                    particleCount={600}
                    rangeY={400}
                />
            </div>

            <div style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                color: '#fff',
                padding: '2rem'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
                    Vortex Field
                </h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '500px', margin: '0 auto' }}>
                    Simplex noise-driven particle flow with Canvas 2D rendering.
                </p>
            </div>
        </div>
    )
}
