/* ==========================================================================
   UTILS.JS
   Utility/Helper Functions
   ========================================================================== */

/**
 * Split text content into individual character spans
 * Used for character-level animations
 * @param {HTMLElement} element - The element containing text to split
 * @returns {NodeList} - Collection of character span elements
 */
function splitText(element) {
    const text = element.innerText;
    element.innerHTML = text
        .split('')
        .map(char => `<span class="char-split" style="display:inline-block;">${char}</span>`)
        .join('');
    return element.querySelectorAll('.char-split');
}

/**
 * Split text with shadow elements for 3D effects
 * Each character gets a shadow span for eclipse-style animations
 * @param {HTMLElement} element - The element containing text to split
 * @returns {NodeList} - Collection of character elements with shadows
 */
function splitTextWithShadow(element) {
    const text = element.innerText;
    element.innerHTML = text
        .split('')
        .map(char => `<span class="eclipse-char">${char}<span class="eclipse-shadow"></span></span>`)
        .join('');
    return element.querySelectorAll('.eclipse-char');
}
