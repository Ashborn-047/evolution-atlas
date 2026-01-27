import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

// ============================================
// FLICKERING GRID COMPONENT
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

function FlickeringGrid({
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
            if (typeof window === 'undefined') return `rgba(0, 0, 0,`
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
            const cols = Math.floor(width / (squareSize + gridGap))
            const rows = Math.floor(height / (squareSize + gridGap))
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
        (ctx: CanvasRenderingContext2D, width: number, height: number, cols: number, rows: number, squares: Float32Array, dpr: number) => {
            ctx.clearRect(0, 0, width, height)
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
            drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr)
            animationFrameId = requestAnimationFrame(animate)
        }

        const resizeObserver = new ResizeObserver(() => updateCanvasSize())
        resizeObserver.observe(container)

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0 }
        )
        intersectionObserver.observe(canvas)

        if (isInView) animationFrameId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrameId)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
        }
    }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', ...style }}>
            <canvas ref={canvasRef} style={{ width: canvasSize.width, height: canvasSize.height, pointerEvents: 'none' }} />
        </div>
    )
}

// ============================================
// ICONS
// ============================================

const GridIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
)

const ArrowRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

// ============================================
// FLICKERING GRID CARD
// ============================================

export function FlickeringGridCard() {
    const [isHovered, setIsHovered] = useState(false)
    const [isDark, setIsDark] = useState(true)

    return (
        <div style={{
            minHeight: '100vh',
            background: isDark ? '#000' : '#e8e0d5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
                    border: `1px solid ${isDark ? '#404040' : '#e5e7eb'}`,
                    background: isDark ? '#171717' : '#f5efe6',
                    color: isDark ? '#f3f4f6' : '#111827',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
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
                    background: isDark
                        ? 'linear-gradient(to right, #dc2626, #f97316, #eab308)'
                        : 'linear-gradient(to right, #3b82f6, #10b981, #8b5cf6)',
                    transform: 'scale(0.85)',
                    borderRadius: '9999px',
                    filter: 'blur(60px)',
                    opacity: isDark ? 0.35 : 0.65,
                    pointerEvents: 'none',
                    transition: 'all 0.3s ease'
                }} />

                {/* Card Container */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '1rem',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}`,
                        background: isDark ? '#0a0a0a' : '#f5efe6',
                        transition: 'all 0.3s ease',
                        boxShadow: isHovered
                            ? `0 25px 50px -12px ${isDark ? 'rgba(249, 115, 22, 0.3)' : 'rgba(249, 115, 22, 0.2)'}`
                            : '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Background Shader Layer */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        height: '400px',
                        background: isDark ? '#111' : '#ebe5db'
                    }}>
                        <FlickeringGrid
                            style={{ position: 'absolute', inset: 0 }}
                            squareSize={4}
                            gridGap={6}
                            color={isDark ? 'rgb(255, 255, 255)' : '#1f2937'}
                            maxOpacity={isDark ? 0.4 : 0.85}
                            flickerChance={0.15}
                        />
                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: isDark
                                ? 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(10,10,10,0.95) 100%)'
                                : 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(255,255,255,0.95) 100%)',
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
                                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                backdropFilter: 'blur(12px)',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                                transition: 'all 0.5s ease',
                                transform: isHovered ? 'scale(1.1) rotate(3deg)' : 'none',
                                color: '#fb923c'
                            }}>
                                <GridIcon />
                            </div>
                            <span style={{
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                color: 'rgba(251, 146, 60, 0.8)',
                                background: 'rgba(249, 115, 22, 0.2)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                border: '1px solid rgba(249, 115, 22, 0.3)'
                            }}>
                                SYS.05
                            </span>
                        </div>

                        {/* Body */}
                        <div>
                            <div style={{ marginBottom: '1rem' }}>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    letterSpacing: '-0.025em',
                                    color: isDark ? 'white' : '#111827',
                                    marginBottom: '0.5rem',
                                    textShadow: isDark ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
                                    transition: 'color 0.3s ease'
                                }}>
                                    Flickering Grid
                                </h2>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: isDark ? '#d1d5db' : '#6b7280',
                                    lineHeight: 1.6,
                                    fontWeight: 300,
                                    transition: 'color 0.3s ease'
                                }}>
                                    Randomized matrix of luminescent cells. Each pixel pulses
                                    independently. Digital noise rendered visible.
                                </p>
                            </div>

                            {/* Action Button */}
                            <div style={{ paddingTop: '1rem' }}>
                                <button style={{
                                    position: 'relative',
                                    width: '100%',
                                    overflow: 'hidden',
                                    borderRadius: '0.75rem',
                                    background: isHovered
                                        ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
                                        : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'),
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
                                        background: isDark ? 'rgba(10,10,10,0.5)' : 'rgba(255,255,255,0.8)',
                                        padding: '0.75rem 1rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: isDark ? 'white' : '#111827',
                                        backdropFilter: 'blur(4px)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <span>Enter the Matrix</span>
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
                        border: `2px solid ${isHovered ? 'rgba(251, 146, 60, 0.3)' : 'transparent'}`,
                        borderRadius: '1rem',
                        transition: 'all 0.5s ease'
                    }} />
                </div>
            </div>
        </div>
    )
}

export default FlickeringGridCard

