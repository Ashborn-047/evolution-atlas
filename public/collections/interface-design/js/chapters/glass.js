/**
 * ============================================
 * CHAPTER 2: GLASS AGE - Interactions
 * ============================================
 * 
 * Era: Light, depth, frosted glass
 * 
 * Components:
 * 1. Glass Credit Card - 3D tilt with parallax
 * 2. Glass Slider - Draggable with fill
 * 
 * Animation Style: Smooth, eased transitions
 * 
 * GSAP Methods Used:
 * - gsap.to() - Smooth rotation/position
 * - Draggable.create() - Drag interaction
 * - gsap.set() - Immediate property updates
 */


/**
 * ---------- GLASS CREDIT CARD ----------
 * Effect: Parallax depth with 3D tilt
 * 
 * GSAP Animation:
 * - rotationX/Y on mousemove (perspective tilt)
 * - Smooth return to flat on mouseleave
 * 
 * CSS Requirements:
 * - Parent needs `perspective: 1000px`
 * - Card has `.glass-shine` for light reflection
 */
function initGlassCard() {
    const glassCard = document.getElementById('glassCard');
    if (!glassCard) return;

    const shine = glassCard.querySelector('.glass-shine');

    // Tilt on mouse move
    glassCard.addEventListener('mousemove', (e) => {
        const rect = glassCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const w = rect.width;
        const h = rect.height;

        // Calculate rotation (max ±10 degrees)
        const rotateY = ((x / w) - 0.5) * 20;
        const rotateX = ((y / h) - 0.5) * -20;

        // Apply tilt with GSAP
        gsap.to(glassCard, {
            rotationY: rotateY,
            rotationX: rotateX,
            duration: 0.5,
            ease: "power2.out"
        });

        // Move shine effect
        if (shine) {
            shine.style.transform = `translateX(${(x / w) * 100 - 50}%)`;
        }
    });

    // Reset on mouse leave
    glassCard.addEventListener('mouseleave', () => {
        gsap.to(glassCard, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
}


/**
 * ---------- GLASS SLIDER ----------
 * Effect: Frosted slider with draggable thumb
 * 
 * GSAP Animation:
 * - Draggable.create() for drag interaction
 * - gsap.set() to update fill width
 * 
 * CSS Requirements:
 * - .glass-slider-track as bounds
 * - .glass-slider-fill for progress indicator
 * - .glass-slider-thumb as draggable element
 */
function initGlassSlider() {
    Draggable.create(".glass-slider-thumb", {
        type: "x",
        bounds: ".glass-slider-track",
        onDrag: function () {
            // Calculate percentage based on drag position
            const percentage = (this.x / this.maxX) * 100;

            // Update fill width immediately
            gsap.set(".glass-slider-fill", {
                width: `${percentage}%`
            });
        }
    });
}


// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initGlassCard();
    initGlassSlider();
});
