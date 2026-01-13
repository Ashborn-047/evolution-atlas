'use client';

import React, { useEffect, useRef } from 'react';

interface RainOverlayProps {
    density?: number;
    speed?: number;
    color?: string;
    opacity?: number;
    className?: string;
}

export const RainOverlay: React.FC<RainOverlayProps> = ({
    density = 40,
    speed = 1.0,
    color = 'rgba(255, 255, 255, 0.2)',
    opacity = 0.4,
    className
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let w: number;
        let h: number;

        const particles: any[] = [];

        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;

            particles.length = 0;
            for (let i = 0; i < density; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    l: Math.random() * 20 + 20,
                    v: Math.random() * 5 + 10 * speed,
                    o: Math.random() * 0.5 + 0.1
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x, p.y + p.l);
                ctx.stroke();

                p.y += p.v;
                if (p.y > h) {
                    p.y = -p.l;
                    p.x = Math.random() * w;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener('resize', handleResize);
        init();
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [density, speed, color]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity: opacity,
                zIndex: 1
            }}
        />
    );
};
