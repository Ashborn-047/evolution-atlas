/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - PALETTE INDEX
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This file aggregates all palette definitions from individual system files.
 * Each system file contains detailed documentation for community contributors.
 * 
 * FILE STRUCTURE:
 * js/data/palettes/
 * ├── index.js          (this file - aggregator)
 * ├── monochromatic.js  (10 Single-hue palettes)
 * ├── analogous.js      (10 Adjacent-hue palettes)
 * ├── complementary.js  (10 Opposite-hue palettes)
 * └── triadic.js        (10 Three-hue palettes)
 * 
 * CONTRIBUTING:
 * Each palette should include:
 * - id: Unique identifier (e.g., "mono-tech-blue")
 * - name: Display name
 * - colors: { bg, surface, text, primary, accent }
 * - mood: Short 5-7 word mood description
 * - personality: 2-sentence personality explanation
 * - bestFor: Comma-separated use cases
 * - emotion: 3 key emotions evoked
 * - colorRoles: Explanation for each color's purpose
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Aggregate all palettes into the main paletteDB
const paletteDB = {
    monochromatic: window.monochromaticPalettes || [],
    analogous: window.analogousPalettes || [],
    complementary: window.complementaryPalettes || [],
    triadic: window.triadicPalettes || []
};

// Export for global access
window.paletteDB = paletteDB;

console.log('[Chroma & Kinetics] Palette database loaded:', {
    monochromatic: paletteDB.monochromatic.length,
    analogous: paletteDB.analogous.length,
    complementary: paletteDB.complementary.length,
    triadic: paletteDB.triadic.length
});
