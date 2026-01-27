'use client'

import { useEffect, useRef } from 'react'

// --- SILK ANIMATION COMPONENT ---
export function SilkAnimation() {
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
        const speed = 0.02
        const scale = 2
        const noiseIntensity = 0.8

        const resizeCanvas = () => {
            canvas.width = container.clientWidth
            canvas.height = container.clientHeight
        }

        resizeCanvas()

        const resizeObserver = new ResizeObserver(resizeCanvas)
        resizeObserver.observe(container)

        // Simple noise function
        const noise = (x: number, y: number) => {
            const G = 2.71828
            const rx = G * Math.sin(G * x)
            const ry = G * Math.sin(G * y)
            return (rx * ry * (1 + x)) % 1
        }

        const animate = () => {
            const { width, height } = canvas

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, '#1a1a1a')
            gradient.addColorStop(0.5, '#2a2a2a')
            gradient.addColorStop(1, '#1a1a1a')

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            // Create silk-like pattern
            const imageData = ctx.createImageData(width, height)
            const data = imageData.data

            for (let x = 0; x < width; x += 2) {
                for (let y = 0; y < height; y += 2) {
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

                    // Purple-gray silk color
                    const r = Math.floor(123 * intensity)
                    const g = Math.floor(116 * intensity)
                    const b = Math.floor(129 * intensity)
                    const a = 255

                    const index = (y * width + x) * 4
                    if (index < data.length) {
                        data[index] = r
                        data[index + 1] = g
                        data[index + 2] = b
                        data[index + 3] = a
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0)

            // Add subtle overlay for depth
            const overlayGradient = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, Math.max(width, height) / 2
            )
            overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)')
            overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)')

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
        <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    )
}

// --- FULLSCREEN DEMO (Dark Mode Only) ---
export default function SilkDemo() {
    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
            background: '#000',
            fontFamily: 'Georgia, "Times New Roman", serif'
        }}>
            {/* Animated Silk Background */}
            <SilkAnimation />

            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent, rgba(0,0,0,0.5))',
                pointerEvents: 'none'
            }} />

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 20,
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    {/* Main Title */}
                    <h1 style={{
                        fontSize: 'clamp(4rem, 15vw, 14rem)',
                        fontWeight: 300,
                        letterSpacing: '-0.05em',
                        lineHeight: 1,
                        color: 'white',
                        mixBlendMode: 'difference',
                        textShadow: '0 0 40px rgba(255, 255, 255, 0.1)',
                        margin: 0
                    }}>
                        silk
                    </h1>

                    {/* Subtitle */}
                    <div style={{
                        marginTop: '2rem',
                        fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                        fontWeight: 200,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(209, 213, 219, 0.8)',
                        mixBlendMode: 'overlay'
                    }}>
                        <span>flowing</span>
                        <span style={{ margin: '0 1rem', color: '#6b7280' }}>•</span>
                        <span>texture</span>
                        <span style={{ margin: '0 1rem', color: '#6b7280' }}>•</span>
                        <span>art</span>
                    </div>
                </div>
            </div>

            {/* Corner Accent */}
            <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                zIndex: 30,
                fontSize: '0.75rem',
                fontWeight: 300,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(107, 114, 128, 0.4)',
                mixBlendMode: 'overlay'
            }}>
                2025
            </div>
        </div>
    )
}
