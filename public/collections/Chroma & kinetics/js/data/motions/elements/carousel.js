/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - CAROUSEL MOTION PRESETS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Carousel motion defines how content collections transition and respond
 * to user interaction. Drag physics and transition styles create personality.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const carouselMotionPresets = {

    // Available carousel styles
    effects: {

        slide: {
            name: "Slide",
            description: "Traditional horizontal slide transition",
            era: "solid",
            css: `
                .carousel-slide {
                    display: flex;
                    transition: transform 0.3s ease-out;
                }
                .carousel-slide-item {
                    flex-shrink: 0;
                }
            `,
            gsap: {
                slide: { x: "-100%", duration: 0.3, ease: "power2.out" }
            },
            physics: {
                friction: 0.8,
                momentum: false
            }
        },

        deck: {
            name: "Deck",
            description: "Stacked cards with blur and scale depth",
            era: "glass",
            css: `
                .carousel-deck {
                    position: relative;
                    perspective: 1000px;
                }
                .carousel-deck-item {
                    position: absolute;
                    transition: all 0.5s ease-out;
                }
                .carousel-deck-item.back {
                    transform: scale(0.9) translateZ(-100px);
                    filter: blur(5px);
                    opacity: 0.7;
                }
                .carousel-deck-item.front {
                    transform: scale(1) translateZ(0);
                    filter: blur(0);
                    opacity: 1;
                }
            `,
            gsap: {
                next: {
                    scale: 0.9,
                    z: -100,
                    filter: "blur(5px)",
                    opacity: 0.7,
                    duration: 0.5,
                    ease: "power2.out"
                },
                enter: {
                    scale: 1,
                    z: 0,
                    filter: "blur(0px)",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                }
            },
            physics: {
                friction: 0.6,
                momentum: true
            }
        },

        sphere3d: {
            name: "3D Sphere",
            description: "Items arranged on a 3D rotating sphere",
            era: "hybrid",
            css: `
                .carousel-sphere {
                    position: relative;
                    perspective: 1000px;
                    transform-style: preserve-3d;
                }
                .carousel-sphere-item {
                    position: absolute;
                    transition: transform 0.6s ease-out;
                }
            `,
            requiresJS: true, // Complex 3D calculations
            gsap: {
                rotate: {
                    rotationY: "+=360",
                    duration: 20,
                    ease: "none",
                    repeat: -1
                },
                drag: {
                    duration: 0.6,
                    ease: "power2.out"
                }
            },
            physics: {
                friction: 0.4,
                momentum: true,
                autoRotate: true,
                autoRotateSpeed: 0.5
            }
        },

        elastic: {
            name: "Elastic",
            description: "Soft-body physics with compression on drag",
            era: "organic",
            css: `
                .carousel-elastic {
                    display: flex;
                    transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .carousel-elastic-item {
                    flex-shrink: 0;
                    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .carousel-elastic.dragging .carousel-elastic-item {
                    transform: scaleX(0.95);
                }
            `,
            gsap: {
                slide: {
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                },
                compress: {
                    scaleX: 0.95,
                    duration: 0.2,
                    ease: "power2.out"
                },
                release: {
                    scaleX: 1,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                }
            },
            physics: {
                friction: 0.3,
                momentum: true,
                compression: 0.2,
                rebound: 1.5
            }
        },

        fade: {
            name: "Fade",
            description: "Crossfade between items",
            era: "glass",
            css: `
                .carousel-fade {
                    position: relative;
                }
                .carousel-fade-item {
                    position: absolute;
                    opacity: 0;
                    transition: opacity 0.5s ease-out;
                }
                .carousel-fade-item.active {
                    opacity: 1;
                }
            `,
            gsap: {
                fadeOut: { opacity: 0, duration: 0.5, ease: "power2.out" },
                fadeIn: { opacity: 1, duration: 0.5, ease: "power2.out" }
            },
            physics: {
                friction: 1,
                momentum: false
            }
        },

        coverflow: {
            name: "Coverflow",
            description: "iTunes-style angled perspective",
            era: "glass",
            css: `
                .carousel-coverflow {
                    perspective: 1000px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .carousel-coverflow-item {
                    transition: all 0.4s ease-out;
                }
                .carousel-coverflow-item.left {
                    transform: perspective(1000px) rotateY(45deg) translateX(-50px);
                    opacity: 0.6;
                }
                .carousel-coverflow-item.right {
                    transform: perspective(1000px) rotateY(-45deg) translateX(50px);
                    opacity: 0.6;
                }
                .carousel-coverflow-item.center {
                    transform: perspective(1000px) rotateY(0deg) translateZ(50px);
                    opacity: 1;
                }
            `,
            gsap: {
                left: { rotationY: 45, x: -50, opacity: 0.6, duration: 0.4 },
                right: { rotationY: -45, x: 50, opacity: 0.6, duration: 0.4 },
                center: { rotationY: 0, z: 50, opacity: 1, duration: 0.4 }
            },
            physics: {
                friction: 0.5,
                momentum: true
            }
        }
    },

    // Parameter ranges
    parameters: {
        dragPhysics: { min: 0, max: 100, default: 60, unit: "%" },
        autoRotate: { type: "boolean", default: false },
        autoRotateSpeed: { min: 0.1, max: 2, default: 0.5, unit: "x" }
    }
};

// Export for global access
window.carouselMotionPresets = carouselMotionPresets;
