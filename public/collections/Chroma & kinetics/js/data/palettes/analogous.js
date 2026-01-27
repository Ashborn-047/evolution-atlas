/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - ANALOGOUS PALETTES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * SYSTEM PHILOSOPHY:
 * Analogous schemes use 2-3 adjacent colors on the color wheel. This creates 
 * organic, nature-inspired palettes that feel inherently balanced.
 * 
 * COLOR THEORY:
 * Colors share underlying pigment relationships, creating seamless transitions.
 * Found abundantly in nature (sunsets, forests, oceans, autumn leaves).
 * 
 * BEST USE CASES:
 * - Wellness and health applications
 * - Nature and environmental brands
 * - Food and beverage products
 * - Lifestyle and travel platforms
 * 
 * ACCESSIBILITY NOTES:
 * Moderate contrast challenges. Requires careful value separation between 
 * adjacent hues to maintain readability.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const analogousPalettes = [
    {
        id: "ana-spring",
        name: "Spring",
        colors: {
            bg: "#064e3b",
            surface: "#065f46",
            text: "#ecfdf5",
            primary: "#84cc16",
            accent: "#10b981"
        },
        mood: "Fresh beginnings and vibrant renewal",
        personality: "The first warm days after winter. Lime and teal dance together like new growth in morning light.",
        bestFor: "Wellness apps, plant shops, nutrition trackers, fitness",
        emotion: "Freshness, Growth, Vitality",
        colorRoles: {
            bg: "Deep teal forest - grounding, fertile, alive",
            surface: "Emerald glade - natural elevation with life",
            text: "Morning dew white - crisp, fresh readability",
            primary: "Lime burst - energetic actions like new shoots",
            accent: "Teal harmony - balanced highlights, natural flow"
        }
    },
    {
        id: "ana-sunset",
        name: "Sunset",
        colors: {
            bg: "#4a044e",
            surface: "#701a75",
            text: "#fdf4ff",
            primary: "#d946ef",
            accent: "#f43f5e"
        },
        mood: "Dramatic twilight and bold femininity",
        personality: "The magic hour before darkness. Magenta bleeds into rose like the sky's final performance.",
        bestFor: "Beauty brands, event apps, lifestyle platforms, dating",
        emotion: "Drama, Romance, Confidence",
        colorRoles: {
            bg: "Deep magenta dusk - dramatic, emotional stage",
            surface: "Fuchsia twilight - rich, passionate depth",
            text: "Pink champagne - soft, luxurious readability",
            primary: "Hot magenta - bold, confident actions",
            accent: "Coral kiss - warm, romantic highlights"
        }
    },
    {
        id: "ana-fire",
        name: "Fire",
        colors: {
            bg: "#450a0a",
            surface: "#7f1d1d",
            text: "#fff7ed",
            primary: "#f97316",
            accent: "#ef4444"
        },
        mood: "Blazing intensity and raw energy",
        personality: "Pure thermal energy. Orange flames licking red embers. A palette that radiates heat and urgency.",
        bestFor: "Food delivery, fitness apps, flash sales, gaming",
        emotion: "Energy, Hunger, Action",
        colorRoles: {
            bg: "Ember core - intense, consuming heat",
            surface: "Red hot coals - active, urgent surface",
            text: "Warm light - readable against fire",
            primary: "Flame orange - hungry, active CTAs",
            accent: "Fire red - urgent emphasis"
        }
    },
    {
        id: "ana-aqua",
        name: "Aqua",
        colors: {
            bg: "#0c4a6e",
            surface: "#0369a1",
            text: "#f0f9ff",
            primary: "#06b6d4",
            accent: "#3b82f6"
        },
        mood: "Crystal waters and serene depths",
        personality: "Cyan meets cobalt like tropical shallows meeting the deep. Refreshing, clear, and trustworthy.",
        bestFor: "Water brands, spa services, pool companies, aquariums",
        emotion: "Serenity, Clarity, Refreshment",
        colorRoles: {
            bg: "Deep ocean - vast, calming foundation",
            surface: "Clear lagoon - visibility with depth",
            text: "Sea foam white - crisp clarity",
            primary: "Cyan wave - refreshing, inviting actions",
            accent: "Blue depth - trust and stability"
        }
    },
    {
        id: "ana-berry",
        name: "Berry",
        colors: {
            bg: "#4c0519",
            surface: "#831843",
            text: "#fff1f2",
            primary: "#db2777",
            accent: "#9333ea"
        },
        mood: "Rich indulgence and sensory pleasure",
        personality: "Deep berry wines and wild blackberries. Luxurious, indulgent, and unapologetically bold.",
        bestFor: "Wine brands, premium chocolate, romance apps, luxury",
        emotion: "Indulgence, Sensuality, Richness",
        colorRoles: {
            bg: "Blackberry depth - rich, luxurious foundation",
            surface: "Wine stain - indulgent, warm surface",
            text: "Rose cream - soft, romantic readability",
            primary: "Berry pink - luscious, inviting actions",
            accent: "Grape royalty - premium, mysterious highlights"
        }
    },
    {
        id: "ana-citrus",
        name: "Citrus",
        colors: {
            bg: "#3f3006",
            surface: "#713f12",
            text: "#fefce8",
            primary: "#eab308",
            accent: "#f97316"
        },
        mood: "Sunny optimism and zesty warmth",
        personality: "Lemon sunshine meeting tangerine warmth. Energetic without aggression, warm without heat.",
        bestFor: "Summer brands, beverage apps, happiness platforms, kids",
        emotion: "Joy, Optimism, Warmth",
        colorRoles: {
            bg: "Caramel shadow - warm, grounding base",
            surface: "Amber glow - sunny, inviting surface",
            text: "Cream sunshine - bright, happy readability",
            primary: "Lemon gold - joyful, optimistic CTAs",
            accent: "Tangerine pop - energetic highlights"
        }
    },
    {
        id: "ana-aurora",
        name: "Aurora",
        colors: {
            bg: "#022c22",
            surface: "#115e59",
            text: "#f0fdfa",
            primary: "#14b8a6",
            accent: "#3b82f6"
        },
        mood: "Northern lights dancing in darkness",
        personality: "Teal and blue shimmer like the aurora borealis. Mysterious yet inviting, cosmic yet grounded.",
        bestFor: "Astronomy apps, Nordic brands, night photography, science",
        emotion: "Wonder, Mystery, Tranquility",
        colorRoles: {
            bg: "Arctic night - mysterious, vast, cosmic",
            surface: "Deep teal - dancing light layer",
            text: "Northern glow - ethereal readability",
            primary: "Aurora teal - magical, inviting actions",
            accent: "Sky ribbon - celestial highlights"
        }
    },
    {
        id: "ana-dusk",
        name: "Dusk",
        colors: {
            bg: "#1e1b4b",
            surface: "#312e81",
            text: "#eef2ff",
            primary: "#6366f1",
            accent: "#a855f7"
        },
        mood: "Twilight contemplation and creative flow",
        personality: "Indigo fading to violet like the last moments before stars appear. Thoughtful and imaginative.",
        bestFor: "Music apps, creative tools, journaling, meditation",
        emotion: "Creativity, Reflection, Imagination",
        colorRoles: {
            bg: "Deep indigo - contemplative, creative space",
            surface: "Violet hour - inspiring, thoughtful surface",
            text: "Starlight - soft, dreamy readability",
            primary: "Indigo action - creative, inspiring CTAs",
            accent: "Purple dream - imaginative highlights"
        }
    },
    {
        id: "ana-moss",
        name: "Moss",
        colors: {
            bg: "#14532d",
            surface: "#166534",
            text: "#f0fdf4",
            primary: "#22c55e",
            accent: "#84cc16"
        },
        mood: "Forest floor tranquility and natural wisdom",
        personality: "Deep forest greens with touches of lime. The palette of ancient woods and sustainable futures.",
        bestFor: "Environmental orgs, hiking apps, garden planners, organic",
        emotion: "Peace, Wisdom, Sustainability",
        colorRoles: {
            bg: "Ancient forest - wise, grounding, peaceful",
            surface: "Moss carpet - soft, natural elevation",
            text: "Filtered light - gentle, natural reading",
            primary: "Living green - growth, positive actions",
            accent: "New leaf - fresh, optimistic highlights"
        }
    },
    {
        id: "ana-peach",
        name: "Peach",
        colors: {
            bg: "#431407",
            surface: "#7c2d12",
            text: "#fff7ed",
            primary: "#fb923c",
            accent: "#f87171"
        },
        mood: "Warm embrace and gentle comfort",
        personality: "Soft coral meeting warm amber. Like a sunset hug - inviting, comforting, and nurturing.",
        bestFor: "Parenting apps, comfort food brands, hospitality, care",
        emotion: "Comfort, Nurturing, Softness",
        colorRoles: {
            bg: "Terracotta warmth - comforting, nurturing base",
            surface: "Sienna hug - warm, welcoming surface",
            text: "Cream warmth - soft, gentle readability",
            primary: "Peach glow - comforting, inviting CTAs",
            accent: "Coral blush - tender, caring highlights"
        }
    }
];

// Export for use in main palettes file
window.analogousPalettes = analogousPalettes;
