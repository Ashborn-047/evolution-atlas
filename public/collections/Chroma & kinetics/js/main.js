/**
 * CHROMA & KINETICS - Main Application Entry
 * Application initialization and bootstrapping
 */

/**
 * Initialize the application
 */
function initApp() {
    console.log('[Chroma & Kinetics] Initializing application...');

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, Draggable);

    // Cache DOM elements
    cacheElements();

    // Initialize landing page animations
    initLanding();

    // Set up lab control listeners
    setupLabListeners();

    // Set initial active state for mix buttons
    const firstMixBtn = document.querySelectorAll('.mix-btn')[0];
    if (firstMixBtn) {
        firstMixBtn.classList.add('bg-emerald-500', 'text-black');
    }

    console.log('[Chroma & Kinetics] Application initialized successfully!');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
