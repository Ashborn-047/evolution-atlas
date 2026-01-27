/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - ORGANIC FLOW MOTION ERA
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ERA PHILOSOPHY:
 * The Organic Flow era brings biology to interfaces. Elements breathe, morph,
 * and react elastically to human intent. Physics simulations create natural
 * momentum. Interfaces feel alive.
 * 
 * VISUAL CHARACTERISTICS:
 * - Elastic/spring animations
 * - Soft-body physics
 * - Breathing and pulsing rhythms
 * - Morphing shapes
 * - Cursor-following behavior
 * 
 * BEST PAIRED WITH:
 * - Analogous palettes (natural, organic flow)
 * - Triadic palettes (playful, energetic)
 * - Wellness and lifestyle apps
 * - Creative and experimental interfaces
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const organicFlowMotion = {
    id: "organic",
    name: "Organic Flow",
    description: "Biology-inspired interfaces that breathe, morph, and react elastically",
    philosophy: "Interfaces as organisms - alive, responsive, and naturally intuitive",

    // Default parameters for each element in this era
    defaults: {
        card: {
            hoverEffect: "stretch",
            intensity: 80,
            duration: 600,
            easing: "elastic",
            transform: {
                scaleX: 1.02,
                scaleY: 0.98,
                rotate: 2
            },
            surfaceTension: {
                enabled: true,
                followCursor: true,
                elasticity: 0.3
            }
        },

        button: {
            clickEffect: "wobble",
            intensity: 70,
            bounce: true,
            easing: "elastic",
            transform: {
                squash: 0.9,
                stretch: 1.1,
                wobbleAngle: 5
            },
            physics: {
                mass: 1,
                stiffness: 200,
                damping: 15
            }
        },

        typography: {
            effect: "breathe",
            intensity: 40,
            speed: "medium",
            breathe: {
                minScale: 0.98,
                maxScale: 1.02,
                duration: 3000
            }
        },

        navigation: {
            activeState: "morph",
            transitionSpeed: 400,
            indicator: "blob",
            style: {
                morphDuration: 400,
                blobRadius: 20,
                followEase: "elastic.out(1, 0.5)"
            }
        },

        carousel: {
            style: "elastic",
            dragPhysics: 90,
            autoRotate: false,
            transition: {
                duration: 800,
                easing: "elastic.out(1, 0.3)"
            },
            softBody: {
                enabled: true,
                compression: 0.2,
                rebound: 1.5
            }
        },

        toggle: {
            switchStyle: "bounce",
            speed: 80,
            border: 0,
            trackStyle: "organic",
            blob: {
                enabled: true,
                deform: 0.3
            }
        }
    },

    // CSS keyframes for this era
    keyframes: {
        breathe: `
            @keyframes organicBreathe {
                0%, 100% { transform: scale(0.98); opacity: 0.9; }
                50% { transform: scale(1.02); opacity: 1; }
            }
        `,
        wobble: `
            @keyframes organicWobble {
                0% { transform: rotate(0deg); }
                25% { transform: rotate(5deg); }
                50% { transform: rotate(-5deg); }
                75% { transform: rotate(3deg); }
                100% { transform: rotate(0deg); }
            }
        `,
        pulse: `
            @keyframes organicPulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 var(--pulse-color); }
                50% { transform: scale(1.05); box-shadow: 0 0 20px 10px var(--pulse-color); }
            }
        `,
        blob: `
            @keyframes organicBlob {
                0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
            }
        `
    },

    // GSAP animation configurations
    gsapConfig: {
        card: {
            hover: {
                scaleX: 1.02,
                scaleY: 0.98,
                rotation: 2,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            },
            unhover: {
                scaleX: 1,
                scaleY: 1,
                rotation: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            }
        },
        button: {
            press: {
                scaleY: 0.9,
                scaleX: 1.1,
                duration: 0.1,
                ease: "power2.out"
            },
            release: {
                scaleY: 1.1,
                scaleX: 0.95,
                duration: 0.2,
                ease: "elastic.out(1, 0.3)",
                yoyo: true,
                repeat: 1
            }
        },
        carousel: {
            slide: { duration: 0.8, ease: "elastic.out(1, 0.3)" }
        },
        navigation: {
            morph: { duration: 0.4, ease: "elastic.out(1, 0.5)" }
        }
    }
};

// Export for global access
window.organicFlowMotion = organicFlowMotion;
