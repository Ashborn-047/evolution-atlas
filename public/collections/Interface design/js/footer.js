/**
 * ============================================
 * FOOTER - Interactive Ignite Effect
 * ============================================
 * 
 * Features:
 * - "Ignite" button reveals hidden content
 * - Animated blob backgrounds that follow cursor
 * - Staggered content reveal animation
 * 
 * GSAP Methods Used:
 * - gsap.to() for all animations
 * - gsap.fromTo() for blob entrance
 * - Stagger for sequenced reveals
 */


// Cache DOM elements
const igniteBtn = document.getElementById('igniteBtn');
const footer = document.getElementById('footer');


/**
 * Initialize Ignite button interaction
 * 
 * On Click:
 * 1. Button shrinks and fades out
 * 2. Footer enters "alive" state
 * 3. Blobs animate in with elastic bounce
 * 4. Content fades in with stagger
 */
function initIgniteButton() {
    if (!igniteBtn || !footer) return;

    const footerBlobs = document.querySelectorAll('.footer-blob');
    const footerTrigger = document.getElementById('footerTrigger');

    igniteBtn.addEventListener('click', () => {
        // 1. Hide the trigger button container
        gsap.to(footerTrigger, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            onComplete: () => {
                footerTrigger.classList.add('hidden');
            }
        });

        // 2. Activate footer state (CSS handles reveal)
        footer.classList.add('alive');

        // 3. Animate blobs in
        gsap.fromTo(footerBlobs,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 0.6,
                duration: 1,
                stagger: 0.2,
                delay: 0.3,
                ease: "elastic.out(1, 0.7)"
            }
        );

        // 4. Reveal content with stagger
        gsap.to(".footer-logo, .footer-message, .footer-links", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.5,
            ease: "power2.out"
        });
    });
}


/**
 * Initialize footer blob mouse tracking
 * 
 * Blobs follow cursor with different parallax multipliers
 * creating a layered depth effect
 */
function initFooterBlobTracking() {
    if (!footer) return;

    const footerBlobs = document.querySelectorAll('.footer-blob');

    footer.addEventListener('mousemove', (e) => {
        // Only track when footer is "alive"
        if (!footer.classList.contains('alive')) return;

        const rect = footer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // First blob - fast follow
        if (footerBlobs[0]) {
            gsap.to(footerBlobs[0], {
                x: (x - rect.width / 2) * 0.8,
                y: (y - rect.height / 2) * 0.8,
                duration: 2,
                ease: "power2.out"
            });
        }

        // Second blob - slow inverse follow
        if (footerBlobs[1]) {
            gsap.to(footerBlobs[1], {
                x: (x - rect.width / 2) * -0.5,
                y: (y - rect.height / 2) * -0.5,
                duration: 3,
                ease: "power2.out"
            });
        }
    });
}


// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initIgniteButton();
    initFooterBlobTracking();
});
