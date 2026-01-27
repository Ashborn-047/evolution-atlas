# 🎨 Shader Vault

A curated React library of high-fidelity generative shaders featuring WebGL, Three.js, and Canvas 2D effects.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r169-000000?logo=three.js&logoColor=white)

---

## ✨ Features

- **11 Unique Shader Effects** — From particle systems to WebGL2 vortex simulations
- **Premium Landing Page** — Grid-based showcase with live shader previews
- **Profile Cards** — Each shader integrates with a styled profile card component
- **Back Navigation** — Easy navigation back to the vault from any shader page
- **Inline Styles** — Zero CSS dependencies for maximum portability

---

## 🙏 Credits & Inspiration

Many of the shaders in this collection are inspired by the amazing work at **[21st.dev](https://21st.dev)** — a fantastic resource for modern UI components and effects.

This project is built for the community. If you find these shaders useful, please also check out and support the original creators at 21st.dev!

---

## 🖼️ Shader Collection

| # | Name | Technology | Description |
|---|------|------------|-------------|
| 01 | **Neural Ripple** | Three.js | Heatmap-style wave propagation shader |
| 02 | **Dot Screen** | Canvas 2D | Halftone pattern effect with dynamic sizing |
| 03 | **Meteor Shower** | Canvas 2D | Particle trails with velocity-based motion |
| 04 | **Aurora** | Canvas 2D | Organic gradient flow simulation |
| 05 | **Flickering Grid** | Canvas 2D | Randomized cell-based animation |
| 06 | **Spiral Singularity** | GSAP + Canvas | Spiral particle engine with easing |
| 07 | **Dotted Surface** | Three.js | Neural plane with sine wave particles |
| 08 | **Vortex Particles** | Canvas 2D | Simplex noise-driven particle flow |
| 09 | **Silk Animation** | Canvas 2D | Generative flowing silk texture |
| 10 | **Raining Letters** | DOM + CSS | Matrix-style falling character engine |
| 11 | **Vortex Profiles** | WebGL2 | Radial procedural simulation with presets |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 6 (ES modules, HMR) |
| **3D Graphics** | Three.js r169 |
| **Animations** | GSAP, Framer Motion |
| **Styling** | Inline CSS (zero dependencies) |

---

## 📁 Project Structure

```
shader-vault/
├── src/
│   ├── LandingPage.tsx       # Main landing page with live previews
│   ├── BackButton.tsx        # Reusable back navigation component
│   ├── App.tsx               # App entry point
│   └── entry-*.tsx           # Individual shader/card entries
├── shaders/
│   ├── Shader 1/
│   │   ├── shader.tsx        # Fullscreen shader component
│   │   ├── card.tsx          # Profile card with shader BG
│   │   ├── shader.html       # HTML entry for fullscreen demo
│   │   └── card.html         # HTML entry for card experiment
│   └── ... (through Shader 11)
├── index.html                # Main entry point
├── vite.config.ts            # Vite multi-page configuration
└── package.json
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Ashborn-047/shader-vault.git
cd shader-vault

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create a branch** for your feature (`git checkout -b feature/amazing-shader`)
3. **Commit** your changes (`git commit -m 'Add amazing shader'`)
4. **Push** to the branch (`git push origin feature/amazing-shader`)
5. **Open a Pull Request**

### Ideas for Contributions

- New shader effects (WebGL, Canvas 2D, SVG, CSS)
- Performance optimizations
- Mobile responsiveness improvements
- Accessibility enhancements
- Documentation improvements

---

## 📜 License

MIT — Feel free to use, modify, and distribute.

---

<p align="center">
  <strong>Crafted with React, Three.js & Canvas</strong><br>
  <sub>Inspired by <a href="https://21st.dev">21st.dev</a> • © 2025 Shader Vault</sub>
</p>
