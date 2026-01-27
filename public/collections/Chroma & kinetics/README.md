# Chroma & Kinetics

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02.svg)

**A design system laboratory exploring the intersection of color theory and dynamic aesthetics.**

[Live Demo](https://ashborn-047.github.io/chroma-kinetics/) · [Documentation](#documentation) · [Palettes](#color-palettes)

</div>

---

## 📖 Overview

Chroma & Kinetics is an interactive design system lab that lets you explore **40+ curated color palettes** across 4 color theory systems. The application features real-time preview of UI components, a 3D carousel for palette exploration, and a Hybrid Lab mode for discovering unique palette fusion combinations.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **40+ Color Palettes** | Hand-curated palettes across 4 color theory systems |
| **Hybrid Lab Mode** | Mix any two palette systems for unique fusions |
| **Real-time Preview** | See colors applied to UI components instantly |
| **3D Carousel** | Interactive GSAP-powered palette exploration |
| **Color Philosophy** | Detailed breakdowns of each palette's mood and personality |
| **Responsive Design** | Works on desktop and mobile |

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 3.x (CDN) | Utility-first CSS framework |
| **GSAP** | 3.12.2 | Animation library for 3D effects |
| **GSAP ScrollTrigger** | 3.12.2 | Scroll-based animations |
| **GSAP Draggable** | 3.12.2 | Touch/drag interactions |
| **Google Fonts** | - | Inter, Space Grotesk, Playfair Display |
| **Vanilla JavaScript** | ES6+ | No framework dependencies |

---

## 📁 Project Structure

```
chroma-kinetics/
│
├── index.html                    # Main application entry
│
├── css/
│   ├── core/
│   │   ├── variables.css         # CSS custom properties
│   │   ├── base.css              # Base/reset styles
│   │   └── animations.css        # Keyframe animations
│   │
│   ├── sections/
│   │   ├── landing.css           # Landing page styles
│   │   ├── lab.css               # Laboratory interface
│   │   ├── carousel.css          # 3D carousel styles
│   │   └── controls.css          # UI controls
│   │
│   └── components/
│       └── effects.css           # Component effect animations
│
├── js/
│   ├── core/
│   │   └── utils.js              # Utility functions (hexToRgba, etc.)
│   │
│   ├── data/
│   │   ├── philosophy.js         # Color philosophy definitions
│   │   │
│   │   └── palettes/
│   │       ├── index.js          # Palette aggregator
│   │       ├── monochromatic.js  # 10 monochromatic palettes
│   │       ├── analogous.js      # 10 analogous palettes
│   │       ├── complementary.js  # 10 complementary palettes
│   │       ├── triadic.js        # 10 triadic palettes
│   │       └── hybrid.js         # 12 fusion combinations
│   │
│   ├── sections/
│   │   ├── landing.js            # Landing page logic
│   │   ├── lab.js                # Laboratory controls
│   │   ├── carousel.js           # 3D carousel logic
│   │   ├── canvas.js             # Preview canvas rendering
│   │   └── animations.js         # Motion animations
│   │
│   └── main.js                   # Application initialization
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment
│
├── .gitignore
└── README.md
```

---

## 🎨 Color Palettes

### Color Systems

| System | Count | Philosophy |
|--------|-------|------------|
| **Monochromatic** | 10 | Single hue variations - depth through lightness |
| **Analogous** | 10 | Adjacent hues - natural harmony |
| **Complementary** | 10 | Opposite hues - high contrast drama |
| **Triadic** | 10 | Three equidistant hues - vibrant balance |

### Available Palettes

<details>
<summary><b>Monochromatic (10 palettes)</b></summary>

1. Cyberpunk Neon
2. Forest Depths
3. Ocean Abyss
4. Sunset Ember
5. Midnight Purple
6. Arctic Frost
7. Desert Sand
8. Rose Garden
9. Slate Professional
10. Golden Hour

</details>

<details>
<summary><b>Analogous (10 palettes)</b></summary>

1. Tropical Sunset
2. Northern Lights
3. Spring Meadow
4. Autumn Harvest
5. Ocean Breeze
6. Desert Dusk
7. Berry Fusion
8. Citrus Grove
9. Mountain Mist
10. Coral Reef

</details>

<details>
<summary><b>Complementary (10 palettes)</b></summary>

1. Fire & Ice
2. Royal Contrast
3. Nature's Balance
4. Sunset Harbor
5. Electric Dreams
6. Earth & Sky
7. Vintage Pop
8. Neon Nights
9. Classic Elegance
10. Tropical Storm

</details>

<details>
<summary><b>Triadic (10 palettes)</b></summary>

1. Primary Bold
2. Secondary Vibrant
3. Pastel Dreams
4. Retro Arcade
5. Natural Elements
6. Cosmic Journey
7. Urban Art
8. Festival Lights
9. Minimalist Accent
10. Dynamic Energy

</details>

---

## 🔬 Hybrid Lab

When you enable **Hybrid Lab**, you can mix any two palette systems to create fusion combinations:

| Fusion | Category | Description |
|--------|----------|-------------|
| Mono + Analog | **Synthesis** | Depth meets flow |
| Mono + Comp | **Catalyst** | Focus meets drama |
| Mono + Tri | **Paradox** | Minimal meets vibrant |
| Analog + Mono | **Clarity** | Harmony with anchor |
| Analog + Comp | **Tension** | Flow meets contrast |
| Analog + Tri | **Festival** | Natural celebration |
| Comp + Mono | **Refinement** | Drama with restraint |
| Comp + Analog | **Storm** | Explosive harmony |
| Comp + Tri | **Overdrive** | Maximum energy |
| Tri + Mono | **Focus** | Vibrant with clarity |
| Tri + Analog | **Harmony** | Balanced expression |
| Tri + Comp | **Spectacle** | Pure visual drama |

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server for development (http-server, live-server, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/chroma-kinetics.git

# Navigate to directory
cd chroma-kinetics

# Start local development server
npx http-server . -p 3000 -o
```

### Access Points

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Landing page with timeline |
| Click "Enter the Laboratory" | Main design system lab |
| Toggle "Hybrid Lab" | Enable palette mixing mode |

---

## 📚 Documentation

### Palette Data Structure

Each palette follows this structure:

```javascript
{
    name: "Palette Name",
    mood: "Emotional tone description",
    personality: "Design personality traits",
    bestFor: "Ideal use cases",
    emotion: ["tag1", "tag2", "tag3"],
    colors: {
        bg: "#hex",       // Background
        surface: "#hex",  // Surface/card
        primary: "#hex",  // Primary action
        accent: "#hex",   // Accent/highlight
        text: "#hex"      // Text color
    },
    colorRoles: {
        bg: { name: "Role Name", desc: "Description" },
        surface: { name: "Role Name", desc: "Description" },
        primary: { name: "Role Name", desc: "Description" },
        accent: { name: "Role Name", desc: "Description" },
        text: { name: "Role Name", desc: "Description" }
    }
}
```

### Accessing Palettes Programmatically

```javascript
// Access all palettes
window.paletteDB.monochromatic  // Array of 10 palettes
window.paletteDB.analogous      // Array of 10 palettes
window.paletteDB.complementary  // Array of 10 palettes
window.paletteDB.triadic        // Array of 10 palettes

// Access specific palette
const palette = window.paletteDB.monochromatic[0];
console.log(palette.name);   // "Cyberpunk Neon"
console.log(palette.colors); // { bg, surface, primary, accent, text }

// Access hybrid definitions
window.hybridPalettes  // 12 fusion combinations
```

---

## 🌐 Deployment

The project includes a GitHub Actions workflow for automatic deployment:

1. Push to `main` branch
2. GitHub Actions builds and deploys
3. Site available at `https://yourusername.github.io/chroma-kinetics/`

### Manual Deployment

Since this is a static site, you can also deploy to:
- **Netlify** - Drag & drop the folder
- **Vercel** - Import from GitHub
- **Cloudflare Pages** - Connect repository

---

## 📄 License

MIT © 2025

---

<div align="center">

**Built with precision and aesthetic obsession.**

*A study in computational color theory.*

</div>
