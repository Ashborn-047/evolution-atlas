/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - BUTTON MOTION PRESETS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Button motion defines how interactive elements respond to clicks and hovers.
 * Feedback is crucial for perceived responsiveness and user satisfaction.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const buttonMotionPresets = {

    // Available click effects
    effects: {

        none: {
            name: "None",
            description: "No click animation",
            css: "",
            gsap: null
        },

        press: {
            name: "Press",
            description: "Physical button depression with chiseled shadow",
            era: "solid",
            css: `
                .btn-press {
                    box-shadow: inset 0 -4px 0 rgba(0,0,0,0.4);
                    transition: all 0.1s linear;
                }
                .btn-press:active {
                    transform: translateY(4px);
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.6);
                }
            `,
            gsap: {
                press: { y: 4, duration: 0.1, ease: "none" },
                release: { y: 0, duration: 0.1, ease: "none" }
            }
        },

        wobble: {
            name: "Wobble",
            description: "Newton's laws - absorbs energy and oscillates",
            era: "organic",
            css: `
                .btn-wobble:active {
                    animation: buttonWobble 0.5s ease-out;
                }
                @keyframes buttonWobble {
                    0% { transform: scale(0.95); }
                    25% { transform: scale(1.05) rotate(3deg); }
                    50% { transform: scale(0.98) rotate(-2deg); }
                    75% { transform: scale(1.02) rotate(1deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
            `,
            gsap: {
                press: { scale: 0.9, duration: 0.1, ease: "power2.out" },
                release: {
                    scale: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                }
            }
        },

        ripple: {
            name: "Ripple",
            description: "Material Design-style expanding circle",
            era: "hybrid",
            css: `
                .btn-ripple {
                    position: relative;
                    overflow: hidden;
                }
                .btn-ripple .ripple-effect {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: scale(0);
                    animation: rippleExpand 0.6s ease-out forwards;
                }
                @keyframes rippleExpand {
                    to { transform: scale(4); opacity: 0; }
                }
            `,
            requiresJS: true, // Ripple position needs JS
            gsap: null
        },

        glow: {
            name: "Glow",
            description: "Light-catching prism effect on hover/click",
            era: "glass",
            css: `
                .btn-glow {
                    position: relative;
                    overflow: hidden;
                }
                .btn-glow::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transition: left 0.5s ease;
                }
                .btn-glow:hover::before {
                    left: 100%;
                }
            `,
            gsap: {
                hover: {
                    boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.5)",
                    duration: 0.3
                },
                unhover: {
                    boxShadow: "0 0 0px rgba(var(--primary-rgb), 0)",
                    duration: 0.3
                }
            }
        },

        scale: {
            name: "Scale",
            description: "Simple scale reduction on press",
            era: "glass",
            css: `
                .btn-scale:active {
                    transform: scale(0.95);
                    transition: transform 0.1s ease-out;
                }
            `,
            gsap: {
                press: { scale: 0.95, duration: 0.1, ease: "power2.out" },
                release: { scale: 1, duration: 0.2, ease: "power2.out" }
            }
        },

        bounce: {
            name: "Bounce",
            description: "Springy bounce back after press",
            era: "organic",
            css: `
                .btn-bounce:active {
                    transform: scale(0.9);
                }
                .btn-bounce {
                    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `,
            gsap: {
                press: { scale: 0.9, duration: 0.1, ease: "power2.out" },
                release: { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
            }
        },

        magnetic: {
            name: "Magnetic",
            description: "Button pulls toward cursor on approach",
            era: "organic",
            css: `
                .btn-magnetic {
                    transition: transform 0.3s ease-out;
                }
            `,
            requiresJS: true, // Needs mouse tracking
            gsap: {
                // Dynamic based on cursor position
                approach: { duration: 0.3, ease: "power2.out" }
            }
        }
    },

    // Parameter ranges
    parameters: {
        intensity: { min: 0, max: 100, default: 70, unit: "%" },
        bounce: { type: "boolean", default: true },
        easing: {
            options: ["linear", "ease", "ease-out", "spring", "bounce", "elastic"],
            default: "ease-out"
        }
    }
};

// Export for global access
window.buttonMotionPresets = buttonMotionPresets;
