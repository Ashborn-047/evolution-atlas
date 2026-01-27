import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

// ============================================
// FLICKERING GRID SHADER - Canvas 2D based
// ============================================

interface FlickeringGridProps {
    squareSize?: number
    gridGap?: number
    flickerChance?: number
    color?: string
    width?: number
    height?: number
    maxOpacity?: number
    style?: React.CSSProperties
}

export function FlickeringGrid({
    squareSize = 4,
    gridGap = 6,
    flickerChance = 0.3,
    color = 'rgb(0, 0, 0)',
    width,
    height,
    maxOpacity = 0.3,
    style,
}: FlickeringGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isInView, setIsInView] = useState(false)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

    const memoizedColor = useMemo(() => {
        const toRGBA = (color: string) => {
            if (typeof window === 'undefined') {
                return `rgba(0, 0, 0,`
            }
            const canvas = document.createElement('canvas')
            canvas.width = canvas.height = 1
            const ctx = canvas.getContext('2d')
            if (!ctx) return 'rgba(255, 0, 0,'
            ctx.fillStyle = color
            ctx.fillRect(0, 0, 1, 1)
            const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
            return `rgba(${r}, ${g}, ${b},`
        }
        return toRGBA(color)
    }, [color])

    const setupCanvas = useCallback(
        (canvas: HTMLCanvasElement, width: number, height: number) => {
            const dpr = window.devicePixelRatio || 1
            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            // Use ceil + 1 to ensure grid fills entire container with no gaps
            const cols = Math.ceil(width / (squareSize + gridGap)) + 1
            const rows = Math.ceil(height / (squareSize + gridGap)) + 1

            const squares = new Float32Array(cols * rows)
            for (let i = 0; i < squares.length; i++) {
                squares[i] = Math.random() * maxOpacity
            }

            return { cols, rows, squares, dpr }
        },
        [squareSize, gridGap, maxOpacity]
    )

    const updateSquares = useCallback(
        (squares: Float32Array, deltaTime: number) => {
            for (let i = 0; i < squares.length; i++) {
                if (Math.random() < flickerChance * deltaTime) {
                    squares[i] = Math.random() * maxOpacity
                }
            }
        },
        [flickerChance, maxOpacity]
    )

    const drawGrid = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            width: number,
            height: number,
            cols: number,
            rows: number,
            squares: Float32Array,
            dpr: number
        ) => {
            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = 'transparent'
            ctx.fillRect(0, 0, width, height)

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const opacity = squares[i * rows + j]
                    ctx.fillStyle = `${memoizedColor}${opacity})`
                    ctx.fillRect(
                        i * (squareSize + gridGap) * dpr,
                        j * (squareSize + gridGap) * dpr,
                        squareSize * dpr,
                        squareSize * dpr
                    )
                }
            }
        },
        [memoizedColor, squareSize, gridGap]
    )

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let gridParams: ReturnType<typeof setupCanvas>

        const updateCanvasSize = () => {
            const newWidth = width || container.clientWidth
            const newHeight = height || container.clientHeight
            setCanvasSize({ width: newWidth, height: newHeight })
            gridParams = setupCanvas(canvas, newWidth, newHeight)
        }

        updateCanvasSize()

        let lastTime = 0
        const animate = (time: number) => {
            if (!isInView) return

            const deltaTime = (time - lastTime) / 1000
            lastTime = time

            updateSquares(gridParams.squares, deltaTime)
            drawGrid(
                ctx,
                canvas.width,
                canvas.height,
                gridParams.cols,
                gridParams.rows,
                gridParams.squares,
                gridParams.dpr
            )
            animationFrameId = requestAnimationFrame(animate)
        }

        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize()
        })

        resizeObserver.observe(container)

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting)
            },
            { threshold: 0 }
        )

        intersectionObserver.observe(canvas)

        if (isInView) {
            animationFrameId = requestAnimationFrame(animate)
        }

        return () => {
            cancelAnimationFrame(animationFrameId)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
        }
    }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                ...style
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: canvasSize.width,
                    height: canvasSize.height,
                    pointerEvents: 'none'
                }}
            />
        </div>
    )
}

// Full-screen standalone demo
export default function FlickeringGridDemo() {
    const [isDark, setIsDark] = useState(true)

    return (
        <div style={{
            minHeight: '100vh',
            background: isDark ? '#0a0a0a' : '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            transition: 'background 0.3s ease',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Theme Toggle */}
            <button
                onClick={() => setIsDark(!isDark)}
                style={{
                    marginBottom: '2rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    border: `1px solid ${isDark ? '#404040' : '#e5e7eb'}`,
                    background: isDark ? '#171717' : 'white',
                    color: isDark ? '#f3f4f6' : '#111827',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
            >
                {isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
            </button>

            {/* Grid Container */}
            <div style={{
                position: 'relative',
                height: '350px',
                width: '100%',
                maxWidth: '56rem',
                borderRadius: '0.75rem',
                background: isDark ? '#171717' : 'white',
                overflow: 'hidden',
                border: `1px solid ${isDark ? '#262626' : '#e5e7eb'}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
            }}>
                {/* Flickering Grid */}
                <FlickeringGrid
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0
                    }}
                    squareSize={4}
                    gridGap={6}
                    color={isDark ? 'rgb(255, 255, 255)' : '#6B7280'}
                    maxOpacity={0.5}
                    flickerChance={0.1}
                />
            </div>

            {/* Text Content - Outside the grid */}
            <div style={{
                marginTop: '1.5rem',
                textAlign: 'center',
                maxWidth: '32rem'
            }}>
                <h2 style={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: isDark ? 'white' : '#111827',
                    transition: 'color 0.3s ease'
                }}>
                    Flickering Grid
                </h2>
                <p style={{
                    color: isDark ? '#a3a3a3' : '#6b7280',
                    marginTop: '0.5rem',
                    transition: 'color 0.3s ease',
                    lineHeight: 1.6
                }}>
                    A randomized grid pattern that flickers with varied opacity,
                    perfect for adding subtle texture to backgrounds.
                </p>
            </div>
        </div>
    )
}

export { FlickeringGrid as FlickeringGridEffect }
