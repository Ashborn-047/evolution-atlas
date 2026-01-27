'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * ------------------------------------------------------------------
 * COMPONENT: DottedSurface
 * A responsive Three.js particle wave effect.
 * ------------------------------------------------------------------
 */

interface DottedSurfaceProps {
    className?: string
    isDark?: boolean
    style?: React.CSSProperties
}

export function DottedSurface({ className, isDark = true, style }: DottedSurfaceProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<{
        scene: THREE.Scene
        camera: THREE.PerspectiveCamera
        renderer: THREE.WebGLRenderer
        geometry: THREE.BufferGeometry
        animationId: number
        count: number
    } | null>(null)

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    // Handle Resize via ResizeObserver for container-relative bounds
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

    useEffect(() => {
        if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0) return

        const SEPARATION = 150
        const AMOUNTX = 40
        const AMOUNTY = 60

        // Scene setup
        const scene = new THREE.Scene()
        // Fog color matches the intended particle color for better blending
        const fogColor = isDark ? 0x000000 : 0xffffff
        scene.fog = new THREE.Fog(fogColor, 2000, 10000)

        const camera = new THREE.PerspectiveCamera(
            60,
            dimensions.width / dimensions.height,
            1,
            10000
        )
        camera.position.set(0, 355, 1220)

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(dimensions.width, dimensions.height)
        renderer.setClearColor(0x000000, 0) // Fully transparent clear color

        containerRef.current.appendChild(renderer.domElement)

        // Create particles
        const positions: number[] = []
        const colors: number[] = []

        const geometry = new THREE.BufferGeometry()

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
                const y = 0
                const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2

                positions.push(x, y, z)

                // Theme-based color logic
                if (isDark) {
                    colors.push(0.8, 0.8, 0.8) // Light grey
                } else {
                    colors.push(0.1, 0.1, 0.1) // Dark grey
                }
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

        const material = new THREE.PointsMaterial({
            size: 8,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        })

        const points = new THREE.Points(geometry, material)
        scene.add(points)

        let count = 0
        let animationId: number = 0

        const animate = () => {
            animationId = requestAnimationFrame(animate)

            const positionAttribute = geometry.attributes.position
            const positionsArr = positionAttribute.array as Float32Array

            let i = 0
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    const index = i * 3

                    // Sine wave motion
                    positionsArr[index + 1] =
                        Math.sin((ix + count) * 0.3) * 50 +
                        Math.sin((iy + count) * 0.5) * 50
                    i++
                }
            }

            positionAttribute.needsUpdate = true
            renderer.render(scene, camera)
            count += 0.1
        }

        animate()

        sceneRef.current = {
            scene,
            camera,
            renderer,
            geometry,
            animationId,
            count,
        }

        return () => {
            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId)
                sceneRef.current.geometry.dispose()
                material.dispose()
                sceneRef.current.renderer.dispose()

                if (containerRef.current && sceneRef.current.renderer.domElement) {
                    containerRef.current.removeChild(sceneRef.current.renderer.domElement)
                }
            }
        }
    }, [dimensions, isDark])

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: -1,
                overflow: 'hidden',
                ...style
            }}
        />
    )
}

/**
 * ------------------------------------------------------------------
 * DEMO: Standalone Fullscreen Usage
 * ------------------------------------------------------------------
 */
export default function DottedSurfaceDemo() {
    const [isDark, setIsDark] = useState(true)

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            background: isDark ? '#000' : '#fff',
            color: isDark ? '#fff' : '#000',
            transition: 'background 0.5s ease',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <DottedSurface isDark={isDark} />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                pointerEvents: 'none'
            }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.05em', margin: 0 }}>Dotted Surface</h1>
                <p style={{ opacity: 0.6, fontSize: '1.2rem', marginTop: '1rem' }}>Three.js Particle Wave Formation</p>

                <button
                    onClick={() => setIsDark(!isDark)}
                    style={{
                        pointerEvents: 'auto',
                        marginTop: '3rem',
                        padding: '1rem 2rem',
                        borderRadius: '9999px',
                        border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: 'inherit',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Switch to {isDark ? 'Light' : 'Dark'} Mode
                </button>
            </div>
        </div>
    )
}
