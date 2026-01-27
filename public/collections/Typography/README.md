# Kinetic Typography

**Interactive typography experiments exploring the intersection of motion and letterforms.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)

## ✨ Live Demo

[View Live Demo](https://ashborn-047.github.io/kinetic-typography/)

## 📖 About

A visual exploration of kinetic typography, showcasing how letterforms can transcend static design and become living, breathing elements. This project features 9 unique typographic experiments, each demonstrating different motion and interaction paradigms.

---

## 🎨 Experiments

| # | Name | Description |
|---|------|-------------|
| 01 | **ELASTIC** | Letters react to cursor proximity with rubber-like physics |
| 02 | **LAYERS** | Chromatic aberration split on mouse movement |
| 03 | **ECLIPSE** | 3D rotation casting directional shadows |
| 04 | **GLITCH** | Digital signal decay and RGB displacement |
| 05 | **VAPOR** | Ghosting trail effect with blur filters |
| 06 | **PIXELS** | Character scrambling into raw data blocks |
| 07 | **AURA** | Neon luminescence and atmospheric glow |
| 08 | **VERTEX** | Real-time WebGL 3D geometry rendering |
| 09 | **FLUID** | Turbulent wave distortion like liquid ink |

---

## 🔧 Technical Deep Dive

### Animation Libraries Used

#### GSAP (GreenSock Animation Platform)
The primary animation engine powering most interactive effects:

```javascript
// Example: Elastic letter displacement based on cursor proximity
gsap.to(char, {
    y: displacement * 0.5,
    scaleX: 1 + Math.abs(displacement) * 0.01,
    scaleY: 1 - Math.abs(displacement) * 0.005,
    duration: 0.3,
    ease: 'elastic.out(1, 0.3)'
});
```

**Key GSAP Features Used:**
- `gsap.to()` - Smooth property animations
- `gsap.timeline()` - Sequenced animation chains
- `ScrollTrigger` - Scroll-based reveal animations
- Custom easing functions for natural motion

#### Three.js
Used for WebGL 3D rendering in the VERTEX experiment:

```javascript
// 3D text geometry with dynamic vertex displacement
const geometry = new THREE.TextGeometry('VERTEX', {
    font: loadedFont,
    size: 80,
    height: 5
});
```

---

### Effect Implementations

#### 01. ELASTIC
**Technique:** Cursor proximity detection with GSAP transforms

The effect calculates distance between cursor and each letter, applying:
- Y-axis displacement inversely proportional to distance
- ScaleX stretch for rubber band effect
- ScaleY compression for physics realism

```javascript
const distance = Math.abs(e.clientX - charCenter);
const maxDistance = 150;
const displacement = Math.max(0, (maxDistance - distance) / maxDistance);
```

#### 02. LAYERS (Chromatic Aberration)
**Technique:** Multiple overlapping text layers with offset transforms

Three colored layers (Red, Cyan, base white) are positioned absolutely:
- Mouse X/Y position controls layer offset
- Creates RGB split effect typical of lens aberration

```javascript
gsap.to(layers[0], { x: relX * 20, y: relY * 20, duration: 0.2 });
gsap.to(layers[1], { x: relX * 40, y: relY * 40, duration: 0.3 });
```

#### 03. ECLIPSE
**Technique:** Per-character 3D rotation with dynamic shadows

Each letter rotates based on cursor position relative to its center:
- `rotateY` based on horizontal distance
- Text-shadow direction follows rotation angle
- Creates "light source" effect

```javascript
gsap.to(char, {
    rotateY: rotateAmount,
    textShadow: `${shadowX}px ${shadowY}px 15px rgba(0,0,0,0.5)`,
    duration: 0.2
});
```

#### 04. GLITCH
**Technique:** CSS clip-path fragmentation + RGB layer displacement

The most complex effect combining:
- **White text fade:** Opacity drops to 0 on hover
- **RGB takeover:** Red (#ff0040) and Cyan (#00ffff) layers cover full text
- **Fragmented slices:** Multiple `clip-path` polygons create broken segments
- **Skew distortion:** `skewX()` adds angular breaks
- **Noise overlay:** SVG `feTurbulence` filter for static grain
- **Scanlines:** Repeating gradient for CRT effect
- **Glitch bars:** Random white lines using `steps()` animation

```css
@keyframes glitch-red {
    0% {
        transform: translate(-15px, 0) skewX(-5deg);
        clip-path: polygon(0 0%, 100% 0%, 100% 20%, 0 20%,
                          0 25%, 100% 25%, 100% 35%, 0 35%,
                          0 60%, 100% 60%, 100% 75%, 0 75%);
    }
    /* ... rapid keyframe changes */
}
```

#### 05. VAPOR
**Technique:** Staggered blur clones with opacity decay

Multiple text clones with increasing blur and decreasing opacity:
- Creates ghosting/trailing effect
- GSAP staggers the appearance timing

#### 06. PIXELS
**Technique:** Character replacement with random symbols

On hover, each character is replaced with random characters from a pool:
- Rapid interval-based character swapping
- Creates "decrypting" or "scrambling" effect
- Original text restored on mouse leave

```javascript
const chars = '01アイウエオカキクケコ█▓▒░';
setInterval(() => {
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
}, 50);
```

#### 07. AURA
**Technique:** Animated box-shadow with color cycling

Multiple layered shadows with:
- GSAP-animated spread radius
- Hue rotation for color cycling
- Creates pulsing neon glow

#### 08. VERTEX
**Technique:** Three.js WebGL geometry

Real-time 3D text rendering:
- TextGeometry for 3D letterforms
- Wireframe material option
- Rotation animation on render loop

#### 09. FLUID
**Technique:** SVG feTurbulence filter animation

Applies animated displacement map:
- `feTurbulence` generates organic noise
- `feDisplacementMap` warps text based on noise
- Animated `baseFrequency` creates wave motion

```html
<filter id="fluid-distortion">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3">
        <animate attributeName="baseFrequency" dur="3s" 
                 values="0.02;0.04;0.02" repeatCount="indefinite"/>
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" scale="20"/>
</filter>
```

---

### Scroll Animations

GSAP ScrollTrigger handles reveal animations:

```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.from('.reveal-type', {
    scrollTrigger: {
        trigger: '.reveal-type',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1
});
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Custom properties, animations, Tailwind CSS |
| **JavaScript** | Vanilla ES6+ modules |
| **GSAP** | ScrollTrigger, elastic easing, timeline animations |
| **Three.js** | WebGL 3D text rendering |
| **SVG Filters** | feTurbulence, feDisplacementMap, feGaussianBlur |

---

## 📁 Project Structure

```
kinetic-typography/
├── index.html              # Main page
├── css/
│   ├── variables.css       # CSS custom properties
│   ├── base.css            # Base styles
│   ├── components.css      # Component styles (glitch, elastic, etc.)
│   └── animations.css      # Animation keyframes
├── js/
│   ├── utils.js            # Utility functions (text splitting)
│   ├── cursor.js           # Custom cursor
│   ├── hero.js             # Hero section effects
│   ├── archive.js          # Archive grid interactions (GSAP)
│   ├── typewriter.js       # Typewriter effect (footer)
│   ├── three-scene.js      # 3D WebGL scene
│   └── scroll-animations.js # GSAP ScrollTrigger animations
└── experiments/
    ├── elastic.html        # Standalone experiment pages
    ├── layers.html
    ├── eclipse.html
    ├── glitch.html
    ├── vapor.html
    ├── pixels.html
    ├── aura.html
    ├── vertex.html
    └── fluid.html
```

---

## 🚀 Getting Started

### Local Development

```bash
# Clone the repository
git clone https://github.com/Ashborn-047/kinetic-typography.git

# Navigate to project
cd kinetic-typography

# Start a local server (Python)
python -m http.server 3000

# Or use Node.js serve
npx serve -l 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Typography inspiration from Swiss design principles
- Animation techniques from creative coding community
- GSAP documentation and examples
- Three.js examples and documentation

---

**Type is no longer just ink on paper. It is a living signal.**
