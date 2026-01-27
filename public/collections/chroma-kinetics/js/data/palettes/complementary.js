/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHROMA & KINETICS - COMPLEMENTARY PALETTES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * SYSTEM PHILOSOPHY:
 * Complementary schemes pair colors from opposite sides of the color wheel.
 * This creates maximum visual impact through chromatic opposition.
 * 
 * COLOR THEORY:
 * Complementary pairs create afterimage effects and vibrate optically when 
 * placed adjacent. High energy, high attention, high memorability.
 * 
 * BEST USE CASES:
 * - Sports and athletic branding
 * - Gaming interfaces
 * - Entertainment platforms
 * - Sales and promotional campaigns
 * 
 * ACCESSIBILITY NOTES:
 * Vibration risk at high saturation. Avoid placing complements at equal 
 * saturation directly adjacent. Use value differences to create hierarchy.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const complementaryPalettes = [
    {
        id: "comp-knicks",
        name: "Knicks",
        colors: {
            bg: "#172554",
            surface: "#1e3a8a",
            text: "#fff",
            primary: "#f97316",
            accent: "#fdba74"
        },
        mood: "Athletic competition and team pride",
        personality: "Classic sports rivalry in color form. Deep blue foundations with orange fire that demands attention.",
        bestFor: "Sports apps, competition platforms, team branding, gyms",
        emotion: "Competition, Pride, Energy",
        colorRoles: {
            bg: "Stadium night - dramatic, competitive stage",
            surface: "Team blue - loyal, unified base",
            text: "Spotlight white - clear visibility in action",
            primary: "Victory orange - scoring moments, key actions",
            accent: "Warm peach - celebration, success states"
        }
    },
    {
        id: "comp-christmas",
        name: "Christmas",
        colors: {
            bg: "#064e3b",
            surface: "#065f46",
            text: "#f0fdf4",
            primary: "#ef4444",
            accent: "#fca5a5"
        },
        mood: "Festive tradition and celebratory warmth",
        personality: "The eternal holiday palette. Green stability with red celebration - timeless and universally understood.",
        bestFor: "Holiday campaigns, gift shops, seasonal promotions",
        emotion: "Celebration, Tradition, Joy",
        colorRoles: {
            bg: "Evergreen forest - timeless, traditional foundation",
            surface: "Pine layer - natural, festive elevation",
            text: "Snow white - crisp holiday clarity",
            primary: "Ribbon red - gift actions, celebration CTAs",
            accent: "Candy pink - sweet, festive highlights"
        }
    },
    {
        id: "comp-lakers",
        name: "Lakers",
        colors: {
            bg: "#2e1065",
            surface: "#4c1d95",
            text: "#faf5ff",
            primary: "#eab308",
            accent: "#fde047"
        },
        mood: "Championship glory and showtime energy",
        personality: "Purple royalty crowned with gold. A palette that says 'winner' - confident, bold, legendary.",
        bestFor: "Awards platforms, VIP experiences, achievement apps",
        emotion: "Victory, Prestige, Excellence",
        colorRoles: {
            bg: "Royal court - majestic, prestigious foundation",
            surface: "Crown velvet - luxurious, winning elevation",
            text: "Champagne - celebratory, premium readability",
            primary: "Championship gold - trophy moments, wins",
            accent: "Sunburst - glory highlights, achievement"
        }
    },
    {
        id: "comp-cyber",
        name: "Cyber",
        colors: {
            bg: "#020617",
            surface: "#1e293b",
            text: "#fff",
            primary: "#06b6d4",
            accent: "#ef4444"
        },
        mood: "Digital frontier and hacker aesthetics",
        personality: "Neon cyan against void black with red alerts. The palette of cyberpunk futures and digital rebellion.",
        bestFor: "Tech startups, gaming, cybersecurity, AI products",
        emotion: "Innovation, Edge, Disruption",
        colorRoles: {
            bg: "Digital void - the matrix, infinite possibility",
            surface: "Circuit board - technical, structured layer",
            text: "Terminal white - high contrast command line",
            primary: "Neon cyan - innovation, digital actions",
            accent: "Alert red - warnings, critical states"
        }
    },
    {
        id: "comp-fashion",
        name: "Fashion",
        colors: {
            bg: "#0f172a",
            surface: "#334155",
            text: "#f8fafc",
            primary: "#ec4899",
            accent: "#22c55e"
        },
        mood: "Bold runway clash and avant-garde style",
        personality: "Hot pink crashes into emerald - a deliberate fashion statement. Unapologetically bold and editorial.",
        bestFor: "Fashion brands, style apps, trend platforms, magazines",
        emotion: "Boldness, Style, Statement",
        colorRoles: {
            bg: "Backstage black - dramatic, editorial foundation",
            surface: "Runway gray - sophisticated, neutral stage",
            text: "Flash white - photography, clarity",
            primary: "Hot pink - trend actions, statement CTAs",
            accent: "Emerald pop - unexpected, editorial accent"
        }
    },
    {
        id: "comp-navy-gold",
        name: "Navy/Gold",
        colors: {
            bg: "#0f172a",
            surface: "#1e293b",
            text: "#fff",
            primary: "#fbbf24",
            accent: "#3b82f6"
        },
        mood: "Executive authority and institutional trust",
        personality: "The palette of banks, universities, and established institutions. Navy says 'trust me', gold says 'success'.",
        bestFor: "Banking apps, universities, law firms, enterprise",
        emotion: "Authority, Trust, Success",
        colorRoles: {
            bg: "Executive navy - authoritative, trustworthy base",
            surface: "Boardroom blue - professional, serious layer",
            text: "Document white - official, clear reading",
            primary: "Success gold - premium actions, achievements",
            accent: "Trust blue - reliability, stability"
        }
    },
    {
        id: "comp-teal-coral",
        name: "Teal/Coral",
        colors: {
            bg: "#134e4a",
            surface: "#0f766e",
            text: "#ccfbf1",
            primary: "#fb7185",
            accent: "#14b8a6"
        },
        mood: "Tropical paradise and coastal living",
        personality: "Ocean teal meets coral reef pink. Vacation vibes and tropical escapes in every pixel.",
        bestFor: "Travel brands, beach resorts, summer campaigns",
        emotion: "Relaxation, Adventure, Escape",
        colorRoles: {
            bg: "Deep lagoon - tropical, calming foundation",
            surface: "Reef waters - inviting, refreshing layer",
            text: "Sea spray - fresh, readable",
            primary: "Coral reef - exciting, adventurous CTAs",
            accent: "Tropical teal - refreshing highlights"
        }
    },
    {
        id: "comp-indigo-lime",
        name: "Indigo/Lime",
        colors: {
            bg: "#1e1b4b",
            surface: "#312e81",
            text: "#e0e7ff",
            primary: "#84cc16",
            accent: "#6366f1"
        },
        mood: "Electric nights and club culture",
        personality: "Deep indigo night lit by lime neon. The palette of late nights, music venues, and urban energy.",
        bestFor: "Nightlife apps, music platforms, event listings, clubs",
        emotion: "Energy, Nightlife, Excitement",
        colorRoles: {
            bg: "Club darkness - pulsing, energetic void",
            surface: "Velvet indigo - atmospheric, moody layer",
            text: "Glow white - readable under UV",
            primary: "Neon lime - electric CTAs, dance floor energy",
            accent: "Deep indigo - rhythm, flow highlights"
        }
    },
    {
        id: "comp-maroon-sky",
        name: "Maroon/Sky",
        colors: {
            bg: "#450a0a",
            surface: "#7f1d1d",
            text: "#fef2f2",
            primary: "#38bdf8",
            accent: "#ef4444"
        },
        mood: "Heritage meets modern innovation",
        personality: "Classic maroon grounding with sky blue innovation. Tradition embracing the future.",
        bestFor: "Heritage brands modernizing, educational tech",
        emotion: "Tradition, Innovation, Balance",
        colorRoles: {
            bg: "Heritage maroon - traditional, established base",
            surface: "Vintage red - classic, trusted layer",
            text: "Parchment - warm, readable",
            primary: "Innovation blue - modern, forward CTAs",
            accent: "Heritage red - traditional accent"
        }
    },
    {
        id: "comp-violet-leaf",
        name: "Violet/Leaf",
        colors: {
            bg: "#2e1065",
            surface: "#581c87",
            text: "#f3e8ff",
            primary: "#4ade80",
            accent: "#a855f7"
        },
        mood: "Magical gardens and fantasy realms",
        personality: "Mystic violet forests with luminous green foliage. Otherworldly, enchanting, and imaginative.",
        bestFor: "Gaming, fantasy apps, children's education, storytelling",
        emotion: "Magic, Wonder, Imagination",
        colorRoles: {
            bg: "Enchanted forest - magical, mysterious foundation",
            surface: "Mystic purple - fantasy, wonder layer",
            text: "Fairy dust - ethereal readability",
            primary: "Magic leaf - enchanted CTAs, discovery",
            accent: "Spell violet - mystical highlights"
        }
    }
];

// Export for use in main palettes file
window.complementaryPalettes = complementaryPalettes;
