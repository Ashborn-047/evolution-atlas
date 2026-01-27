# Aether-Sync // Shader[LAB]

![Aether-Sync-Hero](https://img.shields.io/badge/WebGL-2.0-cyan) ![Vite](https://img.shields.io/badge/Vite-Ready-purple) ![Three.js](https://img.shields.io/badge/Three.js-R160-white)

> [!IMPORTANT]
> **Live Demo**: [https://ashborn-047.github.io/Aether-Sync/](https://ashborn-047.github.io/Aether-Sync/)

**Aether-Sync** is a high-performance WebGL visual system designed for next-generation user interfaces. More than just a collection of shaders, it is a cinematic dashboard exploration of mathematics, light, and procedural generation. It bridges the gap between raw GLSL experimentation and production-ready UI components.

---

## ⚡ Core Features

- 🌌 **Cinematic Landing**: A high-contrast, HUD-inspired hero section with dynamic GLSL backgrounds and a responsive "Safe Zone" for branding.
- 📺 **Infinite Gallery**: A virtualized shader library using `IntersectionObserver` to manage WebGL contexts efficiently. It prevents browser GPU memory overflow by only instantiating active shaders.
- 📟 **HUD Animation Engine**: Programmatic typewriter and "boot-loader" effects that mimic authentic terminal cold-starts.
- 🧪 **Premium Micro-kernels**: 20+ curated fragment shaders ranging from high-fidelity **Plasma Balls** to denoised **Retro Grids**.
- 🛠️ **Modular Architecture**: Clean ES6 class-based renderer (`ShaderCanvas`) designed to be dropped into any vanilla or framework-based web project.

---

## 📂 Project Structure

```text
Aether-Sync/
├── public/                 # Static assets
├── src/
│   ├── core/
│   │   └── ShaderCanvas.js # Main WebGL/Three.js orchestrator
│   ├── data/
│   │   └── shaders.js      # Central shader registry & metadata
│   ├── shaders/            # Individual GLSL Micro-kernels
│   │   ├── binary_stream.frag
│   │   ├── cosmic_nebula.frag
│   │   ├── crt_terminal.frag
│   │   ├── cyber_circuit.frag
│   │   ├── digital_rain.frag
│   │   ├── flux_ring.frag
│   │   ├── hex_forcefield.frag
│   │   ├── neon_sunset.frag
│   │   ├── oldschool_plasma.frag
│   │   └── warp_speed.frag (and 10+ more)
│   ├── styles/
│   │   └── main.css        # Neon-noir UI design system
│   └── main.js             # Application lifecycle & view management
├── index.html              # Core entry point & HUD layout
├── vite.config.js          # Raw-loader configuration for FRAG assets
└── package.json            # Dependency management
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ashborn-047/Aether-Sync.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```

---

## 📟 Tech Stack & Internal Systems

### Graphics & Performance
- **Three.js (R160)**: Leveraged for its robust WebGL abstraction and scene graph management.
- **Context Virtualization**: The app automatically disposes of Three.js scenes and WebGL renderers as shaders exit the viewport, maintaining a steady 60FPS even with dozens of active effects in the library.
- **GLSL ES 3.0**: All effects are written in pure GLSL, utilizing `fwidth` for denoised grids and complex domain warping for organic plasma effects.

### UI Aesthetic
- **Glassmorphism**: HUD elements use high-blur backdrops to maintain legibility over vibrant, moving backgrounds.
- **Z-Index Layering**: A strictly audited layering system ensures navigation always remains accessible, with shaders flowing "behind" the header.

---

## 🏗️ Developer Usage Guide

### 1. How to add a New Shader
1. Create a `.frag` file in `src/shaders/`.
2. Standard Uniforms provided: `u_time`, `u_resolution`, `u_mouse`.
3. Register in `src/data/shaders.js`:
   ```javascript
   import myShaderCode from '../shaders/my_shader.frag?raw';
   {
       id: 'unique-id',
       name: 'Vibrant Effect',
       code: myShaderCode,
       desc: 'Cinematic noise simulation.'
   }
   ```

### 2. Using the `ShaderCanvas` Core
```javascript
import { ShaderCanvas } from './core/ShaderCanvas';

const instance = new ShaderCanvas(
    document.getElementById('target'), 
    { code: myGLSLCode }, 
    true // Enable mouse tracking
);
```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Visualizing mathematics through light, code, and time.*
