/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - GLASS AGE MOTION ERA
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ERA PHILOSOPHY:
 * The Glass Age represents the evolution toward light and depth. Interfaces 
 * became layers of frosted glass floating in 3D space. Shadows gave way to
 * light; depth came from perspective, not just offset.
 * 
 * VISUAL CHARACTERISTICS:
 * - Frosted glass effects (backdrop-filter)
 * - 3D perspective and parallax
 * - Light-catching gradients
 * - Smooth, eased transitions
 * - Subtle glows and reflections
 * 
 * BEST PAIRED WITH:
 * - Complementary palettes (dramatic contrast with depth)
 * - Modern web applications
 * - Creative and portfolio sites
 * - iOS/macOS-inspired interfaces
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const glassAgeMotion = {
    id: "glass",
    name: "Glass Age",
    description: "Light and depth with frosted glass layers in 3D space",
    philosophy: "Interfaces as light - transparency, reflection, and dimensional depth",

    // Default parameters for each element in this era
    defaults: {
        card: {
            hoverEffect: "tilt",
            intensity: 70,
            duration: 400,
            easing: "ease-out",
            transform: {
                rotateX: 10,
                rotateY: 10,
                scale: 1.02,
                perspective: 1000
            },
            glass: {
                blur: 20,
                saturation: 1.2,
                opacity: 0.8
            },
            glow: {
                enabled: true,
                color: "rgba(255,255,255,0.1)",
                spread: 20
            }
        },

        button: {
            clickEffect: "glow",
            intensity: 60,
            bounce: false,
            easing: "ease-out",
            transform: {
                scale: 1.05,
                brightness: 1.2
            },
            prism: {
                enabled: true,
                gradient: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
                position: "0% 0%"
            }
        },

        typography: {
            effect: "fade",
            intensity: 30,
            speed: "slow",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            gradient: {
                enabled: false
            }
        },

        navigation: {
            activeState: "glow",
            transitionSpeed: 300,
            indicator: "box",
            style: {
                blur: 10,
                glowColor: "currentColor",
                glowOpacity: 0.3
            }
        },

        carousel: {
            style: "deck",
            dragPhysics: 60,
            autoRotate: false,
            transition: {
                duration: 500,
                easing: "ease-out"
            },
            deck: {
                blur: 5,
                scale: 0.9,
                opacity: 0.7
            }
        },

        toggle: {
            switchStyle: "slide",
            speed: 70,
            border: 0,
            trackStyle: "glass",
            glow: {
                enabled: true,
                color: "var(--accent)"
            }
        }
    },

    // CSS keyframes for this era
    keyframes: {
        cardTilt: `
            @keyframes glassCardTilt {
                0% { transform: perspective(1000px) rotateX(0) rotateY(0); }
                100% { transform: perspective(1000px) rotateX(var(--tiltX)) rotateY(var(--tiltY)); }
            }
        `,
        buttonPrism: `
            @keyframes glassPrism {
                0% { background-position: -100% -100%; }
                100% { background-position: 200% 200%; }
            }
        `,
        glowPulse: `
            @keyframes glassGlow {
                0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
                50% { box-shadow: 0 0 40px rgba(255,255,255,0.2); }
            }
        `
    },

    // GSAP animation configurations
    gsapConfig: {
        card: {
            hover: {
                rotateX: 10,
                rotateY: 10,
                scale: 1.02,
                duration: 0.4,
                ease: "power2.out",
                transformPerspective: 1000
            },
            unhover: {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            }
        },
        button: {
            press: { scale: 0.98, duration: 0.1, ease: "power2.out" },
            release: { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
        },
        carousel: {
            slide: { duration: 0.5, ease: "power2.out" }
        }
    }
};

// Export for global access
window.glassAgeMotion = glassAgeMotion;
