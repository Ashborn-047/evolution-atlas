# Liquid UI - Standalone Examples

Each folder contains a **complete, standalone HTML file** that you can run directly in any browser. No build tools required!

## Effects

| Effect | Description | File |
|--------|-------------|------|
| **Ripple** | Interactive WebGL fluid waves that react to mouse movements | [`ripple/index.html`](./ripple/index.html) |
| **Pond** | Rainy pond simulation with procedural ripples | [`pond/index.html`](./pond/index.html) |
| **Rain** | Canvas 2D rain overlay on blurred background | [`rain/index.html`](./rain/index.html) |
| **Mercury** | Hyper-reflective metallic liquid surface | [`mercury/index.html`](./mercury/index.html) |

## Usage

### Option 1: Open directly
Simply open any `index.html` file in your browser.

### Option 2: Use a local server
```bash
# With Python
python -m http.server 8080

# With Node.js
npx serve .

# With PHP
php -S localhost:8080
```

## Configuration

Each effect uses the Three.js liquid background library. You can customize the parameters:

### Ripple (Interactive)
```javascript
app.liquidPlane.material.metalness = 0.75;  // 0-1
app.liquidPlane.material.roughness = 0.25;  // 0-1
app.liquidPlane.uniforms.displacementScale.value = 5;  // Wave intensity
app.setRain(false);
```

### Pond (Rainy)
```javascript
app.liquidPlane.material.metalness = 0.1;
app.liquidPlane.material.roughness = 0.9;
app.liquidPlane.uniforms.displacementScale.value = 10;
app.setRain(true);  // Enable rain drops
```

### Mercury (Metallic)
```javascript
app.liquidPlane.material.metalness = 1.0;  // Full metal
app.liquidPlane.material.roughness = 0.05; // Very smooth
app.liquidPlane.uniforms.displacementScale.value = 15;
app.setRain(false);
```

### Rain (Canvas 2D)
The rain effect uses pure Canvas 2D - adjust the `density` variable:
```javascript
const density = 0.5;  // 0.1 = light rain, 1.0 = heavy rain
```

## Dependencies

All WebGL effects use:
- **threejs-components** (loaded via CDN)

No installation required - the scripts are loaded from CDN automatically.
