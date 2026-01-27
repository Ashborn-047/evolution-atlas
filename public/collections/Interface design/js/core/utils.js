/**
 * ============================================
 * UTILITIES - Shared Helper Functions
 * ============================================
 * 
 * Common functions used across multiple modules.
 * Import this first before other modules.
 */

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum bound
 * @param {number} max - Maximum bound
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
function lerp(start, end, t) {
    return start + (end - start) * t;
}

/**
 * Map a value from one range to another
 * @param {number} value - Input value
 * @param {number} inMin - Input range minimum
 * @param {number} inMax - Input range maximum
 * @param {number} outMin - Output range minimum
 * @param {number} outMax - Output range maximum
 * @returns {number} Mapped value
 */
function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Get mouse position relative to element center
 * @param {MouseEvent} e - Mouse event
 * @param {HTMLElement} element - Target element
 * @returns {{x: number, y: number}} Position relative to center
 */
function getMousePositionFromCenter(e, element) {
    const rect = element.getBoundingClientRect();
    return {
        x: e.clientX - (rect.left + rect.width / 2),
        y: e.clientY - (rect.top + rect.height / 2)
    };
}

/**
 * Get mouse position relative to element
 * @param {MouseEvent} e - Mouse event
 * @param {HTMLElement} element - Target element
 * @returns {{x: number, y: number, percentX: number, percentY: number}}
 */
function getMousePosition(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return {
        x,
        y,
        percentX: x / rect.width,
        percentY: y / rect.height
    };
}
