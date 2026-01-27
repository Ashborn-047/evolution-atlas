'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * ------------------------------------------------------------------
 * UTILITY CLASSES
 * ------------------------------------------------------------------
 */

class Vector2D {
    constructor(public x: number, public y: number) { }

    static random(min: number, max: number): number {
        return min + Math.random() * (max - min)
    }
}

class Vector3D {
    constructor(public x: number, public y: number, public z: number) { }
}

// Star Class for individual particle management
class Star {
    private dx: number
    private dy: number
    private spiralLocation: number
    private strokeWeightFactor: number
    private z: number
    private angle: number
    private distance: number
    private rotationDirection: number
    private expansionRate: number
    private finalScale: number

    constructor(cameraZ: number, cameraTravelDistance: number) {
        this.angle = Math.random() * Math.PI * 2
        this.distance = 30 * Math.random() + 15
        this.rotationDirection = Math.random() > 0.5 ? 1 : -1
        this.expansionRate = 1.2 + Math.random() * 0.8
        this.finalScale = 0.7 + Math.random() * 0.6

        this.dx = this.distance * Math.cos(this.angle)
        this.dy = this.distance * Math.sin(this.angle)

        this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3
        this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ)

        const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t
        this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation)
        this.strokeWeightFactor = Math.pow(Math.random(), 2.0)
    }

    render(p: number, controller: AnimationController) {
        const spiralPos = controller.spiralPath(this.spiralLocation)
        const q = p - this.spiralLocation

        if (q > 0) {
            const displacementProgress = controller.constrain(4 * q, 0, 1)

            const linearEasing = displacementProgress
            const elasticEasing = controller.easeOutElastic(displacementProgress)
            const powerEasing = Math.pow(displacementProgress, 2)

            let easing
            if (displacementProgress < 0.3) {
                easing = controller.lerp(linearEasing, powerEasing, displacementProgress / 0.3)
            } else if (displacementProgress < 0.7) {
                const t = (displacementProgress - 0.3) / 0.4
                easing = controller.lerp(powerEasing, elasticEasing, t)
            } else {
                easing = elasticEasing
            }

            let screenX, screenY

            if (displacementProgress < 0.3) {
                screenX = controller.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3)
                screenY = controller.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3)
            } else if (displacementProgress < 0.7) {
                const midProgress = (displacementProgress - 0.3) / 0.4
                const curveStrength = Math.sin(midProgress * Math.PI) * this.rotationDirection * 1.5

                const baseX = spiralPos.x + this.dx * 0.3
                const baseY = spiralPos.y + this.dy * 0.3

                const targetX = spiralPos.x + this.dx * 0.7
                const targetY = spiralPos.y + this.dy * 0.7

                const perpX = -this.dy * 0.4 * curveStrength
                const perpY = this.dx * 0.4 * curveStrength

                screenX = controller.lerp(baseX, targetX, midProgress) + perpX * midProgress
                screenY = controller.lerp(baseY, targetY, midProgress) + perpY * midProgress
            } else {
                const finalProgress = (displacementProgress - 0.7) / 0.3

                const baseX = spiralPos.x + this.dx * 0.7
                const baseY = spiralPos.y + this.dy * 0.7

                const targetDistance = this.distance * this.expansionRate * 1.5
                const spiralTurns = 1.2 * this.rotationDirection
                const spiralAngle = this.angle + spiralTurns * finalProgress * Math.PI

                const targetX = spiralPos.x + targetDistance * Math.cos(spiralAngle)
                const targetY = spiralPos.y + targetDistance * Math.sin(spiralAngle)

                screenX = controller.lerp(baseX, targetX, finalProgress)
                screenY = controller.lerp(baseY, targetY, finalProgress)
            }

            const vx = (this.z - controller.cameraZ) * screenX / controller.viewZoom
            const vy = (this.z - controller.cameraZ) * screenY / controller.viewZoom

            const position = new Vector3D(vx, vy, this.z)

            let sizeMultiplier = 1.0
            if (displacementProgress < 0.6) {
                sizeMultiplier = 1.0 + displacementProgress * 0.2
            } else {
                const t = (displacementProgress - 0.6) / 0.4
                sizeMultiplier = 1.2 * (1.0 - t) + this.finalScale * t
            }

            const dotSize = 8.5 * this.strokeWeightFactor * sizeMultiplier

            controller.showProjectedDot(position, dotSize)
        }
    }
}

// Animation Controller
class AnimationController {
    public timeline: gsap.core.Timeline
    public time = 0
    private ctx: CanvasRenderingContext2D
    private width: number
    private height: number
    private stars: Star[] = []

    // Constants
    public readonly changeEventTime = 0.32
    public readonly cameraZ = -400
    public readonly cameraTravelDistance = 3400
    public readonly viewZoom = 100
    private readonly numberOfStars = 5000
    private readonly trailLength = 80

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx
        this.width = width
        this.height = height

        this.timeline = gsap.timeline({ repeat: -1 })

        this.setupRandomGenerator()
        this.setupTimeline()
    }

    private setupRandomGenerator() {
        const originalRandom = Math.random
        const customRandom = () => {
            let seed = 1234
            return () => {
                seed = (seed * 9301 + 49297) % 233280
                return seed / 233280
            }
        }

        Math.random = customRandom()
        this.createStars()
        Math.random = originalRandom
    }

    private createStars() {
        this.stars = []
        for (let i = 0; i < this.numberOfStars; i++) {
            this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance))
        }
    }

    private setupTimeline() {
        this.timeline
            .to(this, {
                time: 1,
                duration: 10, // Faster than original 15 for better preview
                repeat: -1,
                ease: "none",
                onUpdate: () => this.render()
            })
    }

    public ease(p: number, g: number): number {
        if (p < 0.5)
            return 0.5 * Math.pow(2 * p, g)
        else
            return 1 - 0.5 * Math.pow(2 * (1 - p), g)
    }

    public easeOutElastic(x: number): number {
        const c4 = (2 * Math.PI) / 4.5
        if (x <= 0) return 0
        if (x >= 1) return 1
        return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1
    }

    public map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
    }

    public constrain(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max)
    }

    public lerp(start: number, end: number, t: number): number {
        return start * (1 - t) + end * t
    }

    public spiralPath(p: number): Vector2D {
        p = this.constrain(1.2 * p, 0, 1)
        p = this.ease(p, 1.8)
        const numberOfSpiralTurns = 6
        const theta = 2 * Math.PI * numberOfSpiralTurns * Math.sqrt(p)
        const r = 170 * Math.sqrt(p)

        return new Vector2D(
            r * Math.cos(theta),
            r * Math.sin(theta)
        )
    }

    public rotate(v1: Vector2D, v2: Vector2D, p: number, orientation: boolean): Vector2D {
        const middle = new Vector2D(
            (v1.x + v2.x) / 2,
            (v1.y + v2.y) / 2
        )

        const dx = v1.x - middle.x
        const dy = v1.y - middle.y
        const angle = Math.atan2(dy, dx)
        const o = orientation ? -1 : 1
        const r = Math.sqrt(dx * dx + dy * dy)

        const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p)

        return new Vector2D(
            middle.x + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
            middle.y + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p))
        )
    }

    public showProjectedDot(position: Vector3D, sizeFactor: number) {
        const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
        const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance

        if (position.z > newCameraZ) {
            const dotDepthFromCamera = position.z - newCameraZ

            const x = this.viewZoom * position.x / dotDepthFromCamera
            const y = this.viewZoom * position.y / dotDepthFromCamera

            // FIX: Use calculated sw/2 as radius for arc
            const sw = Math.max(800 * sizeFactor / dotDepthFromCamera, 0.8)

            this.ctx.beginPath()
            this.ctx.arc(x, y, sw / 2, 0, Math.PI * 2)
            this.ctx.fill()
        }
    }

    public render() {
        const ctx = this.ctx
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1

        // Transparent black for trailing or Solid black? Original used fillRect black.
        // To fix compounding transforms and clear the whole canvas:
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.translate(this.width / 2, this.height / 2)

        const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1)
        const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)

        ctx.rotate(-Math.PI * this.ease(t2, 2.7))

        this.drawTrail(t1)

        ctx.fillStyle = 'white'
        for (const star of this.stars) {
            star.render(t1, this)
        }

        if (this.time > this.changeEventTime) {
            const position = new Vector3D(0, 0, this.cameraTravelDistance)
            this.showProjectedDot(position, 4.0)
        }

        ctx.restore()
    }

    private drawTrail(t1: number) {
        for (let i = 0; i < this.trailLength; i++) {
            const f = this.map(i, 0, this.trailLength, 1.1, 0.1)
            const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f

            this.ctx.fillStyle = 'white'

            const pathTime = t1 - 0.00015 * i
            const position = this.spiralPath(pathTime)

            const basePos = position
            const offset = new Vector2D(position.x + 5, position.y + 5)
            const rotated = this.rotate(
                basePos,
                offset,
                Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5,
                i % 2 === 0
            )

            this.ctx.beginPath()
            this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2)
            this.ctx.fill()
        }
    }

    public destroy() {
        this.timeline.kill()
    }
}

/**
 * ------------------------------------------------------------------
 * MAIN COMPONENT: SpiralAnimation
 * ------------------------------------------------------------------
 */
export function SpiralAnimation({ style }: { style?: React.CSSProperties }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<AnimationController | null>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    // Handle Resize via ResizeObserver for card compatibility
    useEffect(() => {
        if (!containerRef.current) return
        const observer = new ResizeObserver(() => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                })
            }
        })
        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    // Animation Loop
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || dimensions.width === 0 || dimensions.height === 0) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const size = Math.max(dimensions.width, dimensions.height)

        canvas.width = dimensions.width * dpr
        canvas.height = dimensions.height * dpr

        canvas.style.width = `${dimensions.width}px`
        canvas.style.height = `${dimensions.height}px`

        if (animationRef.current) {
            animationRef.current.destroy()
        }

        animationRef.current = new AnimationController(ctx, dimensions.width, dimensions.height)

        return () => {
            if (animationRef.current) {
                animationRef.current.destroy()
                animationRef.current = null
            }
        }
    }, [dimensions])

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', background: '#000', ...style }}>
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', inset: 0, display: 'block' }}
            />
        </div>
    )
}

/**
 * ------------------------------------------------------------------
 * DEMO COMPONENT
 * ------------------------------------------------------------------
 */
export default function App() {
    const [startVisible, setStartVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartVisible(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', overflow: 'hidden', background: '#000' }}>
            <div style={{ position: 'absolute', inset: 0 }}>
                <SpiralAnimation />
            </div>

            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    transition: 'all 1.5s ease-out',
                    opacity: startVisible ? 1 : 0,
                    marginTop: startVisible ? '0' : '1rem'
                }}
            >
                <button
                    style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: 200,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '1rem 2rem',
                        transition: 'all 0.7s ease',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    Enter
                </button>
            </div>
        </div>
    )
}
