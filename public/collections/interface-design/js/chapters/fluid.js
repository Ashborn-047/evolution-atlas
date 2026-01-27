/**
 * ============================================
 * CHAPTER 3: ORGANIC FLOW - Interactions
 * ============================================
 * 
 * Era: Biology, elastic, alive interfaces
 * 
 * Components:
 * 1. Elastic Card - Stretches toward cursor
 * 2. Liquid Nav - Morphing blob indicator
 * 3. Jelly Button - Squish effect on click
 * 4. Magnetic Button - Pulls toward cursor
 * 5. Squeeze Carousel - Soft-body physics drag
 * 
 * Animation Style: Elastic, organic, physics-based
 * 
 * GSAP Methods Used:
 * - gsap.to() with elastic easing
 * - gsap.timeline() for sequenced animations
 * - Draggable.create() with inertia
 */


/**
 * ---------- ELASTIC CARD ----------
 * Effect: Card stretches toward cursor (surface tension)
 * 
 * GSAP Animation:
 * - x/y position follows cursor with damping (0.1 multiplier)
 * - scaleX/Y increases based on cursor distance
 * - Elastic snap-back on mouseleave
 */
function initElasticCard() {
    const elasticCard = document.getElementById('elasticCard');
    if (!elasticCard) return;

    elasticCard.addEventListener('mousemove', (e) => {
        const rect = elasticCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(elasticCard, {
            x: x * 0.1,  // Damped follow
            y: y * 0.1,
            scaleX: 1 + Math.abs(x) * 0.0005,  // Stretch based on distance
            scaleY: 1 + Math.abs(y) * 0.0005,
            duration: 0.1
        });
    });

    elasticCard.addEventListener('mouseleave', () => {
        gsap.to(elasticCard, {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"  // Bouncy return
        });
    });
}


/**
 * ---------- LIQUID NAVIGATION ----------
 * Effect: Blob morphs and swims to selected item
 * 
 * GSAP Animation:
 * - Animates left position and width
 * - Elastic easing for organic feel
 * 
 * Usage: onclick="moveBlob(this)"
 */
function moveBlob(el) {
    // Update active states
    const siblings = el.parentElement.querySelectorAll('.liquid-nav-item');
    siblings.forEach(sib => sib.classList.remove('active'));
    el.classList.add('active');

    // Calculate positions
    const wrapperRect = el.parentElement.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();

    // Animate blob to new position
    gsap.to(".liquid-blob", {
        left: itemRect.left - wrapperRect.left,
        width: itemRect.width,
        duration: 0.5,
        ease: "elastic.out(1, 0.7)"
    });
}


/**
 * ---------- JELLY BUTTON ----------
 * Effect: Button squishes and wobbles on click
 * 
 * GSAP Animation:
 * - Timeline with 3 stages: squash → stretch → settle
 * - Elastic easing on final settle
 */
function initJellyButton() {
    const jellyBtn = document.getElementById('jellyBtn');
    if (!jellyBtn) return;

    jellyBtn.addEventListener('click', () => {
        gsap.timeline()
            // Stage 1: Squash (press in)
            .to(jellyBtn, {
                scaleX: 1.25,
                scaleY: 0.75,
                duration: 0.1
            })
            // Stage 2: Stretch (recoil)
            .to(jellyBtn, {
                scaleX: 0.75,
                scaleY: 1.25,
                duration: 0.1
            })
            // Stage 3: Settle (bounce back)
            .to(jellyBtn, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
    });
}


/**
 * ---------- MAGNETIC BUTTON ----------
 * Effect: Button pulls toward cursor within magnetic area
 * 
 * GSAP Animation:
 * - x/y position follows cursor with 0.5 multiplier
 * - Elastic snap-back when cursor leaves area
 */
function initMagneticButton() {
    const magArea = document.getElementById('magArea');
    const magBtn = document.getElementById('magBtn');
    if (!magArea || !magBtn) return;

    magArea.addEventListener('mousemove', (e) => {
        const rect = magArea.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        gsap.to(magBtn, {
            x: x * 0.5,  // Pull strength
            y: y * 0.5,
            duration: 0.2
        });
    });

    magArea.addEventListener('mouseleave', () => {
        gsap.to(magBtn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)"
        });
    });
}


/**
 * ---------- SQUEEZE CAROUSEL ----------
 * Effect: Items compress during fast drag (soft-body physics)
 * 
 * GSAP Animation:
 * - Draggable with inertia (momentum after release)
 * - onDrag: Items scale/skew based on drag velocity
 * - onDragEnd: Elastic reset to normal shape
 */
function initSqueezeCarousel() {
    const squeezeWrapper = document.getElementById('squeezeWrapper');
    if (!squeezeWrapper) return;

    Draggable.create(".squeeze-track", {
        type: "x",
        bounds: squeezeWrapper,
        inertia: true,  // Momentum after release

        onDrag: function () {
            // Compress items based on drag speed
            gsap.to(".squeeze-item", {
                scaleX: 1 - Math.abs(this.deltaX) * 0.005,
                skewX: this.deltaX * -0.2,
                duration: 0.1
            });
        },

        onDragEnd: function () {
            // Elastic bounce back to normal
            gsap.to(".squeeze-item", {
                scaleX: 1,
                skewX: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        }
    });
}


// Export for global scope
window.moveBlob = moveBlob;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initElasticCard();
    initJellyButton();
    initMagneticButton();
    initSqueezeCarousel();
});
