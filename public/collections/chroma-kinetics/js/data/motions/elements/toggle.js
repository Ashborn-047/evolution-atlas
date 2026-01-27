/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - TOGGLE MOTION PRESETS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Toggle motion defines how on/off switches transition between states.
 * Feedback should be satisfying and clearly communicate state change.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const toggleMotionPresets = {

    // Available toggle styles
    effects: {

        slide: {
            name: "Slide",
            description: "Simple horizontal slide transition",
            era: "solid",
            css: `
                .toggle-slide {
                    background: var(--surface);
                    border-radius: 20px;
                    position: relative;
                    transition: background 0.2s linear;
                }
                .toggle-slide.active {
                    background: var(--primary);
                }
                .toggle-slide-thumb {
                    position: absolute;
                    left: 2px;
                    background: white;
                    border-radius: 50%;
                    transition: left 0.2s linear;
                }
                .toggle-slide.active .toggle-slide-thumb {
                    left: calc(100% - 22px);
                }
            `,
            gsap: {
                on: { left: "calc(100% - 22px)", duration: 0.2, ease: "none" },
                off: { left: "2px", duration: 0.2, ease: "none" }
            }
        },

        bounce: {
            name: "Bounce",
            description: "Springy bounce between states",
            era: "organic",
            css: `
                .toggle-bounce-thumb {
                    transition: left 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `,
            gsap: {
                on: {
                    left: "calc(100% - 22px)",
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                },
                off: {
                    left: "2px",
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                }
            }
        },

        morph: {
            name: "Morph",
            description: "Thumb morphs shape during transition",
            era: "organic",
            css: `
                .toggle-morph-thumb {
                    transition: all 0.3s ease-out;
                }
                .toggle-morph.transitioning .toggle-morph-thumb {
                    transform: scaleX(1.5);
                    border-radius: 30%;
                }
            `,
            gsap: {
                start: { scaleX: 1.5, borderRadius: "30%", duration: 0.15, ease: "power2.out" },
                move: { left: "+=40", duration: 0.15, ease: "power2.inOut" },
                end: { scaleX: 1, borderRadius: "50%", duration: 0.15, ease: "power2.out" }
            }
        },

        flip: {
            name: "Flip",
            description: "3D flip rotation between states",
            era: "glass",
            css: `
                .toggle-flip {
                    perspective: 100px;
                }
                .toggle-flip-thumb {
                    transition: transform 0.4s ease-out;
                    transform-style: preserve-3d;
                }
                .toggle-flip.active .toggle-flip-thumb {
                    transform: translateX(20px) rotateY(180deg);
                }
            `,
            gsap: {
                on: { x: 20, rotationY: 180, duration: 0.4, ease: "power2.out" },
                off: { x: 0, rotationY: 0, duration: 0.4, ease: "power2.out" }
            }
        },

        glow: {
            name: "Glow",
            description: "Glowing effect when active",
            era: "glass",
            css: `
                .toggle-glow {
                    transition: all 0.3s ease-out;
                }
                .toggle-glow.active {
                    box-shadow: 0 0 20px var(--primary);
                }
                .toggle-glow-thumb {
                    transition: all 0.3s ease-out;
                }
                .toggle-glow.active .toggle-glow-thumb {
                    box-shadow: 0 0 10px rgba(255,255,255,0.5);
                }
            `,
            gsap: {
                on: {
                    boxShadow: "0 0 20px var(--primary)",
                    duration: 0.3
                },
                off: {
                    boxShadow: "0 0 0px transparent",
                    duration: 0.3
                }
            }
        },

        liquid: {
            name: "Liquid",
            description: "Blob-like deformation during transition",
            era: "organic",
            css: `
                .toggle-liquid-thumb {
                    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .toggle-liquid.transitioning .toggle-liquid-thumb {
                    border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
                }
            `,
            gsap: {
                deform: {
                    borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
                    duration: 0.2,
                    ease: "power2.out"
                },
                settle: {
                    borderRadius: "50%",
                    duration: 0.3,
                    ease: "elastic.out(1, 0.3)"
                }
            }
        }
    },

    // Track styles
    trackStyles: {
        solid: {
            background: "var(--surface)",
            border: "2px solid var(--text)",
            borderRadius: "4px"
        },
        glass: {
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px"
        },
        organic: {
            background: "var(--surface)",
            borderRadius: "20px",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.2)"
        }
    },

    // Parameter ranges
    parameters: {
        speed: { min: 0, max: 100, default: 70, unit: "%" }
    }
};

// Export for global access
window.toggleMotionPresets = toggleMotionPresets;
