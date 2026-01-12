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
}

export const EXHIBITS: Exhibit[] = [
  {
    id: 'kinetic-typography',
    title: 'Kinetic Typography',
    category: 'Gallery',
    tagline: 'Language as a living organism',
    year: '2024',
    tech: ['React Three Fiber', 'GLSL', 'Text3D', 'Proximity Detection'],
    hypothesis:
      'Typography need not remain static. By treating letterforms as particles subject to physical forces, we can create text that responds organically to user presence—transforming communication from declaration to conversation.',
    architecture:
      'Each glyph is rendered as a Three.js Text3D geometry with a custom vertex shader. A repulsion field computes the vector from mouse position to each vertex, displacing characters in real-time. Curl noise provides ambient drift, creating a "breathing" effect even without interaction.',
    implications:
      'This approach suggests a future where UI text actively participates in the interface—retreating when not needed, emphasizing itself when relevant. It challenges the notion that text must be passive to be legible.',
    shaderKey: 'kineticType',
  },
  {
    id: 'liquid-shader-ui',
    title: 'Liquid Shader',
    category: 'Gallery',
    tagline: 'Interfaces that breathe and flow',
    year: '2024',
    tech: ['WebGL', 'Simplex Noise', 'MeshTransmissionMaterial', 'Viscosity'],
    hypothesis:
      'Skeuomorphism failed not because of its realism, but because it was static. True digital materiality requires physics. By simulating fluid viscosity in shaders, we create UI surfaces that feel tangible without sacrificing performance.',
    architecture:
      'A plane mesh uses a custom fragment shader combining multiple octaves of Simplex noise to distort UVs. The viscosity uniform controls distortion amplitude, while time drives continuous flow. Mouse position modulates a localized "heat" zone, creating dynamic user-responsive fluidity.',
    implications:
      'Fluid UIs could serve as ambient indicators—visual viscosity representing system load, flow direction indicating data transfer. The interface becomes a living medium that communicates state without explicit widgets.',
    shaderKey: 'liquidShader',
  },
  {
    id: 'aether-sync',
    title: 'Aether Sync',
    category: 'Gallery',
    tagline: 'Visualizing the invisible data streams',
    year: '2025',
    tech: ['InstancedMesh', 'Curl Noise', 'Particle Systems', 'Data Flow'],
    hypothesis:
      'Network traffic is invisible, yet it defines our digital reality. By applying curl noise to instanced particles, we can create visualizations that feel less like graphs and more like natural phenomena—data as weather.',
    architecture:
      'A single InstancedMesh renders 5,000+ particles using GPU instancing. Each particle follows a curl noise field (computed in vertex shader), creating turbulent, non-repeating motion. Phase offsets create staggered pulsing, suggesting asynchronous data packets.',
    implications:
      'This technique enables real-time network monitoring that is both informative and aesthetically compelling. Imagine system dashboards where data flow is intuitive, particle density representing throughput, turbulence indicating latency.',
    shaderKey: 'aetherSync',
  },
  {
    id: 'shader-vault',
    title: 'Shader Vault',
    category: 'Library',
    tagline: 'Raw GLSL, ready to deploy',
    year: '2025',
    tech: ['Monaco Editor', 'Syntax Highlighting', 'Copy-to-Clipboard'],
    hypothesis:
      'Creativity requires access to primitives. By exposing raw shader code alongside running exhibits, we democratize advanced graphics—no longer mystical, but documented and remixable.',
    architecture:
      'A slide-out panel integrates Monaco Editor (VSCode engine) with GLSL syntax highlighting. The active shader code is fetched from the store and displayed with line numbers. Users can copy code directly, or download as .frag/.vert files.',
    implications:
      'Open-sourcing techniques at the code level accelerates the field. When developers can inspect and modify production shaders, we build collective fluency in GPU programming.',
  },
  {
    id: 'chroma-kinetics',
    title: 'Chroma Kinetics',
    category: 'Documentary',
    tagline: 'Color as temporal phenomenon',
    year: '2024',
    tech: ['HSL Interpolation', 'Perceptual Color Spaces', 'ScrollTrigger'],
    hypothesis:
      'Color is typically treated as a static property. But perception of color is temporal—we notice change more than absolute values. By animating hue in response to scroll, we make navigation itself chromatic.',
    architecture:
      'GSAP ScrollTrigger monitors scroll progress, mapping it to HSL hue rotation (0-360°). The shader uniform is updated frame-by-frame, creating smooth chromatic transitions. Perceptual easing ensures color changes feel natural, not mechanical.',
    implications:
      'Chromatic scrolling could replace traditional progress bars. Imagine documentation where each section has a unique hue, creating muscle memory through color association.',
  },
  {
    id: 'ui-atlas',
    title: 'UI Atlas',
    category: 'Documentary',
    tagline: 'Mapping the interface design landscape',
    year: '2025',
    tech: ['Framer Motion', 'Shared Layout', 'View Pattern', 'GSAP'],
    hypothesis:
      'Portfolios are usually linear. But creative work is relational—each project influences others. By using shared layout transitions, we create spatial memory—projects live in specific locations, and navigation feels like exploration.',
    architecture:
      'Framer Motion layoutId ties grid thumbnails to fullscreen views. When a card is clicked, it morphs seamlessly via FLIP animation while the 3D scene remains mounted. The View pattern ensures the WebGL context never resets, maintaining GPU state.',
    implications:
      'Spatial interfaces could replace folder hierarchies. Instead of clicking through nested menus, users navigate a persistent 3D space where file location equals visual position.',
  },
];
