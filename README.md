# The Evolution Atlas

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

**A Digital Museum of Interface Design**

*An interactive showcase exploring how UI/UX, typography, and shaders have transformed across decades.*

[Live Demo](https://ashborn-047.github.io/evolution-atlas/) · [Report Bug](https://github.com/Ashborn-047/evolution-atlas/issues) · [Request Feature](https://github.com/Ashborn-047/evolution-atlas/issues)

</div>

---

## 🎯 Overview

The Evolution Atlas is a comprehensive research project exploring the evolution of modern web design. It unifies **7 curated experiments** spanning kinetic typography, liquid shaders, color theory systems, and ambient computing interfaces—each representing a thesis on the future of digital interaction.

### Key Features

- **7 Interactive Exhibits** — Full-page horizontal scroll experience showcasing each research project
- **Era Timeline** — Visual journey through 4 decades of UI design (Solid State → Glass Age → Organic Flow → Hybrid)
- **Live Demos & Source Code** — Direct links to deployed experiments and GitHub repositories
- **WebGL Background** — Global 3D canvas with Three.js for immersive visuals
- **Typewriter Footer** — Animated quotes from the Living Interface Ecosystem philosophy
- **Responsive Design** — Optimized for desktop, tablet, and mobile experiences

---

## 📚 The Exhibits

| # | Exhibit | Category | Description | Tech Stack |
|---|---------|----------|-------------|------------|
| 01 | **Kinetic Typography** | Gallery | 9 text experiments (Elastic, Glitch, Vapor, Fluid) | GSAP, Three.js, SVG Filters |
| 02 | **Liquid Shader UI** | Gallery | Ripple, Pond, Mercury, Rain WebGL effects | Three.js, WebGL, Canvas 2D |
| 03 | **Aether Sync** | Gallery | 20+ GLSL shaders, cinematic dashboard | WebGL 2.0, GLSL ES 3.0 |
| 04 | **Shader Vault** | Library | 11 React shaders with profile cards | React 18, Three.js, GSAP |
| 05 | **Chroma & Kinetics** | Documentary | 40+ color palettes, Hybrid Lab mode | GSAP, ScrollTrigger, Tailwind |
| 06 | **UI Evolution Atlas** | Documentary | 36 components across 4 design eras | GSAP, Lucide Icons, CSS Grid |
| 07 | **Living Interface Ecosystem** | Documentary | 6-phase morphing narrative experience | React 19, TypeScript, Vite |

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3 | UI component library |
| **TypeScript** | 5.6 | Type-safe JavaScript |
| **Vite** | 6.0 | Build tool & dev server |
| **Tailwind CSS** | 4.0 | Utility-first styling |

### 3D Graphics & Animation
| Technology | Version | Purpose |
|------------|---------|---------|
| **Three.js** | 0.170 | WebGL 3D rendering |
| **React Three Fiber** | 8.17 | React renderer for Three.js |
| **@react-three/drei** | 9.117 | Useful helpers for R3F |
| **Motion** | 11.15 | Animation library (Framer Motion) |
| **GSAP** | 3.14 | Professional-grade animations |

### UI Components
| Technology | Purpose |
|------------|---------|
| **Radix UI** | Accessible component primitives |
| **Lucide React** | Modern icon library |
| **Monaco Editor** | VSCode-powered code editor |
| **Zustand** | Lightweight state management |

---

## 📁 Project Structure

```
evolution-atlas/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment
├── collections/                # Original research repositories
│   ├── Chroma & kinetics/
│   ├── Interface design/
│   ├── Interface ecosystem and environment/
│   ├── Liquid Shader Ui/
│   ├── Shaders V2/
│   ├── Shaders for UI/
│   └── Typography/
├── src/
│   ├── components/
│   │   ├── atlas/              # Exhibit components
│   │   │   ├── AtlasGrid.tsx
│   │   │   ├── ExhibitDetail.tsx
│   │   │   ├── HorizontalExhibits.tsx
│   │   │   └── PortalCard.tsx
│   │   ├── canvas/             # Global WebGL canvas
│   │   ├── documentary/        # Documentary scroll mode
│   │   ├── exhibits/           # 3D exhibit scenes
│   │   ├── library/            # Shader vault components
│   │   └── ui/                 # Shadcn/UI components
│   ├── lib/
│   │   ├── exhibits.ts         # Exhibit data & types
│   │   ├── shaders.ts          # GLSL shader code
│   │   ├── store.ts            # Zustand state store
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # Main application
│   ├── main.tsx                # Entry point
│   └── globals.css             # Global styles & Tailwind config
├── index.html                  # HTML template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Ashborn-047/evolution-atlas.git

# Navigate to directory
cd evolution-atlas

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 🎨 Design System

### Color Palette

```css
/* Cyber-Organic "The Void" Theme */
--void: #050505;              /* Background */
--surface: #1A1A1A;           /* Elevated surfaces */
--accent-cyan: #00F0FF;       /* Primary accent */
--accent-magenta: #FF00FF;    /* Secondary accent */
--accent-bio: #00FF88;        /* Tertiary accent */

/* Era Colors */
--era-solid: #ff3333;         /* 1995 - Solid State */
--era-glass: #06b6d4;         /* 2010 - Glass Age */
--era-fluid: #22c55e;         /* 2020 - Organic Flow */
--era-hybrid: #8b5cf6;        /* 2025 - Hybrid Architecture */
```

### Typography

- **Headlines**: Georgia, serif (Editorial style)
- **Body**: JetBrains Mono, monospace (Technical aesthetic)
- **UI**: System font stack

---

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages:

1. Push to `main` branch
2. GitHub Actions builds the project
3. Deploys to `gh-pages` branch
4. Available at `https://ashborn-047.github.io/evolution-atlas/`

### Manual Deployment

```bash
# Build for production
npm run build

# Preview locally
npm run preview
```

---

## 📖 The Philosophy

> *"The interface is no longer waiting."*
> — Living Interface Ecosystem

This project visualizes the shift from **Deterministic Tools** to **Ambient Environments**:

| Era | Paradigm | User Role | Interface Role |
|-----|----------|-----------|----------------|
| **1980s** | Command Line | Operator | Executor |
| **2000s** | GUI | Controller | Responder |
| **2020s** | Touch/Voice | Director | Anticipator |
| **2030s** | Ambient | Inhabitant | **Participant** |

We are moving from interfaces that *wait* for instructions to interfaces that *infer* intent. From tools we *use* to spaces we *inhabit*.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Three.js** — WebGL graphics library
- **GSAP** — Animation platform
- **Radix UI** — Accessible component primitives
- **Tailwind CSS** — Utility-first CSS framework
- **Vite** — Next-generation build tool

---

<div align="center">

**Built with React, Three.js, WebGL, and GSAP**

*A study in computational aesthetics and interface evolution.*

© 2025 The Evolution Atlas. All shaders open source.

</div>
