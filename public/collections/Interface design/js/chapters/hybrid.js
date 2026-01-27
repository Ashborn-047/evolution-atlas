/**
 * ============================================
 * CHAPTER 4: HYBRID ARCHITECTURE - Interactions
 * ============================================
 * 
 * Era: Convergence of all eras (solid + glass + fluid)
 * 
 * Components (18 variants total):
 * - 4.2 Navigation: Dynamic Island, Magnetic Frost, Worm Line
 * - 4.3 Buttons: Atmospheric Glow, Glazed Jelly, Ripple Glass
 * - 4.6 Inputs: Liquid Slider, Rotary Knob
 * 
 * Animation Style: Mixed - combines all techniques
 * 
 * GSAP Methods Used:
 * - gsap.to() - Position/size transitions
 * - gsap.timeline() - Sequenced animations
 * - Draggable.create() - Drag/rotation
 * - CSS Custom Properties for tracking
 */


/**
 * ---------- 4.2.A DYNAMIC ISLAND NAV ----------
 * Effect: Fluid blob trapped in solid container
 * 
 * GSAP Animation:
 * - Animates left position and width of indicator
 * - Smooth easing (power2.out)
 * 
 * Usage: onclick="moveHybridBlob(this)"
 */
function moveHybridBlob(el) {
    const blob = document.getElementById('hybridNavBlob');
    if (!blob) return;

    const wrapperRect = el.parentElement.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();
    const relativeLeft = itemRect.left - wrapperRect.left;

    gsap.to(blob, {
        left: relativeLeft,
        width: itemRect.width,
        duration: 0.4,
        ease: "power2.out"
    });
}


/**
 * ---------- 4.2.B MAGNETIC FROST NAV ----------
 * Effect: Glass links with magnetic pull toward cursor
 * 
 * GSAP Animation:
 * - x/y position follows cursor within each link
 * - Elastic return on mouseleave
 */
function initMagneticFrostNav() {
    const magLinks = document.querySelectorAll('.nav-mag-link');

    magLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            gsap.to(link, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.4)"
            });
        });
    });
}


/**
 * ---------- 4.2.C WORM LINE NAV ----------
 * Effect: Underline that crawls between items
 * 
 * GSAP Animation:
 * - Animates left position and width
 * - Expo easing for smooth acceleration
 * 
 * Usage: onmouseenter="moveWorm(this)"
 */
function moveWorm(el) {
    const line = document.getElementById('wormLine');
    if (!line) return;

    const wrapperRect = el.parentElement.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();

    gsap.to(line, {
        left: itemRect.left - wrapperRect.left,
        width: itemRect.width,
        duration: 0.4,
        ease: "expo.out"
    });
}


/**
 * ---------- 4.3.A ATMOSPHERIC GLOW BUTTON ----------
 * Effect: Internal glow follows cursor position
 * 
 * Technique: CSS Custom Properties (--x, --y)
 * - JS sets --x and --y on mousemove
 * - CSS uses these in radial-gradient
 */
function initAtmosphericButton() {
    const hybridBtn = document.getElementById('hybridBtn');
    if (!hybridBtn) return;

    hybridBtn.addEventListener('mousemove', (e) => {
        const rect = hybridBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS custom properties
        hybridBtn.style.setProperty('--x', `${x}px`);
        hybridBtn.style.setProperty('--y', `${y}px`);
    });
}


/**
 * ---------- 4.3.B GLAZED JELLY BUTTON ----------
 * Effect: Glass appearance + squish physics
 * 
 * GSAP Animation:
 * - Same timeline as regular jelly button
 * - Combines glass styling with fluid animation
 */
function initGlazedJellyButton() {
    const glazedBtn = document.getElementById('glazedBtn');
    if (!glazedBtn) return;

    glazedBtn.addEventListener('click', () => {
        gsap.timeline()
            .to(glazedBtn, { scaleX: 1.2, scaleY: 0.8, duration: 0.1 })
            .to(glazedBtn, { scaleX: 0.9, scaleY: 1.1, duration: 0.1 })
            .to(glazedBtn, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
    });
}


/**
 * ---------- 4.3.C RIPPLE GLASS BUTTON ----------
 * Effect: Material Design ripple on glass surface
 * 
 * Technique: Dynamic element creation
 * - Creates span element at click position
 * - CSS animation handles expansion and fade
 * 
 * Usage: onclick="createRipple(event)"
 */
function createRipple(event) {
    const button = event.currentTarget;

    // Create ripple element
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // Position at click location
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple-effect");

    // Remove existing ripple
    const existingRipple = button.getElementsByClassName("ripple-effect")[0];
    if (existingRipple) existingRipple.remove();

    button.appendChild(circle);
}


/**
 * ---------- 4.6.B LIQUID SLIDER ----------
 * Effect: Thumb deforms like liquid droplet when dragged
 * 
 * GSAP Animation:
 * - Draggable for x-axis movement
 * - border-radius distortion on drag
 * - Elastic return to circle on release
 */
function initLiquidSlider() {
    Draggable.create(".liquid-slider-thumb", {
        type: "x",
        bounds: ".liquid-slider-track",

        onDragStart: function () {
            // Distort to droplet shape
            gsap.to(this.target, {
                borderRadius: "40% 60% 60% 40% / 40% 50% 50% 60%",
                scale: 1.2,
                duration: 0.2
            });
        },

        onDragEnd: function () {
            // Return to circle
            gsap.to(this.target, {
                borderRadius: "50%",
                scale: 1,
                duration: 0.4,
                ease: "elastic.out(1, 0.5)"
            });
        }
    });
}


/**
 * ---------- 4.6.C ROTARY KNOB ----------
 * Effect: Physical dial with rotation control
 * 
 * GSAP Animation:
 * - Draggable with type: "rotation"
 * - Bounded rotation (-135° to +135°)
 * - Inertia for momentum after release
 */
function initRotaryKnob() {
    Draggable.create(".rotary-knob", {
        type: "rotation",
        bounds: { minRotation: -135, maxRotation: 135 },
        inertia: true
    });
}


// Export for global scope
window.moveHybridBlob = moveHybridBlob;
window.moveWorm = moveWorm;
window.createRipple = createRipple;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initMagneticFrostNav();
    initAtmosphericButton();
    initGlazedJellyButton();
    initLiquidSlider();
    initRotaryKnob();
});
