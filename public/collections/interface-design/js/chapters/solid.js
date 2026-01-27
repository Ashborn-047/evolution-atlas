/**
 * ============================================
 * CHAPTER 1: SOLID STATE - Interactions
 * ============================================
 * 
 * Era: Mechanical metaphors, rigid borders
 * 
 * Components:
 * 1. Retro Tabs - File folder metaphor
 * 2. Click Carousel - Projector snap
 * 3. Mechanical Toggle - Circuit breaker
 * 
 * Animation Style: Instant, no easing (steps)
 * No GSAP used - pure CSS and vanilla JS
 */


/**
 * ---------- RETRO TABS ----------
 * Effect: File folder metaphor navigation
 * Animation: Instant tab switch (no transition)
 * 
 * Usage: onclick="switchTab(this)"
 */
function switchTab(el) {
    // Remove active class from all siblings
    const siblings = el.parentElement.children;
    for (let sib of siblings) {
        sib.classList.remove('active');
    }

    // Activate clicked tab
    el.classList.add('active');

    // Update content with "loading" effect
    const content = el.parentElement.nextElementSibling;
    content.innerHTML = "> ACCESSING...<br>> ...";

    // Simulate content load
    setTimeout(() => {
        content.innerHTML = `> MODULE ${el.innerText} ACTIVE.`;
    }, 200);
}


/**
 * ---------- CLICK CAROUSEL ----------
 * Effect: Projector snap (instant image switch)
 * Animation: No transition - content swap only
 * 
 * Usage: onclick="changeSlide(-1)" / onclick="changeSlide(1)"
 */
let currentClickSlide = 1;
const TOTAL_SLIDES = 3;

function changeSlide(direction) {
    currentClickSlide += direction;

    // Loop around
    if (currentClickSlide > TOTAL_SLIDES) currentClickSlide = 1;
    if (currentClickSlide < 1) currentClickSlide = TOTAL_SLIDES;

    // Update display (instant swap, no animation)
    const slideElement = document.getElementById('clickSlide');
    if (slideElement) {
        slideElement.innerText = `IMG_0${currentClickSlide}`;
    }
}


/**
 * ---------- MECHANICAL TOGGLE ----------
 * Effect: Circuit breaker switch
 * Animation: Instant state change (0s transition in CSS)
 * 
 * Usage: onclick="this.classList.toggle('active')"
 * (Inline in HTML, no additional JS needed)
 */

// Export for global scope (used by onclick handlers)
window.switchTab = switchTab;
window.changeSlide = changeSlide;
