import { useRef, useEffect, useCallback } from "react";

/**
 * CLICK RIPPLE EFFECT COMPONENT
 * Water ripple simulation that triggers on click
 * Uses Canvas 2D with wave propagation algorithm
 */
export function ClickRippleEffect({ className = "" }) {
    const canvasRef = useRef(null);
    const rippleData = useRef({
        current: null,
        previous: null,
        damping: 0.97
    });
    const animationRef = useRef(null);
    const isActiveRef = useRef(false);

    const initBuffers = useCallback((width, height) => {
        const size = width * height;
        rippleData.current.current = new Float32Array(size);
        rippleData.current.previous = new Float32Array(size);
    }, []);

    const triggerRipple = useCallback((x, y, radius = 3, strength = 512) => {
        const canvas = canvasRef.current;
        if (!canvas || !rippleData.current.current) return;

        const width = canvas.width;
        const height = canvas.height;
        const current = rippleData.current.current;

        // Create ripple at click point
        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                const px = Math.floor(x) + i;
                const py = Math.floor(y) + j;

                if (px > 0 && px < width - 1 && py > 0 && py < height - 1) {
                    const distance = Math.sqrt(i * i + j * j);
                    if (distance <= radius) {
                        const index = py * width + px;
                        current[index] = strength * (1 - distance / radius);
                    }
                }
            }
        }

        isActiveRef.current = true;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            // Use lower resolution for performance
            const scale = 0.25;
            canvas.width = Math.floor(parent.clientWidth * scale);
            canvas.height = Math.floor(parent.clientHeight * scale);
            canvas.style.width = `${parent.clientWidth}px`;
            canvas.style.height = `${parent.clientHeight}px`;

            initBuffers(canvas.width, canvas.height);
        };

        const processRipples = () => {
            const width = canvas.width;
            const height = canvas.height;
            const current = rippleData.current.current;
            const previous = rippleData.current.previous;
            const damping = rippleData.current.damping;

            if (!current || !previous) return;

            // Wave propagation algorithm
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const index = y * width + x;

                    previous[index] = (
                        (current[index - 1] +
                            current[index + 1] +
                            current[index - width] +
                            current[index + width]) / 2 - previous[index]
                    ) * damping;
                }
            }

            // Swap buffers
            const temp = rippleData.current.current;
            rippleData.current.current = rippleData.current.previous;
            rippleData.current.previous = temp;
        };

        const render = () => {
            const width = canvas.width;
            const height = canvas.height;
            const current = rippleData.current.current;

            if (!current) return;

            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            let hasActivity = false;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = y * width + x;
                    const pixelIndex = index * 4;

                    const value = current[index];

                    if (Math.abs(value) > 0.1) hasActivity = true;

                    // Create liquid blue color based on ripple height
                    const intensity = Math.min(255, Math.max(0, 128 + value * 0.5));
                    const highlight = Math.min(255, Math.max(0, value * 2));

                    data[pixelIndex] = Math.floor(30 + highlight * 0.3);     // R
                    data[pixelIndex + 1] = Math.floor(60 + highlight * 0.5); // G
                    data[pixelIndex + 2] = Math.floor(intensity);             // B
                    data[pixelIndex + 3] = Math.floor(Math.min(255, Math.abs(value) * 1.5)); // A
                }
            }

            ctx.putImageData(imageData, 0, 0);

            if (!hasActivity) {
                isActiveRef.current = false;
            }
        };

        const animate = () => {
            if (isActiveRef.current) {
                processRipples();
                render();
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            triggerRipple(x, y, 5, 1024);
        };

        window.addEventListener("resize", resize);
        canvas.addEventListener("click", handleClick);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("click", handleClick);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initBuffers, triggerRipple]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-10 cursor-pointer ${className}`}
        />
    );
}

export default ClickRippleEffect;
