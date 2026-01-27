/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - MONOCHROMATIC PALETTES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * SYSTEM PHILOSOPHY:
 * Monochromatic schemes use a single base hue with variations in saturation 
 * and lightness. This creates visual unity and sophisticated restraint.
 * 
 * COLOR THEORY:
 * Uses tints (adding white), shades (adding black), and tones (adding gray) 
 * of one hue to create depth without chromatic competition.
 * 
 * BEST USE CASES:
 * - Fintech & banking applications (trust, stability)
 * - Legal and enterprise software (authority)
 * - Luxury and premium brands (sophistication)
 * - Focus and productivity tools (minimal distraction)
 * 
 * ACCESSIBILITY NOTES:
 * Excellent contrast ratios when properly balanced. Low cognitive load 
 * due to chromatic simplicity.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const monochromaticPalettes = [
    {
        id: "mono-tech-blue",
        name: "Tech Blue",
        colors: {
            bg: "#0f172a",
            surface: "#1e293b",
            text: "#f8fafc",
            primary: "#3b82f6",
            accent: "#60a5fa"
        },
        mood: "Clinical precision meets digital trust",
        personality: "Conveys authority, reliability, and technological competence. The deep navy grounds while electric blue signals innovation.",
        bestFor: "SaaS dashboards, fintech apps, enterprise software",
        emotion: "Trust, Competence, Stability",
        colorRoles: {
            bg: "Deep navy void - creates focus and reduces eye strain during long sessions",
            surface: "Elevated slate cards - provides layer separation without distraction",
            text: "Near-white frost - maximum readability on dark surfaces",
            primary: "Electric blue - the trust signal, used for key actions and branding",
            accent: "Sky blue highlight - secondary CTAs and hover states"
        }
    },
    {
        id: "mono-deep-forest",
        name: "Deep Forest",
        colors: {
            bg: "#052e16",
            surface: "#064e3b",
            text: "#ecfdf5",
            primary: "#10b981",
            accent: "#34d399"
        },
        mood: "Organic growth and natural vitality",
        personality: "Evokes sustainability, health, and environmental consciousness. A palette that breathes life and renewal.",
        bestFor: "Eco brands, wellness apps, organic products",
        emotion: "Growth, Health, Renewal",
        colorRoles: {
            bg: "Dense forest floor - grounding, protective, immersive",
            surface: "Canopy shade - natural layering like forest depths",
            text: "Morning dew - fresh, readable, alive",
            primary: "Emerald life - growth indicators, success states, nature signals",
            accent: "Spring leaf - highlights that feel organic, not synthetic"
        }
    },
    {
        id: "mono-noir",
        name: "Noir",
        colors: {
            bg: "#000000",
            surface: "#171717",
            text: "#e5e5e5",
            primary: "#525252",
            accent: "#a3a3a3"
        },
        mood: "Sophisticated minimalism and editorial elegance",
        personality: "Pure noir sophistication. Maximum contrast, zero distraction. The palette of luxury fashion and high-end publications.",
        bestFor: "Luxury brands, photography portfolios, editorial sites",
        emotion: "Elegance, Mystery, Premium",
        colorRoles: {
            bg: "True black void - ultimate canvas, lets content be the hero",
            surface: "Charcoal elevation - subtle depth without color contamination",
            text: "Warm white - softer than pure white, easier on eyes",
            primary: "Stone gray - understated actions that don't compete with content",
            accent: "Silver mist - refined highlights for premium touch"
        }
    },
    {
        id: "mono-crimson",
        name: "Crimson",
        colors: {
            bg: "#450a0a",
            surface: "#7f1d1d",
            text: "#fef2f2",
            primary: "#ef4444",
            accent: "#f87171"
        },
        mood: "Passionate intensity and urgent energy",
        personality: "Commands attention through emotional intensity. A palette that demands action and conveys urgency.",
        bestFor: "Sale campaigns, alerts, passion projects, urgent CTAs",
        emotion: "Passion, Urgency, Power",
        colorRoles: {
            bg: "Blood deep - creates immediate emotional response",
            surface: "Ruby elevation - intense but not overwhelming",
            text: "Rose white - warm readability against red heat",
            primary: "Fire red - action buttons that demand clicks",
            accent: "Coral flame - secondary urgency, warm highlights"
        }
    },
    {
        id: "mono-royal-purple",
        name: "Royal Purple",
        colors: {
            bg: "#2e1065",
            surface: "#4c1d95",
            text: "#faf5ff",
            primary: "#a855f7",
            accent: "#c084fc"
        },
        mood: "Creative luxury and mystical wisdom",
        personality: "The color of creativity, royalty, and imagination. Suggests premium experiences with artistic flair.",
        bestFor: "Creative tools, premium services, music and art apps",
        emotion: "Creativity, Luxury, Wisdom",
        colorRoles: {
            bg: "Royal depths - mysterious, creative, premium positioning",
            surface: "Amethyst cave - rich layering for creative interfaces",
            text: "Lavender mist - soft, creative, easy reading",
            primary: "Violet crown - the action color of creativity and premium",
            accent: "Orchid glow - magical highlights, creative sparks"
        }
    },
    {
        id: "mono-slate",
        name: "Slate",
        colors: {
            bg: "#1e293b",
            surface: "#334155",
            text: "#f1f5f9",
            primary: "#64748b",
            accent: "#94a3b8"
        },
        mood: "Professional neutrality and balanced calm",
        personality: "The ultimate neutral. Neither warm nor cool, it provides a stable foundation that lets content shine.",
        bestFor: "Documentation, admin panels, professional tools, IDEs",
        emotion: "Balance, Neutrality, Focus",
        colorRoles: {
            bg: "Steel foundation - professional, unbiased, stable",
            surface: "Graphite cards - clear separation without personality",
            text: "Cloud white - clean, professional readability",
            primary: "Slate core - muted actions that don't distract",
            accent: "Silver accent - subtle highlights for navigation"
        }
    },
    {
        id: "mono-oceanic",
        name: "Oceanic",
        colors: {
            bg: "#0c4a6e",
            surface: "#075985",
            text: "#f0f9ff",
            primary: "#0ea5e9",
            accent: "#38bdf8"
        },
        mood: "Expansive depth and clear communication",
        personality: "Evokes the vastness of the ocean - deep yet clear. Perfect for interfaces requiring clarity and trust.",
        bestFor: "Communication apps, cloud services, travel, shipping",
        emotion: "Clarity, Depth, Openness",
        colorRoles: {
            bg: "Ocean deep - vast, calming, trustworthy",
            surface: "Mid-water blue - visibility with depth",
            text: "Seafoam white - crisp readability like sunlight through water",
            primary: "Sky blue action - clear, inviting interactions",
            accent: "Surf highlight - refreshing accent touches"
        }
    },
    {
        id: "mono-earth",
        name: "Earth",
        colors: {
            bg: "#3f2c22",
            surface: "#5D4037",
            text: "#EFEBE9",
            primary: "#8D6E63",
            accent: "#BCAAA4"
        },
        mood: "Grounded warmth and artisanal authenticity",
        personality: "Rich, organic tones that feel handcrafted. Conveys warmth, heritage, and authentic craftsmanship.",
        bestFor: "Coffee brands, artisan products, heritage brands, bakeries",
        emotion: "Warmth, Authenticity, Comfort",
        colorRoles: {
            bg: "Rich soil - grounding, natural, trustworthy",
            surface: "Aged wood - warmth with character and depth",
            text: "Cream linen - warm readability, not stark",
            primary: "Terra cotta - handcrafted feel, artisan touch",
            accent: "Desert sand - subtle warmth for highlights"
        }
    },
    {
        id: "mono-midnight",
        name: "Midnight",
        colors: {
            bg: "#191928",
            surface: "#222238",
            text: "#E6E6FA",
            primary: "#483D8B",
            accent: "#6A5ACD"
        },
        mood: "Nocturnal focus and contemplative depth",
        personality: "The quiet hours of deep work. A palette for focus modes, meditation apps, and nighttime interfaces.",
        bestFor: "Focus apps, meditation, night mode UIs, reading apps",
        emotion: "Focus, Calm, Introspection",
        colorRoles: {
            bg: "Midnight sky - quiet, focused, introspective",
            surface: "Night clouds - subtle elevation without brightness",
            text: "Moonlight lavender - easy on eyes for night reading",
            primary: "Deep violet - calming actions, not jarring",
            accent: "Starlight purple - gentle highlights like distant stars"
        }
    },
    {
        id: "mono-olive",
        name: "Olive",
        colors: {
            bg: "#1a2e05",
            surface: "#365314",
            text: "#ecfccb",
            primary: "#65a30d",
            accent: "#84cc16"
        },
        mood: "Military precision meets natural resilience",
        personality: "Tactical and grounded. Combines natural camouflage with structured order. Resilient and dependable.",
        bestFor: "Outdoor brands, tactical gear, productivity tools, maps",
        emotion: "Resilience, Order, Strength",
        colorRoles: {
            bg: "Dark olive - protective, serious, grounded",
            surface: "Camo green - utility without flash",
            text: "Lime cream - high contrast for field readability",
            primary: "Tactical green - action buttons with purpose",
            accent: "Lime signal - highlights that pop when needed"
        }
    }
];

// Export for use in main palettes file
window.monochromaticPalettes = monochromaticPalettes;
