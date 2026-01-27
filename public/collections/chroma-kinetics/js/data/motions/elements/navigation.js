/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - NAVIGATION MOTION PRESETS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Navigation motion defines how menu items and active states transition.
 * Clear feedback is essential for wayfinding and spatial orientation.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const navigationMotionPresets = {

    // Available active state effects
    effects: {

        none: {
            name: "None",
            description: "No active state animation",
            css: "",
            gsap: null
        },

        underline: {
            name: "Underline",
            description: "Classic underline that slides in",
            era: "solid",
            css: `
                .nav-underline {
                    position: relative;
                }
                .nav-underline::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: var(--primary);
                    transition: all 0.2s linear;
                }
                .nav-underline:hover::after,
                .nav-underline.active::after {
                    left: 0;
                    width: 100%;
                }
            `,
            gsap: {
                enter: { width: "100%", left: 0, duration: 0.2, ease: "none" },
                leave: { width: 0, left: "50%", duration: 0.2, ease: "none" }
            }
        },

        morph: {
            name: "Morph",
            description: "Living indicator that morphs between items",
            era: "organic",
            css: `
                .nav-morph-indicator {
                    position: absolute;
                    background: var(--primary);
                    border-radius: 20px;
                    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `,
            requiresJS: true, // Needs position tracking
            gsap: {
                move: {
                    duration: 0.4,
                    ease: "elastic.out(1, 0.5)"
                }
            }
        },

        glow: {
            name: "Glow",
            description: "Active item radiates light",
            era: "glass",
            css: `
                .nav-glow:hover,
                .nav-glow.active {
                    text-shadow: 0 0 10px var(--primary);
                    color: var(--primary);
                    transition: all 0.3s ease-out;
                }
            `,
            gsap: {
                enter: {
                    textShadow: "0 0 10px var(--primary)",
                    duration: 0.3
                },
                leave: {
                    textShadow: "0 0 0px transparent",
                    duration: 0.3
                }
            }
        },

        slide: {
            name: "Slide",
            description: "Background slides behind active item",
            era: "solid",
            css: `
                .nav-slide {
                    position: relative;
                    z-index: 1;
                }
                .nav-slide-bg {
                    position: absolute;
                    background: var(--surface);
                    border-radius: 4px;
                    z-index: -1;
                    transition: all 0.25s ease-out;
                }
            `,
            requiresJS: true,
            gsap: {
                move: { duration: 0.25, ease: "power2.out" }
            }
        },

        fisheye: {
            name: "Fisheye",
            description: "Items scale based on proximity to active",
            era: "glass",
            css: `
                .nav-fisheye {
                    transition: transform 0.3s ease-out;
                }
                .nav-fisheye:hover {
                    transform: scale(1.2);
                }
                .nav-fisheye:hover ~ .nav-fisheye {
                    transform: scale(0.9);
                }
            `,
            requiresJS: true, // Better with JS proximity calculation
            gsap: {
                focus: { scale: 1.2, duration: 0.3, ease: "power2.out" },
                blur: { scale: 0.9, duration: 0.3, ease: "power2.out" }
            }
        },

        dot: {
            name: "Dot",
            description: "Minimal dot indicator below active item",
            era: "hybrid",
            css: `
                .nav-dot {
                    position: relative;
                }
                .nav-dot::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    left: 50%;
                    width: 6px;
                    height: 6px;
                    background: var(--primary);
                    border-radius: 50%;
                    transform: translateX(-50%) scale(0);
                    transition: transform 0.3s ease-out;
                }
                .nav-dot:hover::after,
                .nav-dot.active::after {
                    transform: translateX(-50%) scale(1);
                }
            `,
            gsap: {
                enter: { scale: 1, duration: 0.3, ease: "back.out(2)" },
                leave: { scale: 0, duration: 0.2, ease: "power2.in" }
            }
        }
    },

    // Indicator styles
    indicators: {
        line: { height: 2, offset: 0 },
        dot: { size: 6, offset: 8 },
        box: { padding: 8, radius: 4 },
        blob: { size: 40, radius: 20 }
    },

    // Parameter ranges
    parameters: {
        transitionSpeed: { min: 100, max: 600, default: 250, unit: "ms" },
        indicator: {
            options: ["line", "dot", "box", "blob", "none"],
            default: "line"
        }
    }
};

// Export for global access
window.navigationMotionPresets = navigationMotionPresets;
