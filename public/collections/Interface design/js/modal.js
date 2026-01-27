/**
 * ============================================
 * MODAL - Era-specific Modal System
 * ============================================
 * 
 * Features:
 * - Dynamic content based on timeline data
 * - Era-specific styling (retro, glossy, flat, etc.)
 * - Component showcase demos
 * - Animated open/close with GSAP
 * 
 * GSAP Methods Used:
 * - gsap.to() for opacity and transform
 * - Coordinated timing with delays
 */


// Cache DOM elements
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalDesc = document.getElementById('modalDesc');

// Showcase slot elements
const demoNav = document.getElementById('demoNav');
const demoButton = document.getElementById('demoButton');
const demoBadge = document.getElementById('demoBadge');
const demoInput = document.getElementById('demoInput');
const demoCarousel = document.getElementById('demoCarousel');


/**
 * Open modal with content from timeline data
 * 
 * @param {number} index - Index in timelineData array
 * 
 * GSAP Animation:
 * - Overlay fades in (opacity)
 * - Content slides up and fades in
 * - Uses back.out for bouncy entrance
 */
function openModal(index) {
    // Get data from timeline module
    const data = window.timelineData[index];
    if (!data) return;

    // Populate content
    modalTitle.innerText = data.title;
    modalYear.innerText = data.year;
    modalDesc.innerText = data.desc;

    // Populate component demos
    if (data.components) {
        if (demoNav) demoNav.innerHTML = data.components.nav || '';
        if (demoButton) demoButton.innerHTML = data.components.button || '';
        if (demoBadge) demoBadge.innerHTML = data.components.badge || '';
        if (demoInput) demoInput.innerHTML = data.components.input || '';
        if (demoCarousel) demoCarousel.innerHTML = data.components.carousel || '';
    }

    // Apply era-specific styling
    modalContent.className = 'modal-content ' + data.styleClass;

    // Enable pointer events
    modalOverlay.style.pointerEvents = "all";

    // Animate open
    gsap.to(modalOverlay, {
        opacity: 1,
        duration: 0.3
    });

    gsap.to(modalContent, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "back.out(1.2)"
    });

    // Stagger animate showcase slots
    gsap.fromTo(".showcase-slot",
        { opacity: 0, y: 15 },
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.3,
            ease: "power2.out",
            onComplete: () => {
                // Initialize interactive demos after animation
                if (window.initModalDemos) {
                    window.initModalDemos(data.styleClass);
                }
            }
        }
    );
}


/**
 * Close modal with animation
 * 
 * GSAP Animation:
 * - Content slides down and fades
 * - Overlay fades out after content
 */
function closeModal() {
    modalOverlay.style.pointerEvents = "none";

    gsap.to(modalContent, {
        opacity: 0,
        y: 50,
        duration: 0.3
    });

    gsap.to(modalOverlay, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1
    });
}


/**
 * Initialize modal event listeners
 */
function initModal() {
    if (!modalClose || !modalOverlay) return;

    // Close button click
    modalClose.addEventListener('click', closeModal);

    // Click outside to close
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.pointerEvents === 'all') {
            closeModal();
        }
    });
}


// Export for global scope (used by timeline)
window.openModal = openModal;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initModal);
