import { useRef, useEffect } from "react";

/**
 * 2D RAIN OVERLAY COMPONENT
 * Handles visual droplets (streaks and beads) for the "Rain" effect.
 */
export function RainOverlay({ density = 1, className = "" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId;
        let drops = [];
        let staticDrops = [];

        const resize = () => {
            if (!canvas || !canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            init();
        };

        const init = () => {
            drops = [];
            staticDrops = [];
            const count = Math.floor((canvas.width / 4) * density);
            for (let i = 0; i < count; i++) {
                drops.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 20 + 10,
                    len: Math.random() * 30 + 15,
                    opacity: Math.random() * 0.2 + 0.05
                });
            }
            const staticCount = Math.floor(canvas.width / 15);
            for (let i = 0; i < staticCount; i++) {
                staticDrops.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.15 + 0.05
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            staticDrops.forEach(d => {
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${d.opacity})`;
                ctx.fill();
            });
            ctx.lineCap = "round";
            drops.forEach(d => {
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x, d.y + d.len);
                ctx.strokeStyle = `rgba(200, 230, 255, ${d.opacity})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
                d.y += d.speed;
                if (d.y > canvas.height) {
                    d.y = -50;
                    d.x = Math.random() * canvas.width;
                }
            });
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [density]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-10 pointer-events-none ${className}`}
        />
    );
}

export default RainOverlay;
