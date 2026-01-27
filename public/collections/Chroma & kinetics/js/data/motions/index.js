/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - MOTION SYSTEM INDEX
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This file aggregates all motion eras and element presets into a unified
 * motion system. It handles era selection, auto-recommendation, and provides
 * the interface for applying motion configurations.
 * 
 * STRUCTURE:
 * - motionDB.eras: The 4 motion eras (solid, glass, organic, hybrid)
 * - motionDB.elements: The 6 element types with their presets
 * - motionDB.config: Current motion configuration state
 * 
 * USAGE:
 * - MotionSystem.setEra('glass') - Switch to Glass Age defaults
 * - MotionSystem.setElement('card', { effect: 'tilt', intensity: 80 })
 * - MotionSystem.getRecommendedEra('analogous') - Returns 'organic'
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Aggregate all motion data
const motionDB = {
    eras: {
        solid: window.solidStateMotion || null,
        glass: window.glassAgeMotion || null,
        organic: window.organicFlowMotion || null,
        hybrid: window.hybridMotion || null
    },

    elements: {
        card: window.cardMotionPresets || null,
        button: window.buttonMotionPresets || null,
        typography: window.typographyMotionPresets || null,
        navigation: window.navigationMotionPresets || null,
        carousel: window.carouselMotionPresets || null,
        toggle: window.toggleMotionPresets || null
    }
};

// Auto-recommend logic: which era fits which palette type
const eraRecommendations = {
    monochromatic: 'solid',
    analogous: 'organic',
    complementary: 'glass',
    triadic: 'organic',
    // Fusion types
    'monochromatic-analogous': 'hybrid',
    'monochromatic-complementary': 'hybrid',
    'monochromatic-triadic': 'hybrid',
    'analogous-monochromatic': 'hybrid',
    'analogous-complementary': 'hybrid',
    'analogous-triadic': 'hybrid',
    'complementary-monochromatic': 'hybrid',
    'complementary-analogous': 'hybrid',
    'complementary-triadic': 'hybrid',
    'triadic-monochromatic': 'hybrid',
    'triadic-analogous': 'hybrid',
    'triadic-complementary': 'hybrid'
};

// Motion System Controller
const MotionSystem = {

    // Current configuration
    config: {
        era: 'hybrid',
        autoRecommend: true,
        elements: {
            card: { effect: 'tilt', intensity: 65, duration: 400, easing: 'ease-out' },
            button: { effect: 'ripple', intensity: 65, bounce: true, easing: 'ease-out' },
            typography: { effect: 'fade', intensity: 25, speed: 'slow' },
            navigation: { effect: 'slide', transitionSpeed: 250, indicator: 'line' },
            carousel: { effect: 'sphere3d', dragPhysics: 70, autoRotate: true },
            toggle: { effect: 'morph', speed: 70 }
        }
    },

    /**
     * Set the active motion era and apply its defaults
     */
    setEra(eraId) {
        if (!motionDB.eras[eraId]) {
            console.warn(`[MotionSystem] Era "${eraId}" not found`);
            return false;
        }

        this.config.era = eraId;
        const era = motionDB.eras[eraId];

        // Apply era defaults to each element
        Object.keys(era.defaults).forEach(element => {
            if (this.config.elements[element]) {
                this.config.elements[element] = { ...era.defaults[element] };
            }
        });

        console.log(`[MotionSystem] Era set to "${era.name}"`);
        this.applyMotion();
        return true;
    },

    /**
     * Get the recommended era for a palette type
     */
    getRecommendedEra(paletteType) {
        return eraRecommendations[paletteType] || 'hybrid';
    },

    /**
     * Auto-recommend era based on current palette
     */
    autoRecommendEra(baseSystem, mixSystem = null) {
        if (!this.config.autoRecommend) return;

        let paletteType = baseSystem;
        if (mixSystem && mixSystem !== baseSystem) {
            paletteType = `${baseSystem}-${mixSystem}`;
        }

        const recommendedEra = this.getRecommendedEra(paletteType);
        this.setEra(recommendedEra);

        return recommendedEra;
    },

    /**
     * Toggle auto-recommend feature
     */
    toggleAutoRecommend(enabled) {
        this.config.autoRecommend = enabled;
        console.log(`[MotionSystem] Auto-recommend ${enabled ? 'enabled' : 'disabled'}`);
    },

    /**
     * Update a specific element's motion configuration
     */
    setElement(elementType, settings) {
        if (!this.config.elements[elementType]) {
            console.warn(`[MotionSystem] Element "${elementType}" not found`);
            return false;
        }

        this.config.elements[elementType] = {
            ...this.config.elements[elementType],
            ...settings
        };

        console.log(`[MotionSystem] Updated ${elementType}:`, settings);
        this.applyMotion();
        return true;
    },

    /**
     * Get current configuration for an element
     */
    getElementConfig(elementType) {
        return this.config.elements[elementType] || null;
    },

    /**
     * Get available effects for an element
     */
    getAvailableEffects(elementType) {
        const element = motionDB.elements[elementType];
        if (!element) return [];

        return Object.entries(element.effects).map(([id, data]) => ({
            id,
            name: data.name,
            description: data.description,
            era: data.era
        }));
    },

    /**
     * Apply current motion configuration to the DOM
     * This will inject CSS and set up GSAP animations
     */
    applyMotion() {
        // Generate CSS from current configuration
        let css = this.generateCSS();

        // Update or create style element
        let styleEl = document.getElementById('motion-system-styles');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'motion-system-styles';
            document.head.appendChild(styleEl);
        }
        styleEl.textContent = css;

        // Dispatch event for other components to react
        window.dispatchEvent(new CustomEvent('motionConfigChanged', {
            detail: this.config
        }));
    },

    /**
     * Generate CSS from current configuration
     */
    generateCSS() {
        let css = '/* Motion System Generated Styles */\n';

        // Add era keyframes
        const era = motionDB.eras[this.config.era];
        if (era && era.keyframes) {
            Object.values(era.keyframes).forEach(kf => {
                css += kf + '\n';
            });
        }

        return css;
    },

    /**
     * Get GSAP animation config for an element
     */
    getGSAPConfig(elementType, action) {
        const era = motionDB.eras[this.config.era];
        if (!era || !era.gsapConfig || !era.gsapConfig[elementType]) {
            return null;
        }
        return era.gsapConfig[elementType][action] || null;
    },

    /**
     * Export current configuration as JSON
     */
    exportConfig() {
        return JSON.stringify(this.config, null, 2);
    },

    /**
     * Import configuration from JSON
     */
    importConfig(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.config = { ...this.config, ...imported };
            this.applyMotion();
            return true;
        } catch (e) {
            console.error('[MotionSystem] Failed to import config:', e);
            return false;
        }
    }
};

// Export for global access
window.motionDB = motionDB;
window.MotionSystem = MotionSystem;

// Log initialization
console.log('[Chroma & Kinetics] Motion System loaded');
console.log('  - Eras:', Object.keys(motionDB.eras).filter(k => motionDB.eras[k]).length);
console.log('  - Elements:', Object.keys(motionDB.elements).filter(k => motionDB.elements[k]).length);
