/**
 * ============================================
 * MAIN - Entry Point & Global Animations
 * ============================================
 * 
 * This file:
 * 1. Registers GSAP plugins
 * 2. Initializes scroll-triggered reveal animations
 * 
 * All other modules are self-initializing via
 * DOMContentLoaded event listeners.
 * 
 * Load Order (in HTML):
 * 1. GSAP libraries (CDN)
 * 2. utils.js
 * 3. cursor.js
 * 4. solid.js
 * 5. glass.js
 * 6. fluid.js
 * 7. hybrid.js
 * 8. timeline.js
 * 9. modal.js
 * 10. footer.js
 * 11. main.js (this file - LAST)
 */


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable);


/**
 * Global scroll reveal animation
 * 
 * All showcase items fade in and slide up
 * as they enter the viewport.
 * 
 * GSAP Methods:
 * - gsap.utils.toArray() - Convert NodeList to array
 * - gsap.from() with ScrollTrigger
 */
function initScrollReveal() {
    gsap.utils.toArray(".showcase-item").forEach(item => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: "top 85%",  // Trigger when top hits 85% viewport
                // markers: true,  // Uncomment for debugging
            }
        });
    });
}


/**
 * Initialize all global animations
 */
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();

    console.log('🎨 UI Evolution loaded successfully');
    console.log('📚 Chapters: Solid | Glass | Fluid | Hybrid');
    console.log('🧩 Components: 36 interactive elements');
});
