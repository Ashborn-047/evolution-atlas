/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - CARD MOTION PRESETS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Card motion defines how content containers respond to user interaction.
 * Each effect creates a different emotional response and usability feel.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const cardMotionPresets = {

    // Available hover effects
    effects: {

        none: {
            name: "None",
            description: "No hover animation",
            css: "",
            gsap: null
        },

        shift: {
            name: "Shift",
            description: "Binary X/Y displacement like early web buttons",
            era: "solid",
            css: `
                .card-shift:hover {
                    transform: translate(4px, 4px);
                    transition: transform 0.15s linear;
                }
            `,
            gsap: {
                hover: { x: 4, y: 4, duration: 0.15, ease: "none" },
                unhover: { x: 0, y: 0, duration: 0.15, ease: "none" }
            }
        },

        tilt: {
            name: "Tilt",
            description: "3D perspective tilt following mouse position",
            era: "glass",
            css: `
                .card-tilt {
                    transform-style: preserve-3d;
                    perspective: 1000px;
                }
                .card-tilt:hover {
                    transform: perspective(1000px) rotateX(var(--tiltX, 10deg)) rotateY(var(--tiltY, 10deg));
                    transition: transform 0.4s ease-out;
                }
            `,
            gsap: {
                hover: { rotateX: 10, rotateY: 10, duration: 0.4, ease: "power2.out" },
                unhover: { rotateX: 0, rotateY: 0, duration: 0.4, ease: "power2.out" }
            },
            // Requires JS to track mouse position for dynamic tilt
            requiresJS: true
        },

        stretch: {
            name: "Stretch",
            description: "Elastic surface tension that follows cursor",
            era: "organic",
            css: `
                .card-stretch:hover {
                    transform: scaleX(1.02) scaleY(0.98);
                    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `,
            gsap: {
                hover: { scaleX: 1.02, scaleY: 0.98, duration: 0.6, ease: "elastic.out(1, 0.3)" },
                unhover: { scaleX: 1, scaleY: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" }
            }
        },

        glow: {
            name: "Glow",
            description: "Soft light emanation on hover",
            era: "glass",
            css: `
                .card-glow:hover {
                    box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.3);
                    transition: box-shadow 0.4s ease-out;
                }
            `,
            gsap: {
                hover: { boxShadow: "0 0 30px rgba(var(--primary-rgb), 0.3)", duration: 0.4 },
                unhover: { boxShadow: "0 0 0px rgba(var(--primary-rgb), 0)", duration: 0.3 }
            }
        },

        lift: {
            name: "Lift",
            description: "Subtle elevation with shadow depth",
            era: "glass",
            css: `
                .card-lift:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    transition: all 0.3s ease-out;
                }
            `,
            gsap: {
                hover: { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)", duration: 0.3, ease: "power2.out" },
                unhover: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.3, ease: "power2.out" }
            }
        },

        pulse: {
            name: "Pulse",
            description: "Breathing scale animation on hover",
            era: "organic",
            css: `
                .card-pulse:hover {
                    animation: cardPulse 1.5s ease-in-out infinite;
                }
                @keyframes cardPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                }
            `,
            gsap: {
                hover: {
                    scale: 1.03,
                    duration: 0.75,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1
                },
                unhover: { scale: 1, duration: 0.3 }
            }
        },

        invert: {
            name: "Invert",
            description: "Negative color filter on hover",
            era: "solid",
            css: `
                .card-invert:hover {
                    filter: invert(1);
                    transition: filter 0.15s linear;
                }
            `,
            gsap: null // CSS-only effect
        }
    },

    // Parameter ranges
    parameters: {
        intensity: { min: 0, max: 100, default: 60, unit: "%" },
        duration: { min: 100, max: 1000, default: 400, unit: "ms" },
        easing: {
            options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "spring", "elastic"],
            default: "ease-out"
        }
    }
};

// Export for global access
window.cardMotionPresets = cardMotionPresets;
