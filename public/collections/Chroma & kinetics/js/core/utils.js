/**
 * CHROMA & KINETICS - Utility Functions
 * Helper functions for color manipulation and DOM operations
 */

/**
 * Convert hex color to rgba format
 * @param {string} hex - Hex color code (e.g., "#3b82f6")
 * @param {number} alpha - Alpha transparency (0-1)
 * @returns {string} RGBA color string
 */
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Adjust brightness of a hex color
 * @param {string} hex - Hex color code
 * @param {number} percent - Percentage to adjust (-100 to 100)
 * @returns {string} Adjusted hex color
 */
function adjustBrightness(hex, percent) {
    // TODO: Implement proper brightness adjustment
    return hex;
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for global access
window.ChromaUtils = {
    hexToRgba,
    adjustBrightness,
    clamp,
    debounce
};
