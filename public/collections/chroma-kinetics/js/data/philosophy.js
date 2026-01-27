/**
 * CHROMA & KINETICS - Philosophy Database
 * Comprehensive design philosophy and usage context for each color system
 */

const philosophyDB = {
    monochromatic: {
        name: "Monochromatic",
        logic: "Single Hue Cohesion",
        description: "Built from a single base hue with variations in saturation and lightness. Creates visual unity and sophisticated restraint.",
        theory: "Uses tints (adding white), shades (adding black), and tones (adding gray) of one hue to create depth without chromatic competition.",

        // Color role explanations
        background: "Deepest shade of the hue. Provides immersive, focused environment with zero distraction.",
        surface: "Slightly elevated shade. Creates layered depth while maintaining tonal harmony.",
        text: "High-contrast tint for readability. Usually the lightest value in the system.",
        primary: "Mid-saturation core hue. The brand anchor and primary interactive elements.",
        accent: "Lighter tint of primary. Used sparingly for highlights and secondary CTAs.",

        // Usage context
        usage: "Fintech, Legal, Enterprise, Luxury Brands",
        useCases: [
            "Financial dashboards requiring trust",
            "Legal document systems",
            "Luxury brand experiences",
            "Meditation and focus apps"
        ],

        // Motion behavior
        motionLogic: "Fluid gradients shift slowly like water. Subtle luminosity changes create breathing effect.",

        // Accessibility notes
        accessibility: "Excellent contrast ratios when properly balanced. Low cognitive load due to chromatic simplicity."
    },

    analogous: {
        name: "Analogous",
        logic: "Natural Harmony",
        description: "Uses 2-3 adjacent colors on the color wheel. Creates organic, nature-inspired palettes that feel inherently balanced.",
        theory: "Colors share underlying pigment relationships, creating seamless transitions. Found abundantly in nature (sunsets, forests, oceans).",

        background: "Coolest or warmest extreme of the range. Sets the environmental temperature.",
        surface: "Middle ground between background and primary. Bridges the gradient naturally.",
        text: "Neutral or complementary for contrast. Often warm white or cool gray.",
        primary: "Dominant hue in the analogous range. The emotional anchor of the palette.",
        accent: "Adjacent neighbor hue. Adds subtle variety without disrupting harmony.",

        usage: "Wellness, Nature, Food & Beverage, Lifestyle",
        useCases: [
            "Health and wellness applications",
            "Organic food brands",
            "Travel and lifestyle platforms",
            "Environmental causes"
        ],

        motionLogic: "Organic undulation, breathing effect. Colors blend and morph like natural phenomena.",
        accessibility: "Moderate contrast challenges. Requires careful value separation between adjacent hues."
    },

    complementary: {
        name: "Complementary",
        logic: "Dynamic Tension",
        description: "Pairs colors from opposite sides of the color wheel. Creates maximum visual impact through chromatic opposition.",
        theory: "Complementary pairs create afterimage effects and vibrate optically when placed adjacent. High energy, high attention.",

        background: "One complement at deep saturation. Creates a stage for the opposing accent.",
        surface: "Desaturated version of background. Reduces intensity while maintaining family.",
        text: "Neutral or tinted toward accent. Bridges the opposing forces.",
        primary: "Dominant complement. Usually the cooler or more recessive color for large areas.",
        accent: "Opposing complement. Used sparingly for maximum impact on CTAs and alerts.",

        usage: "Sports, Gaming, Entertainment, Youth Brands",
        useCases: [
            "Sports team branding",
            "Gaming interfaces",
            "Entertainment platforms",
            "Sale and promotion campaigns"
        ],

        motionLogic: "High-frequency pulse, elastic tension. Colors push and pull against each other.",
        accessibility: "Vibration risk at high saturation. Avoid placing complements at equal saturation adjacent."
    },

    triadic: {
        name: "Triadic",
        logic: "Balanced Diversity",
        description: "Uses three colors equally spaced on the color wheel (120° apart). Creates vibrant, playful palettes with inherent balance.",
        theory: "Triangular distribution ensures no single color dominates. Each hue has equal visual weight, creating democratic energy.",

        background: "Most recessive of the three. Usually the coolest or darkest to ground the composition.",
        surface: "Neutral or desaturated. Prevents triadic chaos by providing visual rest.",
        text: "High contrast neutral. White or near-white to cut through chromatic complexity.",
        primary: "Structural anchor. The hue that defines the primary UI framework.",
        accent: "Playful counterpoint. Used for emphasis, notifications, and tertiary actions.",

        usage: "Children's Products, Creative Tools, Dashboards, Media",
        useCases: [
            "Educational platforms",
            "Creative software interfaces",
            "Data visualization dashboards",
            "Media and entertainment apps"
        ],

        motionLogic: "Playful rotation, carousel mechanics. Colors cycle and interchange positions.",
        accessibility: "Complex cognitive load. Best used with significant value differences between the three hues."
    }
};

// Export for global access
window.philosophyDB = philosophyDB;
