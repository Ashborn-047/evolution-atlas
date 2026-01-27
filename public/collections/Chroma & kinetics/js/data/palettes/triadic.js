/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - TRIADIC PALETTES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * SYSTEM PHILOSOPHY:
 * Triadic schemes use three colors equally spaced on the color wheel (120° 
 * apart). This creates vibrant, playful palettes with inherent balance.
 * 
 * COLOR THEORY:
 * Triangular distribution ensures no single color dominates. Each hue has 
 * equal visual weight, creating democratic energy and vibrant diversity.
 * 
 * BEST USE CASES:
 * - Children's products and education
 * - Creative and design tools
 * - Data visualization dashboards
 * - Entertainment and media apps
 * 
 * ACCESSIBILITY NOTES:
 * Complex cognitive load. Best used with significant value differences 
 * between the three hues to maintain clear hierarchy.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const triadicPalettes = [
    {
        id: "tri-playground",
        name: "Playground",
        colors: {
            bg: "#1e1b4b",
            surface: "#312e81",
            text: "#fff",
            primary: "#ef4444",
            accent: "#eab308"
        },
        mood: "Youthful energy and playful creativity",
        personality: "Primary colors at play. Blue, red, and yellow in their boldest form - pure childhood joy.",
        bestFor: "Kids apps, toy brands, playful startups, education",
        emotion: "Playfulness, Joy, Creativity",
        colorRoles: {
            bg: "Play mat blue - stable, fun foundation",
            surface: "Building block - structured play layer",
            text: "Bright white - child-friendly clarity",
            primary: "Fire truck red - action, excitement CTAs",
            accent: "Sunshine yellow - joy, discovery highlights"
        }
    },
    {
        id: "tri-joker",
        name: "Joker",
        colors: {
            bg: "#2e1065",
            surface: "#581c87",
            text: "#faf5ff",
            primary: "#22c55e",
            accent: "#f97316"
        },
        mood: "Chaotic creativity and unpredictable fun",
        personality: "Purple chaos with green mischief and orange surprise. Expect the unexpected.",
        bestFor: "Gaming, entertainment, novelty products, comedy",
        emotion: "Chaos, Fun, Surprise",
        colorRoles: {
            bg: "Wild card purple - unpredictable, chaotic base",
            surface: "Mischief violet - playful, surprising layer",
            text: "Trick white - clear amid chaos",
            primary: "Prank green - unexpected, surprising CTAs",
            accent: "Joke orange - punchline highlights"
        }
    },
    {
        id: "tri-cmy",
        name: "CMY",
        colors: {
            bg: "#111827",
            surface: "#1f2937",
            text: "#fff",
            primary: "#06b6d4",
            accent: "#d946ef"
        },
        mood: "Print precision and design craft",
        personality: "Cyan, Magenta, Yellow - the foundation of print. A palette for designers who respect the craft.",
        bestFor: "Design tools, print services, creative agencies",
        emotion: "Precision, Craft, Professionalism",
        colorRoles: {
            bg: "Press black - professional, precise foundation",
            surface: "Registration gray - technical, clean layer",
            text: "Paper white - print-perfect readability",
            primary: "Cyan process - precise, professional CTAs",
            accent: "Magenta mark - creative, bold highlights"
        }
    },
    {
        id: "tri-retrowave",
        name: "Retrowave",
        colors: {
            bg: "#271a3e",
            surface: "#3d2b56",
            text: "#ebd4f5",
            primary: "#00e5ff",
            accent: "#ff007d"
        },
        mood: "80s nostalgia and synthwave dreams",
        personality: "Neon dreams of a future that never was. Hot pink and electric cyan over purple sunset.",
        bestFor: "Retro gaming, synth music, nostalgia products",
        emotion: "Nostalgia, Dreams, Coolness",
        colorRoles: {
            bg: "Sunset grid - retro horizon, endless road",
            surface: "Miami dusk - 80s glow, neon-ready",
            text: "VHS glow - vintage, warm readability",
            primary: "Electric cyan - synthwave CTAs",
            accent: "Hot pink - retro pop highlights"
        }
    },
    {
        id: "tri-earthy-triad",
        name: "Earthy Triad",
        colors: {
            bg: "#292524",
            surface: "#44403c",
            text: "#d6d3d1",
            primary: "#16a34a",
            accent: "#ea580c"
        },
        mood: "Organic harvest and natural abundance",
        personality: "Earth, leaf, and fruit. The colors of harvest season - grounded, natural, abundant.",
        bestFor: "Farm brands, organic products, outdoor gear",
        emotion: "Abundance, Nature, Authenticity",
        colorRoles: {
            bg: "Rich soil - grounding, fertile foundation",
            surface: "Stone path - natural, weathered layer",
            text: "Dried grass - organic, natural reading",
            primary: "Harvest green - growth, nature CTAs",
            accent: "Pumpkin orange - autumn, abundance highlights"
        }
    },
    {
        id: "tri-pastel-pop",
        name: "Pastel Pop",
        colors: {
            bg: "#475569",
            surface: "#64748b",
            text: "#f0f9ff",
            primary: "#f472b6",
            accent: "#fcd34d"
        },
        mood: "Soft optimism and gentle playfulness",
        personality: "Muted pastels with pops of pink and gold. Approachable, friendly, and non-threatening.",
        bestFor: "Wellness brands, baby products, friendly apps",
        emotion: "Softness, Approachability, Calm",
        colorRoles: {
            bg: "Soft gray-blue - calm, approachable base",
            surface: "Gentle slate - friendly, soft layer",
            text: "Cloud white - light, airy reading",
            primary: "Soft pink - gentle, friendly CTAs",
            accent: "Butter yellow - warm, happy highlights"
        }
    },
    {
        id: "tri-vivid",
        name: "Vivid",
        colors: {
            bg: "#000",
            surface: "#18181b",
            text: "#fff",
            primary: "#3b82f6",
            accent: "#ef4444"
        },
        mood: "High contrast clarity and decisive action",
        personality: "Maximum contrast, maximum clarity. Blue for trust, red for action, black for focus.",
        bestFor: "Task apps, productivity tools, decision platforms",
        emotion: "Clarity, Decision, Focus",
        colorRoles: {
            bg: "Pure black - zero distraction focus",
            surface: "Near black - subtle elevation",
            text: "Pure white - maximum clarity",
            primary: "Action blue - trusted, reliable CTAs",
            accent: "Alert red - important, urgent highlights"
        }
    },
    {
        id: "tri-candy",
        name: "Candy",
        colors: {
            bg: "#4a044e",
            surface: "#701a75",
            text: "#fae8ff",
            primary: "#22d3ee",
            accent: "#facc15"
        },
        mood: "Sweet indulgence and joyful excess",
        personality: "Cotton candy meets lemon drop. A sugar rush of color that delights and energizes.",
        bestFor: "Candy brands, party apps, celebration platforms",
        emotion: "Sweetness, Delight, Celebration",
        colorRoles: {
            bg: "Grape candy - sweet, fun foundation",
            surface: "Berry swirl - delicious, playful layer",
            text: "Marshmallow - sweet, soft reading",
            primary: "Blue raspberry - exciting, sweet CTAs",
            accent: "Lemon drop - tangy, surprising highlights"
        }
    },
    {
        id: "tri-primary",
        name: "Primary",
        colors: {
            bg: "#172554",
            surface: "#1e40af",
            text: "#eff6ff",
            primary: "#dc2626",
            accent: "#facc15"
        },
        mood: "Bold fundamentals and confident basics",
        personality: "Red, Blue, Yellow - the original trio. Timeless, bold, and universally understood.",
        bestFor: "Educational content, toy brands, bold statements",
        emotion: "Confidence, Basics, Boldness",
        colorRoles: {
            bg: "Classic blue - foundational, trusted base",
            surface: "Primary blue - bold, clear layer",
            text: "Clean white - pure, simple reading",
            primary: "Primary red - bold, confident CTAs",
            accent: "Primary yellow - energy, attention highlights"
        }
    },
    {
        id: "tri-electric",
        name: "Electric",
        colors: {
            bg: "#0f172a",
            surface: "#334155",
            text: "#f8fafc",
            primary: "#d946ef",
            accent: "#84cc16"
        },
        mood: "Neon nights and electric energy",
        personality: "Magenta lightning and lime voltage. High energy that buzzes and crackles with excitement.",
        bestFor: "Music festivals, energy drinks, nightlife",
        emotion: "Electricity, Excitement, Vibrancy",
        colorRoles: {
            bg: "Power off - dark before the surge",
            surface: "Conductor gray - ready for current",
            text: "Spark white - bright, electric reading",
            primary: "Magenta surge - high-voltage CTAs",
            accent: "Lime shock - electric, energizing highlights"
        }
    }
];

// Export for use in main palettes file
window.triadicPalettes = triadicPalettes;
