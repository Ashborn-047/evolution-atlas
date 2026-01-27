/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - SOLID STATE MOTION ERA
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ERA PHILOSOPHY:
 * The Solid State era represents the early web's mechanical metaphors. 
 * Interfaces borrowed from physical hardware - buttons that "pressed in",
 * cards that shifted like drawer components, and toggles modeled after 
 * electrical switches.
 * 
 * VISUAL CHARACTERISTICS:
 * - High contrast, rigid borders
 * - Binary states (on/off, pressed/released)
 * - Physical depth through chiseled shadows
 * - Mechanical transitions with linear easing
 * - Monospaced typography for technical precision
 * 
 * BEST PAIRED WITH:
 * - Monochromatic palettes (unified, focused)
 * - Technical/enterprise applications
 * - Dashboards and admin interfaces
 * - Retro/brutalist design aesthetics
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const solidStateMotion = {
    id: "solid",
    name: "Solid State",
    description: "Mechanical metaphors with rigid transitions and physical depth",
    philosophy: "Interfaces as hardware - every element has weight and physical presence",

    // Default parameters for each element in this era
    defaults: {
        card: {
            hoverEffect: "shift",
            intensity: 60,
            duration: 150,
            easing: "linear",
            transform: {
                x: 4,
                y: 4,
                scale: 1,
                rotate: 0
            },
            shadow: {
                enabled: true,
                offset: 4,
                blur: 0,
                color: "rgba(0,0,0,0.8)"
            }
        },

        button: {
            clickEffect: "press",
            intensity: 80,
            bounce: false,
            easing: "linear",
            transform: {
                pressDepth: 4,
                scale: 0.98
            },
            shadow: {
                default: "inset 0 -4px 0 rgba(0,0,0,0.4)",
                pressed: "inset 0 2px 4px rgba(0,0,0,0.6)"
            }
        },

        typography: {
            effect: "static",
            intensity: 0,
            speed: "none",
            weight: "bold",
            letterSpacing: "0.1em",
            transform: "uppercase"
        },

        navigation: {
            activeState: "underline",
            transitionSpeed: 100,
            indicator: "line",
            style: {
                lineHeight: 3,
                lineOffset: 2
            }
        },

        carousel: {
            style: "slide",
            dragPhysics: 20,
            autoRotate: false,
            transition: {
                duration: 200,
                easing: "linear"
            }
        },

        toggle: {
            switchStyle: "slide",
            speed: 50,
            border: 2,
            trackStyle: "solid"
        }
    },

    // CSS keyframes for this era
    keyframes: {
        cardHover: `
            @keyframes solidCardHover {
                0% { transform: translate(0, 0); }
                100% { transform: translate(4px, 4px); }
            }
        `,
        buttonPress: `
            @keyframes solidButtonPress {
                0% { transform: translateY(0); box-shadow: inset 0 -4px 0 rgba(0,0,0,0.4); }
                100% { transform: translateY(4px); box-shadow: inset 0 2px 4px rgba(0,0,0,0.6); }
            }
        `,
        toggleSwitch: `
            @keyframes solidToggle {
                0% { transform: translateX(0); }
                100% { transform: translateX(100%); }
            }
        `
    },

    // GSAP animation configurations
    gsapConfig: {
        card: {
            hover: { x: 4, y: 4, duration: 0.15, ease: "none" },
            unhover: { x: 0, y: 0, duration: 0.15, ease: "none" }
        },
        button: {
            press: { y: 4, scale: 0.98, duration: 0.1, ease: "none" },
            release: { y: 0, scale: 1, duration: 0.1, ease: "none" }
        },
        carousel: {
            slide: { duration: 0.2, ease: "none" }
        }
    }
};

// Export for global access
window.solidStateMotion = solidStateMotion;
