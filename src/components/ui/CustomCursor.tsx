'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;
        if (!cursor || !cursorDot) return;

        // Mouse position
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Smooth cursor animation
        const animate = () => {
            // Lerp for smooth following
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
            cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

            requestAnimationFrame(animate);
        };

        // Detect hoverable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        // Hide default cursor
        document.body.style.cursor = 'none';

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        animate();

        return () => {
            document.body.style.cursor = 'auto';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    // Only show on desktop
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    width: '40px',
                    height: '40px',
                    border: `2px solid ${isHovering ? '#00F0FF' : '#ffffff'}`,
                    borderRadius: '50%',
                    transition: 'width 0.3s, height 0.3s, border-color 0.3s',
                    ...(isHovering && {
                        width: '60px',
                        height: '60px',
                        marginLeft: '-10px',
                        marginTop: '-10px',
                    }),
                    ...(isClicking && {
                        transform: 'scale(0.8)',
                    }),
                }}
            />
            {/* Center dot */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
                style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: isHovering ? '#00F0FF' : '#ffffff',
                    transition: 'background-color 0.3s, transform 0.1s',
                    ...(isClicking && {
                        transform: 'scale(1.5)',
                    }),
                }}
            />
        </>
    );
}
