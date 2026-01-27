/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - HYBRID MOTION ERA
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ERA PHILOSOPHY:
 * The Hybrid era represents convergence - mixing solid structure, glass depth,
 * and fluid physics into cohesive new experiences. Context-aware animations
 * choose the right behavior for each interaction type.
 * 
 * VISUAL CHARACTERISTICS:
 * - Context-aware animation selection
 * - Solid structure with organic details
 * - Glass depth with elastic feedback
 * - Layered complexity
 * - Smart defaults based on interaction type
 * 
 * BEST PAIRED WITH:
 * - Fusion palettes (cross-system combinations)
 * - Complex applications with varied interactions
 * - Progressive web apps
 * - Design systems requiring flexibility
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const hybridMotion = {
    id: "hybrid",
    name: "Hybrid",
    description: "Convergence of eras - context-aware mixing of solid, glass, and organic",
    philosophy: "Interfaces as ecosystems - choosing the right motion for each moment",

    // Hybrid combines elements from all eras based on context
    defaults: {
        card: {
            hoverEffect: "tilt",       // Glass base
            intensity: 65,
            duration: 450,
            easing: "ease-out",
            transform: {
                rotateX: 8,
                rotateY: 8,
                scale: 1.02,
                perspective: 1000
            },
            // Organic addition: surface tension
            surfaceTension: {
                enabled: true,
                followCursor: true,
                elasticity: 0.2
            },
            // Glass addition: glow
            glow: {
                enabled: true,
                color: "rgba(255,255,255,0.1)",
                spread: 15
            }
        },

        button: {
            clickEffect: "ripple",     // Unique hybrid
            intensity: 65,
            bounce: true,              // Organic
            easing: "ease-out",
            transform: {
                scale: 0.97,
                brightness: 1.1
            },
            ripple: {
                enabled: true,
                color: "currentColor",
                duration: 600
            },
            // Solid border detail
            border: {
                enabled: true,
                width: 1,
                style: "solid"
            }
        },

        typography: {
            effect: "fade",            // Glass
            intensity: 25,
            speed: "slow",
            textShadow: "0 1px 8px rgba(0,0,0,0.2)"
        },

        navigation: {
            activeState: "slide",      // Solid base
            transitionSpeed: 250,
            indicator: "line",
            style: {
                lineHeight: 2,
                // Glass glow addition
                glowEnabled: true,
                glowColor: "var(--accent)"
            }
        },

        carousel: {
            style: "3d-sphere",        // Unique hybrid - existing Chroma style
            dragPhysics: 70,
            autoRotate: true,
            transition: {
                duration: 600,
                easing: "power2.out"
            },
            sphere: {
                radius: 300,
                perspective: 1000,
                rotationSpeed: 0.5
            }
        },

        toggle: {
            switchStyle: "morph",      // Organic
            speed: 70,
            border: 1,                 // Solid detail
            trackStyle: "glass",       // Glass background
            glow: {
                enabled: true,
                color: "var(--accent)"
            }
        }
    },

    // Context-aware era selection logic
    contextRules: {
        // When to use Solid behaviors
        solid: {
            triggers: ["click", "toggle", "select"],
            elements: ["button:active", "toggle", "checkbox"]
        },
        // When to use Glass behaviors
        glass: {
            triggers: ["hover", "focus"],
            elements: ["card", "modal", "dropdown"]
        },
        // When to use Organic behaviors
        organic: {
            triggers: ["drag", "scroll", "gesture"],
            elements: ["carousel", "slider", "draggable"]
        }
    },

    // CSS keyframes combining all eras
    keyframes: {
        ripple: `
            @keyframes hybridRipple {
                0% { transform: scale(0); opacity: 0.5; }
                100% { transform: scale(4); opacity: 0; }
            }
        `,
        morphGlow: `
            @keyframes hybridMorphGlow {
                0% { box-shadow: 0 0 10px var(--glow-color); border-radius: 8px; }
                50% { box-shadow: 0 0 20px var(--glow-color); border-radius: 12px; }
                100% { box-shadow: 0 0 10px var(--glow-color); border-radius: 8px; }
            }
        `,
        floatTilt: `
            @keyframes hybridFloatTilt {
                0%, 100% { transform: perspective(1000px) rotateX(0) rotateY(0) translateY(0); }
                25% { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateY(-5px); }
                75% { transform: perspective(1000px) rotateX(-2deg) rotateY(2deg) translateY(-3px); }
            }
        `
    },

    // GSAP animation configurations
    gsapConfig: {
        card: {
            hover: {
                rotateX: 8,
                rotateY: 8,
                scale: 1.02,
                duration: 0.45,
                ease: "power2.out",
                transformPerspective: 1000
            },
            unhover: {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)" // Organic easing on exit
            }
        },
        button: {
            press: { scale: 0.97, duration: 0.1, ease: "power2.out" },
            release: {
                scale: 1,
                duration: 0.4,
                ease: "elastic.out(1, 0.4)" // Organic bounce
            }
        },
        carousel: {
            slide: { duration: 0.6, ease: "power2.out" }
        }
    }
};

// Export for global access
window.hybridMotion = hybridMotion;
