/**
 * Shader Code Repository
 * 
 * This file contains all GLSL shader code for The Evolution Atlas exhibits.
 * Each shader is documented with its purpose and uniform requirements.
 */

export const SHADERS = {
  liquidShader: {
    name: 'Liquid Shader UI',
    description: 'Fluid viscosity simulation with transmission properties',
    vertex: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragment: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uViscosity;
      uniform float uDistortion;
      uniform vec3 uColor;
      
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        // Create flowing distortion
        vec2 uv = vUv;
        float noise1 = snoise(uv * 3.0 + uTime * 0.3);
        float noise2 = snoise(uv * 5.0 - uTime * 0.2);
        
        // Apply viscosity-controlled distortion
        uv.x += noise1 * uDistortion * 0.1 * uViscosity;
        uv.y += noise2 * uDistortion * 0.1 * uViscosity;
        
        // Calculate distance from mouse for interaction
        float mouseDist = length(vUv - uMouse);
        float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
        
        // Liquid color with bioluminescence
        vec3 liquid = uColor;
        liquid += vec3(0.0, 1.0, 0.5) * mouseInfluence * 0.5;
        
        // Add depth with noise
        float depth = (noise1 + noise2) * 0.5 + 0.5;
        liquid *= depth;
        
        // Edge glow effect
        float edge = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
        edge = pow(edge, 2.0);
        liquid += uColor * edge * 0.5;
        
        // Final output with transparency
        float alpha = 0.8 + depth * 0.2;
        gl_FragColor = vec4(liquid, alpha);
      }
    `,
  },
  
  kineticType: {
    name: 'Kinetic Typography',
    description: 'Text dispersion with proximity-based repulsion field',
    vertex: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uIntensity;
      
      varying vec2 vUv;
      varying float vDisplacement;
      
      // 3D noise for organic movement
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Organic drift
        float noise = snoise(vec3(pos.xy * 0.5, uTime * 0.3));
        pos.z += noise * 0.3 * uIntensity;
        
        // Mouse repulsion field
        vec2 toMouse = uMouse - pos.xy;
        float dist = length(toMouse);
        float repulsion = smoothstep(2.0, 0.0, dist);
        pos.xy -= normalize(toMouse) * repulsion * 2.0 * uIntensity;
        
        vDisplacement = repulsion;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragment: `
      uniform vec3 uColor;
      varying vec2 vUv;
      varying float vDisplacement;
      
      void main() {
        vec3 color = uColor;
        color += vec3(0.0, 1.0, 0.5) * vDisplacement;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },
  
  aetherSync: {
    name: 'Aether Sync',
    description: 'Curl noise particle system simulating data flow',
    vertex: `
      uniform float uTime;
      uniform float uIntensity;
      
      attribute vec3 offset;
      attribute float phase;
      
      varying float vAlpha;
      
      // Curl noise for fluid particle motion
      vec3 curlNoise(vec3 p) {
        float e = 0.1;
        vec3 dx = vec3(e, 0.0, 0.0);
        vec3 dy = vec3(0.0, e, 0.0);
        vec3 dz = vec3(0.0, 0.0, e);
        
        // Sample noise at offset positions
        float x = sin(p.x + uTime) * cos(p.y);
        float y = sin(p.y + uTime) * cos(p.z);
        float z = sin(p.z + uTime) * cos(p.x);
        
        vec3 curl = vec3(0.0);
        curl.x = (y - z) / (2.0 * e);
        curl.y = (z - x) / (2.0 * e);
        curl.z = (x - y) / (2.0 * e);
        
        return curl;
      }
      
      void main() {
        vec3 pos = position + offset;
        
        // Apply curl noise displacement
        vec3 curl = curlNoise(pos * 0.5 + phase);
        pos += curl * uIntensity;
        
        // Pulsing based on phase
        float pulse = sin(uTime * 2.0 + phase * 6.28) * 0.5 + 0.5;
        vAlpha = pulse;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (3.0 + pulse * 2.0) * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragment: `
      uniform vec3 uColor;
      varying float vAlpha;
      
      void main() {
        // Circular point shape
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        if (dist > 0.5) discard;
        
        // Soft edge
        float alpha = smoothstep(0.5, 0.3, dist) * vAlpha;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  },
};

export type ShaderKey = keyof typeof SHADERS;
