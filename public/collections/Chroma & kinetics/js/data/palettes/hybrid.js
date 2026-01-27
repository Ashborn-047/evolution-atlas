/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - CROSS-SYSTEM FUSIONS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * FUSION PHILOSOPHY:
 * When two different color systems are combined, they create something entirely
 * new - a FUSION. Each fusion has its own unique identity, not just a "hybrid"
 * label. These are new color personalities born from the marriage of two systems.
 * 
 * HOW FUSIONS WORK:
 * - BASE SYSTEM: Provides bg, surface, and text colors (the environment)
 * - ACCENT SYSTEM: Provides primary and accent colors (the interactions)
 * - RESULT: A new visual identity with characteristics from both parents
 * 
 * NAMING CONVENTION:
 * Each fusion has:
 * - category: The type of fusion (e.g., "Synthesis", "Convergence", "Catalyst")
 * - name: The unique identity name (e.g., "Precision Nature")
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const hybridPalettes = {

    // ════════════════════════════════════════════════════════════════════════
    // MONOCHROMATIC BASE FUSIONS
    // The clinical foundation softened or energized by accent systems
    // ════════════════════════════════════════════════════════════════════════

    "monochromatic-analogous": {
        id: "fusion-mono-ana",
        category: "Synthesis",
        name: "Precision Nature",
        base: "monochromatic",
        accent: "analogous",
        mood: "Clinical efficiency wrapped in organic warmth",
        personality: "The sterile precision of monochromatic foundations meets the organic flow of analogous accents. Perfect for professional tools that need to feel approachable rather than cold.",
        emotion: "Professional, Warm, Balanced",
        bestFor: "Healthcare apps, eco-fintech, sustainable business tools",
        colorStrategy: {
            bg: "Unified base creates focus - single-hue depth for concentration",
            surface: "Tonal elevation maintains professionalism without distraction",
            text: "High-contrast readability from monochromatic heritage",
            primary: "Organic neighbor hue softens clinical edges, feels alive",
            accent: "Adjacent warmth adds approachability to stern interfaces"
        },
        designNotes: "Use the analogous accents sparingly - they should 'warm up' the interface without compromising the monochromatic clarity. Best for CTAs and success states."
    },

    "monochromatic-complementary": {
        id: "fusion-mono-comp",
        category: "Catalyst",
        name: "Controlled Explosion",
        base: "monochromatic",
        accent: "complementary",
        mood: "Restraint punctuated by strategic drama",
        personality: "Monochromatic calm provides the stage for complementary color bombs. Maximum impact from minimal color usage - every accent screams for attention.",
        emotion: "Dramatic, Controlled, Impactful",
        bestFor: "Sale conversions, alert systems, gaming scoreboards",
        colorStrategy: {
            bg: "Neutral void creates maximum contrast for complements",
            surface: "Quiet layering doesn't compete with accent drama",
            text: "Clean readability ensures message isn't lost in color clash",
            primary: "Opposite-hue explosion demands immediate attention",
            accent: "Complementary variation for secondary urgency levels"
        },
        designNotes: "The complementary accents will pop HARD against monochromatic bases. Use with restraint - every colored element will feel like a shout."
    },

    "monochromatic-triadic": {
        id: "fusion-mono-tri",
        category: "Paradox",
        name: "Ordered Chaos",
        base: "monochromatic",
        accent: "triadic",
        mood: "Structural discipline with playful energy bursts",
        personality: "The calm of monochrome containing triadic energy. Like a museum gallery housing abstract art - the container is serious, the contents are vibrant.",
        emotion: "Playful, Structured, Dynamic",
        bestFor: "Creative portfolios, design agencies, educational games",
        colorStrategy: {
            bg: "Stable, serious foundation grounds the triadic play",
            surface: "Professional layering contains the color energy",
            text: "Clear communication through neutral tones",
            primary: "One point of the triad - bold, confident primary actions",
            accent: "Second triadic point - creates visual rhythm and surprise"
        },
        designNotes: "The triadic accents will create a playful personality within a professional structure. Good for brands that are 'serious about fun'."
    },

    // ════════════════════════════════════════════════════════════════════════
    // ANALOGOUS BASE FUSIONS
    // The organic foundation sharpened or electrified by accent systems
    // ════════════════════════════════════════════════════════════════════════

    "analogous-monochromatic": {
        id: "fusion-ana-mono",
        category: "Clarity",
        name: "Natural Focus",
        base: "analogous",
        accent: "monochromatic",
        mood: "Organic environments with focused precision",
        personality: "Flowing analogous backgrounds meet sharp monochromatic interactions. Like a spa with minimalist signage - natural vibes, clear direction.",
        emotion: "Calm, Clear, Natural",
        bestFor: "Wellness apps, meditation tools, nature documentation",
        colorStrategy: {
            bg: "Organic color wash creates immersive, calming environment",
            surface: "Neighboring hues flow naturally between layers",
            text: "Soft contrast maintains the peaceful mood",
            primary: "Single-hue focus cuts through organic flow - clear CTAs",
            accent: "Monochromatic precision for secondary actions"
        },
        designNotes: "The monochromatic accents will feel like 'waypoints' in an organic landscape. Use them to guide without disrupting the flow."
    },

    "analogous-complementary": {
        id: "fusion-ana-comp",
        category: "Tension",
        name: "Nature's Clash",
        base: "analogous",
        accent: "complementary",
        mood: "Organic harmony disrupted by bold opposition",
        personality: "Flowing analogous palettes suddenly shocked by complementary opposites. Like a sunset ocean crashing against red rocks - natural drama.",
        emotion: "Dynamic, Natural, Bold",
        bestFor: "Adventure travel, outdoor sports, ecological activism",
        colorStrategy: {
            bg: "Organic gradient creates environmental immersion",
            surface: "Neighboring hues maintain natural continuity",
            text: "Warm or cool neutral depending on analogous family",
            primary: "Complementary shock - the unexpected that demands action",
            accent: "Opposition variation for dramatic emphasis"
        },
        designNotes: "This fusion creates powerful visual tension. The complementary accents will feel 'unnatural' against the organic base - use this dissonance intentionally."
    },

    "analogous-triadic": {
        id: "fusion-ana-tri",
        category: "Festival",
        name: "Wild Bloom",
        base: "analogous",
        accent: "triadic",
        mood: "Organic celebration with vibrant energy",
        personality: "Nature's palette meets carnival colors. Flowing backgrounds with joyful, playful interactions - like wildflowers in a summer meadow.",
        emotion: "Joyful, Energetic, Free",
        bestFor: "Music festivals, children's outdoor brands, creative wellness",
        colorStrategy: {
            bg: "Organic warmth or coolness sets the natural stage",
            surface: "Analogous flow creates comfortable layering",
            text: "Readable against organic backgrounds",
            primary: "Triadic burst - unexpected color brings energy",
            accent: "Second triadic point adds playful variety"
        },
        designNotes: "A high-energy fusion. The triadic accents will feel celebratory against the organic flow. Best for brands that combine nature with creativity."
    },

    // ════════════════════════════════════════════════════════════════════════
    // COMPLEMENTARY BASE FUSIONS
    // The dramatic foundation refined or amplified by accent systems
    // ════════════════════════════════════════════════════════════════════════

    "complementary-monochromatic": {
        id: "fusion-comp-mono",
        category: "Refinement",
        name: "Drama Refined",
        base: "complementary",
        accent: "monochromatic",
        mood: "Bold foundations with sophisticated restraint",
        personality: "The drama of complementary backgrounds tamed by refined monochromatic interactions. High impact with elegant execution.",
        emotion: "Bold, Sophisticated, Premium",
        bestFor: "Luxury sports, premium gaming, executive entertainment",
        colorStrategy: {
            bg: "Dramatic complementary base commands attention",
            surface: "Tension-filled layering maintains energy",
            text: "High contrast ensures drama doesn't hurt readability",
            primary: "Monochromatic restraint - elegant amid the drama",
            accent: "Sophisticated tonal variation for secondary elements"
        },
        designNotes: "The monochromatic accents will feel 'adult' against the loud base. Good for gaming/sports brands targeting premium audiences."
    },

    "complementary-analogous": {
        id: "fusion-comp-ana",
        category: "Storm",
        name: "Warm Clash",
        base: "complementary",
        accent: "analogous",
        mood: "Electric opposition softened by organic warmth",
        personality: "Complementary tension meets analogous harmony. Like a thunderstorm over a meadow - dramatic but not harsh, powerful but natural.",
        emotion: "Powerful, Organic, Dynamic",
        bestFor: "Extreme sports, natural energy drinks, adventure fitness",
        colorStrategy: {
            bg: "Complementary drama creates the intense stage",
            surface: "Opposition layers maintain high energy",
            text: "Clear amid the visual tension",
            primary: "Analogous softening - organic amid the clash",
            accent: "Neighboring hue adds natural flow to interactions"
        },
        designNotes: "The analogous accents will 'humanize' the aggressive complementary base. Good for high-energy brands that want to feel approachable."
    },

    "complementary-triadic": {
        id: "fusion-comp-tri",
        category: "Overdrive",
        name: "Maximum Chaos",
        base: "complementary",
        accent: "triadic",
        mood: "Full chromatic overdrive - all colors firing",
        personality: "Complementary foundations with triadic accents - maximum color chaos. For brands that refuse to be ignored. Subtlety is not in the vocabulary.",
        emotion: "Chaotic, Electric, Unforgettable",
        bestFor: "EDM festivals, extreme gaming, viral campaigns",
        colorStrategy: {
            bg: "Complementary clash sets the aggressive tone",
            surface: "High-energy layering amplifies the chaos",
            text: "Must be extremely high contrast to survive",
            primary: "Triadic injection - adding a third dimension of color",
            accent: "Fourth color point - complete chromatic saturation"
        },
        designNotes: "WARNING: This is the most visually aggressive fusion. Use only for brands that WANT to overwhelm. Not for extended reading or focus tasks."
    },

    // ════════════════════════════════════════════════════════════════════════
    // TRIADIC BASE FUSIONS
    // The playful foundation focused or intensified by accent systems
    // ════════════════════════════════════════════════════════════════════════

    "triadic-monochromatic": {
        id: "fusion-tri-mono",
        category: "Focus",
        name: "Playful Precision",
        base: "triadic",
        accent: "monochromatic",
        mood: "Vibrant diversity with focused interactions",
        personality: "The balanced energy of triadic foundations with sharp monochromatic actions. Like a colorful playground with clean, clear signage.",
        emotion: "Playful, Clear, Balanced",
        bestFor: "Educational platforms, family apps, creative productivity",
        colorStrategy: {
            bg: "Three-color foundation creates vibrant diversity",
            surface: "Balanced layers maintain the democratic color spread",
            text: "Neutral tones cut through the color variety",
            primary: "Single-hue focus provides clarity amid color chaos",
            accent: "Tonal variation maintains the focused feel"
        },
        designNotes: "The monochromatic accents will feel like 'islands of calm' in the triadic sea. Good for making actions clear in colorful environments."
    },

    "triadic-analogous": {
        id: "fusion-tri-ana",
        category: "Harmony",
        name: "Rainbow Flow",
        base: "triadic",
        accent: "analogous",
        mood: "Diverse foundations with organic transitions",
        personality: "Triadic balance meets analogous flow. Colors everywhere but with natural connections between interaction elements. Vibrant but not jarring.",
        emotion: "Vibrant, Flowing, Harmonious",
        bestFor: "Art education, creative children's apps, design inspiration tools",
        colorStrategy: {
            bg: "Three-hue foundation creates color-rich environment",
            surface: "Balanced diversity in layering",
            text: "Readable amid the rainbow",
            primary: "Analogous connection creates natural interaction flow",
            accent: "Neighboring hue adds organic warmth to actions"
        },
        designNotes: "The analogous accents will create 'connective tissue' between the triadic elements. Good for interfaces that need to feel both diverse AND cohesive."
    },

    "triadic-complementary": {
        id: "fusion-tri-comp",
        category: "Spectacle",
        name: "Color Explosion",
        base: "triadic",
        accent: "complementary",
        mood: "Democratic diversity with dramatic emphasis",
        personality: "Triadic balance provides the stage, complementary drama provides the star moments. Every color gets a voice, but some speak louder.",
        emotion: "Dramatic, Balanced, Memorable",
        bestFor: "Entertainment platforms, party apps, creative competitions",
        colorStrategy: {
            bg: "Three-color democracy creates inclusive foundation",
            surface: "Balanced layers share the color space",
            text: "Must compete with high color saturation",
            primary: "Complementary drama cuts through the balance - LOOK HERE",
            accent: "Opposition creates memorable secondary moments"
        },
        designNotes: "The complementary accents will 'win' the visual competition. Use this to create strong hierarchies within already colorful interfaces."
    }
};

// Export for global access
window.hybridPalettes = hybridPalettes;

console.log('[Chroma & Kinetics] Fusion palettes loaded:', Object.keys(hybridPalettes).length, 'combinations');
