/**
 * ============================================
 * CUSTOM CURSOR - Fluid Cursor Effect
 * ============================================
 * 
 * Creates a custom animated cursor that follows
 * mouse movement with a trailing outline effect.
 * 
 * Active in: Chapter 3 (Fluid) & Chapter 4 (Hybrid)
 * 
 * GSAP Methods Used:
 * - gsap.to() - Smooth opacity transitions
 * - Web Animations API - Outline trailing effect
 */

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

/**
 * Initialize cursor visibility for specific sections
 */
function initCursor() {
    // Show custom cursor everywhere
    gsap.set([cursorDot, cursorOutline], { opacity: 1 });
}

/**
 * Track mouse movement and update cursor positions
 * The outline has a delayed follow for a trailing effect
 */
function trackCursor() {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${x}px`;
        cursorDot.style.top = `${y}px`;

        // Outline follows with delay (Web Animations API)
        cursorOutline.animate(
            { left: `${x}px`, top: `${y}px` },
            { duration: 500, fill: "forwards" }
        );
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    trackCursor();
});
