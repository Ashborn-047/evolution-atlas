/* ==========================================================================
   SCROLL-ANIMATIONS.JS
   GSAP ScrollTrigger Animations
   ========================================================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ==================== TEXT REVEAL ANIMATIONS ==================== */
// Animate each element with .reveal-type class
document.querySelectorAll('.reveal-type').forEach(el => {
    const chars = splitText(el);

    gsap.from(chars, {
        opacity: 0,
        y: 10,
        duration: 0.05,
        stagger: 0.02,
        scrollTrigger: {
            trigger: el,
            start: "top 95%" // Triggers when top of text is near bottom of screen
        }
    });
});

/* ==================== TYPER EFFECT (Chapter 2) ==================== */
const textToType = "true";
const typerEl = document.getElementById('typer');

ScrollTrigger.create({
    trigger: "#typer",
    start: "top 85%",
    onEnter: () => {
        let i = 0;
        typerEl.innerHTML = "";

        let interval = setInterval(() => {
            typerEl.innerHTML += textToType.charAt(i);
            i++;
            if (i > textToType.length - 1) {
                clearInterval(interval);
            }
        }, 100);
    },
    once: true
});
