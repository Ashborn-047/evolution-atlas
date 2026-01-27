/**
 * ============================================
 * TYPEWRITER EFFECT
 * ============================================
 * 
 * A smooth, looping typewriter animation that:
 * - Types out text character by character
 * - Pauses when complete
 * - Deletes character by character
 * - Cycles through multiple phrases
 * 
 * USAGE:
 * 1. Add an element with id="footer-typewriter" (or custom id)
 * 2. Include this script: <script src="js/typewriter.js"></script>
 * 3. Optionally add a blinking cursor span next to it
 * 
 * CONFIGURATION:
 * - phrases: Array of strings to cycle through
 * - typeSpeed: Milliseconds per character when typing (default: 80)
 * - deleteSpeed: Milliseconds per character when deleting (default: 40)
 * - pauseEnd: Pause duration after completing a phrase (default: 2000ms)
 * - pauseStart: Pause duration before starting next phrase (default: 500ms)
 * 
 * ============================================
 */

(function () {
    'use strict';

    // Configuration
    const config = {
        elementId: 'footer-typewriter',
        phrases: [
            "Type is no longer just ink on paper.",
            "Letters have learned to breathe.",
            "Typography has become kinetic.",
            "The alphabet is alive."
        ],
        typeSpeed: 80,
        deleteSpeed: 40,
        pauseEnd: 2000,
        pauseStart: 500
    };

    // State
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    /**
     * Main typing function - handles both typing and deleting
     */
    function type() {
        const el = document.getElementById(config.elementId);
        if (!el) return;

        const currentPhrase = config.phrases[phraseIndex];
        let delay = config.typeSpeed;

        if (isDeleting) {
            // Deleting characters
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            delay = config.deleteSpeed;
        } else {
            // Typing characters
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            delay = config.typeSpeed;
        }

        // Check if we've finished typing
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            delay = config.pauseEnd;
        }
        // Check if we've finished deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % config.phrases.length;
            delay = config.pauseStart;
        }

        setTimeout(type, delay);
    }

    /**
     * Initialize the typewriter effect
     */
    function init() {
        const el = document.getElementById(config.elementId);
        if (el) {
            // Start typing after a short delay
            setTimeout(type, 1000);
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
