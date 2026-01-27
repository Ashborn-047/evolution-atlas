# 🌊 Liquid Shader UI

> High-performance WebGL liquid shaders and fluid UI components for next-generation web experiences. Features interactive ripple effects, rainy pond simulations, metallic mercury surfaces, and canvas-based rain overlays.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

![Liquid UI Hero](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop)

---

## ✨ Features

- **4 Liquid Effects** — Interactive Ripple, Rainy Pond, Canvas Rain, Liquid Mercury
- **5 UI Experiments** — Navigation, Buttons, Cards, Carousel, Status Tags
- **WebGL Powered** — Hardware-accelerated rendering via Three.js
- **Canvas 2D Rain** — Performant fallback for rain effects
- **Fully Responsive** — Works on all screen sizes
- **Modular Components** — Each effect is a standalone, reusable component
- **Zero Config Examples** — Standalone HTML files work out of the box

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/liquid-shader-ui.git
cd liquid-shader-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
liquid-shader-ui/
├── src/
│   ├── components/           # Core effect components
│   │   ├── RippleEffect.jsx      # WebGL interactive ripple
│   │   ├── PondEffect.jsx        # WebGL rainy pond
│   │   ├── MercuryEffect.jsx     # WebGL metallic surface
│   │   ├── RainOverlay.jsx       # Canvas 2D rain particles
│   │   ├── ClickRippleEffect.jsx # Click-triggered water ripples
│   │   ├── CodeBlock.jsx         # Syntax highlighting
│   │   └── index.js              # Component exports
│   │
│   ├── experiments/          # UI experiment showcases
│   │   ├── NavigationExperiment.jsx   # Glass navbar + rain
│   │   ├── ButtonsExperiment.jsx      # Click ripple button
│   │   ├── CardsExperiment.jsx        # Surface cards (3 types)
│   │   ├── CarouselExperiment.jsx     # App-style carousel (4 slides)
│   │   ├── StatusTagsExperiment.jsx   # Weather status tag
│   │   └── index.js
│   │
│   ├── views/
│   │   └── ExperimentsView.jsx   # Experiments showcase page
│   │
│   ├── App.jsx               # Main application
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles + Tailwind
│
├── examples/                 # Standalone HTML examples
│   ├── ripple/index.html         # Interactive ripple demo
│   ├── pond/index.html           # Rainy pond demo
│   ├── rain/index.html           # Canvas rain demo
│   ├── mercury/index.html        # Metallic mercury demo
│   └── README.md
│
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 Effects Overview

### 1. Interactive Ripple (WebGL)
Mouse-reactive fluid waves using vertex displacement shaders.

```jsx
import { RippleEffect } from './components/RippleEffect';

<RippleEffect id="my-ripple" opacity={0.6} />
```

**Configuration:**
- `metalness: 0.75` — Reflective surface
- `roughness: 0.25` — Smooth water
- `displacementScale: 5` — Wave intensity

---

### 2. Rainy Pond (WebGL)
Procedural rain simulation with continuous ripples.

```jsx
import { PondEffect } from './components/PondEffect';

<PondEffect id="my-pond" opacity={0.6} />
```

**Configuration:**
- `metalness: 0.1` — Matte water
- `roughness: 0.9` — Diffuse surface
- `displacementScale: 10` — Strong ripples
- `rain: true` — Enable rain drops

---

### 3. Rain Overlay (Canvas 2D)
Falling rain particles rendered with Canvas 2D for performance.

```jsx
import { RainOverlay } from './components/RainOverlay';

<RainOverlay density={0.5} className="your-class" />
```

**Props:**
- `density` (0.1 - 1.0) — Rain intensity

---

### 4. Liquid Mercury (WebGL)
Hyper-reflective metallic surface mimicking molten silver.

```jsx
import { MercuryEffect } from './components/MercuryEffect';

<MercuryEffect id="my-mercury" opacity={0.6} />
```

**Configuration:**
- `metalness: 1.0` — Full metal
- `roughness: 0.05` — Mirror-like
- `displacementScale: 15` — Heavy displacement

---

### 5. Click Ripple (Canvas 2D)
Click-triggered water ripples using wave propagation physics.

```jsx
import { ClickRippleEffect } from './components/ClickRippleEffect';

<ClickRippleEffect className="your-class" />
```

Click anywhere to create expanding water ripples.

---

## 🧪 UI Experiments

The project includes 5 pre-built UI experiments showcasing the effects:

| Experiment | Description |
|------------|-------------|
| **Navigation** | Glass navbar with rain overlay effect |
| **Buttons** | Click-triggered water ripple button |
| **Cards** | 3 surface cards (Mercury, Pond, Rain) |
| **Carousel** | 4-slide app carousel (Music, Weather, Lo-Fi, Dashboard) |
| **Status Tags** | Weather status indicator with rain |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite 6** | Build Tool & Dev Server |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Three.js** | WebGL 3D rendering |
| **threejs-components** | Liquid background library |
| **Lucide React** | Icon library |
| **PostCSS** | CSS processing |

---

## 📖 How It Was Built

This project was built using AI-assisted development:

1. **Initial Setup** — Vite + React + Tailwind CSS scaffold
2. **Effect Components** — WebGL effects using threejs-components CDN
3. **Canvas 2D Rain** — Custom rain particle system
4. **Click Ripple** — Wave propagation algorithm (physics-based)
5. **UI Experiments** — Showcase components for each effect
6. **Standalone Examples** — Zero-dependency HTML demos

### Key Technical Decisions:
- **Modular Architecture** — Each effect in its own file for easy reuse
- **CDN-based Three.js** — No build complexity for WebGL
- **Canvas 2D fallback** — Rain overlay for better performance
- **Tailwind for styling** — Rapid UI development

---

## 🎯 Standalone Examples

Each example in `/examples` is a complete, standalone HTML file:

```bash
# Open directly in browser
open examples/ripple/index.html

# Or serve locally
npx serve examples
```

No Node.js or build tools required!

---

## ⚙️ Configuration

### WebGL Effects (via threejs-components)

```javascript
// Access the liquid plane after initialization
app.liquidPlane.material.metalness = 0.75;  // 0-1
app.liquidPlane.material.roughness = 0.25;  // 0-1
app.liquidPlane.uniforms.displacementScale.value = 5;  // Wave intensity
app.setRain(true);  // Enable/disable rain
```

### Tailwind Theme

Custom colors and utilities are defined in `tailwind.config.js`.

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use in your projects!

---

## 🙏 Credits

- **Three.js** — WebGL library
- **threejs-components** — Liquid background effects
- **Unsplash** — Background images
- **Lucide** — Icon set

---

<p align="center">
  <strong>Built with Three.js & Passion ✨</strong>
</p>
