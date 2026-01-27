/**
 * CHROMA & KINETICS - Animation Controller
 * GSAP animations based on motion state and pattern
 */

let gsapCtx = gsap.context(() => { });

/**
 * Update all animations based on current state
 * @param {Object} c - Color scheme object
 */
function updateAnimations(c) {
    const { hexToRgba } = window.ChromaUtils;

    gsapCtx.revert();
    gsapCtx = gsap.context(() => {
        if (state.isMotion) {
            animateMotionState(c);
        } else {
            resetAnimations(c, hexToRgba);
        }
    });
}

/**
 * Apply motion-based animations
 * @param {Object} c - Color scheme
 */
function animateMotionState(c) {
    // 1. CARDS (Interaction Logic)
    const cards = document.querySelectorAll('.card-solid, .card-glass, .card-outline');
    cards.forEach(card => {
        // Base State based on motion pattern
        if (state.motionPattern === 'fluid') {
            gsap.to(card, { y: "random(-5, 5)", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
        } else if (state.motionPattern === 'mechanical') {
            gsap.set(card, { y: 0 });
        } else {
            gsap.to(card, { scale: 1.01, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });
        }

        // Hover State
        card.onmouseenter = () => {
            if (state.motionPattern === 'elastic') {
                gsap.to(card, { scale: 1.05, duration: 0.8, ease: "elastic.out(1, 0.3)" });
            }
            if (state.motionPattern === 'fluid') {
                gsap.to(card, { y: -10, duration: 0.5, ease: "power2.out" });
            }
            if (state.motionPattern === 'mechanical') {
                gsap.to(card, { x: 5, y: -5, duration: 0.1, ease: "none" });
            }
        };

        card.onmouseleave = () => {
            if (state.motionPattern === 'elastic') {
                gsap.to(card, { scale: 1, duration: 0.5 });
            }
            if (state.motionPattern === 'fluid') {
                gsap.to(card, { y: 0, duration: 0.5 });
            }
            if (state.motionPattern === 'mechanical') {
                gsap.to(card, { x: 0, y: 0, duration: 0.1 });
            }
        };
    });

    // 2. TYPOGRAPHY
    if (state.motionPattern === 'fluid') {
        gsap.to(els.heroTitle, { y: -5, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    } else if (state.motionPattern === 'mechanical') {
        gsap.to(els.heroTitle, { opacity: 0.8, duration: 0.1, repeat: -1, yoyo: true, repeatDelay: 2 });
    } else { // Elastic
        gsap.to(els.heroTitle, { letterSpacing: "2px", duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    // 3. BUTTONS
    if (state.motionPattern === 'fluid') {
        gsap.to('.btn-primary', { backgroundPosition: "200% 0", duration: 3, repeat: -1, ease: "linear" });
    } else if (state.motionPattern === 'elastic') {
        gsap.to('.btn-primary', { scale: 1.05, duration: 0.8, repeat: -1, yoyo: true, ease: "elastic.out(1, 0.5)" });
    }

    // 4. BACKGROUND BLOBS
    gsap.to('.shape-blob', {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        scale: "random(0.8, 1.2)",
        backgroundColor: (i) => [c.primary, c.accent, c.surface][i % 3],
        duration: state.motionPattern === 'mechanical' ? 0.5 : 5,
        repeat: -1,
        yoyo: true,
        ease: state.motionPattern === 'mechanical' ? "steps(5)" : "sine.inOut"
    });
}

/**
 * Reset all animations to static state
 * @param {Object} c - Color scheme
 * @param {Function} hexToRgba - Utility function
 */
function resetAnimations(c, hexToRgba) {
    gsap.to(els.heroTitle, {
        y: 0,
        textShadow: "none",
        opacity: 1,
        letterSpacing: "normal"
    });

    gsap.to('.shape-blob', {
        x: 0,
        y: 0,
        scale: 1,
        backgroundColor: (i) => [c.primary, c.accent, c.surface][i % 3]
    });

    gsap.to('.card-solid, .card-glass, .card-outline', {
        y: 0,
        x: 0,
        scale: 1,
        borderColor: hexToRgba(c.text, 0.1),
        boxShadow: 'none',
        rotationY: 0,
        rotationX: 0
    });

    gsap.to('.btn-primary', { scale: 1, boxShadow: 'none' });

    // Clear hover listeners
    document.querySelectorAll('.card-solid, .card-glass, .card-outline').forEach(card => {
        card.onmouseenter = null;
        card.onmouseleave = null;
    });
}

// Export for global access
window.updateAnimations = updateAnimations;
