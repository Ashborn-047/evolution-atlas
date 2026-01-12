export interface Exhibit {
  id: string;
  title: string;
  category: 'Gallery' | 'Library' | 'Documentary';
  tagline: string;
  year: string;
  tech: string[];
  hypothesis: string;
  architecture: string;
  implications: string;
  shaderKey?: 'liquidShader' | 'kineticType' | 'aetherSync';
  githubUrl?: string;
  liveUrl?: string;
  collectionPath?: string;
}

export const EXHIBITS: Exhibit[] = [
  {
    id: 'kinetic-typography',
    title: 'Kinetic Typography',
    category: 'Gallery',
    tagline: 'Language as a living organism',
    year: '2024',
    tech: ['GSAP', 'Three.js', 'SVG Filters', 'CSS Animations'],
    hypothesis:
      'Typography need not remain static. By treating letterforms as particles subject to physical forces, we can create text that responds organically to user presence—transforming communication from declaration to conversation.',
    architecture:
      '9 unique experiments: ELASTIC (cursor proximity physics), LAYERS (chromatic aberration), ECLIPSE (3D rotation shadows), GLITCH (clip-path fragmentation + RGB split), VAPOR (staggered blur clones), PIXELS (character scrambling), AURA (animated box-shadow), VERTEX (Three.js WebGL geometry), and FLUID (SVG feTurbulence displacement).',
    implications:
      'This approach suggests a future where UI text actively participates in the interface—retreating when not needed, emphasizing itself when relevant. It challenges the notion that text must be passive to be legible.',
    shaderKey: 'kineticType',
    githubUrl: 'https://github.com/Ashborn-047/kinetic-typography',
    liveUrl: 'https://ashborn-047.github.io/kinetic-typography/',
    collectionPath: 'collections/Typography',
  },
  {
    id: 'liquid-shader-ui',
    title: 'Liquid Shader UI',
    category: 'Gallery',
    tagline: 'Interfaces that breathe and flow',
    year: '2024',
    tech: ['Three.js', 'WebGL', 'Canvas 2D', 'Tailwind CSS'],
    hypothesis:
      'Skeuomorphism failed not because of its realism, but because it was static. True digital materiality requires physics. By simulating fluid viscosity in shaders, we create UI surfaces that feel tangible without sacrificing performance.',
    architecture:
      '4 liquid effects (Interactive Ripple, Rainy Pond, Liquid Mercury, Canvas Rain) + 5 UI experiments (Navigation, Buttons, Cards, Carousel, Status Tags). WebGL-powered hardware acceleration with Canvas 2D fallbacks for performance.',
    implications:
      'Fluid UIs could serve as ambient indicators—visual viscosity representing system load, flow direction indicating data transfer. The interface becomes a living medium that communicates state without explicit widgets.',
    shaderKey: 'liquidShader',
    githubUrl: 'https://github.com/Ashborn-047/liquid-shader-ui',
    liveUrl: 'https://ashborn-047.github.io/liquid-shader-ui/',
    collectionPath: 'collections/Liquid Shader Ui',
  },
  {
    id: 'aether-sync',
    title: 'Aether Sync',
    category: 'Gallery',
    tagline: 'Cinematic GLSL shader dashboard',
    year: '2025',
    tech: ['WebGL 2.0', 'Three.js', 'GLSL ES 3.0', 'Vite'],
    hypothesis:
      'Network traffic is invisible, yet it defines our digital reality. By creating a cinematic dashboard of procedural shaders, we visualize the mathematical beauty underlying digital interfaces.',
    architecture:
      '20+ curated fragment shaders including Plasma Balls, Retro Grids, Binary Streams, Cosmic Nebulas, CRT Terminals, Cyber Circuits, Digital Rain, Flux Rings, Hex Forcefields, Neon Sunsets, and Warp Speed effects. Virtualized gallery using IntersectionObserver for GPU memory management.',
    implications:
      'This technique enables real-time visual systems that are both informative and aesthetically compelling. HUD animation engine with typewriter boot-loader effects mimics authentic terminal cold-starts.',
    shaderKey: 'aetherSync',
    githubUrl: 'https://github.com/Ashborn-047/Aether-Sync',
    liveUrl: 'https://ashborn-047.github.io/Aether-Sync/',
    collectionPath: 'collections/Shaders for UI',
  },
  {
    id: 'shader-vault',
    title: 'Shader Vault',
    category: 'Library',
    tagline: '11 generative shaders, ready to deploy',
    year: '2025',
    tech: ['React 18', 'TypeScript', 'Three.js', 'GSAP', 'Framer Motion'],
    hypothesis:
      'Creativity requires access to primitives. By exposing raw shader code alongside running exhibits, we democratize advanced graphics—no longer mystical, but documented and remixable.',
    architecture:
      '11 unique effects: Neural Ripple (heatmap waves), Dot Screen (halftone patterns), Meteor Shower (particle trails), Aurora (gradient flow), Flickering Grid (randomized cells), Spiral Singularity (GSAP spiral engine), Dotted Surface (sine wave particles), Vortex Particles (simplex noise flow), Silk Animation (generative flowing texture), Raining Letters (Matrix-style), and Vortex Profiles (WebGL2 radial simulation).',
    implications:
      'Open-sourcing techniques at the code level accelerates the field. When developers can inspect and modify production shaders, we build collective fluency in GPU programming.',
    githubUrl: 'https://github.com/Ashborn-047/shader-vault',
    liveUrl: 'https://ashborn-047.github.io/shader-vault/',
    collectionPath: 'collections/Shaders V2',
  },
  {
    id: 'chroma-kinetics',
    title: 'Chroma & Kinetics',
    category: 'Documentary',
    tagline: 'Color theory meets dynamic aesthetics',
    year: '2024',
    tech: ['GSAP', 'ScrollTrigger', 'Draggable', 'Tailwind CSS'],
    hypothesis:
      'Color is typically treated as a static property. But perception of color is temporal—we notice change more than absolute values. A design system laboratory exploring the intersection of color theory and dynamic aesthetics.',
    architecture:
      '40+ curated palettes across 4 color systems (Monochromatic, Analogous, Complementary, Triadic). Hybrid Lab mode for mixing palette systems. Real-time preview of UI components, 3D carousel for palette exploration, and detailed color philosophy breakdowns.',
    implications:
      'Chromatic scrolling could replace traditional progress bars. Imagine documentation where each section has a unique hue, creating muscle memory through color association.',
    githubUrl: 'https://github.com/Ashborn-047/chroma-kinetics',
    liveUrl: 'https://ashborn-047.github.io/chroma-kinetics/',
    collectionPath: 'collections/Chroma & kinetics',
  },
  {
    id: 'ui-evolution-atlas',
    title: 'UI Evolution Atlas',
    category: 'Documentary',
    tagline: '36 components across 4 design eras',
    year: '2025',
    tech: ['GSAP', 'ScrollTrigger', 'Lucide Icons', 'CSS Grid'],
    hypothesis:
      'Portfolios are usually linear. But UI design is historical—each era influences the next. By documenting 36 components across Solid State (1995), Glass Age (2010), Organic Flow (2020), and Hybrid Architecture (2025), we map the interface design landscape.',
    architecture:
      'Era-specific modals with unique styling and button effects. Animated infinite scroll timeline. Component library with HTML/CSS/GSAP code snippets. Custom cursor with hover states. Parallax header with translucent navigation.',
    implications:
      'Understanding the evolution of UI design informs future innovation. Each era contributes techniques that persist: terminal aesthetics from Solid, transparency from Glass, organic motion from Fluid, and spatial depth from Hybrid.',
    githubUrl: 'https://github.com/Ashborn-047/ui-evolution-atlas',
    liveUrl: 'https://ashborn-047.github.io/ui-evolution-atlas/',
    collectionPath: 'collections/Interface design',
  },
  {
    id: 'living-interface',
    title: 'Living Interface Ecosystem',
    category: 'Documentary',
    tagline: 'From static tools to lived-in environments',
    year: '2025',
    tech: ['React 19', 'TypeScript', 'Vite', 'CSS Transforms'],
    hypothesis:
      'The web is no longer something we look at—it is something we walk through. This narrative exploration showcases the transition from Deterministic Tools to Ambient Environments through 6 evolutionary phases.',
    architecture:
      '6-phase morphing artifact: Origins (terminal hierarchy), Feedback (elastic physics buttons), Intent (hover-to-slide anticipation), Fluidity (ICU pulse rhythms), Probabilistic (magnetic parallax + AI inference), Environment (full-screen ambient wash). Single persistent component that morphs across scroll transitions.',
    implications:
      'We are moving from interfaces that wait for instructions to interfaces that infer intent. From tools we use to spaces we inhabit. The final phase demonstrates "ambient computing" where interaction is immersive and pervasive.',
    githubUrl: 'https://github.com/Ashborn-047/Living-Interface-Ecosystem',
    liveUrl: 'https://ashborn-047.github.io/Living-Interface-Ecosystem/',
    collectionPath: 'collections/Interface ecosystem and environment',
  },
];
