/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - TYPOGRAPHY MOTION PRESETS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Typography motion adds life to text without sacrificing readability.
 * Effects should be subtle enough to enhance rather than distract.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const typographyMotionPresets = {

    // Available text effects
    effects: {

        static: {
            name: "Static",
            description: "No animation - pure readability",
            era: "solid",
            css: "",
            gsap: null
        },

        breathe: {
            name: "Breathe",
            description: "Subtle scale pulsing like breathing",
            era: "organic",
            css: `
                .typo-breathe {
                    animation: typoBreathe 3s ease-in-out infinite;
                }
                @keyframes typoBreathe {
                    0%, 100% { transform: scale(0.98); opacity: 0.9; }
                    50% { transform: scale(1.02); opacity: 1; }
                }
            `,
            gsap: {
                breathe: {
                    scale: 1.02,
                    opacity: 1,
                    duration: 1.5,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1
                }
            }
        },

        wave: {
            name: "Wave",
            description: "Characters animate in sequence like a wave",
            era: "organic",
            css: `
                .typo-wave span {
                    display: inline-block;
                    animation: typoWave 2s ease-in-out infinite;
                }
                @keyframes typoWave {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
            `,
            requiresJS: true, // Needs to wrap each character
            gsap: {
                wave: {
                    y: -5,
                    duration: 0.5,
                    ease: "sine.inOut",
                    stagger: 0.05,
                    yoyo: true,
                    repeat: -1
                }
            }
        },

        fade: {
            name: "Fade",
            description: "Gentle opacity pulse",
            era: "glass",
            css: `
                .typo-fade {
                    animation: typoFade 4s ease-in-out infinite;
                }
                @keyframes typoFade {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 1; }
                }
            `,
            gsap: {
                fade: {
                    opacity: 1,
                    duration: 2,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1
                }
            }
        },

        glitch: {
            name: "Glitch",
            description: "Digital distortion effect",
            era: "solid",
            css: `
                .typo-glitch {
                    position: relative;
                }
                .typo-glitch::before,
                .typo-glitch::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                .typo-glitch::before {
                    left: 2px;
                    text-shadow: -2px 0 #ff0000;
                    clip-path: inset(0 0 0 0);
                    animation: glitchBefore 3s infinite linear alternate-reverse;
                }
                .typo-glitch::after {
                    left: -2px;
                    text-shadow: 2px 0 #00ffff;
                    clip-path: inset(0 0 0 0);
                    animation: glitchAfter 2s infinite linear alternate-reverse;
                }
                @keyframes glitchBefore {
                    0% { clip-path: inset(40% 0 61% 0); }
                    20% { clip-path: inset(92% 0 1% 0); }
                    40% { clip-path: inset(43% 0 1% 0); }
                    60% { clip-path: inset(25% 0 58% 0); }
                    80% { clip-path: inset(54% 0 7% 0); }
                    100% { clip-path: inset(58% 0 43% 0); }
                }
                @keyframes glitchAfter {
                    0% { clip-path: inset(65% 0 14% 0); }
                    20% { clip-path: inset(17% 0 77% 0); }
                    40% { clip-path: inset(91% 0 5% 0); }
                    60% { clip-path: inset(40% 0 43% 0); }
                    80% { clip-path: inset(12% 0 69% 0); }
                    100% { clip-path: inset(89% 0 3% 0); }
                }
            `,
            requiresJS: false
        },

        typewriter: {
            name: "Typewriter",
            description: "Characters appear one by one",
            era: "solid",
            css: `
                .typo-typewriter {
                    overflow: hidden;
                    border-right: 2px solid;
                    white-space: nowrap;
                    animation: 
                        typewriter 3s steps(40, end),
                        blink 0.75s step-end infinite;
                }
                @keyframes typewriter {
                    from { width: 0; }
                    to { width: 100%; }
                }
                @keyframes blink {
                    50% { border-color: transparent; }
                }
            `,
            gsap: null // CSS animation preferred
        },

        gradient: {
            name: "Gradient Flow",
            description: "Animated color gradient through text",
            era: "glass",
            css: `
                .typo-gradient {
                    background: linear-gradient(
                        90deg, 
                        var(--primary), 
                        var(--accent), 
                        var(--primary)
                    );
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientFlow 3s ease-in-out infinite;
                }
                @keyframes gradientFlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `,
            gsap: null // CSS animation preferred
        }
    },

    // Parameter ranges
    parameters: {
        intensity: { min: 0, max: 100, default: 40, unit: "%" },
        speed: {
            options: ["slow", "medium", "fast"],
            default: "medium",
            values: { slow: 4000, medium: 2000, fast: 1000 }
        }
    }
};

// Export for global access
window.typographyMotionPresets = typographyMotionPresets;
